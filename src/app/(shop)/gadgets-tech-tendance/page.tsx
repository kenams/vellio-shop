import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/product/ProductGrid";
import { Zap, TrendingUp, ShoppingBag, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Gadgets Tech Tendance 2026 — Les Plus Viraux | Vellio",
  description:
    "Découvrez les gadgets tech les plus tendance de 2026 : écouteurs ANC, gimbal smartphone, hubs USB-C, traceurs Bluetooth. Livraison rapide, retours 30j.",
  keywords: ["gadgets tech 2026", "gadgets tendance", "tech viral tiktok", "meilleurs gadgets", "gadgets connectés"],
  alternates: { canonical: "https://vellio.fr/gadgets-tech-tendance" },
  openGraph: {
    title: "Gadgets Tech Tendance 2026 | Vellio",
    description: "Les gadgets tech les plus viraux de 2026 — sélection Vellio",
    type: "website",
  },
};

const FEATURES = [
  { icon: TrendingUp, title: "Sélection Tendance", desc: "Produits viraux TikTok et YouTube" },
  { icon: Zap, title: "Technologie 2026", desc: "Dernières innovations disponibles" },
  { icon: Star, title: "Avis Vérifiés", desc: "4.8/5 sur + de 1200 avis" },
  { icon: ShoppingBag, title: "Livraison Rapide", desc: "Expédié sous 24h, suivi inclus" },
];

const USE_CASES = [
  { emoji: "🎮", title: "Gaming & Streaming", desc: "Ring lights, micros, webcams HD, hubs multi-ports" },
  { emoji: "📱", title: "Créateurs de Contenu", desc: "Gimbals, lumières LED, supports réglables" },
  { emoji: "💼", title: "Télétravail Pro", desc: "Écouteurs ANC, docks USB-C, lampes de bureau" },
  { emoji: "🎁", title: "Cadeaux Tech", desc: "Idées cadeaux originales pour tous les budgets" },
];

export default async function GadgetsTechTendancePage() {
  const [techProducts, trendingProducts] = await Promise.all([
    prisma.product.findMany({
      where: { published: true, category: { slug: "tech-gadgets" } },
      include: { images: { take: 1 }, category: true },
      orderBy: { trendScore: "desc" },
      take: 8,
    }),
    prisma.product.findMany({
      where: { published: true, trendScore: { gte: 80 } },
      include: { images: { take: 1 }, category: true },
      orderBy: { trendScore: "desc" },
      take: 8,
    }),
  ]);

  const allProducts = [...techProducts, ...trendingProducts]
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, 12);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Gadgets Tech Tendance 2026",
            description: "Sélection des gadgets technologiques les plus tendance de 2026",
            url: "https://vellio.fr/gadgets-tech-tendance",
            provider: { "@type": "Organization", name: "Vellio" },
            offers: { "@type": "AggregateOffer", priceCurrency: "EUR", offerCount: allProducts.length },
          }),
        }}
      />

      <div className="bg-brand-ivory">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-accent">Vellio × Tech 2026</p>
            <h1 className="mt-4 font-serif text-5xl font-semibold text-brand sm:text-6xl">
              Gadgets Tech <span className="text-brand-accent">Tendance</span>
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-brand/62 leading-8">
              Les gadgets technologiques les plus viraux de 2026 — sélectionnés pour leur innovation, leur rapport qualité-prix
              et leurs avis clients exceptionnels.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-14">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-black/10 bg-white/70 p-4 text-center">
                <Icon className="mx-auto mb-2 h-6 w-6 text-brand-accent" />
                <p className="text-sm font-semibold text-brand">{title}</p>
                <p className="text-xs text-brand/55 mt-1">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-3xl font-semibold text-brand mb-6">Top Gadgets du Moment</h2>
            <ProductGrid products={allProducts} />
          </div>

          <div className="mb-12 rounded-[1.5rem] bg-white/70 border border-black/10 p-8">
            <h2 className="font-serif text-3xl font-semibold text-brand mb-2">Pour qui ?</h2>
            <p className="text-brand/60 mb-6">Nos gadgets tech s'adaptent à tous les profils</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {USE_CASES.map(({ emoji, title, desc }) => (
                <div key={title} className="rounded-2xl border border-black/10 bg-brand-ivory p-4">
                  <span className="text-2xl">{emoji}</span>
                  <p className="mt-2 text-sm font-semibold text-brand">{title}</p>
                  <p className="text-xs text-brand/55 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/categorie/tech-gadgets" className="btn-primary inline-flex">
              <ShoppingBag className="h-4 w-4" />
              Voir tout Tech & Gadgets
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
