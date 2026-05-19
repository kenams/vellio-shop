import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { PRODUCT_CATALOG, matchTrendToCategories, type CatalogProduct } from "@/lib/product-catalog";
import { getCuratedProductImages } from "@/lib/product-image-rules";
import { buildPremiumProductData } from "@/lib/premium-brand";
import { validateProductData } from "@/lib/product-validator";

export type Market = "fr" | "en-US" | "en-GB" | "en-AU";

// ─── Photo Pool (fallback — used only if curated + Pexels fail) ──────────────
// IMPORTANT: toutes ces URLs montrent des PRODUITS / APPAREILS, jamais de paysages
const PHOTO_POOL: Record<string, string[]> = {
  "gadgets-voiture": [
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80", // accessoire voiture gadget
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80", // intérieur voiture dashboard
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80", // intérieur voiture tech
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80", // car phone mount
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80", // car charger gadget
    "https://images.unsplash.com/photo-1526378800651-8438701bb3ff?w=600&q=80", // tech gadget compact
  ],
  "maison-intelligente": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", // robot aspirateur rond
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80", // smart home device
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80", // maison connectée appareil
    "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?w=600&q=80", // smart home gadget
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80", // home automation device
    "https://images.unsplash.com/photo-1600857062241-98e5dba7f5bf?w=600&q=80", // smart appliance
  ],
  "cuisine-pratique": [
    "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80", // appareil cuisine électrique
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80", // kitchen appliance
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", // cuisine moderne gadget
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80", // kitchen device coffee
    "https://images.unsplash.com/photo-1553484771-371a816b2772?w=600&q=80", // kitchen gadget prep
    "https://images.unsplash.com/photo-1622597467836-f3e6dac3e61c?w=600&q=80", // blender portable
  ],
  "sport-fitness": [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", // équipement fitness gym
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", // sport fitness appareil
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80", // musculation équipement
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80", // bandes résistance fitness
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80", // tapis yoga mat
    "https://images.unsplash.com/photo-1612444080611-5ed7532d4c2f?w=600&q=80", // massage gun fitness
  ],
  "beaute-soin": [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80", // produit beauté cosmétique
    "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=80", // routine beauté soin
    "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&q=80", // skincare produit
    "https://images.unsplash.com/photo-1614790133872-46bc31b89e3b?w=600&q=80", // sérum flacon beauté
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80", // soin visage produit
    "https://images.unsplash.com/photo-1549045783-5f2d8e8dff74?w=600&q=80", // spa beauté appareil
  ],
  "tech-gadgets": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", // gadget tech écouteurs
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80", // earbuds tech
    "https://images.unsplash.com/photo-1590658165737-15a047b7c97e?w=600&q=80", // écouteurs TWS
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80", // batterie externe tech
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80", // tech accessories
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80", // bluetooth speaker
  ],
  "bureau-productivite": [
    "https://images.unsplash.com/photo-1593642632523-1d60af4b3029?w=600&q=80", // bureau télétravail setup
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80", // desk home office
    "https://images.unsplash.com/photo-1484981138541-3d074aa97716?w=600&q=80", // workspace organisé
    "https://images.unsplash.com/photo-1526378800651-8438701bb3ff?w=600&q=80", // desk gadget tech
    "https://images.unsplash.com/photo-1561154464-062d233de9f9?w=600&q=80", // tablet productivité
    "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?w=600&q=80", // chaise bureau ergonomique
  ],
  "enfant-famille": [
    "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=600&q=80", // jouet enfant produit
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80", // kid toy famille
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80", // jouet construction enfant
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80", // bébé soin famille
    "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80", // enfant activité produit
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", // famille accessoire enfant
  ],
};

function getFallbackPhotos(categorySlug: string, productSlug: string): string[] {
  const pool = PHOTO_POOL[categorySlug] || Object.values(PHOTO_POOL)[0];
  const hash = productSlug.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
  const offset = hash % pool.length;
  return [pool[offset], pool[(offset + 1) % pool.length], pool[(offset + 2) % pool.length]];
}

