export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { formatPrice, getTrendLabel } from "@/lib/utils";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Plus, ExternalLink, Flame, TrendingUp, ShoppingCart } from "lucide-react";

async function togglePublish(id: string, published: boolean) {
  "use server";
  await prisma.product.update({ where: { id }, data: { published: !published } });
  revalidatePath("/admin/produits");
}

export default async function AdminProduitsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, images: { take: 1 }, trendData: { select: { margin: true } } },
  });

  const totalRevenuePotential = products.filter(p => p.published).reduce((acc, p) => acc + p.price * p.stock, 0);
  const avgMargin = products.length > 0
    ? Math.round(products.reduce((acc, p) => acc + (p.estimatedMargin || Math.round(((p.price - p.cost) / p.price) * 100)), 0) / products.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand">Produits</h1>
          <p className="text-gray-500 text-sm mt-0.5">{products.length} produit{products.length > 1 ? "s" : ""} au total</p>
        </div>
        <Link href="/admin/prospection" className="btn-primary flex items-center gap-2 text-sm py-2">
          <Plus className="w-4 h-4" /> Prospection premium
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase font-bold">Produits publiés</p>
          <p className="text-2xl font-black text-brand">{products.filter(p => p.published).length}/{products.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 uppercase font-bold">Marge moyenne</p>
          <p className="text-2xl font-black text-green-600">{avgMargin}%</p>
        </div>
        <div className="card p-4 hidden md:block">
          <p className="text-xs text-gray-500 uppercase font-bold">Stock potentiel</p>
          <p className="text-2xl font-black text-primary-600">{formatPrice(totalRevenuePotential)}</p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Produit</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden md:table-cell">Catégorie</th>
              <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Prix / Coût</th>
              <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Marge</th>
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
                  Aucun produit. <Link href="/admin/prospection" className="text-primary-600 underline">Préparer une opportunité →</Link>
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
                    <span className="block text-xs text-gray-400">{formatPrice(product.cost)} coût</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right hidden sm:table-cell">
                  {(() => {
                    const margin = product.estimatedMargin ?? Math.round(((product.price - product.cost) / product.price) * 100);
                    const color = margin >= 70 ? "text-green-600" : margin >= 50 ? "text-yellow-600" : "text-red-500";
                    return <span className={`font-bold text-sm ${color}`}>{margin}%</span>;
                  })()}
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
                  <div className="flex items-center justify-center gap-1">
                    <Link
                      href={`/produits/${product.slug}`}
                      target="_blank"
                      className="p-1.5 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors inline-flex"
                      title="Voir le produit"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    {product.supplierUrl && (
                      <a
                        href={product.supplierUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-400 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-colors inline-flex"
                        title="Voir fournisseur AliExpress"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
