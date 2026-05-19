// Validation pipeline : garantit qu'un produit a des images cohérentes
// avant insertion en DB. Utilisé dans le cron discover.

const STOP_WORDS = new Set([
  'le','la','les','un','une','des','du','de','et','ou','en','au','sur','par',
  'the','and','for','with','from','kit','set','pack','pro','plus','max',
  'mini','ultra','new','top','best','my','its','our','your',
]);

function extractKeywords(text: string): Set<string> {
  return new Set(
    text.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !STOP_WORDS.has(w))
  );
}

// Signaux sémantiques par catégorie — détection de mismatch grossier
const CATEGORY_SIGNALS: Record<string, string[]> = {
  'gadgets-voiture':      ['car','auto','voiture','vehicle','drive','steering','tire','dashboard'],
  'maison-intelligente':  ['home','smart','house','maison','robot','lamp','light','thermostat'],
  'cuisine-pratique':     ['kitchen','cook','food','cuisine','blender','knife','oven','bake'],
  'sport-fitness':        ['sport','fitness','gym','workout','yoga','running','training','muscle'],
  'beaute-soin':          ['beauty','skin','care','serum','cosmetic','face','hair','nail'],
  'tech-gadgets':         ['tech','gadget','phone','charger','earbuds','bluetooth','usb','wireless'],
  'bureau-productivite':  ['desk','office','keyboard','monitor','laptop','mouse','chair'],
  'enfant-famille':       ['kid','child','toy','baby','family','enfant','jouet','bebe'],
  'bien-etre-sport':      ['wellness','spa','massage','relax','sleep','pilates'],
  'tech-electronique':    ['electronic','screen','camera','projector','speaker','audio'],
  'beaute-bien-etre':     ['beauty','wellness','skincare','perfume','nail','spa'],
};

export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

// ─── isImageRelevantToProduct ───────────────────────────────────────────────
export function isImageRelevantToProduct(
  imageUrl: string,
  productName: string,
  categorySlug = '',
): ValidationResult {
  if (!imageUrl || imageUrl.trim() === '') {
    console.warn('IMAGE MISMATCH', imageUrl, `— URL vide pour "${productName}"`);
    return { valid: false, reason: 'empty URL' };
  }

  // Placeholders
  if (
    imageUrl.includes('placeholder') ||
    imageUrl.includes('via.placeholder') ||
    imageUrl.includes('placehold.it') ||
    imageUrl === '/placeholder.jpg'
  ) {
    console.warn('IMAGE MISMATCH', imageUrl, `— placeholder pour "${productName}"`);
    return { valid: false, reason: 'placeholder' };
  }

  // SVG / icônes / logos
  if (imageUrl.endsWith('.svg') || /\/(icon|logo|sprite)/i.test(imageUrl)) {
    console.warn('IMAGE MISMATCH', imageUrl, `— SVG/icône pour "${productName}"`);
    return { valid: false, reason: 'SVG or icon' };
  }

  // Doit être Unsplash, Pexels ou Cloudinary (sources approuvées)
  const isUnsplash    = imageUrl.startsWith('https://images.unsplash.com/');
  const isPexels      = imageUrl.startsWith('https://images.pexels.com/');
  const isCloudinary  = imageUrl.includes('res.cloudinary.com') || imageUrl.includes('cloudinary.com/');
  if (!isUnsplash && !isPexels && !isCloudinary) {
    console.warn('IMAGE MISMATCH', imageUrl, `— source non approuvée pour "${productName}"`);
    return { valid: false, reason: 'non-approved source' };
  }

  // Unsplash doit avoir crop=entropy (format standardisé)
  if (isUnsplash && !imageUrl.includes('crop=entropy')) {
    console.warn('IMAGE MISMATCH', imageUrl, `— crop=entropy manquant pour "${productName}"`);
    return { valid: false, reason: 'missing crop=entropy' };
  }

  // Miniatures trop petites (ex: w=40, w=50)
  const wMatch = imageUrl.match(/[?&]w=(\d+)/);
  if (wMatch && parseInt(wMatch[1]) < 200) {
    console.warn('IMAGE MISMATCH', imageUrl, `— image trop petite (w=${wMatch[1]}) pour "${productName}"`);
    return { valid: false, reason: 'image too small' };
  }

  // Vérification sémantique légère : si catégorie connue, s'assurer que les
  // keywords produit ne signalent pas un mismatch évident avec la catégorie
  const catSignals = CATEGORY_SIGNALS[categorySlug];
  if (catSignals && catSignals.length > 0) {
    const productKw = extractKeywords(productName);
    // Si AUCUN keyword produit ne matche la catégorie ET la catégorie est très
    // spécifique (voiture, enfant), log un avertissement (pas un rejet)
    const strictCategories = ['gadgets-voiture', 'enfant-famille'];
    if (strictCategories.includes(categorySlug)) {
      const hasSignal = catSignals.some(s => productKw.has(s));
      if (!hasSignal) {
        // Avertissement seulement — le produit vient du catalog et est déjà catégorisé correctement
        console.warn('IMAGE MISMATCH', imageUrl, `— possible mismatch catégorie "${categorySlug}" / produit "${productName}"`);
      }
    }
  }

  return { valid: true };
}

