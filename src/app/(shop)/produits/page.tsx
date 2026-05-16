export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";
import type { Metadata } from "next";
import { Filter, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Catalogue — Tous les produits tendance",
  description: "Découvrez notre sélection de produits tendance détectés par intelligence artificielle. Gadgets, maison, cuisine, sport et plus encore.",
};

interface Props {
  searchParams: { q?: string; categorie?: string; tri?: string; filter?: string };
}

export default async function CataloguePage({ searchParams }: Props) {
  const where: any = { published: true };
  if (searchParams.q) {
    where.OR = [
      { name: { contains: searchParams.q, mode: "insensitive" } },
      { tags: { has: searchParams.q } },
    ];
  }
  if (searchParams.categorie) {
    where.category = { slug: searchParams.categorie };
  }
  if (searchParams.filter === "top") {
    where.trendScore = { gte: 70 };
  }

  const orderBy: any =
    searchParams.tri === "prix-asc" ? { price: "asc" }
    : searchParams.tri === "prix-desc" ? { price: "desc" }
    : { trendScore: "desc" };

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      include: { images: { take: 1, orderBy: { position: "asc" } }, trendData: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-2">Catalogue produits</h1>
      <p className="text-gray-500 mb-8">{products.length} produits disponibles — triés par score tendance</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <aside className="md:w-56 flex-shrink-0">
          <div className="card p-5 space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2"><Filter className="w-4 h-4" /> Filtres</h3>
              <form method="GET">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input name="q" defaultValue={searchParams.q} placeholder="Rechercher..." className="input-field pl-9 text-sm" />
                </div>
                <select name="tri" defaultValue={searchParams.tri} className="input-field text-sm mb-4">
                  <option value="">Tendance (défaut)</option>
                  <option value="prix-asc">Prix croissant</option>
                  <option value="prix-desc">Prix décroissant</option>
                </select>
                <select name="categorie" defaultValue={searchParams.categorie} className="input-field text-sm mb-4">
                  <option value="">Toutes catégories</option>
                  {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
                <button type="submit" className="btn-primary w-full text-sm">Appliquer</button>
              </form>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg">Aucun produit trouvé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p as any} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
