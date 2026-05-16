import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Catégories
  const [auto, maison, cuisine] = await Promise.all([
    prisma.category.upsert({
      where: { slug: "gadgets-voiture" },
      update: {},
      create: {
        name: "Gadgets Auto",
        slug: "gadgets-voiture",
        description: "Accessoires high-tech pour votre voiture",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80",
      },
    }),
    prisma.category.upsert({
      where: { slug: "maison-intelligente" },
      update: {},
      create: {
        name: "Maison Intelligente",
        slug: "maison-intelligente",
        description: "Gadgets pour une maison connectée et pratique",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      },
    }),
    prisma.category.upsert({
      where: { slug: "cuisine-pratique" },
      update: {},
      create: {
        name: "Cuisine Pratique",
        slug: "cuisine-pratique",
        description: "Ustensiles et gadgets pour cuisiner mieux et plus vite",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
      },
    }),
  ]);

  console.log("✅ Catégories créées");

  // Produits
  const products = [
    {
      name: "Caméra de recul sans fil HD 1080p",
      slug: "camera-recul-sans-fil-hd",
      shortDescription: "Installez une caméra de recul en 5 minutes sans percer ni câbler. Vision nocturne intégrée.",
      description: `La caméra de recul sans fil HD 1080p est la solution ultime pour stationner en toute sécurité.

Grâce à sa technologie sans fil 2.4 GHz, l'installation se fait en moins de 5 minutes : aucun câblage, aucun perçage.
Compatiblement avec toutes les marques de voiture.

**Caractéristiques :**
- Résolution Full HD 1080p
- Angle de vision 170°
- Vision nocturne infrarouge
- Étanche IP68
- Signal sans fil jusqu'à 10m
- Batterie longue durée (standby)

Idéal pour les camping-cars, caravanes, voitures de société.`,
      price: 49.99,
      comparePrice: 79.99,
      cost: 12.5,
      stock: 47,
      trendScore: 88,
      featured: true,
      published: true,
      categoryId: auto.id,
      tags: ["voiture", "sécurité", "caméra", "recul", "sans fil"],
      benefits: [
        "Installation en 5 minutes sans câble",
        "Vision nocturne claire jusqu'à 8m",
        "Compatible toutes voitures",
        "Étanche — résiste pluie et lavage auto",
        "Angle panoramique 170°",
      ],
      salesArguments: [
        "Évitez les accidents de stationnement coûteux",
        "Compatible avec votre autoradio existant",
        "Plus de 10 000 avis 5 étoiles sur Amazon",
        "Livraison gratuite + retour 30 jours",
      ],
      marketingAngle: "Parking sans stress — plus jamais d'accrochage",
      tiktokScript: "POV : tu gares ta voiture en toute sécurité avec cette caméra de recul. Installation en 5 min, pas de câble. Regarde comment ça change la vie ! 🚗📸",
      tiktokHashtags: ["voiture", "gadget", "parking", "securite", "astucevoiture"],
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
      ],
    },
    {
      name: "Purificateur d'air voiture HEPA + ioniseur",
      slug: "purificateur-air-voiture-hepa",
      shortDescription: "Purifiez l'air de votre habitacle en temps réel. Élimine 99.7% des allergènes, PM2.5 et odeurs.",
      description: `Respirez un air pur dans votre voiture grâce à ce purificateur compact qui tient dans un porte-gobelet.

Équipé d'un filtre HEPA H13 et d'un ioniseur négatif, il capture les particules les plus fines (PM2.5), les allergènes,
les odeurs de tabac et les bactéries.

Idéal pour les personnes allergiques, les familles avec enfants et les chauffeurs professionnels.`,
      price: 34.99,
      comparePrice: 59.99,
      cost: 8.0,
      stock: 92,
      trendScore: 82,
      featured: true,
      published: true,
      categoryId: auto.id,
      tags: ["voiture", "purificateur", "air", "santé", "allergie"],
      benefits: [
        "Filtre HEPA H13 — 99.7% des particules fines",
        "Ioniseur intégré neutralise les bactéries",
        "Silencieux (moins de 30 dB)",
        "Indicateur qualité d'air en temps réel",
        "Filtre remplaçable tous les 3-6 mois",
      ],
      salesArguments: [
        "Réduction des allergies au volant",
        "Élimine l'odeur de tabac en 15 minutes",
        "Parfait pour les chauffeurs VTC",
        "Batterie ou prise allume-cigare",
      ],
      marketingAngle: "L'air pur en voiture pour toute la famille",
      tiktokScript: "Je mets fin aux allergies en voiture avec ce gadget à 35€. Regarde la différence avant/après sur l'indicateur de qualité d'air 😮 #allergie #voiture",
      tiktokHashtags: ["sante", "voiture", "purificateur", "allergie", "astuce"],
      images: [
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
      ],
    },
    {
      name: "Prise connectée WiFi avec mesure de consommation",
      slug: "prise-connectee-wifi-consommation",
      shortDescription: "Contrôlez vos appareils à distance et mesurez votre consommation électrique en temps réel.",
      description: `Transformez n'importe quelle prise électrique en prise intelligente. Compatible avec Google Home, Amazon Alexa et Apple HomeKit.

Suivez votre consommation électrique en kWh directement sur l'app, programmez des horaires,
et gérez vos appareils de n'importe où dans le monde.

**Fonctionnalités :**
- Contrôle à distance via app (iOS & Android)
- Mesure consommation en temps réel (Watt / kWh / coût)
- Compatible Google Home, Alexa, Siri Shortcuts
- Programmation horaires et minuterie
- Historique consommation 30 jours
- Protection surtension intégrée`,
      price: 19.99,
      comparePrice: 34.99,
      cost: 4.5,
      stock: 134,
      trendScore: 91,
      featured: true,
      published: true,
      categoryId: maison.id,
      tags: ["maison connectée", "prise", "wifi", "énergie", "smart home"],
      benefits: [
        "Économisez jusqu'à 30% sur votre facture électrique",
        "Contrôle depuis n'importe où dans le monde",
        "Compatible tous assistants vocaux",
        "Installation en 30 secondes",
        "Affiche le coût en euros sur l'application",
      ],
      salesArguments: [
        "Amortissable en 2 mois sur vos factures",
        "Idéal pour les chauffe-eau, climatiseurs, box TV",
        "Offert avec la livraison dès 50€ de commande",
        "Compatible avec toute installation française",
      ],
      marketingAngle: "Économisez sur votre électricité dès le premier mois",
      tiktokScript: "Cette prise à 20€ m'a fait économiser 47€ sur ma facture d'électricité ce mois. Voilà comment en 60 secondes 💡⚡",
      tiktokHashtags: ["smarthome", "economie", "electricite", "gadget", "maison"],
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      ],
    },
    {
      name: "Projecteur LED étoiles et aurores boréales",
      slug: "projecteur-led-etoiles-aurores-boreales",
      shortDescription: "Transformez votre chambre en galaxie. 16 couleurs, rotation automatique, télécommande et contrôle app.",
      description: `Créez une atmosphère unique dans n'importe quelle pièce avec ce projecteur galaxie haut de gamme.

Projetez des étoiles et des nébuleuses colorées sur vos murs et plafond. Parfait pour la chambre d'enfant,
le salon, ou en décoration de fête.

**Modes :**
- 16 couleurs RGB réglables
- 4 effets lumineux (étoiles, nébuleuse, lune, combiné)
- Rotation automatique 360°
- Minuterie programmable 1h/2h/4h
- Mode musique — réagit au son ambiant
- Télécommande IR incluse + app compatible`,
      price: 29.99,
      comparePrice: 49.99,
      cost: 7.0,
      stock: 78,
      trendScore: 85,
      featured: true,
      published: true,
      categoryId: maison.id,
      tags: ["décoration", "lumière", "chambre", "enfant", "ambiance"],
      benefits: [
        "16 couleurs et effets personnalisables",
        "Idéal pour l'endormissement des enfants",
        "Réagit à la musique pour les fêtes",
        "Rotation douce et silencieuse",
        "Compatible iPhone et Android",
      ],
      salesArguments: [
        "Idée cadeau parfaite pour toutes les occasions",
        "Vendu à plus de 50 000 exemplaires",
        "TikTok viral — 8M de vues",
        "Livraison rapide pour les anniversaires",
      ],
      marketingAngle: "Le cadeau qui rend toutes les chambres magiques",
      tiktokScript: "Je transforms ma chambre en galaxie en 10 secondes avec ce projecteur. Mon copain n'en revient pas 😱✨ #chambre #decoration #diy #galaxie",
      tiktokHashtags: ["chambre", "galaxie", "decoration", "cadeau", "viral"],
      images: [
        "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&q=80",
      ],
    },
    {
      name: "Trancheuse à œufs multifonction inox",
      slug: "trancheuse-oeufs-multifonction-inox",
      shortDescription: "Découpez œufs durs, fraises, champignons et avocats en 3 styles différents. Inox premium, lave-vaisselle.",
      description: `Fini les œufs écrasés et les découpes irrégulières ! Cette trancheuse 3-en-1 en inox brossé
vous permet de trancher, émincer ou faire des quartiers en un seul geste.

**Compatible avec :** œufs durs, fraises, champignons, avocats, kiwis, olives.

**3 lames interchangeables :**
- Tranches régulières
- Quartiers
- Grille (brunoise rapide)

Matériau : acier inoxydable 304 + ABS alimentaire. Lave-vaisselle compatible.`,
      price: 14.99,
      comparePrice: 24.99,
      cost: 3.2,
      stock: 210,
      trendScore: 73,
      featured: false,
      published: true,
      categoryId: cuisine.id,
      tags: ["cuisine", "outil", "œuf", "coupe", "inox"],
      benefits: [
        "3 types de découpe en un seul outil",
        "Lames inox incassables et ultra-tranchantes",
        "Compatible lave-vaisselle",
        "Gain de temps pour la préparation des repas",
        "Idéal pour les salades et apéritifs",
      ],
      salesArguments: [
        "Le gadget cuisine le plus vendu sur TikTok Shop",
        "Parfait pour les repas sains et les batch cooking",
        "Prix imbattable pour la qualité inox",
        "Livraison offerte avec 2 articles",
      ],
      marketingAngle: "Préparez vos repas 3x plus vite",
      tiktokScript: "Ce gadget cuisine à 15€ change TOUT ma préparation de repas. Regarde ce que je fais avec en 30 secondes 🥗🍳 #mealprep #cuisine #tiktokfood",
      tiktokHashtags: ["cuisine", "mealprep", "gadget", "cooking", "food"],
      images: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      ],
    },
    {
      name: "Pèse-aliments digital USB rechargeable",
      slug: "pese-aliments-digital-usb",
      shortDescription: "Balance de cuisine ultra-précise au gramme près. Écran LCD rétroéclairé, rechargeable USB-C, tare intégrée.",
      description: `La balance de cuisine parfaite pour les passionnés de cuisine saine, les sportifs qui trackent leurs macros,
et tous ceux qui aiment cuisiner avec précision.

**Spécifications :**
- Capacité : 5 kg
- Précision : 1 gramme
- Unités : g, oz, ml, lb
- Écran LCD rétroéclairé (lisible de jour)
- Rechargeable USB-C (câble inclus)
- Fonction tare instantanée
- Surface en verre trempé ultra-résistante
- Arrêt automatique après 3 minutes`,
      price: 22.99,
      comparePrice: 39.99,
      cost: 5.5,
      stock: 165,
      trendScore: 68,
      featured: false,
      published: true,
      categoryId: cuisine.id,
      tags: ["cuisine", "balance", "régime", "sport", "précision"],
      benefits: [
        "Précision au gramme — parfait pour les macros",
        "Rechargeable USB-C — plus de piles",
        "Verre trempé résistant aux impacts",
        "Écran lisible sous toutes les lumières",
        "Compact et élégant — s'intègre partout",
      ],
      salesArguments: [
        "Indispensable pour le fitness et la cuisine saine",
        "3x plus précis que les balances classiques",
        "USB-C — une charge dure 3 mois",
        "Design minimaliste primé",
      ],
      marketingAngle: "La précision au service de votre alimentation",
      tiktokScript: "Comment je track mes macros avec cette balance à 23€. Précision au gramme, rechargeable USB-C. Obligatoire pour le fitness 💪 #fitness #nutrition #macro",
      tiktokHashtags: ["fitness", "nutrition", "regime", "cuisine", "sante"],
      images: [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
      ],
    },
  ];

  for (const productData of products) {
    const { images, categoryId, ...data } = productData;

    const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
    if (existing) {
      console.log(`⏭️  Produit déjà existant : ${data.name}`);
      continue;
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        categoryId,
        images: {
          create: images.map((url, i) => ({ url, position: i })),
        },
      },
    });

    // Score tendance
    await prisma.trendScore.create({
      data: {
        productId: product.id,
        score: product.trendScore,
        popularity: Math.max(0, product.trendScore - 5 + Math.floor(Math.random() * 10)),
        tiktokTrend: Math.max(0, product.trendScore + Math.floor(Math.random() * 15) - 5),
        searchVolume: Math.max(0, product.trendScore - 10 + Math.floor(Math.random() * 20)),
        margin: Math.round(((productData.price - productData.cost) / productData.price) * 100),
        competition: Math.floor(Math.random() * 50) + 20,
        viralPotential: Math.max(0, product.trendScore + 5 + Math.floor(Math.random() * 10)),
        safetyRisk: Math.floor(Math.random() * 20),
        seasonality: 70 + Math.floor(Math.random() * 30),
        seoPotential: Math.max(0, product.trendScore - 15 + Math.floor(Math.random() * 20)),
      },
    });

    console.log(`✅ Créé : ${product.name} (score: ${product.trendScore})`);
  }

  console.log("\n🎉 Seed terminé avec succès !");
}

main()
  .catch((e) => { console.error("❌ Erreur seed:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
