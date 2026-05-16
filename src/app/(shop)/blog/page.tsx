export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Flame, TrendingUp, ArrowRight, Zap, Star } from "lucide-react";
import { formatPrice, getTrendLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog Tendances — Vellio",
  description: "Découvrez les tendances produits détectées par notre IA. Analyse TikTok, Google Trends et conseils dropshipping.",
};

const articles = [
  {
    slug: "produits-tiktok-tendance-2025",
    title: "Les 10 produits TikTok qui cartonnent en 2025",
    excerpt: "Notre IA a analysé 50 millions de vidéos TikTok pour identifier les produits avec le plus fort potentiel viral. Voici le top 10.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    category: "Analyse IA",
    readTime: "4 min",
    date: "15 mai 2025",
  },
  {
    slug: "gadgets-maison-intelligente-guide",
    title: "Maison intelligente : les gadgets indispensables à moins de 50€",
    excerpt: "Smart home accessible à tous. On a sélectionné les meilleurs produits connectés pour transformer votre intérieur sans exploser votre budget.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Maison",
    readTime: "6 min",
    date: "12 mai 2025",
  },
  {
    slug: "comment-repérer-produit-tendance",
    title: "Comment repérer un produit tendance avant tout le monde",
    excerpt: "Méthode en 5 étapes pour identifier les produits qui vont exploser — avant que la concurrence ne s'en empare. Notre algorithme vous aide.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    category: "Conseils",
    readTime: "5 min",
    date: "8 mai 2025",
  },
  {
    slug: "accessoires-voiture-utiles",
    title: "7 accessoires voiture ultra-pratiques pour les longs trajets",
    excerpt: "Road trip en vue ? Ces gadgets auto vont changer votre expérience de conduite. Testés et approuvés par notre équipe.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    category: "Auto",
    readTime: "3 min",
    date: "5 mai 2025",
  },
  {
    slug: "score-tendance-explication",
    title: "Comment fonctionne notre score de tendance ?",
    excerpt: "Le score Vellio note chaque produit de 0 à 100 selon 8 critères : popularité TikTok, volume de recherche, marge fournisseur, etc.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "À propos",
    readTime: "4 min",
    date: "1 mai 2025",
  },
  {
    slug: "cuisine-gadgets-gain-de-temps",
    title: "5 gadgets cuisine pour gagner 30 minutes par jour",
    excerpt: "Meal prep, batch cooking, préparation rapide — ces outils ont révolutionné notre cuisine. À moins de 25€ chacun.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    category: "Cuisine",
    readTime: "3 min",
    date: "28 avr. 2025",
  },
];

const tips = [
  { icon: Flame, text: "Score 80+ : produit viral en cours" },
  { icon: TrendingUp, text: "Score 60-79 : tendance montante" },
  { icon: Star, text: "Score <60 : produit stable" },
];

export default async function BlogPage() {
  const trending = await prisma.product.findMany({
    where: { published: true, trendScore: { gte: 75 } },
    orderBy: { trendScore: "desc" },
    take: 4,
    include: { images: { take: 1 } },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Zap className="w-4 h-4" /> Powered by IA
        </div>
        <h1 className="text-4xl font-black text-brand mb-3">Blog Tendances</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Analyses, conseils et décryptages des produits qui cartonnent — mis à jour chaque semaine par notre IA.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Articles */}
        <div className="lg:col-span-2">
          {/* Featured article */}
          <Link href={`/blog/${articles[0].slug}`} className="group block card overflow-hidden hover:shadow-lg transition-all duration-300 mb-8">
            <div className="relative aspect-video overflow-hidden">
              <Image src={articles[0].image} alt={articles[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                {articles[0].category}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                <span>{articles[0].date}</span>
                <span>·</span>
                <span>{articles[0].readTime} de lecture</span>
              </div>
              <h2 className="text-xl font-black text-brand mb-2 group-hover:text-primary-600 transition-colors">
                {articles[0].title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{articles[0].excerpt}</p>
              <span className="text-primary-600 text-sm font-semibold flex items-center gap-1">
                Lire l'article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Grid articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {articles.slice(1).map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group card overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-white/90 text-brand text-xs font-bold px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-brand text-sm leading-snug mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Score guide */}
          <div className="card p-5">
            <h3 className="font-bold text-brand mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-accent" /> Comprendre le score
            </h3>
            <div className="space-y-3">
              {tips.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-orange-500" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Top trending products */}
          {trending.length > 0 && (
            <div className="card p-5">
              <h3 className="font-bold text-brand mb-4 flex items-center gap-2">
                <Flame className="w-4 h-4 text-brand-accent" /> En ce moment
              </h3>
              <div className="space-y-3">
                {trending.map((p, i) => (
                  <Link
                    key={p.id}
                    href={`/produits/${p.slug}`}
                    className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 -m-2 transition-colors"
                  >
                    <span className="text-2xl font-black text-gray-100 w-6 text-center">#{i + 1}</span>
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      {p.images[0] && (
                        <Image src={p.images[0].url} alt={p.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-brand line-clamp-2 leading-snug">{p.name}</p>
                      <p className="text-brand-accent text-xs font-bold mt-0.5">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/produits" className="btn-primary w-full text-center text-sm mt-4 block">
                Voir tout le catalogue
              </Link>
            </div>
          )}

          {/* Newsletter */}
          <div className="card p-5 bg-gradient-to-br from-brand to-brand-light text-white">
            <h3 className="font-bold mb-2">Newsletter tendances</h3>
            <p className="text-white/70 text-xs mb-4">Top 5 produits chaque semaine. Gratuit.</p>
            <input
              type="email"
              placeholder="votre@email.fr"
              className="w-full rounded-xl px-4 py-2.5 text-sm text-brand bg-white mb-3 outline-none"
            />
            <button className="w-full bg-brand-accent text-white text-sm font-bold py-2.5 rounded-xl hover:bg-opacity-90 transition-colors">
              S'inscrire
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
