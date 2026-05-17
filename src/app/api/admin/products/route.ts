export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const ADMIN_TOKEN = process.env.ADMIN_SECRET || "vellio-admin-2024";

function checkAuth(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === ADMIN_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const published = searchParams.get("published");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: any = {};
  if (published !== null) where.published = published === "true";

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: { take: 1 }, category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const {
      name, slug, shortDescription, description, price, comparePrice,
      cost, stock, categoryId, category, images, tags, benefits,
      salesArguments, marketingAngle, tiktokScript, tiktokHashtags,
      metaTitle, metaDescription, faq, published, featured, trendScore,
      supplierUrl, supplierName,
    } = body;

    if (!name || !price || !cost) {
      return NextResponse.json({ error: "name, price and cost are required" }, { status: 400 });
    }

    const productSlug = slug || slugify(name);
    const existingSlug = await prisma.product.findUnique({ where: { slug: productSlug } });
    const finalSlug = existingSlug ? `${productSlug}-${Date.now()}` : productSlug;

    // Résoudre la catégorie
    let resolvedCategoryId = categoryId;
    if (!resolvedCategoryId && category) {
      const catSlug = slugify(category);
      const cat = await prisma.category.upsert({
        where: { slug: catSlug },
        update: {},
        create: { name: category, slug: catSlug },
      });
      resolvedCategoryId = cat.id;
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        shortDescription: shortDescription || name,
        description: description || shortDescription || name,
        price: parseFloat(price),
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        cost: parseFloat(cost),
        stock: stock || 0,
        categoryId: resolvedCategoryId || null,
        tags: tags || [],
        benefits: benefits || [],
        salesArguments: salesArguments || [],
        marketingAngle: marketingAngle || null,
        tiktokScript: tiktokScript || null,
        tiktokHashtags: tiktokHashtags || [],
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        faqJson: faq || undefined,
        published: published ?? false,
        featured: featured ?? false,
        trendScore: trendScore || 0,
        supplierUrl: supplierUrl || null,
        supplierName: supplierName || null,
        images: images?.length
          ? { create: images.map((url: string, i: number) => ({ url, position: i })) }
          : undefined,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    console.error("[admin/products POST]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
