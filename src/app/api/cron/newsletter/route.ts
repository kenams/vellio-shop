export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://vellio.fr";
const EMAIL_FROM = process.env.EMAIL_FROM || "Vellio <hello@vellio.fr>";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildHtml(products: Array<{ name: string; price: number; slug: string; img?: string }>, subject: string) {
  const items = products.slice(0, 5).map(p => `
    <tr>
      <td style="padding:16px 0;border-bottom:1px solid #f0ede8;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="80">
              ${p.img ? `<img src="${esc(p.img)}" width="80" height="80" style="border-radius:8px;object-fit:cover;display:block;" alt="${esc(p.name)}">` : ""}
            </td>
            <td style="padding-left:16px;vertical-align:top;">
              <div style="font-family:'Georgia',serif;font-size:15px;color:#1a1a1a;font-weight:600;">${esc(p.name)}</div>
              <div style="font-size:13px;color:#8b6f47;margin-top:4px;">${p.price.toFixed(2).replace(".", ",")} €</div>
              <a href="${APP_URL}/produits/${esc(p.slug)}" style="display:inline-block;margin-top:8px;font-size:12px;color:#8b6f47;text-decoration:none;border-bottom:1px solid #8b6f47;">Voir le produit →</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:40px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,0.06);">
        <tr><td style="background:#1a1a1a;padding:28px 40px;">
          <div style="font-family:'Georgia',serif;font-size:22px;color:#d4a853;letter-spacing:0.1em;">VELLIO</div>
          <div style="font-size:11px;color:#888;letter-spacing:0.2em;margin-top:4px;">SÉLECTION CURATÉE</div>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <h1 style="font-family:'Georgia',serif;font-size:24px;color:#1a1a1a;margin:0 0 8px;">${esc(subject)}</h1>
          <p style="font-size:14px;color:#666;line-height:1.6;margin:0 0 24px;">Les produits les plus tendance de la semaine — sélectionnés pour leur qualité et leur rapport valeur.</p>
          <table width="100%" cellpadding="0" cellspacing="0">${items}</table>
          <div style="margin-top:28px;text-align:center;">
            <a href="${APP_URL}/produits" style="display:inline-block;background:#1a1a1a;color:#d4a853;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.12em;padding:14px 32px;border-radius:4px;">VOIR TOUTE LA SÉLECTION</a>
          </div>
        </td></tr>
        <tr><td style="background:#faf8f5;padding:20px 40px;text-align:center;">
          <p style="font-size:11px;color:#999;margin:0;">Vous recevez cet email car vous vous êtes inscrit à la newsletter Vellio.<br>
          <a href="${APP_URL}/newsletter/unsubscribe?email={{EMAIL}}" style="color:#999;">Se désabonner</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") || req.headers.get("authorization")?.replace("Bearer ", "");
  const expected = process.env.CRON_SECRET || process.env.ADMIN_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const dryRun = req.nextUrl.searchParams.get("dry") === "1";

  try {
    // Top produits tendance de la semaine
    const products = await prisma.product.findMany({
      where: { published: true },
      include: { images: { orderBy: { position: "asc" }, take: 1 } },
      orderBy: { trendScore: "desc" },
      take: 5,
    });

    if (products.length === 0) {
      return NextResponse.json({ ok: true, skipped: "no products" });
    }

    // Abonnés actifs
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { active: true },
      select: { email: true },
    });

    if (subscribers.length === 0) {
      return NextResponse.json({ ok: true, skipped: "no subscribers" });
    }

    const productList = products.map(p => ({
      name: p.name,
      price: p.price,
      slug: p.slug,
      img: p.images[0]?.url,
    }));

    const subject = `Les coups de cœur Vellio de cette semaine ✦`;
    let sent = 0;
    const errors: string[] = [];

    if (!dryRun) {
      // Envoyer en batch de 10 pour rester dans les limites Resend
      for (let i = 0; i < subscribers.length; i += 10) {
        const batch = subscribers.slice(i, i + 10);
        await Promise.all(
          batch.map(async (sub: { email: string }) => {
            try {
              const html = buildHtml(productList, subject).replace("{{EMAIL}}", encodeURIComponent(sub.email));
              await resend.emails.send({
                from: EMAIL_FROM,
                to: sub.email,
                subject,
                html,
              });
              sent++;
            } catch (e: any) {
              errors.push(`${sub.email}: ${e.message}`);
            }
          })
        );
        // Petite pause entre batches
        if (i + 10 < subscribers.length) {
          await new Promise(r => setTimeout(r, 200));
        }
      }
    }

    return NextResponse.json({
      ok: true,
      dryRun,
      timestamp: new Date().toISOString(),
      subscribers: subscribers.length,
      sent,
      products: productList.map(p => p.name),
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: any) {
    console.error("[cron/newsletter] Error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
