export type LuxuryDomain = "maison" | "beaute" | "tech" | "voyage" | "bijoux" | "bureau" | "cadeau";

export interface LuxurySource {
  id: string;
  name: string;
  url: string;
  domain: LuxuryDomain[];
  access: "public-trends" | "public-editorial" | "public-marketplace";
  robotsPolicy: "respect-required";
  notes: string;
}

export interface ProductSignal {
  id: string;
  label: string;
  domain: LuxuryDomain;
  keywords: string[];
  priceBand: [number, number];
  desirability: number;
  giftability: number;
  marginPotential: number;
  saturationRisk: number;
  seasonality: number;
  visualPotential: number;
}

export interface ProspectingOpportunity {
  id: string;
  title: string;
  domain: LuxuryDomain;
  score: number;
  confidence: number;
  price: number;
  comparePrice: number;
  angle: string;
  customerPromise: string;
  materials: string[];
  keywords: string[];
  sources: string[];
  images: string[];
  categorySlug: string;
  rationale: string[];
}

export interface ProspectingFilters {
  domain?: LuxuryDomain;
  minScore?: number;
  sort?: "score" | "price" | "confidence";
}
