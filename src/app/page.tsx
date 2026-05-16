export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { Zap, TrendingUp, Shield, Truck, RotateCcw, Star, ArrowRight, Flame } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, getTrendLabel } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";
import Hero from "@/components/home/Hero";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Product } from "@/types";

async function getFeaturedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { published: true, featured: true },
    include: { images: true, category: true },
    orderBy: { trendScore: "desc" },
    take: 8,
  });
  return products as unknown as Product[];
}

async function getCategories() {
  return prisma.category.findMany({ orderBy: { createdAt: "asc" }, take: 6 });
}

async function getTopTrending(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { published: true },
    include: { images: true, category: true },
    orderBy: { trendScore: "desc" },
    take: 4,
  });
  return products as unknown as Product[];
}

const features = [
  { icon: Zap, title: "Sélection IA quotidienne", desc: "Notre algorithme analyse TikTok, Google Trends et les données AliExpress chaque nuit pour trouver les pépites." },
  { icon: Shield, title: "Paiement 100% sécurisé", desc: "Stripe PCI DSS niveau 1 — vos données bancaires ne transitent jamais par nos serveurs." },
  { icon: Truck, title: "Livraison suivie 7-14j", desc: "Chaque commande est expédiée avec un numéro de suivi et assurée jusqu'à votre porte." },
  { icon: RotateCcw, title: "Retours gratuits 30 jours", desc: "Pas satisfait ? On vous rembourse intégralement, sans poser de questions, en 5 jours ouvrés." },
];

export default async function HomePage() {
  const [featured, categories, trending] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getTopTrending(),
  ]);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <Hero />

        {/* Catégories */}
        {categories.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-brand">Explorez par catégorie</h2>
              <Link href="/produits" className="text-sm font-medium text-primary-600 hover:underline flex items-center gap-1">
                Tout voir <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categorie/${cat.slug}`}
                  className="group card hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center p-4"
                >
                  <div className="aspect-square relative mb-3 rounded-xl overflow-hidden bg-gray-100">
                    {cat.image ? (
                      <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">🛒</div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Produits vedette */}
        {featured.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-brand">Coup de coeur IA</h2>
                <p className="text-gray-500 mt-1">Produits sélectionnés par notre algorithme de tendances</p>
              </div>
              <Link href="/produits?filter=featured" className="btn-secondary text-sm py-2 px-4">
                Voir tout
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Bannière tendance */}
        <section className="bg-gradient-to-r from-brand to-brand-light text-white py-16 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-brand-accent" />
                <span className="text-brand-accent font-bold text-sm uppercase tracking-wide">Score tendance</span>
              </div>
              <h2 className="text-4xl font-black mb-3">Top 4 des tendances du moment</h2>
              <p className="text-white/70 max-w-md">
                Classés par notre IA selon le potentiel viral TikTok, volume de recherche et marge fournisseur.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto md:min-w-96">
              {trending.map((product, i) => {
                const img = product.images?.[0]?.url || "/placeholder.jpg";
                return (
                  <Link
                    key={product.id}
                    href={`/produits/${product.slug}`}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-3 transition-colors"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                      <Image src={img} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold leading-snug line-clamp-2">{product.name}</p>
                      <p className="text-brand-accent text-xs font-bold mt-0.5">{formatPrice(product.price)}</p>
                    </div>
                    <span className="ml-auto text-2xl font-black text-white/20">#{i + 1}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-brand mb-3">Pourquoi choisir Vellio ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Nous combinons intelligence artificielle et sourcing rigoureux pour vous offrir les meilleurs produits tendance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-brand mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social proof */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-black text-brand mb-2">Ils adorent Vellio</h2>
            <div className="flex items-center justify-center gap-1 text-yellow-400 text-xl">
              {"★★★★★"}
              <span className="text-gray-600 text-base ml-2 font-medium">4.8/5 — plus de 2 400 avis vérifiés</span>
            </div>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sophie L.", comment: "Reçu en 10 jours, emballage soigné et produit exactement comme sur les photos. Je recommande !", stars: 5 },
              { name: "Karim B.", comment: "Le score de tendance est vraiment fiable, j'ai commandé deux produits déjà vus sur TikTok quelques jours plus tard !", stars: 5 },
              { name: "Marie C.", comment: "Super service client, j'ai demandé un remboursement et c'était réglé en 3 jours. Chapeau !", stars: 5 },
            ].map((r) => (
              <div key={r.name} className="card p-6">
                <div className="flex items-center gap-1 text-yellow-400 mb-3 text-sm">{"★".repeat(r.stars)}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.comment}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <span className="font-semibold text-sm text-brand">{r.name}</span>
                  <span className="ml-auto text-xs text-green-500 font-medium">✓ Achat vérifié</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-7 h-7 text-brand-accent" />
          </div>
          <h2 className="text-3xl font-black text-brand mb-3">Soyez le premier informé</h2>
          <p className="text-gray-500 mb-8">
            Recevez chaque semaine les 5 produits les plus tendance détectés par notre IA, avant qu'ils n'explosent.
          </p>
          <form action="/api/newsletter" method="POST" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              name="email"
              required
              placeholder="votre@email.fr"
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              S'inscrire gratuitement
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-3">Pas de spam. Désabonnement en 1 clic.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
