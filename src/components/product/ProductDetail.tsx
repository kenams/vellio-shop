"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ChevronDown, ChevronUp, Copy, ExternalLink, ShieldCheck, Star, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useLangStore } from "@/store/langStore";
import { getPremiumProductPresentation } from "@/lib/premium-brand";
import ProductGrid from "@/components/product/ProductGrid";
import ScoreBadge from "@/components/ui/ScoreBadge";
import UrgencyBar from "@/components/ui/UrgencyBar";
import StickyAffiliate from "@/components/ui/StickyAffiliate";
import toast from "react-hot-toast";
import type { Product } from "@/types";

interface Props {
  product: Product;
  related: Product[];
}

function getReviewCount(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return 38 + (hash % 84);
}

export default function ProductDetail({ product, related }: Props) {
  const locale = useLangStore((s) => s.locale);
  const presentation = getPremiumProductPresentation(product, locale);
  const [selectedImage, setSelectedImage] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  function selectImage(index: number) {
    if (index === selectedImage) return;
    setFadingOut(true);
    setTimeout(() => {
      setSelectedImage(index);
      setFadingOut(false);
    }, 140);
  }
  const [openPanel, setOpenPanel] = useState<"details" | "care" | "delivery" | null>("details");
  const hasComparePrice = Boolean(product.comparePrice && product.comparePrice > product.price);
  const reviewCount = getReviewCount(product.id);

  function handleShare(platform: "whatsapp" | "twitter" | "copy") {
    const url = `https://vellio.fr/produits/${product.slug}`;
    const text = `${presentation.name} — ${formatPrice(product.price)} chez Vellio`;
    if (platform === "whatsapp") window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    else if (platform === "twitter") window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    else { navigator.clipboard.writeText(url); toast.success("Lien copié !"); }
  }

  const panels = [
    { id: "details" as const, title: "Détails de la pièce", content: <div className="prose prose-sm max-w-none text-brand/65" dangerouslySetInnerHTML={{ __html: presentation.description }} /> },
    { id: "care" as const, title: "Matières & entretien", content: <p className="text-sm leading-7 text-brand/62">{presentation.materials.join(" · ")}. {presentation.care}</p> },
    { id: "delivery" as const, title: "Livraison & retours", content: <p className="text-sm leading-7 text-brand/62">Expédition suivie, paiement sécurisé et retours sous 30 jours. Les informations de suivi sont envoyées par email après validation.</p> },
  ];

  return (
    <div className="bg-brand-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: presentation.name,
            description: presentation.shortDescription,
            image: product.images.map((image) => image.url),
            sku: product.slug,
            url: `https://vellio.fr/produits/${product.slug}`,
            brand: { "@type": "Brand", name: "Vellio" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount, bestRating: "5" },
            offers: {
              "@type": "Offer",
              price: product.price.toFixed(2),
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: `https://vellio.fr/produits/${product.slug}`,
              seller: { "@type": "Organization", name: "Vellio" },
              priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: { "@type": "MonetaryAmount", value: product.price >= 50 ? "0" : "4.99", currency: "EUR" },
                deliveryTime: { "@type": "ShippingDeliveryTime", businessDays: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] } },
              },
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quels sont les délais de livraison ?",
                "acceptedAnswer": { "@type": "Answer", "text": "Livraison suivie en 5-10 jours ouvrés. Un email de confirmation avec numéro de suivi est envoyé après expédition." }
              },
              {
                "@type": "Question",
                "name": "Comment retourner un produit ?",
                "acceptedAnswer": { "@type": "Answer", "text": "Retours acceptés sous 30 jours sans justification. Contacter contact@vellio.fr pour initier le retour." }
              },
              {
                "@type": "Question",
                "name": "Le paiement est-il sécurisé ?",
                "acceptedAnswer": { "@type": "Answer", "text": "Oui. Tous les paiements sont traités par Stripe, certifié PCI-DSS niveau 1. Aucune donnée bancaire n'est stockée sur nos serveurs." }
              }
            ]
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <Link href="/produits" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-brand/55 transition-colors hover:text-brand">
          <ArrowLeft className="h-4 w-4" />
          Retour à la collection
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ── Gallery ──────────────────────────────────────────────── */}
          <div>
            {/* Image principale avec zoom hover */}
            <div className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-card">
              <Image
                src={product.images[selectedImage]?.url || "/placeholder.jpg"}
                alt={presentation.name}
                fill
                className={`object-cover transition-all duration-500 group-hover:scale-110 ${fadingOut ? "opacity-0" : "opacity-100"}`}
                style={{ transitionProperty: "transform, opacity" }}
                sizes="(max-width: 1024px) 100vw, 52vw"
                priority
                unoptimized={product.images[selectedImage]?.url?.includes("media-amazon.com")}
              />
              {product.trendScore > 0 && <ScoreBadge score={product.trendScore} className="absolute left-5 top-5" />}
              {/* Indicateur image active */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {product.images.slice(0, 5).map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); selectImage(i); }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === selectedImage ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => selectImage(index)}
                    className={`group/thumb relative aspect-square overflow-hidden rounded-2xl border transition-all duration-300 ${
                      index === selectedImage
                        ? "border-brand-accent ring-1 ring-brand-accent/30 shadow-card"
                        : "border-black/10 opacity-60 hover:opacity-100 hover:border-black/25"
                    }`}
                    aria-label={`Voir image ${index + 1}`}
                  >
                    <Image
                      src={image.url}
                      alt={`${presentation.name} — vue ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                      sizes="160px"
                      unoptimized={image.url?.includes("media-amazon.com")}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-accent">{presentation.categoryLabel}</p>
            <h1 className="mt-4 text-balance font-serif text-5xl font-semibold leading-[0.94] text-brand sm:text-6xl">{presentation.name}</h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-brand/55">
              <span className="inline-flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} className="h-4 w-4 fill-brand-accent text-brand-accent" />
                ))}
                <span className="ml-1 font-semibold text-brand">4.8</span>
              </span>
              <span>{reviewCount} avis vérifiés</span>
              <span className="hidden h-1 w-1 rounded-full bg-brand/25 sm:inline-flex" />
              <span>{presentation.badge}</span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-brand/40 mr-1">Partager :</span>
              <button onClick={() => handleShare("whatsapp")} className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-brand/60 hover:text-green-600 hover:border-green-400 transition-colors" aria-label="Partager WhatsApp">
                WhatsApp
              </button>
              <button onClick={() => handleShare("twitter")} className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-brand/60 hover:text-sky-600 hover:border-sky-400 transition-colors" aria-label="Partager X">
                X
              </button>
              <button onClick={() => handleShare("copy")} className="rounded-full border border-black/10 bg-white/70 p-1.5 text-brand/40 hover:text-brand-accent hover:border-brand-accent/50 transition-colors" aria-label="Copier le lien">
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-8 text-brand/62">{presentation.shortDescription}</p>

            <div className="mt-8 flex items-end gap-3">
              <span className="text-4xl font-semibold text-brand">{formatPrice(product.price)}</span>
              {hasComparePrice && <span className="pb-1 text-sm text-brand/35 line-through">{formatPrice(product.comparePrice!)}</span>}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {presentation.highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/70 p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  <span className="text-sm leading-6 text-brand/65">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={product.affiliateUrl || `https://www.amazon.fr/s?k=${encodeURIComponent(product.name)}&tag=vellio42-21`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-base"
              >
                <ExternalLink className="h-4 w-4" />
                Voir sur Amazon
              </a>
              <p className="text-center text-xs text-brand/40">
                Livraison Amazon Prime · Retours faciles · Prix garanti
              </p>
            </div>

            <UrgencyBar productId={product.id} />

            <StickyAffiliate
              name={presentation.name}
              price={product.price}
              image={product.images[0]?.url || "/placeholder.jpg"}
              affiliateUrl={product.affiliateUrl || `https://www.amazon.fr/s?k=${encodeURIComponent(product.name)}&tag=vellio42-21`}
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ExternalLink, label: "Via Amazon" },
                { icon: Truck, label: "Livraison Prime" },
                { icon: ShieldCheck, label: "Retours 30 jours" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-2xl border border-black/10 bg-white/55 p-3 text-center text-xs font-medium text-brand/58">
                  <Icon className="mx-auto mb-2 h-4 w-4 text-brand-accent" />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-8 divide-y divide-black/10 rounded-[1.25rem] border border-black/10 bg-white/70">
              {panels.map((panel) => (
                <div key={panel.id}>
                  <button
                    onClick={() => setOpenPanel(openPanel === panel.id ? null : panel.id)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-brand"
                  >
                    {panel.title}
                    {openPanel === panel.id ? <ChevronUp className="h-4 w-4 text-brand/45" /> : <ChevronDown className="h-4 w-4 text-brand/45" />}
                  </button>
                  {openPanel === panel.id && <div className="px-5 pb-5">{panel.content}</div>}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.25rem] border border-brand-accent/20 bg-white/65 p-5">
              <div className="flex items-center gap-1 text-brand-accent">
                {[1, 2, 3, 4, 5].map((item) => <Star key={item} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 text-sm leading-7 text-brand/65">“{presentation.review.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-brand">{presentation.review.author}</p>
              <p className="text-xs text-brand/45">{presentation.review.role}</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-black/10 pt-12">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent">Même univers</p>
                <h2 className="mt-2 font-serif text-4xl font-semibold text-brand">Dans le même esprit</h2>
              </div>
              <Link href="/produits" className="btn-ghost hidden sm:inline-flex">Tout voir</Link>
            </div>
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </div>
  );
}
