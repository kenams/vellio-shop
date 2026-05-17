"use client";

import { useCartStore } from "@/store/cartStore";
import { LockKeyhole, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total, count } = useCartStore();

  if (!isOpen) return null;

  const subtotal = total();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99;
  const progressPct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-[60] flex">
      <div className="flex-1 bg-black/65 backdrop-blur-sm" onClick={() => setOpen(false)} />

      <aside className="flex h-full w-full max-w-md flex-col bg-brand-ivory shadow-2xl animate-slide-in">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/42">Maison Vellio</p>
            <h2 className="mt-1 font-serif text-3xl font-semibold text-brand">
              Votre sélection{count() > 0 && <span className="ml-2 text-lg text-brand-accent">({count()})</span>}
            </h2>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-full border border-black/10 bg-white p-2 text-brand/60 transition-colors hover:text-brand" aria-label="Fermer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-accent/25 bg-white">
                <ShoppingBag className="h-7 w-7 text-brand-accent" />
              </div>
              <p className="mt-5 font-serif text-3xl font-semibold text-brand">Aucune pièce sélectionnée</p>
              <p className="mt-2 text-sm leading-6 text-brand/55">Découvrez la collection Vellio et composez votre sélection.</p>
              <Link href="/produits" onClick={() => setOpen(false)} className="btn-primary mt-6">
                Explorer la collection
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="group flex gap-3 rounded-[1.25rem] border border-black/10 bg-white/70 p-3 shadow-card">
                <Link href={`/produits/${item.slug}`} onClick={() => setOpen(false)} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-brand-ivory">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold leading-snug text-brand">{item.name}</p>
                  <p className="mt-1 text-sm font-semibold text-brand">{formatPrice(item.price)}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center rounded-full border border-black/10 bg-brand-ivory">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-brand/45 transition-colors hover:text-brand" aria-label="Réduire">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-7 text-center text-xs font-semibold text-brand">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-brand/45 transition-colors hover:text-brand" aria-label="Augmenter">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-xs text-brand/45">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="self-start rounded-full p-2 text-brand/25 opacity-100 transition-colors hover:bg-red-50 hover:text-red-600 sm:opacity-0 sm:group-hover:opacity-100" aria-label="Retirer">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-black/10 bg-white/60 p-5">
            {/* Shipping progress bar */}
            {shipping > 0 ? (
              <div className="mb-4">
                <p className="mb-2 text-center text-xs font-medium text-brand/60">
                  Encore <strong className="text-brand">{formatPrice(remaining)}</strong> pour la livraison offerte
                </p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/8">
                  <div
                    className="h-full rounded-full bg-brand-accent transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4 flex items-center justify-center gap-2 rounded-full bg-green-50 py-2 text-xs font-semibold text-green-700">
                <span>✓</span> Livraison offerte débloquée
              </div>
            )}

            <div className="flex items-end justify-between">
              <span className="text-sm font-medium text-brand/55">Total TTC</span>
              <div className="text-right">
                <p className="text-2xl font-semibold text-brand">{formatPrice(subtotal + shipping)}</p>
                {shipping > 0 && <p className="text-xs text-brand/40">dont {formatPrice(shipping)} de livraison</p>}
              </div>
            </div>

            <Link href="/panier" onClick={() => setOpen(false)} className="btn-primary mt-5 w-full">
              <LockKeyhole className="h-4 w-4" />
              Finaliser en sécurité
            </Link>
            <button onClick={() => setOpen(false)} className="btn-secondary mt-3 w-full">
              Poursuivre la sélection
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
