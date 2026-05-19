export const revalidate = 600; // ISR 10min
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { toPublicProduct } from "@/lib/premium-brand";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Objets Design Maison — Décoration Intérieure Premium | Vellio",
  description: "Sélection d'objets design pour la maison : décoration minimaliste, tech maison et accessoires lifestyle premium. Livraison offerte dès 50€.",
  alternates: { canonical: "/objets-design-maison" },
  openGraph: {
    type: "website",
    title: "Objets Design Maison | Vellio",
    description: "Objets design premium pour un intérieur contemporain. Matières nobles, lignes sobres, usage quotidien.",
    url: "https://vellio.fr/objets-design-maison",
  },
};

const editorialPoints = [
  "Chaque pièce est sélectionnée pour son usage réel, pas uniquement son esthétique",
  "Des matières nobles qui vieillissent bien : bois, céramique, métal traité",
  "Des objets qui se complètent sans encombrer l'espace",
  "Lignes sobres qui s'adaptent à tous les intérieurs contemporains",
];

export default async function ObjetsMaisonPage() {
  const category = await prisma.category.findFirst({
    where: { slug: "maison-intelligente" },
  });

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(category ? { categoryId: category.id } : {}),
    },
    orderBy: [{ featured: "desc" }, { trendScore: "desc" }],
    take: 8,
    include: { images: { take: 1, orderBy: { position: "asc" } }, trendData: true, category: true },
  });

  const fallback = products.length < 4
    ? await prisma.product.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { trendScore: "desc" }],
        take: 8,
        include: { images: { take: 1, orderBy: { position: "asc" } }, trendData: true, category: true },
      })
    : products;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Objets Design Maison — Vellio",
    description: "Objets design premium pour un intérieur contemporain et minimaliste.",
    url: "https://vellio.fr/objets-design-maison",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://vellio.fr" },
        { "@type": "ListItem", position: 2, name: "Objets Design Maison", item: "https://vellio.fr/objets-design-maison" },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-brand-ivory">
        <section className="bg-brand text-white">
          <Container className="py-16 sm:py-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">Maison — Univers Vellio</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[0.9] sm:text-7xl">
              Des objets qui<br />méritent leur place.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/62">
              L'intérieur contemporain ne se construit pas par accumulation. Il se compose d'objets choisis avec précision — chacun porteur d'un usage, d'une matière, d'une intention. La sélection Vellio maison naît de ce principe.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/categorie/maison-intelligente" className="btn-primary">
                Voir la sélection maison <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/produits" className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10">
                Toute la collection
              </Link>
            </div>
          </Container>
        </section>

        <Container className="py-10">
          <div className="rounded-[1.5rem] border border-brand-accent/20 bg-white/70 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-accent mb-5">Notre approche</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {editorialPoints.map((p) => (
                <div key={p} className="flex items-start gap-3 text-sm text-brand/65">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-brand-accent" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </Container>

        <Container className="py-10">
          <div className="mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent">Sélection en cours</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-brand">Pièces maison du moment</h2>
          </div>
          <ProductGrid products={(products.length >= 4 ? products : fallback).map((p) => toPublicProduct(p as any)) as unknown as Product[]} />
          <div className="mt-10 text-center">
            <Link href="/produits" className="btn-primary">Voir toute la collection <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Container>

        <Container className="pb-16">
          <div className="rounded-[2rem] border border-black/10 bg-white p-8 max-w-3xl">
            <h2 className="font-serif text-3xl font-semibold text-brand">Comment décorer sans surcharger ?</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-brand/62">
              <p>La décoration intérieure contemporaine repose sur un paradoxe : plus on choisit avec précision, moins on a besoin de pièces. Un objet design bien choisi occupe l'espace mentalement autant que visuellement — il attire l'œil, crée une présence, et donne du caractère à l'ensemble.</p>
              <p>Chez Vellio, nous sélectionnons des objets qui fonctionnent seuls ou en composition. Des objets maison qui justifient leur présence par leur usage autant que par leur esthétique : une bougie qui sent juste, un organisateur de bureau sobre, une fontaine calme pour un coin lecture.</p>
              <p>La ligne directrice est toujours la même : contemporain sans être froid, premium sans être ostentatoire, durable sans être ennuyeux.</p>
            </div>
            <Link href="/blog/objets-design-tendance-maison-2026" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:underline">
              Lire notre guide déco 2026 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
