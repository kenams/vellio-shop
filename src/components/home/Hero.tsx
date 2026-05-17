"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLangStore } from "@/store/langStore";
import { getT } from "@/lib/i18n";

const heroImage = "https://images.pexels.com/photos/28255125/pexels-photo-28255125.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop";

export default function Hero() {
  const locale = useLangStore((s) => s.locale);
  const t = getT(locale);
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="relative min-h-[calc(100vh-104px)] overflow-hidden bg-brand text-white">
      <Image
        src={heroImage}
        alt="Objet de soin premium dans une mise en scène Vellio"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/58 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-ivory to-transparent" />

      <div className="relative mx-auto flex min-h-[calc(100vh-104px)] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div {...motionProps} className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
            {t("hero.badge")}
          </div>

          <h1 className="text-balance font-serif text-5xl font-semibold leading-[0.88] tracking-normal sm:text-7xl lg:text-8xl">
            {t("hero.title1")}
            <span className="block text-brand-accent">{t("hero.title2")}</span>
            <span className="block">{t("hero.title3")}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">{t("hero.subtitle")}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/produits" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand transition-all hover:-translate-y-0.5 hover:bg-brand-ivory">
              {t("hero.cta1")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/produits?filter=top" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/15">
              {t("hero.cta2")}
            </Link>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
            {[
              { value: t("hero.stat1v"), label: t("hero.stat1l") },
              { value: t("hero.stat2v"), label: t("hero.stat2l") },
              { value: t("hero.stat3v"), label: t("hero.stat3l") },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-semibold text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-xs text-white/60">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-accent" /> {t("hero.trust1")}</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-accent" /> {t("hero.trust2")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
