import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM || "Vellio <noreply@vellio.fr>";
const getResend = () => new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function sendOrderConfirmation(order: {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}) {
  const itemsHtml = order.items
    .map((i) => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>${i.price.toFixed(2)}€</td></tr>`)
    .join("");

  await getResend().emails.send({
    from: FROM,
    to: order.customerEmail,
    subject: `✅ Commande confirmée — ${order.orderNumber}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h1 style="color:#1a1a2e">Merci pour votre commande !</h1>
        <p>Bonjour ${order.customerName},</p>
        <p>Votre commande <strong>${order.orderNumber}</strong> a bien été confirmée.</p>
        <table style="width:100%;border-collapse:collapse">
          <tr style="background:#f5f5f5"><th>Produit</th><th>Qté</th><th>Prix</th></tr>
          ${itemsHtml}
          <tr><td colspan="2"><strong>Total</strong></td><td><strong>${order.total.toFixed(2)}€</strong></td></tr>
        </table>
        <p>Délai de livraison estimé : <strong>7-14 jours ouvrés</strong></p>
        <p>Vous recevrez un email avec votre numéro de suivi dès l'expédition.</p>
        <hr/>
        <p style="color:#666;font-size:12px">Vellio — boutique intelligente | <a href="${process.env.NEXT_PUBLIC_APP_URL}/remboursement">Politique de remboursement</a></p>
      </div>
    `,
  });
}

export async function sendAbandonedCart(email: string, cartUrl: string) {
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "🛒 Vous avez oublié quelque chose...",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2>Votre panier vous attend !</h2>
        <p>Vous avez laissé des articles dans votre panier. Ne les laissez pas partir !</p>
        <a href="${cartUrl}" style="background:#e94560;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block">Reprendre mon panier →</a>
        <p style="color:#666;font-size:12px;margin-top:20px">Paiement 100% sécurisé · Livraison suivie · Remboursement garanti</p>
      </div>
    `,
  });
}
