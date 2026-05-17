import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Newsletter from "@/components/ui/Newsletter";

interface Props {
  params: { slug: string };
}

const articles: Record<string, {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  dateIso: string;
  content: string[];
}> = {
  "art-du-detail-maison-vellio": {
    title: "L'art du détail dans une maison contemporaine",
    excerpt: "Comment quelques objets bien choisis peuvent transformer la perception d'un intérieur sans le surcharger.",
    image: "https://images.pexels.com/photos/10736999/pexels-photo-10736999.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Maison",
    readTime: "5 min",
    date: "17 mai 2026",
    dateIso: "2026-05-17",
    content: [
      "Un intérieur premium ne dépend pas du nombre d'objets qu'il contient. Il dépend de la qualité des gestes qu'il permet. Une lampe bien proportionnée, un organiseur discret, une station de charge nette : ces pièces changent l'atmosphère parce qu'elles retirent du bruit.",
      "Chez Vellio, la sélection commence par une question simple : l'objet rend-il le quotidien plus clair ? Si la réponse est oui, nous regardons ensuite la ligne, la matière, l'usage réel et la capacité de la pièce à rester élégante dans le temps.",
      "Le luxe moderne est silencieux. Il n'a pas besoin de signaler sa valeur par l'excès. Il se reconnaît dans la précision, la stabilité, l'évidence du geste.",
    ],
  },
  "tech-signature-sans-bruit-visuel": {
    title: "La tech signature : utile, sobre, presque invisible",
    excerpt: "Les accessoires technologiques premium doivent simplifier le quotidien sans imposer leur présence.",
    image: "https://images.pexels.com/photos/9741343/pexels-photo-9741343.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Tech",
    readTime: "4 min",
    date: "16 mai 2026",
    dateIso: "2026-05-16",
    content: [
      "La technologie premium ne cherche pas l'effet. Elle clarifie. Elle charge mieux, range mieux, éclaire mieux, connecte mieux. Et surtout, elle disparaît visuellement une fois intégrée dans l'espace.",
      "Un bon accessoire tech doit avoir trois qualités : une fonction évidente, une finition calme et une compatibilité suffisamment large pour durer. Les objets trop démonstratifs vieillissent vite ; les objets précis restent.",
      "C'est cette ligne que nous privilégions dans la collection Tech Signature : aluminium, graphite, gestes simples et formats compacts.",
    ],
  },
  "cadeaux-haut-de-gamme-utiles": {
    title: "Offrir utile sans perdre l'émotion",
    excerpt: "Une bonne pièce cadeau conjugue usage réel, finition soignée et récit suffisamment personnel.",
    image: "https://images.pexels.com/photos/9775357/pexels-photo-9775357.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Cadeau",
    readTime: "6 min",
    date: "15 mai 2026",
    dateIso: "2026-05-15",
    content: [
      "Le cadeau idéal n'est pas seulement beau. Il trouve une place dans la vie de la personne qui le reçoit. C'est pour cela que les objets utiles, lorsqu'ils sont bien dessinés, peuvent être plus mémorables que les cadeaux purement décoratifs.",
      "La sélection Vellio privilégie les pièces qui portent un usage clair : organiser, éclairer, accompagner un rituel, simplifier un déplacement, améliorer un espace de travail.",
      "L'émotion vient du choix juste. Une pièce bien choisie dit : j'ai remarqué ton rythme, tes gestes, ton quotidien.",
    ],
  },
  "rituels-beaute-minimalistes": {
    title: "Rituels beauté minimalistes, gestes précis",
    excerpt: "La beauté premium n'est pas l'accumulation : c'est le choix du bon geste, au bon moment.",
    image: "https://images.pexels.com/photos/28255125/pexels-photo-28255125.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Beauté",
    readTime: "4 min",
    date: "14 mai 2026",
    dateIso: "2026-05-14",
    content: [
      "Un rituel de beauté contemporain doit rester lisible. Trop de produits, trop d'étapes, trop de promesses : le geste perd sa force. Les pièces que nous retenons doivent au contraire apporter de la précision.",
      "Lumière douce, contact agréable, format stable, entretien simple : ces critères comptent autant que la performance annoncée. Une belle routine est celle que l'on répète sans effort.",
      "Dans l'univers Beauté Architecturée, Vellio choisit des objets qui rendent le soin plus calme et plus intentionnel.",
    ],
  },

  // ─── Articles SEO buying-intent ───────────────────────────────────────────

  "meilleurs-cadeaux-homme-originaux-2026": {
    title: "Meilleurs cadeaux originaux pour homme en 2026 — sélection premium",
    excerpt: "Trouver un cadeau original pour homme est un art. Voici une sélection d'objets utiles, premium et mémorables pour tous les budgets.",
    image: "https://images.pexels.com/photos/9775357/pexels-photo-9775357.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Cadeau",
    readTime: "7 min",
    date: "17 mai 2026",
    dateIso: "2026-05-17",
    content: [
      "Un bon cadeau pour homme ne s'improvise pas. Il requiert de la précision : connaître ses gestes quotidiens, ses espaces de vie, ses rituels. Ce n'est pas une question de budget — c'est une question de pertinence.",
      "En 2026, les objets qui marquent sont ceux qui conjuguent usage réel et ligne sobre. Pas d'accumulation, pas d'effet de mode éphémère. Les accessoires tech bien dessinés, les pièces de bureau premium, les objets de soin minimalistes : voilà les catégories qui fonctionnent.",
      "Pour un budget entre 30 et 80 €, les accessoires mobilité — chargeurs magnétiques, étuis cuir, supports nomades — se distinguent par leur polyvalence. Pour un cadeau plus marquant au-delà de 80 €, les écouteurs à réduction de bruit, les montres épurées ou les ensembles de bureau design constituent des choix qui durent.",
      "Chez Vellio, chaque pièce de notre sélection cadeaux a été choisie selon trois critères : un usage quotidien évident, une finition qui vieilli bien et un format compatible avec un mode de vie actif. Pas de gadgets. Des objets.",
      "Le vrai luxe, c'est d'offrir quelque chose que la personne utilisera chaque jour. C'est ça, un cadeau mémorable.",
    ],
  },

  "accessoires-bureau-design-premium-teletravail": {
    title: "Accessoires bureau design premium : équiper son espace de télétravail en 2026",
    excerpt: "Un bureau bien équipé améliore la concentration, le confort et l'image professionnelle. Sélection d'accessoires premium pour le télétravail moderne.",
    image: "https://images.pexels.com/photos/9741343/pexels-photo-9741343.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Tech",
    readTime: "6 min",
    date: "16 mai 2026",
    dateIso: "2026-05-16",
    content: [
      "Le bureau à domicile est devenu un espace stratégique. En 2026, il ne suffit plus de poser un ordinateur sur une table : l'espace de travail doit être pensé pour soutenir la concentration, refléter une image professionnelle en visioconférence et rester visuellement calme.",
      "Les accessoires qui font la différence ne sont pas nécessairement les plus coûteux. Un support d'écran réglable en aluminium, un organiseur de câbles bien conçu, un éclairage à température réglable et un repose-poignet ergonomique suffisent à transformer un espace ordinaire en espace de travail premium.",
      "La règle Vellio pour un bureau bien équipé : chaque objet doit avoir une fonction précise et ne jamais gêner visuellement. On élimine ce qui traîne, on choisit des formats compacts, on uniformise les matières (aluminium, cuir, bois). Le résultat est immédiat.",
      "Pour le câble management, privilégiez les attaches magnétiques et les passes-câbles discrets plutôt que les boîtes plastiques. Pour l'éclairage, une lampe à bras articulé avec température de couleur variable vaut mieux que dix ampoules de bureau. Pour la charge, une station centrale avec ports USB-C et Qi suffit pour la plupart des appareils.",
      "Un bureau design n'est pas un luxe — c'est un investissement dans votre productivité quotidienne.",
    ],
  },

  "objets-design-tendance-maison-2026": {
    title: "Objets design tendance maison 2026 : ce que l'on remarque vraiment",
    excerpt: "Les tendances décoration 2026 font la part belle aux matières naturelles, aux formes sobres et aux objets fonctionnels. Notre sélection éditoriale.",
    image: "https://images.pexels.com/photos/10736999/pexels-photo-10736999.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Maison",
    readTime: "5 min",
    date: "15 mai 2026",
    dateIso: "2026-05-15",
    content: [
      "En 2026, les intérieurs qui retiennent l'attention ne cherchent pas à impressionner. Ils cherchent à calmer. Les tendances décoration de cette année confirment un mouvement de fond : moins d'accumulation, plus d'intention dans chaque pièce choisie.",
      "Trois directions dominent cette année. La première : les matières naturelles (bambou, céramique, lin) associées à des formes géométriques simples. La deuxième : les objets hybrides, à la fois fonctionnels et décoratifs — diffuseurs, organiseurs, éclairages qui sont des sculptures. La troisième : le retour de la couleur, mais utilisée avec parcimonie, sur un ou deux points de l'espace.",
      "Dans la sélection Vellio, nous avons retenu les pièces qui répondent à ces trois critères simultanément. Un diffuseur en céramique blanche remplace dix bougies sans cohérence. Une lampe bambou-laiton remplace un luminaire quelconque. Un plateau d'organisation en cuir remplace la pile de documents.",
      "Le bon objet design de 2026 est celui que l'on regarde et que l'on utilise. Pas celui que l'on photographie une fois puis que l'on oublie dans un coin.",
    ],
  },

  "meilleurs-gadgets-tech-2026": {
    title: "Meilleurs gadgets tech 2026 : 10 objets qui valent vraiment leur prix",
    excerpt: "Quels gadgets tech acheter en 2026 ? Notre sélection des objets technologiques vraiment utiles, testés selon des critères exigeants.",
    image: "https://images.pexels.com/photos/9741343/pexels-photo-9741343.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Tech",
    readTime: "6 min",
    date: "18 mai 2026",
    dateIso: "2026-05-18",
    content: [
      "En 2026, les gadgets tech se divisent en deux catégories : ceux qui finissent dans un tiroir et ceux qui s'intègrent définitivement dans votre quotidien. La différence tient rarement au prix — elle tient à la pertinence du geste qu'ils permettent.",
      "Les chargeurs sans fil magnétiques ont mûri. Les dernières générations offrent une puissance de 15W avec détection de position automatique, compatibles iPhone et Android. Ils remplacent avantageusement les câbles enchevêtrés sur le bureau ou la table de chevet.",
      "Les mini-projecteurs portables ont également franchi un seuil de qualité. Certains modèles de poche (moins de 400g) projettent désormais en Full HD avec une autonomie de 2 heures — suffisant pour une réunion en déplacement ou une soirée improvisée.",
      "Dans la catégorie 'petit budget, grand impact' : les organiseurs de câbles magnétiques, les bonnettes de microphone pour smartphone (pour les contenus vidéo), et les supports téléphone à bras réglable restent indétrônables rapport qualité/usage.",
      "Notre règle : si un gadget ne simplifie pas au moins deux gestes de votre journée, il ne mérite pas sa place. Cette sélection Vellio ne retient que les objets qui passent ce test.",
    ],
  },

  "cadeau-noel-original-2026": {
    title: "Cadeau Noël original 2026 : idées premium pour éviter le générique",
    excerpt: "Préparez Noël 2026 avec une sélection de cadeaux originaux et haut de gamme. Des objets qui marquent, pour tous les profils et tous les budgets.",
    image: "https://images.pexels.com/photos/9775357/pexels-photo-9775357.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Cadeau",
    readTime: "7 min",
    date: "17 mai 2026",
    dateIso: "2026-05-17",
    content: [
      "Les cadeaux de Noël génériques ont une durée de vie courte dans la mémoire de ceux qui les reçoivent. Un cadeau qui marque, c'est un objet que l'on utilise encore six mois après les fêtes. En 2026, les tendances cadeau premium pointent vers trois catégories : la tech sobre, les objets maison design et les rituels de soin minimalistes.",
      "Pour moins de 50 € : les accessoires nomades (câbles premium, cartes de recharge solaire, étuis anti-RFID en cuir) sont des valeurs sûres. Élégants, pratiques, bien emballés, ils fonctionnent pour tous les profils et ne prennent pas de place.",
      "Entre 50 et 100 € : les stations de charge compactes multi-appareils, les montres minimalistes, les carnets cuir premium ou les ensembles d'aromathérapie design atteignent le bon équilibre entre émotion et usage. Ce sont les cadeaux que l'on peut personnaliser visuellement avec le bon packaging.",
      "Au-delà de 100 € : les écouteurs true wireless, les projetteurs portables ou les kits de bureau complets (avec support, organiseur et éclairage coordonnés) constituent des cadeaux dont on se souvient. L'investissement est réel, mais l'impact l'est aussi.",
      "La règle Vellio pour Noël : achetez un objet que la personne n'achèterait pas pour elle-même, mais dont elle comprendra immédiatement la valeur. L'écart entre 'je n'aurais pas pensé à ça' et 'c'est exactement ce qu'il me fallait' — c'est ça, le cadeau parfait.",
    ],
  },

  "idee-cadeau-anniversaire-original-femme": {
    title: "Idée cadeau anniversaire original pour femme : 12 pièces qui marquent",
    excerpt: "Des cadeaux d'anniversaire originaux et premium pour femme : objets de soin, accessoires maison et tech lifestyle sélectionnés avec soin.",
    image: "https://images.pexels.com/photos/28255125/pexels-photo-28255125.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    category: "Cadeau",
    readTime: "6 min",
    date: "14 mai 2026",
    dateIso: "2026-05-14",
    content: [
      "Trouver le bon cadeau d'anniversaire pour une femme demande d'aller au-delà des catégories habituelles. Les fleurs s'oublient, les bons d'achat manquent d'intention. Ce qui marque, c'est un objet qui dit : j'ai réfléchi à toi, à ta vie, à ce qui te facilite ou embellit le quotidien.",
      "Les catégories qui fonctionnent le mieux : les rituels de soin (diffuseurs, bougies de qualité, masques premium), les accessoires lifestyle (porte-clés élégants, étuis design, trousses cuir), et les objets maison qui combinent esthétique et usage réel.",
      "Pour un cadeau entre 30 et 60 € : une bougie artisanale associée à un porte-vaporisateur en céramique, un carnet en cuir grainé avec stylo coordonné, ou encore un diffuseur d'huiles essentielles au design épuré font des cadeaux mémorables à ce budget.",
      "Pour un cadeau au-delà de 60 € : un écouteur sans fil à réduction de bruit, une montre minimaliste ou un ensemble soin premium (sérum + contenant nomade + trousse) atteignent ce point d'équilibre parfait entre utilité et désir.",
      "La règle d'or : choisissez un objet que la personne n'achèterait pas forcément pour elle-même, mais qui correspond exactement à sa sensibilité. C'est ce décalage généreux qui rend un cadeau inoubliable.",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles[params.slug];
  if (!article) return { title: "Article introuvable" };
  return {
    title: `${article.title} — Journal Vellio`,
    description: article.excerpt,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/blog/${params.slug}`,
      publishedTime: article.dateIso,
      authors: ["Vellio"],
      images: [{ url: article.image, width: 1400, height: 900, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = articles[params.slug];
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.dateIso,
    dateModified: article.dateIso,
    author: { "@type": "Organization", name: "Vellio", url: "https://vellio.fr" },
    publisher: {
      "@type": "Organization",
      name: "Vellio",
      logo: { "@type": "ImageObject", url: "https://vellio.fr/opengraph-image.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://vellio.fr/blog/${params.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <div className="bg-brand-ivory">
        <Container className="py-10 sm:py-16">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand/55 transition-colors hover:text-brand">
            <ArrowLeft className="h-4 w-4" />
            Journal
          </Link>

          <div className="mx-auto max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-accent">{article.category}</p>
            <h1 className="mt-4 text-balance font-serif text-5xl font-semibold leading-[0.92] text-brand sm:text-7xl">{article.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-brand/62">{article.excerpt}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.18em] text-brand/38">{article.date} · {article.readTime}</p>
          </div>

          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-card">
            <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" priority />
          </div>

          <article className="mx-auto mt-12 max-w-3xl space-y-7 text-base leading-8 text-brand/68">
            {article.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </article>

          {/* CTA inline */}
          <div className="mx-auto mt-12 max-w-3xl rounded-[1.5rem] border border-brand-accent/25 bg-white/70 p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-accent">Collection Vellio</p>
            <p className="mt-3 font-serif text-2xl font-semibold text-brand">Trouvez la pièce qui correspond à cet article.</p>
            <p className="mt-2 text-sm leading-6 text-brand/55">Livraison offerte dès 50€ · Retours 30 jours · Paiement sécurisé Stripe.</p>
            <Link href="/produits" className="btn-primary mt-5 inline-flex">
              Voir la collection →
            </Link>
          </div>
        </Container>
        <Newsletter />
      </div>
    </>
  );
}
