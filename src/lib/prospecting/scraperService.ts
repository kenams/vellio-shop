import { slugify } from "@/lib/utils";
import { LUXURY_SOURCES, getSourceNames } from "./luxurySources";
import { PRODUCT_SIGNALS } from "./productSignals";
import { scoreLuxurySignal } from "./trendScoring";
import type { LuxuryDomain, ProductSignal, ProspectingFilters, ProspectingOpportunity } from "./prospectingTypes";

const DOMAIN_TO_CATEGORY: Record<LuxuryDomain, string> = {
  maison: "maison-intelligente",
  beaute: "beaute-soin",
  tech: "tech-gadgets",
  voyage: "gadgets-voiture",
  bijoux: "beaute-soin",
  bureau: "bureau-productivite",
  cadeau: "maison-intelligente",
};

const IMAGE_BY_SIGNAL: Record<string, string[]> = {
  "ceramic-led-table-lamp": [
    "https://images.pexels.com/photos/10736999/pexels-photo-10736999.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
    "https://images.pexels.com/photos/29283981/pexels-photo-29283981.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
  ],
  "travel-jewelry-case": [
    "https://images.pexels.com/photos/9775357/pexels-photo-9775357.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
    "https://images.pexels.com/photos/3735620/pexels-photo-3735620.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
  ],
  "aluminum-charging-valet": [
    "https://images.pexels.com/photos/9741343/pexels-photo-9741343.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
    "https://images.pexels.com/photos/12877873/pexels-photo-12877873.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
  ],
  "silk-sleep-mask": [
    "https://images.pexels.com/photos/28255125/pexels-photo-28255125.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
    "https://images.pexels.com/photos/7262902/pexels-photo-7262902.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
  ],
  "graphite-desk-tray": [
    "https://images.pexels.com/photos/33344612/pexels-photo-33344612.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
    "https://images.pexels.com/photos/5994734/pexels-photo-5994734.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
  ],
  "weekend-cable-roll": [
    "https://images.pexels.com/photos/31886525/pexels-photo-31886525.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
    "https://images.pexels.com/photos/34929057/pexels-photo-34929057.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop",
  ],
};

function priceFromBand(signal: ProductSignal): number {
  const [min, max] = signal.priceBand;
  return Math.round((min + (max - min) * 0.62) * 100) / 100;
}

function signalSources(signal: ProductSignal): string[] {
  return LUXURY_SOURCES
    .filter((source) => source.domain.includes(signal.domain) || source.domain.includes("cadeau"))
    .slice(0, 3)
    .map((source) => source.id);
}

export function collectLuxurySignals(): ProductSignal[] {
  return PRODUCT_SIGNALS;
}

export function generatePremiumOpportunities(filters: ProspectingFilters = {}): ProspectingOpportunity[] {
  const minScore = filters.minScore ?? 0;
  const opportunities = collectLuxurySignals()
    .filter((signal) => !filters.domain || signal.domain === filters.domain)
    .map((signal) => {
      const scoring = scoreLuxurySignal(signal);
      const price = priceFromBand(signal);
      const sourceIds = signalSources(signal);

      return {
        id: slugify(signal.label),
        title: signal.label,
        domain: signal.domain,
        score: scoring.score,
        confidence: scoring.confidence,
        price,
        comparePrice: Math.round(price * 1.34 * 100) / 100,
        angle: `Positionner ${signal.label.toLowerCase()} comme une pièce cadeau premium, sobre et utile.`,
        customerPromise: "Une pièce sélectionnée pour transformer un geste quotidien en rituel élégant.",
        materials: ["Finition mate", "Format cadeau", "Packaging sobre"],
        keywords: signal.keywords,
        sources: getSourceNames(sourceIds),
        images: IMAGE_BY_SIGNAL[signal.id] || [],
        categorySlug: DOMAIN_TO_CATEGORY[signal.domain],
        rationale: scoring.reasons,
      } satisfies ProspectingOpportunity;
    })
    .filter((opportunity) => opportunity.score >= minScore);

  const sort = filters.sort || "score";
  return opportunities.sort((a, b) => {
    if (sort === "price") return b.price - a.price;
    if (sort === "confidence") return b.confidence - a.confidence;
    return b.score - a.score;
  });
}

export function exportOpportunitiesCsv(opportunities: ProspectingOpportunity[]): string {
  const headers = ["id", "title", "domain", "score", "confidence", "price", "categorySlug", "angle"];
  const rows = opportunities.map((item) =>
    headers.map((header) => {
      const value = String(item[header as keyof ProspectingOpportunity] ?? "");
      return `"${value.replace(/"/g, '""')}"`;
    }).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}
