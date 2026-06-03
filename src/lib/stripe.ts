import Stripe from "stripe";

function getStripeSecretKey() {
  const key = process.env.STRIPE_SECRET_KEY?.trim().replace(/^["']|["']$/g, "").replace(/\s+/g, "") || "";

  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  if (!/^sk_(test|live)_/.test(key)) {
    throw new Error("STRIPE_SECRET_KEY must start with sk_test_ or sk_live_");
  }

  return key;
}

function getStripe() {
  return new Stripe(getStripeSecretKey(), { apiVersion: "2024-06-20" });
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export async function createCheckoutSession({
  items,
  customerEmail,
  orderId,
  successUrl,
  cancelUrl,
  shippingCost = 0,
  currency = "eur",
}: {
  items: { name: string; price: number; quantity: number; image?: string }[];
  customerEmail: string;
  orderId: string;
  successUrl: string;
  cancelUrl: string;
  shippingCost?: number;
  currency?: string;
}) {
  const lineItems = items.map((item) => ({
    price_data: {
      currency,
      product_data: {
        name: item.name,
        // Only include image if it's a full URL (Pexels/Unsplash are accessible)
        ...(item.image && item.image.startsWith("http") ? { images: [item.image] } : {}),
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  // Add shipping as a line item if not free
  if (shippingCost > 0) {
    lineItems.push({
      price_data: {
        currency,
        product_data: { name: "Livraison suivie" },
        unit_amount: Math.round(shippingCost * 100),
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    customer_email: customerEmail,
    metadata: { orderId },
    success_url: successUrl,
    cancel_url: cancelUrl,
    shipping_address_collection: {
      allowed_countries: ["FR", "BE", "CH", "LU", "DE", "ES", "IT", "GB", "US", "CA", "AU", "NZ", "NL", "PT", "AT"],
    },
    billing_address_collection: "required",
    locale: "auto",
  });

  return session;
}
