import type { LuxurySource } from "./prospectingTypes";

export const LUXURY_SOURCES: LuxurySource[] = [
  {
    id: "google-trends-luxury",
    name: "Google Trends - luxury intent",
    url: "https://trends.google.com",
    domain: ["maison", "beaute", "tech", "voyage", "cadeau"],
    access: "public-trends",
    robotsPolicy: "respect-required",
    notes: "Utiliser uniquement les tendances publiques et requêtes agrégées. Aucun contenu éditorial copié.",
  },
  {
    id: "pinterest-predicts",
    name: "Pinterest Predicts",
    url: "https://business.pinterest.com/pinterest-predicts/",
    domain: ["maison", "beaute", "bijoux", "cadeau"],
    access: "public-editorial",
    robotsPolicy: "respect-required",
    notes: "Lire les thèmes publics pour inspiration de catégorie, sans reproduire les textes ou visuels.",
  },
  {
    id: "farfetch-editorial",
    name: "Farfetch editorial signals",
    url: "https://www.farfetch.com/style-guide/",
    domain: ["bijoux", "voyage", "cadeau"],
    access: "public-editorial",
    robotsPolicy: "respect-required",
    notes: "Observer les directions de style publiques, ne pas extraire de fiches produits protégées.",
  },
  {
    id: "dezeen-design",
    name: "Dezeen design objects",
    url: "https://www.dezeen.com/design/",
    domain: ["maison", "bureau", "tech"],
    access: "public-editorial",
    robotsPolicy: "respect-required",
    notes: "Identifier les familles de design émergentes, sans copier les contenus originaux.",
  },
  {
    id: "amazon-luxury-like",
    name: "Marketplaces - premium demand proxy",
    url: "https://www.amazon.fr",
    domain: ["maison", "tech", "beaute", "bureau", "cadeau"],
    access: "public-marketplace",
    robotsPolicy: "respect-required",
    notes: "Ne pas scraper les pages si robots/CGU l'interdisent. Utiliser uniquement signaux autorisés ou saisies manuelles.",
  },
];

export function getSourceNames(ids: string[]): string[] {
  return ids.map((id) => LUXURY_SOURCES.find((source) => source.id === id)?.name || id);
}
