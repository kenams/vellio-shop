"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle, LockKeyhole, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");

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
          items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
          customerEmail: email,
          customerName: name.trim() || email.split("@")[0],
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Le paiement n'a pas pu être initialisé.");
      }
    } catch {
      toast.error("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-brand-accent/25 bg-white shadow-card">
          <ShoppingBag className="h-9 w-9 text-brand-accent" />
        </div>
        <h1 className="mt-6 font-serif text-5xl font-semibold leading-none text-brand">Votre sélection est vide</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-brand/55">Explorez la collection Vellio et composez une sélection d'objets utiles, sobres et désirables.</p>
        <Link href="/produits" className="btn-primary mt-8">Explorer la collection</Link>
      </div>
    );
  }

  const subtotal = total();
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const orderTotal = subtotal + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/produits" className="rounded-full border border-black/10 bg-white p-2.5 text-brand/55 transition-colors hover:text-brand">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand/42">Maison Vellio</p>
          <h1 className="mt-1 font-serif text-4xl font-semibold text-brand">Votre sélection</h1>
          <p className="mt-1 text-sm text-brand/50">{itemCount} pièce{itemCount > 1 ? "s" : ""}</p>
        </div>
      </div>

      {shipping > 0 ? (
        <div className="mb-6 rounded-[1.25rem] border border-brand-accent/20 bg-white/75 p-4 shadow-card">
          <div className="mb-2 flex items-center justify-between text-sm text-brand/62">
            <span>Encore <strong className="text-brand">{formatPrice(50 - subtotal)}</strong> pour la livraison offerte.</span>
            <Truck className="h-4 w-4 text-brand-accent" />
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-brand-mist">
            <div className="h-full rounded-full bg-brand-accent transition-all" style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }} />
          </div>
        </div>
      ) : (
        <div className="mb-6 flex items-center gap-2 rounded-[1.25rem] border border-brand-accent/20 bg-brand-accent/10 p-4 text-sm font-medium text-brand">
          <CheckCircle className="h-4 w-4 text-brand-accent" />
          Livraison offerte débloquée.
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-[1.5rem] border border-black/10 bg-white/75 p-4 shadow-card">
              <Link href={`/produits/${item.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-brand-ivory">
                <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill className="object-cover" sizes="96px" />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/produits/${item.slug}`} className="line-clamp-2 text-sm font-semibold leading-snug text-brand transition-colors hover:text-brand-accent">
                    {item.name}
                  </Link>
                  <button
                    onClick={() => { removeItem(item.id); toast.success("Retiré de votre sélection"); }}
                    className="rounded-full p-2 text-brand/25 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Retirer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-lg font-semibold text-brand">{formatPrice(item.price)}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-black/10 bg-brand-ivory">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2.5 text-brand/45 transition-colors hover:text-brand" aria-label="Réduire">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-brand">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2.5 text-brand/45 transition-colors hover:text-brand" aria-label="Augmenter">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-sm text-brand/45">Total pièce : <strong className="text-brand">{formatPrice(item.price * item.quantity)}</strong></span>
                </div>
              </div>
            </div>
          ))}

          <Link href="/produits" className="btn-secondary mt-3 w-fit">
            <ArrowLeft className="h-4 w-4" />
            Poursuivre la sélection
          </Link>
        </div>

        <aside>
          <div className="sticky top-28 rounded-[1.5rem] border border-black/10 bg-white/80 p-6 shadow-card">
            <h2 className="font-serif text-3xl font-semibold text-brand">Récapitulatif</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-brand/58">
                <span>Sous-total</span>
                <span className="font-medium text-brand">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand/58">
                <span>Livraison</span>
                <span className="font-medium text-brand">{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span>
              </div>
              <div className="border-t border-black/10 pt-4">
                <div className="flex justify-between text-lg font-semibold text-brand">
                  <span>Total TTC</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.18em] text-brand/45">
              Votre nom
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Prénom Nom"
                className="input-field mt-2 normal-case tracking-normal"
              />
            </label>
            <label className="mt-3 block text-xs font-semibold uppercase tracking-[0.18em] text-brand/45">
              Email de suivi <span className="text-brand-accent">*</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="votre@email.fr"
                className={`input-field mt-2 normal-case tracking-normal ${emailError ? "border-red-400 ring-4 ring-red-100" : ""}`}
              />
            </label>
            {emailError && <p className="mt-2 text-xs font-medium text-red-600">{emailError}</p>}

            <button onClick={handleCheckout} disabled={loading} className="btn-primary mt-5 w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-60">
              <LockKeyhole className="h-4 w-4" />
              {loading ? "Redirection..." : "Finaliser en sécurité"}
            </button>

            <div className="mt-5 space-y-2 border-t border-black/10 pt-5">
              {[
                { icon: ShieldCheck, text: "Paiement sécurisé via Stripe" },
                { icon: Truck, text: "Livraison suivie" },
                { icon: CheckCircle, text: "Retours sous 30 jours" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-brand/50">
                  <Icon className="h-3.5 w-3.5 text-brand-accent" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
