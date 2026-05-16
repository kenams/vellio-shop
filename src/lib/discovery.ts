import { prisma } from "@/lib/prisma";
import { openai, generateProductSheet, calculateTrendScore } from "@/lib/openai";
import { slugify } from "@/lib/utils";

// Pool de photos Unsplash par catégorie (libres de droits, stables)
const PHOTO_POOL: Record<string, string[]> = {
  "gadgets-voiture": [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80",
  ],
  "maison-intelligente": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?w=600&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
  ],
  "cuisine-pratique": [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  ],
  "sport-fitness": [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&q=80",
  ],
  "beaute-soin": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&q=80",
  ],
  "tech-gadgets": [
    "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=600&q=80",
    "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600&q=80",
  ],
  "bureau-productivite": [
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    "https://images.unsplash.com/photo-1524820197278-540916411e20?w=600&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    "https://images.unsplash.com/photo-1498075702571-ecb018f3752d?w=600&q=80",
  ],
  "enfant-famille": [
    "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=600&q=80",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80",
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
  ],
};

const FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
];

function getPhotosForCategory(categorySlug: string): string[] {
  const pool = PHOTO_POOL[categorySlug] || FALLBACK_PHOTOS;
  // Return 2 random photos from the pool
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}

// Fetch Google Trends RSS for France
async function fetchGoogleTrends(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://trends.google.fr/trends/trendingsearches/daily/rss?geo=FR",
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; VellioBot/1.0)" }, next: { revalidate: 0 } }
    );
    const xml = await res.text();
    const titles: string[] = [];
    const regex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/g;
    let match;
    while ((match = regex.exec(xml)) !== null) {
      if (match[1] !== "Daily Search Trends") titles.push(match[1]);
    }
    return titles.slice(0, 25);
  } catch {
    // Fallback: return generic trending categories
    return [
      "gadgets maison", "accessoires sport", "beauté naturelle",
      "cuisine rapide", "tech connecté", "bien-être", "organisation bureau",
    ];
  }
}

// Use OpenAI to find 3 product opportunities from trends
async function identifyOpportunities(trends: string[]): Promise<Array<{
  name: string;
  categorySlug: string;
  estimatedPrice: number;
  supplierPrice: number;
  photoKeyword: string;
  why: string;
}>> {
  const resp = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{
      role: "system",
      content: "Tu es un expert dropshipping France 2026. Tu identifies des opportunités produit légales, non contrefaites, vendables en dropshipping.",
    }, {
      role: "user",
      content: `Voici les tendances Google France du jour : ${trends.slice(0, 15).join(", ")}

Identifie exactement 3 produits physiques à fort potentiel dropshipping basés sur ces tendances ou dans leur contexte.

Règles:
- Produits légaux uniquement (pas d'alcool, tabac, médicaments, armes, contrefaçons)
- Marge minimum 45%
- Prix de vente entre 15€ et 200€
- Catégories disponibles: gadgets-voiture, maison-intelligente, cuisine-pratique, sport-fitness, beaute-soin, tech-gadgets, bureau-productivite, enfant-famille

Retourne UNIQUEMENT un JSON valide:
{
  "products": [
    {
      "name": "Nom produit accrocheur en français",
      "categorySlug": "une-des-8-categories",
      "estimatedPrice": 39.99,
      "supplierPrice": 9.50,
      "photoKeyword": "product photo keyword in english",
      "why": "pourquoi ce produit est tendance maintenant (1 phrase)"
    }
  ]
}`,
    }],
    response_format: { type: "json_object" },
    temperature: 0.9,
  });

  const data = JSON.parse(resp.choices[0].message.content || "{}");
  return (data.products || []).slice(0, 3);
}

// Try to get real product images from AliExpress search
async function fetchAliExpressImages(keyword: string): Promise<string[]> {
  try {
    const encoded = encodeURIComponent(keyword);
    const url = `https://www.aliexpress.com/glosearch/api/product?keywords=${encoded}&currency=EUR&language=fr_FR&sortType=default&page=1&pageSize=5`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://www.aliexpress.com",
        "Accept": "application/json",
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items = data?.data?.datas || data?.data?.item || [];
    const images: string[] = [];
    for (const item of items.slice(0, 3)) {
      const img = item.imageUrl || item.productMainImageUrl || item.image;
      if (img && img.startsWith("http")) images.push(img + "?w=600&q=80");
    }
    return images;
  } catch {
    return [];
  }
}

