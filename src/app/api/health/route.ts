export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [productCount, imageCount] = await Promise.all([
      prisma.product.count({ where: { published: true } }),
      prisma.productImage.count(),
    ]);

    return NextResponse.json({
      status:    "ok",
      timestamp: new Date().toISOString(),
      version:   "2.0.0",
      db:        "connected",
      products:  productCount,
      images:    imageCount,
      services: {
        database:   "supabase",
        hosting:    "vercel",
        cdn:        "unsplash+cloudinary",
        payments:   "stripe",
        email:      "resend",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", error: err.message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
