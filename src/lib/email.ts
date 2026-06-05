import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || "Vellio <noreply@vellio.fr>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://vellio-shop.vercel.app";
const getResend = () => new Resend(process.env.RESEND_API_KEY || "re_placeholder");

function esc(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const BASE_STYLE = `
  <style>
    body{margin:0;padding:0;background:#f7f3ea;font-family:Inter,Arial,sans-serif}
    .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8e2d8}
    .header{background:#0b0b0c;padding:32px 40px;text-align:center}
    .logo{color:#c8a96e;font-size:28px;font-weight:700;letter-spacing:0.04em}
    .logo-sub{color:#ffffff55;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin-top:4px}
    .gold-bar{height:2px;background:linear-gradient(90deg,transparent,#c8a96e,transparent)}
    .body{padding:40px}
    .tag{font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#c8a96e;margin-bottom:12px}
    h1{font-size:28px;font-weight:700;color:#0b0b0c;margin:0 0 16px;line-height:1.2}
    p{font-size:15px;line-height:1.7;color:#444;margin:0 0 16px}
    .btn{display:inline-block;background:#0b0b0c;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:14px;font-weight:600;margin:8px 0}
    .items-table{width:100%;border-collapse:collapse;margin:20px 0}
    .items-table th{background:#f7f3ea;padding:10px 12px;text-align:left;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.1em}
    .items-table td{padding:12px;border-top:1px solid #f0ebe3;font-size:14px;color:#333}
    .total-row td{font-weight:700;color:#0b0b0c;font-size:15px;border-top:2px solid #e8e2d8}
    .trust{display:flex;gap:16px;background:#f7f3ea;border-radius:12px;padding:16px;margin:24px 0}
    .trust-item{text-align:center;flex:1;font-size:12px;color:#666}
    .trust-emoji{font-size:20px;display:block;margin-bottom:4px}
    .footer{padding:24px 40px;background:#f7f3ea;text-align:center}
    .footer p{font-size:12px;color:#999;margin:4px 0}
    .footer a{color:#c8a96e;text-decoration:none}
  </style>
`;

function wrapEmail(content: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${BASE_STYLE}</head>
<body><div style="padding:24px">
<div class="wrap">
  <div class="header">
    <div class="logo">V e l l i o</div>
    <div class="logo-sub">Maison de sélection contemporaine</div>
  </div>
  <div class="gold-bar"></div>
  ${content}
  <div class="footer">
    <p>Vellio — <a href="${APP_URL}">vellio-shop.vercel.app</a></p>
    <p><a href="${APP_URL}/remboursement">Retours</a> · <a href="${APP_URL}/confidentialite">Confidentialité</a> · <a href="${APP_URL}/contact">Contact</a></p>
    <p style="margin-top:12px;color:#bbb">© ${new Date().getFullYear()} Vellio</p>
  </div>
</div>
</div></body></html>`;
}

export async function sendWelcomeEmail(email: string) {
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "Bienvenue dans le carnet Vellio ✦",
    html: wrapEmail(`
      <div class="body">
        <div class="tag">Carnet privé</div>
        <h1>Vous faites partie du cercle.</h1>
        <p>Nous sommes ravis de vous accueillir dans le carnet Vellio. Vous serez parmi les premiers informés des nouvelles pièces, éditions limitées et sélections exclusives.</p>
        <p>En attendant, découvrez notre collection actuelle — des objets pensés pour clarifier le quotidien, pas pour l'encombrer.</p>
        <div style="text-align:center;margin:24px 0">
          <a href="${APP_URL}/produits" class="btn">Explorer la collection →</a>
        </div>
        <div class="trust">
          <div class="trust-item"><span class="trust-emoji">🔒</span>Paiement sécurisé</div>
          <div class="trust-item"><span class="trust-emoji">📦</span>Livraison suivie</div>
          <div class="trust-item"><span class="trust-emoji">↩️</span>Retours 30 jours</div>
        </div>
        <p style="font-size:13px;color:#999">Un seul envoi par semaine maximum. Jamais de spam.</p>
      </div>
    `),
  });
}

export async function sendOrderConfirmation(order: {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}) {
  const itemsHtml = order.items.map((i) => `
    <tr>
      <td>${esc(i.name)}</td>
      <td style="text-align:center">${i.quantity}</td>
      <td style="text-align:right">${i.price.toFixed(2)} €</td>
    </tr>
  `).join("");

  await getResend().emails.send({
    from: FROM,
    to: order.customerEmail,
    subject: `✅ Commande confirmée — ${order.orderNumber} | Vellio`,
    html: wrapEmail(`
      <div class="body">
        <div class="tag">Commande confirmée</div>
        <h1>Merci, ${esc(order.customerName.split(" ")[0])} !</h1>
        <p>Votre commande <strong>${esc(order.orderNumber)}</strong> est confirmée et en cours de préparation. Vous recevrez un email avec votre numéro de suivi dès l'expédition.</p>

        <table class="items-table">
          <thead><tr><th>Article</th><th style="text-align:center">Qté</th><th style="text-align:right">Prix</th></tr></thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot>
            <tr class="total-row">
              <td colspan="2">Total TTC</td>
              <td style="text-align:right">${order.total.toFixed(2)} €</td>
            </tr>
          </tfoot>
        </table>

        <p>Délai de livraison estimé : <strong>5–10 jours ouvrés</strong>.</p>

        <div style="text-align:center;margin:24px 0">
          <a href="${APP_URL}/suivi" class="btn">Suivre ma commande →</a>
        </div>

        <div class="trust">
          <div class="trust-item"><span class="trust-emoji">📦</span>Suivi email</div>
          <div class="trust-item"><span class="trust-emoji">↩️</span>Retours 30 j</div>
          <div class="trust-item"><span class="trust-emoji">💬</span>Support réactif</div>
        </div>
      </div>
    `),
  });
}

export async function sendPostPurchaseUpsell(order: {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
}) {
  await getResend().emails.send({
    from: FROM,
    to: order.customerEmail,
    subject: `Votre sélection Vellio est en route ✦ Et voici ce que vous allez adorer`,
    html: wrapEmail(`
      <div class="body">
        <div class="tag">Votre commande ${esc(order.orderNumber)}</div>
        <h1>Elle est en préparation, ${esc(order.customerName.split(" ")[0])}.</h1>
        <p>Notre équipe prépare votre sélection avec soin. Vous recevrez votre numéro de suivi dans les prochaines heures.</p>
        <p>En attendant, voici les pièces que nos clients ajoutent souvent à leur sélection :</p>

        <div style="background:#f7f3ea;border-radius:12px;padding:20px;margin:20px 0">
          <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#c8a96e;margin:0 0 12px">Compléter votre maison Vellio</p>
          <p>Les accessoires, les objets de soin et les pièces tech que vous n'avez pas encore — choisis selon les mêmes critères d'usage et de ligne.</p>
        </div>

        <div style="text-align:center;margin:24px 0">
          <a href="${APP_URL}/produits" class="btn">Voir les nouvelles pièces →</a>
        </div>

        <p style="font-size:13px;color:#999">Livraison offerte dès 50€ · Paiement sécurisé Stripe</p>
      </div>
    `),
  });
}

export async function sendAbandonedCart(email: string, customerName: string, items: { name: string; price: number }[]) {
  const itemsPreview = items.slice(0, 3).map((i) => `
    <div style="padding:10px 0;border-top:1px solid #f0ebe3;font-size:14px;color:#333">
      <strong>${esc(i.name)}</strong> — ${i.price.toFixed(2)} €
    </div>
  `).join("");

  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "🛍️ Votre sélection Vellio vous attend encore",
    html: wrapEmail(`
      <div class="body">
        <div class="tag">Panier abandonné</div>
        <h1>${customerName ? `${esc(customerName.split(" ")[0])}, votre` : "Votre"} sélection est toujours disponible.</h1>
        <p>Vous avez commencé une belle sélection. Les articles sont toujours disponibles, mais les stocks sont limités.</p>
        ${itemsPreview ? `<div style="margin:20px 0">${itemsPreview}</div>` : ""}
        <div style="text-align:center;margin:24px 0">
          <a href="${APP_URL}/panier" class="btn">Finaliser ma commande →</a>
        </div>
        <div class="trust">
          <div class="trust-item"><span class="trust-emoji">🔒</span>Paiement sécurisé</div>
          <div class="trust-item"><span class="trust-emoji">📦</span>Livraison suivie</div>
          <div class="trust-item"><span class="trust-emoji">↩️</span>Retours 30 jours</div>
        </div>
        <p style="font-size:13px;color:#999">Livraison offerte dès 50€</p>
      </div>
    `),
  });
}

// ── J+7 RE-ENGAGEMENT ──────────────────────────────────────────────────────────
export async function sendReEngagement(opts: { email: string; firstName: string; orderNumber: string }) {
  await getResend().emails.send({
    from: FROM,
    to: opts.email,
    subject: `Une nouvelle sélection Vellio vous attend, ${esc(opts.firstName)} ✦`,
    html: wrapEmail(`
      <div class="body">
        <div class="tag">Sélection exclusive</div>
        <h1>Vous nous avez manqué.</h1>
        <p>Depuis votre commande <strong>${esc(opts.orderNumber)}</strong>, de nouvelles pièces ont rejoint la collection Vellio. Elles ont été sélectionnées selon les mêmes critères : usage quotidien, ligne sobre, qualité durable.</p>
        <div style="background:#f7f3ea;border-radius:12px;padding:20px;margin:20px 0;text-align:center">
          <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#c8a96e;margin:0 0 8px">Pour vous, -10% sur votre prochaine commande</p>
          <p style="font-size:22px;font-weight:700;color:#0b0b0c;margin:0;letter-spacing:0.1em">RETOUR10</p>
          <p style="font-size:12px;color:#999;margin:8px 0 0">Valable 7 jours · Sans minimum</p>
        </div>
        <div style="text-align:center;margin:24px 0">
          <a href="${APP_URL}/produits?promo=RETOUR10" class="btn">Découvrir les nouvelles pièces →</a>
        </div>
        <div class="trust">
          <div class="trust-item"><span class="trust-emoji">🔒</span>Paiement sécurisé</div>
          <div class="trust-item"><span class="trust-emoji">📦</span>Livraison suivie</div>
          <div class="trust-item"><span class="trust-emoji">↩️</span>Retours 30 jours</div>
        </div>
      </div>
    `),
  });
}

// ── DEMANDE D'AVIS J+14 ────────────────────────────────────────────────────────
export async function sendReviewRequest(opts: { email: string; firstName: string; orderNumber: string; productName?: string }) {
  await getResend().emails.send({
    from: FROM,
    to: opts.email,
    subject: `Votre avis compte, ${esc(opts.firstName)} — 2 minutes suffisent`,
    html: wrapEmail(`
      <div class="body">
        <div class="tag">Votre expérience</div>
        <h1>Que pensez-vous de votre sélection ?</h1>
        <p>Votre commande <strong>${esc(opts.orderNumber)}</strong>${opts.productName ? ` (${esc(opts.productName)})` : ""} est arrivée depuis quelques jours. Votre avis aide les autres membres du cercle Vellio à faire les bons choix.</p>
        <div style="text-align:center;margin:28px 0">
          <p style="font-size:13px;color:#888;margin-bottom:16px">Quelle note donnez-vous à votre expérience ?</p>
          <div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap">
            ${[1,2,3,4,5].map(n => `<a href="${APP_URL}/avis?order=${esc(opts.orderNumber)}&note=${n}" style="display:inline-block;width:44px;height:44px;line-height:44px;border-radius:12px;background:#f7f3ea;text-decoration:none;font-size:20px;text-align:center">⭐</a>`).join("")}
          </div>
        </div>
        <div style="text-align:center">
          <a href="${APP_URL}/avis?order=${esc(opts.orderNumber)}" class="btn">Laisser mon avis →</a>
        </div>
        <p style="font-size:12px;color:#bbb;text-align:center;margin-top:20px">Chaque avis est lu par notre équipe. Merci pour votre confiance.</p>
      </div>
    `),
  });
}

// ── BIENVENUE NEWSLETTER + CODE PROMO ─────────────────────────────────────────
export async function sendNewsletterWelcomePromo(email: string) {
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "Votre code -10% est ici ✦ Bienvenue dans le cercle Vellio",
    html: wrapEmail(`
      <div class="body">
        <div class="tag">Cadeau de bienvenue</div>
        <h1>Voici votre réduction.</h1>
        <p>Merci de rejoindre le carnet Vellio. Comme promis, voici votre code exclusif :</p>
        <div style="background:#0b0b0c;border-radius:16px;padding:28px;text-align:center;margin:24px 0">
          <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#c8a96e;margin:0 0 12px">Votre code de bienvenue</p>
          <p style="font-size:32px;font-weight:700;color:#fff;letter-spacing:0.12em;margin:0">BIENVENUE10</p>
          <p style="font-size:12px;color:#ffffff60;margin:12px 0 0">-10% sur toute la collection · Valable 30 jours</p>
        </div>
        <div style="text-align:center;margin:24px 0">
          <a href="${APP_URL}/produits?promo=BIENVENUE10" class="btn">Utiliser mon code →</a>
        </div>
        <div class="trust">
          <div class="trust-item"><span class="trust-emoji">🔒</span>Paiement sécurisé</div>
          <div class="trust-item"><span class="trust-emoji">📦</span>Livraison offerte dès 50€</div>
          <div class="trust-item"><span class="trust-emoji">↩️</span>Retours 30 jours</div>
        </div>
        <p style="font-size:12px;color:#bbb;text-align:center">Un email par semaine maximum. Désabonnement en 1 clic.</p>
      </div>
    `),
  });
}
