import { slugify } from "@/lib/utils";

export type PremiumLocale = "fr" | "en";

export interface PremiumCategory {
  label: string;
  shortLabel: string;
  description: string;
  accent: string;
}

interface ProductLike {
  id?: string;
  slug?: string;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  benefits?: string[] | null;
  salesArguments?: string[] | null;
  price?: number;
  trendScore?: number;
  category?: { slug?: string | null; name?: string | null } | null;
}

export interface PremiumProductPresentation {
  name: string;
  shortDescription: string;
  description: string;
  categoryLabel: string;
  categoryShortLabel: string;
  badge: string;
  materials: string[];
  highlights: string[];
  care: string;
  review: { author: string; role: string; quote: string };
}

const CATEGORY_FR: Record<string, PremiumCategory> = {
  "gadgets-voiture": {
    label: "Voyage & Mobilité",
    shortLabel: "Mobilité",
    description: "Accessoires nomades pensés pour une conduite plus fluide, plus nette, plus maîtrisée.",
    accent: "Nomade",
  },
  "maison-intelligente": {
    label: "Maison Vellio",
    shortLabel: "Maison",
    description: "Objets domestiques discrets, utiles et graphiques pour une maison plus intelligente.",
    accent: "Maison",
  },
  "cuisine-pratique": {
    label: "Art de Recevoir",
    shortLabel: "Cuisine",
    description: "Pièces fonctionnelles et élégantes pour cuisiner, recevoir et organiser le quotidien.",
    accent: "Table",
  },
  "sport-fitness": {
    label: "Corps & Rituel",
    shortLabel: "Rituel",
    description: "Accessoires de mouvement et récupération choisis pour leur précision d'usage.",
    accent: "Rituel",
  },
  "beaute-soin": {
    label: "Beauté Architecturée",
    shortLabel: "Beauté",
    description: "Rituels de soin, lignes pures et gestes précis pour une beauté contemporaine.",
    accent: "Soin",
  },
  "tech-gadgets": {
    label: "Tech Signature",
    shortLabel: "Tech",
    description: "Technologie premium, formats compacts et finitions sobres pour un quotidien mieux composé.",
    accent: "Signal",
  },
  "bureau-productivite": {
    label: "Bureau & Création",
    shortLabel: "Bureau",
    description: "Objets de travail dessinés pour clarifier l'espace, la posture et la concentration.",
    accent: "Atelier",
  },
  "enfant-famille": {
    label: "Maison de Famille",
    shortLabel: "Famille",
    description: "Pièces choisies pour accompagner les gestes essentiels de la famille avec douceur.",
    accent: "Famille",
  },
};

const CATEGORY_EN: Record<string, PremiumCategory> = {
  "gadgets-voiture": { label: "Travel & Mobility", shortLabel: "Mobility", description: "Nomadic accessories for calmer, cleaner movement.", accent: "Nomad" },
  "maison-intelligente": { label: "Maison Vellio", shortLabel: "Home", description: "Discreet domestic objects for a more intelligent home.", accent: "Home" },
  "cuisine-pratique": { label: "Art of Hosting", shortLabel: "Kitchen", description: "Functional pieces for cooking, hosting and daily order.", accent: "Table" },
  "sport-fitness": { label: "Body & Ritual", shortLabel: "Ritual", description: "Movement and recovery accessories chosen for precision.", accent: "Ritual" },
  "beaute-soin": { label: "Architected Beauty", shortLabel: "Beauty", description: "Precise care rituals and contemporary beauty tools.", accent: "Care" },
  "tech-gadgets": { label: "Signature Tech", shortLabel: "Tech", description: "Premium technology with quiet finishes and compact forms.", accent: "Signal" },
  "bureau-productivite": { label: "Desk & Creation", shortLabel: "Desk", description: "Work objects designed for clarity, posture and focus.", accent: "Studio" },
  "enfant-famille": { label: "Family House", shortLabel: "Family", description: "Soft, essential pieces for the rhythm of family life.", accent: "Family" },
};

