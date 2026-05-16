export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate, getTrendLabel } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCart, Package, Users, TrendingUp, ArrowRight, Flame } from "lucide-react";

async function getStats() {
  const [ordersCount, products, customers, revenueData, recentOrders, topProducts] = await Promise.all([
    prisma.order.count(),
    prisma.product.count({ where: { published: true } }),
    prisma.customer.count(),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] } } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: { take: 1 } },
    }),
    prisma.product.findMany({
      where: { published: true },
      orderBy: { trendScore: "desc" },
      take: 5,
      include: { images: { take: 1 } },
    }),
  ]);

  return {
    ordersCount,
    products,
    customers,
    revenue: revenueData._sum.total || 0,
    recentOrders,
    topProducts,
  };
}

const STATUS_COLORS: Record<string, string> = {
  PENDING:    "bg-yellow-100 text-yellow-700",
  PAID:       "bg-green-100 text-green-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED:    "bg-purple-100 text-purple-700",
  DELIVERED:  "bg-gray-100 text-gray-700",
  CANCELLED:  "bg-red-100 text-red-700",
  REFUNDED:   "bg-orange-100 text-orange-700",
};

const STATUS_FR: Record<string, string> = {
  PENDING:    "En attente",
  PAID:       "Payée",
  PROCESSING: "En cours",
  SHIPPED:    "Expédiée",
  DELIVERED:  "Livrée",
  CANCELLED:  "Annulée",
  REFUNDED:   "Remboursée",
};

export default async function AdminDashboard() {
  const { ordersCount, products, customers, revenue, recentOrders, topProducts } = await getStats();

  const stats = [
    { icon: ShoppingCart, label: "Commandes", value: ordersCount, color: "text-blue-500 bg-blue-50", link: "/admin/commandes" },
    { icon: TrendingUp, label: "Chiffre d'affaires", value: formatPrice(revenue), color: "text-green-500 bg-green-50", link: "/admin/commandes" },
    { icon: Package, label: "Produits publiés", value: products, color: "text-purple-500 bg-purple-50", link: "/admin/produits" },
    { icon: Users, label: "Clients", value: customers, color: "text-brand-accent bg-red-50", link: "/admin/commandes" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-brand">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">Vue d'ensemble de votre boutique Vellio</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color, link }) => (
          <Link key={label} href={link} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300" />
            </div>
            <div className="text-2xl font-black text-brand">{value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dernières commandes */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-brand">Dernières commandes</h2>
            <Link href="/admin/commandes" className="text-xs text-primary-600 hover:underline font-medium">
              Voir tout →
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune commande pour l'instant.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-mono font-semibold text-brand text-xs">{order.orderNumber}</p>
                    <p className="text-xs text-gray-400">{order.customerName} — {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand text-sm">{formatPrice(order.total)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                      {STATUS_FR[order.status] || order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top produits tendance */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-brand">Top tendances</h2>
            <Link href="/admin/produits" className="text-xs text-primary-600 hover:underline font-medium">
              Voir tout →
            </Link>
          </div>
          {topProducts.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucun produit publié.</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((product, i) => (
                <div key={product.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-2xl font-black text-gray-200 w-6">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand text-sm line-clamp-1">{product.name}</p>
                    <p className="text-xs text-gray-400">{formatPrice(product.price)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                      <Flame className="w-3 h-3" />
                      {product.trendScore}/100
                    </div>
                    <p className="text-xs text-gray-400">{getTrendLabel(product.trendScore)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
