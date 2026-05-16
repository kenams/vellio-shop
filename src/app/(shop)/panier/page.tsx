"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Shield, Truck, Lock, RotateCcw, Star, CheckCircle, Zap } from "lucide-react";
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
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mx-auto mb-6 shadow-card">
          <ShoppingBag className="w-10 h-10 text-primary-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand mb-3">Votre panier est vide</h1>
        <p className="text-gray-500 mb-8">Découvrez nos produits tendance sélectionnés par IA et ajoutez-en à votre panier.</p>
        <Link href="/produits" className="btn-primary">
          <Zap className="w-4 h-4" /> Voir les tendances
        </Link>
      </div>
    );
  }

  const subtotal = total();
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const orderTotal = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/produits" className="p-2.5 hover:bg-white hover:shadow-card rounded-xl transition-all text-gray-500">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand">Mon panier</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {items.reduce((s, i) => s + i.quantity, 0)} article{items.reduce((s, i) => s + i.quantity, 0) > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Livraison gratuite progress */}
      {shipping > 0 && (
        <div className="card p-4 mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-orange-700">
              Encore <strong>{formatPrice(50 - subtotal)}</strong> pour la livraison gratuite !
            </span>
            <Truck className="w-4 h-4 text-orange-500" />
          </div>
          <div className="w-full bg-orange-100 rounded-full h-2">
            <div className="bg-brand-accent h-2 rounded-full transition-all" style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Articles */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="card flex gap-4 p-4 hover:shadow-card-hover transition-all duration-200">
              <Link href={`/produits/${item.slug}`} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill className="object-cover hover:scale-105 transition-transform" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/produits/${item.slug}`} className="font-bold text-sm text-brand hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                    {item.name}
                  </Link>
                  <button
                    onClick={() => { removeItem(item.id); toast.success("Retiré du panier"); }}
                    className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-brand-accent font-black text-lg mt-1">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-gray-400 hover:bg-gray-50 transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-1.5 font-black text-sm text-brand border-x-2 border-gray-100">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-gray-400 hover:bg-gray-50 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    = <span className="font-black text-brand">{formatPrice(item.price * item.quantity)}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Continuer shopping */}
          <Link href="/produits" className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-semibold mt-2 p-3 hover:bg-primary-50 rounded-xl transition-all w-fit">
            <ArrowLeft className="w-4 h-4" /> Continuer mes achats
          </Link>
        </div>

        {/* Résumé */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-black text-brand text-xl mb-5">Résumé</h2>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span className="font-semibold">
                  {shipping === 0 ? (
                    <span className="text-green-600 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Gratuite
                    </span>
                  ) : formatPrice(shipping)}
                </span>
              </div>
              <div className="border-t-2 border-dashed border-gray-100 pt-3 flex justify-between font-black text-brand text-lg">
                <span>Total TTC</span>
                <span className="text-brand-accent">{formatPrice(orderTotal)}</span>
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-700 block mb-1.5 uppercase tracking-wide">
                Email pour le suivi *
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                className={`input-field text-sm ${emailError ? "border-red-400 ring-2 ring-red-200" : ""}`}
              />
              {emailError && <p className="text-xs text-red-500 mt-1 font-medium">{emailError}</p>}
            </div>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mb-3"
            >
              <Lock className="w-4 h-4" />
              {loading ? "Redirection Stripe..." : "Payer en toute sécurité →"}
            </button>

            {/* Payment icons */}
            <div className="flex items-center justify-center gap-1.5 mb-4">
              {["VISA", "MC", "CB", "PayPal"].map(m => (
                <span key={m} className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2.5 py-1.5 rounded-lg">{m}</span>
              ))}
            </div>

            {/* Trust seals */}
            <div className="space-y-2 border-t border-gray-100 pt-4">
              {[
                { icon: Shield, color: "text-green-500", text: "Paiement 100% sécurisé — Stripe PCI-DSS" },
                { icon: Truck, color: "text-blue-500", text: "Livraison suivie 7-14 jours ouvrés" },
                { icon: RotateCcw, color: "text-violet-500", text: "Retours gratuits sous 30 jours" },
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
