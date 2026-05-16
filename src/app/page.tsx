export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { Zap, TrendingUp, Shield, Truck, RotateCcw, Star, ArrowRight, Flame, Bot, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";
import Hero from "@/components/home/Hero";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Product } from "@/types";

const CATEGORY_ICONS: Record<string, string> = {
  "gadgets-voiture": "🚗",
  "maison-intelligente": "🏠",
  "cuisine-pratique": "🍳",
  "sport-fitness": "💪",
  "beaute-soin": "✨",
  "tech-gadgets": "📱",
  "bureau-productivite": "💼",
  "enfant-famille": "👨‍👩‍👧",
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  "gadgets-voiture": "from-blue-500/20 to-sky-300/10",
  "maison-intelligente": "from-emerald-500/20 to-teal-300/10",
  "cuisine-pratique": "from-orange-500/20 to-amber-300/10",
  "sport-fitness": "from-red-500/20 to-pink-300/10",
  "beaute-soin": "from-pink-500/20 to-rose-300/10",
  "tech-gadgets": "from-violet-500/20 to-purple-300/10",
  "bureau-productivite": "from-slate-500/20 to-gray-300/10",
  "enfant-famille": "from-yellow-500/20 to-lime-300/10",
};

const features = [
  { icon: Bot, title: "Sélection IA quotidienne", desc: "Notre algorithme analyse TikTok, Google Trends et les données AliExpress chaque nuit pour trouver les pépites." },
  { icon: Shield, title: "Paiement 100% sécurisé", desc: "Stripe PCI DSS niveau 1 — vos données bancaires ne transitent jamais par nos serveurs." },
  { icon: Truck, title: "Livraison suivie 7-14j", desc: "Chaque commande est expédiée avec un numéro de suivi et assurée jusqu'à votre porte." },
  { icon: RotateCcw, title: "Retours gratuits 30 jours", desc: "Pas satisfait ? On vous rembourse intégralement, sans poser de questions, en 5 jours ouvrés." },
];

const reviews = [
  { name: "Sophie L.", city: "Lyon", comment: "Reçu en 10 jours, emballage soigné et produit exactement comme sur les photos. Je recommande !", stars: 5 },
  { name: "Karim B.", city: "Paris", comment: "Le score de tendance est vraiment fiable, j'ai commandé deux produits déjà vus sur TikTok !", stars: 5 },
  { name: "Marie C.", city: "Bordeaux", comment: "Super service client, j'ai demandé un remboursement et c'était réglé en 3 jours. Chapeau !", stars: 5 },
];

