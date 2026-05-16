import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Ajout de produits tendance...");

  // Catégories
  const [sport, beaute, tech, bureau, enfant] = await Promise.all([
    prisma.category.upsert({
      where: { slug: "sport-fitness" },
      update: {},
      create: {
        name: "Sport & Fitness",
        slug: "sport-fitness",
        description: "Équipements et gadgets pour performer et récupérer",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
      },
    }),
    prisma.category.upsert({
      where: { slug: "beaute-soin" },
      update: {},
      create: {
        name: "Beauté & Soin",
        slug: "beaute-soin",
        description: "Soins de la peau, massages et bien-être au quotidien",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
      },
    }),
    prisma.category.upsert({
      where: { slug: "tech-gadgets" },
      update: {},
      create: {
        name: "Tech & Gadgets",
        slug: "tech-gadgets",
        description: "Les dernières innovations high-tech à prix accessibles",
        image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&q=80",
      },
    }),
    prisma.category.upsert({
      where: { slug: "bureau-productivite" },
      update: {},
      create: {
        name: "Bureau & Productivité",
        slug: "bureau-productivite",
        description: "Optimisez votre espace de travail et votre concentration",
        image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
      },
    }),
    prisma.category.upsert({
      where: { slug: "enfant-famille" },
      update: {},
      create: {
        name: "Enfant & Famille",
        slug: "enfant-famille",
        description: "Jouets éducatifs, sécurité et confort pour toute la famille",
        image: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=400&q=80",
      },
    }),
  ]);

  const [auto, maison, cuisine] = await Promise.all([
    prisma.category.findUnique({ where: { slug: "gadgets-voiture" } }),
    prisma.category.findUnique({ where: { slug: "maison-intelligente" } }),
    prisma.category.findUnique({ where: { slug: "cuisine-pratique" } }),
  ]);

  const products = [
    // TECH
    {
      name: "Montre connectée Sport GPS + moniteur cardiaque",
      slug: "montre-connectee-sport-gps",
      shortDescription: "Suivez vos performances en temps réel : GPS, cardio, sommeil, O2 sanguin. Waterproof 50m. Autonomie 14 jours.",
      description: `La montre connectée sport ultime pour les athlètes et les amateurs de fitness.

GPS intégré pour cartographier vos parcours, moniteur cardiaque optique 24h/24, oxymètre de pouls et 120+ modes sport.

**Caractéristiques :**
- GPS + GLONASS intégré
- Cardio en continu + alertes fréquence anormale
- SpO2 (taux oxygène sanguin)
- Analyse du sommeil (phases, qualité)
- Étanche 50 mètres (natation)
- Autonomie 14 jours en utilisation normale
- Compatible iOS et Android
- Notifications smartphone (appels, SMS, apps)`,
      price: 59.99,
      comparePrice: 119.99,
      cost: 18.0,
      stock: 83,
      trendScore: 94,
      featured: true,
      published: true,
      categoryId: sport!.id,
      tags: ["montre", "sport", "gps", "cardio", "fitness", "connectée"],
      benefits: [
        "GPS précis pour running, vélo et randonnée",
        "Cardio 24h/24 avec alertes anomalies",
        "14 jours d'autonomie — rechargez 2x par mois",
        "Étanche 50m — portez-la à la piscine",
        "120 modes sport pré-installés",
      ],
      salesArguments: [
        "Remplace une Garmin à 300€ pour 60€",
        "Compatible avec Strava, Nike Run Club",
        "Meilleure vente TikTok Shop France",
        "Garantie 2 ans + retour 30 jours",
      ],
      marketingAngle: "Les performances d'une pro à prix democratique",
      tiktokScript: "J'ai remplacé ma Garmin 300€ par cette montre à 60€ et je regrette rien. GPS précis, cardio fiable, 14 jours de batterie. Regarde mes stats de course 🏃",
      tiktokHashtags: ["fitness", "running", "montre", "sport", "gadget"],
      images: [
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      ],
    },

    // BEAUTE
    {
      name: "Masseur visage anti-âge ultrasons + LED 7 couleurs",
      slug: "masseur-visage-ultrason-led",
      shortDescription: "Technologie ultrasons + LED multicolore pour stimuler le collagène et réduire rides et taches. Résultats en 4 semaines.",
      description: `Ce dispositif de beauté combine 3 technologies professionnelles dans un appareil compact :

**Ultrasons 1MHz** — pénètre profondément dans les couches de peau pour activer la production de collagène et élastine.

**LED 7 couleurs** — chaque couleur cible une problématique différente :
- Rouge : anti-rides et raffermissement
- Bleu : acné et pores dilatés
- Vert : taches pigmentaires
- Jaune : éclat et vitalité

**Micro-courant** — tonifie les muscles du visage pour un effet lifting immédiat.

Résultats visibles dès 4 semaines d'utilisation régulière (3 fois par semaine, 15 minutes).`,
      price: 44.99,
      comparePrice: 89.99,
      cost: 11.0,
      stock: 126,
      trendScore: 91,
      featured: true,
      published: true,
      categoryId: beaute!.id,
      tags: ["beauté", "soin", "visage", "anti-âge", "led", "ultrasons"],
      benefits: [
        "3 technologies en 1 : ultrasons + LED + micro-courant",
        "Anti-rides, éclat, acné — tout-en-un",
        "Résultats visibles en 4 semaines",
        "Rechargeable USB — zéro pile",
        "Indolore et sûr pour tous types de peau",
      ],
      salesArguments: [
        "Économisez 300€/an de soins en institut",
        "Technologie identique aux appareils à 400€",
        "Plus de 5000 avis 5 étoiles",
        "Utilisé par les influenceuses beauté",
      ],
      marketingAngle: "L'institut beauté à domicile pour 45€",
      tiktokScript: "Mon résultat après 4 semaines avec cet appareil à 45€. Comparez la photo avant/après. Mon dermatologue était choquée 😱 #skincare #antiage #beaute",
      tiktokHashtags: ["skincare", "beaute", "antiage", "led", "glow"],
      images: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
      ],
    },

    // TECH
    {
      name: "Écouteurs sans fil ANC actif — 40h autonomie",
      slug: "ecouteurs-sans-fil-anc-40h",
      shortDescription: "Réduction de bruit active, son Hi-Res Audio, 40h d'autonomie, connexion multipoint. Son studio dans votre poche.",
      description: `Ces écouteurs over-ear délivrent une expérience sonore premium à un prix imbattable.

La réduction de bruit active (ANC) élimine jusqu'à 35dB de bruit ambiant — parfait pour le télétravail, les transports et l'avion.

**Caractéristiques :**
- ANC hybride (microphones internes + externes)
- Hi-Res Audio certifié — 40kHz
- 40h d'autonomie (25h avec ANC)
- Connexion multipoint (2 appareils simultanés)
- Mode Transparence pour rester attentif
- Charge rapide : 10min = 3h d'écoute
- Pliable et ultra-compact pour le voyage
- Microphone anti-bruit pour les appels`,
      price: 69.99,
      comparePrice: 149.99,
      cost: 22.0,
      stock: 65,
      trendScore: 89,
      featured: true,
      published: true,
      categoryId: tech!.id,
      tags: ["écouteurs", "anc", "bluetooth", "musique", "tech", "sans fil"],
      benefits: [
        "ANC qui rivalise avec Sony et Bose",
        "40h d'autonomie — 1 semaine sans recharger",
        "Son Hi-Res Audio certifié",
        "2 appareils connectés en simultané",
        "Pliable — tient dans la poche",
      ],
      salesArguments: [
        "80% moins cher que Sony WH-1000XM5",
        "Idéal télétravail et open space",
        "Qualité pro testée par 12 000 acheteurs",
        "Retour gratuit si vous n'êtes pas convaincu",
      ],
      marketingAngle: "Le silence à portée de budget",
      tiktokScript: "J'ai testé ces écouteurs ANC à 70€ vs Sony à 350€. Honnêtement ? Pour 80% des gens, ceux-là suffisent largement. Voilà mon comparatif 🎧",
      tiktokHashtags: ["ecouteurs", "anc", "musique", "tech", "bluetooth"],
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
      ],
    },

    // BUREAU
    {
      name: "Lampe de bureau LED sans fil + chargeur Qi intégré",
      slug: "lampe-bureau-led-chargeur-qi",
      shortDescription: "Lumière LED réglable en température et intensité. Chargeur sans fil 15W intégré. Timer automatique. Idéal télétravail.",
      description: `La lampe de bureau parfaite pour le télétravail et les longues sessions de concentration.

3 températures de couleur (lumière chaude / neutre / froide) et 10 niveaux d'intensité pour adapter l'éclairage à chaque moment de la journée.

Le chargeur Qi 15W intégré dans la base vous permet de recharger votre smartphone en posant simplement.

**Caractéristiques :**
- 3 températures : 2700K / 4000K / 6500K
- 10 niveaux d'intensité (1% à 100%)
- Chargeur Qi 15W intégré
- Minuterie 30/60 min avec extinction progressive
- USB-A port de charge supplémentaire
- Bras articulé orientable 360°
- Mémoire de derniers réglages`,
      price: 49.99,
      comparePrice: 89.99,
      cost: 14.0,
      stock: 94,
      trendScore: 79,
      featured: false,
      published: true,
      categoryId: bureau!.id,
      tags: ["lampe", "bureau", "led", "télétravail", "chargeur", "qi"],
      benefits: [
        "Lumière réglable — protège vos yeux",
        "Charge ton iPhone ou Samsung sans câble",
        "Timer automatique — éteignez sans y penser",
        "Éclairage uniforme sans zones sombres",
        "Design épuré qui s'intègre partout",
      ],
      salesArguments: [
        "Deux appareils en un : lampe + chargeur",
        "Amortissable dès le premier mois de télétravail",
        "Compatible tous smartphones Qi",
        "Garantie 2 ans",
      ],
      marketingAngle: "Le bureau parfait commence par la bonne lumière",
      tiktokScript: "Setup télétravail ultra-propre. Cette lampe à 50€ charge mon iPhone ET éclaire parfaitement. Plus un seul câble visible sur mon bureau ✨ #setup #bureau",
      tiktokHashtags: ["setup", "bureau", "teletravail", "productivite", "homeoffice"],
      images: [
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
        "https://images.unsplash.com/photo-1524820197278-540916411e20?w=600&q=80",
      ],
    },

    // SPORT
    {
      name: "Pistolet de massage musculaire percussif pro",
      slug: "pistolet-massage-musculaire-percussif",
      shortDescription: "6 têtes interchangeables, 3200 percussions/min, silencieux. Récupération musculaire professionnelle après le sport.",
      description: `Le pistolet de massage que les kinés utilisent en cabinet — désormais accessible pour tous.

Avec 6 têtes interchangeables et 20 niveaux de vitesse, il cible précisément chaque groupe musculaire.

**6 têtes incluses :**
- Tête ronde : grands muscles (dos, cuisses)
- Tête plate : muscles longs (mollets, bras)
- Tête en U : colonne vertébrale (sans contact direct)
- Tête pointue : points de pression et trigger points
- Tête large : dos large et épaules
- Tête molletonée : zones sensibles

**Silencieux** : moteur brushless 45dB maximum.
**Autonomie** : 3-6h selon intensité.`,
      price: 54.99,
      comparePrice: 99.99,
      cost: 16.0,
      stock: 71,
      trendScore: 87,
      featured: true,
      published: true,
      categoryId: sport!.id,
      tags: ["massage", "sport", "récupération", "musculaire", "fitness", "kinésithérapie"],
      benefits: [
        "6 têtes pour tous les groupes musculaires",
        "3200 percussions/min — récupération express",
        "Silencieux — utilisez-le en réunion sans gêner",
        "Batterie 6h — tient toute la semaine",
        "Étui de transport inclus",
      ],
      salesArguments: [
        "Économisez 800€/an de séances kinésiologie",
        "Utilisé par des athlètes professionnels",
        "Viral sur TikTok — 15M de vues",
        "Livraison 24h — prêt pour votre prochaine séance",
      ],
      marketingAngle: "La récupération musculaire pro à domicile",
      tiktokScript: "Je teste ce pistolet de massage à 55€ sur mes courbatures après 5km de course. Résultat après 10 minutes... 💆‍♂️ #sport #running #musculation #recovery",
      tiktokHashtags: ["sport", "massage", "fitness", "musculation", "recovery"],
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
      ],
    },

    // MAISON
    {
      name: "Robot aspirateur laveur programmable ultra-plat",
      slug: "robot-aspirateur-laveur-programmable",
      shortDescription: "Aspire et lave en même temps. Navigation gyroscopique, programmation smartphone, 120 min d'autonomie. Pour sols durs et moquettes.",
      description: `Le ménage sans effort avec ce robot aspirateur et laveur 2-en-1.

Sa hauteur de seulement 7cm lui permet de passer sous les meubles et canapés. La navigation gyroscopique cartographie votre logement pour un nettoyage systématique sans laisser de zone.

**Fonctionnalités :**
- Aspiration 2000Pa (poussière, poils d'animaux, miettes)
- Serpillère humide avec réservoir 300ml
- Cartographie du logement via app
- Programmation des horaires sur smartphone
- Capteurs anti-chute et anti-collision
- 4 modes : auto, spot, bord, planification
- Compatible Alexa et Google Home
- Autonomie 120 minutes`,
      price: 149.99,
      comparePrice: 299.99,
      cost: 55.0,
      stock: 38,
      trendScore: 85,
      featured: true,
      published: true,
      categoryId: maison!.id,
      tags: ["robot", "aspirateur", "ménage", "smart home", "automatique", "nettoyage"],
      benefits: [
        "Aspire ET lave — 2 appareils en 1",
        "Programme depuis ton smartphone",
        "120 min d'autonomie — appartements jusqu'à 150m²",
        "7cm de hauteur — passe partout",
        "Compatible animaux de compagnie",
      ],
      salesArguments: [
        "Économisez 2h de ménage par semaine",
        "Moitié prix des robots Roomba équivalents",
        "Livraison offerte — montage 5 minutes",
        "Satisfait ou remboursé 30 jours",
      ],
      marketingAngle: "Votre ménage fait pendant que vous dormez",
      tiktokScript: "J'ai programmé mon robot à 3h du matin. Ce matin mon salon est impeccable 😍 À 150€ c'est l'achat le plus rentable de l'année #maison #robot #menage",
      tiktokHashtags: ["maison", "robot", "smarthome", "menage", "productivite"],
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      ],
    },

    // BUREAU
    {
      name: "Repose-poignets ergonomique gel + tapis souris XL",
      slug: "repose-poignets-ergonomique-tapis-xl",
      shortDescription: "Pack ergonomique : tapis 900x400mm + repose-poignets gel anti-fatigue. Réduit les douleurs au poignet et améliore la posture.",
      description: `Pour les longues sessions devant l'ordinateur, l'ergonomie n'est pas un luxe — c'est une nécessité.

Ce pack combine un tapis de souris XXL (900x400mm) et un repose-poignets en gel à mémoire de forme.

Le gel s'adapte à la forme de votre poignet pour soulager les tendons et prévenir le syndrome du canal carpien.

Le tapis XXL couvre toute votre zone de travail — clavier, souris et même votre café.

**Matériaux :** base caoutchouc antidérapant + surface en tissu respirant haute précision (compatible souris optique et laser à toutes DPI).`,
      price: 24.99,
      comparePrice: 44.99,
      cost: 6.0,
      stock: 187,
      trendScore: 72,
      featured: false,
      published: true,
      categoryId: bureau!.id,
      tags: ["bureau", "ergonomique", "tapis", "poignet", "télétravail"],
      benefits: [
        "Réduit les douleurs de poignet en 2 semaines",
        "Tapis XXL — toute la zone de travail couverte",
        "Gel à mémoire de forme — s'adapte à vous",
        "Surface précise pour gaming et design",
        "Antidérapant — ne bouge pas",
      ],
      salesArguments: [
        "Remboursé par votre mutuelle (équipement ergonomique)",
        "Idéal pour prévenir les TMS",
        "Format gaming pour un bureau pro",
        "Le setup upgrade le plus simple à faire",
      ],
      marketingAngle: "8h par jour devant l'ordi — protégez vos poignets",
      tiktokScript: "Mon poignet me faisait mal après 8h de bureau. J'ai essayé ce pack à 25€ et les douleurs ont disparu en 2 semaines. Voilà mon setup 💻 #bureau #ergo",
      tiktokHashtags: ["bureau", "setup", "ergonomique", "teletravail", "sante"],
      images: [
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
      ],
    },

    // ENFANT
    {
      name: "Veilleuse bébé avec capteur pleur + berceuse Bluetooth",
      slug: "veilleuse-bebe-capteur-pleur-berceuse",
      shortDescription: "Veilleuse qui s'allume automatiquement quand bébé pleure. 15 sons apaisants, luminosité réglable, app de monitoring.",
      description: `Pour des nuits plus sereines pour bébé ET pour vous.

Ce dispositif combine veilleuse, babyphone sonore et machine à bruit blanc en un seul appareil compact.

**Fonctionnalités :**
- Capteur son : s'active automatiquement quand bébé pleure
- 15 berceuses et bruits blancs (baleine, pluie, feu, lullaby...)
- Luminosité réglable 0-100% en lumière douce
- 7 couleurs LED douces
- Timer extinction automatique (15/30/60 min)
- Contrôle via application smartphone
- Portée Bluetooth : 10 mètres
- Sécurisé CE + sans BPA`,
      price: 34.99,
      comparePrice: 59.99,
      cost: 8.5,
      stock: 143,
      trendScore: 81,
      featured: false,
      published: true,
      categoryId: enfant!.id,
      tags: ["bébé", "veilleuse", "nuit", "enfant", "sommeil"],
      benefits: [
        "Bébé se rendort seul sans vous lever",
        "15 sons apaisants cliniquement testés",
        "App pour contrôler à distance",
        "Lumière douce — sécurisée pour les yeux de bébé",
        "Certifié CE et sans BPA",
      ],
      salesArguments: [
        "Économisez 2h de sommeil par nuit",
        "Cadeau de naissance idéal",
        "Plébiscité par les pédiatres",
        "Remboursement 30 jours si bébé ne dort pas mieux",
      ],
      marketingAngle: "Des nuits entières — pour bébé et pour vous",
      tiktokScript: "Bébé se réveille la nuit et vous ne bougez plus. Cette veilleuse à 35€ l'apaise automatiquement. On a récupéré 2h de sommeil par nuit 😭✨ #bebe #nuit",
      tiktokHashtags: ["bebe", "parents", "sommeil", "nuit", "veilleuse"],
      images: [
        "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=600&q=80",
        "https://images.unsplash.com/photo-1586495777744-4e6232bf2abb?w=600&q=80",
      ],
    },

    // AUTO
    {
      name: "Chargeur voiture GaN 65W USB-C + USB-A",
      slug: "chargeur-voiture-gan-65w",
      shortDescription: "Charge rapide GaN 65W. Recharge un laptop, deux téléphones simultanément. Format ultra-compact. Compatible MacBook, iPad, Android.",
      description: `La technologie GaN (Gallium Nitride) permet de créer un chargeur voiture 65W dans un format minuscule.

Ce chargeur avec 1 port USB-C 65W et 1 port USB-A 18W peut recharger votre MacBook, votre iPad et votre téléphone en même temps depuis votre voiture.

**Compatibilités :**
- MacBook Air / Pro (USB-C)
- iPad Pro / Air
- iPhone 8 à 16 (charge rapide)
- Samsung Galaxy S / Note / Fold
- Tous smartphones USB-C

**Protocoles supportés :**
PD 3.0 / QC 4.0 / QC 3.0 / AFC / FCP / SCP`,
      price: 27.99,
      comparePrice: 49.99,
      cost: 7.0,
      stock: 215,
      trendScore: 76,
      featured: false,
      published: true,
      categoryId: auto!.id,
      tags: ["chargeur", "voiture", "usb-c", "charge rapide", "gan", "auto"],
      benefits: [
        "65W — charge un laptop depuis la voiture",
        "2 ports simultanés — téléphone + tablette",
        "Format monnaie — invisible dans le tableau de bord",
        "GaN = moins de chaleur, plus d'efficacité",
        "Compatible tous appareils modernes",
      ],
      salesArguments: [
        "Oubliez le câble chargeur maison — chargez en voiture",
        "100% compatible MacBook et iPad",
        "Ne chauffe pas — technologie GaN premium",
        "Garantie 2 ans",
      ],
      marketingAngle: "La charge ultra-rapide dans votre voiture",
      tiktokScript: "Ce chargeur voiture à 28€ recharge mon MacBook, mon iPhone et ma Switch en simultané. GaN 65W dans un format plus petit qu'une pièce ⚡️ #tech #voiture",
      tiktokHashtags: ["tech", "voiture", "chargeur", "macbook", "android"],
      images: [
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
      ],
    },

    // BEAUTE
    {
      name: "Brosse lissante ionique chauffante 2-en-1",
      slug: "brosse-lissante-ionique",
      shortDescription: "Coiffe et lisse en même temps. Technologie ionique élimine les frisottis. Température réglable 150°-230°C. Pour tous types de cheveux.",
      description: `Finissez avec le combo brosse + lisseur en deux étapes. Cette brosse lissante les remplace tous les deux.

La technologie ionique négatif élimine les frisottis et rend les cheveux ultra-brillants sans les agresser.

**3 températures :**
- 150°C : cheveux fins et fragiles
- 185°C : cheveux normaux
- 230°C : cheveux épais et frisés

**Chauffe en 30 secondes.** Arrêt automatique après 60 minutes.

Revêtement céramique pour une diffusion homogène de la chaleur sans points chauds.`,
      price: 39.99,
      comparePrice: 74.99,
      cost: 9.5,
      stock: 108,
      trendScore: 83,
      featured: false,
      published: true,
      categoryId: beaute!.id,
      tags: ["cheveux", "brosse", "lissant", "beauté", "coiffure", "ionique"],
      benefits: [
        "Coiffe ET lisse en 1 seule passe",
        "Ionique — zéro frisottis, brillance max",
        "3 températures — convient à tous les cheveux",
        "Chauffe en 30 secondes",
        "Arrêt auto sécurisé après 60 min",
      ],
      salesArguments: [
        "Remplace brosse ET lisseur — gagnez 10 min le matin",
        "Technologie Dyson à 5% du prix",
        "Plus de 8000 avis 5 étoiles",
        "Résultat salon à domicile",
      ],
      marketingAngle: "Un seul outil pour des cheveux parfaits",
      tiktokScript: "Je lisse mes cheveux en 5 minutes avec cette brosse à 40€. Résultat salon, zéro frisottis. Avant/après en temps réel 💇‍♀️ #cheveux #beaute #haircare",
      tiktokHashtags: ["cheveux", "beaute", "haircare", "lisseur", "routine"],
      images: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
      ],
    },

    // CUISINE
    {
      name: "Blender portable USB rechargeable 600ml",
      slug: "blender-portable-usb-600ml",
      shortDescription: "Mixez vos smoothies en 30 secondes et emportez-les directement dans le bol. Rechargeable USB-C, moteur 300W, tout-terrain.",
      description: `Le blender qui remplace la bouteille de smoothie et le blender de cuisine.

Remplissez, mixez 30 secondes, vissez le bouchon et partez. Compatible avec les fruits surgelés et les glaçons.

**Caractéristiques :**
- Moteur 300W brushless
- Capacité 600ml
- Lames inox 6 pans ultra-tranchantes
- Batterie 2000mAh (10-15 mixages par charge)
- Rechargeable USB-C
- Compatible fruits surgelés et glaçons
- Lave-vaisselle (corps plastique sans moteur)
- BPA-free, certifié alimentaire

Auto-nettoyage : remplissez d'eau et mixez 20 secondes.`,
      price: 29.99,
      comparePrice: 54.99,
      cost: 7.5,
      stock: 176,
      trendScore: 80,
      featured: false,
      published: true,
      categoryId: cuisine!.id,
      tags: ["blender", "smoothie", "portable", "cuisine", "sport", "healthy"],
      benefits: [
        "Mixez partout — bureau, voiture, salle de sport",
        "300W — broie les fruits surgelés et glaçons",
        "USB-C — rechargeable comme votre téléphone",
        "10-15 smoothies par charge",
        "Auto-nettoyant en 20 secondes",
      ],
      salesArguments: [
        "Finissez avec les smoothies préparés la veille",
        "Viral TikTok — 20M de vues",
        "Compact pour bureau et sac de gym",
        "Satisfait ou remboursé 30 jours",
      ],
      marketingAngle: "Votre smoothie frais, partout, en 30 secondes",
      tiktokScript: "Je fais mon smoothie PENDANT le trajet en métro avec ce blender USB. En 30 secondes c'est prêt 🥤 Plus d'excuse pour manger sain ! #smoothie #sante",
      tiktokHashtags: ["smoothie", "sante", "blender", "fitness", "healthy"],
      images: [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
      ],
    },

    // TECH
    {
      name: "Batterie externe solaire 30000mAh étanche",
      slug: "batterie-externe-solaire-30000mah",
      shortDescription: "30000mAh avec 2 panneaux solaires, 4 ports de charge (USB-C 20W), LED lampe intégrée. Idéale camping et voyages.",
      description: `La batterie externe ultime pour les aventuriers et les voyageurs.

30000mAh suffit pour recharger un iPhone 12x ou un Galaxy S 10x. Les 2 panneaux solaires assurent une recharge d'urgence en extérieur.

**Caractéristiques :**
- Capacité : 30000mAh réelle
- 2 panneaux solaires (recharge d'urgence)
- Port USB-C 20W (charge rapide)
- 3 ports USB-A
- Lampe LED intégrée (3 modes : blanc, rouge, SOS)
- Étanche IP67
- Résistant aux chocs (coque ABS renforcée)
- Chargeur sans fil Qi intégré (10W)

Compatible avec laptops 20V via adaptateur inclus.`,
      price: 59.99,
      comparePrice: 99.99,
      cost: 19.0,
      stock: 52,
      trendScore: 77,
      featured: false,
      published: true,
      categoryId: tech!.id,
      tags: ["batterie", "solaire", "camping", "voyage", "externe", "étanche"],
      benefits: [
        "12 charges iPhone depuis une pleine batterie",
        "Panneaux solaires pour les situations d'urgence",
        "IP67 — résiste à l'eau et aux chocs",
        "Lampe SOS intégrée",
        "Charge 4 appareils simultanément",
      ],
      salesArguments: [
        "Indispensable camping, festival et voyages",
        "Autonomie 3 jours sans accès au courant",
        "Certifiée transport aérien (sous 32000mAh déclarés)",
        "Livraison en 48h",
      ],
      marketingAngle: "L'autonomie totale où que vous soyez",
      tiktokScript: "3 jours de camping, aucune prise de courant. Cette batterie solaire m'a gardé connecté tout le weekend 🏕️⚡ Voilà comment je l'ai utilisée #camping #outdoor",
      tiktokHashtags: ["camping", "outdoor", "voyage", "tech", "survie"],
      images: [
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80",
      ],
    },

    // MAISON
    {
      name: "Organiseur de câbles magnétique — pack de 10",
      slug: "organiseur-cables-magnetique-10",
      shortDescription: "Clips magnétiques repositionnables pour ranger tous vos câbles. Aucune vis, aucun outil. Adhésif 3M. Fonctionne sur bois, métal et plastique.",
      description: `Finissez avec le chaos de câbles. Ce pack de 10 organiseurs magnétiques transforme votre bureau en quelques minutes.

Chaque clip contient un aimant puissant et une languette pour maintenir jusqu'à 3 câbles simultanément. L'adhésif 3M tient sur toutes les surfaces sans laisser de trace au retrait.

**Applications :**
- Bureau : câbles USB, chargeurs, casque
- Chambre : câble de charge en bord de table de nuit
- Salon : câbles TV et consoles
- Cuisine : câble robot ménager

**Pack de 10 clips** en 3 tailles (S/M/L) pour câbles de 3mm à 12mm de diamètre.`,
      price: 16.99,
      comparePrice: 29.99,
      cost: 3.5,
      stock: 432,
      trendScore: 70,
      featured: false,
      published: true,
      categoryId: maison!.id,
      tags: ["câble", "bureau", "organisation", "rangement", "setup"],
      benefits: [
        "Bureau propre en 10 minutes",
        "Adhésif 3M — sans perçage, sans trace",
        "10 clips pour toute la maison",
        "Repositionnable à l'infini",
        "Fonctionne sur toutes les surfaces",
      ],
      salesArguments: [
        "Le produit le plus vendu de notre gamme bureau",
        "Idéal cadeau — chacun en a besoin",
        "10 clips pour moins de 17€",
        "Aucune compétence requise — posez et c'est tout",
      ],
      marketingAngle: "Un bureau propre en 10 minutes chrono",
      tiktokScript: "J'ai transformé mon bureau en 10 minutes avec ces clips magnétiques. Avant c'était l'horreur. Après... tu vas comprendre 😍 #setup #bureau #organisation",
      tiktokHashtags: ["setup", "bureau", "organisation", "diy", "cable"],
      images: [
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
      ],
    },

    // ENFANT
    {
      name: "Pistolet à bulles électrique automatique 3000 bulles/min",
      slug: "pistolet-bulles-electrique-3000",
      shortDescription: "3000 bulles par minute, chargement USB, réservoir 200ml, 4 baguettes intégrées. Pour enfants de 3 à 99 ans !",
      description: `Le jouet qui rend tout le monde heureux — enfants et adultes !

Ce pistolet à bulles électrique génère jusqu'à 3000 bulles par minute grâce à son moteur électrique et ses 4 baguettes en rotation simultanée.

**Caractéristiques :**
- 3000 bulles/minute (mode turbo)
- 4 baguettes en rotation automatique
- Réservoir 200ml (1h de jeu en continu)
- Rechargeable USB-C (autonomie 2h)
- Mode normal et mode turbo
- Liquide à bulles inclus (100ml)
- Pour intérieur et extérieur

Produit certifié CE, liquide à bulles non toxique et sans allergènes.`,
      price: 18.99,
      comparePrice: 34.99,
      cost: 4.5,
      stock: 264,
      trendScore: 74,
      featured: false,
      published: true,
      categoryId: enfant!.id,
      tags: ["enfant", "jouet", "bulles", "été", "extérieur", "famille"],
      benefits: [
        "3000 bulles/min — show garanti pour les enfants",
        "Rechargeable USB — plus de piles",
        "1h d'autonomie en continu",
        "Liquide non toxique inclus",
        "Fonctionne intérieur et extérieur",
      ],
      salesArguments: [
        "Idée cadeau parfaite anniversaire 3-10 ans",
        "Activité parfaite pour les beaux jours",
        "Certifié CE — sécurisé pour les enfants",
        "Moins de 20€ — accessible à tous les budgets",
      ],
      marketingAngle: "Des souvenirs d'enfance pour moins de 20€",
      tiktokScript: "Ce pistolet à bulles à 19€ a rendu mon enfant de 5 ans FOU de joie pendant 2h. Le meilleur investissement de l'été 🫧😂 #enfant #ete #jouet",
      tiktokHashtags: ["enfant", "jouet", "ete", "famille", "bulles"],
      images: [
        "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=600&q=80",
      ],
    },

    // BEAUTE
    {
      name: "Sérum vitamine C 20% + acide hyaluronique 60ml",
      slug: "serum-vitamine-c-20-acide-hyaluronique",
      shortDescription: "20% vitamine C pure + acide hyaluronique 2% + vitamine E. Éclat, anti-taches, anti-rides. Résultats en 3 semaines.",
      description: `La formule référence des dermatologues pour l'éclat et l'anti-âge. Notre sérum combine la concentration efficace de vitamine C (20%) avec l'hydratation intensive de l'acide hyaluronique.

**Actifs clés :**
- Vitamine C 20% (L-Ascorbic Acid) — antioxydant puissant, éclat et anti-taches
- Acide hyaluronique 2% (poids moléculaire mixte) — hydratation profonde et superficielle
- Vitamine E 1% — potentialise la vitamine C
- Niacinamide 5% — pores et texture

**Pour qui ?**
Peaux ternes, avec taches, rides naissantes ou manque d'éclat. Tous types de peau sauf peaux très sensibles (tester au poignet 48h).

Application : matin (avant SPF) ou soir. 3 à 4 gouttes sur visage propre.`,
      price: 27.99,
      comparePrice: 54.99,
      cost: 5.5,
      stock: 89,
      trendScore: 86,
      featured: true,
      published: true,
      categoryId: beaute!.id,
      tags: ["sérum", "vitamine C", "hyaluronique", "soin", "beauté", "anti-âge"],
      benefits: [
        "20% vitamine C — concentration maximale efficace",
        "Anti-taches visibles en 3 semaines",
        "Double hyaluronique — hydratation 72h",
        "Formule stable — en flacon opaque",
        "Sans parfum, sans alcool, sans parabène",
      ],
      salesArguments: [
        "Formule identique aux sérums à 120€",
        "Plébiscité par 3 dermatologues partenaires",
        "Over 4000 avis 5 étoiles",
        "Livraison protégée à température ambiante",
      ],
      marketingAngle: "L'éclat en bouteille — sans ordonnance",
      tiktokScript: "J'ai remplacé mon sérum Skinceuticals à 170€ par celui-ci à 28€. Test en conditions réelles pendant 3 semaines. Résultat côte à côte 🔬✨ #skincare #vitaminec",
      tiktokHashtags: ["skincare", "vitaminec", "serum", "beaute", "glow"],
      images: [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
      ],
    },
  ];

  let created = 0;
  let skipped = 0;

  for (const productData of products) {
    const { images, categoryId, ...data } = productData;

    const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
    if (existing) {
      console.log(`⏭️  Déjà existant : ${data.name}`);
      skipped++;
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
    created++;
  }

  console.log(`\n🎉 Terminé ! ${created} créés, ${skipped} ignorés.`);
}

main()
  .catch((e) => { console.error("❌ Erreur:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
