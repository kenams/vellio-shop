import { prisma } from "@/lib/prisma";
import { openai, generateProductSheet, calculateTrendScore } from "@/lib/openai";
import { slugify } from "@/lib/utils";

export type Market = "fr" | "en-US" | "en-GB" | "en-AU";

// ─── MASSIVE Photo Pool (18+ unique per category) ────────────────────────────
const PHOTO_POOL: Record<string, string[]> = {
  "gadgets-voiture": [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    "https://images.unsplash.com/photo-1474978528675-4a50a4508dc5?w=600&q=80",
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80",
    "https://images.unsplash.com/photo-1580274455191-1c62238fa1c6?w=600&q=80",
    "https://images.unsplash.com/photo-1483193722442-5422d99849bc?w=600&q=80",
    "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80",
    "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=600&q=80",
    "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80",
    "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&q=80",
    "https://images.unsplash.com/photo-1524505796099-7c1a7f2d07a4?w=600&q=80",
    "https://images.unsplash.com/photo-1600706432502-77a0e2e32790?w=600&q=80",
    "https://images.unsplash.com/photo-1443556713782-13d11a2b9628?w=600&q=80",
    "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80",
  ],
  "maison-intelligente": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?w=600&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
    "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80",
    "https://images.unsplash.com/photo-1614771637369-ed94441a651a?w=600&q=80",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80",
    "https://images.unsplash.com/photo-1556912173-3bb406ef7e8a?w=600&q=80",
    "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80",
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&q=80",
    "https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&q=80",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=600&q=80",
    "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=600&q=80",
  ],
  "cuisine-pratique": [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80",
    "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=600&q=80",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80",
    "https://images.unsplash.com/photo-1584990347449-a5d9f800a783?w=600&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80",
    "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&q=80",
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80",
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
  ],
  "sport-fitness": [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&q=80",
    "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80",
    "https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=600&q=80",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    "https://images.unsplash.com/photo-1600965962102-9d260a71890d?w=600&q=80",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80",
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80",
    "https://images.unsplash.com/photo-1623874514711-0f321325f318?w=600&q=80",
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80",
  ],
  "beaute-soin": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&q=80",
    "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=80",
    "https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=600&q=80",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
    "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&q=80",
    "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&q=80",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&q=80",
    "https://images.unsplash.com/photo-1583396618422-48affe18a8f1?w=600&q=80",
    "https://images.unsplash.com/photo-1585652757173-71c07a2f7e8e?w=600&q=80",
    "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=600&q=80",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
    "https://images.unsplash.com/photo-1549045783-5f2d8e8dff74?w=600&q=80",
  ],
  "tech-gadgets": [
    "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=600&q=80",
    "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600&q=80",
    "https://images.unsplash.com/photo-1610438235354-a6ae5528385c?w=600&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
    "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=600&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    "https://images.unsplash.com/photo-1555487505-8603a1a69755?w=600&q=80",
    "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80",
  ],
  "bureau-productivite": [
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    "https://images.unsplash.com/photo-1524820197278-540916411e20?w=600&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    "https://images.unsplash.com/photo-1498075702571-ecb018f3752d?w=600&q=80",
    "https://images.unsplash.com/photo-1553484771-047a44eee27a?w=600&q=80",
    "https://images.unsplash.com/photo-1484981138541-3d074aa97716?w=600&q=80",
    "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    "https://images.unsplash.com/photo-1574515944794-d6dedc7150de?w=600&q=80",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    "https://images.unsplash.com/photo-1593642632523-1d60af4b3029?w=600&q=80",
    "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&q=80",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    "https://images.unsplash.com/photo-1615473967657-9dc21773bf37?w=600&q=80",
    "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=600&q=80",
    "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&q=80",
  ],
  "enfant-famille": [
    "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=600&q=80",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80",
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    "https://images.unsplash.com/photo-1566454825481-9b09abe8a995?w=600&q=80",
    "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=600&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    "https://images.unsplash.com/photo-1610020073577-00e39a9eb5b8?w=600&q=80",
    "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&q=80",
    "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80",
    "https://images.unsplash.com/photo-1611329532992-0e4fb9e0d77d?w=600&q=80",
    "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=600&q=80",
    "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&q=80",
    "https://images.unsplash.com/photo-1559181567-c3190bfbf2a5?w=600&q=80",
    "https://images.unsplash.com/photo-1596003906949-67221c37965c?w=600&q=80",
    "https://images.unsplash.com/photo-1606327054536-b6c63dab5d2b?w=600&q=80",
  ],
};

const FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
];

// ─── Deterministic slug hash → unique image selection per product ─────────────
function getPhotosForProduct(categorySlug: string, productSlug: string): string[] {
  const pool = PHOTO_POOL[categorySlug] || FALLBACK_PHOTOS;
  // Weighted hash to spread across the pool
  const hash = productSlug.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
  const offset = hash % pool.length;
  const result: string[] = [];
  for (let i = 0; i < 3 && i < pool.length; i++) {
    result.push(pool[(offset + i) % pool.length]);
  }
  return result;
}

// ─── Pexels API (free, 200 req/h — add PEXELS_API_KEY to Vercel env) ──────────
async function fetchPexelsImages(keyword: string): Promise<string[]> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return [];
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=4&orientation=square`,
      { headers: { Authorization: key }, signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.photos || []).slice(0, 3).map((p: any) =>
      p.src?.large || p.src?.medium || ""
    ).filter(Boolean);
  } catch {
    return [];
  }
}

// ─── Unsplash API (free 50 req/h — add UNSPLASH_ACCESS_KEY to Vercel env) ────
async function fetchUnsplashImages(keyword: string): Promise<string[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return [];
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=4&orientation=squarish&client_id=${key}`,
      { signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).slice(0, 3).map((p: any) =>
      p.urls?.regular || p.urls?.small || ""
    ).filter(Boolean);
  } catch {
    return [];
  }
}

// ─── AliExpress fallback ───────────────────────────────────────────────────────
async function fetchAliExpressImages(keyword: string): Promise<string[]> {
  try {
    const encoded = encodeURIComponent(keyword);
    const url = `https://www.aliexpress.com/glosearch/api/product?keywords=${encoded}&currency=EUR&language=fr_FR&sortType=default&page=1&pageSize=5`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://www.aliexpress.com",
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items = data?.data?.datas || data?.data?.item || [];
    const images: string[] = [];
    for (const item of items.slice(0, 3)) {
      const img = item.imageUrl || item.productMainImageUrl || item.image;
      if (img && img.startsWith("http")) images.push(img);
    }
    return images;
  } catch {
    return [];
  }
}

// ─── Master image fetcher ─────────────────────────────────────────────────────
async function fetchProductImages(
  keyword: string,
  productSlug: string,
  categorySlug: string
): Promise<string[]> {
  // 1. Pexels (real product photos, free API)
  const pexels = await fetchPexelsImages(keyword);
  if (pexels.length >= 2) return pexels;

  // 2. Unsplash API
  const unsplash = await fetchUnsplashImages(keyword);
  if (unsplash.length >= 2) return unsplash;

  // 3. AliExpress (sometimes works)
  const ali = await fetchAliExpressImages(keyword);
  if (ali.length >= 2) return ali;

  // 4. Curated pool — deterministic, unique per product
  return getPhotosForProduct(categorySlug, productSlug);
}

// ─── Google Trends by geo ─────────────────────────────────────────────────────
async function fetchTrends(geo: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://trends.google.fr/trends/trendingsearches/daily/rss?geo=${geo}`,
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; VellioBot/1.0)" }, next: { revalidate: 0 } }
    );
    const xml = await res.text();
    const titles: string[] = [];
    const regex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/g;
    let match;
    while ((match = regex.exec(xml)) !== null) {
      if (!["Daily Search Trends", "Trending Searches"].includes(match[1])) {
        titles.push(match[1]);
      }
    }
    return titles.slice(0, 25);
  } catch {
    const fallbacks: Record<string, string[]> = {
      FR: ["gadgets maison", "accessoires sport", "beauté naturelle", "cuisine rapide", "tech connecté"],
      US: ["home gadgets", "fitness gear", "smart home", "kitchen tools", "tech accessories"],
      GB: ["home gadgets", "fitness accessories", "smart devices", "kitchen gadgets", "tech deals"],
      AU: ["outdoor gear", "fitness gadgets", "smart home", "kitchen tools", "tech accessories"],
    };
    return fallbacks[geo] || fallbacks.US;
  }
}

