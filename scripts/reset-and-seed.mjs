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
      "https://m.media-amazon.com/images/I/71ZtMbynFFL._AC_SL1500_.jpg",
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
  <li><strong>60h totales</strong></li>
  <li>Charge rapide : <strong>10 min = 4h d'écoute</strong></li>
  <li>Boîtier rechargeable en <strong>USB-C</strong> et sans fil <strong>Qi</strong></li>
</ul>

<h3>Design & Confort</h3>
<ul>
  <li>Format intra-auriculaire, embouts silicone S/M/L inclus</li>
  <li>Résistance : <strong>IPX5</strong> (sport, pluie légère ✓)</li>
  <li>Poids : <strong>5.3g par écouteur</strong></li>
  <li>Couleurs : <strong>Noir, Blanc, Bleu nuit, Rose</strong></li>
</ul>

<h3>Contenu de la boîte</h3>
<ul>
  <li>2 écouteurs Soundcore P40i + boîtier de charge</li>
  <li>Câble USB-C + 3 paires d'embouts silicone (S/M/L)</li>
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
      "https://m.media-amazon.com/images/I/71LuoJLJBvL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61sFX1YnGDL._AC_SL1500_.jpg",
    ],
    shortDescription: "Chargez iPhone (MagSafe 15W), Apple Watch et AirPods en même temps. Chargeur mural GaN 65W intégré — un seul appareil sur votre bureau.",
    description: `<h2>Anker 733 MagGo — Fiche technique complète</h2>

<p>Le <strong>733 MagGo</strong> est un chargeur <strong>3-en-1</strong> conçu exclusivement pour l'écosystème Apple. Il charge simultanément votre iPhone, Apple Watch et AirPods avec le chargeur mural GaN 65W <strong>intégré directement dans le socle</strong>.</p>

<h3>Compatibilité</h3>
<ul>
  <li><strong>iPhone 12, 13, 14, 15, 16</strong> et versions Pro/Max/Mini via MagSafe</li>
  <li><strong>Apple Watch</strong> Series 4 à 9, Ultra, SE</li>
  <li><strong>AirPods</strong> 2e gen+, AirPods Pro</li>
  <li>Non compatible Android</li>
</ul>

<h3>Puissance de charge</h3>
<ul>
  <li>iPhone via MagSafe : <strong>15W</strong></li>
  <li>Apple Watch : <strong>5W</strong></li>
  <li>AirPods : <strong>5W</strong></li>
  <li>Port USB-C mural intégré : <strong>65W</strong> pour MacBook ou appareil supplémentaire</li>
</ul>

<h3>Design</h3>
<ul>
  <li>Station de bureau — pose debout ou à plat</li>
  <li>Bras Apple Watch articulé réglable</li>
  <li>Câble intégré <strong>1.5m USB-C</strong></li>
  <li>Couleurs : <strong>Noir, Blanc</strong></li>
</ul>

<h3>Dans la boîte</h3>
<ul>
  <li>Station Anker 733 MagGo + câble USB-C 1.5m</li>
  <li><strong>Adaptateur secteur non inclus</strong> — nécessite adaptateur 65W+</li>
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
      "https://m.media-amazon.com/images/I/71VCdLimCTL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61xqnJ0+2OL._AC_SL1500_.jpg",
    ],
    shortDescription: "Batterie externe 20000mAh — charge un MacBook, 2 téléphones simultanément. 65W USB-C, écran LED précis. La plus polyvalente du marché.",
    description: `<h2>Baseus Power Bank 20000mAh 65W — Fiche technique complète</h2>

<p>La batterie externe <strong>Baseus 20000mAh 65W</strong> est la seule batterie portable capable de charger un <strong>MacBook, un PC portable et deux téléphones en même temps</strong>. Le port USB-C délivre jusqu'à 65W — suffisant pour la majorité des laptops modernes.</p>

<h3>Capacité & Autonomie</h3>
<ul>
  <li><strong>20 000 mAh</strong> — 4-5 charges complètes d'un iPhone 15</li>
  <li>Environ <strong>3 charges</strong> d'un MacBook Air M2</li>
</ul>

<h3>Ports & Puissance</h3>
<ul>
  <li><strong>USB-C 65W</strong> — charge PD laptops, iPad Pro, téléphones</li>
  <li><strong>USB-A x2 : 22.5W</strong> chacun</li>
  <li>Charge simultanée <strong>3 appareils</strong></li>
</ul>

<h3>Recharge de la batterie</h3>
<ul>
  <li>Via USB-C 65W : recharge complète en <strong>~2h30</strong></li>
</ul>

<h3>Design</h3>
<ul>
  <li>Écran LED affichant le <strong>pourcentage exact</strong></li>
  <li>Dimensions : <strong>16.5 x 7.5 x 2.5 cm</strong> — Poids : <strong>430g</strong></li>
  <li>Couleurs : <strong>Noir, Blanc</strong></li>
</ul>

