import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_TOKEN = process.env.ADMIN_SECRET || "vellio-admin-2024";

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (token !== ADMIN_TOKEN) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const [
    ordersCount,
    revenueData,
    productsCount,
    customersCount,
    topProducts,
    recentOrders,
    ordersByStatus,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] } },
    }),
    prisma.product.count({ where: { published: true } }),
    prisma.customer.count(),
    prisma.product.findMany({
      where: { published: true },
      orderBy: { trendScore: "desc" },
      take: 5,
      select: {
        id: true, name: true, slug: true, price: true, trendScore: true,
        images: { take: 1, select: { url: true } },
      },
    }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, orderNumber: true, customerName: true, customerEmail: true,
        status: true, total: true, createdAt: true,
      },
    }),
    prisma.order.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ]);

  return NextResponse.json({
    ordersCount,
    revenue: revenueData._sum.total || 0,
    productsCount,
    customersCount,
    topProducts,
    recentOrders,
    ordersByStatus: ordersByStatus.reduce((acc: Record<string, number>, row) => {
      acc[row.status] = row._count.status;
      return acc;
    }, {}),
  });
}
