import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function createCheckoutSession({
  items,
  customerEmail,
  orderId,
  successUrl,
  cancelUrl,
}: {
  items: { name: string; price: number; quantity: number; image?: string }[];
  customerEmail: string;
  orderId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const lineItems = items.map((item) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: item.name,
        ...(item.image ? { images: [item.image] } : {}),
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    customer_email: customerEmail,
    metadata: { orderId },
    success_url: successUrl,
    cancel_url: cancelUrl,
    shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU"] },
    billing_address_collection: "required",
    locale: "fr",
  });

  return session;
}
