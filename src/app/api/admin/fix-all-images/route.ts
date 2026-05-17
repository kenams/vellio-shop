export const dynamic = "force-dynamic";
export const maxDuration = 25; // Vercel hobby limit

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCuratedProductImages } from "@/lib/product-image-rules";

const ADMIN_SECRET = "Vellio@Admin2026!";

async function fetchPexelsProduct(keyword: string): Promise<string[]> {
  const key = process.env.PEXELS_API_KEY?.trim();
  if (!key) return [];
  // Tronquer à 30 chars + " product" pour éviter paysages
  const shortKeyword = keyword.length > 30 ? keyword.slice(0, 30) : keyword;
  const safeKeyword = `${shortKeyword} product`;
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(safeKeyword)}&per_page=4&orientation=square`,
      { headers: { Authorization: key }, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.photos || [])
      .slice(0, 3)
      .map((p: any) => p.src?.large || p.src?.medium || "")
      .filter(Boolean);
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  const startTime = Date.now();
  let fixed = 0;
  let skipped = 0;
  const errors: string[] = [];

  try {
    // Récupérer les produits par batch
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
      // Vérifier si les images actuelles semblent incorrectes (paysages = URLs Pexels sans mapping)
      // On re-curate toujours pour corriger
      const categorySlug = product.category?.slug || "";

      // 1. Essayer les images curées
      const curated = getCuratedProductImages({
        slug: product.slug,
        name: product.name,
        photoKeyword: product.name,
        categorySlug,
      });

      let newImages: string[] = curated;

      // 2. Si pas de curated, chercher Pexels avec "product" dans le keyword
      if (newImages.length < 2) {
        const pexelsImages = await fetchPexelsProduct(product.name);
        if (pexelsImages.length >= 1) {
          newImages = pexelsImages;
        }
      }

      // 3. Si toujours rien, skip
      if (newImages.length === 0) {
        skipped++;
        continue;
      }

      // Vérifier si les images sont déjà identiques (évite updates inutiles)
      const currentUrls = product.images.map((img) => img.url);
      const isSame =
        newImages.length === currentUrls.length &&
        newImages.every((url, i) => url === currentUrls[i]);

      if (isSame) {
        skipped++;
        continue;
      }

      try {
        // Delete + recreate les images
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

      // Timeout safety: si on approche 22s, on s'arrête
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
      elapsed: `${Math.round((Date.now() - startTime) / 100) / 10}s`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message, fixed, skipped },
      { status: 500 }
    );
  }
}
