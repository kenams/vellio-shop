import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  const orderNumber = searchParams.get("orderNumber");
  const email = searchParams.get("email");

  try {
    if (sessionId) {
      const order = await prisma.order.findFirst({
        where: { stripeSessionId: sessionId },
        include: { items: true },
      });
      if (!order) return NextResponse.json({ error: "not_found" }, { status: 404 });
      return NextResponse.json(order);
    }

    if (orderNumber && email) {
      const order = await prisma.order.findFirst({
        where: {
          orderNumber,
          customerEmail: { equals: email, mode: "insensitive" },
        },
        include: { items: true },
      });
      if (!order) return NextResponse.json({ error: "not_found" }, { status: 404 });
      return NextResponse.json(order);
    }

    return NextResponse.json({ error: "missing_params: provide session_id or orderNumber+email" }, { status: 400 });
  } catch (err: any) {
    console.error("[orders GET]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const ADMIN_TOKEN = process.env.ADMIN_SECRET || "vellio-admin-2024";
  const token = req.headers.get("x-admin-token");
  if (token !== ADMIN_TOKEN) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, status, trackingNumber, notes } = body;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const data: Record<string, any> = {};
    if (status) data.status = status;
    if (trackingNumber !== undefined) data.trackingNumber = trackingNumber;
    if (notes !== undefined) data.notes = notes;

    const order = await prisma.order.update({ where: { id }, data, include: { items: true } });
    return NextResponse.json(order);
  } catch (err: any) {
    console.error("[orders PATCH]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
