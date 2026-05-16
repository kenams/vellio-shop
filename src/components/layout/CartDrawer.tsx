"use client";
import { useCartStore } from "@/store/cartStore";
import { X, ShoppingBag, Minus, Plus, Trash2, Lock, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total, count } = useCartStore();

  if (!isOpen) return null;

  const subtotal = total();
  const shipping = subtotal >= 50 ? 0 : 4.99;

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

      {/* Drawer */}
      <div className="w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-brand text-white">
          <h2 className="text-base font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Mon panier
            {count() > 0 && (
              <span className="bg-brand-accent text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {count()}
              </span>
            )}
          </h2>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-primary-300" />
              </div>
              <p className="font-semibold text-gray-700 mb-1">Votre panier est vide</p>
              <p className="text-sm text-gray-400 mb-4">Découvrez nos produits tendance</p>
              <Link href="/produits" onClick={() => setOpen(false)} className="btn-violet text-sm px-5 py-2.5">
                <Zap className="w-4 h-4" /> Voir les tendances
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3.5 bg-slate-50 rounded-2xl hover:bg-primary-50/30 transition-colors group">
                <Link href={`/produits/${item.slug}`} onClick={() => setOpen(false)} className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-brand truncate leading-snug">{item.name}</p>
                  <p className="text-brand-accent font-black text-sm mt-0.5">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1 text-gray-400 hover:bg-gray-50 transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black text-brand px-2 border-x border-gray-200">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1 text-gray-400 hover:bg-gray-50 transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 flex-shrink-0 self-start">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 space-y-3 bg-slate-50/50">
            {/* Shipping info */}
            {shipping > 0 ? (
              <p className="text-xs text-orange-600 bg-orange-50 rounded-xl px-3 py-2 text-center font-medium">
                ➕ Plus que <strong>{formatPrice(50 - subtotal)}</strong> pour la livraison gratuite !
              </p>
            ) : (
              <p className="text-xs text-green-600 bg-green-50 rounded-xl px-3 py-2 text-center font-medium">
                ✅ Livraison gratuite débloquée !
              </p>
            )}

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700 text-sm">Total</span>
              <div className="text-right">
                <span className="text-xl font-black text-brand-accent">{formatPrice(subtotal + shipping)}</span>
                {shipping > 0 && <p className="text-[10px] text-gray-400">+ {formatPrice(shipping)} livraison</p>}
              </div>
            </div>

            <Link href="/panier" onClick={() => setOpen(false)} className="btn-primary w-full text-center text-sm py-3.5">
              <Lock className="w-4 h-4" /> Finaliser la commande →
            </Link>
            <button onClick={() => setOpen(false)} className="btn-secondary w-full text-center text-sm py-3">
              Continuer mes achats
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400">
              <Lock className="w-3 h-3 text-green-500" />
              Paiement sécurisé · Stripe PCI-DSS
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
