import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const TAG = "vellio42-21";
const amz = (asin) => `https://www.amazon.fr/dp/${asin}?tag=${TAG}`;
const img = (id) => `https://m.media-amazon.com/images/I/${id}._AC_SL1500_.jpg`;

const CATEGORIES = [
  { slug: "tech-gadgets",        name: "Tech et Gadgets",       description: "Les meilleurs gadgets tech du moment." },
  { slug: "maison-intelligente", name: "Maison et Confort",     description: "Produits tendance maison plebiscites." },
  { slug: "beaute-soins",        name: "Beaute et Soins",       description: "Skincare viral et soins premium TikTok." },
  { slug: "sport-fitness",       name: "Sport et Fitness",      description: "Equipements premium pour performer." },
  { slug: "bureau-productivite", name: "Bureau et Productivite",description: "Transformez votre espace de travail." },
];

const PRODUCTS = [
  {
    slug: "apple-airtag-2e-generation",
    name: "Apple AirTag 2e generation",
    shortDescription: "Retrouvez vos affaires avec la precision du reseau Find My.",
    description: "<p>AirTag 2e gen avec puce U2 ultra-precise, signal sonore, reseau Find My mondial et resistance IP67.</p>",
    price: 35.99, comparePrice: 39.99, cost: 18, stock: 120, trendScore: 98, featured: true, published: true,
    benefits: ["Precision centimetrique","Reseau Find My","IP67 resiste eau","1 an pile incluse"],
    salesArguments: ["Bestseller #1 High-Tech","Viral TikTok","Compatible iPhone iPad"],
    affiliateUrl: amz("B0GJTCB2QM"), categorySlug: "tech-gadgets",
    images: [img("61lBuevDnnL"), img("71lBuevDnnL"), img("51G3BXSCAZL")],
  },
  {
    slug: "apple-airpods-pro-3",
    name: "Apple AirPods Pro 3",
    shortDescription: "ANC + detection cardiaque — les meilleurs ecouteurs sans fil du moment.",
    description: "<p>AirPods Pro 3 : reduction de bruit active, detection frequence cardiaque, Spatial Audio adaptatif, 30h autonomie totale.</p>",
    price: 249.00, comparePrice: 279.00, cost: 120, stock: 45, trendScore: 99, featured: true, published: true,
    benefits: ["ANC reference","Detection cardiaque","30h autonomie","Spatial Audio"],
    salesArguments: ["Derniere gen Apple","Top 10 Amazon","Livraison Prime"],
    affiliateUrl: amz("B0FQF32239"), categorySlug: "tech-gadgets",
    images: [img("61VHVpa4wvL"), img("71VHVpa4wvL"), img("51VHVpa4wvL")],
  },
  {
    slug: "apple-airpods-4-anc",
    name: "Apple AirPods 4 avec ANC",
    shortDescription: "Son premium, design ouvert, 26h autonomie, MagSafe.",
    description: "<p>AirPods 4 avec ANC, audio adaptatif, mode transparence, design ouvert sans embout, compatible MagSafe, 26h autonomie.</p>",
    price: 179.00, comparePrice: 199.00, cost: 85, stock: 60, trendScore: 95, featured: true, published: true,
    benefits: ["ANC actif","Design ouvert","26h autonomie","MagSafe"],
    salesArguments: ["Bestseller Apple 2026","Top 15 Amazon","Livraison Prime"],
    affiliateUrl: amz("B0DGHYDYJL"), categorySlug: "tech-gadgets",
    images: [img("61DvMw16ITL"), img("71DvMw16ITL"), img("51DvMw16ITL")],
  },
  {
    slug: "apple-earpods-usb-c",
    name: "Apple EarPods USB-C",
    shortDescription: "Son Apple authentique, prix mini — indispensable iPhone 15 et plus.",
    description: "<p>EarPods USB-C : son clair et net, micro integre, commandes sur cable. Compatible iPhone 15-16 et iPad USB-C.</p>",
    price: 19.00, comparePrice: 24.00, cost: 8, stock: 200, trendScore: 88, featured: false, published: true,
    benefits: ["Son Apple authentique","Micro integre","USB-C universel","Prix mini"],
    salesArguments: ["Top 6 Amazon High-Tech","Indispensable iPhone 15+","Livraison Prime"],
    affiliateUrl: amz("B0DCNWN8NZ"), categorySlug: "tech-gadgets",
    images: [img("51oMc4XRaaL"), img("61oMc4XRaaL"), img("41oMc4XRaaL")],
  },
  {
    slug: "amazon-fire-tv-stick-4k-select",
    name: "Amazon Fire TV Stick 4K Select",
    shortDescription: "Transformez n'importe quelle TV en Smart TV 4K HDR.",
    description: "<p>Fire TV Stick 4K : Netflix, Prime Video, Disney+ en 4K Dolby Vision HDR, Wi-Fi 6, Alexa integree.</p>",
    price: 49.99, comparePrice: 69.99, cost: 22, stock: 80, trendScore: 90, featured: true, published: true,
    benefits: ["4K Dolby Vision HDR","Wi-Fi 6","Alexa integree","Netflix Disney+ Prime"],
    salesArguments: ["Top 10 Amazon High-Tech","Streaming 4K moins de 50 euros","Livraison Prime"],
    affiliateUrl: amz("B0CN41GMDK"), categorySlug: "tech-gadgets",
    images: [img("51KWHDd3LNL"), img("61KWHDd3LNL"), img("41KWHDd3LNL")],
  },
  {
    slug: "iniu-power-bank-45w-10000mah",
    name: "INIU Power Bank 10000mAh 45W",
    shortDescription: "Le power bank compact avec charge rapide 45W et cable USB-C integre.",
    description: "<p>10000mAh 45W bidirectionnel, cable USB-C retractable integre. Recharge iPhone 16 Pro en moins de 1h.</p>",
    price: 29.99, comparePrice: 39.99, cost: 12, stock: 150, trendScore: 92, featured: false, published: true,
    benefits: ["45W charge rapide","Cable USB-C integre","10000mAh compact","iPhone et Android"],
    salesArguments: ["Top 18 Amazon High-Tech","Viral voyageurs 2026","Livraison Prime"],
    affiliateUrl: amz("B0DC93Z911"), categorySlug: "tech-gadgets",
    images: [img("71oMrghUt3L"), img("61oMrghUt3L"), img("51oMrghUt3L")],
  },
  {
    slug: "imou-camera-360-2k",
    name: "Imou Camera Surveillance WiFi 360 2K",
    shortDescription: "Camera 360 motorisee avec detection humaine IA et vision nocturne couleur.",
    description: "<p>Imou 2K (3MP) : rotation 360 motorisee, detection humaine IA, vision nocturne couleur, alerte smartphone temps reel.</p>",
    price: 34.99, comparePrice: 49.99, cost: 14, stock: 90, trendScore: 87, featured: false, published: true,
    benefits: ["2K ultra-claire","Detection humaine IA","Vision nocturne couleur","Alerte smartphone"],
    salesArguments: ["Top 16 Amazon High-Tech","Securite maison accessible","Livraison Prime"],
    affiliateUrl: amz("B08X6DCJT2"), categorySlug: "tech-gadgets",
    images: [img("51WuJ7EZ1uL"), img("61WuJ7EZ1uL"), img("41WuJ7EZ1uL")],
  },
  {
    slug: "aioneus-chargeur-usb-c-40w-4ports",
    name: "Aioneus Chargeur USB-C 40W 4 Ports",
    shortDescription: "Chargez 4 appareils simultanement avec PD et QC 3.1A.",
    description: "<p>40W, 2 ports USB-C PD + 2 ports USB-A QC 3.1A. Compatible iPhone, Samsung, iPad, AirPods. 1 seule prise suffit.</p>",
    price: 18.99, comparePrice: 27.99, cost: 7, stock: 180, trendScore: 84, featured: false, published: true,
    benefits: ["4 ports simultanees","40W PD+QC","Compatible tous appareils","1 seule prise"],
    salesArguments: ["Top 17 Amazon High-Tech","Indispensable bureau et voyage","Livraison Prime"],
    affiliateUrl: amz("B0CYSQPXDV"), categorySlug: "tech-gadgets",
    images: [img("611CPNLp--L"), img("511CPNLp--L"), img("711CPNLp--L")],
  },
  {
    slug: "blink-outdoor-4-camera-hd",
    name: "Blink Outdoor 4 Camera HD Sans Fil",
    shortDescription: "2 ans d'autonomie, resistante intemperies, detection mouvement avancee.",
    description: "<p>Blink Outdoor 4 : video HD, 2 ans autonomie sans recharge, detection mouvement avancee, vision nocturne IR, compatible Alexa.</p>",
    price: 74.99, comparePrice: 99.99, cost: 32, stock: 55, trendScore: 89, featured: false, published: true,
    benefits: ["2 ans autonomie","Resistante intemperies","Detection mouvement avancee","Compatible Alexa"],
    salesArguments: ["Top 5 Amazon High-Tech","Securite sans abonnement","Livraison Prime"],
    affiliateUrl: amz("B0DHLV4P1B"), categorySlug: "tech-gadgets",
    images: [img("51vzbaX2XAL"), img("61vzbaX2XAL"), img("41vzbaX2XAL")],
  },
  {
    slug: "ventilateur-portable-usb-5v",
    name: "Ventilateur Portable USB 5 Vitesses LED",
    shortDescription: "Le ventilateur de bureau rechargeable qui explose les ventes chaque ete.",
    description: "<p>Mini ventilateur pliable USB, 5 vitesses, ecran LED, 25dB, batterie 4000mAh, 10h d'autonomie. Parfait bureau voyage voiture.</p>",
    price: 19.99, comparePrice: 29.99, cost: 7, stock: 200, trendScore: 96, featured: true, published: true,
    benefits: ["10h autonomie","5 vitesses + ecran LED","25dB silencieux","Pliable ultra-compact"],
    salesArguments: ["#1 Cuisine Maison Amazon FR","Viral TikTok ete 2026","Livraison Prime"],
    affiliateUrl: amz("B0BRV61DPY"), categorySlug: "maison-intelligente",
    images: [img("71LTHwczIqL"), img("61LTHwczIqL"), img("51LTHwczIqL")],
  },
  {
    slug: "comfee-climatiseur-mobile-9000btu",
    name: "COMFEE Climatiseur Mobile 9000 BTU",
    shortDescription: "Climatiseur portable silencieux avec controle par application smartphone.",
    description: "<p>COMFEE 9000 BTU/h pour 25m2, controle APP, 3 modes, 3 vitesses, timer. Dimensions compactes, installation sans travaux.</p>",
    price: 329.00, comparePrice: 399.00, cost: 160, stock: 30, trendScore: 94, featured: true, published: true,
    benefits: ["9000 BTU pour 25m2","Controle APP smartphone","3 modes et 3 vitesses","Sans travaux"],
    salesArguments: ["Top 3 Cuisine Maison","Le plus vendu ete 2026","Livraison Prime"],
    affiliateUrl: amz("B0CM8RNDHY"), categorySlug: "maison-intelligente",
    images: [img("7173jTIuqwL"), img("6173jTIuqwL"), img("5173jTIuqwL")],
  },
  {
    slug: "rowenta-turbo-silence-ventilateur-pied",
    name: "Rowenta Turbo Silence Ventilateur sur Pied",
    shortDescription: "35dB seulement, 12 vitesses, oscillation auto — la reference premium.",
    description: "<p>Rowenta Turbo Silence : 35dB ultra-silencieux, 12 vitesses, oscillation 80 degres, flux 7,2m, modes Silent Night et Auto.</p>",
    price: 89.99, comparePrice: 119.99, cost: 42, stock: 40, trendScore: 91, featured: false, published: true,
    benefits: ["35dB ultra-silencieux","12 vitesses","Oscillation 80 degres","Flux 7,2m"],
    salesArguments: ["Top 4 Cuisine Maison","Marque reference ventilation","Livraison Prime"],
    affiliateUrl: amz("B0CS3NX4QG"), categorySlug: "maison-intelligente",
    images: [img("71V9m6Rha-L"), img("61V9m6Rha-L"), img("51V9m6Rha-L")],
  },
  {
    slug: "dreo-ventilateur-colonne-20db",
    name: "DREO Ventilateur Colonne 20dB Silencieux",
    shortDescription: "Le plus silencieux du marche : 20dB seulement, 7,6m/s, 92cm.",
    description: "<p>DREO colonne 92cm, moteur EC 20dB, vitesse 7,6m/s, oscillation 90 degres, telecommande, minuterie 12h. Ideal chambre et bureau.</p>",
    price: 119.99, comparePrice: 149.99, cost: 55, stock: 35, trendScore: 88, featured: false, published: true,
    benefits: ["20dB whisper-silent","7,6m/s puissant","92cm elegant","Telecommande + minuterie"],
    salesArguments: ["Top 6 Cuisine Maison","Plebiscite pour chambres","Livraison Prime"],
    affiliateUrl: amz("B09MKPDJRT"), categorySlug: "maison-intelligente",
    images: [img("71G7qy9UDpL"), img("61G7qy9UDpL"), img("51G7qy9UDpL")],
  },
  {
    slug: "levoit-ventilateur-colonne-dc-12v",
    name: "LEVOIT Ventilateur Colonne DC 26W 12 Vitesses",
    shortDescription: "Design epure, 12 vitesses, 4 modes, 20dB — le premium silencieux.",
    description: "<p>LEVOIT DC 26W, 20dB, 12 vitesses, 4 modes dont sommeil, minuterie 12h, oscillation 90 degres. Economique en energie. Telecommande incluse.</p>",
    price: 109.99, comparePrice: 139.99, cost: 50, stock: 38, trendScore: 86, featured: false, published: true,
    benefits: ["DC economique","12 vitesses 4 modes","20dB silencieux","Design LEVOIT premium"],
    salesArguments: ["Top 7 Cuisine Maison","Marque premium sante maison","Livraison Prime"],
    affiliateUrl: amz("B0CTMLBB1Q"), categorySlug: "maison-intelligente",
    images: [img("51GvAoyIfWL"), img("61GvAoyIfWL"), img("41GvAoyIfWL")],
  },
  {
    slug: "film-anti-regard-miroir-fenetre",
    name: "Film Anti-Regard Fenetre Effet Miroir",
    shortDescription: "Intimite totale le jour + brise-vue thermique, sans colle.",
    description: "<p>Film miroir unidirectionnel : vous voyez dehors, personne ne vous voit le jour. Reduit la chaleur 45%, bloque 99% UV. Format 44,5x200cm, sans colle.</p>",
    price: 14.99, comparePrice: 21.99, cost: 5, stock: 250, trendScore: 85, featured: false, published: true,
    benefits: ["Intimite totale le jour","Chaleur reduite -45%","UV bloque 99%","Sans colle repositionnable"],
    salesArguments: ["Viral deco ete 2026","12M vues TikTok","Livraison Prime"],
    affiliateUrl: amz("B07BFTRLTK"), categorySlug: "maison-intelligente",
    images: [img("61Ys5nWGJBL"), img("51Ys5nWGJBL"), img("71Ys5nWGJBL")],
  },
  {
    slug: "the-ordinary-acide-glycolique-7pct",
    name: "The Ordinary Tonique Acide Glycolique 7%",
    shortDescription: "L'exfoliant chimique le plus viral de TikTok — peau lisse en 14 jours.",
    description: "<p>Tonique The Ordinary a l'acide glycolique 7% : elimine cellules mortes, unifie le teint, reduit les pores. Resultats visibles en 14 jours.</p>",
    price: 9.90, comparePrice: 14.99, cost: 3, stock: 300, trendScore: 99, featured: true, published: true,
    benefits: ["Exfoliation chimique douce","Peau lisse en 14 jours","Reduit les pores","Reference skincare"],
    salesArguments: ["#1 Beaute Amazon FR","100M vues TikTok","Livraison Prime"],
    affiliateUrl: amz("B071914GGL"), categorySlug: "beaute-soins",
    images: [img("5147PCBYBnL"), img("6147PCBYBnL"), img("4147PCBYBnL")],
  },
  {
    slug: "biodance-masque-hydrogel-collagen",
    name: "BIODANCE Masque Hydrogel Bio-Collagen",
    shortDescription: "Le masque coreen viral TikTok — lifting immediat, pores minimises.",
    description: "<p>BIODANCE bio-collagene reel : pores minimises, elasticite amelioree, effet lifting immediat. K-Beauty certifie.</p>",
    price: 12.99, comparePrice: 18.99, cost: 4, stock: 220, trendScore: 97, featured: true, published: true,
    benefits: ["Bio-collagene 100%","Effet lifting immediat","Pores minimises","K-Beauty certifie"],
    salesArguments: ["Viral K-Beauty TikTok 2026","Top 4 Beaute Amazon FR","Livraison Prime"],
    affiliateUrl: amz("B0B2RM68G2"), categorySlug: "beaute-soins",
    images: [img("51ubxqzNGIL"), img("61ubxqzNGIL"), img("41ubxqzNGIL")],
  },
  {
    slug: "cerave-gel-moussant-salicylique",
    name: "CeraVe Gel Moussant Anti-Imperfections",
    shortDescription: "Acide salicylique + ceramides : le nettoyant dermatologique de reference.",
    description: "<p>CeraVe : acide salicylique, niacinamide et ceramides. Purifie, reduit imperfections, resserre pores. Formule par dermatologues.</p>",
    price: 11.90, comparePrice: 16.99, cost: 4, stock: 280, trendScore: 93, featured: false, published: true,
    benefits: ["Acide salicylique","Niacinamide anti-rougeurs","Ceramides reparateurs","Formule dermatologues"],
    salesArguments: ["Marque #1 dermatologie USA","Viral TikTok skincare","Livraison Prime"],
    affiliateUrl: amz("B0B7RQ46LD"), categorySlug: "beaute-soins",
    images: [img("613U0vhdyuL"), img("513U0vhdyuL"), img("713U0vhdyuL")],
  },
  {
    slug: "the-ordinary-niacinamide-10-zinc",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    shortDescription: "Le serum anti-pores et anti-imperfections le plus vendu au monde.",
    description: "<p>Serum concentre niacinamide 10% + zinc 1% : pores reduits, sebum controle, teint unifie. 30ml pour 60 jours.</p>",
    price: 6.90, comparePrice: 9.99, cost: 2, stock: 350, trendScore: 96, featured: true, published: true,
    benefits: ["Niacinamide 10%","Zinc 1% anti-sebum","Pores reduits visiblement","60 jours utilisation"],
    salesArguments: ["Serum #1 mondial skincare","50M unites vendues","Livraison Prime"],
    affiliateUrl: amz("B01MDTVZTZ"), categorySlug: "beaute-soins",
    images: [img("51Y+eRfHVWL"), img("61Y+eRfHVWL"), img("41Y+eRfHVWL")],
  },
  {
    slug: "garnier-ambre-solaire-mousse-autobronzante",
    name: "GARNIER Ambre Solaire Mousse Autobronzante",
    shortDescription: "Bronzage progressif naturel eau de coco — resultat sur-mesure sans traces.",
    description: "<p>Mousse autobronzante Garnier eau de coco et aloe vera : bronzage progressif 24h, sans odeur, resultat naturel personnalisable.</p>",
    price: 9.49, comparePrice: 13.99, cost: 3, stock: 200, trendScore: 88, featured: false, published: true,
    benefits: ["Bronzage progressif 24h","Sans odeur desagreable","Eau de coco et aloe vera","Resultat sur-mesure"],
    salesArguments: ["Top 9 Beaute Amazon FR","Viral ete 2026","Livraison Prime"],
    affiliateUrl: amz("B083YF3QZL"), categorySlug: "beaute-soins",
    images: [img("51DK-M9JzwL"), img("61DK-M9JzwL"), img("41DK-M9JzwL")],
  },
  {
    slug: "revlon-uniqone-spray-sans-rincage",
    name: "Revlon Professional UniqOne Spray 10-en-1",
    shortDescription: "10 benefices en 1 spray sans rincage — le soin cheveux culte des pros.",
    description: "<p>UniqOne Revlon : demele, repare, protege chaleur jusqu'a 230C, lisse, hydrate en 1 seul spray. Vegan, tous types cheveux.</p>",
    price: 13.99, comparePrice: 19.99, cost: 5, stock: 180, trendScore: 87, featured: false, published: true,
    benefits: ["10 benefices en 1","Protection chaleur 230C","Vegan","Tous types cheveux"],
    salesArguments: ["Culte des coiffeurs pros","Top 12 Beaute Amazon FR","Livraison Prime"],
    affiliateUrl: amz("B00M9B66BU"), categorySlug: "beaute-soins",
    images: [img("61R6wx1zU1L"), img("51R6wx1zU1L"), img("71R6wx1zU1L")],
  },
  {
    slug: "bionoble-huile-ricin-bio-pressee-froid",
    name: "BIONOBLE Huile Ricin Bio Pressee Froid",
    shortDescription: "L'huile multi-usage virale : cils, sourcils, cheveux et ongles.",
    description: "<p>BIONOBLE 100% pure, bio certifiee, pressee froid. Favorise pousse cils, sourcils, cheveux. Repare ongles cassants. Pipette de precision incluse.</p>",
    price: 12.49, comparePrice: 17.99, cost: 4, stock: 240, trendScore: 91, featured: false, published: true,
    benefits: ["100% pure bio certifiee","Pousse cils et sourcils","Repare les cheveux","Pipette de precision"],
    salesArguments: ["Viral beaute naturelle TikTok","Top 13 Beaute Amazon FR","Livraison Prime"],
    affiliateUrl: amz("B08D6G78W6"), categorySlug: "beaute-soins",
    images: [img("91hbAFc1MEL"), img("81hbAFc1MEL"), img("71hbAFc1MEL")],
  },
  {
    slug: "etiaxil-detranspirant-peaux-sensibles",
    name: "ETIAXIL Detranspirant Peaux Sensibles",
    shortDescription: "4 jours de protection garantie — le detranspirant medical de reference.",
    description: "<p>ETIAXIL cliniquement prouve : efficace 4 jours par application. Specialement formule pour peaux sensibles contre transpiration excessive.</p>",
    price: 9.90, comparePrice: 13.99, cost: 3, stock: 300, trendScore: 86, featured: false, published: true,
    benefits: ["4 jours de protection","Peaux sensibles","Transpiration excessive","Cliniquement prouve"],
    salesArguments: ["Top 6 Beaute Amazon FR","Plebiscite par dermatologues","Livraison Prime"],
    affiliateUrl: amz("B086R8LQJ9"), categorySlug: "beaute-soins",
    images: [img("61OY86-cVvL"), img("51OY86-cVvL"), img("71OY86-cVvL")],
  },
  {
    slug: "medicube-body-peel-shot-kbeauty",
    name: "Medicube Body Peel Shot K-Beauty",
    shortDescription: "Le serum exfoliant corps coreen viral — peau lisse total body.",
    description: "<p>Medicube acide hypochloreux : exfolie doucement cellules mortes, estompe taches et zones rugueuses. K-Beauty dermatologiquement teste.</p>",
    price: 24.99, comparePrice: 34.99, cost: 9, stock: 120, trendScore: 90, featured: true, published: true,
    benefits: ["Acide hypochloreux innovant","Exfoliation corps complete","Estompe taches et rugosites","K-Beauty teste"],
    salesArguments: ["Viral K-Beauty TikTok 2026","Top 11 Beaute Amazon FR","Livraison Prime"],
    affiliateUrl: amz("B0FPCC599C"), categorySlug: "beaute-soins",
    images: [img("71KFzuBwfDL"), img("61KFzuBwfDL"), img("51KFzuBwfDL")],
  },
];

async function main() {
  console.log("Reset DB...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("Categories...");
  for (const cat of CATEGORIES) {
    await prisma.category.create({ data: cat });
  }

  console.log(`Seed ${PRODUCTS.length} produits...`);
  let ok = 0;
  for (const p of PRODUCTS) {
    const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
    if (!category) { console.warn(`Cat introuvable: ${p.categorySlug}`); continue; }
    await prisma.product.create({
      data: {
        slug: p.slug, name: p.name, shortDescription: p.shortDescription,
        description: p.description, price: p.price, comparePrice: p.comparePrice ?? null,
        cost: p.cost, stock: p.stock, trendScore: p.trendScore, featured: p.featured,
        published: p.published, affiliateUrl: p.affiliateUrl, categoryId: category.id,
        benefits: p.benefits, salesArguments: p.salesArguments,
        tags: [p.categorySlug],
        images: { create: p.images.map((url, i) => ({ url, alt: p.name, position: i })) },
      },
    });
    ok++;
    console.log(`  OK ${p.name}`);
  }
  console.log(`\nDone: ${ok}/${PRODUCTS.length} produits.`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
