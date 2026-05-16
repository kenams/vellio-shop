"use client";
import Link from "next/link";
import { ShoppingCart, Search, Menu, Zap, Truck } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

const nav = [
  { href: "/produits", label: "Catalogue" },
  { href: "/categorie/gadgets-voiture", label: "Auto" },
  { href: "/categorie/maison-intelligente", label: "Maison" },
  { href: "/categorie/cuisine-pratique", label: "Cuisine" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const { count, setOpen } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Barre livraison gratuite */}
      <div className="bg-brand text-white text-xs text-center py-2 px-4 flex items-center justify-center gap-2">
        <Truck className="w-3.5 h-3.5 text-brand-accent" />
        <span>🎉 Livraison <strong>GRATUITE</strong> dès 50€ — Paiement sécurisé SSL — Retours 30 jours</span>
      </div>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-brand">
              <Zap className="w-6 h-6 text-brand-accent" />
              vellio
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-6">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="text-sm font-medium text-gray-600 hover:text-brand transition-colors">
                  {n.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href="/produits" className="p-2 text-gray-500 hover:text-brand transition-colors">
                <Search className="w-5 h-5" />
              </Link>
              <button onClick={() => setOpen(true)} className="relative p-2 text-gray-500 hover:text-brand transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {count() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {count()}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2 text-gray-500" onClick={() => setMenuOpen(!menuOpen)}>
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {menuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 pt-3 flex flex-col gap-3">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-1">
                  {n.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