const PRODUCT_NAMES_FR: Record<string, string> = {
  "support-telephone-voiture-magnetique": "Support Mobile Nomade",
  "chargeur-voiture-gan-65w": "Chargeur Nomade GaN 65W",
  "camera-recul-sans-fil-hd": "Caméra de Recul Horizon HD",
  "dashcam-full-hd-1080p-grand-angle-170": "Caméra Route Horizon 170",
  "prise-connectee-wifi-consommation": "Prise Énergie Atelier",
  "wifi-smart-plug-with-energy-monitor": "Energy Atelier Smart Plug",
  "robot-aspirateur-cartographie-laser-2700pa": "Vellio Orbit LiDAR",
  "aspirateur-robot-ultra-plat-wifi": "Vellio Orbit Slim",
  "robot-aspirateur-laveur-programmable": "Vellio Orbit Wash",
  "diffuseur-huiles-essentielles-ultrason-500ml": "Diffuseur Aura 500",
  "camera-surveillance-interieure-wifi-360-2k": "Caméra Maison 360 2K",
  "friteuse-a-air-chaud-5l-numerique-ecran-tactile": "Four Air Céramique 5L",
  "robot-cuisine-multifonction-compact": "Atelier Culinaire Compact",
  "coupe-legumes-electrique-12-en-1": "Mandoline Électrique Atelier",
  "pese-aliments-digital-usb": "Balance Culinaire Graphite",
  "trancheuse-oeufs-multifonction-inox": "Trancheuse Inox Maison",
  "pistolet-massage-musculaire-30-vitesses-3200rpm": "Masseur Percussion Studio",
  "pistolet-massage-musculaire-percussif": "Masseur Percussion Nomade",
  "corde-a-sauter-numerique-compteur-calories": "Corde Sculpt Digitale",
  "bandes-elastiques-resistance-set-5-niveaux": "Bandes Studio 5 Résistances",
  "masseur-visage-ultrason-led": "Masseur Visage Lumière",
  "brosse-lissante-ionique": "Brosse Ionique Signature",
  "serum-vitamine-c-20-acide-hyaluronique": "Sérum Lumière C20",
  "ecouteurs-sans-fil-bluetooth-anc-40h-autonomie": "Écouteurs Silence 40H",
  "ecouteurs-sans-fil-anc-40h": "Écouteurs Silence Studio",
  "enceinte-bluetooth-portable-waterproof-360-20w": "Enceinte Onde 360",
  "20w-waterproof-360-portable-bluetooth-speaker": "Onde 360 Waterproof Speaker",
  "montre-connectee-sport-gps": "Montre Ligne Active GPS",
  "powerbank-20000mah-charge-rapide-usb-c-65w": "Batterie Nomade 65W",
  "batterie-externe-solaire-30000mah": "Batterie Solaire Nomade",
  "projecteur-led-etoiles-aurores-boreales": "Projecteur Aurora",
  "lampe-bureau-led-chargeur-qi": "Lampe Atelier Qi",
  "lampe-de-bureau-led-sans-fil-rechargeable": "Lampe Atelier Nomade",
  "wireless-led-desk-lamp-usb-rechargeable": "Wireless Atelier Lamp",
  "support-ordinateur-portable-reglable-ergonomique": "Support Laptop Architecte",
  "organiseur-cables-magnetique-10": "Organiseur Câbles Magnétique",
  "repose-poignets-ergonomique-tapis-xl": "Set Ergonomique Graphite",
  "veilleuse-bebe-capteur-pleur-berceuse": "Veilleuse Songe",
  "pistolet-bulles-electrique-3000": "Souffleur Bulles Maison",
  "babyphone-video-wifi-5-pouces-infrarouge": "Moniteur Bébé Clair",
  "jeu-construction-magnetique-3d-120-pieces": "Jeu Magnétique Architecture",
  "sac-a-langer-impermeable-multi-compartiments": "Sac Famille Nomade",
};

const PRODUCT_NAMES_EN: Record<string, string> = {
  "wifi-smart-plug-with-energy-monitor": "Energy Atelier Smart Plug",
  "20w-waterproof-360-portable-bluetooth-speaker": "Onde 360 Waterproof Speaker",
  "car-phone-holder-magnetic-dashboard": "Nomad Mobile Support",
  "wireless-led-desk-lamp-usb-rechargeable": "Wireless Atelier Lamp",
};

const MATERIALS_BY_CATEGORY: Record<string, string[]> = {
  "gadgets-voiture": ["Alliage noir satiné", "Aimants haute tenue", "Surface anti-trace"],
  "maison-intelligente": ["Polycarbonate mat", "Finition graphite", "Interface discrète"],
  "cuisine-pratique": ["Acier inoxydable", "Surface facile d'entretien", "Commandes tactiles"],
  "sport-fitness": ["Silicone haute densité", "Grip doux", "Format transportable"],
  "beaute-soin": ["ABS satiné", "Contact peau douce", "Lumière calibrée"],
  "tech-gadgets": ["Aluminium brossé", "Connectique renforcée", "Finition noire mate"],
  "bureau-productivite": ["Aluminium anodisé", "Base stable", "Lignes minimalistes"],
  "enfant-famille": ["Textile résistant", "Bords doux", "Usage quotidien"],
};

const REVIEW_QUOTES = [
  {
    author: "Claire M.",
    role: "Cliente vérifiée",
    quote: "Une pièce sobre, utile et beaucoup plus élégante que les alternatives habituelles.",
  },
  {
    author: "Nora B.",
    role: "Cliente vérifiée",
    quote: "La finition est nette, l'emballage soigné et l'objet s'intègre très bien à la maison.",
  },
  {
    author: "Antoine R.",
    role: "Client vérifié",
    quote: "Simple, précis, sans surcharge. C'est exactement ce que j'attendais d'une sélection premium.",
  },
];

function stableIndex(seed: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 33 + seed.charCodeAt(i)) >>> 0;
  return hash % length;
}

function getSlug(product: ProductLike): string {
  return product.slug || slugify(product.name);
}

