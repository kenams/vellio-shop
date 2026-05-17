export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(10),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = schema.parse(body);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject || "Non précisé");
    const safeMessage = escapeHtml(message);
    const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");
    const from = process.env.EMAIL_FROM || "Vellio <noreply@vellio.fr>";

    await resend.emails.send({
      from,
      to: process.env.CONTACT_EMAIL || "support@vellio.fr",
      reply_to: email,
      subject: `[Contact Vellio] ${safeSubject} — de ${safeName}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#0b0b0c">
          <h2>Nouveau message Vellio</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            <tr><td style="padding:8px;color:#666;width:120px">Nom</td><td style="padding:8px;font-weight:bold">${safeName}</td></tr>
            <tr style="background:#f7f3ea"><td style="padding:8px;color:#666">Email</td><td style="padding:8px"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding:8px;color:#666">Sujet</td><td style="padding:8px">${safeSubject}</td></tr>
          </table>
          <div style="background:#f7f3ea;border-radius:14px;padding:16px">
            <p style="margin:0;white-space:pre-wrap;color:#333">${safeMessage}</p>
          </div>
          <p style="color:#999;font-size:12px;margin-top:20px">Vellio — Formulaire de contact</p>
        </div>
      `,
    });

    await resend.emails.send({
      from,
      to: email,
      subject: "Nous avons bien reçu votre message — Vellio",
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#0b0b0c">
          <h2>Merci pour votre message, ${safeName}.</h2>
          <p>Nous avons bien reçu votre demande et vous répondrons sous 24h ouvrées.</p>
          <div style="background:#f7f3ea;border-radius:14px;padding:16px;margin:20px 0">
            <p style="margin:0;color:#666;white-space:pre-wrap">${safeMessage}</p>
          </div>
          <p>À très bientôt,<br/><strong>L'équipe Vellio</strong></p>
          <p style="color:#999;font-size:12px">Vellio — Maison de sélection contemporaine</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }
    console.error("[contact]", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}
