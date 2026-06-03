export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAbandonedCart } from "@/lib/email";

const DELAY_MS = 30 * 60 * 1000; // 30 min

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - DELAY_MS);

  const pendingOrders = await prisma.order.findMany({
    where: {
      status: "PENDING",
      abandonedCartSentAt: null,
      createdAt: { lte: cutoff },
    },
    include: { items: true },
    take: 50,
  });

  let sent = 0;
  for (const order of pendingOrders) {
    try {
      await sendAbandonedCart(
        order.customerEmail,
        order.customerName,
        order.items.map((i) => ({ name: i.name, price: i.price }))
      );
      await prisma.order.update({
        where: { id: order.id },
        data: { abandonedCartSentAt: new Date() },
      });
      sent++;
    } catch (err) {
      console.error("[abandoned-cart] failed for order", order.orderNumber, err);
    }
  }

  return NextResponse.json({ processed: pendingOrders.length, sent });
}
