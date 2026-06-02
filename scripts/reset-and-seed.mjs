import { PrismaClient } from '@prisma/client';

const DB = process.env.DATABASE_URL;

const prisma = new PrismaClient();

const TAG = "vellio42-21";
const amz = (asin) => `https://www.amazon.fr/dp/${asin}?tag=${TAG}`;

const CATEGORIES = [
  { slug: "tech-gadgets",        name: "Tech & Gadgets",        description: "Les meilleurs gadgets tech sélectionnés pour leur utilité réelle." },
  { slug: "maison-intelligente", name: "Maison Intelligente",   description: "Automatisez et améliorez votre maison avec les meilleures marques." },
  { slug: "sport-fitness",       name: "Sport & Fitness",       description: "Équipements premium pour performer et récupérer efficacement." },
  { slug: "bureau-productivite", name: "Bureau & Productivité", description: "Transformez votre espace de travail en station de performance." },
];

const PRODUCTS = [
  // TECH GADGETS
  { slug:"anker-soundcore-p40i", name:"Anker Soundcore P40i — Écouteurs ANC", categorySlug:"tech-gadgets", price:4999, comparePrice:6999, description:"Réduction de bruit active adaptative, 60h d'autonomie, son Hi-Res certifié. Le meilleur rapport qualité/prix ANC du marché.", affiliateUrl:amz("B0C7MFKW54"), images:["https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"anker-maggo-733",      name:"Anker 733 MagGo — Chargeur 3-en-1 65W", categorySlug:"tech-gadgets", price:7999, comparePrice:9999, description:"Charge iPhone (MagSafe 15W), AirPods et Apple Watch simultanément. Chargeur mural 65W GaN intégré, aucun adaptateur supplémentaire.", affiliateUrl:amz("B09BVYD5JN"), images:["https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"baseus-powerbank-65w", name:"Baseus Power Bank 20000mAh 65W USB-C", categorySlug:"tech-gadgets", price:4499, comparePrice:5999, description:"Charge un laptop + 2 téléphones simultanément. 65W sortie max, écran LED, charge rapide PD. 4 charges iPhone complètes.", affiliateUrl:amz("B09N3ZXS25"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"logitech-mx-master-3s", name:"Logitech MX Master 3S — Souris Sans Fil", categorySlug:"tech-gadgets", price:9999, comparePrice:11999, description:"8000 DPI ultra-précis, molette MagSpeed, boutons 90% silencieux. Le standard professionnel mondial.", affiliateUrl:amz("B09HM94VDS"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"tapo-c200",            name:"TP-Link Tapo C200 — Caméra IP WiFi 360°", categorySlug:"tech-gadgets", price:2999, comparePrice:3999, description:"Full HD 1080P, rotation 360°, vision nocturne 9m, alertes smartphone. #1 vente caméra intérieure France.", affiliateUrl:amz("B082Z11BFV"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"echo-dot-5",           name:"Amazon Echo Dot 5 — Enceinte Alexa", categorySlug:"tech-gadgets", price:5499, comparePrice:6499, description:"Son amélioré, capteur température intégré, contrôle vocal Alexa. La meilleure entrée dans la maison connectée.", affiliateUrl:amz("B09B8YWXDF"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },

  // MAISON INTELLIGENTE
  { slug:"philips-hue-white-3pack", name:"Philips Hue White — Pack 3 Ampoules E27", categorySlug:"maison-intelligente", price:4499, comparePrice:5999, description:"Contrôle vocal Alexa/Google, programmation horaire, durée de vie 25 000h. Le standard de l'éclairage connecté.", affiliateUrl:amz("B07PNBQYTS"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"kasa-hs100",           name:"Kasa Smart HS100 — Prise Connectée WiFi", categorySlug:"maison-intelligente", price:1599, comparePrice:2299, description:"Rendez n'importe quel appareil connecté. Contrôle à distance, programmation, sans hub. Installation 2 minutes.", affiliateUrl:amz("B0152WLWSA"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"meross-thermostat",    name:"Meross Smart Thermostat WiFi", categorySlug:"maison-intelligente", price:3999, comparePrice:5499, description:"Contrôlez votre chauffage à distance. Économies jusqu'à 31% sur votre facture. Rentabilisé en 2 mois.", affiliateUrl:amz("B09L6DSLGQ"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"govee-rgbic-10m",      name:"Govee RGBIC — Ruban LED 10m WiFi", categorySlug:"maison-intelligente", price:3499, comparePrice:4499, description:"Multicolore simultané, sync musique temps réel, 64 effets. Transforme n'importe quelle pièce en 10 minutes.", affiliateUrl:amz("B094ZBFVD6"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"eufy-robovac-x8",      name:"Eufy RoboVac X8 — Robot Aspirateur 2000Pa", categorySlug:"maison-intelligente", price:24999, comparePrice:29999, description:"Twin-turbine 2000Pa, cartographie laser, ultra-silencieux. Le robot qui remplace vraiment l'aspirateur classique.", affiliateUrl:amz("B09CCC9ZC8"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"sonos-era-100",        name:"Sonos Era 100 — Enceinte WiFi Multiroom", categorySlug:"maison-intelligente", price:24999, comparePrice:27999, description:"Son stéréo vrai, WiFi + Bluetooth, AirPlay 2, multiroom. Le premium audio qui se justifie.", affiliateUrl:amz("B0BW5PNSHV"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },

  // SPORT FITNESS
  { slug:"theragun-mini",        name:"Theragun Mini — Pistolet Massage Pro", categorySlug:"sport-fitness", price:14999, comparePrice:17999, description:"Amplitude 12mm, 150min autonomie, 3 vitesses. La marque des athlètes professionnels en format compact.", affiliateUrl:amz("B0C4HPFDF2"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"garmin-forerunner-55", name:"Garmin Forerunner 55 — Montre GPS Running", categorySlug:"sport-fitness", price:16999, comparePrice:19999, description:"GPS précis, fréquence cardiaque, plans d'entraînement intégrés, 2 semaines d'autonomie. La référence running.", affiliateUrl:amz("B092WQJLQQ"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"bowflex-selecttech-552", name:"Bowflex SelectTech 552 — Haltères 2-24kg", categorySlug:"sport-fitness", price:32999, comparePrice:39999, description:"15 poids en 1 appareil compact. De 2 à 24kg, sélection en 3 secondes. Remplace toute une salle de sport.", affiliateUrl:amz("B001ARYU58"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"fitbit-charge-6",      name:"Fitbit Charge 6 — Tracker Fitness GPS", categorySlug:"sport-fitness", price:14999, comparePrice:17999, description:"GPS sans smartphone, ECG, SpO2, suivi sommeil avancé, 7 jours autonomie. Le plus complet sous 200€.", affiliateUrl:amz("B0CDF7K9KS"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"manduka-pro-yoga",     name:"Manduka PRO — Tapis Yoga 6mm Garantie Vie", categorySlug:"sport-fitness", price:12999, comparePrice:14999, description:"Garantie à vie, 6mm amorti dense, antidérapant total. Le dernier tapis yoga que vous achèterez.", affiliateUrl:amz("B001AT4JOG"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"walkingpad-r2",        name:"WalkingPad R2 — Tapis Marche Sous Bureau", categorySlug:"sport-fitness", price:37999, comparePrice:44999, description:"Marchez en travaillant. Pliable en 3s, 0.5-6km/h, ultra-silencieux. 10 000 pas sans quitter votre bureau.", affiliateUrl:amz("B09R6FVK8S"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },

  // BUREAU PRODUCTIVITE
  { slug:"lg-27un850-4k",        name:"LG 27UN850 — Écran 4K 27\" USB-C 96W", categorySlug:"bureau-productivite", price:44999, comparePrice:54999, description:"4K IPS, USB-C 96W (charge MacBook), 99% sRGB, HDR400. Un câble = tout. Le monitor HomeOffice parfait.", affiliateUrl:amz("B08ZJCTWQJ"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"keychron-k2-pro",      name:"Keychron K2 Pro — Clavier Mécanique WiFi", categorySlug:"bureau-productivite", price:9999, comparePrice:12999, description:"Bluetooth 3 appareils, switches hotswap, RGB, Mac & Windows. Le standard mondial des développeurs et créatifs.", affiliateUrl:amz("B0BK5J9KTD"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"flexispot-e7",         name:"Flexispot E7 — Bureau Assis-Debout 160x80", categorySlug:"bureau-productivite", price:49999, comparePrice:59999, description:"Double moteur silencieux, 4 hauteurs mémorisées, 125kg. Le bureau assis-debout #1 en Europe.", affiliateUrl:amz("B08B2TF2FJ"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"elgato-key-light",     name:"Elgato Key Light — Panneau LED 2800 Lumens", categorySlug:"bureau-productivite", price:19999, comparePrice:24999, description:"Éclairage pro pour visio, streaming, contenu. 2800 lumens, couleur ajustable. Zoom/Teams toujours parfait.", affiliateUrl:amz("B07L755X9G"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"logitech-brio-4k",     name:"Logitech Brio 4K — Webcam 4K HDR USB-C", categorySlug:"bureau-productivite", price:19999, comparePrice:24999, description:"4K HDR, correction lumière automatique, Windows Hello. La webcam de référence absolue pour les professionnels.", affiliateUrl:amz("B01N5UOYC4"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
  { slug:"herman-miller-aeron",  name:"Herman Miller Aeron — Chaise Ergonomique", categorySlug:"bureau-productivite", price:129999, comparePrice:149999, description:"PostureFit SL, matière 8Z aérée, 12 ans de garantie. La chaise de bureau #1 mondiale — un investissement pour la vie.", affiliateUrl:amz("B00MLSS1SW"), images:["https://m.media-amazon.com/images/I/71CGHv6kmWL._AC_SL1500_.jpg"] },
];

async function main() {
  console.log("Connexion...");

  // 1. Nettoyage
  console.log("Nettoyage DB...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  console.log("DB vidée ✓");

  // 2. Catégories
  console.log("Création catégories...");
  for (const cat of CATEGORIES) {
    await prisma.category.create({ data: cat });
  }
  console.log(`${CATEGORIES.length} catégories créées ✓`);

  // 3. Produits
  console.log("Création produits...");
  for (const p of PRODUCTS) {
    const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
    if (!category) { console.warn(`Catégorie introuvable: ${p.categorySlug}`); continue; }

    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        comparePrice: p.comparePrice,
        affiliateUrl: p.affiliateUrl,
        shortDescription: p.description.slice(0, 120),
        cost: 0,
        stock: 999,
        trendScore: 85,
        supplierName: "Amazon",
        published: true,
        categoryId: category.id,
        images: {
          create: p.images.map((url, i) => ({ url, alt: p.name, position: i }))
        }
      }
    });
    console.log(`  ✓ ${p.name}`);
  }

  console.log(`\n✅ ${PRODUCTS.length} produits créés sur ${CATEGORIES.length} catégories`);
}

main()
  .catch(e => { console.error("ERREUR:", e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
