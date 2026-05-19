export const revalidate = 600; // ISR 10min
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { toPublicProduct } from "@/lib/premium-brand";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Cadeaux Premium Originaux — Idées cadeaux haut de gamme | Vellio",
  description: "Découvrez notre sélection de cadeaux premium et originaux : objets design, tech lifestyle et accessoires maison. Livraison offerte dès 50€. Retours 30 jours.",
  alternates: { canonical: "/cadeaux-premium" },
  openGraph: {
    type: "website",
    title: "Cadeaux Premium Originaux | Vellio",
    description: "Sélection de cadeaux haut de gamme : objets design, tech et maison. Livraison offerte dès 50€.",
    url: "https://vellio.fr/cadeaux-premium",
  },
};

const occasions = [
  { label: "Anniversaire", icon: "🎂", href: "/produits" },
  { label: "Noël", icon: "🎄", href: "/produits" },
  { label: "Saint-Valentin", icon: "❤️", href: "/produits" },
  { label: "Mariage", icon: "💍", href: "/produits" },
  { label: "Fête des Mères", icon: "🌸", href: "/produits" },
  { label: "Retraite", icon: "🥂", href: "/produits" },
];

const guarantees = [
  "Livraison suivie offerte dès 50€",
  "Retours sans frais sous 30 jours",
  "Emballage soigné — prêt à offrir",
  "Paiement sécurisé Stripe",
];

export default async function CadeauxPremiumPage() {
  const products = await prisma.product.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { trendScore: "desc" }],
    take: 8,
    include: { images: { take: 1, orderBy: { position: "asc" } }, trendData: true, category: true },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cadeaux Premium Originaux — Vellio",
    description: "Sélection de cadeaux haut de gamme : objets design, tech lifestyle et accessoires maison.",
    url: "https://vellio.fr/cadeaux-premium",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://vellio.fr" },
        { "@type": "ListItem", position: 2, name: "Cadeaux Premium", item: "https://vellio.fr/cadeaux-premium" },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-brand-ivory">
        {/* Hero */}
        <section className="bg-brand text-white">
          <Container className="py-16 sm:py-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">Vellio — Maison de sélection</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[0.9] sm:text-7xl">
              Cadeaux premium.<br />Originaux. Mémorables.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/62">
              Trouver le cadeau parfait est un art. Chez Vellio, chaque pièce est choisie selon des critères exigeants : usage clair, finition irréprochable, désirabilité durable. Des objets que l'on garde, pas que l'on range.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/produits" className="btn-primary">
                Voir toute la sélection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/categorie/cadeaux-premium" className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10">
                Univers cadeaux
              </Link>
            </div>
          </Container>
        </section>

        {/* Occasions */}
        <Container className="py-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-accent mb-5">Par occasion</p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {occasions.map((o) => (
              <Link key={o.label} href={o.href} className="group flex flex-col items-center gap-2 rounded-[1.25rem] border border-black/10 bg-white/70 p-4 text-center transition-all hover:-translate-y-0.5 hover:border-brand-accent/35 hover:shadow-card">
                <span className="text-2xl">{o.icon}</span>
                <span className="text-xs font-medium text-brand/65 group-hover:text-brand">{o.label}</span>
              </Link>
            ))}
          </div>
        </Container>

        {/* Guarantees */}
        <Container className="pb-4">
          <div className="rounded-[1.5rem] border border-brand-accent/20 bg-white/70 p-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {guarantees.map((g) => (
                <div key={g} className="flex items-center gap-3 text-sm text-brand/65">
                  <Check className="h-4 w-4 shrink-0 text-brand-accent" />
                  {g}
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* Products */}
        <Container className="py-12">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent">Sélection en cours</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold text-brand">Les pièces à offrir</h2>
            </div>
            <Link href="/produits" className="btn-ghost hidden sm:inline-flex">Tout voir</Link>
          </div>
          <ProductGrid products={products.map((p) => toPublicProduct(p as any)) as unknown as Product[]} />
          <div className="mt-10 text-center">
            <Link href="/produits" className="btn-primary">
              Voir toute la collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>

        {/* Editorial */}
        <Container className="pb-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-black/10 bg-white p-8">
              <h2 className="font-serif text-3xl font-semibold text-brand">Comment choisir un cadeau premium ?</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-brand/62">
                <p>Un cadeau premium n'est pas simplement un objet cher. C'est un objet qui résonne avec celui qui le reçoit. Il conjugue trois qualités : un usage réel dans le quotidien, une finition qui traduit le soin apporté, et une présence visuelle qui ne lasse pas.</p>
                <p>Chez Vellio, chaque pièce est testée selon ces critères avant d'intégrer la sélection. Nous refusons les objets sans usage clair, même lorsqu'ils sont esthétiques. Et nous ne conservons que les références qui restent désirables avec le temps.</p>
                <p>Pour un budget de 30€ à 150€, la sélection Vellio couvre tous les profils : le passionné de tech, l'amateur d'intérieur, la personne soucieuse de son rituel quotidien, ou simplement quelqu'un qui apprécie les choses bien faites.</p>
              </div>
              <Link href="/blog/meilleurs-cadeaux-homme-originaux-2026" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:underline">
                Notre guide cadeaux 2026 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-[2rem] border border-black/10 bg-white p-8">
              <h2 className="font-serif text-3xl font-semibold text-brand">Idées cadeaux par profil</h2>
              <div className="mt-5 space-y-4">
                {[
                  { profil: "Pour lui", desc: "Tech signature, accessoires auto, gadgets bureau sobres", href: "/blog/meilleurs-cadeaux-homme-originaux-2026" },
                  { profil: "Pour elle", desc: "Rituels beauté, objets maison, accessoires lifestyle", href: "/blog/idee-cadeau-anniversaire-original-femme" },
                  { profil: "Pour la maison", desc: "Objets déco design, tech maison, bougies premium", href: "/categorie/maison-intelligente" },
                  { profil: "Pour le bureau", desc: "Accessoires desk premium, tech productivité", href: "/blog/accessoires-bureau-design-premium-teletravail" },
                ].map((item) => (
                  <Link key={item.profil} href={item.href} className="group flex items-start gap-4 rounded-2xl border border-black/10 p-4 transition-all hover:border-brand-accent/35">
                    <div className="h-2 w-2 mt-2.5 rounded-full bg-brand-accent shrink-0" />
                    <div>
                      <p className="font-semibold text-brand group-hover:text-brand-accent transition-colors">{item.profil}</p>
                      <p className="text-sm text-brand/55">{item.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-brand/30 group-hover:text-brand-accent ml-auto mt-1 shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