// ─── OpenAI: identify product opportunities ───────────────────────────────────
const CATEGORIES = [
  "gadgets-voiture", "maison-intelligente", "cuisine-pratique", "sport-fitness",
  "beaute-soin", "tech-gadgets", "bureau-productivite", "enfant-famille",
];

async function identifyOpportunities(trends: string[], market: Market) {
  const isEn = market !== "fr";
  const currencyMap: Record<Market, string> = { fr: "EUR", "en-US": "USD", "en-GB": "GBP", "en-AU": "AUD" };
  const currency = currencyMap[market];
  const lang = isEn ? "English" : "French";

  const resp = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{
      role: "system",
      content: `You are a dropshipping expert for ${isEn ? market.toUpperCase() : "France"} 2026. You identify legal, non-counterfeit products sellable via dropshipping. Respond in ${lang}.`,
    }, {
      role: "user",
      content: `Today's Google Trends for ${market}: ${trends.slice(0, 15).join(", ")}

Identify exactly 3 physical products with high dropshipping potential based on these trends.

Rules:
- Legal products only (no alcohol, tobacco, medication, weapons, counterfeits)
- Minimum 45% margin
- Selling price between 15 and 200 ${currency}
- Available categories: ${CATEGORIES.join(", ")}
- Product names and descriptions MUST be in ${lang}

Return ONLY valid JSON:
{
  "products": [
    {
      "name": "Catchy product name in ${lang}",
      "categorySlug": "one-of-the-8-categories",
      "estimatedPrice": 39.99,
      "supplierPrice": 9.50,
      "photoKeyword": "product photo keyword in english",
      "why": "why this product is trending right now (1 sentence in ${lang})"
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

// ─── Main discovery runner ────────────────────────────────────────────────────
export interface DiscoveryResult {
  added: number;
  skipped: number;
  errors: number;
  products: string[];
  market: string;
}

export async function runDiscovery(market: Market = "fr"): Promise<DiscoveryResult> {
  const result: DiscoveryResult = { added: 0, skipped: 0, errors: 0, products: [], market };
  const locale = market === "fr" ? "fr" : "en";
  const geoMap: Record<Market, string> = { fr: "FR", "en-US": "US", "en-GB": "GB", "en-AU": "AU" };
  const geo = geoMap[market];

  console.log(`[discovery] Starting for market=${market} (geo=${geo}, locale=${locale})`);

  const trends = await fetchTrends(geo);
  console.log(`[discovery] ${trends.length} trends fetched`);

  const opportunities = await identifyOpportunities(trends, market);
  console.log(`[discovery] ${opportunities.length} opportunities identified`);

  for (const opp of opportunities) {
    try {
      const slug = slugify(opp.name);

      const exists = await prisma.product.findUnique({ where: { slug } });
      if (exists) {
        console.log(`[discovery] Already exists: ${opp.name}`);
        result.skipped++;
        continue;
      }

      let category = await prisma.category.findUnique({ where: { slug: opp.categorySlug } });
      if (!category) {
        category = await prisma.category.findFirst();
        if (!category) { result.errors++; continue; }
      }

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

      // Get unique, relevant images for this product
      const images = await fetchProductImages(opp.photoKeyword, slug, opp.categorySlug);
      console.log(`[discovery] ${images.length} images for "${opp.name}" (source: ${images[0]?.includes("pexels") ? "Pexels" : images[0]?.includes("unsplash") ? "Unsplash" : "curated"})`);

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
          locale,
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

      await prisma.aIProductResearch.create({
        data: {
          query: `[AUTO-${market.toUpperCase()}] ${opp.name}`,
          results: { sheet, trend, opportunity: opp, market },
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          status: "auto-published",
        },
      });

      result.added++;
      result.products.push(product.name);
      console.log(`[discovery] ✅ Added: ${product.name} (score: ${trend.score}, locale: ${locale})`);
    } catch (err: any) {
      console.error(`[discovery] ❌ Error for ${opp.name}:`, err.message);
      result.errors++;
    }
  }

  return result;
}