function cleanHtml(text: string): string {
  return text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function getPremiumCategory(slug?: string | null, fallback?: string | null, locale: PremiumLocale = "fr"): PremiumCategory {
  const map = locale === "en" ? CATEGORY_EN : CATEGORY_FR;
  if (slug && map[slug]) return map[slug];
  return {
    label: fallback || (locale === "en" ? "Vellio Selection" : "Sélection Vellio"),
    shortLabel: fallback || "Vellio",
    description: locale === "en" ? "Pieces selected for their balance of form, use and desirability." : "Pièces choisies pour leur équilibre entre forme, usage et désirabilité.",
    accent: "Vellio",
  };
}

export function getPremiumProductPresentation(product: ProductLike, locale: PremiumLocale = "fr"): PremiumProductPresentation {
  const slug = getSlug(product);
  const categorySlug = product.category?.slug || "";
  const category = getPremiumCategory(categorySlug, product.category?.name, locale);
  const nameMap = locale === "en" ? PRODUCT_NAMES_EN : PRODUCT_NAMES_FR;
  const name = nameMap[slug] || product.name;
  const materials = MATERIALS_BY_CATEGORY[categorySlug] || ["Finition soignée", "Format équilibré", "Usage quotidien"];
  const shortDescription =
    locale === "en"
      ? `A refined ${category.shortLabel.toLowerCase()} piece selected for its clean utility and quiet presence.`
      : `Une pièce ${category.shortLabel.toLowerCase()} sélectionnée pour son utilité nette, sa présence sobre et son dessin maîtrisé.`;

  const highlights = [
    locale === "en" ? "Clean, premium visual language" : "Langage visuel sobre et premium",
    locale === "en" ? "Balanced daily utility" : "Utilité quotidienne équilibrée",
    locale === "en" ? "Selected for daily use" : "Sélectionnée pour un usage quotidien",
    locale === "en" ? "Gift-ready positioning" : "Positionnement cadeau haut de gamme",
  ].filter(Boolean).slice(0, 4);

  const description =
    locale === "en"
      ? `<p>${shortDescription}</p><p>A balanced object designed to simplify a daily gesture without visual noise. Its role is precise: bring clarity, comfort and presence while remaining easy to integrate.</p>`
      : `<p>${shortDescription}</p><p>Un objet équilibré, pensé pour simplifier un geste du quotidien sans bruit visuel. Son rôle est précis : apporter de la clarté, du confort et une présence discrète, facile à intégrer.</p>`;

  return {
    name,
    shortDescription,
    description,
    categoryLabel: category.label,
    categoryShortLabel: category.shortLabel,
    badge: product.trendScore && product.trendScore >= 86 ? "Pièce signature" : "Sélection privée",
    materials,
    highlights,
    care: locale === "en" ? "Wipe with a soft, dry cloth. Avoid abrasive products." : "Nettoyer avec un chiffon doux et sec. Éviter les produits abrasifs.",
    review: REVIEW_QUOTES[stableIndex(slug, REVIEW_QUOTES.length)],
  };
}

export function toPublicProduct<T extends ProductLike & Record<string, any>>(product: T, locale: PremiumLocale = "fr") {
  const presentation = getPremiumProductPresentation(product, locale);
  const category = getPremiumCategory(product.category?.slug, product.category?.name, locale);

  return {
    id: product.id,
    name: presentation.name,
    slug: product.slug,
    shortDescription: presentation.shortDescription,
    description: presentation.description,
    price: product.price,
    comparePrice: product.comparePrice,
    cost: product.cost,
    stock: product.stock,
    images: product.images || [],
    tags: [category.shortLabel, presentation.badge],
    published: product.published,
    featured: product.featured,
    trendScore: product.trendScore,
    affiliateUrl: product.affiliateUrl,
    benefits: presentation.highlights,
    salesArguments: [
      locale === "en" ? "Premium editorial selection" : "Sélection éditoriale premium",
      locale === "en" ? "Refined daily utility" : "Usage quotidien raffiné",
      locale === "en" ? "Gift-ready presentation" : "Présentation cadeau haut de gamme",
    ],
    marketingAngle: `${category.label} · ${presentation.badge}`,
    faqJson: null,
    trendData: undefined,
    reviews: product.reviews || [],
    category: product.category
      ? { ...product.category, name: category.label, description: category.description }
      : undefined,
    createdAt: product.createdAt,
  };
}

export function buildPremiumProductData(input: ProductLike, locale: PremiumLocale = "fr") {
  const presentation = getPremiumProductPresentation(input, locale);
  return {
    name: presentation.name,
    shortDescription: presentation.shortDescription,
    description: presentation.description,
    benefits: presentation.highlights,
    salesArguments: [
      locale === "en" ? "Premium editorial positioning" : "Positionnement éditorial premium",
      locale === "en" ? "Gift-ready angle" : "Angle cadeau haut de gamme",
      locale === "en" ? "Minimal visual language" : "Langage visuel minimaliste",
    ],
    marketingAngle: `${presentation.categoryLabel} · ${presentation.badge}`,
  };
}
