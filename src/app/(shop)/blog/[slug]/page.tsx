import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, Clock, TrendingUp, Flame } from "lucide-react";

interface Props { params: { slug: string } }

const articles: Record<string, {
  title: string; excerpt: string; image: string; category: string;
  readTime: string; date: string; content: string;
}> = {
  "produits-tiktok-tendance-2025": {
    title: "Les 10 produits TikTok qui cartonnent en 2025",
    excerpt: "Notre IA a analysé 50 millions de vidéos TikTok pour identifier les produits avec le plus fort potentiel viral.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
    category: "Analyse IA", readTime: "4 min", date: "15 mai 2025",
    content: `TikTok est devenu le moteur numéro 1 de découverte de produits. Notre algorithme analyse en continu les hashtags #TikTokMadeMeBuyIt, #ProductReview et #Unboxing pour détecter les tendances avant qu'elles n'explosent.

**Comment fonctionne notre analyse ?**

Chaque produit est noté selon 8 critères : volume de vues, vitesse de croissance, mentions dans les commentaires, taux d'engagement, comparaison des prix fournisseurs, marge potentielle, niveau de concurrence et potentiel de retour.

**Les catégories qui cartonnent en 2025 :**

1. **Gadgets auto** — La caméra de recul sans fil reste en tête depuis 3 mois. Score viral : 92/100.
2. **Maison intelligente** — Les prises connectées explosent avec la hausse des prix de l'électricité.
3. **Bien-être** — Masseurs, lampes de luminothérapie et purificateurs d'air dominent.
4. **Cuisine** — Tout ce qui fait gagner du temps en cuisine cartonne systématiquement.
5. **Sport & fitness** — Les produits de récupération musculaire sont en forte hausse.

**Pourquoi Vellio est en avance ?**

Notre IA détecte les tendances 2 à 4 semaines avant qu'elles ne deviennent mainstream. C'est la fenêtre idéale pour acheter : le produit est déjà prouvé, mais la concurrence n'est pas encore saturée.`,
  },
  "gadgets-maison-intelligente-guide": {
    title: "Maison intelligente : les gadgets indispensables à moins de 50€",
    excerpt: "Smart home accessible à tous. Les meilleurs produits connectés pour transformer votre intérieur.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    category: "Maison", readTime: "6 min", date: "12 mai 2025",
    content: `La domotique n'est plus réservée aux maisons de luxe. Pour moins de 50€ par produit, vous pouvez transformer votre logement en véritable maison intelligente.

**Les essentiels de la maison connectée :**

**1. La prise intelligente — à partir de 15€**
C'est le point d'entrée idéal. Branchez n'importe quel appareil et contrôlez-le depuis votre téléphone. En bonus : mesure de consommation électrique en temps réel.

**2. L'ampoule connectée — à partir de 8€**
Scènes lumineuses, ambiances personnalisées, minuterie automatique. Compatible Google Home et Alexa. L'investissement le plus visible.

**3. Le purificateur d'air — à partir de 35€**
Avec la qualité de l'air en ville, c'est devenu indispensable. Les modèles HEPA filtrent 99.7% des particules fines.

**4. Le détecteur de fumée connecté — à partir de 25€**
Alerte en temps réel sur votre smartphone même quand vous êtes absent. Obligatoire légalement en France depuis 2015.

**Compatibilité : le piège à éviter**

Avant d'acheter, vérifiez la compatibilité avec votre assistant vocal. La majorité des produits Vellio sont compatibles Google Home, Amazon Alexa ET Apple HomeKit.`,
  },
  "comment-repérer-produit-tendance": {
    title: "Comment repérer un produit tendance avant tout le monde",
    excerpt: "Méthode en 5 étapes pour identifier les produits qui vont exploser avant que la concurrence ne s'en empare.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    category: "Conseils", readTime: "5 min", date: "8 mai 2025",
    content: `Repérer une tendance tôt, c'est la différence entre un produit star et un produit noyé dans la concurrence.

**Étape 1 : Surveiller TikTok Creative Center**
TikTok publie ses données de tendances en open data. Filtrez par pays et catégorie pour voir quels hashtags explosent cette semaine.

**Étape 2 : Google Trends en mode comparaison**
Comparez votre produit cible avec un produit de référence. Une courbe qui monte régulièrement depuis 2-3 semaines = signal fort.

**Étape 3 : Analyser les reviews Amazon**
Les produits qui passent de 50 à 500 avis en un mois sont des indicateurs de demande réelle. Outils utiles : Jungle Scout, Helium 10.

**Étape 4 : Checker les marges fournisseur**
Un bon produit tendance doit avoir au moins 3x de marge (coût x3 = prix de vente minimum). En dessous, le ROI publicitaire sera trop faible.

**Étape 5 : Évaluer le potentiel de contenu**
Le produit se filme bien ? Génère-t-il un effet "wow" en 3 secondes ? Si oui, il est fait pour TikTok et Reels.

**Ce que fait Vellio pour vous**

Nous automatisons toutes ces étapes. Notre score de 0 à 100 intègre ces 5 critères + 3 autres (saisonnalité, risque produit, SEO). Vous n'avez qu'à commander.`,
  },
  "accessoires-voiture-utiles": {
    title: "7 accessoires voiture ultra-pratiques pour les longs trajets",
    excerpt: "Road trip en vue ? Ces gadgets auto vont changer votre expérience de conduite.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
    category: "Auto", readTime: "3 min", date: "5 mai 2025",
    content: `Les longs trajets peuvent vite devenir éprouvants. Ces 7 gadgets ont transformé notre expérience de conduite.

**1. Caméra de recul sans fil** — Plus de stress pour se garer, même dans les parkings les plus serrés.

**2. Support téléphone magnétique** — Pour ne plus avoir le téléphone qui glisse au freinage. Fixation en 1 seconde.

**3. Purificateur d'air voiture** — Surtout pour les trajets avec des enfants ou des personnes allergiques.

**4. Chargeur voiture USB-C 65W** — Charge rapide pour tous vos appareils simultanément.

**5. Coussin lombaire** — Indispensable pour les trajets de plus de 2h. Réduit significativement les douleurs de dos.

**6. Organiseur de coffre** — Fin le chaos dans le coffre. Compartiments ajustables pour tout ranger.

**7. Lampe UV portable** — Vérifiez la propreté de l'habitacle et des surfaces de contact.`,
  },
  "score-tendance-explication": {
    title: "Comment fonctionne notre score de tendance ?",
    excerpt: "Le score Vellio note chaque produit de 0 à 100 selon 8 critères.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    category: "À propos", readTime: "4 min", date: "1 mai 2025",
    content: `Le score de tendance Vellio est calculé par notre algorithme propriétaire. Voici comment il fonctionne.

**Les 8 critères du score (pondérés)**

| Critère | Poids | Source |
|---------|-------|--------|
| Popularité TikTok | 25% | TikTok API + scraping |
| Potentiel viral | 20% | Engagement rate / vues |
| Volume recherche | 15% | Google Trends + SEMrush |
| Marge fournisseur | 15% | AliExpress + Alibaba |
| Score SEO | 10% | Densité de mots-clés |
| Saisonnalité | 8% | Données historiques |
| Niveau concurrence | 5% | Amazon BSR |
| Risque produit | 2% | Signalements SAV |

**Score 90-100 : Produit viral actif**
Le produit explose en ce moment. Fenêtre d'achat idéale : maintenant.

**Score 70-89 : Tendance forte**
Montée régulière. Bon moment pour commander avant la saturation.

**Score 50-69 : Produit stable**
Demande constante, peu de risque. Moins de croissance explosive.

**Mise à jour du score**
Notre IA recalcule le score toutes les 24h. Un produit peut passer de 65 à 88 en une semaine si une vidéo virale le propulse.`,
  },
  "cuisine-gadgets-gain-de-temps": {
    title: "5 gadgets cuisine pour gagner 30 minutes par jour",
    excerpt: "Meal prep, batch cooking — ces outils ont révolutionné notre cuisine.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    category: "Cuisine", readTime: "3 min", date: "28 avr. 2025",
    content: `Si vous préparez vos repas chaque semaine, ces 5 gadgets vont vous faire gagner du temps précieux.

**1. La trancheuse mandoline réglable**
Tranches ultra-fines et régulières en quelques secondes. Indispensable pour les salades et gratins.

**2. La balance de cuisine USB-C**
Précision au gramme pour les régimes et la pâtisserie. Plus de piles — rechargeable comme votre téléphone.

**3. Le blender portable 500ml**
Smoothie prêt en 30 secondes, directement dans la bouteille. À emporter au bureau.

**4. La spiralitrice de légumes**
Transformez courgettes et carottes en "pâtes" sans gluten. Incroyablement populaire pour les régimes healthy.

**5. Le couteau électrique**
Pour découper viandes et pains avec une précision chirurgicale. 3x plus rapide que le couteau classique.

**Mon combo gagnant pour le meal prep du dimanche**
Balance + spiralitrice + blender = 1h de préparation pour toute la semaine. L'investissement total : moins de 80€.`,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles[params.slug];
  if (!article) return { title: "Article introuvable" };
  return { title: `${article.title} — Blog Vellio`, description: article.excerpt };
}

export default function ArticlePage({ params }: Props) {
  const article = articles[params.slug];
  if (!article) notFound();

  const content = article.content.split("\n\n");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/blog" className="flex items-center gap-1 hover:text-brand transition-colors">
          <ArrowLeft className="w-4 h-4" /> Blog
        </Link>
        <span>/</span>
        <span className="text-brand font-medium">{article.category}</span>
      </div>

      {/* Hero image */}
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
        <Image src={article.image} alt={article.title} fill className="object-cover" />
        <span className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full">
          {article.category}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readTime} de lecture</span>
        <span>{article.date}</span>
        <span className="flex items-center gap-1 text-brand-accent"><Flame className="w-4 h-4" /> Vellio Blog</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-brand mb-4 leading-tight">{article.title}</h1>
      <p className="text-gray-500 text-lg mb-10 border-l-4 border-brand-accent pl-4">{article.excerpt}</p>

      {/* Content */}
      <div className="prose prose-gray max-w-none space-y-6">
        {content.map((block, i) => {
          if (block.startsWith("**") && block.split("\n").length === 1) {
            return <h2 key={i} className="text-xl font-black text-brand mt-8 mb-3">{block.replace(/\*\*/g, "")}</h2>;
          }
          if (block.includes("**")) {
            return (
              <p key={i} className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{
                __html: block
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\n/g, "<br/>")
              }} />
            );
          }
          return <p key={i} className="text-gray-600 leading-relaxed">{block}</p>;
        })}
      </div>

      {/* CTA */}
      <div className="mt-14 bg-gradient-to-br from-brand to-brand-light rounded-2xl p-8 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-brand-accent" />
          <span className="font-bold">Passez à l'action</span>
        </div>
        <h3 className="text-2xl font-black mb-2">Découvrez les produits tendance</h3>
        <p className="text-white/70 mb-6 text-sm">Sélectionnés par notre IA, disponibles maintenant avec livraison suivie.</p>
        <Link href="/produits" className="inline-block bg-brand-accent text-white font-bold px-8 py-3 rounded-xl hover:bg-opacity-90 transition-colors">
          Voir le catalogue →
        </Link>
      </div>
    </div>
  );
}