// ─── validateProductData ────────────────────────────────────────────────────
export function validateProductData(product: {
  name: string;
  slug: string;
  images: string[];
  categorySlug?: string;
}): ValidationResult {
  // 1. Titre minimum
  if (!product.name || product.name.trim().length < 5) {
    console.warn('INVALID PRODUCT IMAGE', product.name, '— titre trop court');
    return { valid: false, reason: 'title too short' };
  }

  // 2. Au moins une image
  if (!product.images || product.images.length === 0) {
    console.warn('INVALID PRODUCT IMAGE', product.name, '— aucune image');
    return { valid: false, reason: 'no images' };
  }

  // 3. Chaque image valide individuellement
  for (const url of product.images) {
    const check = isImageRelevantToProduct(url, product.name, product.categorySlug);
    if (!check.valid) {
      return { valid: false, reason: check.reason };
    }
  }

  // 4. Pas de doublons intra-produit
  const uniqueUrls = new Set(product.images);
  if (uniqueUrls.size < product.images.length) {
    console.warn('INVALID PRODUCT IMAGE', product.name, '— images dupliquées dans le même produit');
    return { valid: false, reason: 'duplicate images' };
  }

  return { valid: true };
}

// ─── calculateProductQualityScore ──────────────────────────────────────────

export interface QualityScore {
  score: number;        // 0–100
  breakdown: Record<string, number>;
  publishable: boolean; // true if score >= 80
}

export function calculateProductQualityScore(product: {
  name: string;
  slug: string;
  images: string[];
  description?: string | null;
  shortDescription?: string | null;
  price?: number;
  categorySlug?: string;
}): QualityScore {
  const b: Record<string, number> = {};
  let score = 0;

  // Title (max 20)
  const tl = product.name?.trim().length ?? 0;
  b.title = tl >= 15 ? 20 : tl >= 8 ? 12 : tl >= 4 ? 5 : 0;
  score += b.title;

  // Image count (max 30)
  const imgs = (product.images ?? []).filter(u => u && !u.includes("placeholder"));
  b.imageCount = imgs.length >= 3 ? 30 : imgs.length === 2 ? 20 : imgs.length === 1 ? 10 : 0;
  score += b.imageCount;

  // Image source quality (max 20)
  const approved = imgs.filter(u =>
    u.includes("unsplash.com") ||
    u.includes("pexels.com") ||
    u.includes("cloudinary.com") ||
    u.includes("res.cloudinary.com")
  );
  b.imageQuality = approved.length === imgs.length && imgs.length > 0 ? 20 : approved.length > 0 ? 10 : 0;
  score += b.imageQuality;

  // Description (max 15)
  const desc = ((product.description ?? "") + (product.shortDescription ?? ""))
    .replace(/<[^>]+>/g, "").trim().length;
  b.description = desc >= 120 ? 15 : desc >= 50 ? 10 : desc >= 10 ? 5 : 0;
  score += b.description;

  // Price (max 10)
  b.price = product.price && product.price > 0 ? 10 : 0;
  score += b.price;

  // No intra-product duplicate images (max 5)
  b.noDuplicates = new Set(imgs).size === imgs.length ? 5 : 0;
  score += b.noDuplicates;

  if (score < 80) {
    console.warn("LOW PRODUCT SCORE", product.name, `— score ${score}/100`, b);
  }

  return { score, breakdown: b, publishable: score >= 80 };
}