// ─── Pexels API ────────────────────────────────────────────────────────────────
async function fetchPexelsImages(keyword: string): Promise<string[]> {
  const key = process.env.PEXELS_API_KEY?.trim();
  if (!key) return [];
  // Ajoute "product" au keyword pour éviter les paysages / photos nature
  const safeKeyword = keyword.includes("product") ? keyword : `${keyword} product`;
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(safeKeyword)}&per_page=4&orientation=square`,
      { headers: { Authorization: key }, signal: AbortSignal.timeout(4000) }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.photos || []).slice(0, 3).map((p: any) => p.src?.large || p.src?.medium || "").filter(Boolean);
  } catch {
    return [];
  }
}

async function fetchProductImages(keyword: string, slug: string, categorySlug: string, name: string): Promise<string[]> {
  const curated = getCuratedProductImages({ slug, name, photoKeyword: keyword, categorySlug });
  if (curated.length >= 2) {
    console.log(`[discovery] Curated: ${curated.length} images for "${name}"`);
    return curated;
  }

  const pexels = await fetchPexelsImages(keyword);
  if (pexels.length >= 2) {
    console.log(`[discovery] Pexels: ${pexels.length} images for "${keyword}"`);
    return pexels;
  }
  console.log(`[discovery] Pexels failed for "${keyword}", using category fallback`);
  return getFallbackPhotos(categorySlug, slug);
}

// ─── Google Trends RSS (no AI) ────────────────────────────────────────────────
const TREND_FALLBACKS: Record<string, string[]> = {
  FR: [
    "gadgets maison connectée", "accessoires sport fitness", "beauté naturelle soin", "cuisine pratique rapide",
    "tech gadgets", "montre connectée", "aspirateur robot", "lampe LED", "massage bien-être", "organisateur bureau",
    "bestseller amazon 2026", "tendance tiktok shop", "cadeau original homme", "gadget voiture 2026",
    "soin visage naturel", "écouteurs sans fil", "chargeur magnétique", "productivité télétravail",
    "fitness maison 2026", "objet design tendance",
  ],
  US: [
    "home gadgets", "fitness gear", "smart home", "kitchen tools", "tech accessories", "wireless earbuds",
    "robot vacuum", "LED lamp", "massage gun", "desk organizer",
    "amazon bestsellers 2026", "tiktok viral products", "gift ideas men", "car gadgets 2026",
    "skincare routine", "magnetic charger", "home office setup", "workout equipment",
    "trending products 2026", "design objects",
  ],
  GB: [
    "home gadgets", "fitness accessories", "smart home devices", "kitchen gadgets", "tech deals",
    "wireless earbuds", "robot hoover", "smart lighting", "massage gun", "desk organiser",
    "amazon bestsellers uk 2026", "trending uk 2026", "gift ideas men uk", "car accessories",
    "skincare products", "wireless charger", "home office uk", "gym equipment",
    "trending 2026", "design homeware",
  ],
  AU: [
    "outdoor gear", "fitness gadgets", "smart home tech", "kitchen tools", "tech accessories",
    "wireless earbuds", "robot vacuum", "smart lights", "massage device", "home organisation",
    "amazon au bestsellers 2026", "trending au 2026", "gift ideas australia", "car gadgets au",
    "natural skincare", "wireless charging", "home office au", "fitness equipment",
    "trending products au", "design objects au",
  ],
};

async function fetchGoogleTrends(geo: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://trends.google.fr/trends/trendingsearches/daily/rss?geo=${geo}`,
      {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
        signal: AbortSignal.timeout(4000),
        cache: "no-store",
      }
    );
    if (!res.ok) return TREND_FALLBACKS[geo] || TREND_FALLBACKS.US;
    const xml = await res.text();
    const titles: string[] = [];
    const cdataRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/g;
    const plainRegex = /<title>(?!\s*(?:Daily Search Trends|Trending Searches|RSS))(.*?)<\/title>/g;
    let match;
    while ((match = cdataRegex.exec(xml)) !== null) {
      if (!["Daily Search Trends", "Trending Searches"].includes(match[1])) titles.push(match[1]);
    }
    if (titles.length === 0) {
      while ((match = plainRegex.exec(xml)) !== null) {
        const t = match[1].trim();
        if (t && t.length > 2 && t.length < 100) titles.push(t);
      }
    }
    if (titles.length === 0) return TREND_FALLBACKS[geo] || TREND_FALLBACKS.US;
    console.log(`[discovery] Google Trends ${geo}: ${titles.length} trends`);
    return titles.slice(0, 25);
  } catch {
    return TREND_FALLBACKS[geo] || TREND_FALLBACKS.US;
  }
}

