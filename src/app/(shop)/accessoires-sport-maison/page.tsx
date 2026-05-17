import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/product/ProductGrid";
import { Dumbbell, Heart, Trophy, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Accessoires Sport Maison 2026 — Home Gym Pas Cher | Vellio",
  description:
    "Créez votre salle de sport à la maison : haltères, barre de traction, battle rope, vélo elliptique, yoga mat. Home gym complet dès 20€. Livraison rapide.",
  keywords: ["sport maison", "home gym", "accessoires fitness", "équipement sport domicile", "salle sport maison"],
  alternates: { canonical: "https://vellio.fr/accessoires-sport-maison" },
  openGraph: {
    title: "Accessoires Sport Maison | Vellio",
    description: "Home gym complet à petit prix — livraison rapide",
    type: "website",
  },
};

const BENEFITS = [
  { icon: Dumbbell, title: "Home Gym Complet", desc: "Tout pour s'entraîner sans quitter la maison" },
  { icon: Heart, title: "Santé & Bien-être", desc: "Progresse à ton rythme, résultats garantis" },
  { icon: Trophy, title: "Qualité Pro", desc: "Matériel de qualité salle de sport" },
  { icon: ShoppingBag, title: "Livraison Offerte", desc: "Gratuite dès 50€ d'achat" },
];

const GOALS = [
  { emoji: "💪", label: "Musculation", products: ["Haltères", "Barre traction", "Élastiques"] },
  { emoji: "🏃", label: "Cardio", products: ["Battle rope", "Corde à sauter", "Vélo elliptique"] },
  { emoji: "🧘", label: "Yoga & Pilates", products: ["Tapis yoga", "Blocs", "Sangle"] },
  { emoji: "🔄", label: "Récupération", products: ["Pistolet massage", "Foam roller", "Bain de pied"] },
];

export default async function AccessoiresSportMaisonPage() {
  const products = await prisma.product.findMany({
    where: {
      published: true,
      OR: [
        { category: { slug: "sport-fitness" } },
        { trendScore: { gte: 78 }, category: { slug: { in: ["sport-fitness", "beaute-soin"] } } },
      ],
    },
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
            name: "Accessoires Sport Maison 2026",
            description: "Équipement fitness complet pour s'entraîner chez soi",
            url: "https://vellio.fr/accessoires-sport-maison",
            provider: { "@type": "Organization", name: "Vellio" },
          }),
        }}
      />

      <div className="bg-brand-ivory">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-accent">Home Gym 2026</p>
            <h1 className="mt-4 font-serif text-5xl font-semibold text-brand sm:text-6xl">
              Sport à la <span className="text-brand-accent">Maison</span>
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-brand/62 leading-8">
              Plus besoin de salle de sport. Créez votre espace fitness complet à domicile avec notre sélection d'accessoires
              pro à prix accessibles.
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
            <h2 className="font-serif text-2xl font-semibold text-brand mb-5">Votre objectif ?</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {GOALS.map(({ emoji, label, products }) => (
                <div key={label} className="rounded-2xl border border-black/10 bg-brand-ivory p-4">
                  <span className="text-2xl">{emoji}</span>
                  <p className="mt-2 text-sm font-semibold text-brand">{label}</p>
                  <ul className="mt-2 space-y-0.5">
                    {products.map((p) => (
                      <li key={p} className="text-xs text-brand/55">• {p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h2 className="font-serif text-3xl font-semibold text-brand mb-6">Notre Sélection</h2>
            <ProductGrid products={products} />
          </div>

          <div className="rounded-[1.5rem] border border-brand-accent/20 bg-white/65 p-8 text-center">
            <p className="font-serif text-2xl font-semibold text-brand">Livraison gratuite dès 50€</p>
            <p className="mt-2 text-brand/60">Paiement sécurisé Stripe · Retours sous 30 jours · Suivi inclus</p>
            <Link href="/categorie/sport-fitness" className="btn-primary mt-5 inline-flex">
              <Dumbbell className="h-4 w-4" />
              Voir tout Sport & Fitness
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
