import { MetadataRoute } from "next";

const BASE = "https://vellio.fr";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/produits`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/cadeaux-premium`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/objets-design-maison`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.82 },
    { url: `${BASE}/blog/art-du-detail-maison-vellio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.55 },
    { url: `${BASE}/blog/tech-signature-sans-bruit-visuel`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.55 },
    { url: `${BASE}/blog/cadeaux-haut-de-gamme-utiles`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.55 },
    { url: `${BASE}/blog/rituels-beaute-minimalistes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.55 },
    { url: `${BASE}/blog/meilleurs-cadeaux-homme-originaux-2026`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/blog/accessoires-bureau-design-premium-teletravail`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/blog/objets-design-tendance-maison-2026`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/blog/idee-cadeau-anniversaire-original-femme`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.65 },
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