// ─── eBay Trending Items (public feed, no API key) ────────────────────────────
async function fetchEbayTrending(geo: string): Promise<string[]> {
  const domain = geo === "FR" ? "ebay.fr" : geo === "GB" ? "ebay.co.uk" : "ebay.com";
  const titles: string[] = [];
  try {
    const url = `https://www.${domain}/deals`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": geo === "FR" ? "fr-FR,fr;q=0.9" : "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return [];
    const html = await res.text();
    const matches = html.matchAll(/aria-label="([^"]{10,80})"/g);
    for (const m of matches) {
      const t = m[1].trim();
      if (t && !titles.includes(t)) titles.push(t);
      if (titles.length >= 20) break;
    }
  } catch { /* silent */ }
  console.log(`[discovery] eBay ${geo}: ${titles.length} items`);
  return titles;
}

// ─── Amazon Movers & Shakers RSS (no AI, no account needed) ──────────────────
const AMAZON_CATEGORY_MAP: Record<string, Record<string, string>> = {
  FR: {
    "gadgets-voiture": "automotive",
    "maison-intelligente": "hi",
    "cuisine-pratique": "kitchen",
    "sport-fitness": "sports",
    "beaute-soin": "beauty",
    "tech-gadgets": "electronics",
    "bureau-productivite": "officeproduct",
    "enfant-famille": "toys",
  },
  US: {
    "gadgets-voiture": "automotive",
    "maison-intelligente": "hi",
    "cuisine-pratique": "kitchen",
    "sport-fitness": "sports-and-outdoors",
    "beaute-soin": "beauty",
    "tech-gadgets": "electronics",
    "bureau-productivite": "office-products",
    "enfant-famille": "toys-and-games",
  },
  GB: {
    "gadgets-voiture": "automotive",
    "maison-intelligente": "electronics",
    "cuisine-pratique": "kitchen",
    "sport-fitness": "sports",
    "beaute-soin": "beauty",
    "tech-gadgets": "computers",
    "bureau-productivite": "officeproduct",
    "enfant-famille": "toys",
  },
};

const AMAZON_DOMAIN: Record<string, string> = {
  FR: "amazon.fr", US: "amazon.com", GB: "amazon.co.uk", AU: "amazon.com.au",
};

async function fetchAmazonTrending(geo: string): Promise<string[]> {
  const domain = AMAZON_DOMAIN[geo] || AMAZON_DOMAIN.US;
  const catMap = AMAZON_CATEGORY_MAP[geo] || AMAZON_CATEGORY_MAP.US;
  const categories = Object.values(catMap);
  const titles: string[] = [];

  // Pick 1 random category to fetch (fast fail)
  const shuffled = categories.sort(() => Math.random() - 0.5).slice(0, 1);

  for (const cat of shuffled) {
    try {
      const url = `https://www.${domain}/gp/movers-and-shakers/${cat}/ref=zg_bs_nav_0`;
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": geo === "FR" ? "fr-FR,fr;q=0.9" : "en-US,en;q=0.9",
          "Accept": "text/html,application/xhtml+xml",
        },
        signal: AbortSignal.timeout(2500),
      });
      if (!res.ok) continue;
      const html = await res.text();
      // Extract product titles from Amazon HTML
      const titleMatches = html.matchAll(/class="[^"]*zg-item[^"]*"[^>]*>[\s\S]*?<(?:span|div)[^>]*class="[^"]*p13n-sc-truncate[^"]*"[^>]*>([\s\S]*?)<\/(?:span|div)>/gi);
      for (const m of titleMatches) {
        const title = m[1].replace(/<[^>]+>/g, "").trim();
        if (title && title.length > 5 && title.length < 150) titles.push(title);
        if (titles.length >= 20) break;
      }
      // Also try simpler title extraction
      const altMatches = html.matchAll(/"zg_title">([^<]{10,100})</g);
      for (const m of altMatches) {
        titles.push(m[1].trim());
      }
    } catch {
      // silently continue
    }
  }

  console.log(`[discovery] Amazon ${geo}: ${titles.length} product titles scraped`);
  return titles.slice(0, 30);
}

