import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPexelsImage } from "@/lib/pexels";
import { PRODUCT_CATALOG } from "@/lib/product-catalog";

const SECRET = process.env.ADMIN_SECRET || "Vellio@Admin2026!";

// Bestsellers scraping from public APIs and trend data
// Uses Rainforest API (Amazon) or direct keyword search
const AMAZON_BESTSELLER_KEYWORDS = [
  "air fryer",
  "robot vacuum",
  "bluetooth speaker",
  "massage gun",
  "ring light",
  "standing desk",
  "wireless charger",
  "smart watch fitness",
  "led strip lights",
  "car organizer",
  "pressure cooker",
  "foam roller",
  "espresso machine",
  "neck massager",
  "projector mini",
];

interface ScrapedProduct {
  name_fr: string;
  name_en: string;
  categorySlug: string;
  price: number;
  photoKeyword: string;
  short_fr: string;
  short_en: string;
  trendScore: number;
  source: string;
}

function mapKeywordToCategory(kw: string): string {
  const map: Record<string, string[]> = {
    "gadgets-voiture": ["car", "voiture", "auto", "driving"],
    "maison-intelligente": ["smart home", "robot vacuum", "led strip", "standing desk", "ring light"],
    "cuisine-pratique": ["air fryer", "espresso", "pressure cooker", "kitchen", "blender"],
    "sport-fitness": ["massage gun", "foam roller", "fitness", "workout", "yoga"],
    "beaute-soin": ["skincare", "beauty", "hair", "face"],
    "tech-gadgets": ["bluetooth speaker", "wireless charger", "smart watch", "projector", "earbuds"],
    "bureau-productivite": ["standing desk", "organizer", "desk", "office", "monitor"],
    "enfant-famille": ["kids", "baby", "family", "children"],
  };
  for (const [cat, keywords] of Object.entries(map)) {
    if (keywords.some((k) => kw.toLowerCase().includes(k))) return cat;
  }
  return "tech-gadgets";
}

// Fetch trending product data from Google Trends via SerpApi (if available)
// Falls back to catalog-based enrichment
async function scrapeAmazonBestsellers(): Promise<ScrapedProduct[]> {
  const products: ScrapedProduct[] = [];

  // Method 1: Check if Rainforest API key is configured
  const rainforestKey = process.env.RAINFOREST_API_KEY;
  if (rainforestKey) {
    try {
      for (const keyword of AMAZON_BESTSELLER_KEYWORDS.slice(0, 5)) {
        const url = `https://api.rainforestapi.com/request?api_key=${rainforestKey}&type=search&amazon_domain=amazon.fr&search_term=${encodeURIComponent(keyword)}&sort_by=featured`;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) continue;
        const data = await res.json();
        const results = data.search_results?.slice(0, 3) || [];
        for (const item of results) {
          if (!item.title || !item.price?.value) continue;
          const price = parseFloat(String(item.price.value).replace(/[^0-9.]/g, ""));
          if (!price || price < 10 || price > 300) continue;
          products.push({
            name_en: item.title.slice(0, 80),
            name_fr: item.title.slice(0, 80),
            categorySlug: mapKeywordToCategory(keyword),
            price: Math.round(price * 100) / 100,
            photoKeyword: keyword + " product bestseller",
            short_fr: `${item.title.slice(0, 60)} — bestseller Amazon, livraison rapide.`,
            short_en: `${item.title.slice(0, 60)} — Amazon bestseller, fast delivery.`,
            trendScore: 75 + Math.floor(Math.random() * 20),
            source: "amazon-rainforest",
          });
        }
      }
    } catch {
      // API error, continue to fallback
    }
  }

  // Method 2: Use SerpApi Google Shopping
  const serpKey = process.env.SERP_API_KEY;
  if (serpKey && products.length < 10) {
    try {
      for (const keyword of AMAZON_BESTSELLER_KEYWORDS.slice(0, 5)) {
        const url = `https://serpapi.com/search?api_key=${serpKey}&engine=google_shopping&q=${encodeURIComponent(keyword)}&gl=fr&hl=fr&num=5`;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) continue;
        const data = await res.json();
        const items = data.shopping_results?.slice(0, 3) || [];
        for (const item of items) {
          if (!item.title || !item.price) continue;
          const price = parseFloat(String(item.price).replace(/[^0-9.]/g, "").replace(",", "."));
          if (!price || price < 10 || price > 300) continue;
          products.push({
            name_en: item.title.slice(0, 80),
            name_fr: item.title.slice(0, 80),
            categorySlug: mapKeywordToCategory(keyword),
            price: Math.round(price * 100) / 100,
            photoKeyword: keyword + " bestseller",
            short_fr: `${item.title.slice(0, 60)} — tendance Google Shopping, qualité vérifiée.`,
            short_en: `${item.title.slice(0, 60)} — Google Shopping trending, verified quality.`,
            trendScore: 72 + Math.floor(Math.random() * 23),
            source: "google-shopping",
          });
        }
      }
    } catch {
      // continue
    }
  }

  // Method 3: Fallback — generate products from catalog keywords not yet in DB
  if (products.length < 5) {
    const existingIds = await prisma.product.findMany({ select: { sku: true } });
    const existingSkus = new Set(existingIds.map((p) => p.sku));
    const unimported = PRODUCT_CATALOG.filter((c) => !existingSkus.has(c.id));

    for (const cat of unimported.slice(0, 15)) {
      products.push({
        name_fr: cat.name_fr,
        name_en: cat.name_en,
        categorySlug: cat.categorySlug,
        price: cat.price,
        photoKeyword: cat.photoKeyword,
        short_fr: cat.short_fr,
        short_en: cat.short_en,
        trendScore: cat.trendScore,
        source: "catalog-unimported",
      });
    }
  }

  return products;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("secret") !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dryRun = searchParams.get("dry") === "1";

  try {
    const scraped = await scrapeAmazonBestsellers();

    if (dryRun) {
      return NextResponse.json({ count: scraped.length, products: scraped.slice(0, 5), dryRun: true });
    }

    let imported = 0;
    const errors: string[] = [];

    for (const product of scraped) {
      try {
        const category = await prisma.category.findFirst({ where: { slug: product.categorySlug } });
        if (!category) continue;

        // Check slug uniqueness
        const baseSlug = product.name_fr
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .slice(0, 60);
        const suffix = `-sc${Date.now().toString(36)}`;
        const slug = baseSlug + suffix;

        const existing = await prisma.product.findFirst({ where: { slug } });
        if (existing) continue;

        // Get image
        let imageUrl = "/placeholder.jpg";
        try {
          imageUrl = await getPexelsImage(product.photoKeyword);
        } catch {
          //
        }

        await prisma.product.create({
          data: {
            slug,
            sku: `scraped-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: product.name_fr,
            shortDescription: product.short_fr,
            description: `<p>${product.short_fr}</p><p>${product.short_en}</p>`,
            price: product.price,
            comparePrice: Math.round(product.price * 1.35 * 100) / 100,
            cost: Math.round(product.price * 0.25 * 100) / 100,
            trendScore: product.trendScore,
            featured: product.trendScore >= 85,
            published: product.trendScore >= 75,
            categoryId: category.id,
            images: {
              create: [{ url: imageUrl, alt: product.name_fr, position: 0 }],
            },
          },
        });
        imported++;
      } catch (e) {
        errors.push(String(e).slice(0, 100));
      }
    }

    return NextResponse.json({
      ok: true,
      scraped: scraped.length,
      imported,
      errors: errors.slice(0, 5),
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
