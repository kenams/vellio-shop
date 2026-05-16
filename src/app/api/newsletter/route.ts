export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    let email: string;

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await req.json();
      email = schema.parse(body).email;
    } else {
      const formData = await req.formData();
      email = schema.parse({ email: formData.get("email") }).email;
    }

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      if (!existing.active) {
        await prisma.newsletterSubscriber.update({ where: { email }, data: { active: true } });
        return NextResponse.json({ ok: true, message: "Réabonnement effectué." });
      }
      return NextResponse.json({ ok: true, message: "Vous êtes déjà inscrit." });
    }

    await prisma.newsletterSubscriber.create({ data: { email } });
    return NextResponse.json({ ok: true, message: "Inscription réussie !" }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