// ─── Catalog-based product selection ─────────────────────────────────────────
async function getAlreadyAddedSlugs(): Promise<Set<string>> {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return new Set(products.map(p => p.slug));
}

function selectProductsFromCatalog(
  categoryOrder: string[],
  locale: string,
  alreadySlugs: Set<string>,
  count = 3
): CatalogProduct[] {
  const selected: CatalogProduct[] = [];
  const usedIds = new Set<string>();

  // Try to pick one from each top category first
  for (const cat of categoryOrder) {
    if (selected.length >= count) break;
    const inCat = PRODUCT_CATALOG.filter(p => p.categorySlug === cat && !usedIds.has(p.id));
    // Shuffle to add variety
    const shuffled = inCat.sort(() => Math.random() - 0.5);
    for (const product of shuffled) {
      const slug = slugify(locale === "fr" ? product.name_fr : product.name_en);
      if (!alreadySlugs.has(slug)) {
        selected.push(product);
        usedIds.add(product.id);
        break;
      }
    }
  }

  // Fill remaining slots from any category
  if (selected.length < count) {
    const remaining = PRODUCT_CATALOG.filter(p => !usedIds.has(p.id))
      .sort(() => Math.random() - 0.5);
    for (const product of remaining) {
      if (selected.length >= count) break;
      const slug = slugify(locale === "fr" ? product.name_fr : product.name_en);
      if (!alreadySlugs.has(slug)) {
        selected.push(product);
        usedIds.add(product.id);
      }
    }
  }

  return selected;
}

// ─── Main discovery runner (NO AI) ───────────────────────────────────────────
export interface DiscoveryResult {
  added: number;
  skipped: number;
  errors: number;
  products: string[];
  market: string;
  debug?: string;
}

