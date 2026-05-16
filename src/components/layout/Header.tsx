"use client";
import Link from "next/link";
import { ShoppingCart, Menu, X, Zap, Truck, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

const nav = [
  { href: "/produits", label: "Catalogue" },
  {
    label: "Catégories",
    children: [
      { href: "/categorie/gadgets-voiture", label: "🚗 Auto & Voyage" },
      { href: "/categorie/maison-intelligente", label: "🏠 Maison Intelligente" },
      { href: "/categorie/cuisine-pratique", label: "🍳 Cuisine Pratique" },
      { href: "/categorie/sport-fitness", label: "💪 Sport & Fitness" },
      { href: "/categorie/beaute-soin", label: "✨ Beauté & Soin" },
      { href: "/categorie/tech-gadgets", label: "📱 Tech & Gadgets" },
    ],
  },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const { count, setOpen } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const cartCount = count();

  return (
    <>
      {/* Barre annonce */}
      <div className="bg-gradient-brand text-white text-xs text-center py-2.5 px-4">
        <span className="flex items-center justify-center gap-2">
          <Truck className="w-3.5 h-3.5 text-orange-300 flex-shrink-0" />
          🎉 Livraison <strong className="font-bold">GRATUITE</strong> dès 50€ &nbsp;·&nbsp; Paiement 100% sécurisé &nbsp;·&nbsp; Retours 30 jours
        </span>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-300" />
              </div>
              <span className="font-black text-xl tracking-tight text-brand">vellio</span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {nav.map((n) =>
                n.children ? (
                  <div key="categories" className="relative" onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 rounded-xl hover:bg-primary-50 transition-all">
                      {n.label} <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {dropOpen && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-card-hover border border-gray-100 py-2 z-50 animate-fade-in">
                        {n.children.map((c) => (
                          <Link key={c.href} href={c.href} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={n.href} href={n.href!} className="text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 rounded-xl hover:bg-primary-50 transition-all">
                    {n.label}
                  </Link>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link href="/produits" className="hidden sm:flex btn-violet text-sm px-4 py-2 rounded-xl text-sm font-semibold">
                Voir les tendances
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="relative p-2.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-btn leading-none">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {menuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 pt-3 animate-slide-up">
              <div className="flex flex-col gap-1">
                <Link href="/produits" onClick={() => setMenuOpen(false)} className="flex items-center px-3 py-3 text-sm font-semibold text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">
                  Catalogue
                </Link>
                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Catégories</div>
                {nav[1].children?.map((c) => (
                  <Link key={c.href} href={c.href} onClick={() => setMenuOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">
                    {c.label}
                  </Link>
                ))}
                <Link href="/blog" onClick={() => setMenuOpen(false)} className="flex items-center px-3 py-3 text-sm font-semibold text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">
                  Blog
                </Link>
                <div className="pt-2">
                  <Link href="/produits" onClick={() => setMenuOpen(false)} className="btn-primary w-full text-center text-sm">
                    Voir toutes les tendances →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
