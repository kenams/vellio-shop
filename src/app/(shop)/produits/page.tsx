export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";
import type { Metadata } from "next";
import { SlidersHorizontal, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { getServerLocale } from "@/lib/locale-server";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Catalogue — Vellio",
  description: "Découvrez notre sélection de produits tendance détectés par intelligence artificielle.",
};

interface Props {
  searchParams: { q?: string; categorie?: string; tri?: string; filter?: string };
}

export default async function CataloguePage({ searchParams }: Props) {
  const locale = getServerLocale();
  const t = getT(locale);

  const where: any = { published: true };

  // Show locale-specific products, or fall back to all if none
  const localeCount = await prisma.product.count({ where: { published: true, locale } });
  if (localeCount > 0) where.locale = locale;

  if (searchParams.q) {
    where.OR = [
      { name: { contains: searchParams.q, mode: "insensitive" } },
      { tags: { has: searchParams.q } },
    ];
  }
  if (searchParams.categorie) where.category = { slug: searchParams.categorie };
  if (searchParams.filter === "top") where.trendScore = { gte: 70 };

  const orderBy: any =
    searchParams.tri === "prix-asc" ? { price: "asc" }
    : searchParams.tri === "prix-desc" ? { price: "desc" }
    : { trendScore: "desc" };

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      include: { images: { take: 1, orderBy: { position: "asc" } }, trendData: true, category: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const sortOptions = [
    { value: "", label: t("catalogue.trending") },
    { value: "prix-asc", label: t("catalogue.priceAsc") },
    { value: "prix-desc", label: t("catalogue.priceDesc") },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <Link href="/" className="hover:text-primary-600 transition-colors">{t("common.home")}</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">{t("nav.catalogue")}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-brand mb-1">{t("catalogue.title")}</h1>
        <p className="text-gray-500">
          <span className="font-bold text-primary-600">{products.length}</span> {t("catalogue.subtitle")}
        </p>
      </div>

      {/* Mobile filter */}
      <div className="md:hidden mb-6">
        <form method="GET" className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            <input name="q" defaultValue={searchParams.q} placeholder={t("catalogue.search")} className="input-field pl-10" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select name="categorie" defaultValue={searchParams.categorie} className="input-field text-sm">
              <option value="">{t("catalogue.allCategories")}</option>
              {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
            <select name="tri" defaultValue={searchParams.tri} className="input-field text-sm">
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <button type="submit" className="btn-violet w-full text-sm py-3">{t("catalogue.apply")}</button>
        </form>
      </div>

      <div className="flex gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden md:block w-60 flex-shrink-0">
          <div className="card p-5 space-y-6 sticky top-28">
            <form method="GET" className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  <Search className="w-3.5 h-3.5 inline mr-1" /> {t("catalogue.search")}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input name="q" defaultValue={searchParams.q} placeholder={t("catalogue.search")} className="input-field pl-9 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 inline mr-1" /> {t("catalogue.sort")}
                </label>
                <div className="space-y-1">
                  {sortOptions.map(o => (
                    <label key={o.value} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary-50 cursor-pointer transition-colors">
                      <input type="radio" name="tri" value={o.value} defaultChecked={(searchParams.tri || "") === o.value} className="accent-primary-600" />
                      <span className={`text-sm ${(searchParams.tri || "") === o.value ? "font-bold text-primary-700" : "text-gray-600"}`}>{o.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">{t("catalogue.category")}</label>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  <Link href="/produits" className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${!searchParams.categorie ? "bg-primary-50 text-primary-700 font-bold" : "text-gray-600 hover:bg-gray-50"}`}>
                    🛒 {t("catalogue.allCategories")}
                  </Link>
                  {categories.map((c) => (
                    <Link key={c.id} href={`/produits?categorie=${c.slug}${searchParams.tri ? `&tri=${searchParams.tri}` : ""}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${searchParams.categorie === c.slug ? "bg-primary-50 text-primary-700 font-bold" : "text-gray-600 hover:bg-gray-50"}`}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn-primary w-full text-sm py-2.5">
                <Sparkles className="w-4 h-4" /> {t("catalogue.apply")}
              </button>
            </form>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {(searchParams.q || searchParams.categorie) && (
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-xs text-gray-500">{locale === "en" ? "Active filters:" : "Filtres actifs :"}</span>
              {searchParams.q && <span className="bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full">"{searchParams.q}"</span>}
              {searchParams.categorie && <span className="bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full">{categories.find(c => c.slug === searchParams.categorie)?.name}</span>}
              <Link href="/produits" className="text-xs text-gray-400 hover:text-red-500 underline">{t("catalogue.clearAll")}</Link>
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-bold text-gray-700 mb-2">{t("catalogue.noResults")}</p>
              <p className="text-gray-500 mb-6 text-sm">{t("catalogue.noResultsDesc")}</p>
              <Link href="/produits" className="btn-primary">{locale === "en" ? "View all products" : "Voir tout le catalogue"}</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {products.map((p) => <ProductCard key={p.id} product={p as any} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
