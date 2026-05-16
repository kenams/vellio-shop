export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const order = await prisma.order.findUnique({
      where: { stripeSessionId: session.id },
      include: { items: true },
    });
    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "PAID",
          stripePaymentId: session.payment_intent as string,
          shippingAddress: (session.shipping_details?.address || {}) as object,
        },
      });
      // Envoyer email confirmation
      await sendOrderConfirmation({
        orderNumber: order.orderNumber,
        customerEmail: order.customerEmail,
        customerName: order.customerName,
        items: order.items,
        total: order.total,
      }).catch(console.error);
    }
  }

  return NextResponse.json({ received: true });
}
