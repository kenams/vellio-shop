import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vellio-shop.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/produits/", "/categorie/", "/blog/", "/contact", "/cadeaux-premium", "/objets-design-maison", "/gadgets-tech-tendance", "/accessoires-sport-maison", "/cuisine-equipement-maison"],
        disallow: ["/api/", "/admin/", "/commande/", "/panier/", "/suivi/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/commande/", "/panier/", "/suivi/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
