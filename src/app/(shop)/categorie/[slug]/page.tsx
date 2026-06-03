export const dynamic = "force-dynamic"; // ISR 1h

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getPremiumCategory, toPublicProduct } from "@/lib/premium-brand";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/types";

interface Props {
  params: { slug: string };
  searchParams: { tri?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) return { title: "Univers introuvable" };
  const premium = getPremiumCategory(category.slug, category.name);
  return {
    title: `${premium.label} — Vellio`,
    description: premium.description,
    alternates: { canonical: `/categorie/${params.slug}` },
    openGraph: {
      type: "website",
      title: `${premium.label} — Vellio`,
      description: premium.description,
      url: `/categorie/${params.slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) notFound();

  const premium = getPremiumCategory(category.slug, category.name);
  const orderBy: any =
    searchParams.tri === "prix-asc" ? { price: "asc" }
    : searchParams.tri === "prix-desc" ? { price: "desc" }
    : [{ featured: "desc" }, { trendScore: "desc" }];

  const [products, allCategories] = await Promise.all([
    prisma.product.findMany({
      where: { published: true, categoryId: category.id },
      orderBy,
      include: { images: { take: 1, orderBy: { position: "asc" } }, trendData: true, category: true },
    }),
    prisma.category.findMany({ orderBy: { createdAt: "asc" } }),
  ]);

  const sortOptions = [
    { value: "", label: "Désirabilité" },
    { value: "prix-asc", label: "Prix croissant" },
    { value: "prix-desc", label: "Prix décroissant" },
  ];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://vellio.fr" },
      { "@type": "ListItem", position: 2, name: "Collection", item: "https://vellio.fr/produits" },
      { "@type": "ListItem", position: 3, name: premium.label, item: `https://vellio.fr/categorie/${params.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <div className="bg-brand-ivory">
      <section className="border-b border-black/10 bg-brand text-white">
        <Container className="py-14 sm:py-20">
          <Link href="/produits" className="mb-8 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Collection
          </Link>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">{premium.accent}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-[0.92] sm:text-7xl">{premium.label}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/62">{premium.description}</p>
          <p className="mt-6 text-sm text-white/45">{products.length} pièce{products.length > 1 ? "s" : ""} disponible{products.length > 1 ? "s" : ""}</p>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-72 lg:shrink-0">
            <div className="sticky top-28 rounded-[1.5rem] border border-black/10 bg-white/70 p-5 shadow-card">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/42">Tri</p>
                <div className="grid gap-1">
                  {sortOptions.map((option) => (
                    <Link
                      key={option.value}
                      href={`/categorie/${params.slug}${option.value ? `?tri=${option.value}` : ""}`}
                      className={`rounded-2xl px-3 py-2.5 text-sm transition-colors ${(searchParams.tri || "") === option.value ? "bg-brand text-white" : "text-brand/58 hover:bg-brand-ivory"}`}
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/42">Autres univers</p>
                <div className="grid max-h-80 gap-1 overflow-y-auto pr-1">
                  {allCategories.map((item) => {
                    const itemPremium = getPremiumCategory(item.slug, item.name);
                    return (
                      <Link
                        key={item.id}
                        href={`/categorie/${item.slug}`}
                        className={`rounded-2xl px-3 py-2.5 text-sm transition-colors ${item.slug === params.slug ? "bg-brand text-white" : "text-brand/58 hover:bg-brand-ivory"}`}
                      >
                        {itemPremium.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {products.length === 0 ? (
              <div className="rounded-[1.5rem] border border-black/10 bg-white/70 px-6 py-20 text-center shadow-card">
                <SectionTitle align="center" title="Aucune pièce pour le moment" subtitle="La sélection de cet univers sera enrichie lors des prochaines prospections." />
                <Link href="/produits" className="btn-primary mt-8">Voir toute la collection</Link>
              </div>
            ) : (
              <ProductGrid products={products.map((product) => toPublicProduct(product as any)) as unknown as Product[]} />
            )}
          </div>
        </div>
      </Container>
    </div>
    </>
  );
}
