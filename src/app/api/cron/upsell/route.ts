export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPostPurchaseUpsell } from "@/lib/email";

const MIN_MS = 10 * 60 * 1000;  // 10 min après paiement
const MAX_MS = 60 * 60 * 1000;  // max 1h (après = trop tard)

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const from = new Date(now - MAX_MS);
  const to   = new Date(now - MIN_MS);

  const orders = await prisma.order.findMany({
    where: {
      status: "PAID",
      upsellSentAt: null,
      updatedAt: { gte: from, lte: to },
    },
    take: 50,
  });

  let sent = 0;
  for (const order of orders) {
    try {
      await sendPostPurchaseUpsell({
        orderNumber: order.orderNumber,
        customerEmail: order.customerEmail,
        customerName: order.customerName,
      });
      await prisma.order.update({
        where: { id: order.id },
        data: { upsellSentAt: new Date() },
      });
      sent++;
    } catch (err) {
      console.error("[upsell] failed for order", order.orderNumber, err);
    }
  }

  return NextResponse.json({ processed: orders.length, sent });
}
