export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession } from "@/lib/stripe";
import { generateOrderNumber } from "@/lib/utils";
import { z } from "zod";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 4.99;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://vellio.fr";

const schema = z.object({
  items: z.array(z.object({ productId: z.string(), quantity: z.number().min(1) })).min(1),
  customerEmail: z.string().email(),
  customerName: z.string().min(1),
  shippingAddress: z.object({
    line1: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customerEmail, customerName, shippingAddress } = schema.parse(body);

    const products = await prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId) }, published: true },
      include: { images: { take: 1 } },
    });

    if (products.length !== items.length) {
      const missing = items.filter(i => !products.find(p => p.id === i.productId)).map(i => i.productId);
      return NextResponse.json({ error: "product_not_found", missing }, { status: 400 });
    }

    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return { productId: product.id, quantity: item.quantity, price: product.price, name: product.name };
    });

    const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shippingCost;
    const orderNumber = generateOrderNumber();

    let customer = await prisma.customer.findUnique({ where: { email: customerEmail } });
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          email: customerEmail,
          firstName: customerName.split(" ")[0],
          lastName: customerName.split(" ").slice(1).join(" "),
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerEmail,
        customerName,
        customerId: customer.id,
        total,
        status: "PENDING",
        shippingAddress: shippingAddress || {},
        items: { create: orderItems },
      },
    });

    const session = await createCheckoutSession({
      items: orderItems.map((i) => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: products.find((p) => p.id === i.productId)?.images[0]?.url,
      })),
      customerEmail,
      orderId: order.id,
      shippingCost,
      successUrl: `${APP_URL}/commande/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${APP_URL}/panier`,
    });

    await prisma.order.update({ where: { id: order.id }, data: { stripeSessionId: session.id } });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: err.message || "checkout_failed" }, { status: 500 });
  }
}