<h3>Dans la boîte</h3>
<ul>
  <li>Batterie Baseus 20000mAh + câble USB-C vers USB-C + pochette de transport</li>
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
      "https://m.media-amazon.com/images/I/71tAJEeJWBL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61uAlMvQKcL._AC_SL1500_.jpg",
    ],
    shortDescription: "La souris sans fil de référence mondiale. 8000 DPI, molette MagSpeed, clics 90% silencieux, 70 jours d'autonomie. Standard des créatifs et développeurs.",
    description: `<h2>Logitech MX Master 3S — Fiche technique complète</h2>

<p>La <strong>MX Master 3S</strong> est unanimement reconnue comme la meilleure souris sans fil du monde pour un usage professionnel. La version "S" ajoute des clics <strong>90% plus silencieux</strong> et un capteur amélioré à 8000 DPI.</p>

<h3>Capteur & Précision</h3>
<ul>
  <li>Capteur optique <strong>8000 DPI</strong> — fonctionne sur toutes surfaces y compris le verre</li>
  <li>Ajustement DPI de 200 à 8000 en temps réel</li>
</ul>

<h3>Molette MagSpeed</h3>
<ul>
  <li>Molette électromagnétique — bascule automatiquement entre défilement clic-par-clic et ultra-rapide (1000 lignes/seconde)</li>
  <li>Défilement horizontal via molette de pouce</li>
</ul>

<h3>Connexion</h3>
<ul>
  <li><strong>Bluetooth</strong> ou récepteur <strong>USB Logi Bolt</strong> (inclus)</li>
  <li>Easy-Switch : bascule entre <strong>3 appareils</strong> instantanément</li>
</ul>

<h3>Ergonomie & Autonomie</h3>
<ul>
  <li>Format main droite uniquement — grandes et moyennes mains</li>
  <li>7 boutons programmables via Logi Options+</li>
  <li><strong>70 jours</strong> d'autonomie, recharge USB-C</li>
  <li>Charge rapide : <strong>1 min = 3h d'utilisation</strong></li>
  <li>Couleurs : <strong>Noir graphite, Blanc pâle, Rose</strong></li>
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
      "https://m.media-amazon.com/images/I/61YEKJXM9PL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61IhLjdKLSL._AC_SL1500_.jpg",
    ],
    shortDescription: "Caméra intérieure #1 vente en France. Full HD 1080P, rotation 360°, vision nocturne 9m, détection mouvement, alertes smartphone. Sans abonnement.",
    description: `<h2>TP-Link Tapo C200 — Fiche technique complète</h2>

<p>La <strong>Tapo C200</strong> est la caméra de surveillance intérieure la plus vendue en France. Installation en 5 minutes, aucun abonnement requis, couverture totale grâce à la rotation 360°.</p>

<h3>Image & Résolution</h3>
<ul>
  <li>Résolution <strong>Full HD 1080P</strong></li>
  <li>Rotation motorisée <strong>360° horizontal, 114° vertical</strong></li>
  <li>Vision nocturne infrarouge jusqu'à <strong>9 mètres</strong></li>
</ul>

<h3>Détection & Alertes</h3>
<ul>
  <li>Détection de mouvement avec zones personnalisables</li>
  <li>Détection de personnes par IA</li>
  <li>Alertes push instantanées + sirène intégrée activable</li>
</ul>

<h3>Stockage & Connectivité</h3>
<ul>
  <li>Carte microSD jusqu'à <strong>256Go</strong> (non incluse) — <strong>aucun abonnement obligatoire</strong></li>
  <li>WiFi 2.4 GHz — compatible <strong>Alexa, Google Home</strong></li>
</ul>

