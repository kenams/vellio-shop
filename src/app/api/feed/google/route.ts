export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BASE = "https://vellio.fr";

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const CATEGORY_MAP: Record<string, string> = {
  "maison-intelligente": "Home & Garden > Decor > Home Fragrances",
  "tech-gadgets": "Electronics > Consumer Electronics",
  "beaute-soin": "Health & Beauty > Personal Care",
  "gadgets-voiture": "Vehicles & Parts > Vehicle Parts & Accessories",
  "bureau-productivite": "Office Supplies",
  "mode-accessoires": "Apparel & Accessories > Jewelry",
  "sport-outdoor": "Sporting Goods",
  "cadeaux-premium": "Home & Garden > Decor",
};

export async function GET() {
  const products = await prisma.product.findMany({
    where: { published: true },
    include: {
      images: { orderBy: { position: "asc" }, take: 5 },
      category: { select: { slug: true, name: true } },
    },
    orderBy: { trendScore: "desc" },
  });

  const items = products.map((p) => {
    const mainImage = p.images[0]?.url || "";
    const additionalImages = p.images.slice(1, 5).map((img) =>
      `<g:additional_image_link>${esc(img.url)}</g:additional_image_link>`
    ).join("\n      ");
    const category = CATEGORY_MAP[p.category?.slug || ""] || "Home & Garden > Decor";
    const availability = p.stock > 0 ? "in stock" : "preorder";
    const comparePrice = p.comparePrice && p.comparePrice > p.price
      ? `<g:sale_price>${p.price.toFixed(2)} EUR</g:sale_price>\n      <g:price>${p.comparePrice.toFixed(2)} EUR</g:price>`
      : `<g:price>${p.price.toFixed(2)} EUR</g:price>`;

    return `
    <item>
      <g:id>${esc(p.id)}</g:id>
      <g:title>${esc(p.name)}</g:title>
      <g:description>${esc(p.shortDescription || p.name)}</g:description>
      <g:link>${BASE}/produits/${esc(p.slug)}</g:link>
      <g:image_link>${esc(mainImage)}</g:image_link>
      ${additionalImages}
      ${comparePrice}
      <g:availability>${availability}</g:availability>
      <g:condition>new</g:condition>
      <g:brand>Vellio</g:brand>
      <g:google_product_category>${esc(category)}</g:google_product_category>
      <g:product_type>${esc(p.category?.name || "Sélection Vellio")}</g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>FR</g:country>
        <g:price>${p.price >= 50 ? "0.00" : "4.99"} EUR</g:price>
      </g:shipping>
      <g:custom_label_0>${p.featured ? "featured" : "standard"}</g:custom_label_0>
      <g:custom_label_1>${p.trendScore >= 80 ? "trending" : p.trendScore >= 60 ? "popular" : "standard"}</g:custom_label_1>
    </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Vellio — Maison de sélection contemporaine</title>
    <link>${BASE}</link>
    <description>Objets design, tech premium et accessoires lifestyle sélectionnés par Vellio.</description>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
