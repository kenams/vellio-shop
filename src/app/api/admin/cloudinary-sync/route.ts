export const dynamic = "force-dynamic";
export const maxDuration = 25;

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadProductImages, isCloudinaryConfigured } from "@/lib/cloudinary";

// POST /api/admin/cloudinary-sync?secret=...&limit=10&offset=0
// Migrates existing Unsplash/Pexels images to Cloudinary in batches
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json({
      error: "Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in Vercel env vars.",
    }, { status: 503 });
  }

  const limit  = parseInt(req.nextUrl.searchParams.get("limit")  ?? "5");
  const offset = parseInt(req.nextUrl.searchParams.get("offset") ?? "0");
  const dryRun = req.nextUrl.searchParams.get("dry") === "1";

  const products = await prisma.product.findMany({
    where: {
      published: true,
      // Only migrate products that still use Unsplash/Pexels
      images: { some: { url: { contains: "unsplash.com" } } },
    },
    include: { images: { orderBy: { position: "asc" } } },
    skip:  offset,
    take:  limit,
    orderBy: { createdAt: "asc" },
  });

  const total = await prisma.product.count({
    where: { published: true, images: { some: { url: { contains: "unsplash.com" } } } },
  });

  const migrated: string[] = [];
  const errors:   string[] = [];

  for (const product of products) {
    const sourceUrls = product.images.map(img => img.url);
    try {
      if (!dryRun) {
        const newUrls = await uploadProductImages(sourceUrls, product.slug);
        // Only update if at least one image was successfully uploaded
        const changed = newUrls.some((u, i) => u !== sourceUrls[i]);
        if (changed) {
          await prisma.productImage.deleteMany({ where: { productId: product.id } });
          await prisma.productImage.createMany({
            data: newUrls.map((url, i) => ({ url, position: i, productId: product.id })),
          });
        }
      }
      migrated.push(product.slug);
    } catch (e: any) {
      errors.push(`${product.slug}: ${e.message}`);
    }
  }

  return NextResponse.json({
    ok:       true,
    dryRun,
    migrated: migrated.length,
    slugs:    migrated,
    errors:   errors.length > 0 ? errors : undefined,
    total,
    offset,
    hasMore:  offset + products.length < total,
    nextOffset: offset + products.length < total ? offset + limit : null,
  });
}
