"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Shield, CreditCard } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function CommandePage() {
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "FR",
  });

  const subtotal = total();
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const orderTotal = subtotal + shipping;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);

    // Capturer email pour abandoned cart (envoi si la page est quittée)
    if (e.target.name === "email" && e.target.value.includes("@")) {
      const emailCaptured = e.target.value;
      if (typeof sessionStorage !== "undefined" && !sessionStorage.getItem(`recover_sent_${emailCaptured}`)) {
        sessionStorage.setItem("recover_email", emailCaptured);
        sessionStorage.setItem("recover_name", `${updated.firstName} ${updated.lastName}`.trim());
      }
    }
  }

  // Abandoned cart: send recovery email if user leaves without completing
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", () => {
      const email = sessionStorage.getItem("recover_email");
      if (!email || sessionStorage.getItem(`recover_sent_${email}`)) return;
      sessionStorage.setItem(`recover_sent_${email}`, "1");
      const name = sessionStorage.getItem("recover_name") || "";
      const cartItems = items.map((i) => ({ name: i.name, price: i.price }));
      navigator.sendBeacon("/api/email/recover", JSON.stringify({ email, name, items: cartItems }));
    }, { once: true });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) { toast.error("Votre panier est vide."); return; }

    const required: (keyof FormData)[] = ["firstName", "lastName", "email", "address", "city", "postalCode"];
    for (const field of required) {
      if (!form[field].trim()) {
        toast.error("Veuillez remplir tous les champs obligatoires.");
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
          customerEmail: form.email,
          customerName: `${form.firstName} ${form.lastName}`,
          shippingAddress: {
            line1: form.address,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
          },
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Erreur lors du paiement. Réessayez.");
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
        <h1 className="text-2xl font-black text-brand mb-3">Panier vide</h1>
        <Link href="/produits" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Découvrir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/panier" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-black text-brand">Finaliser la commande</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations personnelles */}
            <div className="card p-6">
              <h2 className="font-black text-brand text-lg mb-5">Informations personnelles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Prénom <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Jean"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nom <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Dupont"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jean@exemple.fr"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+33 6 12 34 56 78"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Adresse de livraison */}
            <div className="card p-6">
              <h2 className="font-black text-brand text-lg mb-5">Adresse de livraison</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Adresse <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    placeholder="12 rue de la Paix"
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Code postal <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      required
                      placeholder="75001"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Ville <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      placeholder="Paris"
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Pays</label>
                  <select name="country" value={form.country} onChange={handleChange} className="input-field">
                    <option value="FR">France</option>
                    <option value="BE">Belgique</option>
                    <option value="CH">Suisse</option>
                    <option value="LU">Luxembourg</option>
                    <option value="DE">Allemagne</option>
                    <option value="ES">Espagne</option>
                    <option value="IT">Italie</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Résumé commande */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-black text-brand text-xl mb-5">Votre commande</h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-brand line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">{formatPrice(item.price)} × {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-brand">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm mb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className={shipping === 0 ? "text-green-500 font-bold" : ""}>
                    {shipping === 0 ? "Gratuite" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between font-black text-brand text-base">
                  <span>Total TTC</span>
                  <span className="text-brand-accent">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-4 h-4" />
                {loading ? "Redirection..." : "Payer avec Stripe"}
              </button>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 justify-center">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                Paiement sécurisé SSL — Stripe
              </div>

              <p className="text-xs text-gray-400 text-center mt-2">
                En passant commande, vous acceptez nos{" "}
                <Link href="/cgv" className="underline hover:text-gray-600">CGV</Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
