import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getCachedFeaturedProducts = unstable_cache(
  async () => prisma.product.findMany({
    where: { published: true },
    include: { images: { take: 1, orderBy: { position: "asc" } }, category: true },
    orderBy: [{ featured: "desc" }, { trendScore: "desc" }],
    take: 8,
  }),
  ["featured-products"],
  { revalidate: 300, tags: ["products"] }
);

export const getCachedCategories = unstable_cache(
  async () => prisma.category.findMany({ orderBy: { createdAt: "asc" } }),
  ["categories"],
  { revalidate: 600, tags: ["categories"] }
);

export const getCachedTrendingProducts = unstable_cache(
  async () => prisma.product.findMany({
    where: { published: true },
    include: { images: { take: 1, orderBy: { position: "asc" } }, category: true, trendData: true },
    orderBy: { trendScore: "desc" },
    take: 4,
  }),
  ["trending-products"],
  { revalidate: 300, tags: ["products"] }
);

export const getCachedProductsPage = unstable_cache(
  async (q?: string, categoryId?: string, orderBy?: any) => {
    const where: any = { published: true };
    if (q) { where.OR = [{ name: { contains: q, mode: "insensitive" } }, { shortDescription: { contains: q, mode: "insensitive" } }]; }
    if (categoryId) where.categoryId = categoryId;
    return prisma.product.findMany({
      where,
      include: { images: { take: 1, orderBy: { position: "asc" } }, category: true, trendData: true },
      orderBy: orderBy || [{ featured: "desc" }, { trendScore: "desc" }],
    });
  },
  ["products-page"],
  { revalidate: 180, tags: ["products"] }
);
