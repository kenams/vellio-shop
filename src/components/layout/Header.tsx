"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { useLangStore } from "@/store/langStore";
import { getT } from "@/lib/i18n";

const navItems = [
  { href: "/produits", label: "Collection" },
  { href: "/categorie/tech-gadgets", label: "Tech" },
  { href: "/categorie/maison-intelligente", label: "Maison" },
  { href: "/categorie/sport-fitness", label: "Sport" },
  { href: "/categorie/bureau-productivite", label: "Bureau" },
  { href: "/blog", label: "Journal" },
];

export default function Header() {
  const { locale, setLocale } = useLangStore();
  const t = getT(locale);
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleLang() {
    setLocale(locale === "fr" ? "en" : "fr");
    setTimeout(() => window.location.reload(), 50);
  }

  return (
    <>
      <div className="border-b border-white/10 bg-brand px-4 py-2 text-center text-[11px] font-medium tracking-[0.18em] text-white/80">
        <span className="mr-2 text-brand-accent">⚡</span>
        SÉLECTION PREMIUM · Meilleurs prix Amazon · Livraison Prime incluse
        <span className="ml-2 text-brand-accent">⚡</span>
      </div>

      <header className="sticky top-0 z-50 border-b border-black/10 bg-brand-ivory/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label="Vellio">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-accent/35 bg-brand text-sm font-serif text-brand-accent transition-colors group-hover:bg-brand-graphite">
              V
            </span>
            <span className="font-serif text-2xl font-semibold tracking-normal text-brand">Vellio</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-brand/62 transition-all hover:bg-white/70 hover:text-brand">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/produits" className="hidden rounded-full p-2.5 text-brand/60 transition-all hover:bg-white/75 hover:text-brand sm:inline-flex" aria-label="Rechercher">
              <Search className="h-4 w-4" />
            </Link>

            <button
              onClick={toggleLang}
              className="hidden rounded-full border border-black/10 bg-white/55 px-3 py-2 text-xs font-semibold text-brand/65 transition-all hover:border-brand-accent/45 hover:text-brand sm:inline-flex"
              title={locale === "fr" ? "Switch to English" : "Passer en français"}
            >
              {locale === "fr" ? "EN" : "FR"}
            </button>

            <Link
              href="/produits"
              className="btn-primary px-4 py-2 text-sm"
            >
              {t("nav.cta")}
            </Link>

            <button
              className="rounded-full p-2.5 text-brand md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-black/10 bg-brand-ivory px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-brand/75 transition-colors hover:bg-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2">
                <Link href="/produits" onClick={() => setMenuOpen(false)} className="btn-primary flex-1">
                  {t("nav.cta")}
                </Link>
                <button onClick={toggleLang} className="btn-secondary px-5">
                  {locale === "fr" ? "EN" : "FR"}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
