export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { sendAbandonedCart } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional().default(""),
  items: z.array(z.object({ name: z.string(), price: z.number() })).optional().default([]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, items } = schema.parse(body);

    // Anti-spam: ne pas envoyer si l'email a déjà reçu un email dans les 2h
    // (handled by calling side via sessionStorage)

    await sendAbandonedCart(email, name, items);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