export default async function HomePage() {
  const [featured, categories, trending] = await Promise.all([
    prisma.product.findMany({ where: { published: true }, include: { images: { take: 1, orderBy: { position: "asc" } }, category: true }, orderBy: { trendScore: "desc" }, take: 8 }),
    prisma.category.findMany({ orderBy: { createdAt: "asc" }, take: 8 }),
    prisma.product.findMany({ where: { published: true }, include: { images: { take: 1 } }, orderBy: { trendScore: "desc" }, take: 4 }),
  ]);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <Hero />

        {/* Catégories */}
        {categories.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="section-tag"><Zap className="w-3 h-3" /> Collections</div>
                <h2 className="text-3xl md:text-4xl font-black text-brand">Explorez par catégorie</h2>
              </div>
              <Link href="/produits" className="btn-ghost text-sm hidden sm:flex">
                Tout voir <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categorie/${cat.slug}`}
                  className={`group card-hover p-4 sm:p-5 bg-gradient-to-br ${CATEGORY_GRADIENTS[cat.slug] || "from-gray-100 to-gray-50"} border-0`}
                >
                  <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {CATEGORY_ICONS[cat.slug] || "🛒"}
                  </div>
                  <p className="font-bold text-sm text-gray-800 group-hover:text-primary-700 transition-colors leading-tight">
                    {cat.name}
                  </p>
                  {cat.description && (
                    <p className="text-xs text-gray-500 mt-1 leading-snug line-clamp-2">{cat.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Produits vedette */}
        {featured.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="section-tag"><Bot className="w-3 h-3" /> Sélection IA</div>
                <h2 className="text-3xl md:text-4xl font-black text-brand">Coup de cœur du moment</h2>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Détectés et scorés par notre algorithme de tendances</p>
              </div>
              <Link href="/produits" className="btn-secondary text-sm py-2 px-4 hidden sm:flex">
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link href="/produits" className="btn-secondary text-sm">Voir tout le catalogue →</Link>
            </div>
          </section>
        )}

        {/* Bandeau tendance */}
        {trending.length > 0 && (
          <section className="bg-gradient-brand text-white py-14 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="max-w-md">
                  <div className="flex items-center gap-2 mb-4">
                    <Flame className="w-5 h-5 text-brand-accent" />
                    <span className="text-brand-accent font-bold text-sm uppercase tracking-widest">Top tendances</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-3">
                    Le palmarès IA<br />
                    <span className="text-brand-accent">de cette semaine</span>
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    Classés par score de viralité TikTok, volume de recherche et marge fournisseur en temps réel.
                  </p>
                  <Link href="/produits?filter=top" className="btn-primary text-sm px-6 py-3">
                    Voir tous les tops →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:max-w-xl">
                  {trending.map((product, i) => {
                    const img = product.images?.[0]?.url || "/placeholder.jpg";
                    return (
                      <Link key={product.id} href={`/produits/${product.slug}`}
                        className="flex items-center gap-3 glass rounded-2xl p-3.5 hover:bg-white/20 transition-all group">
                        <span className="text-2xl font-black text-white/20 w-7 text-center flex-shrink-0">#{i + 1}</span>
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                          <Image src={img} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-white transition-colors">{product.name}</p>
                          <p className="text-brand-accent text-sm font-black mt-0.5">{formatPrice(product.price)}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white flex-shrink-0 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pourquoi Vellio */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto"><CheckCircle className="w-3 h-3" /> Nos garanties</div>
            <h2 className="text-3xl md:text-4xl font-black text-brand mb-3">Pourquoi choisir Vellio ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Intelligence artificielle + sourcing rigoureux = les meilleurs produits tendance au meilleur prix.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-brand mb-2 text-sm sm:text-base">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Avis clients */}
        <section className="bg-gradient-to-b from-primary-50/50 to-white py-16 px-4">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <div className="section-tag mx-auto"><Star className="w-3 h-3" /> Avis clients</div>
            <h2 className="text-3xl md:text-4xl font-black text-brand mb-2">Ils adorent Vellio</h2>
            <div className="flex items-center justify-center gap-1.5 text-yellow-400 text-xl">
              {"★★★★★"}
              <span className="text-gray-600 text-base ml-2 font-semibold">4.8/5 — plus de 2 400 avis vérifiés</span>
            </div>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="card p-6 hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center gap-1 text-yellow-400 mb-4 text-sm">
                  {"★".repeat(r.stars)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{r.comment}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-brand">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.city}</p>
                  </div>
                  <span className="ml-auto text-xs text-green-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Vérifié
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary-600 to-brand-accent flex items-center justify-center mx-auto mb-5 shadow-btn-violet">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-brand mb-3">Soyez le premier informé</h2>
          <p className="text-gray-500 mb-8 text-sm sm:text-base">
            Recevez chaque semaine les 5 produits les plus tendance détectés par notre IA, avant qu'ils n'explosent.
          </p>
          <form action="/api/newsletter" method="POST" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" name="email" required placeholder="votre@email.fr" className="input-field flex-1" />
            <button type="submit" className="btn-primary whitespace-nowrap">
              S'inscrire gratuitement
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-3">Pas de spam · Désabonnement en 1 clic · RGPD compliant</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
