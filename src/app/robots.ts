import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/commande/", "/panier/"] },
      { userAgent: "Googlebot", allow: "/" },
    ],
    sitemap: "https://vellio-shop.vercel.app/sitemap.xml",
    host: "https://vellio-shop.vercel.app",
  };
}
