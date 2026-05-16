"use client";
import Link from "next/link";
import { ArrowRight, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand to-brand-light text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#e9456030,_transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 text-brand-accent" />
            Produits détectés par IA — mis à jour chaque jour
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Découvrez ce qui est
            <span className="text-brand-accent"> tendance</span>
            <br />avant tout le monde.
          </h1>
          <p className="text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
            Notre IA analyse TikTok, les tendances de recherche et les données fournisseurs pour sélectionner uniquement les meilleurs produits.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/produits" className="btn-primary flex items-center gap-2 text-base">
              Voir les tendances <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/produits?filter=top" className="btn-secondary flex items-center gap-2 text-base bg-white/10 hover:bg-white/20 border-white/20 text-white">
              <TrendingUp className="w-4 h-4" /> Top 10 du moment
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg">
          {[
            { value: "4.8★", label: "Note moyenne" },
            { value: "12k+", label: "Clients satisfaits" },
            { value: "30j", label: "Retours garantis" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black text-brand-accent">{s.value}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
