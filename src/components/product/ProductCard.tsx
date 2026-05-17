"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useLangStore } from "@/store/langStore";
import { getPremiumProductPresentation } from "@/lib/premium-brand";
import ScoreBadge from "@/components/ui/ScoreBadge";
import toast from "react-hot-toast";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const locale = useLangStore((s) => s.locale);
  const presentation = getPremiumProductPresentation(product, locale);
  const mainImage = product.images?.[0]?.url || "/placeholder.jpg";
  const hasComparePrice = Boolean(product.comparePrice && product.comparePrice > product.price);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ id: product.id, name: presentation.name, price: product.price, image: mainImage, quantity: 1, slug: product.slug });
    toast.success(`${presentation.name} ajouté à votre sélection`);
  }

  return (
    <Link href={`/produits/${product.slug}`} className="group block overflow-hidden rounded-[1.25rem] border border-black/10 bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-brand-accent/35 hover:shadow-card-hover">
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-ivory">
        <Image
          src={mainImage}
          alt={presentation.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-3 top-3">
          <span className="rounded-full border border-white/35 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur">
            {presentation.badge}
          </span>
        </div>
        {product.trendScore > 0 && <ScoreBadge score={product.trendScore} className="absolute right-3 top-3 hidden sm:inline-flex" />}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 left-3 right-3 inline-flex translate-y-3 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-brand opacity-0 shadow-card transition-all duration-300 hover:bg-brand-ivory group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Ajouter
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-brand/45">{presentation.categoryShortLabel}</p>
          <div className="flex items-center gap-1 text-brand-accent">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-[11px] font-semibold text-brand/50">4.8</span>
          </div>
        </div>
        <h3 className="line-clamp-2 min-h-[2.65rem] text-sm font-semibold leading-snug text-brand transition-colors group-hover:text-primary-700 sm:text-base">
          {presentation.name}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-xs leading-5 text-brand/52">{presentation.shortDescription}</p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-base font-semibold text-brand sm:text-lg">{formatPrice(product.price)}</span>
          {hasComparePrice && <span className="text-xs text-brand/35 line-through">{formatPrice(product.comparePrice!)}</span>}
        </div>
      </div>
    </Link>
  );
}
