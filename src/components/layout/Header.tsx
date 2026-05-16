"use client";
import Link from "next/link";
import { ShoppingCart, Menu, X, Zap, Truck, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useLangStore } from "@/store/langStore";
import { getT } from "@/lib/i18n";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

const NAV_CATEGORIES = [
  { slug: "gadgets-voiture", fr: "🚗 Auto & Voyage", en: "🚗 Car & Travel" },
  { slug: "maison-intelligente", fr: "🏠 Maison Intelligente", en: "🏠 Smart Home" },
  { slug: "cuisine-pratique", fr: "🍳 Cuisine Pratique", en: "🍳 Kitchen Essentials" },
  { slug: "sport-fitness", fr: "💪 Sport & Fitness", en: "💪 Sport & Fitness" },
  { slug: "beaute-soin", fr: "✨ Beauté & Soin", en: "✨ Beauty & Care" },
  { slug: "tech-gadgets", fr: "📱 Tech & Gadgets", en: "📱 Tech & Gadgets" },
];

export default function Header() {
  const { count, setOpen } = useCartStore();
  const { locale, setLocale } = useLangStore();
  const t = getT(locale);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const cartCount = count();

  function toggleLang() {
    setLocale(locale === "fr" ? "en" : "fr");
    // Reload so server components re-read the cookie
    setTimeout(() => window.location.reload(), 50);
  }

  return (
    <>
      {/* Barre annonce */}
      <div className="bg-gradient-brand text-white text-xs text-center py-2.5 px-4">
        <span className="flex items-center justify-center gap-2">
          <Truck className="w-3.5 h-3.5 text-orange-300 flex-shrink-0" />
          {t("delivery.banner")}
        </span>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-300" />
              </div>
              <span className="font-black text-xl tracking-tight text-brand">vellio</span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
              <Link href="/produits" className="text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 rounded-xl hover:bg-primary-50 transition-all">
                {t("nav.catalogue")}
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setDropOpen(true)}
                onMouseLeave={() => setDropOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 rounded-xl hover:bg-primary-50 transition-all">
                  {t("nav.categories")} <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {dropOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-card-hover border border-gray-100 py-2 z-50 animate-fade-in">
                    {NAV_CATEGORIES.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/categorie/${c.slug}`}
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {locale === "en" ? c.en : c.fr}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 rounded-xl hover:bg-primary-50 transition-all">
                {t("nav.blog")}
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Language switcher */}
              <button
                onClick={toggleLang}
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-700"
                title={locale === "fr" ? "Switch to English" : "Passer en Français"}
              >
                <span className="text-base">{locale === "fr" ? "🇬🇧" : "🇫🇷"}</span>
                <span>{locale === "fr" ? "EN" : "FR"}</span>
              </button>

              <Link href="/produits" className="hidden lg:flex btn-violet text-sm px-4 py-2 rounded-xl font-semibold">
                {t("nav.cta")}
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
                  {t("nav.catalogue")}
                </Link>
                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{t("nav.categories")}</div>
                {NAV_CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/categorie/${c.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                  >
                    {locale === "en" ? c.en : c.fr}
                  </Link>
                ))}
                <Link href="/blog" onClick={() => setMenuOpen(false)} className="flex items-center px-3 py-3 text-sm font-semibold text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors">
                  {t("nav.blog")}
                </Link>
                <div className="flex items-center gap-3 px-3 pt-2">
                  <Link href="/produits" onClick={() => setMenuOpen(false)} className="btn-primary flex-1 text-center text-sm">
                    {t("nav.cta")} →
                  </Link>
                  <button
                    onClick={toggleLang}
                    className="flex items-center gap-1.5 text-sm font-bold px-4 py-3 rounded-xl border border-gray-200 hover:bg-primary-50 transition-all"
                  >
                    <span>{locale === "fr" ? "🇬🇧" : "🇫🇷"}</span>
                    <span className="text-gray-600">{locale === "fr" ? "EN" : "FR"}</span>
                  </button>
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
