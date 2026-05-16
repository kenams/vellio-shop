export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { formatPrice, getTrendLabel } from "@/lib/utils";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Plus, ExternalLink, Flame } from "lucide-react";

async function togglePublish(id: string, published: boolean) {
  "use server";
  await prisma.product.update({ where: { id }, data: { published: !published } });
  revalidatePath("/admin/produits");
}

export default async function AdminProduitsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, images: { take: 1 } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand">Produits</h1>
          <p className="text-gray-500 text-sm mt-0.5">{products.length} produit{products.length > 1 ? "s" : ""} au total</p>
        </div>
        <Link href="/admin/ia" className="btn-primary flex items-center gap-2 text-sm py-2">
          <Plus className="w-4 h-4" /> Générer avec l'IA
        </Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Produit</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden md:table-cell">Catégorie</th>
              <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Prix</th>
              <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Stock</th>
              <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Score</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Statut</th>
              <th className="text-center px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  Aucun produit. <Link href="/admin/ia" className="text-primary-600 underline">Créer avec l'IA →</Link>
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {product.images[0]?.url ? (
                        <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">—</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-brand text-sm line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-400 font-mono">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {product.category?.name || "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div>
                    <span className="font-bold text-brand">{formatPrice(product.price)}</span>
                    {product.comparePrice && (
                      <span className="block text-xs text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right hidden sm:table-cell">
                  <span className={`font-medium ${product.stock <= 5 ? "text-red-500" : "text-gray-700"}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-right hidden lg:table-cell">
                  <div className="flex items-center justify-end gap-1">
                    <Flame className={`w-3 h-3 ${product.trendScore >= 70 ? "text-orange-500" : "text-gray-300"}`} />
                    <span className="font-bold text-sm">{product.trendScore}</span>
                    <span className="text-xs text-gray-400 ml-1">{getTrendLabel(product.trendScore)}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <form action={togglePublish.bind(null, product.id, product.published)}>
                    <button
                      type="submit"
                      className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors ${
                        product.published
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {product.published ? "Publié" : "Brouillon"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/produits/${product.slug}`}
                    target="_blank"
                    className="p-1.5 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors inline-flex"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
