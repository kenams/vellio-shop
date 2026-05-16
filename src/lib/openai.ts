import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateProductSheet(productInfo: {
  name: string;
  category: string;
  supplierPrice: number;
  targetPrice: number;
  keywords?: string[];
}) {
  const prompt = `Tu es un expert e-commerce dropshipping français. Génère une fiche produit complète pour:

Produit: ${productInfo.name}
Catégorie: ${productInfo.category}
Prix fournisseur: ${productInfo.supplierPrice}€
Prix de vente: ${productInfo.targetPrice}€
Mots-clés: ${productInfo.keywords?.join(", ") || "non fournis"}

Réponds UNIQUEMENT en JSON valide avec cette structure exacte:
{
  "name": "nom optimisé",
  "slug": "slug-url",
  "metaTitle": "titre SEO 60 chars max",
  "metaDescription": "description SEO 160 chars max",
  "shortDescription": "description courte 150 chars",
  "description": "description longue HTML 400+ mots",
  "benefits": ["bénéfice1", "bénéfice2", "bénéfice3", "bénéfice4", "bénéfice5"],
  "salesArguments": ["argument1", "argument2", "argument3"],
  "marketingAngle": "angle marketing principal",
  "tiktokScript": "script vidéo TikTok 30 secondes",
  "tiktokHashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "faq": [
    {"question": "Q1?", "answer": "R1"},
    {"question": "Q2?", "answer": "R2"},
    {"question": "Q3?", "answer": "R3"}
  ],
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export async function calculateTrendScore(productInfo: {
  name: string;
  category: string;
  supplierPrice: number;
  targetPrice: number;
  description?: string;
}) {
  const margin = ((productInfo.targetPrice - productInfo.supplierPrice) / productInfo.targetPrice) * 100;

  const prompt = `Tu es un expert dropshipping et marketing viral. Analyse ce produit et donne un score de tendance.

Produit: ${productInfo.name}
Catégorie: ${productInfo.category}
Marge brute estimée: ${margin.toFixed(0)}%
Prix de vente: ${productInfo.targetPrice}€
Description: ${productInfo.description || "non fournie"}

Réponds UNIQUEMENT en JSON valide:
{
  "score": <0-100>,
  "popularity": <0-100>,
  "tiktokTrend": <0-100>,
  "searchVolume": <0-100>,
  "margin": <0-100>,
  "competition": <0-100>,
  "viralPotential": <0-100>,
  "safetyRisk": <0-100>,
  "seasonality": <0-100>,
  "seoPotential": <0-100>,
  "reasoning": "explication en 2 phrases",
  "recommendation": "LANCER|TESTER|ÉVITER"
}`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export async function discoverTrendingProducts(category: string) {
  const prompt = `Tu es un expert dropshipping France 2026. Identifie 5 produits tendance dans la catégorie "${category}".

Critères: viral TikTok, marges 40%+, pas de contrefaçon, pas de produits dangereux/médicaux.

Réponds UNIQUEMENT en JSON:
{
  "products": [
    {
      "name": "nom produit",
      "category": "${category}",
      "estimatedSupplierPrice": 5.00,
      "recommendedRetailPrice": 24.99,
      "estimatedMargin": 70,
      "whyTrending": "raison courte",
      "tiktokAngle": "angle vidéo"
    }
  ]
}`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.8,
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}
