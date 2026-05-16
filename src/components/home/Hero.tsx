"use client";
import Link from "next/link";
import { ArrowRight, Shield, Truck, Star } from "lucide-react";
import { useLangStore } from "@/store/langStore";
import { getT } from "@/lib/i18n";

export default function Hero() {
  const locale = useLangStore((s) => s.locale);
  const t = getT(locale);

  return (
    <section className="relative bg-gradient-brand text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-accent/10 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.12),_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {t("hero.badge")} — {new Date().toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", { weekday: "long", day: "numeric", month: "long" })}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 animate-slide-up">
            {t("hero.title1")}
            <br />
            <span className="gradient-text-white">{t("hero.title2")}</span>
            <span className="text-brand-accent"> {locale === "en" ? "" : ""}</span>
            <br />
            {t("hero.title3")}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/produits" className="btn-primary text-base px-8 py-4 rounded-2xl shadow-btn">
              {t("hero.cta1")} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/produits?filter=top" className="glass rounded-2xl px-6 py-4 text-base font-semibold hover:bg-white/20 transition-all flex items-center gap-2 justify-center">
              🔥 {t("hero.cta2")}
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-white/60">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span><strong className="text-white">{t("hero.stat2v")}</strong> — {t("hero.stat1l")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-green-400" />
              <span>{t("hero.trust1")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-300" />
              <span>{t("hero.trust2")}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 md:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-lg">
          {[
            { v: t("hero.stat1v"), l: t("hero.stat1l") },
            { v: t("hero.stat2v"), l: t("hero.stat2l") },
            { v: t("hero.stat3v"), l: t("hero.stat3l") },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl px-3 py-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-brand-accent">{s.v}</div>
              <div className="text-white/60 text-xs sm:text-sm mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
