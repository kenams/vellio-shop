export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const ADMIN_TOKEN = process.env.ADMIN_SECRET || "vellio-admin-2024";
const FROM = process.env.EMAIL_FROM || "Vellio <noreply@vellio.fr>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://vellio-shop.vercel.app";

function checkAuth(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  const cookie = req.headers.get("cookie") || "";
  return token === ADMIN_TOKEN || cookie.includes(`admin_token=${ADMIN_TOKEN}`);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { subject, preheader, headline, body, ctaLabel, ctaUrl, dryRun } = await req.json();
  if (!subject || !headline || !body) {
    return NextResponse.json({ error: "subject, headline, body required" }, { status: 400 });
  }

  const subscribers = await prisma.newsletterSubscriber.findMany({
    where: { active: true },
    select: { email: true },
  });

  if (dryRun) {
    return NextResponse.json({ ok: true, dryRun: true, count: subscribers.length, emails: subscribers.slice(0, 5).map((s) => s.email) });
  }

  if (subscribers.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, message: "Aucun abonné actif." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<style>
  body{margin:0;padding:0;background:#f7f3ea;font-family:Inter,Arial,sans-serif}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8e2d8}
  .header{background:#0b0b0c;padding:32px 40px;text-align:center}
  .logo{color:#c8a96e;font-size:28px;font-weight:700;letter-spacing:0.04em}
  .gold-bar{height:2px;background:linear-gradient(90deg,transparent,#c8a96e,transparent)}
  .body{padding:40px}
  h1{font-size:28px;font-weight:700;color:#0b0b0c;margin:0 0 16px;line-height:1.2}
  p{font-size:15px;line-height:1.7;color:#444;margin:0 0 16px}
  .btn{display:inline-block;background:#0b0b0c;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:14px;font-weight:600}
  .footer{padding:24px 40px;background:#f7f3ea;text-align:center}
  .footer p{font-size:12px;color:#999;margin:4px 0}
  .footer a{color:#c8a96e;text-decoration:none}
</style></head><body>
<div style="padding:24px"><div class="wrap">
  <div class="header"><div class="logo">V e l l i o</div></div>
  <div class="gold-bar"></div>
  <div class="body">
    <h1>${headline}</h1>
    ${body.split("\n").filter(Boolean).map((p: string) => `<p>${p}</p>`).join("")}
    ${ctaLabel && ctaUrl ? `<div style="text-align:center;margin:24px 0"><a href="${ctaUrl}" class="btn">${ctaLabel} →</a></div>` : ""}
  </div>
  <div class="footer">
    <p>Vellio — <a href="${APP_URL}">vellio.fr</a></p>
    <p><a href="${APP_URL}/confidentialite">Se désabonner</a></p>
  </div>
</div></div></body></html>`;

  // Envoi par batch de 50 (limite RESEND)
  const BATCH = 50;
  let sent = 0;
  const errors: string[] = [];

  for (let i = 0; i < subscribers.length; i += BATCH) {
    const batch = subscribers.slice(i, i + BATCH);
    const results = await Promise.allSettled(
      batch.map((s) =>
        resend.emails.send({ from: FROM, to: s.email, subject, html })
      )
    );
    for (const r of results) {
      if (r.status === "fulfilled") sent++;
      else errors.push(r.reason?.message || "error");
    }
    // Pause entre les batches
    if (i + BATCH < subscribers.length) await new Promise((res) => setTimeout(res, 1000));
  }

  return NextResponse.json({
    ok: true,
    total: subscribers.length,
    sent,
    errors: errors.length,
    errorSamples: errors.slice(0, 3),
  });
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const count = await prisma.newsletterSubscriber.count({ where: { active: true } });
  return NextResponse.json({ ok: true, activeSubscribers: count });
}