export async function runDiscovery(market: Market = "fr"): Promise<DiscoveryResult> {
  const result: DiscoveryResult = { added: 0, skipped: 0, errors: 0, products: [], market };
  const locale = market === "fr" ? "fr" : "en";
  const geoMap: Record<Market, string> = { fr: "FR", "en-US": "US", "en-GB": "GB", "en-AU": "AU" };
  const geo = geoMap[market];

  console.log(`[discovery] === START market=${market} geo=${geo} locale=${locale} ===`);

  // 1. Fetch trending data from Google Trends + Amazon + eBay (no AI)
  const [googleTrends, amazonTrends, ebayTrends] = await Promise.all([
    fetchGoogleTrends(geo),
    fetchAmazonTrending(geo),
    fetchEbayTrending(geo),
  ]);
  const allTrends = [...googleTrends, ...amazonTrends, ...ebayTrends];
  console.log(`[discovery] Trends: ${googleTrends.length} Google + ${amazonTrends.length} Amazon + ${ebayTrends.length} eBay = ${allTrends.length} total`);

  // 2. Match trends to categories
  const categoryOrder = matchTrendToCategories(allTrends);
  console.log(`[discovery] Category priority: ${categoryOrder.slice(0, 4).join(", ")}`);

  // 3. Get slugs already in DB
  const alreadySlugs = await getAlreadyAddedSlugs();
  console.log(`[discovery] ${alreadySlugs.size} products already in DB`);

  // 4. Select products from catalog based on trend-matched categories
  const toAdd = selectProductsFromCatalog(categoryOrder, locale, alreadySlugs, 10);
  console.log(`[discovery] ${toAdd.length} products selected from catalog: ${toAdd.map(p => locale === "fr" ? p.name_fr : p.name_en).join(", ")}`);

  if (toAdd.length === 0) {
    result.debug = "All catalog products already in DB";
    console.log("[discovery] All catalog products already added");
    return result;
  }

  // 5. Create each product
  for (const catalogProduct of toAdd) {
    const name = locale === "fr" ? catalogProduct.name_fr : catalogProduct.name_en;
    const slug = slugify(name);

    try {
      // Double-check not in DB
      const exists = await prisma.product.findUnique({ where: { slug } });
      if (exists) {
        console.log(`[discovery] Skip (exists): ${name}`);
        result.skipped++;
        continue;
      }

      // Get or create category
      let category = await prisma.category.findUnique({ where: { slug: catalogProduct.categorySlug } });
      if (!category) {
        category = await prisma.category.findFirst();
        if (!category) { result.errors++; continue; }
      }

      // Fetch images via curated rules / Pexels / fallback
      const images = await fetchProductImages(catalogProduct.photoKeyword, slug, catalogProduct.categorySlug, name);

      // ── Validation pipeline : UN PRODUIT = SES PROPRES IMAGES UNIQUEMENT ──
      const validation = validateProductData({
        name,
        slug,
        images,
        categorySlug: catalogProduct.categorySlug,
      });
      if (!validation.valid) {
        console.warn(`[discovery] ⚠️ Produit rejeté "${name}" — ${validation.reason}`);
        result.errors++;
        continue;
      }

      // Build product data from catalog (no AI)
      const comparePrice = Math.round(catalogProduct.price * 1.45 * 100) / 100;
      const description = locale === "fr" ? catalogProduct.desc_fr : catalogProduct.desc_en;
      const shortDescription = locale === "fr" ? catalogProduct.short_fr : catalogProduct.short_en;
      const benefits = locale === "fr" ? catalogProduct.benefits_fr : catalogProduct.benefits_en;
      const salesArguments = locale === "fr" ? catalogProduct.args_fr : catalogProduct.args_en;
      const premiumData = buildPremiumProductData({
        slug,
        name,
        shortDescription,
        description,
        benefits,
        salesArguments,
        trendScore: catalogProduct.trendScore,
        category: { slug: catalogProduct.categorySlug },
      }, locale);

      const product = await prisma.product.create({
        data: {
          name: premiumData.name,
          slug,
          shortDescription: premiumData.shortDescription,
          description: premiumData.description,
          price: catalogProduct.price,
          comparePrice,
          cost: catalogProduct.cost,
          stock: Math.floor(Math.random() * 60) + 20,
          trendScore: catalogProduct.trendScore + Math.floor(Math.random() * 5) - 2,
          featured: catalogProduct.trendScore >= 85,
          published: catalogProduct.trendScore >= 70,
          locale,
          categoryId: category.id,
          tags: catalogProduct.tags,
          benefits: premiumData.benefits,
          salesArguments: premiumData.salesArguments,
          marketingAngle: premiumData.marketingAngle,
          tiktokHashtags: catalogProduct.tags.map(t => `#${t.replace(/\s+/g, "")}`),
          supplierUrl: catalogProduct.supplierUrl || null,
          supplierName: catalogProduct.supplierUrl ? "AliExpress" : null,
          estimatedMargin: Math.round(((catalogProduct.price - catalogProduct.cost) / catalogProduct.price) * 100),
          images: {
            create: images.map((url, i) => ({ url, position: i })),
          },
        },
      });

      await prisma.trendScore.create({
        data: {
          productId: product.id,
          score: product.trendScore,
          popularity: Math.round(catalogProduct.trendScore * 0.9),
          tiktokTrend: Math.round(catalogProduct.trendScore * 0.95),
          searchVolume: Math.round(catalogProduct.trendScore * 0.85),
          margin: Math.round(((catalogProduct.price - catalogProduct.cost) / catalogProduct.price) * 100),
          competition: 40 + Math.floor(Math.random() * 20),
          viralPotential: Math.round(catalogProduct.trendScore * 0.9),
          safetyRisk: 5,
          seasonality: 75,
          seoPotential: 70,
        },
      });

      result.added++;
      result.products.push(name);
      console.log(`[discovery] ✅ Added: ${name} (locale=${locale}, images=${images.length}, score=${product.trendScore})`);
    } catch (err: any) {
      console.error(`[discovery] ❌ Error for ${name}: ${err.message}`);
      result.errors++;
    }
  }

  console.log(`[discovery] === DONE: +${result.added} added, ${result.skipped} skipped, ${result.errors} errors ===`);
  return result;
}
