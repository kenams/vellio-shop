export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendReEngagement, sendReviewRequest } from "@/lib/email";

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const now = new Date();
  // J+7 : re-engagement avec code promo
  const day7from = new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000);
  const day7to   = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  // J+14 : demande d'avis
  const day14from = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
  const day14to   = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const [day7orders, day14orders] = await Promise.all([
    prisma.order.findMany({
      where: { status: "PAID", reengagementSentAt: null, createdAt: { gte: day7from, lte: day7to } },
      include: { items: { take: 1 } },
      take: 50,
    }),
    prisma.order.findMany({
      where: { status: "PAID", reviewRequestSentAt: null, createdAt: { gte: day14from, lte: day14to } },
      include: { items: { take: 1 } },
      take: 50,
    }),
  ]);

  let reengaged = 0, reviewed = 0;

  for (const order of day7orders) {
    try {
      await sendReEngagement({
        email: order.customerEmail,
        firstName: order.customerName.split(" ")[0],
        orderNumber: order.orderNumber,
      });
      await prisma.order.update({ where: { id: order.id }, data: { reengagementSentAt: now } as never });
      reengaged++;
    } catch (e) { console.error("[reengagement]", order.orderNumber, e); }
  }

  for (const order of day14orders) {
    try {
      await sendReviewRequest({
        email: order.customerEmail,
        firstName: order.customerName.split(" ")[0],
        orderNumber: order.orderNumber,
        productName: order.items[0]?.name,
      });
      await prisma.order.update({ where: { id: order.id }, data: { reviewRequestSentAt: now } as never });
      reviewed++;
    } catch (e) { console.error("[review-request]", order.orderNumber, e); }
  }

  return NextResponse.json({ reengaged, reviewed });
}
