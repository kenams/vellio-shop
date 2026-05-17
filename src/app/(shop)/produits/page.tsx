export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCachedCategories } from "@/lib/cache";
import { getServerLocale } from "@/lib/locale-server";
import { getT } from "@/lib/i18n";
import { getPremiumCategory, toPublicProduct } from "@/lib/premium-brand";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Collection Vellio",
  description: "Découvrez la sélection Vellio : objets design, tech premium, rituels beauté et cadeaux haut de gamme.",
};

interface Props {
  searchParams: { q?: string; categorie?: string; tri?: string; filter?: string };
}

export default async function CataloguePage({ searchParams }: Props) {
  const locale = getServerLocale();
  const t = getT(locale);
  const where: any = { published: true };
  const localeCount = await prisma.product.count({ where: { published: true, locale } });

  if (localeCount > 0) where.locale = locale;
  if (searchParams.q) {
    where.OR = [
      { name: { contains: searchParams.q, mode: "insensitive" } },
      { tags: { has: searchParams.q } },
    ];
  }
  if (searchParams.categorie) where.category = { slug: searchParams.categorie };
  if (searchParams.filter === "top") where.trendScore = { gte: 76 };

  const orderBy: any =
    searchParams.tri === "prix-asc" ? { price: "asc" }
    : searchParams.tri === "prix-desc" ? { price: "desc" }
    : [{ featured: "desc" }, { trendScore: "desc" }];

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      include: { images: { take: 1, orderBy: { position: "asc" } }, trendData: true, category: true },
    }),
    getCachedCategories(),
  ]);

  const sortOptions = [
    { value: "", label: t("catalogue.trending") },
    { value: "prix-asc", label: t("catalogue.priceAsc") },
    { value: "prix-desc", label: t("catalogue.priceDesc") },
  ];

  return (
    <div className="bg-brand-ivory">
      <Container className="py-10 sm:py-16">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
          <SectionTitle
            eyebrow="Maison Vellio"
            title={t("catalogue.title")}
            subtitle={`${products.length} ${t("catalogue.subtitle")}. Une sélection sobre, utile et pensée pour le quotidien contemporain.`}
          />

          <form method="GET" className="rounded-[1.5rem] border border-black/10 bg-white/70 p-3 shadow-card">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-brand/35" />
              <input name="q" defaultValue={searchParams.q} placeholder={t("catalogue.search")} className="input-field pl-11" />
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-72 lg:shrink-0">
            <div className="sticky top-28 rounded-[1.5rem] border border-black/10 bg-white/70 p-5 shadow-card">
              <form method="GET" className="space-y-6">
                {searchParams.q && <input type="hidden" name="q" value={searchParams.q} />}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/42">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    {t("catalogue.sort")}
                  </label>
                  <div className="grid gap-1">
                    {sortOptions.map((option) => (
                      <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors hover:bg-brand-ivory">
                        <input type="radio" name="tri" value={option.value} defaultChecked={(searchParams.tri || "") === option.value} className="accent-brand-accent" />
                        <span className={(searchParams.tri || "") === option.value ? "font-semibold text-brand" : "text-brand/58"}>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/42">{t("catalogue.category")}</p>
                  <div className="grid max-h-80 gap-1 overflow-y-auto pr-1">
                    <Link href="/produits" className={`rounded-2xl px-3 py-2.5 text-sm transition-colors ${!searchParams.categorie ? "bg-brand text-white" : "text-brand/58 hover:bg-brand-ivory"}`}>
                      {t("catalogue.allCategories")}
                    </Link>
                    {categories.map((category) => {
                      const premium = getPremiumCategory(category.slug, category.name, locale);
                      return (
                        <Link
                          key={category.id}
                          href={`/produits?categorie=${category.slug}${searchParams.tri ? `&tri=${searchParams.tri}` : ""}`}
                          className={`rounded-2xl px-3 py-2.5 text-sm transition-colors ${searchParams.categorie === category.slug ? "bg-brand text-white" : "text-brand/58 hover:bg-brand-ivory"}`}
                        >
                          {premium.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">{t("catalogue.apply")}</button>
              </form>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {(searchParams.q || searchParams.categorie || searchParams.filter) && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-xs text-brand/45">Filtres actifs</span>
                {searchParams.q && <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand">"{searchParams.q}"</span>}
                {searchParams.categorie && <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand">{getPremiumCategory(searchParams.categorie, undefined, locale).label}</span>}
                <Link href="/produits" className="text-xs font-semibold text-brand-accent">{t("catalogue.clearAll")}</Link>
              </div>
            )}

            {products.length === 0 ? (
              <div className="rounded-[1.5rem] border border-black/10 bg-white/70 px-6 py-20 text-center shadow-card">
                <p className="font-serif text-3xl font-semibold text-brand">{t("catalogue.noResults")}</p>
                <p className="mt-3 text-sm text-brand/55">{t("catalogue.noResultsDesc")}</p>
                <Link href="/produits" className="btn-primary mt-6">Voir toute la collection</Link>
              </div>
            ) : (
              <ProductGrid products={products.map((product) => toPublicProduct(product as any, locale)) as unknown as Product[]} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
