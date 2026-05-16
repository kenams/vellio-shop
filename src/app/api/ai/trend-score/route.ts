import { NextRequest, NextResponse } from "next/server";
import { calculateTrendScore, discoverTrendingProducts } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { productId, category } = await req.json();

    // Discover new trending products
    if (category && !productId) {
      const data = await discoverTrendingProducts(category);
      return NextResponse.json(data);
    }

    // Score an existing product
    if (productId) {
      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product) return NextResponse.json({ error: "not_found" }, { status: 404 });

      const score = await calculateTrendScore({
        name: product.name,
        category: "général",
        supplierPrice: product.cost,
        targetPrice: product.price,
        description: product.shortDescription,
      });

      await prisma.trendScore.upsert({
        where: { productId },
        create: { productId, ...score },
        update: { ...score },
      });
      await prisma.product.update({ where: { id: productId }, data: { trendScore: score.score } });

      return NextResponse.json(score);
    }

    return NextResponse.json({ error: "missing_params" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