export interface DiscoveryResult {
  added: number;
  skipped: number;
  errors: number;
  products: string[];
}

export async function runDiscovery(): Promise<DiscoveryResult> {
  const result: DiscoveryResult = { added: 0, skipped: 0, errors: 0, products: [] };

  // 1. Get trends
  const trends = await fetchGoogleTrends();
  console.log(`[discovery] ${trends.length} tendances récupérées`);

  // 2. Identify opportunities
  const opportunities = await identifyOpportunities(trends);
  console.log(`[discovery] ${opportunities.length} opportunités identifiées`);

  // 3. Process each opportunity
  for (const opp of opportunities) {
    try {
      const slug = slugify(opp.name);

      // Skip if already exists
      const exists = await prisma.product.findUnique({ where: { slug } });
      if (exists) {
        console.log(`[discovery] déjà existant: ${opp.name}`);
        result.skipped++;
        continue;
      }

      // Get category from DB
      let category = await prisma.category.findUnique({ where: { slug: opp.categorySlug } });
      if (!category) {
        // Default to first category
        category = await prisma.category.findFirst();
        if (!category) { result.errors++; continue; }
      }

      // Generate full product sheet + trend score in parallel
      const [sheet, trend] = await Promise.all([
        generateProductSheet({
          name: opp.name,
          category: category.name,
          supplierPrice: opp.supplierPrice,
          targetPrice: opp.estimatedPrice,
          keywords: [opp.why],
        }),
        calculateTrendScore({
          name: opp.name,
          category: category.name,
          supplierPrice: opp.supplierPrice,
          targetPrice: opp.estimatedPrice,
        }),
      ]);

      // Get images: try AliExpress first, fallback to curated pool
      let images = await fetchAliExpressImages(opp.photoKeyword);
      if (images.length === 0) {
        images = getPhotosForCategory(opp.categorySlug);
      }

      // Save product
      const comparePrice = Math.round(opp.estimatedPrice * 1.5 * 100) / 100;
      const product = await prisma.product.create({
        data: {
          name: sheet.name || opp.name,
          slug: sheet.slug || slug,
          shortDescription: sheet.shortDescription || opp.why,
          description: sheet.description || opp.name,
          price: opp.estimatedPrice,
          comparePrice,
          cost: opp.supplierPrice,
          stock: Math.floor(Math.random() * 80) + 20,
          trendScore: trend.score || 75,
          featured: trend.score >= 85,
          published: true,
          categoryId: category.id,
          tags: sheet.tags || [],
          benefits: sheet.benefits || [],
          salesArguments: sheet.salesArguments || [],
          marketingAngle: sheet.marketingAngle || "",
          tiktokScript: sheet.tiktokScript || "",
          tiktokHashtags: sheet.tiktokHashtags || [],
          images: {
            create: images.map((url, i) => ({ url, position: i })),
          },
        },
      });

      // Save trend scores
      await prisma.trendScore.create({
        data: {
          productId: product.id,
          score: trend.score || 75,
          popularity: trend.popularity || 70,
          tiktokTrend: trend.tiktokTrend || 70,
          searchVolume: trend.searchVolume || 65,
          margin: Math.round(((opp.estimatedPrice - opp.supplierPrice) / opp.estimatedPrice) * 100),
          competition: trend.competition || 40,
          viralPotential: trend.viralPotential || 75,
          safetyRisk: trend.safetyRisk || 10,
          seasonality: trend.seasonality || 75,
          seoPotential: trend.seoPotential || 70,
        },
      });

      // Log in AIProductResearch
      await prisma.aIProductResearch.create({
        data: {
          query: `[AUTO] ${opp.name}`,
          results: { sheet, trend, opportunity: opp },
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          status: "auto-published",
        },
      });

      result.added++;
      result.products.push(product.name);
      console.log(`[discovery] ✅ Ajouté: ${product.name} (score: ${trend.score})`);
    } catch (err: any) {
      console.error(`[discovery] ❌ Erreur pour ${opp.name}:`, err.message);
      result.errors++;
    }
  }

  return result;
}
