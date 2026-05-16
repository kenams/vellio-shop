import { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_APP_URL || "https://vellio.fr";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/produits`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/suivi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/cgv`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/confidentialite`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/remboursement`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  try {
    const { prisma } = await import("@/lib/prisma");
    const [products, categories] = await Promise.all([
      prisma.product.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.category.findMany({ select: { slug: true, createdAt: true } }),
    ]);

    const productPages: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${BASE}/produits/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${BASE}/categorie/${c.slug}`,
      lastModified: c.createdAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticPages, ...productPages, ...categoryPages];
  } catch {
    return staticPages;
  }
}
