import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateProductSheet(productInfo: {
  name: string;
  category: string;
  supplierPrice: number;
  targetPrice: number;
  keywords?: string[];
}) {
  const prompt = `Tu es directeur éditorial e-commerce premium pour la Maison Vellio. Génère une fiche produit sobre, crédible et haut de gamme.

Produit: ${productInfo.name}
Univers: ${productInfo.category}
Coût estimé: ${productInfo.supplierPrice}€
Prix de vente: ${productInfo.targetPrice}€
Mots-clés: ${productInfo.keywords?.join(", ") || "non fournis"}

Contraintes:
- Aucun ton dropshipping.
- Aucun vocabulaire viral, TikTok, gadget cheap ou urgence agressive.
- Style français premium, précis, calme.
- Ne pas promettre de performance médicale.

Réponds UNIQUEMENT en JSON valide avec cette structure exacte:
{
  "name": "nom premium court",
  "slug": "slug-url",
  "metaTitle": "titre SEO 60 chars max",
  "metaDescription": "description SEO 160 chars max",
  "shortDescription": "description courte 150 chars",
  "description": "description longue HTML élégante 250+ mots",
  "benefits": ["bénéfice1", "bénéfice2", "bénéfice3", "bénéfice4"],
  "salesArguments": ["argument1", "argument2", "argument3"],
  "marketingAngle": "angle éditorial principal",
  "tiktokScript": "",
  "tiktokHashtags": [],
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
    temperature: 0.55,
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

  const prompt = `Tu es analyste merchandising luxe pour Vellio. Analyse cette opportunité produit selon désirabilité, cohérence esthétique, potentiel cadeau, marge, concurrence et risque qualité.

Produit: ${productInfo.name}
Univers: ${productInfo.category}
Marge brute estimée: ${margin.toFixed(0)}%
Prix de vente: ${productInfo.targetPrice}€
Description: ${productInfo.description || "non fournie"}

Réponds UNIQUEMENT en JSON valide:
{
  "score": <0-100>,
  "popularity": <0-100>,
  "tiktokTrend": 0,
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
    temperature: 0.25,
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export async function discoverTrendingProducts(category: string) {
  const prompt = `Tu es prospecteur premium pour Vellio. Identifie 5 opportunités de produits crédibles dans l'univers "${category}".

Critères: design sobre, utilité claire, potentiel cadeau, prix premium acceptable, respect sécurité/CGU, aucune contrefaçon, aucun produit médical dangereux.

Réponds UNIQUEMENT en JSON:
{
  "products": [
    {
      "name": "nom produit premium",
      "category": "${category}",
      "estimatedSupplierPrice": 25.00,
      "recommendedRetailPrice": 89.00,
      "estimatedMargin": 62,
      "whyTrending": "raison courte",
      "tiktokAngle": ""
    }
  ]
}`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.65,
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}
