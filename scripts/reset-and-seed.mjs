import { PrismaClient } from '@prisma/client';

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

  // ─── TECH GADGETS ────────────────────────────────────────────────────────────
  {
    slug: "anker-soundcore-p40i",
    name: "Anker Soundcore P40i — Écouteurs Sans Fil ANC",
    categorySlug: "tech-gadgets",
    price: 49.99, comparePrice: 69.99,
    affiliateUrl: amz("B0C7MFKW54"),
    images: [
      "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71p7AvUxKAL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61bfMl9FDqL._AC_SL1500_.jpg",
    ],
    shortDescription: "Écouteurs true wireless ANC — 60h d'autonomie, Hi-Res Audio, Bluetooth 5.3. Le meilleur rapport qualité/prix ANC du marché.",
    description: `<h2>Anker Soundcore P40i — Fiche technique complète</h2>

<p>Les <strong>Soundcore P40i</strong> sont des écouteurs <strong>true wireless</strong> (aucun câble entre les deux écouteurs) avec réduction de bruit active adaptative. Ils ne sont pas filaires — chaque écouteur est indépendant et se connecte directement à votre téléphone en Bluetooth.</p>

<h3>Connexion & Compatibilité</h3>
<ul>
  <li><strong>Bluetooth 5.3</strong> — connexion stable, faible latence</li>
  <li>Compatible <strong>iPhone, Android, iPad, Mac, PC</strong> — tout appareil Bluetooth</li>
  <li>Connexion simultanée à <strong>2 appareils</strong> (multipoint)</li>
  <li>Portée : jusqu'à <strong>10 mètres</strong></li>
</ul>

<h3>Qualité sonore</h3>
<ul>
  <li>Drivers <strong>11mm</strong> haute performance</li>
  <li>Certification <strong>Hi-Res Audio Wireless</strong> (LDAC) — qualité studio sans fil</li>
  <li>Pas de Dolby Atmos natif, mais le codec LDAC dépasse le Dolby en qualité brute</li>
  <li>Égaliseur personnalisable via l'app <strong>Soundcore</strong> (iOS & Android)</li>
  <li>Mode <strong>Gaming</strong> basse latence inclus</li>
</ul>

<h3>Réduction de bruit (ANC)</h3>
<ul>
  <li><strong>3 modes ANC</strong> : Transport (métro/avion), Bureau (open space), Extérieur (rue)</li>
  <li>Mode <strong>Transparence</strong> : entendre l'environnement sans retirer les écouteurs</li>
  <li>Réduction jusqu'à <strong>-50dB</strong></li>
</ul>

<h3>Autonomie</h3>
<ul>
  <li><strong>10h</strong> par écouteur avec ANC activé</li>
  <li><strong>50h</strong> supplémentaires via le boîtier de charge</li>
  <li><strong>60h totales</strong> — le double de la majorité des concurrents</li>
  <li>Charge rapide : <strong>10 min = 4h d'écoute</strong></li>
  <li>Boîtier rechargeable en <strong>USB-C</strong> (câble inclus) — pas de Lightning</li>
  <li>Charge sans fil <strong>Qi</strong> supportée</li>
</ul>

<h3>Design & Confort</h3>
<ul>
  <li>Format <strong>intra-auriculaire</strong> avec embouts en silicone (S/M/L inclus)</li>
  <li>Résistance à l'eau et la sueur : <strong>IPX5</strong> (sport, pluie légère ✓)</li>
  <li>Poids : <strong>5.3g par écouteur</strong></li>
  <li>Couleurs disponibles : <strong>Noir, Blanc, Bleu nuit, Rose</strong></li>
  <li>Commandes tactiles sur chaque écouteur (volume, piste, ANC, appels)</li>
</ul>

<h3>Contenu de la boîte</h3>
<ul>
  <li>2 écouteurs Soundcore P40i</li>
  <li>Boîtier de charge</li>
  <li>Câble USB-C</li>
  <li>3 paires d'embouts silicone (S/M/L)</li>
  <li>Guide de démarrage rapide</li>
</ul>`,
  },

  {
    slug: "anker-maggo-733",
    name: "Anker 733 MagGo — Chargeur 3-en-1 MagSafe 65W",
    categorySlug: "tech-gadgets",
    price: 79.99, comparePrice: 99.99,
    affiliateUrl: amz("B09BVYD5JN"),
    images: [
      "https://m.media-amazon.com/images/I/61r0QSJ7E-L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61SAdqAGmVL._AC_SL1500_.jpg",
    ],
    shortDescription: "Chargez iPhone (MagSafe 15W), Apple Watch et AirPods en même temps. Chargeur mural GaN 65W intégré — un seul appareil sur votre bureau.",
    description: `<h2>Anker 733 MagGo — Fiche technique complète</h2>

<p>Le <strong>733 MagGo</strong> est un chargeur <strong>3-en-1</strong> conçu exclusivement pour l'écosystème Apple. Il charge simultanément votre iPhone, votre Apple Watch et vos AirPods — avec le chargeur mural GaN 65W <strong>intégré directement dans le socle</strong>.</p>

<h3>Compatibilité</h3>
<ul>
  <li><strong>iPhone 12, 13, 14, 15, 16</strong> et versions Pro/Max/Mini via MagSafe</li>
  <li><strong>Apple Watch</strong> Series 4 à 9, Ultra, SE (toutes générations)</li>
  <li><strong>AirPods</strong> 2e gen et +, AirPods Pro (avec boîtier de charge sans fil)</li>
  <li>Non compatible Android (MagSafe = exclusivité Apple)</li>
</ul>

<h3>Puissance de charge</h3>
<ul>
  <li>iPhone via MagSafe : <strong>15W</strong> (charge rapide max certifiée Apple)</li>
  <li>Apple Watch : <strong>5W</strong></li>
  <li>AirPods : <strong>5W</strong></li>
  <li>Port USB-C mural intégré : <strong>65W</strong> pour charger un MacBook ou un appareil supplémentaire</li>
</ul>

<h3>Design</h3>
<ul>
  <li>Format <strong>station de bureau</strong> — se pose debout ou à plat</li>
  <li>Bras Apple Watch articulé, réglable en angle</li>
  <li>Matière : plastique premium mat</li>
  <li>Couleurs : <strong>Noir, Blanc</strong></li>
  <li>Câble intégré : <strong>1.5m USB-C</strong></li>
  <li>Dimensions : 10 x 7.5 x 7 cm</li>
</ul>

<h3>Ce qui est dans la boîte</h3>
<ul>
  <li>Station de charge Anker 733 MagGo</li>
  <li>Câble USB-C 1.5m</li>
  <li>Guide utilisateur</li>
  <li><strong>Adaptateur secteur non inclus</strong> — branchez le câble USB-C sur votre adaptateur 65W+</li>
</ul>`,
  },

  {
    slug: "baseus-powerbank-65w",
    name: "Baseus Power Bank 20000mAh 65W USB-C",
    categorySlug: "tech-gadgets",
    price: 44.99, comparePrice: 59.99,
    affiliateUrl: amz("B09N3ZXS25"),
    images: [
      "https://m.media-amazon.com/images/I/61p2ZdJGPLL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71Cx1BmbFyL._AC_SL1500_.jpg",
    ],
    shortDescription: "Batterie externe 20000mAh — charge un MacBook, 2 téléphones simultanément. 65W USB-C, écran LED précis. La plus polyvalente du marché.",
    description: `<h2>Baseus Power Bank 20000mAh 65W — Fiche technique complète</h2>

<p>La batterie externe <strong>Baseus 20000mAh 65W</strong> est la seule batterie portable capable de charger un <strong>MacBook, un PC portable et deux téléphones en même temps</strong>. Le port USB-C délivre jusqu'à 65W — suffisant pour la majorité des laptops modernes.</p>

<h3>Capacité & Autonomie</h3>
<ul>
  <li><strong>20 000 mAh</strong> — équivalent à 4-5 charges complètes d'un iPhone 15</li>
  <li>Environ <strong>3 charges</strong> d'un MacBook Air M2</li>
  <li>Environ <strong>2 charges</strong> d'un Samsung Galaxy S24</li>
</ul>

<h3>Ports & Puissance</h3>
<ul>
  <li><strong>USB-C (entrée/sortie) : 65W</strong> — charge rapide PD (Power Delivery) pour laptops, iPad Pro, téléphones</li>
  <li><strong>USB-A #1 : 22.5W</strong> — charge rapide Huawei SuperCharge / compatible Quick Charge</li>
  <li><strong>USB-A #2 : 22.5W</strong></li>
  <li>Charge simultanée <strong>3 appareils</strong> (USB-C + 2x USB-A)</li>
  <li>Attention : avec 3 appareils branchés, la puissance USB-C est réduite à 45W</li>
</ul>

<h3>Recharge de la batterie</h3>
<ul>
  <li>Via USB-C 65W : recharge complète en <strong>~2h30</strong></li>
  <li>Via USB-C 45W : environ 3h30</li>
</ul>

<h3>Design</h3>
<ul>
  <li>Écran LED affichant le <strong>pourcentage exact</strong> restant (pas juste des barres)</li>
  <li>Dimensions : <strong>16.5 x 7.5 x 2.5 cm</strong></li>
  <li>Poids : <strong>430g</strong></li>
  <li>Couleurs : <strong>Noir, Blanc</strong></li>
  <li>Matière : polycarbonate mat anti-traces</li>
</ul>

<h3>Compatibilité</h3>
<ul>
  <li>MacBook Air/Pro (M1/M2/M3), iPad Pro</li>
  <li>iPhone 15/16 (USB-C), iPhone 12-14 (avec adaptateur Lightning/USB-C)</li>
  <li>Samsung, Google Pixel, tout téléphone USB-C</li>
  <li>Nintendo Switch, appareils photo, casques VR</li>
</ul>

<h3>Dans la boîte</h3>
<ul>
  <li>Batterie Baseus 20000mAh</li>
  <li>Câble USB-C vers USB-C 60W</li>
  <li>Pochette de transport</li>
</ul>`,
  },

  {
    slug: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S — Souris Sans Fil Silencieuse",
    categorySlug: "tech-gadgets",
    price: 99.99, comparePrice: 119.99,
    affiliateUrl: amz("B09HM94VDS"),
    images: [
      "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71iS6s0dBkL._AC_SL1500_.jpg",
    ],
    shortDescription: "La souris sans fil de référence mondiale. 8000 DPI, molette MagSpeed, clics 90% silencieux, 70 jours d'autonomie. Standard des créatifs et développeurs.",
    description: `<h2>Logitech MX Master 3S — Fiche technique complète</h2>

<p>La <strong>MX Master 3S</strong> est unanimement reconnue comme la meilleure souris sans fil du monde pour un usage professionnel. Elle est utilisée quotidiennement par des millions de développeurs, designers, vidéastes et créatifs. La version "S" ajoute des clics <strong>90% plus silencieux</strong> et un capteur amélioré à 8000 DPI.</p>

<h3>Capteur & Précision</h3>
<ul>
  <li>Capteur optique <strong>8000 DPI</strong> — ultra-précis sur n'importe quelle surface</li>
  <li>Fonctionne sur <strong>toutes les surfaces</strong> y compris le verre</li>
  <li>Ajustement DPI de 200 à 8000 en temps réel</li>
</ul>

<h3>Molette MagSpeed</h3>
<ul>
  <li>Molette <strong>électromagnétique</strong> — bascule automatiquement entre défilement clic par clic et défilement ultra-rapide (1000 lignes/seconde)</li>
  <li>Défilement horizontal via molette de pouce</li>
  <li>C'est la fonctionnalité que les utilisateurs mentionnent le plus — elle change radicalement la navigation dans les longs documents</li>
</ul>

<h3>Connexion</h3>
<ul>
  <li><strong>Bluetooth</strong> ou récepteur <strong>USB Logi Bolt</strong> (inclus)</li>
  <li>Connexion <strong>Easy-Switch</strong> : bascule instantanément entre <strong>3 appareils</strong> (Mac, PC, iPad par exemple) avec un bouton sous la souris</li>
  <li>Portée : <strong>10 mètres</strong></li>
</ul>

<h3>Compatibilité</h3>
<ul>
  <li><strong>macOS 10.15+</strong> et <strong>Windows 10/11</strong></li>
  <li>Compatible <strong>iPad OS</strong> via Bluetooth</li>
  <li>Logiciel <strong>Logi Options+</strong> pour personnaliser chaque bouton et créer des gestes</li>
</ul>

<h3>Ergonomie</h3>
<ul>
  <li>Format <strong>main droite uniquement</strong> (pas de version gaucher)</li>
  <li>Conçue pour les grandes et moyennes mains</li>
  <li>Repose-pouce naturel, appui-poignet intégré</li>
  <li>7 boutons programmables</li>
</ul>

<h3>Autonomie</h3>
<ul>
  <li><strong>70 jours</strong> sur une seule charge</li>
  <li>Recharge via <strong>USB-C</strong></li>
  <li>Charge rapide : <strong>1 minute = 3 heures d'utilisation</strong></li>
</ul>

<h3>Couleurs disponibles</h3>
<ul>
  <li><strong>Noir graphite, Blanc pâle (off-white), Rose</strong></li>
</ul>`,
  },

  {
    slug: "tapo-c200",
    name: "TP-Link Tapo C200 — Caméra IP WiFi 360° 1080P",
    categorySlug: "tech-gadgets",
    price: 29.99, comparePrice: 39.99,
    affiliateUrl: amz("B082Z11BFV"),
    images: [
      "https://m.media-amazon.com/images/I/61vAtZMpNkL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71yD3e5g+SL._AC_SL1500_.jpg",
    ],
    shortDescription: "Caméra intérieure #1 vente en France. Full HD 1080P, rotation 360°, vision nocturne 9m, détection mouvement, alertes smartphone. Sans abonnement.",
    description: `<h2>TP-Link Tapo C200 — Fiche technique complète</h2>

<p>La <strong>Tapo C200</strong> est la caméra de surveillance intérieure la plus vendue en France. Sa force : une installation en 5 minutes, aucun abonnement requis, et une couverture totale de votre pièce grâce à la rotation 360°.</p>

<h3>Image & Résolution</h3>
<ul>
  <li>Résolution <strong>Full HD 1080P</strong> (1920 x 1080)</li>
  <li>Angle de vue : <strong>360° horizontal, 114° vertical</strong></li>
  <li>Rotation motorisée Pan/Tilt contrôlable depuis l'app</li>
  <li>Vision nocturne infrarouge jusqu'à <strong>9 mètres</strong> en noir et blanc</li>
</ul>

<h3>Détection & Alertes</h3>
<ul>
  <li><strong>Détection de mouvement</strong> avec zones personnalisables</li>
  <li><strong>Détection de personnes</strong> (IA — distingue les humains des animaux)</li>
  <li>Alertes push instantanées sur smartphone</li>
  <li>Sirène intégrée activable à distance</li>
</ul>

<h3>Stockage</h3>
<ul>
  <li>Carte microSD jusqu'à <strong>256Go</strong> (non incluse) — enregistrement local en continu ou sur détection</li>
  <li>Compatible <strong>Tapo Care</strong> (cloud optionnel, payant) pour historique 30 jours</li>
  <li><strong>Aucun abonnement obligatoire</strong> — la carte SD suffit</li>
</ul>

<h3>Connectivité</h3>
<ul>
  <li><strong>WiFi 2.4 GHz</strong> uniquement (pas 5GHz)</li>
  <li>Compatible <strong>Alexa</strong> et <strong>Google Home</strong> (affichage sur Echo Show, Google Nest Hub)</li>
  <li>Compatible <strong>Apple HomeKit</strong> via firmware bêta</li>
</ul>

<h3>Installation</h3>
<ul>
  <li>Pose sur table ou fixation murale (vis incluses)</li>
  <li>Alimentation <strong>micro-USB</strong> (câble et adaptateur inclus)</li>
  <li>App <strong>Tapo</strong> disponible iOS et Android</li>
</ul>

<h3>Dans la boîte</h3>
<ul>
  <li>Caméra Tapo C200</li>
  <li>Adaptateur secteur + câble Micro-USB 2m</li>
  <li>Kit fixation murale (chevilles, vis)</li>
  <li>Guide de démarrage rapide</li>
</ul>

<h3>Ce qu'elle ne fait pas</h3>
<ul>
  <li>Pas d'usage extérieur (non résistante à l'eau)</li>
  <li>Pas de WiFi 5GHz</li>
  <li>Pas de vision nocturne couleur (noir et blanc uniquement)</li>
</ul>`,
  },

  {
    slug: "echo-dot-5",
    name: "Amazon Echo Dot 5 — Enceinte Connectée Alexa",
    categorySlug: "tech-gadgets",
    price: 54.99, comparePrice: 64.99,
    affiliateUrl: amz("B09B8YWXDF"),
    images: [
      "https://m.media-amazon.com/images/I/71JB6hM6Z6L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61GfKfA9uDL._AC_SL1500_.jpg",
    ],
    shortDescription: "5ème génération Echo Dot. Son amélioré avec graves renforcés, capteur de température intégré, Alexa pour contrôler toute votre maison connectée.",
    description: `<h2>Amazon Echo Dot 5ème génération — Fiche technique complète</h2>

<p>L'<strong>Echo Dot 5</strong> est la 5ème génération du best-seller d'Amazon. Par rapport à la génération 4, le son est significativement amélioré (graves plus profonds, puissance +50%) et un <strong>capteur de température</strong> est intégré — une fonctionnalité unique à ce prix.</p>

<h3>Son</h3>
<ul>
  <li>Haut-parleur <strong>1.73 pouce</strong> avec traitement numérique du signal</li>
  <li>Graves renforcés par rapport à l'Echo Dot 4</li>
  <li>Son omnidirectionnel — remplit une pièce de taille moyenne</li>
  <li>Compatible <strong>Dolby</strong> pour la lecture de musique</li>
  <li>Peut être couplée en stéréo avec un autre Echo Dot 5</li>
</ul>

<h3>Capteur de température</h3>
<ul>
  <li>Mesure la <strong>température ambiante</strong> de la pièce</li>
  <li>Peut déclencher des routines automatiquement ("si température > 25°C, allume le ventilateur connecté")</li>
</ul>

<h3>Alexa — Ce que vous pouvez faire</h3>
<ul>
  <li>Contrôle vocal de <strong>toute la maison connectée</strong> (Philips Hue, Kasa, Meross, etc.)</li>
  <li>Lecture <strong>Spotify, Deezer, Apple Music, Amazon Music</strong></li>
  <li>Appels et messages vers d'autres appareils Echo ou contacts</li>
  <li>Minuteries, alarmes, rappels, listes de courses</li>
  <li>Réponses aux questions, météo, actualités</li>
  <li>Plus de <strong>100 000 skills Alexa</strong> disponibles</li>
</ul>

<h3>Design</h3>
<ul>
  <li>Format sphérique — <strong>diamètre 10 cm</strong></li>
  <li>Tissu acoustique recyclé</li>
  <li>Couleurs : <strong>Anthracite, Blanc glacier, Bleu glacier</strong></li>
  <li>LED annulaire en haut indiquant l'état (écoute, muet, etc.)</li>
  <li>Bouton de sourdine micro physique (important pour la confidentialité)</li>
</ul>

<h3>Connectivité</h3>
<ul>
  <li><strong>WiFi 802.11 a/b/g/n/ac (2.4 & 5 GHz)</strong></li>
  <li><strong>Bluetooth 5.0</strong> — peut servir d'enceinte Bluetooth pour votre téléphone</li>
  <li>Pas de port jack 3.5mm (contrairement aux générations précédentes)</li>
</ul>

<h3>Dans la boîte</h3>
<ul>
  <li>Echo Dot 5ème génération</li>
  <li>Adaptateur secteur 15W</li>
  <li>Guide de démarrage rapide</li>
</ul>`,
  },

  // ─── MAISON INTELLIGENTE ─────────────────────────────────────────────────────
  {
    slug: "philips-hue-white-3pack",
    name: "Philips Hue White — Pack 3 Ampoules E27 Connectées",
    categorySlug: "maison-intelligente",
    price: 44.99, comparePrice: 59.99,
    affiliateUrl: amz("B07PNBQYTS"),
    images: ["https://m.media-amazon.com/images/I/61o2D6NovHL._AC_SL1500_.jpg"],
    shortDescription: "3 ampoules E27 connectées Philips Hue. Contrôle vocal Alexa/Google, gradation 1-100%, programmation horaire, durée de vie 25 000h. Aucun hub requis.",
    description: `<h2>Philips Hue White E27 — Pack 3 — Fiche technique</h2>
<p>Le pack de 3 ampoules <strong>Philips Hue White</strong> est la référence absolue pour débuter dans l'éclairage connecté. Lumière blanche chaude uniquement (pas de couleurs RGB — pour les couleurs, il faut le pack <em>Hue White & Color Ambiance</em>).</p>
<h3>Caractéristiques techniques</h3>
<ul>
  <li>Culot : <strong>E27</strong> (culot vissant standard — compatible 99% des lampes françaises)</li>
  <li>Puissance : <strong>9W</strong> — équivalent <strong>60W</strong> en ampoule classique</li>
  <li>Flux lumineux : <strong>800 lumens</strong></li>
  <li>Température de couleur : <strong>2700K</strong> (blanc chaud — ambiance cosy)</li>
  <li>Gradation : <strong>1% à 100%</strong></li>
  <li>Durée de vie : <strong>25 000 heures</strong> (15+ ans à 4h/jour)</li>
</ul>
<h3>Connexion</h3>
<ul>
  <li>Protocole <strong>Zigbee</strong> — fonctionne seule via WiFi ou avec le Hue Bridge</li>
  <li><strong>Sans bridge</strong> : contrôle Bluetooth jusqu'à 10 ampoules, portée 10m</li>
  <li><strong>Avec Hue Bridge</strong> (vendu séparément) : contrôle illimité, automatisations avancées, accès hors domicile</li>
  <li>Compatible <strong>Alexa, Google Home, Apple HomeKit, Samsung SmartThings</strong></li>
</ul>
<h3>Ce que vous pouvez faire</h3>
<ul>
  <li>Allumer/éteindre/graduer par commande vocale</li>
  <li>Programmer des horaires (lever du soleil simulé, extinction automatique)</li>
  <li>Créer des scènes d'ambiance (lecture, cinéma, dîner)</li>
  <li>Synchroniser avec votre TV ou musique (avec Hue Sync Box)</li>
</ul>`,
  },

  {
    slug: "kasa-hs100",
    name: "Kasa Smart HS100 — Prise Connectée WiFi",
    categorySlug: "maison-intelligente",
    price: 15.99, comparePrice: 22.99,
    affiliateUrl: amz("B0152WLWSA"),
    images: ["https://m.media-amazon.com/images/I/61yTWdj3hwL._AC_SL1500_.jpg"],
    shortDescription: "Transformez n'importe quel appareil en appareil connecté. Contrôle à distance, programmation horaire, compatible Alexa & Google. Installation 2 minutes, sans hub.",
    description: `<h2>Kasa Smart HS100 — Fiche technique</h2>
<p>La prise <strong>Kasa HS100</strong> de TP-Link transforme instantanément n'importe quelle prise électrique murale en prise intelligente. Branchez-y une lampe, un radiateur, un ventilateur ou une cafetière — et contrôlez-le depuis votre téléphone ou par la voix.</p>
<h3>Caractéristiques</h3>
<ul>
  <li>Tension : <strong>220-240V</strong> (norme française/européenne)</li>
  <li>Courant max : <strong>16A</strong> — compatible appareils jusqu'à 3680W</li>
  <li>Format : prise <strong>type E/F</strong> (standard France/Europe)</li>
  <li>WiFi <strong>2.4 GHz</strong> uniquement (pas 5GHz)</li>
  <li><strong>Aucun hub requis</strong> — se connecte directement à votre box internet</li>
</ul>
<h3>Fonctionnalités</h3>
<ul>
  <li>Contrôle à distance depuis n'importe où dans le monde via l'app <strong>Kasa</strong></li>
  <li>Programmation d'horaires et minuteries</li>
  <li>Mode <strong>Away</strong> : allume/éteint aléatoirement pour simuler une présence</li>
  <li>Compatible <strong>Alexa, Google Home</strong></li>
  <li><strong>Pas compatible Apple HomeKit</strong> nativement</li>
</ul>
<h3>Ce qu'elle ne fait pas</h3>
<ul>
  <li>Pas de mesure de consommation électrique (pour ça, prendre le modèle HS110)</li>
  <li>Pas de ports USB intégrés</li>
  <li>Une seule prise (pas de multiprise)</li>
</ul>`,
  },

  {
    slug: "meross-thermostat",
    name: "Meross Smart Thermostat — Thermostat Connecté WiFi",
    categorySlug: "maison-intelligente",
    price: 39.99, comparePrice: 54.99,
    affiliateUrl: amz("B09L6DSLGQ"),
    images: ["https://m.media-amazon.com/images/I/61mPuLlpaaL._AC_SL1500_.jpg"],
    shortDescription: "Contrôlez votre chauffage à distance. Compatible toutes chaudières. Économies jusqu'à 31% sur la facture. Installation sans électricien, Alexa & Google Home.",
    description: `<h2>Meross Smart Thermostat — Fiche technique</h2>
<p>Le thermostat <strong>Meross</strong> remplace votre thermostat filaire existant et vous permet de contrôler votre chauffage depuis votre smartphone, où que vous soyez.</p>
<h3>Compatibilité chaudière</h3>
<ul>
  <li><strong>Chaudières gaz, fioul, électriques</strong> à 2 fils (Fil Pilote non supporté)</li>
  <li>Tension de fonctionnement : <strong>110-240V</strong></li>
  <li>Remplace les thermostats filaires standard — <strong>vérifiez votre installation</strong> avant l'achat (photo de l'ancien thermostat recommandée)</li>
  <li>Non compatible avec les planchers chauffants hydrauliques complexes</li>
</ul>
<h3>Fonctionnalités</h3>
<ul>
  <li>Contrôle à distance via app <strong>Meross</strong> (iOS & Android)</li>
  <li>Programmation hebdomadaire (différentes températures selon les heures)</li>
  <li>Mode <strong>absence</strong> automatique (géolocalisation)</li>
  <li>Compatible <strong>Alexa, Google Home, Apple HomeKit, SmartThings</strong></li>
  <li>Écran tactile couleur</li>
</ul>
<h3>Installation</h3>
<ul>
  <li>Remplacement direct de votre ancien thermostat filaire</li>
  <li>Notice incluse avec schémas de câblage</li>
  <li>Temps d'installation estimé : <strong>20-30 minutes</strong> sans électricien</li>
</ul>`,
  },

  {
    slug: "govee-rgbic-10m",
    name: "Govee RGBIC — Ruban LED 10m WiFi Alexa",
    categorySlug: "maison-intelligente",
    price: 34.99, comparePrice: 44.99,
    affiliateUrl: amz("B094ZBFVD6"),
    images: ["https://m.media-amazon.com/images/I/81FDPvkxA5L._AC_SL1500_.jpg"],
    shortDescription: "Ruban LED RGBIC 10m — plusieurs couleurs simultanées grâce à la technologie IC individuelle. Sync musique temps réel, 64 effets, Alexa & Google. Découpable.",
    description: `<h2>Govee RGBIC LED 10m — Fiche technique</h2>
<p>La différence entre un ruban <strong>RGB classique</strong> et un ruban <strong>RGBIC</strong> : le RGBIC peut afficher <strong>plusieurs couleurs simultanément</strong> sur le même ruban grâce à des puces IC individuelles. Résultat : des effets dégradés, arc-en-ciel et dynamiques impossibles avec un ruban classique.</p>
<h3>Spécifications</h3>
<ul>
  <li>Longueur : <strong>10 mètres</strong></li>
  <li>Technologie : <strong>RGBIC</strong> (IC individuelle — multicolore simultané)</li>
  <li>Alimentation : adaptateur secteur inclus</li>
  <li>Adhésif 3M double face sur toute la longueur</li>
  <li><strong>Découpable</strong> aux marqueurs indiqués (toutes les 10 cm environ)</li>
  <li><strong>Non rallongeable</strong> une fois coupé</li>
  <li>Résistance à l'eau : <strong>IP65</strong> (résistant aux projections — peut être utilisé en extérieur abrité)</li>
</ul>
<h3>Effets & Contrôle</h3>
<ul>
  <li><strong>64 modes d'effets</strong> préprogrammés (arc-en-ciel, feu, vagues, etc.)</li>
  <li><strong>Synchronisation musicale</strong> via le microphone intégré du contrôleur</li>
  <li>Contrôle via app <strong>Govee Home</strong> (iOS & Android)</li>
  <li>Compatible <strong>Alexa et Google Home</strong> pour commandes vocales</li>
  <li>Télécommande infrarouge incluse</li>
</ul>`,
  },

  {
    slug: "eufy-robovac-x8",
    name: "Eufy RoboVac X8 — Robot Aspirateur 2000Pa WiFi",
    categorySlug: "maison-intelligente",
    price: 249.99, comparePrice: 299.99,
    affiliateUrl: amz("B09CCC9ZC8"),
    images: ["https://m.media-amazon.com/images/I/71JUkbqUvSL._AC_SL1500_.jpg"],
    shortDescription: "Robot aspirateur twin-turbine 2000Pa, cartographie laser LiDAR, ultra-silencieux 68dB. Compatible Alexa, Google. Remplace vraiment l'aspirateur classique.",
    description: `<h2>Eufy RoboVac X8 — Fiche technique</h2>
<p>Le <strong>RoboVac X8</strong> est le robot aspirateur d'Eufy (sous-marque d'Anker) qui marque un vrai saut qualitatif. Sa double turbine génère <strong>2000Pa d'aspiration</strong> — 2x plus que la majorité des robots d'entrée de gamme — et sa navigation laser LiDAR cartographie précisément votre domicile.</p>
<h3>Aspiration</h3>
<ul>
  <li><strong>2000Pa</strong> — aspiration twin-turbine (2 moteurs)</li>
  <li>Efficace sur <strong>parquet, carrelage, moquette courte</strong></li>
  <li>Brosse centrale + 2 brosses latérales</li>
  <li>Filtre HEPA — capture 99.97% des particules fines (bon pour les allergiques)</li>
</ul>
<h3>Navigation</h3>
<ul>
  <li>Capteur <strong>LiDAR</strong> (laser) sur le dessus — cartographie précise de votre logement</li>
  <li>Crée une carte que vous pouvez voir dans l'app</li>
  <li>Nettoyage par pièce — définissez des zones interdites, planifiez pièce par pièce</li>
  <li>Détection d'obstacles (meubles, câbles)</li>
  <li>Hauteur franchissable : <strong>1.5 cm</strong></li>
</ul>
<h3>Autonomie & Bruit</h3>
<ul>
  <li>Autonomie : <strong>100 minutes</strong> en mode standard</li>
  <li>Retour automatique à la base pour recharge, puis reprend le nettoyage</li>
  <li>Niveau sonore : <strong>68dB</strong> (comparatif : conversation normale = 60dB)</li>
</ul>`,
  },

  {
    slug: "sonos-era-100",
    name: "Sonos Era 100 — Enceinte WiFi Multiroom Stéréo",
    categorySlug: "maison-intelligente",
    price: 249.99, comparePrice: 279.99,
    affiliateUrl: amz("B0BW5PNSHV"),
    images: ["https://m.media-amazon.com/images/I/61dFTEFVFFL._AC_SL1500_.jpg"],
    shortDescription: "Enceinte connectée Sonos avec vrai son stéréo (2 tweeters inclinés). WiFi + Bluetooth simultané, AirPlay 2, Alexa intégré, multiroom Sonos. Son premium justifié.",
    description: `<h2>Sonos Era 100 — Fiche technique</h2>
<p>La <strong>Sonos Era 100</strong> remplace l'ancien Sonos One. La différence principale : c'est désormais une enceinte <strong>stéréo vraie</strong> avec deux tweeters orientés à 45° qui créent une image sonore large. Pour une enceinte de cette taille, c'est exceptionnel.</p>
<h3>Son</h3>
<ul>
  <li><strong>2 tweeters inclinés</strong> à 45° — son stéréo vrai, scène sonore large</li>
  <li><strong>1 woofer</strong> pour les graves</li>
  <li>Traitement audio Sonos <strong>Trueplay</strong> — calibration automatique selon la pièce via microphone</li>
  <li>Compatible <strong>Dolby Atmos</strong> (sur certains services)</li>
</ul>
<h3>Connectivité</h3>
<ul>
  <li><strong>WiFi 6</strong> (802.11ax — 2.4 & 5 GHz)</li>
  <li><strong>Bluetooth 5.0</strong> — première enceinte Sonos avec Bluetooth (pour lire depuis votre téléphone sans WiFi)</li>
  <li><strong>AirPlay 2</strong> — diffusion directe depuis iPhone/iPad/Mac</li>
  <li>Port <strong>USB-C Line-In</strong> pour brancher une source analogique (platine vinyle, TV…)</li>
</ul>
<h3>Multiroom Sonos</h3>
<ul>
  <li>Intégration native dans l'écosystème <strong>Sonos</strong> — synchronisez avec d'autres enceintes Sonos dans toute la maison</li>
  <li>Peut être couplée en paire stéréo avec une 2ème Era 100</li>
</ul>
<h3>Assistant vocal</h3>
<ul>
  <li><strong>Alexa intégré</strong></li>
  <li>Compatible <strong>Google Assistant</strong> (via l'app)</li>
<li>Pas d'Apple Siri natif (AirPlay 2 pour iOS)</li>
</ul>
<h3>Couleurs</h3>
<ul><li><strong>Noir, Blanc</strong></li></ul>`,
  },

  // ─── SPORT FITNESS ────────────────────────────────────────────────────────────
  {
    slug: "theragun-mini",
    name: "Theragun Mini — Pistolet de Massage Professionnel",
    categorySlug: "sport-fitness",
    price: 149.99, comparePrice: 179.99,
    affiliateUrl: amz("B0C4HPFDF2"),
    images: ["https://m.media-amazon.com/images/I/61lX9KDCS3L._AC_SL1500_.jpg"],
    shortDescription: "Le pistolet massage Theragun en format compact. Amplitude 12mm, 150min autonomie, 3 vitesses, 4 embouts. Utilisé par les athlètes professionnels, format poche.",
    description: `<h2>Theragun Mini — Fiche technique</h2>
<p>Le <strong>Theragun Mini</strong> est la version compacte du pistolet de massage de référence mondiale. Theragun est la marque utilisée par les équipes NBA, NFL et les athlètes olympiques. Le Mini conserve l'essentiel des fonctionnalités dans un format qui rentre dans une poche de veste.</p>
<h3>Percussions</h3>
<ul>
  <li>Amplitude : <strong>12mm</strong> (profondeur de pénétration musculaire)</li>
  <li>Fréquence : <strong>1750 à 2400 PPM</strong> (percussions par minute) selon la vitesse</li>
  <li><strong>3 vitesses</strong> : 1750 / 2100 / 2400 PPM</li>
  <li>Force : <strong>6.8kg</strong> de force de stalle (résistance sans reculer)</li>
</ul>
<h3>Autonomie & Charge</h3>
<ul>
  <li><strong>150 minutes</strong> d'autonomie totale</li>
  <li>Recharge via <strong>USB-C</strong></li>
  <li>Temps de charge : environ 1h30</li>
</ul>
<h3>Embouts inclus (4)</h3>
<ul>
  <li><strong>Boule standard</strong> — groupes musculaires larges (dos, cuisses, mollets)</li>
  <li><strong>Amortisseur</strong> — zones sensibles, utilisation sur os</li>
  <li><strong>Thumb</strong> — lombaires, cou, avant-bras</li>
  <li><strong>Cône</strong> — points de pression précis, pieds</li>
</ul>
<h3>Design</h3>
<ul>
  <li>Poids : <strong>272g</strong></li>
  <li>Niveau sonore : <strong>65dB</strong> (conversation normale)</li>
  <li>Couleurs : <strong>Noir, Blanc, Desert Rose (rose), Vert</strong></li>
  <li>Application <strong>Therabody</strong> avec routines guidées (facultative)</li>
</ul>`,
  },

  {
    slug: "garmin-forerunner-55",
    name: "Garmin Forerunner 55 — Montre GPS Running",
    categorySlug: "sport-fitness",
    price: 169.99, comparePrice: 199.99,
    affiliateUrl: amz("B092WQJLQQ"),
    images: ["https://m.media-amazon.com/images/I/61ZFBJE4LfL._AC_SL1500_.jpg"],
    shortDescription: "Montre GPS running Garmin. GPS précis, fréquence cardiaque au poignet, plans d'entraînement adaptatifs, 2 semaines d'autonomie. La référence running débutant-intermédiaire.",
    description: `<h2>Garmin Forerunner 55 — Fiche technique</h2>
<p>La <strong>Forerunner 55</strong> est la montre GPS running d'entrée de gamme Garmin. Elle intègre l'essentiel des fonctionnalités nécessaires pour progresser en running, sans les fonctions pro des modèles 255/955.</p>
<h3>GPS & Capteurs</h3>
<ul>
  <li>GPS intégré (<strong>GPS, GLONASS, GALILEO</strong>) — fonctionne sans téléphone</li>
  <li>Fréquence cardiaque <strong>optique au poignet</strong> (Elevate v4)</li>
  <li>Capteur de <strong>SpO2</strong> (saturation en oxygène)</li>
  <li>Accéléromètre, gyroscope, baromètre</li>
</ul>
<h3>Running & Sport</h3>
<ul>
  <li>Profils sport : <strong>Running, Tapis de course, Vélo, Natation, Cardio, Yoga</strong> et plus</li>
  <li>Métriques running : allure, distance, cadence, VO2 Max estimé</li>
  <li>Plans d'entraînement <strong>adaptatifs</strong> intégrés (objectif 5km, 10km, semi, marathon)</li>
  <li>Coaching quotidien : suggère l'entraînement du jour selon votre récupération</li>
</ul>
<h3>Santé & Quotidien</h3>
<ul>
  <li>Suivi du sommeil avancé</li>
  <li>Score de stress (variabilité cardiaque)</li>
  <li>Compteur de pas, calories, étages</li>
  <li>Notifications smartphone (appels, SMS, applis)</li>
</ul>
<h3>Autonomie</h3>
<ul>
  <li>Mode montre : <strong>2 semaines</strong></li>
  <li>Mode GPS : <strong>20 heures</strong></li>
  <li>Recharge via câble USB propriétaire Garmin (inclus)</li>
</ul>
<h3>Résistance & Taille</h3>
<ul>
  <li>Résistance à l'eau : <strong>5 ATM</strong> (50m — natation ✓)</li>
  <li>Taille du boîtier : <strong>42mm</strong></li>
  <li>Bracelet silicone interchangeable 20mm</li>
  <li>Couleurs : <strong>Blanc/Aqua, Noir, Lilas, Rouge</strong></li>
</ul>`,
  },

  {
    slug: "bowflex-selecttech-552",
    name: "Bowflex SelectTech 552 — Haltères Réglables 2-24kg",
    categorySlug: "sport-fitness",
    price: 329.99, comparePrice: 399.99,
    affiliateUrl: amz("B001ARYU58"),
    images: ["https://m.media-amazon.com/images/I/71RrIGiUMNL._AC_SL1500_.jpg"],
    shortDescription: "15 poids en 1 haltère compact. De 2 à 24kg par incréments de 2kg. Sélection en 3 secondes. Remplace 15 paires d'haltères — économisez 2000€ de matériel.",
    description: `<h2>Bowflex SelectTech 552 — Fiche technique</h2>
<p>Les <strong>SelectTech 552</strong> sont les haltères réglables de référence mondiale. En vendus par paire, ils remplacent <strong>15 paires d'haltères classiques</strong> (de 2 à 24kg) dans l'espace d'une seule paire.</p>
<h3>Poids disponibles</h3>
<ul>
  <li>De <strong>2 kg à 24 kg</strong></li>
  <li>Incréments de <strong>2 kg</strong> : 2 / 4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 20 / 22 / 24 kg</li>
  <li>Prix vendu à la paire (2 haltères)</li>
</ul>
<h3>Système de sélection</h3>
<ul>
  <li>Molette rotative à chaque extrémité</li>
  <li>Changement de poids en <strong>moins de 3 secondes</strong></li>
  <li>Les disques non sélectionnés restent dans le socle</li>
</ul>
<h3>Pour qui ?</h3>
<ul>
  <li>Débutants : commencez à 2kg pour les exercices d'isolation légère</li>
  <li>Intermédiaires : 12-18kg pour la majorité des exercices polyarticulaires</li>
  <li>Confirmés : 24kg suffisent pour la plupart des mouvements unilatéraux</li>
  <li>Si vous faites des développés couchés lourds (>50kg total), envisagez les SelectTech 1090 (jusqu'à 41kg)</li>
</ul>
<h3>Dimensions & Poids</h3>
<ul>
  <li>Dimensions d'un haltère : <strong>38 x 20 x 24 cm</strong></li>
  <li>Poids max par haltère : <strong>24 kg</strong></li>
  <li>Matière : plastique ABS + fonte</li>
  <li>Socles inclus pour poser les haltères</li>
</ul>
<h3>Garantie</h3>
<ul><li><strong>2 ans</strong> pièces et main d'œuvre</li></ul>`,
  },

  {
    slug: "fitbit-charge-6",
    name: "Fitbit Charge 6 — Bracelet Fitness GPS & ECG",
    categorySlug: "sport-fitness",
    price: 149.99, comparePrice: 179.99,
    affiliateUrl: amz("B0CDF7K9KS"),
    images: ["https://m.media-amazon.com/images/I/61s85RHwBBL._AC_SL1500_.jpg"],
    shortDescription: "Tracker fitness le plus complet sous 200€. GPS sans smartphone, ECG, SpO2, suivi sommeil, 7 jours autonomie. Intégration Google Maps, YouTube Music, Google Wallet.",
    description: `<h2>Fitbit Charge 6 — Fiche technique</h2>
<p>Le <strong>Charge 6</strong> est le meilleur tracker fitness en dessous de 200€. La nouveauté par rapport au Charge 5 : intégration native de <strong>Google Maps</strong> pour la navigation GPS, <strong>YouTube Music</strong> et <strong>Google Wallet</strong> pour le paiement sans contact.</p>
<h3>GPS</h3>
<ul>
  <li>GPS <strong>intégré</strong> — fonctionne sans téléphone</li>
  <li>Systèmes : GPS, GLONASS, BeiDou, Galileo</li>
  <li>Affichage de la carte en temps réel sur le bracelet via Google Maps</li>
</ul>
<h3>Santé & Cardiaque</h3>
<ul>
  <li><strong>ECG</strong> — détecte la fibrillation auriculaire (arythmie)</li>
  <li>Fréquence cardiaque en continu 24/7</li>
  <li><strong>SpO2</strong> — saturation en oxygène sanguin</li>
  <li>Score de <strong>gestion du stress</strong> (variabilité cardiaque)</li>
  <li>Score de préparation quotidien</li>
</ul>
<h3>Sommeil</h3>
<ul>
  <li>Suivi des phases de sommeil (léger, profond, paradoxal)</li>
  <li><strong>Score de sommeil</strong> sur 100 chaque matin</li>
  <li>Détection ronflement et perturbations (avec téléphone à proximité)</li>
</ul>
<h3>Sport</h3>
<ul>
  <li>40+ modes sport reconnus automatiquement</li>
  <li>Compatible <strong>Google Fit, Strava, Adidas Running</strong></li>
</ul>
<h3>Autonomie & Design</h3>
<ul>
  <li><strong>7 jours</strong> en utilisation normale (3-4 jours avec GPS intensif)</li>
  <li>Résistance eau : <strong>50 mètres</strong> (natation ✓)</li>
  <li>Bracelet silicone interchangeable</li>
  <li>Couleurs : <strong>Noir, Coral (rouge-orange), Porcelaine (blanc)</strong></li>
</ul>`,
  },

  {
    slug: "manduka-pro-yoga",
    name: "Manduka PRO — Tapis de Yoga Professionnel 6mm",
    categorySlug: "sport-fitness",
    price: 129.99, comparePrice: 149.99,
    affiliateUrl: amz("B001AT4JOG"),
    images: ["https://m.media-amazon.com/images/I/91LgQeASGJL._AC_SL1500_.jpg"],
    shortDescription: "Le tapis yoga de référence mondiale. Garantie à vie, 6mm amorti dense, surface Dry-Grip anti-dérapant même en sueur. Utilisé par les professeurs du monde entier.",
    description: `<h2>Manduka PRO — Fiche technique</h2>
<p>Le <strong>Manduka PRO</strong> est le tapis de yoga utilisé par les enseignants et pratiquants sérieux du monde entier. Sa réputation repose sur une qualité de construction exceptionnelle et une <strong>garantie à vie</strong> — c'est littéralement le dernier tapis que vous achèterez.</p>
<h3>Dimensions</h3>
<ul>
  <li>Longueur : <strong>180 cm</strong> (standard) ou 215 cm (version Long)</li>
  <li>Largeur : <strong>61 cm</strong></li>
  <li>Épaisseur : <strong>6 mm</strong></li>
  <li>Poids : <strong>3.2 kg</strong></li>
</ul>
<h3>Surface & Grip</h3>
<ul>
  <li>Surface texturée <strong>Dry-Grip</strong> — conçue pour les pratiques qui font transpirer</li>
  <li>Attention : le grip s'améliore avec le temps et les lavages — les 10 premières sessions peuvent sembler glissantes</li>
  <li>Conseil : frotter avec une serviette humide avant les premières utilisations</li>
</ul>
<h3>Matière</h3>
<ul>
  <li>PVC haute densité <strong>sans phtalates, PVC stabilisé sans Azo</strong></li>
  <li>Fabriqué sans émissions de gaz toxiques</li>
  <li>Face inférieure non-slip sur parquet et moquette</li>
</ul>
<h3>Couleurs disponibles</h3>
<ul>
  <li>Plus de <strong>20 coloris</strong> : Noir, Gris, Bleu ardoise, Rouge, Violet, Vert sauge, et plus</li>
</ul>
<h3>Garantie</h3>
<ul>
  <li><strong>Garantie à vie</strong> — Manduka remplace ou rembourse sans condition</li>
</ul>`,
  },

  {
    slug: "walkingpad-r2",
    name: "WalkingPad R2 — Tapis de Marche Pliable Sous Bureau",
    categorySlug: "sport-fitness",
    price: 379.99, comparePrice: 449.99,
    affiliateUrl: amz("B09R6FVK8S"),
    images: ["https://m.media-amazon.com/images/I/61CDXII6YML._AC_SL1500_.jpg"],
    shortDescription: "Marchez en travaillant. Pliable en 3s pour passer sous un bureau, 0.5-6km/h, ultra-silencieux 75dB. Télécommande incluse, app WalkingPad. 10 000 pas sans quitter votre bureau.",
    description: `<h2>WalkingPad R2 — Fiche technique</h2>
<p>Le <strong>WalkingPad R2</strong> est le tapis de marche conçu pour être utilisé <strong>sous un bureau debout</strong> pendant que vous travaillez. Il se plie en 3 secondes pour ranger contre un mur lorsqu'il n'est pas utilisé.</p>
<h3>Vitesse & Usage</h3>
<ul>
  <li>Vitesse : <strong>0.5 à 6 km/h</strong></li>
  <li>Idéal pour marcher en réunion Teams/Zoom (1.5-3 km/h)</li>
  <li>Peut aussi servir pour de la marche rapide ou du jogging léger (jusqu'à 6 km/h)</li>
</ul>
<h3>Bruit</h3>
<ul>
  <li>Niveau sonore : <strong>moins de 75 dB</strong></li>
  <li>Discret pour les appels — vos interlocuteurs n'entendent généralement pas</li>
</ul>
<h3>Dimensions</h3>
<ul>
  <li>Déployé : <strong>147 x 55 x 13 cm</strong></li>
  <li>Plié : <strong>82 x 55 x 13 cm</strong></li>
  <li>Poids : <strong>28 kg</strong></li>
  <li>Surface de marche : <strong>121 x 41 cm</strong></li>
  <li>Hauteur bureau recommandée : <strong>70 cm minimum</strong></li>
</ul>
<h3>Charge maximale</h3>
<ul><li><strong>100 kg</strong></li></ul>
<h3>Contrôle</h3>
<ul>
  <li>Télécommande sans fil incluse</li>
  <li>Boutons sur le tapis</li>
  <li>App <strong>KS Fit</strong> (iOS & Android) pour les statistiques</li>
  <li>Mode automatique : ajuste la vitesse selon votre pas</li>
</ul>`,
  },

  // ─── BUREAU PRODUCTIVITÉ ──────────────────────────────────────────────────────
  {
    slug: "lg-27un850-4k",
    name: "LG 27UN850 — Écran 4K 27\" USB-C 96W IPS",
    categorySlug: "bureau-productivite",
    price: 449.99, comparePrice: 549.99,
    affiliateUrl: amz("B08ZJCTWQJ"),
    images: ["https://m.media-amazon.com/images/I/816vRAtpLiL._AC_SL1500_.jpg"],
    shortDescription: "Écran 4K IPS 27\". USB-C 96W (charge un MacBook Pro). 99% sRGB, HDR400, hauteur réglable. Le monitor HomeOffice de référence — un câble pour tout.",
    description: `<h2>LG 27UN850 — Fiche technique</h2>
<p>Le <strong>LG 27UN850</strong> est le moniteur de référence pour le travail professionnel à domicile. Son argument principal : un seul câble USB-C connecte votre MacBook/PC portable <strong>ET</strong> l'alimente avec 96W simultanément. Fini le chargeur séparé.</p>
<h3>Affichage</h3>
<ul>
  <li>Taille : <strong>27 pouces</strong></li>
  <li>Résolution : <strong>4K UHD 3840 x 2160</strong></li>
  <li>Dalle : <strong>IPS</strong> — angles de vision 178°, couleurs fidèles</li>
  <li>Couverture colorimétrique : <strong>99% sRGB, 95% DCI-P3</strong></li>
  <li>Luminosité : <strong>400 nits</strong></li>
  <li>Certification <strong>HDR400</strong></li>
  <li>Taux de rafraîchissement : <strong>60Hz</strong></li>
</ul>
<h3>Connectique</h3>
<ul>
  <li><strong>USB-C Thunderbolt 3</strong> (entrée vidéo + charge <strong>96W</strong>) — compatible MacBook Air/Pro, iPad Pro, PC USB-C</li>
  <li>HDMI 2.0 x2</li>
  <li>DisplayPort 1.4</li>
  <li>USB-A x2 (hub USB intégré)</li>
  <li>Jack 3.5mm casque</li>
</ul>
<h3>Ergonomie</h3>
<ul>
  <li>Réglage en <strong>hauteur</strong> (130mm de débattement)</li>
  <li>Pivot portrait 90°</li>
  <li>Inclinaison -5° à +15°</li>
  <li>Rotation sur pied 355°</li>
  <li>Compatible VESA 100x100</li>
</ul>
<h3>Compatibilité MacBook</h3>
<ul>
  <li>MacBook Air M1/M2/M3 : <strong>1 écran 4K ✓</strong></li>
  <li>MacBook Pro M1/M2/M3 : <strong>1 écran 4K ✓</strong></li>
  <li>Charge via USB-C jusqu'à 96W (suffisant pour MacBook Air, légèrement limité pour MBP 16")</li>
</ul>`,
  },

  {
    slug: "keychron-k2-pro",
    name: "Keychron K2 Pro — Clavier Mécanique Sans Fil",
    categorySlug: "bureau-productivite",
    price: 99.99, comparePrice: 129.99,
    affiliateUrl: amz("B0BK5J9KTD"),
    images: ["https://m.media-amazon.com/images/I/71eaKASEvoL._AC_SL1500_.jpg"],
    shortDescription: "Clavier mécanique TKL (sans pavé numérique). Bluetooth 5.1 multi-appareils (3), switches hotswap remplaçables, RGB, compatible Mac & Windows nativement.",
    description: `<h2>Keychron K2 Pro — Fiche technique</h2>
<p>Le <strong>Keychron K2 Pro</strong> est le clavier mécanique de référence des développeurs et créatifs. Format <strong>TKL compact</strong> (75% — sans pavé numérique), il libère de l'espace pour votre souris tout en gardant les touches de navigation.</p>
<h3>Format & Disposition</h3>
<ul>
  <li>Format <strong>75% (TKL compact)</strong> — 84 touches</li>
  <li>Disposition AZERTY Français disponible</li>
  <li>Touches Mac et Windows incluses (kit de touches interchangeables fourni)</li>
</ul>
<h3>Switches (mécanismes)</h3>
<ul>
  <li>Sockets <strong>hotswap</strong> — changez les switches sans souder, avec un outil inclus</li>
  <li>Options disponibles à l'achat : <strong>Gateron G Pro Red</strong> (linéaire silencieux), <strong>Brown</strong> (tactile), <strong>Blue</strong> (tactile cliquant)</li>
  <li>Compatible switches <strong>MX 3 et 5 pins</strong> — des centaines d'options aftermarket</li>
</ul>
<h3>Connectivité</h3>
<ul>
  <li><strong>Bluetooth 5.1</strong> — connexion simultanée à <strong>3 appareils</strong>, bascule avec Fn+1/2/3</li>
  <li><strong>USB-C filaire</strong> (câble tressé inclus)</li>
  <li>Interrupteur physique Mac/Windows sur le côté</li>
</ul>
<h3>Éclairage & Batterie</h3>
<ul>
  <li>Rétroéclairage <strong>RGB par touche</strong></li>
  <li>Batterie <strong>4000 mAh</strong> — plusieurs semaines sans RGB, quelques jours avec RGB</li>
</ul>
<h3>Structure</h3>
<ul>
  <li>Châssis <strong>aluminium</strong></li>
  <li>Gasket mount (absorption des vibrations de frappe)</li>
  <li>Couleurs : <strong>Noir, Gris clair (Space Gray)</strong></li>
</ul>`,
  },

  {
    slug: "flexispot-e7",
    name: "Flexispot E7 — Bureau Assis-Debout Électrique 160x80cm",
    categorySlug: "bureau-productivite",
    price: 499.99, comparePrice: 599.99,
    affiliateUrl: amz("B08B2TF2FJ"),
    images: ["https://m.media-amazon.com/images/I/81YMqoqzuQL._AC_SL1500_.jpg"],
    shortDescription: "Bureau assis-debout #1 en Europe. Double moteur silencieux <50dB, hauteur 58-123cm, 4 positions mémorisées, anti-collision, plateau 160x80cm. Dos sauvegardé dès la 1ère semaine.",
    description: `<h2>Flexispot E7 — Fiche technique</h2>
<p>Le <strong>Flexispot E7</strong> est le bureau assis-debout le plus vendu en Europe. Double moteur pour une montée stable et silencieuse, 4 préréglages de hauteur, et une charge de 125kg — suffisante pour plusieurs écrans et équipements.</p>
<h3>Motorisation</h3>
<ul>
  <li><strong>Double moteur DC</strong> (1 moteur par pied)</li>
  <li>Niveau sonore : <strong>&lt; 50 dB</strong> (inférieur à une conversation normale)</li>
  <li>Vitesse de montée : <strong>38 mm/seconde</strong></li>
  <li>Charge maximale : <strong>125 kg</strong></li>
</ul>
<h3>Hauteur</h3>
<ul>
  <li>Plage de hauteur : <strong>58 cm à 123 cm</strong></li>
  <li>Adaptée aux personnes de 1m50 à 2m</li>
  <li>4 boutons de préréglage mémorisés</li>
  <li>Détection anti-collision : s'arrête et recule en cas d'obstacle</li>
</ul>
<h3>Plateau (inclus)</h3>
<ul>
  <li>Dimensions : <strong>160 x 80 cm</strong></li>
  <li>Épaisseur : <strong>25 mm</strong></li>
  <li>Couleurs plateau : <strong>Blanc, Noir, Chêne naturel, Bambou</strong></li>
  <li>Structure (cadre) : <strong>Blanc ou Noir</strong></li>
</ul>
<h3>Bénéfices santé</h3>
<ul>
  <li>Alterner assis/debout réduit les douleurs lombaires et cervicales</li>
  <li>Recommandé : 20-30 min debout par heure de travail</li>
  <li>La plupart des utilisateurs ressentent une amélioration dès la première semaine</li>
</ul>`,
  },

  {
    slug: "elgato-key-light",
    name: "Elgato Key Light — Panneau LED Studio 2800 Lumens",
    categorySlug: "bureau-productivite",
    price: 199.99, comparePrice: 249.99,
    affiliateUrl: amz("B07L755X9G"),
    images: ["https://m.media-amazon.com/images/I/61E6GFG+YHL._AC_SL1500_.jpg"],
    shortDescription: "Éclairage studio professionnel pour visio, streaming, YouTube. 2800 lumens, température 2900K-7000K réglable, contrôle app & Stream Deck. Zéro éblouissement.",
    description: `<h2>Elgato Key Light — Fiche technique</h2>
<p>L'<strong>Elgato Key Light</strong> est le standard de l'éclairage bureau pour créateurs de contenu, streamers et professionnels en visioconférence. 2800 lumens suffisent pour illuminer correctement votre visage même dans une pièce sombre, sans créer de reflets sur les lunettes.</p>
<h3>Lumière</h3>
<ul>
  <li>Puissance : <strong>45W — 2800 lumens</strong></li>
  <li>Température de couleur : <strong>2900K à 7000K</strong> (du blanc chaud au blanc froid)</li>
  <li>Rendu des couleurs : <strong>IRC 90+</strong> (très fidèle aux couleurs réelles)</li>
  <li>200 niveaux de luminosité</li>
  <li>LED diffusées — <strong>zéro point lumineux visible</strong>, lumière douce et uniforme</li>
</ul>
<h3>Contrôle</h3>
<ul>
  <li>Via <strong>app Elgato Control Center</strong> (Mac & Windows)</li>
  <li>Via <strong>Elgato Stream Deck</strong> si vous en avez un</li>
  <li>WiFi 2.4GHz intégré</li>
</ul>
<h3>Support</h3>
<ul>
  <li>Bras articulé en aluminium inclus</li>
  <li>Fixation sur bureau (serre-joint)</li>
  <li>Compatible bras standard 1/4 de pouce</li>
  <li>Angle orientable à 360°</li>
</ul>
<h3>Alimentation</h3>
<ul>
  <li>Câble d'alimentation secteur inclus (pas USB)</li>
  <li>Consommation : 45W</li>
</ul>`,
  },

  {
    slug: "logitech-brio-4k",
    name: "Logitech Brio 4K — Webcam 4K HDR USB-C",
    categorySlug: "bureau-productivite",
    price: 199.99, comparePrice: 249.99,
    affiliateUrl: amz("B01N5UOYC4"),
    images: ["https://m.media-amazon.com/images/I/61E2N2+JGnL._AC_SL1500_.jpg"],
    shortDescription: "La webcam de référence absolue. 4K Ultra HD HDR, correction automatique lumière RightLight 3, Windows Hello, 3 champs de vision. Standard des professionnels.",
    description: `<h2>Logitech Brio 4K — Fiche technique</h2>
<p>La <strong>Logitech Brio</strong> est la webcam que les entreprises du CAC 40 achètent pour leurs dirigeants. Sa particularité : elle produit une image nette et bien exposée <strong>quelle que soit la lumière</strong> — même à contre-jour devant une fenêtre.</p>
<h3>Image</h3>
<ul>
  <li>Résolution max : <strong>4K Ultra HD (4096 x 2160) à 30fps</strong></li>
  <li>1080P à <strong>60fps</strong> (pour les streamers)</li>
  <li>720P à 60fps</li>
  <li><strong>HDR</strong> — plage dynamique étendue</li>
  <li>Technologie <strong>RightLight 3</strong> : ajustement automatique de l'exposition, correction du contre-jour</li>
</ul>
<h3>Champs de vision</h3>
<ul>
  <li><strong>65°, 78° ou 90°</strong> — sélectionnable dans l'app Logi Tune</li>
  <li>65° : gros plan professionnel</li>
  <li>90° : bureau entier visible</li>
</ul>
<h3>Connectique</h3>
<ul>
  <li>Câble <strong>USB-A 1.8m</strong> + adaptateur <strong>USB-C</strong> inclus</li>
</ul>
<h3>Windows Hello</h3>
<ul>
  <li>Caméra infrarouge intégrée pour l'<strong>authentification faciale Windows Hello</strong></li>
  <li>Déverrouillage Windows en 1 seconde sans mot de passe</li>
  <li>Ne fonctionne pas avec macOS (pas de Face ID sur Mac)</li>
</ul>
<h3>Compatibilité logicielle</h3>
<ul>
  <li>Zoom, Teams, Google Meet, Slack</li>
  <li>OBS, Streamlabs (streaming)</li>
  <li>App <strong>Logi Tune</strong> pour les réglages avancés</li>
</ul>`,
  },

  {
    slug: "herman-miller-aeron",
    name: "Herman Miller Aeron — Chaise Ergonomique Taille B",
    categorySlug: "bureau-productivite",
    price: 1299.99, comparePrice: 1499.99,
    affiliateUrl: amz("B00MLSS1SW"),
    images: ["https://m.media-amazon.com/images/I/81RSpPGT2wL._AC_SL1500_.jpg"],
    shortDescription: "La chaise de bureau #1 mondiale. PostureFit SL, matière 8Z Pellicle aérée, 8 réglages, garantie 12 ans. Un investissement qui se rentabilise en quelques semaines.",
    description: `<h2>Herman Miller Aeron Taille B — Fiche technique</h2>
<p>La <strong>Herman Miller Aeron</strong> est la chaise de bureau la plus recommandée au monde par les médecins du travail, les ergonomes et les professionnels qui passent 8h+ par jour assis. Elle équipe les sièges des grandes entreprises tech (Google, Apple, Twitter).</p>
<h3>Tailles disponibles</h3>
<ul>
  <li><strong>Taille A</strong> : personnes &lt; 1m65, &lt; 68kg</li>
  <li><strong>Taille B (ce modèle)</strong> : personnes 1m65-1m85, 68-104kg — <strong>la plus vendue</strong></li>
  <li><strong>Taille C</strong> : personnes &gt; 1m85, &gt; 104kg</li>
</ul>
<h3>Système PostureFit SL</h3>
<ul>
  <li>Support sacrum ET lombaire <strong>indépendamment réglable</strong></li>
  <li>Maintient la courbure naturelle de la colonne en position assise</li>
  <li>Diffère du simple support lombaire — soutient également le bas du dos (sacrum)</li>
</ul>
<h3>Matière 8Z Pellicle</h3>
<ul>
  <li>Tissu maillé respirant divisé en <strong>8 zones de tension différente</strong></li>
  <li>Plus ferme aux cuisses et plus souple dans le dos</li>
  <li>Aucune surchauffe — air qui circule en permanence</li>
</ul>
<h3>Réglages (8 points)</h3>
<ul>
  <li>Hauteur du siège</li>
  <li>Inclinaison dossier + tension</li>
  <li>Hauteur accoudoirs</li>
  <li>Orientation accoudoirs (avant/arrière, gauche/droite)</li>
  <li>Profondeur assise</li>
  <li>PostureFit SL (sacrum et lombaire)</li>
</ul>
<h3>Garantie & Durabilité</h3>
<ul>
  <li><strong>Garantie 12 ans</strong> pièces et main d'œuvre</li>
  <li>Recyclable à <strong>91%</strong></li>
  <li>Durée de vie estimée : <strong>15-20 ans</strong></li>
</ul>`,
  },
];

async function main() {
  console.log("Nettoyage DB...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  console.log("DB vidée ✓");

  console.log("Création catégories...");
  for (const cat of CATEGORIES) {
    await prisma.category.create({ data: cat });
  }
  console.log(`${CATEGORIES.length} catégories créées ✓`);

  console.log("Création produits...");
  for (const p of PRODUCTS) {
    const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
    if (!category) { console.warn(`Catégorie introuvable: ${p.categorySlug}`); continue; }
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        shortDescription: p.shortDescription,
        price: p.price,
        comparePrice: p.comparePrice,
        affiliateUrl: p.affiliateUrl,
        supplierName: "Amazon",
        published: true,
        cost: 0,
        stock: 999,
        trendScore: 85,
        categoryId: category.id,
        images: { create: p.images.map((url, i) => ({ url, alt: p.name, position: i })) }
      }
    });
    console.log(`  ✓ ${p.name}`);
  }
  console.log(`\n✅ ${PRODUCTS.length} produits créés`);
}

main()
  .catch(e => { console.error("ERREUR:", e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
