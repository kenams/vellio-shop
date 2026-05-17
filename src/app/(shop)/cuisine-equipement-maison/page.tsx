import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/product/ProductGrid";
import { ChefHat, Clock, Sparkles, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Équipement Cuisine Maison 2026 — Ustensiles Tendance | Vellio",
  description:
    "Équipez votre cuisine avec les meilleurs appareils 2026 : machine à pâtes, air fryer, robot culinaire, presse-agrumes. Cuisine facile et rapide. Livraison rapide.",
  keywords: ["équipement cuisine", "ustensiles cuisine tendance", "robot cuisine", "air fryer", "appareil cuisine 2026"],
  alternates: { canonical: "https://vellio.fr/cuisine-equipement-maison" },
  openGraph: {
    title: "Équipement Cuisine Maison 2026 | Vellio",
    description: "Les meilleurs appareils pour cuisiner facilement chez soi",
    type: "website",
  },
};

const BENEFITS = [
  { icon: ChefHat, title: "Cuisine Facile", desc: "Recettes rapides avec les bons appareils" },
  { icon: Clock, title: "Gain de Temps", desc: "Cuisinez 3x plus vite qu'à la main" },
  { icon: Sparkles, title: "Qualité Pro", desc: "Résultats de restaurant à domicile" },
  { icon: ShoppingBag, title: "Prix Abordables", desc: "Budget serré = cuisine premium" },
];

const CUISINES = [
  { emoji: "🍕", label: "Petit-déjeuner", items: ["Grille-pain 4 fentes", "Presse-agrumes", "Machine café"] },
  { emoji: "🥗", label: "Healthy", items: ["Extracteur de jus", "Blender", "Balance digitale"] },
  { emoji: "🍝", label: "Plats Chauds", items: ["Air fryer", "Machine à pâtes", "Mixeur plongeant"] },
  { emoji: "🧁", label: "Pâtisserie", items: ["Robot cuisine", "Balance précision", "Moules silicone"] },
];

export default async function CuisineEquipementMaisonPage() {
  const products = await prisma.product.findMany({
    where: { published: true, category: { slug: "cuisine-pratique" } },
    include: { images: { take: 1 }, category: true },
    orderBy: { trendScore: "desc" },
    take: 12,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Équipement Cuisine Maison 2026",
            description: "Sélection des meilleurs appareils de cuisine pour 2026",
            url: "https://vellio.fr/cuisine-equipement-maison",
            provider: { "@type": "Organization", name: "Vellio" },
          }),
        }}
      />

      <div className="bg-brand-ivory">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-accent">Cuisine & Maison 2026</p>
            <h1 className="mt-4 font-serif text-5xl font-semibold text-brand sm:text-6xl">
              Équipement <span className="text-brand-accent">Cuisine</span>
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-brand/62 leading-8">
              Transformez votre cuisine avec les appareils tendance 2026. Machine à pâtes, air fryer, extracteur de jus —
              cuisinez comme un chef sans sortir de chez vous.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-14">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-black/10 bg-white/70 p-4 text-center">
                <Icon className="mx-auto mb-2 h-6 w-6 text-brand-accent" />
                <p className="text-sm font-semibold text-brand">{title}</p>
                <p className="text-xs text-brand/55 mt-1">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-10 rounded-[1.5rem] bg-white/70 border border-black/10 p-6">
            <h2 className="font-serif text-2xl font-semibold text-brand mb-5">Par type de cuisine</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CUISINES.map(({ emoji, label, items }) => (
                <div key={label} className="rounded-2xl border border-black/10 bg-brand-ivory p-4">
                  <span className="text-2xl">{emoji}</span>
                  <p className="mt-2 text-sm font-semibold text-brand">{label}</p>
                  <ul className="mt-2 space-y-0.5">
                    {items.map((item) => (
                      <li key={item} className="text-xs text-brand/55">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h2 className="font-serif text-3xl font-semibold text-brand mb-6">Nos Coups de Cœur</h2>
            <ProductGrid products={products as unknown as Product[]} />
          </div>

          <div className="rounded-[1.5rem] border border-brand-accent/20 bg-white/65 p-8 text-center">
            <p className="font-serif text-2xl font-semibold text-brand">Cuisine premium, prix accessible</p>
            <p className="mt-2 text-brand/60">Livraison suivie · Retours 30 jours · Paiement sécurisé Stripe</p>
            <Link href="/categorie/cuisine-pratique" className="btn-primary mt-5 inline-flex">
              <ChefHat className="h-4 w-4" />
              Voir toute la Cuisine
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
