export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Filter } from "lucide-react";

interface Props {
  params: { slug: string };
  searchParams: { tri?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) return { title: "Catégorie introuvable" };
  return {
    title: `${category.name} — Vellio`,
    description: category.description || `Découvrez tous les produits tendance de la catégorie ${category.name}.`,
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
      include: { images: { take: 1, orderBy: { position: "asc" } }, trendData: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-brand transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/produits" className="hover:text-brand transition-colors">Catalogue</Link>
        <span>/</span>
        <span className="text-brand font-medium">{category.name}</span>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <Link href="/produits" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <h1 className="text-3xl font-black text-brand">{category.name}</h1>
      </div>
      {category.description && (
        <p className="text-gray-500 mb-8 ml-11">{category.description}</p>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-56 flex-shrink-0">
          <div className="card p-5 space-y-5">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4" /> Trier par
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { value: "", label: "Tendance (défaut)" },
                  { value: "prix-asc", label: "Prix croissant" },
                  { value: "prix-desc", label: "Prix décroissant" },
                ].map((opt) => (
                  <Link
                    key={opt.value}
                    href={`/categorie/${params.slug}${opt.value ? `?tri=${opt.value}` : ""}`}
                    className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                      (searchParams.tri || "") === opt.value
                        ? "bg-brand text-white font-semibold"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    {opt.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm">Autres catégories</h3>
              <div className="flex flex-col gap-1">
                {allCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categorie/${cat.slug}`}
                    className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                      cat.slug === params.slug
                        ? "bg-primary-50 text-primary-600 font-semibold"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-4">{products.length} produit{products.length > 1 ? "s" : ""}</p>
          {products.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg mb-4">Aucun produit dans cette catégorie pour l'instant.</p>
              <Link href="/produits" className="btn-primary">Voir tout le catalogue</Link>
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
