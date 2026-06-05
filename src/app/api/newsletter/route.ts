export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail, sendNewsletterWelcomePromo } from "@/lib/email";
import { z } from "zod";

const schema = z.object({ email: z.string().email(), source: z.string().optional() });

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const rawBody = contentType.includes("application/json")
      ? await req.json()
      : Object.fromEntries(await req.formData());

    const { email, source } = schema.parse(rawBody);
    const isPromo = source === "popup_promo";

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      if (!existing.active) {
        await prisma.newsletterSubscriber.update({ where: { email }, data: { active: true } });
        (isPromo ? sendNewsletterWelcomePromo : sendWelcomeEmail)(email).catch(console.error);
        return NextResponse.json({ ok: true, message: "Réabonnement effectué." });
      }
      return NextResponse.json({ ok: true, message: "Vous êtes déjà inscrit." });
    }

    await prisma.newsletterSubscriber.create({ data: { email } });
    (isPromo ? sendNewsletterWelcomePromo : sendWelcomeEmail)(email).catch(console.error);

    return NextResponse.json({ ok: true, message: "Inscription réussie !" }, { status: 201 });
  } catch (err: unknown) {
    if (err && typeof err === "object" && "name" in err && err.name === "ZodError") {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
