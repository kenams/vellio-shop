export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, SlidersHorizontal, ChevronRight } from "lucide-react";

interface Props {
  params: { slug: string };
  searchParams: { tri?: string };
}

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

const CATEGORY_COLORS: Record<string, string> = {
  "gadgets-voiture": "from-blue-600 to-sky-500",
  "maison-intelligente": "from-emerald-600 to-teal-500",
  "cuisine-pratique": "from-orange-600 to-amber-500",
  "sport-fitness": "from-red-600 to-pink-500",
  "beaute-soin": "from-pink-600 to-rose-500",
  "tech-gadgets": "from-violet-600 to-purple-500",
  "bureau-productivite": "from-slate-600 to-gray-500",
  "enfant-famille": "from-yellow-600 to-lime-500",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) return { title: "Catégorie introuvable" };
  return {
    title: `${category.name} — Vellio`,
    description: category.description || `Découvrez tous les produits tendance ${category.name} sélectionnés par IA.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) notFound();

  const orderBy: any =
    searchParams.tri === "prix-asc" ? { price: "asc" }
    : searchParams.tri === "prix-desc" ? { price: "desc" }
    : { trendScore: "desc" };

  const [products, allCategories] = await Promise.all([
    prisma.product.findMany({
      where: { published: true, categoryId: category.id },
      orderBy,
      include: { images: { take: 1, orderBy: { position: "asc" } }, trendData: true, category: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const gradient = CATEGORY_COLORS[params.slug] || "from-primary-600 to-primary-500";
  const icon = CATEGORY_ICONS[params.slug] || "🛒";

  const sortOptions = [
    { value: "", label: "📈 Tendance" },
    { value: "prix-asc", label: "💰 Prix croissant" },
    { value: "prix-desc", label: "💎 Prix décroissant" },
  ];

  return (
    <>
      {/* Category hero */}
      <div className={`bg-gradient-to-r ${gradient} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/produits" className="hover:text-white transition-colors">Catalogue</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{category.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0">
              {icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">{category.name}</h1>
              {category.description && (
                <p className="text-white/70 mt-1 text-sm sm:text-base">{category.description}</p>
              )}
              <p className="text-white/60 text-sm mt-1">
                <strong className="text-white">{products.length}</strong> produit{products.length > 1 ? "s" : ""} disponible{products.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mobile sort */}
        <div className="md:hidden mb-5">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {sortOptions.map((opt) => (
              <Link
                key={opt.value}
                href={`/categorie/${params.slug}${opt.value ? `?tri=${opt.value}` : ""}`}
                className={`flex-shrink-0 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
                  (searchParams.tri || "") === opt.value
                    ? "bg-primary-600 text-white shadow-btn-violet"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar desktop */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="card p-5 space-y-5 sticky top-28">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Trier par
                </h3>
                <div className="space-y-1">
                  {sortOptions.map((opt) => (
                    <Link
                      key={opt.value}
                      href={`/categorie/${params.slug}${opt.value ? `?tri=${opt.value}` : ""}`}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all ${
                        (searchParams.tri || "") === opt.value
                          ? "bg-primary-50 text-primary-700 font-bold"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      {opt.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Autres catégories</h3>
                <div className="space-y-1 max-h-72 overflow-y-auto">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categorie/${cat.slug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                        cat.slug === params.slug
                          ? "bg-primary-50 text-primary-700 font-bold"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <span>{CATEGORY_ICONS[cat.slug] || "🛒"}</span>
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/produits" className="btn-secondary w-full text-sm py-2.5 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Tout le catalogue
              </Link>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-5xl mb-4">{icon}</div>
                <p className="text-lg font-bold text-gray-700 mb-2">Aucun produit pour l'instant</p>
                <p className="text-gray-500 mb-6 text-sm">Notre IA ajoute de nouveaux produits chaque jour !</p>
                <Link href="/produits" className="btn-primary">Voir tout le catalogue</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p as any} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
