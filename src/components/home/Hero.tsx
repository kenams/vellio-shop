"use client";
import Link from "next/link";
import { ArrowRight, Zap, TrendingUp, Star, Shield, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-brand text-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-accent/10 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.12),_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            IA mise à jour — {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 animate-slide-up">
            Découvrez ce qui est
            <br />
            <span className="gradient-text-white">tendance</span>
            <span className="text-brand-accent"> avant</span>
            <br />tout le monde.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
            Notre IA analyse Google Trends, TikTok et les données fournisseurs chaque jour pour sélectionner uniquement les meilleurs produits.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/produits" className="btn-primary text-base px-8 py-4 rounded-2xl shadow-btn">
              Voir les tendances <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/produits?filter=top" className="glass rounded-2xl px-6 py-4 text-base font-semibold hover:bg-white/20 transition-all flex items-center gap-2 justify-center">
              <TrendingUp className="w-5 h-5 text-orange-300" /> Top produits IA
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-white/60">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span><strong className="text-white">4.8/5</strong> — 2 400+ avis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Paiement sécurisé Stripe</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-300" />
              <span>Livraison suivie 7-14j</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-12 md:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-lg">
          {[
            { value: "12k+", label: "Clients satisfaits" },
            { value: "4.8★", label: "Note moyenne" },
            { value: "30j", label: "Retours garantis" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl px-3 py-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-brand-accent">{s.value}</div>
              <div className="text-white/60 text-xs sm:text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
