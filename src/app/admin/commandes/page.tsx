import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import Link from "next/link";

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
  PROCESSING: "En préparation",
  SHIPPED:    "Expédiée",
  DELIVERED:  "Livrée",
  CANCELLED:  "Annulée",
  REFUNDED:   "Remboursée",
};

async function updateOrder(formData: FormData) {
  "use server";
  const id = formData.get("orderId") as string;
  const status = formData.get("status") as string;
  const trackingNumber = formData.get("trackingNumber") as string;

  if (!id) return;

  const data: Record<string, string> = {};
  if (status) data.status = status;
  if (trackingNumber) data.trackingNumber = trackingNumber;

  await prisma.order.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/commandes");
}

export default async function AdminCommandesPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand">Commandes</h1>
        <p className="text-gray-500 text-sm mt-0.5">{orders.length} commande{orders.length > 1 ? "s" : ""} au total</p>
      </div>

      {orders.length === 0 ? (
        <div className="card p-12 text-center text-gray-400">
          <p className="text-lg font-medium mb-2">Aucune commande</p>
          <p className="text-sm">Les commandes apparaîtront ici dès qu'un client effectuera un achat.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <details key={order.id} className="card group">
              <summary className="px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-brand text-sm">{order.orderNumber}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                        {STATUS_FR[order.status] || order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.customerName} — {order.customerEmail} — {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-brand">{formatPrice(order.total)}</p>
                    <p className="text-xs text-gray-400">{order.items.length} article{order.items.length > 1 ? "s" : ""}</p>
                  </div>
                  {order.trackingNumber && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-mono">
                      {order.trackingNumber}
                    </span>
                  )}
                </div>
              </summary>

              <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Articles */}
                  <div>
                    <h3 className="font-bold text-brand text-sm mb-3">Articles commandés</h3>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name} × {item.quantity}</span>
                          <span className="font-medium text-brand">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mise à jour */}
                  <div>
                    <h3 className="font-bold text-brand text-sm mb-3">Mettre à jour la commande</h3>
                    <form action={updateOrder} className="space-y-3">
                      <input type="hidden" name="orderId" value={order.id} />
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Statut</label>
                        <select name="status" defaultValue={order.status} className="input-field text-sm py-2">
                          {Object.entries(STATUS_FR).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Numéro de suivi</label>
                        <input
                          type="text"
                          name="trackingNumber"
                          defaultValue={order.trackingNumber || ""}
                          placeholder="ex: RA000123456FR"
                          className="input-field text-sm py-2"
                        />
                      </div>
                      <button type="submit" className="btn-primary text-sm py-2 w-full">
                        Enregistrer les modifications
                      </button>
                    </form>
                  </div>
                </div>

                {/* Adresse */}
                {order.shippingAddress && typeof order.shippingAddress === "object" && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h3 className="font-bold text-brand text-sm mb-2">Adresse de livraison</h3>
                    <p className="text-sm text-gray-600">
                      {(order.shippingAddress as any).line1},{" "}
                      {(order.shippingAddress as any).postalCode} {(order.shippingAddress as any).city},{" "}
                      {(order.shippingAddress as any).country || "FR"}
                    </p>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
