export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Journal — Vellio",
  description: "Notes de style, objets design, rituels contemporains et inspirations premium par la Maison Vellio.",
};

const articles = [
  {
    slug: "meilleurs-cadeaux-homme-originaux-2026",
    title: "Meilleurs cadeaux originaux pour homme en 2026 — sélection premium",
    excerpt: "Trouver un cadeau original pour homme est un art. Objets utiles, premium et mémorables pour tous les budgets.",
    image: "https://images.pexels.com/photos/9775357/pexels-photo-9775357.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    category: "Cadeau",
    readTime: "7 min",
    date: "17 mai 2026",
  },
  {
    slug: "idee-cadeau-anniversaire-original-femme",
    title: "Idée cadeau anniversaire original pour femme : 12 pièces qui marquent",
    excerpt: "Des cadeaux d'anniversaire originaux et premium : objets de soin, accessoires maison et tech lifestyle.",
    image: "https://images.pexels.com/photos/28255125/pexels-photo-28255125.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    category: "Cadeau",
    readTime: "6 min",
    date: "14 mai 2026",
  },
  {
    slug: "accessoires-bureau-design-premium-teletravail",
    title: "Accessoires bureau design premium : équiper son espace de télétravail en 2026",
    excerpt: "Un bureau bien équipé améliore la concentration et l'image professionnelle. Sélection premium pour le télétravail.",
    image: "https://images.pexels.com/photos/9741343/pexels-photo-9741343.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    category: "Tech",
    readTime: "6 min",
    date: "16 mai 2026",
  },
  {
    slug: "objets-design-tendance-maison-2026",
    title: "Objets design tendance maison 2026 : ce que l'on remarque vraiment",
    excerpt: "Les tendances déco 2026 font la part belle aux matières naturelles et aux objets fonctionnels. Notre sélection.",
    image: "https://images.pexels.com/photos/10736999/pexels-photo-10736999.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    category: "Maison",
    readTime: "5 min",
    date: "15 mai 2026",
  },
  {
    slug: "art-du-detail-maison-vellio",
    title: "L'art du détail dans une maison contemporaine",
    excerpt: "Comment quelques objets bien choisis peuvent transformer la perception d'un intérieur sans le surcharger.",
    image: "https://images.pexels.com/photos/10736999/pexels-photo-10736999.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    category: "Maison",
    readTime: "5 min",
    date: "13 mai 2026",
  },
  {
    slug: "tech-signature-sans-bruit-visuel",
    title: "La tech signature : utile, sobre, presque invisible",
    excerpt: "Les accessoires technologiques premium doivent simplifier le quotidien sans imposer leur présence.",
    image: "https://images.pexels.com/photos/9741343/pexels-photo-9741343.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    category: "Tech",
    readTime: "4 min",
    date: "12 mai 2026",
  },
  {
    slug: "cadeaux-haut-de-gamme-utiles",
    title: "Offrir utile sans perdre l'émotion",
    excerpt: "Une bonne pièce cadeau conjugue usage réel, finition soignée et récit suffisamment personnel.",
    image: "https://images.pexels.com/photos/9775357/pexels-photo-9775357.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    category: "Cadeau",
    readTime: "6 min",
    date: "11 mai 2026",
  },
  {
    slug: "rituels-beaute-minimalistes",
    title: "Rituels beauté minimalistes, gestes précis",
    excerpt: "La beauté premium n'est pas l'accumulation : c'est le choix du bon geste, au bon moment.",
    image: "https://images.pexels.com/photos/28255125/pexels-photo-28255125.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
    category: "Beauté",
    readTime: "4 min",
    date: "10 mai 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-brand-ivory">
      <Container className="py-12 sm:py-20">
        <SectionTitle
          align="center"
          eyebrow="Journal Vellio"
          title="Notes pour un quotidien plus élégant."
          subtitle="Objets, rituels, matières, usages : le journal Vellio explore la simplicité comme langage premium."
          className="mb-12 max-w-3xl"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {articles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className={index === 0 ? "group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-brand-accent/35 hover:shadow-card-hover lg:row-span-2" : "group grid overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-brand-accent/35 hover:shadow-card-hover sm:grid-cols-[14rem_1fr]"}
            >
              <div className={index === 0 ? "relative aspect-[16/10] overflow-hidden" : "relative min-h-56 overflow-hidden"}>
                <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "240px"} />
              </div>
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent">{article.category}</p>
                <h2 className={index === 0 ? "mt-4 font-serif text-4xl font-semibold leading-none text-brand" : "mt-4 font-serif text-3xl font-semibold leading-none text-brand"}>
                  {article.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-brand/58">{article.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-brand/42">
                  <span>{article.date} · {article.readTime}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-accent">
                    Lire <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
