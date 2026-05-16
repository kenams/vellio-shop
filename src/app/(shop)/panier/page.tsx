"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Shield, Truck, Lock, RotateCcw, Star, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  async function handleCheckout() {
    if (items.length === 0) return;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Veuillez entrer une adresse email valide");
      return;
    }
    setEmailError("");
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
          customerEmail: email,
          customerName: "Client",
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Erreur lors de l'initialisation du paiement.");
      }
    } catch {
      toast.error("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-9 h-9 text-gray-400" />
        </div>
        <h1 className="text-2xl font-black text-brand mb-3">Votre panier est vide</h1>
        <p className="text-gray-500 mb-8">Découvrez nos produits tendance et ajoutez-en à votre panier.</p>
        <Link href="/produits" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Voir les produits
        </Link>
      </div>
    );
  }

  const subtotal = total();
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const orderTotal = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/produits" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-black text-brand">Mon panier</h1>
        <span className="bg-gray-100 text-gray-600 text-sm font-bold px-2.5 py-1 rounded-full">
          {items.reduce((s, i) => s + i.quantity, 0)} article{items.reduce((s, i) => s + i.quantity, 0) > 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste articles */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card flex gap-4 p-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/produits/${item.slug}`} className="font-semibold text-brand hover:text-primary-600 transition-colors line-clamp-2 text-sm leading-snug">
                    {item.name}
                  </Link>
                  <button
                    onClick={() => { removeItem(item.id); toast.success("Retiré du panier"); }}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-brand-accent font-bold text-base mt-1">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 py-1.5 font-semibold text-sm border-x border-gray-200">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Total: <span className="font-bold text-brand">{formatPrice(item.price * item.quantity)}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé commande */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-black text-brand text-xl mb-5">Résumé de commande</h2>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-500 font-bold">Gratuite 🎉</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-orange-600 bg-orange-50 rounded-lg px-3 py-2 font-medium">
                  ➕ Plus que <strong>{formatPrice(50 - subtotal)}</strong> pour la livraison gratuite !
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-brand text-base">
                <span>Total TTC</span>
                <span className="text-brand-accent">{formatPrice(orderTotal)}</span>
              </div>
            </div>

            {/* Champ email */}
            <div className="mb-3">
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                Email pour le suivi de commande *
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  emailError ? "border-red-400 bg-red-50" : "border-gray-200"
                }`}
              />
              {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-3 py-3.5"
            >
              <Lock className="w-4 h-4" />
              {loading ? "Redirection..." : "Payer en toute sécurité →"}
            </button>

            {/* Modes de paiement */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {["VISA", "MC", "PayPal", "CB"].map(m => (
                <span key={m} className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md">{m}</span>
              ))}
            </div>

            {/* Trust seals */}
            <div className="space-y-2 border-t border-gray-100 pt-4">
              {[
                { icon: Shield, color: "text-green-500", text: "Paiement 100% sécurisé — Stripe certifié PCI-DSS" },
                { icon: Truck, color: "text-blue-500", text: "Livraison suivie 7-14 jours ouvrés" },
                { icon: RotateCcw, color: "text-purple-500", text: "Retours gratuits sous 30 jours" },
                { icon: Star, color: "text-yellow-500", text: "4.8/5 — Plus de 2 400 clients satisfaits" },
              ].map(({ icon: Icon, color, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                  <Icon className={`w-3.5 h-3.5 ${color} flex-shrink-0`} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
