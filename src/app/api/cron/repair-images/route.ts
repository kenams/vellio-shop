export const dynamic = "force-dynamic";
export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCuratedProductImages } from "@/lib/product-image-rules";

function getBearerSecret(req: NextRequest): string | null {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  return auth.replace(/^Bearer\s+/i, "").trim();
}

function sameImages(current: { url: string }[], next: string[]): boolean {
  if (current.length !== next.length) return false;
  return next.every((url, index) => current[index]?.url === url);
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") || getBearerSecret(req);
  const expected = process.env.CRON_SECRET || process.env.ADMIN_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const products = await prisma.product.findMany({
      where: { published: true },
      include: {
        category: { select: { slug: true } },
        images: { orderBy: { position: "asc" }, select: { url: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    let updated = 0;
    let skipped = 0;
    const repaired: Array<{ slug: string; name: string; from: string | null; to: string }> = [];

    for (const product of products) {
      const images = getCuratedProductImages({
        slug: product.slug,
        name: product.name,
        categorySlug: product.category?.slug,
        photoKeyword: product.name,
      });

      if (images.length < 2) {
        skipped++;
        continue;
      }

      if (sameImages(product.images, images)) {
        skipped++;
        continue;
      }

      await prisma.$transaction([
        prisma.productImage.deleteMany({ where: { productId: product.id } }),
        prisma.productImage.createMany({
          data: images.map((url, position) => ({
            productId: product.id,
            url,
            position,
            alt: product.name,
          })),
        }),
      ]);

      updated++;
      repaired.push({
        slug: product.slug,
        name: product.name,
        from: product.images[0]?.url || null,
        to: images[0],
      });
    }

    const mainImages: Record<string, string[]> = {};
    for (const product of products) {
      const nextImages = getCuratedProductImages({
        slug: product.slug,
        name: product.name,
        categorySlug: product.category?.slug,
        photoKeyword: product.name,
      });
      const main = nextImages[0] || product.images[0]?.url;
      if (!main) continue;
      mainImages[main] = [...(mainImages[main] || []), product.slug];
    }

    const duplicateMainImages = Object.entries(mainImages)
      .filter(([, slugs]) => slugs.length > 1)
      .map(([image, slugs]) => ({ image, slugs }));

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      checked: products.length,
      updated,
      skipped,
      duplicateMainImages,
      repaired,
    });
  } catch (err: any) {
    console.error("[cron/repair-images] Error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}

