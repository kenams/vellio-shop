"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle2, Clock, XCircle } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";

interface OrderResult {
  orderNumber: string;
  status: string;
  total: number;
  trackingNumber?: string;
  createdAt: string;
  items: { name: string; quantity: number; price: number }[];
}

const STATUS_MAP: Record<string, { label: string; icon: typeof Package; color: string }> = {
  PENDING:    { label: "En attente de paiement", icon: Clock,         color: "text-yellow-500 bg-yellow-50" },
  PAID:       { label: "Paiement reçu",          icon: CheckCircle2,  color: "text-green-500 bg-green-50" },
  PROCESSING: { label: "En préparation",         icon: Package,       color: "text-blue-500 bg-blue-50" },
  SHIPPED:    { label: "Expédiée",               icon: Truck,         color: "text-purple-500 bg-purple-50" },
  DELIVERED:  { label: "Livrée",                 icon: CheckCircle2,  color: "text-brand-accent bg-red-50" },
  CANCELLED:  { label: "Annulée",               icon: XCircle,       color: "text-gray-500 bg-gray-50" },
  REFUNDED:   { label: "Remboursée",             icon: XCircle,       color: "text-orange-500 bg-orange-50" },
};

export default function SuiviPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OrderResult | null>(null);
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/orders?orderNumber=${encodeURIComponent(orderNumber.trim())}&email=${encodeURIComponent(email.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        setError("Commande introuvable. Vérifiez le numéro de commande et l'email utilisé lors de l'achat.");
      }
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  const statusInfo = result ? (STATUS_MAP[result.status] || STATUS_MAP.PENDING) : null;
  const StatusIcon = statusInfo?.icon || Clock;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-3xl font-black text-brand mb-2">Suivre ma commande</h1>
        <p className="text-gray-500">Entrez votre numéro de commande et l'email utilisé lors de l'achat.</p>
      </div>

      <div className="card p-6 mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Numéro de commande <span className="text-brand-accent">*</span>
            </label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
              placeholder="VEL-XXXXXXXX-XXX"
              className="input-field font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email de commande <span className="text-brand-accent">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="votre@email.fr"
              className="input-field"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
            <Search className="w-4 h-4" />
            {loading ? "Recherche..." : "Rechercher ma commande"}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-6">
          {error}
        </div>
      )}

      {result && statusInfo && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Commande</p>
              <h2 className="font-black text-brand font-mono text-lg">{result.orderNumber}</h2>
              <p className="text-xs text-gray-400 mt-0.5">Passée le {formatDate(result.createdAt)}</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold ${statusInfo.color}`}>
              <StatusIcon className="w-4 h-4" />
              {statusInfo.label}
            </div>
          </div>

          {result.trackingNumber && (
            <div className="bg-blue-50 rounded-xl px-4 py-3 mb-5">
              <p className="text-xs text-blue-600 font-medium mb-1">Numéro de suivi colis</p>
              <p className="font-mono font-bold text-blue-800 text-sm">{result.trackingNumber}</p>
              <p className="text-xs text-blue-500 mt-1">
                Suivez votre colis sur le site du transporteur avec ce numéro.
              </p>
            </div>
          )}

          <div className="border-t border-gray-100 pt-4">
            <h3 className="font-semibold text-brand text-sm mb-3">Articles commandés</h3>
            <div className="space-y-2">
              {result.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} × {item.quantity}</span>
                  <span className="font-medium text-brand">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-2 flex justify-between font-black text-brand">
                <span>Total</span>
                <span className="text-brand-accent">{formatPrice(result.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
