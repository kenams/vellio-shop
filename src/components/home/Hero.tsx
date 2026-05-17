"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Star, TrendingUp, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLangStore } from "@/store/langStore";
import { getT } from "@/lib/i18n";

const heroImage = "https://images.pexels.com/photos/28255125/pexels-photo-28255125.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop";

const floatingCards = [
  { emoji: "🕯️", name: "Bougie Ambre Noire", price: "42€", rating: 4.9, orders: 312 },
  { emoji: "🎧", name: "Casque Signature", price: "189€", rating: 4.8, orders: 217 },
];

function fade(delay = 0) {
  return { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const } };
}
function slideX(delay = 0, x = 30) {
  return { initial: { opacity: 0, x }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const } };
}

export default function Hero() {
  const locale = useLangStore((s) => s.locale);
  const t = getT(locale);
  const reduceMotion = useReducedMotion();
  const m = (props: ReturnType<typeof fade>) => (reduceMotion ? {} : props);

  return (
    <section className="relative min-h-[calc(100vh-104px)] overflow-hidden bg-brand text-white">
      <Image
        src={heroImage}
        alt="Objet de soin premium dans une mise en scène Vellio"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/65 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-ivory to-transparent" />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute right-[15%] top-[10%] h-80 w-80 rounded-full bg-brand-accent/8 blur-[90px]" />
      <div className="pointer-events-none absolute right-[35%] bottom-[20%] h-60 w-60 rounded-full bg-brand-accent/6 blur-[70px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-104px)] max-w-7xl grid-cols-1 items-center gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">

        {/* Left column */}
        <motion.div {...m(fade(0))}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
            {t("hero.badge")}
          </div>

          <h1 className="text-balance font-serif text-5xl font-semibold leading-[0.88] tracking-normal sm:text-7xl lg:text-[82px]">
            {t("hero.title1")}
            <span className="block text-brand-accent">{t("hero.title2")}</span>
            <span className="block">{t("hero.title3")}</span>
          </h1>

          <motion.p {...m(fade(0.12))} className="mt-7 max-w-lg text-base leading-8 text-white/65 sm:text-lg">{t("hero.subtitle")}</motion.p>

          <motion.div {...m(fade(0.2))} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/produits" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand transition-all hover:-translate-y-0.5 hover:bg-brand-ivory active:translate-y-0">
              {t("hero.cta1")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/produits?filter=top" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/14 active:translate-y-0">
              {t("hero.cta2")}
            </Link>
          </motion.div>

          <motion.div {...m(fade(0.28))} className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/12 pt-6">
            {[
              { value: t("hero.stat1v"), label: t("hero.stat1l") },
              { value: t("hero.stat2v"), label: t("hero.stat2l") },
              { value: t("hero.stat3v"), label: t("hero.stat3l") },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-semibold text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-white/50">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div {...m(fade(0.34))} className="mt-8 flex flex-wrap gap-4 text-xs text-white/55">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-accent" /> {t("hero.trust1")}</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-accent" /> {t("hero.trust2")}</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-accent" /> Retours 30 jours</span>
          </motion.div>
        </motion.div>

        {/* Right column — floating social proof */}
        <div className="relative hidden lg:flex lg:flex-col lg:gap-4">

          {/* Live trends indicator */}
          <motion.div {...m(slideX(0.18, 40))}
            className="flex items-center gap-3 self-start rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            <TrendingUp className="h-3.5 w-3.5 text-brand-accent" />
            <span className="text-xs font-semibold text-white/75">Tendances en temps réel</span>
          </motion.div>

          {/* Product cards */}
          {floatingCards.map((card, i) => (
            <motion.div key={card.name} {...m(slideX(0.24 + i * 0.1, 40))}
              className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-md"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/10 text-2xl">{card.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{card.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className="h-3 w-3 fill-brand-accent text-brand-accent" />
                      ))}
                    </div>
                    <span className="text-[11px] text-white/55">{card.rating} · {card.orders} commandes</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-brand-accent">{card.price}</span>
              </div>
            </motion.div>
          ))}

          {/* Aggregate rating card */}
          <motion.div {...m(slideX(0.44, 40))}
            className="rounded-2xl border border-brand-accent/25 bg-brand-accent/8 p-4 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">Score Vellio</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-semibold text-white">4.8</span>
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="h-4 w-4 fill-brand-accent text-brand-accent" />)}
                  </div>
                </div>
                <p className="mt-1 text-xs text-white/50">Basé sur 2 400+ avis vérifiés</p>
              </div>
              <Zap className="h-8 w-8 text-brand-accent/60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
