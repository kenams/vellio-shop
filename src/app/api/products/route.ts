export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products?page=1&limit=20&category=tech-gadgets&q=robot&sort=trending
export async function GET(req: NextRequest) {
  const sp       = req.nextUrl.searchParams;
  const page     = Math.max(1, parseInt(sp.get("page")  ?? "1"));
  const limit    = Math.min(50, Math.max(1, parseInt(sp.get("limit") ?? "20")));
  const category = sp.get("category");
  const q        = sp.get("q");
  const sort     = sp.get("sort") ?? "trending"; // trending | price-asc | price-desc | newest

  const where: any = { published: true };
  if (category) where.category = { slug: category };
  if (q) where.OR = [
    { name:             { contains: q, mode: "insensitive" } },
    { shortDescription: { contains: q, mode: "insensitive" } },
    { tags:             { has: q } },
  ];

  const orderBy: any =
    sort === "price-asc"  ? { price: "asc" }  :
    sort === "price-desc" ? { price: "desc" } :
    sort === "newest"     ? { createdAt: "desc" } :
    [{ trendScore: "desc" }, { featured: "desc" }];

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip:    (page - 1) * limit,
      take:    limit,
      select: {
        id: true, slug: true, name: true, shortDescription: true,
        price: true, comparePrice: true, trendScore: true,
        featured: true, locale: true, tags: true,
        category: { select: { slug: true, name: true } },
        images:   { take: 3, orderBy: { position: "asc" }, select: { url: true, position: true } },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({
    ok:          true,
    page,
    limit,
    total,
    totalPages:  Math.ceil(total / limit),
    hasNext:     page * limit < total,
    hasPrev:     page > 1,
    products,
  }, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
  });
}