<h3>Dans la boîte</h3>
<ul>
  <li>Caméra Tapo C200 + adaptateur secteur + câble Micro-USB 2m + kit fixation murale</li>
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
      "https://m.media-amazon.com/images/I/71WOmHEB3TL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61r0QBDtXGL._AC_SL1500_.jpg",
    ],
    shortDescription: "5ème génération Echo Dot. Son amélioré avec graves renforcés, capteur de température intégré, Alexa pour contrôler toute votre maison connectée.",
    description: `<h2>Amazon Echo Dot 5ème génération — Fiche technique complète</h2>

<p>L'<strong>Echo Dot 5</strong> améliore son (graves +50%) et ajoute un <strong>capteur de température</strong> — une fonctionnalité unique à ce prix.</p>

<h3>Son</h3>
<ul>
  <li>Haut-parleur <strong>1.73 pouce</strong> avec traitement DSP</li>
  <li>Compatible Dolby — peut être couplée en stéréo avec un 2ème Echo Dot 5</li>
</ul>

<h3>Capteur de température</h3>
<ul>
  <li>Déclenche des routines automatiques ("si température > 25°C, allume le ventilateur connecté")</li>
</ul>

<h3>Alexa</h3>
<ul>
  <li>Contrôle vocal de toute la maison connectée (Philips Hue, Kasa, Meross…)</li>
  <li>Lecture Spotify, Deezer, Apple Music, Amazon Music</li>
  <li>Plus de <strong>100 000 skills Alexa</strong></li>
</ul>

<h3>Design & Connectivité</h3>
<ul>
  <li>Format sphérique <strong>10 cm</strong>, tissu acoustique recyclé</li>
  <li>Couleurs : <strong>Anthracite, Blanc glacier, Bleu glacier</strong></li>
  <li>WiFi 802.11 a/b/g/n/ac (2.4 & 5 GHz) + Bluetooth 5.0</li>
</ul>`,
  },

  // ─── MAISON INTELLIGENTE ─────────────────────────────────────────────────────
  {
    slug: "philips-hue-white-3pack",
    name: "Philips Hue White — Pack 3 Ampoules E27 Connectées",
    categorySlug: "maison-intelligente",
    price: 44.99, comparePrice: 59.99,
    affiliateUrl: amz("B07PNBQYTS"),
    images: [
      "https://m.media-amazon.com/images/I/61o2D6NovHL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71uKk5KSDWL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61VnWLzFWFL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71ztAR9JbNL._AC_SL1500_.jpg",
    ],
    shortDescription: "3 ampoules E27 connectées Philips Hue. Contrôle vocal Alexa/Google, gradation 1-100%, programmation horaire, durée de vie 25 000h. Aucun hub requis.",
    description: `<h2>Philips Hue White E27 — Pack 3 — Fiche technique</h2>
<p>Le pack de 3 ampoules <strong>Philips Hue White</strong> est la référence pour débuter dans l'éclairage connecté. Lumière blanche chaude uniquement (pas de couleurs RGB).</p>
<h3>Caractéristiques techniques</h3>
<ul>
  <li>Culot : <strong>E27</strong> (vissant standard — compatible 99% des lampes françaises)</li>
  <li>Puissance : <strong>9W</strong> — équivalent <strong>60W</strong> classique</li>
  <li>Flux lumineux : <strong>800 lumens</strong> — Température : <strong>2700K</strong> (blanc chaud)</li>
  <li>Gradation : <strong>1% à 100%</strong> — Durée de vie : <strong>25 000 heures</strong></li>
</ul>
<h3>Connexion</h3>
<ul>
  <li><strong>Sans bridge</strong> : contrôle Bluetooth jusqu'à 10 ampoules</li>
  <li><strong>Avec Hue Bridge</strong> (vendu séparément) : automatisations avancées, accès hors domicile</li>
  <li>Compatible <strong>Alexa, Google Home, Apple HomeKit, SmartThings</strong></li>
</ul>
<h3>Ce que vous pouvez faire</h3>
<ul>
  <li>Allumer/éteindre/graduer par commande vocale</li>
  <li>Programmer des horaires (lever du soleil simulé, extinction automatique)</li>
  <li>Créer des scènes d'ambiance (lecture, cinéma, dîner)</li>
</ul>`,
  },

  {
    slug: "kasa-hs100",
    name: "Kasa Smart HS100 — Prise Connectée WiFi",
    categorySlug: "maison-intelligente",
    price: 15.99, comparePrice: 22.99,
    affiliateUrl: amz("B0152WLWSA"),
    images: [
      "https://m.media-amazon.com/images/I/61yTWdj3hwL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61bpuTbkR3L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71rJeFV3JEL._AC_SL1500_.jpg",
    ],
    shortDescription: "Transformez n'importe quel appareil en appareil connecté. Contrôle à distance, programmation horaire, compatible Alexa & Google. Installation 2 minutes, sans hub.",
    description: `<h2>Kasa Smart HS100 — Fiche technique</h2>
<p>La prise <strong>Kasa HS100</strong> transforme instantanément n'importe quelle prise électrique murale en prise intelligente. Branchez-y une lampe, un radiateur, un ventilateur ou une cafetière — et contrôlez-le depuis votre téléphone ou par la voix.</p>
<h3>Caractéristiques</h3>
<ul>
  <li>Tension : <strong>220-240V</strong> (norme française/européenne)</li>
  <li>Courant max : <strong>16A</strong> — compatible appareils jusqu'à 3680W</li>
  <li>WiFi <strong>2.4 GHz</strong> — <strong>aucun hub requis</strong></li>
</ul>
<h3>Fonctionnalités</h3>
<ul>
  <li>Contrôle à distance depuis n'importe où via l'app <strong>Kasa</strong></li>
  <li>Programmation d'horaires et minuteries</li>
  <li>Mode <strong>Away</strong> : allume/éteint aléatoirement pour simuler une présence</li>
  <li>Compatible <strong>Alexa, Google Home</strong></li>
</ul>`,
  },

  {
    slug: "meross-thermostat",
    name: "Meross Smart Thermostat — Thermostat Connecté WiFi",
    categorySlug: "maison-intelligente",
    price: 39.99, comparePrice: 54.99,
    affiliateUrl: amz("B09L6DSLGQ"),
    images: [
      "https://m.media-amazon.com/images/I/61mPuLlpaaL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71EbPdXBSRL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61lCa3KYHXL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71YF25NRmHL._AC_SL1500_.jpg",
    ],
    shortDescription: "Contrôlez votre chauffage à distance. Compatible toutes chaudières. Économies jusqu'à 31% sur la facture. Installation sans électricien, Alexa & Google Home.",
    description: `<h2>Meross Smart Thermostat — Fiche technique</h2>
<p>Le thermostat <strong>Meross</strong> remplace votre thermostat filaire existant et vous permet de contrôler votre chauffage depuis votre smartphone, où que vous soyez.</p>
<h3>Compatibilité chaudière</h3>
<ul>
  <li><strong>Chaudières gaz, fioul, électriques</strong> à 2 fils</li>
  <li>Tension : <strong>110-240V</strong></li>
  <li>Non compatible planchers chauffants hydrauliques complexes</li>
</ul>
<h3>Fonctionnalités</h3>
<ul>
  <li>Contrôle à distance via app <strong>Meross</strong> (iOS & Android)</li>
  <li>Programmation hebdomadaire</li>
  <li>Mode <strong>absence</strong> automatique (géolocalisation)</li>
  <li>Compatible <strong>Alexa, Google Home, Apple HomeKit, SmartThings</strong></li>
  <li>Écran tactile couleur</li>
</ul>
<h3>Installation</h3>
<ul>
  <li>Remplacement direct de l'ancien thermostat filaire</li>
  <li>Temps estimé : <strong>20-30 minutes</strong> sans électricien</li>
</ul>`,
  },

  {
    slug: "govee-rgbic-10m",
    name: "Govee RGBIC — Ruban LED 10m WiFi Alexa",
    categorySlug: "maison-intelligente",
    price: 34.99, comparePrice: 44.99,
    affiliateUrl: amz("B094ZBFVD6"),
    images: [
      "https://m.media-amazon.com/images/I/81FDPvkxA5L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71YGXbE3JQL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71z4e-PBKHL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71w5XWCKL6L._AC_SL1500_.jpg",
    ],
    shortDescription: "Ruban LED RGBIC 10m — plusieurs couleurs simultanées grâce à la technologie IC individuelle. Sync musique temps réel, 64 effets, Alexa & Google. Découpable.",
    description: `<h2>Govee RGBIC LED 10m — Fiche technique</h2>
<p>La différence entre RGB classique et <strong>RGBIC</strong> : le RGBIC peut afficher <strong>plusieurs couleurs simultanément</strong> sur le même ruban grâce à des puces IC individuelles. Effets dégradés et arc-en-ciel impossibles avec un ruban classique.</p>
<h3>Spécifications</h3>
<ul>
  <li>Longueur : <strong>10 mètres</strong> — Technologie : <strong>RGBIC</strong></li>
  <li>Adhésif 3M sur toute la longueur — Découpable (toutes les 10 cm environ)</li>
  <li>Résistance à l'eau : <strong>IP65</strong></li>
</ul>
<h3>Effets & Contrôle</h3>
<ul>
  <li><strong>64 modes d'effets</strong> préprogrammés</li>
  <li><strong>Synchronisation musicale</strong> via microphone intégré</li>
  <li>App <strong>Govee Home</strong> + compatible <strong>Alexa et Google Home</strong></li>
  <li>Télécommande infrarouge incluse</li>
</ul>`,
  },

  {
    slug: "eufy-robovac-x8",
    name: "Eufy RoboVac X8 — Robot Aspirateur 2000Pa WiFi",
    categorySlug: "maison-intelligente",
    price: 249.99, comparePrice: 299.99,
    affiliateUrl: amz("B09CCC9ZC8"),
    images: [
      "https://m.media-amazon.com/images/I/71JUkbqUvSL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71lgM6QkO5L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71mI8byFcgL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61pLRnMcFBL._AC_SL1500_.jpg",
    ],
    shortDescription: "Robot aspirateur twin-turbine 2000Pa, cartographie laser LiDAR, ultra-silencieux 68dB. Compatible Alexa, Google. Remplace vraiment l'aspirateur classique.",
    description: `<h2>Eufy RoboVac X8 — Fiche technique</h2>
<p>Le <strong>RoboVac X8</strong> marque un vrai saut qualitatif. Sa double turbine génère <strong>2000Pa d'aspiration</strong> — 2x plus que les robots d'entrée de gamme — et sa navigation laser LiDAR cartographie précisément votre domicile.</p>
<h3>Aspiration</h3>
<ul>
  <li><strong>2000Pa</strong> — aspiration twin-turbine (2 moteurs)</li>
  <li>Efficace sur <strong>parquet, carrelage, moquette courte</strong></li>
  <li>Filtre HEPA — capture 99.97% des particules fines</li>
</ul>
<h3>Navigation LiDAR</h3>
<ul>
  <li>Capteur laser sur le dessus — cartographie précise du logement</li>
  <li>Nettoyage par pièce, zones interdites configurables</li>
  <li>Hauteur franchissable : <strong>1.5 cm</strong></li>
</ul>
<h3>Autonomie & Bruit</h3>
<ul>
  <li>Autonomie : <strong>100 minutes</strong> + retour automatique base</li>
  <li>Niveau sonore : <strong>68dB</strong></li>
  <li>Compatible <strong>Alexa, Google Home</strong></li>
</ul>`,
  },

  {
    slug: "sonos-era-100",
    name: "Sonos Era 100 — Enceinte WiFi Multiroom Stéréo",
    categorySlug: "maison-intelligente",
    price: 249.99, comparePrice: 279.99,
    affiliateUrl: amz("B0BW5PNSHV"),
    images: [
      "https://m.media-amazon.com/images/I/61dFTEFVFFL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71LrjkHOHkL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61o7x4HY5FL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61ub0TZ4d2L._AC_SL1500_.jpg",
    ],
    shortDescription: "Enceinte connectée Sonos avec vrai son stéréo (2 tweeters inclinés). WiFi + Bluetooth simultané, AirPlay 2, Alexa intégré, multiroom Sonos. Son premium justifié.",
    description: `<h2>Sonos Era 100 — Fiche technique</h2>
<p>La <strong>Sonos Era 100</strong> remplace le Sonos One. Différence principale : vrai <strong>son stéréo</strong> avec deux tweeters orientés à 45° qui créent une image sonore large. Exceptionnel pour cette taille.</p>
<h3>Son</h3>
<ul>
  <li><strong>2 tweeters inclinés</strong> à 45° — son stéréo vrai</li>
  <li><strong>1 woofer</strong> pour les graves</li>
  <li>Trueplay — calibration automatique selon la pièce</li>
  <li>Compatible <strong>Dolby Atmos</strong></li>
</ul>
<h3>Connectivité</h3>
<ul>
  <li><strong>WiFi 6</strong> + <strong>Bluetooth 5.0</strong> + <strong>AirPlay 2</strong></li>
  <li>Port <strong>USB-C Line-In</strong> pour source analogique</li>
  <li>Alexa intégré + Google Assistant via app</li>
</ul>
<h3>Multiroom</h3>
<ul>
  <li>Intégration native écosystème Sonos — synchronisez toute la maison</li>
  <li>Couplable en paire stéréo avec une 2ème Era 100</li>
  <li>Couleurs : <strong>Noir, Blanc</strong></li>
</ul>`,
  },

  // ─── SPORT FITNESS ────────────────────────────────────────────────────────────
  {
    slug: "theragun-mini",
    name: "Theragun Mini — Pistolet de Massage Professionnel",
    categorySlug: "sport-fitness",
    price: 149.99, comparePrice: 179.99,
    affiliateUrl: amz("B0C4HPFDF2"),
    images: [
      "https://m.media-amazon.com/images/I/61lX9KDCS3L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61yVsf0NYRL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71hJv0HMK3L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61wf-Q7JXBL._AC_SL1500_.jpg",
    ],
    shortDescription: "Le pistolet massage Theragun en format compact. Amplitude 12mm, 150min autonomie, 3 vitesses, 4 embouts. Utilisé par les athlètes professionnels, format poche.",
    description: `<h2>Theragun Mini — Fiche technique</h2>
<p>Le <strong>Theragun Mini</strong> est la version compacte du pistolet de massage de référence mondiale. Utilisé par les équipes NBA, NFL et les athlètes olympiques. Le Mini conserve l'essentiel dans un format poche.</p>
<h3>Percussions</h3>
<ul>
  <li>Amplitude : <strong>12mm</strong> de profondeur musculaire</li>
  <li><strong>3 vitesses</strong> : 1750 / 2100 / 2400 PPM</li>
  <li>Force : <strong>6.8kg</strong> de stalle</li>
</ul>
<h3>Autonomie & Charge</h3>
<ul>
  <li><strong>150 minutes</strong> d'autonomie — recharge <strong>USB-C</strong></li>
</ul>
<h3>Embouts inclus (4)</h3>
<ul>
  <li>Boule standard, Amortisseur, Thumb, Cône</li>
</ul>
<h3>Design</h3>
<ul>
  <li>Poids : <strong>272g</strong> — Niveau sonore : <strong>65dB</strong></li>
  <li>Couleurs : <strong>Noir, Blanc, Desert Rose, Vert</strong></li>
</ul>`,
  },

  {
    slug: "garmin-forerunner-55",
    name: "Garmin Forerunner 55 — Montre GPS Running",
    categorySlug: "sport-fitness",
    price: 169.99, comparePrice: 199.99,
    affiliateUrl: amz("B092WQJLQQ"),
    images: [
      "https://m.media-amazon.com/images/I/61ZFBJE4LfL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71fgbk+WvNL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61Y0HISDRFL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71LcFMXVsXL._AC_SL1500_.jpg",
    ],
    shortDescription: "Montre GPS running Garmin. GPS précis, fréquence cardiaque au poignet, plans d'entraînement adaptatifs, 2 semaines d'autonomie. La référence running débutant-intermédiaire.",
    description: `<h2>Garmin Forerunner 55 — Fiche technique</h2>
<p>La <strong>Forerunner 55</strong> est la montre GPS running d'entrée de gamme Garmin. Elle intègre l'essentiel pour progresser en running, sans les fonctions pro des modèles 255/955.</p>
<h3>GPS & Capteurs</h3>
<ul>
  <li>GPS intégré <strong>GPS, GLONASS, GALILEO</strong> — fonctionne sans téléphone</li>
  <li>Fréquence cardiaque optique au poignet + SpO2</li>
</ul>
<h3>Running & Sport</h3>
<ul>
  <li>Métriques running : allure, distance, cadence, VO2 Max estimé</li>
  <li>Plans d'entraînement adaptatifs (5km, 10km, semi, marathon)</li>
  <li>Coaching quotidien selon récupération</li>
</ul>
<h3>Autonomie & Résistance</h3>
<ul>
  <li>Mode montre : <strong>2 semaines</strong> — Mode GPS : <strong>20 heures</strong></li>
  <li>Résistance : <strong>5 ATM</strong> (50m — natation ✓)</li>
  <li>Boîtier <strong>42mm</strong> — Couleurs : <strong>Blanc/Aqua, Noir, Lilas, Rouge</strong></li>
</ul>`,
  },

  {
    slug: "bowflex-selecttech-552",
    name: "Bowflex SelectTech 552 — Haltères Réglables 2-24kg",
    categorySlug: "sport-fitness",
    price: 329.99, comparePrice: 399.99,
    affiliateUrl: amz("B001ARYU58"),
    images: [
      "https://m.media-amazon.com/images/I/71RrIGiUMNL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71SIHxEkpNL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71mBKJrMYgL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71tUAEjcHOL._AC_SL1500_.jpg",
    ],
    shortDescription: "15 poids en 1 haltère compact. De 2 à 24kg par incréments de 2kg. Sélection en 3 secondes. Remplace 15 paires d'haltères — économisez 2000€ de matériel.",
    description: `<h2>Bowflex SelectTech 552 — Fiche technique</h2>
<p>Les <strong>SelectTech 552</strong> sont les haltères réglables de référence mondiale. Ils remplacent <strong>15 paires d'haltères classiques</strong> dans l'espace d'une seule paire.</p>
<h3>Poids disponibles</h3>
<ul>
  <li>De <strong>2 kg à 24 kg</strong> par incréments de <strong>2 kg</strong></li>
  <li>Prix à la paire (2 haltères)</li>
</ul>
<h3>Système de sélection</h3>
<ul>
  <li>Molette rotative à chaque extrémité</li>
  <li>Changement de poids en <strong>moins de 3 secondes</strong></li>
  <li>Disques non sélectionnés restent dans le socle</li>
</ul>
<h3>Dimensions & Garantie</h3>
<ul>
  <li>38 x 20 x 24 cm par haltère — Socles inclus</li>
  <li><strong>Garantie 2 ans</strong></li>
</ul>`,
  },

  {
    slug: "fitbit-charge-6",
    name: "Fitbit Charge 6 — Bracelet Fitness GPS & ECG",
    categorySlug: "sport-fitness",
    price: 149.99, comparePrice: 179.99,
    affiliateUrl: amz("B0CDF7K9KS"),
    images: [
      "https://m.media-amazon.com/images/I/61s85RHwBBL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71fV8gAnKnL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71E3Q0IOUEL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61iKhHQnEBL._AC_SL1500_.jpg",
    ],
    shortDescription: "Tracker fitness le plus complet sous 200€. GPS sans smartphone, ECG, SpO2, suivi sommeil, 7 jours autonomie. Intégration Google Maps, YouTube Music, Google Wallet.",
    description: `<h2>Fitbit Charge 6 — Fiche technique</h2>
<p>Le <strong>Charge 6</strong> est le meilleur tracker fitness sous 200€. Nouveauté vs Charge 5 : <strong>Google Maps, YouTube Music, Google Wallet</strong> intégrés nativement.</p>
<h3>GPS</h3>
<ul>
  <li>GPS intégré — fonctionne sans téléphone</li>
  <li>GPS, GLONASS, BeiDou, Galileo</li>
  <li>Navigation carte en temps réel via Google Maps</li>
</ul>
<h3>Santé</h3>
<ul>
  <li><strong>ECG</strong> — détecte la fibrillation auriculaire</li>
  <li>Fréquence cardiaque 24/7 + SpO2 + score stress</li>
  <li>Suivi sommeil avancé + score sur 100</li>
  <li>40+ modes sport</li>
</ul>
<h3>Autonomie & Design</h3>
<ul>
  <li><strong>7 jours</strong> — résistance <strong>50 mètres</strong></li>
  <li>Couleurs : <strong>Noir, Coral, Porcelaine</strong></li>
</ul>`,
  },

  {
    slug: "manduka-pro-yoga",
    name: "Manduka PRO — Tapis de Yoga Professionnel 6mm",
    categorySlug: "sport-fitness",
    price: 129.99, comparePrice: 149.99,
    affiliateUrl: amz("B001AT4JOG"),
    images: [
      "https://m.media-amazon.com/images/I/91LgQeASGJL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81aR-j4lPNL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81F2LbTzBxL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/91k+L+5cjVL._AC_SL1500_.jpg",
    ],
    shortDescription: "Le tapis yoga de référence mondiale. Garantie à vie, 6mm amorti dense, surface Dry-Grip anti-dérapant même en sueur. Utilisé par les professeurs du monde entier.",
    description: `<h2>Manduka PRO — Fiche technique</h2>
<p>Le <strong>Manduka PRO</strong> est le tapis de yoga des enseignants et pratiquants sérieux. <strong>Garantie à vie</strong> — c'est le dernier tapis que vous achèterez.</p>
<h3>Dimensions & Matière</h3>
<ul>
  <li><strong>180 cm</strong> x 61 cm x <strong>6 mm</strong> — Poids : <strong>3.2 kg</strong></li>
  <li>PVC haute densité sans phtalates, sans émissions toxiques</li>
</ul>
<h3>Surface Dry-Grip</h3>
<ul>
  <li>Conçue pour les pratiques intenses — grip s'améliore avec le temps</li>
  <li>Face inférieure non-slip sur parquet et moquette</li>
</ul>
<h3>Garantie</h3>
<ul>
  <li><strong>Garantie à vie</strong> — Manduka remplace ou rembourse sans condition</li>
  <li>Plus de 20 coloris disponibles</li>
</ul>`,
  },

  {
    slug: "walkingpad-r2",
    name: "WalkingPad R2 — Tapis de Marche Pliable Sous Bureau",
    categorySlug: "sport-fitness",
    price: 379.99, comparePrice: 449.99,
    affiliateUrl: amz("B09R6FVK8S"),
    images: [
      "https://m.media-amazon.com/images/I/61CDXII6YML._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71z6DCZFHRL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71z-YJU3o2L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61K0VFPIFVL._AC_SL1500_.jpg",
    ],
    shortDescription: "Marchez en travaillant. Pliable en 3s pour passer sous un bureau, 0.5-6km/h, ultra-silencieux 75dB. Télécommande incluse, app WalkingPad. 10 000 pas sans quitter votre bureau.",
    description: `<h2>WalkingPad R2 — Fiche technique</h2>
<p>Le <strong>WalkingPad R2</strong> est conçu pour être utilisé <strong>sous un bureau debout</strong> pendant que vous travaillez. Se plie en 3 secondes contre un mur.</p>
<h3>Vitesse & Bruit</h3>
<ul>
  <li>Vitesse : <strong>0.5 à 6 km/h</strong></li>
  <li>Niveau sonore : <strong>moins de 75 dB</strong> — discret en visio</li>
</ul>
<h3>Dimensions</h3>
<ul>
  <li>Déployé : <strong>147 x 55 x 13 cm</strong> — Plié : <strong>82 x 55 x 13 cm</strong></li>
  <li>Poids : <strong>28 kg</strong> — Charge max : <strong>100 kg</strong></li>
  <li>Hauteur bureau recommandée : <strong>70 cm minimum</strong></li>
</ul>
<h3>Contrôle</h3>
<ul>
  <li>Télécommande sans fil + boutons sur tapis</li>
  <li>App <strong>KS Fit</strong> pour les statistiques</li>
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
    images: [
      "https://m.media-amazon.com/images/I/816vRAtpLiL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71nYF1g3V5L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71cJ5DFj5CL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71KSmkOJIHL._AC_SL1500_.jpg",
    ],
    shortDescription: "Écran 4K IPS 27\". USB-C 96W (charge un MacBook Pro). 99% sRGB, HDR400, hauteur réglable. Le monitor HomeOffice de référence — un câble pour tout.",
    description: `<h2>LG 27UN850 — Fiche technique</h2>
<p>Le <strong>LG 27UN850</strong> est le moniteur de référence pour le travail professionnel à domicile. Un seul câble USB-C connecte votre MacBook/PC portable <strong>ET</strong> l'alimente avec 96W simultanément.</p>
<h3>Affichage</h3>
<ul>
  <li><strong>27 pouces, 4K UHD 3840 x 2160</strong></li>
  <li>Dalle <strong>IPS</strong> — 99% sRGB, 95% DCI-P3, HDR400</li>
  <li>Luminosité : <strong>400 nits</strong> — 60Hz</li>
</ul>
<h3>Connectique</h3>
<ul>
  <li><strong>USB-C Thunderbolt 3</strong> : vidéo + charge <strong>96W</strong></li>
  <li>HDMI 2.0 x2, DisplayPort 1.4, USB-A x2, Jack 3.5mm</li>
</ul>
<h3>Ergonomie</h3>
<ul>
  <li>Réglage hauteur 130mm, pivot portrait 90°, VESA 100x100</li>
  <li>MacBook Air/Pro M1/M2/M3 : <strong>1 écran 4K ✓ via USB-C</strong></li>
</ul>`,
  },

  {
    slug: "keychron-k2-pro",
    name: "Keychron K2 Pro — Clavier Mécanique Sans Fil",
    categorySlug: "bureau-productivite",
    price: 99.99, comparePrice: 129.99,
    affiliateUrl: amz("B0BK5J9KTD"),
    images: [
      "https://m.media-amazon.com/images/I/71eaKASEvoL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71MIuVnIHXL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71lEsVXGSLL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71jm8OSHPQL._AC_SL1500_.jpg",
    ],
    shortDescription: "Clavier mécanique TKL (sans pavé numérique). Bluetooth 5.1 multi-appareils (3), switches hotswap remplaçables, RGB, compatible Mac & Windows nativement.",
    description: `<h2>Keychron K2 Pro — Fiche technique</h2>
<p>Le <strong>Keychron K2 Pro</strong> est le clavier mécanique de référence des développeurs. Format <strong>75%</strong> — libère de l'espace pour la souris tout en gardant les touches de navigation.</p>
<h3>Format & Switches</h3>
<ul>
  <li>Format <strong>75% — 84 touches</strong>, disposition AZERTY disponible</li>
  <li>Sockets <strong>hotswap</strong> — changez les switches sans souder</li>
  <li>Options : Gateron G Pro Red, Brown, Blue</li>
</ul>
<h3>Connectivité</h3>
<ul>
  <li><strong>Bluetooth 5.1</strong> — 3 appareils simultanés</li>
  <li><strong>USB-C filaire</strong> — interrupteur physique Mac/Windows</li>
</ul>
<h3>Structure & Autonomie</h3>
<ul>
  <li>Châssis <strong>aluminium</strong>, gasket mount</li>
  <li>RGB par touche — Batterie <strong>4000 mAh</strong></li>
  <li>Couleurs : <strong>Noir, Gris clair</strong></li>
</ul>`,
  },

  {
    slug: "flexispot-e7",
    name: "Flexispot E7 — Bureau Assis-Debout Électrique 160x80cm",
    categorySlug: "bureau-productivite",
    price: 499.99, comparePrice: 599.99,
    affiliateUrl: amz("B08B2TF2FJ"),
    images: [
      "https://m.media-amazon.com/images/I/81YMqoqzuQL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81fFANQ7wVL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71K7IDv3tFL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71NVzJPtNDL._AC_SL1500_.jpg",
    ],
    shortDescription: "Bureau assis-debout #1 en Europe. Double moteur silencieux <50dB, hauteur 58-123cm, 4 positions mémorisées, anti-collision, plateau 160x80cm. Dos sauvegardé dès la 1ère semaine.",
    description: `<h2>Flexispot E7 — Fiche technique</h2>
<p>Le <strong>Flexispot E7</strong> est le bureau assis-debout le plus vendu en Europe. Double moteur stable et silencieux, 4 préréglages, charge 125kg.</p>
<h3>Motorisation</h3>
<ul>
  <li><strong>Double moteur DC</strong> — niveau sonore <strong>&lt; 50 dB</strong></li>
  <li>Vitesse : <strong>38 mm/s</strong> — Charge max : <strong>125 kg</strong></li>
</ul>
<h3>Hauteur</h3>
<ul>
  <li><strong>58 cm à 123 cm</strong> — adaptée 1m50 à 2m</li>
  <li>4 boutons mémorisés + anti-collision</li>
</ul>
<h3>Plateau inclus</h3>
<ul>
  <li><strong>160 x 80 cm</strong>, épaisseur 25mm</li>
  <li>Couleurs : <strong>Blanc, Noir, Chêne, Bambou</strong></li>
</ul>
<h3>Bénéfices</h3>
<ul>
  <li>Réduit douleurs lombaires et cervicales dès la 1ère semaine</li>
  <li>Recommandé : 20-30 min debout par heure de travail</li>
</ul>`,
  },

  {
    slug: "elgato-key-light",
    name: "Elgato Key Light — Panneau LED Studio 2800 Lumens",
    categorySlug: "bureau-productivite",
    price: 199.99, comparePrice: 249.99,
    affiliateUrl: amz("B07L755X9G"),
    images: [
      "https://m.media-amazon.com/images/I/61E6GFG+YHL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71VFpPCLUKL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61bflcVMQlL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61P1YFmB3cL._AC_SL1500_.jpg",
    ],
    shortDescription: "Éclairage studio professionnel pour visio, streaming, YouTube. 2800 lumens, température 2900K-7000K réglable, contrôle app & Stream Deck. Zéro éblouissement.",
    description: `<h2>Elgato Key Light — Fiche technique</h2>
<p>L'<strong>Elgato Key Light</strong> est le standard d'éclairage pour créateurs de contenu et professionnels en visio. 2800 lumens, lumière douce sans reflets sur les lunettes.</p>
<h3>Lumière</h3>
<ul>
  <li>Puissance : <strong>45W — 2800 lumens</strong></li>
  <li>Température : <strong>2900K à 7000K</strong> (200 niveaux de luminosité)</li>
  <li>IRC <strong>90+</strong> — rendu des couleurs très fidèle</li>
  <li>LED diffusées — <strong>zéro point lumineux visible</strong></li>
</ul>
<h3>Contrôle</h3>
<ul>
  <li>App <strong>Elgato Control Center</strong> (Mac & Windows) + WiFi 2.4GHz</li>
  <li>Compatible <strong>Elgato Stream Deck</strong></li>
</ul>
<h3>Support</h3>
<ul>
  <li>Bras articulé aluminium inclus — fixation bureau (serre-joint)</li>
  <li>Angle orientable 360° — alimentation secteur 45W</li>
</ul>`,
  },

  {
    slug: "logitech-brio-4k",
    name: "Logitech Brio 4K — Webcam 4K HDR USB-C",
    categorySlug: "bureau-productivite",
    price: 199.99, comparePrice: 249.99,
    affiliateUrl: amz("B01N5UOYC4"),
    images: [
      "https://m.media-amazon.com/images/I/61E2N2+JGnL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61YD-gSnoTL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71z5K1JVTBL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61s8zEDkqPL._AC_SL1500_.jpg",
    ],
    shortDescription: "La webcam de référence absolue. 4K Ultra HD HDR, correction automatique lumière RightLight 3, Windows Hello, 3 champs de vision. Standard des professionnels.",
    description: `<h2>Logitech Brio 4K — Fiche technique</h2>
<p>La <strong>Logitech Brio</strong> produit une image nette et bien exposée <strong>quelle que soit la lumière</strong> — même à contre-jour devant une fenêtre.</p>
<h3>Image</h3>
<ul>
  <li>Résolution max : <strong>4K Ultra HD (4096 x 2160) à 30fps</strong></li>
  <li>1080P à <strong>60fps</strong> + <strong>HDR</strong></li>
  <li>Technologie <strong>RightLight 3</strong> : correction automatique contre-jour</li>
</ul>
<h3>Champs de vision</h3>
<ul>
  <li><strong>65°, 78° ou 90°</strong> — sélectionnable dans Logi Tune</li>
</ul>
<h3>Windows Hello</h3>
<ul>
  <li>Caméra infrarouge intégrée — authentification faciale en 1 seconde</li>
</ul>
<h3>Compatibilité</h3>
<ul>
  <li>Zoom, Teams, Google Meet, OBS, Streamlabs</li>
  <li>Câble USB-A + adaptateur USB-C inclus</li>
</ul>`,
  },

  {
    slug: "herman-miller-aeron",
    name: "Herman Miller Aeron — Chaise Ergonomique Taille B",
    categorySlug: "bureau-productivite",
    price: 1299.99, comparePrice: 1499.99,
    affiliateUrl: amz("B00MLSS1SW"),
    images: [
      "https://m.media-amazon.com/images/I/81RSpPGT2wL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81nJMRoUmKL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71l9LLlVYTL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71VQpRtL+LL._AC_SL1500_.jpg",
    ],
    shortDescription: "La chaise de bureau #1 mondiale. PostureFit SL, matière 8Z Pellicle aérée, 8 réglages, garantie 12 ans. Un investissement qui se rentabilise en quelques semaines.",
    description: `<h2>Herman Miller Aeron Taille B — Fiche technique</h2>
<p>La <strong>Herman Miller Aeron</strong> est la chaise recommandée par les médecins du travail et ergonomes. Elle équipe Google, Apple, Twitter et les grandes entreprises tech.</p>
<h3>Tailles</h3>
<ul>
  <li>Taille A : &lt; 1m65, &lt; 68kg</li>
  <li><strong>Taille B (ce modèle)</strong> : 1m65-1m85, 68-104kg — <strong>la plus vendue</strong></li>
  <li>Taille C : &gt; 1m85, &gt; 104kg</li>
</ul>
<h3>PostureFit SL</h3>
<ul>
  <li>Support sacrum ET lombaire indépendamment réglable</li>
  <li>Maintient la courbure naturelle de la colonne</li>
</ul>
<h3>Matière 8Z Pellicle</h3>
<ul>
  <li>Tissu maillé respirant — <strong>8 zones de tension différente</strong></li>
  <li>Aucune surchauffe — air circulant en permanence</li>
</ul>
<h3>8 points de réglage + Garantie</h3>
<ul>
  <li>Hauteur siège, inclinaison dossier, accoudoirs (hauteur + orientation), profondeur, PostureFit SL</li>
  <li><strong>Garantie 12 ans</strong> — Durée de vie estimée : <strong>15-20 ans</strong> — Recyclable 91%</li>
</ul>`,
  },
];

async function main() {
  console.log("Nettoyage DB complète...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.trendScore.deleteMany();
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
  let count = 0;
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
        featured: count < 8,
        cost: 0,
        stock: 999,
        trendScore: 85 + Math.floor(Math.random() * 15),
        categoryId: category.id,
        images: { create: p.images.map((url, i) => ({ url, alt: p.name, position: i })) }
      }
    });
    console.log(`  ✓ ${p.name} (${p.images.length} images)`);
    count++;
  }
  console.log(`\n✅ ${count} produits créés avec ${count * 4}+ images`);
}

main()
  .catch(e => { console.error("ERREUR:", e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
