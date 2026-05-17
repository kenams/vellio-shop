export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { getServerLocale } from "@/lib/locale-server";
import { getT } from "@/lib/i18n";
import { getPremiumCategory, getPremiumProductPresentation, toPublicProduct } from "@/lib/premium-brand";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductGrid from "@/components/product/ProductGrid";
import TrustBar from "@/components/ui/TrustBar";
import Newsletter from "@/components/ui/Newsletter";
import MotionWrapper from "@/components/ui/MotionWrapper";
import type { Product } from "@/types";

const editorialImage = "https://images.pexels.com/photos/10736999/pexels-photo-10736999.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop";

export default async function HomePage() {
  const locale = getServerLocale();
  const t = getT(locale);

  const [featured, categories, signatures] = await Promise.all([
    prisma.product.findMany({
      where: { published: true, locale },
      include: { images: { take: 1, orderBy: { position: "asc" } }, category: true },
      orderBy: [{ featured: "desc" }, { trendScore: "desc" }],
      take: 8,
    }),
    prisma.category.findMany({ orderBy: { createdAt: "asc" }, take: 8 }),
    prisma.product.findMany({
      where: { published: true, locale },
      include: { images: { take: 1, orderBy: { position: "asc" } }, category: true },
      orderBy: { trendScore: "desc" },
      take: 4,
    }),
  ]);

  const featuredFinal = featured.length > 0
    ? featured
    : await prisma.product.findMany({
        where: { published: true },
        include: { images: { take: 1, orderBy: { position: "asc" } }, category: true },
        orderBy: [{ featured: "desc" }, { trendScore: "desc" }],
        take: 8,
      });

  return (
    <>
      <Header />
      <main className="bg-brand-ivory">
        <Hero />

        <TrustBar />

        {categories.length > 0 && (
          <section className="py-16 sm:py-24">
            <Container>
              <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <SectionTitle
                  eyebrow={t("categories.tag")}
                  title={t("categories.title")}
                  subtitle="Des univers pensés comme une garde-robe d'objets : maison, tech, beauté, mobilité et rituels du quotidien."
                />
                <Link href="/produits" className="btn-secondary w-fit">
                  {t("common.viewAll")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category, index) => {
                  const premium = getPremiumCategory(category.slug, category.name, locale);
                  return (
                    <MotionWrapper key={category.id} delay={index * 0.04}>
                      <Link href={`/categorie/${category.slug}`} className="group flex min-h-52 flex-col justify-between rounded-[1.5rem] border border-black/10 bg-white/70 p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-brand-accent/35 hover:bg-white hover:shadow-card-hover">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent">{premium.accent}</p>
                          <h3 className="mt-4 font-serif text-3xl font-semibold leading-none text-brand">{premium.label}</h3>
                        </div>
                        <p className="mt-6 text-sm leading-6 text-brand/55">{premium.description}</p>
                      </Link>
                    </MotionWrapper>
                  );
                })}
              </div>
            </Container>
          </section>
        )}

        {featuredFinal.length > 0 && (
          <section className="pb-16 sm:pb-24">
            <Container>
              <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <SectionTitle eyebrow={t("featured.tag")} title={t("featured.title")} subtitle={t("featured.subtitle")} />
                <Link href="/produits" className="btn-primary w-fit">
                  {t("featured.viewAll")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <ProductGrid products={featuredFinal.map((product) => toPublicProduct(product as any, locale)) as unknown as Product[]} />
            </Container>
          </section>
        )}

        <section className="overflow-hidden bg-white py-16 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <MotionWrapper>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-black/10 bg-brand-ivory shadow-card">
                <Image src={editorialImage} alt="Lampe design dans un intérieur sobre" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
              </div>
            </MotionWrapper>
            <MotionWrapper delay={0.08}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">Art du détail</p>
              <h2 className="mt-5 max-w-2xl font-serif text-5xl font-semibold leading-[0.95] text-brand sm:text-6xl">
                Le luxe moderne réside dans la simplicité.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-brand/62">
                Vellio ne cherche pas l'accumulation. La Maison sélectionne des pièces utiles, visuellement calmes et suffisamment distinctives pour transformer un geste ordinaire en rituel.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["01", "Usage clair"],
                  ["02", "Ligne sobre"],
                  ["03", "Désirabilité mesurée"],
                ].map(([number, label]) => (
                  <div key={number} className="border-t border-black/10 pt-4">
                    <p className="font-serif text-3xl text-brand-accent">{number}</p>
                    <p className="mt-1 text-sm font-medium text-brand/65">{label}</p>
                  </div>
                ))}
              </div>
            </MotionWrapper>
          </Container>
        </section>

        {signatures.length > 0 && (
          <section className="py-16 sm:py-24">
            <Container>
              <div className="mb-10">
                <SectionTitle eyebrow={t("trending.tag")} title={`${t("trending.title")} ${t("trending.titleAccent")}`} subtitle={t("trending.desc")} />
              </div>
              <div className="grid gap-3 lg:grid-cols-4">
                {signatures.map((product, index) => {
                  const presentation = getPremiumProductPresentation(product as any, locale);
                  const image = product.images[0]?.url || "/placeholder.jpg";
                  return (
                    <MotionWrapper key={product.id} delay={index * 0.04}>
                      <Link href={`/produits/${product.slug}`} className="group flex items-center gap-4 rounded-[1.25rem] border border-black/10 bg-white/70 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand-accent/35 hover:bg-white hover:shadow-card-hover">
                        <span className="font-serif text-3xl text-brand/25">0{index + 1}</span>
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-brand-ivory">
                          <Image src={image} alt={presentation.name} fill className="object-cover" sizes="80px" />
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-1 text-sm font-semibold text-brand">{presentation.name}</p>
                          <p className="mt-1 text-sm text-brand/55">{formatPrice(product.price)}</p>
                        </div>
                      </Link>
                    </MotionWrapper>
                  );
                })}
              </div>
            </Container>
          </section>
        )}

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
