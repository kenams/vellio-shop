export const dynamic = "force-dynamic";
export const maxDuration = 25; // Vercel hobby limit

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCuratedProductImages } from "@/lib/product-image-rules";

const ADMIN_SECRET = "Vellio@Admin2026!";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");
  // force=true → supprime toutes les images existantes avant de recréer
  const force = searchParams.get("force") === "true";

  const startTime = Date.now();
  let fixed = 0;
  let skipped = 0;
  const errors: string[] = [];

  try {
    const products = await prisma.product.findMany({
      include: {
        images: { orderBy: { position: "asc" } },
        category: { select: { slug: true } },
      },
      orderBy: { createdAt: "asc" },
      skip: offset,
      take: limit,
    });

    const total = await prisma.product.count();

    for (const product of products) {
      const categorySlug = product.category?.slug || "";

      const curated = getCuratedProductImages({
        slug: product.slug,
        name: product.name,
        photoKeyword: product.name,
        categorySlug,
      });

      const newImages = curated;

      // Si aucune image curée disponible → skip
      if (newImages.length === 0) {
        skipped++;
        continue;
      }

      if (force) {
        // Mode force : DELETE + recreate systématiquement
        try {
          await prisma.productImage.deleteMany({ where: { productId: product.id } });
          await prisma.productImage.createMany({
            data: newImages.map((url, i) => ({
              url,
              position: i,
              productId: product.id,
            })),
          });
          fixed++;
        } catch (err: any) {
          errors.push(`${product.slug}: ${err.message}`);
        }
      } else {
        // Mode normal : skip si images déjà identiques
        const currentUrls = product.images.map((img) => img.url);
        const isSame =
          newImages.length === currentUrls.length &&
          newImages.every((url, i) => url === currentUrls[i]);

        if (isSame) {
          skipped++;
          continue;
        }

        try {
          await prisma.productImage.deleteMany({ where: { productId: product.id } });
          await prisma.productImage.createMany({
            data: newImages.map((url, i) => ({
              url,
              position: i,
              productId: product.id,
            })),
          });
          fixed++;
        } catch (err: any) {
          errors.push(`${product.slug}: ${err.message}`);
        }
      }

      // Timeout safety : si on approche 22s, on s'arrête
      if (Date.now() - startTime > 22000) {
        break;
      }
    }

    const nextOffset = offset + products.length;
    const hasMore = nextOffset < total;

    return NextResponse.json({
      ok: true,
      fixed,
      skipped,
      errors: errors.slice(0, 10),
      total,
      offset,
      nextOffset: hasMore ? nextOffset : null,
      processed: products.length,
      hasMore,
      force,
      elapsed: `${Math.round((Date.now() - startTime) / 100) / 10}s`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message, fixed, skipped },
      { status: 500 }
    );
  }
}
