"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Zap } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useLangStore } from "@/store/langStore";
import { getPremiumProductPresentation } from "@/lib/premium-brand";
import ScoreBadge from "@/components/ui/ScoreBadge";
import toast from "react-hot-toast";
import type { Product } from "@/types";

function getStockSeed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return 3 + (h % 8);
}

function getReviewCount(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = ((h << 5) - h + id.charCodeAt(i)) >>> 0;
  return 38 + (h % 84);
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const locale = useLangStore((s) => s.locale);
  const presentation = getPremiumProductPresentation(product, locale);
  const mainImage = product.images?.[0]?.url || "/placeholder.jpg";
  const secondImage = product.images?.[1]?.url || null;
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const hasComparePrice = Boolean(product.comparePrice && product.comparePrice > product.price);
  const discountPct = hasComparePrice ? Math.round(100 - (product.price / product.comparePrice!) * 100) : 0;
  const stockCount = getStockSeed(product.id);
  const lowStock = stockCount <= 4;
  const reviewCount = getReviewCount(product.id);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, name: presentation.name, price: product.price, image: mainImage, quantity: 1, slug: product.slug });
    toast.success(`${presentation.name} ajouté à votre sélection`);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((w) => !w);
    toast.success(wishlisted ? "Retiré des favoris" : "Ajouté aux favoris");
  }

  return (
    <Link
      href={`/produits/${product.slug}`}
      className="group block overflow-hidden rounded-[1.25rem] border border-black/10 bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-brand-accent/35 hover:shadow-card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-ivory">
        {/* Main image */}
        <Image
          src={mainImage}
          alt={presentation.name}
          fill
          unoptimized={mainImage.includes("media-amazon.com")}
          className={`object-cover transition-all duration-700 ease-out ${secondImage ? (hovered ? "opacity-0 scale-[1.045]" : "opacity-100 scale-100") : "group-hover:scale-[1.045]"}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Second image cross-fade */}
        {secondImage && (
          <Image
            src={secondImage}
            alt=""
            fill
            unoptimized={secondImage.includes("media-amazon.com")}
            className={`object-cover transition-all duration-700 ease-out ${hovered ? "opacity-100 scale-[1.045]" : "opacity-0 scale-100"}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Top-left badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <span className="rounded-full border border-white/35 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur">
            {presentation.badge}
          </span>
          {lowStock && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/90 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
              <Zap className="h-2.5 w-2.5" /> {stockCount} restants
            </span>
          )}
        </div>

        {/* Top-right: ScoreBadge + discount */}
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {product.trendScore > 0 && <ScoreBadge score={product.trendScore} className="hidden sm:inline-flex" />}
          {discountPct > 0 && (
            <span className="rounded-full bg-brand-accent px-2.5 py-1 text-[10px] font-bold text-white">-{discountPct}%</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute right-3 bottom-[54px] rounded-full border border-black/10 bg-white p-2 text-brand/40 opacity-0 shadow-card transition-all duration-300 hover:text-red-500 group-hover:opacity-100"
          aria-label="Ajouter aux favoris"
        >
          <Heart className={`h-3.5 w-3.5 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Add to cart */}
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
            <span className="text-[11px] font-semibold text-brand/50">4.8 <span className="text-brand/35">({reviewCount})</span></span>
          </div>
        </div>
        <h3 className="line-clamp-2 min-h-[2.65rem] text-sm font-semibold leading-snug text-brand transition-colors group-hover:text-primary-700 sm:text-base">
          {presentation.name}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-xs leading-5 text-brand/52">{presentation.shortDescription}</p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-base font-semibold text-brand sm:text-lg">{formatPrice(product.price)}</span>
          {hasComparePrice && (
            <>
              <span className="text-xs text-brand/35 line-through">{formatPrice(product.comparePrice!)}</span>
              <span className="text-xs font-semibold text-green-600">Éco. {formatPrice(product.comparePrice! - product.price)}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
