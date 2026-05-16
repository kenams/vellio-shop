"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Flame, Star } from "lucide-react";
import { formatPrice, getTrendLabel, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const mainImage = product.images?.[0]?.url || "/placeholder.jpg";
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPct = hasDiscount ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100) : 0;
  const isTrending = product.trendScore >= 75;
  const isHot = product.trendScore >= 90;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ id: product.id, name: product.name, price: product.price, image: mainImage, quantity: 1, slug: product.slug });
    toast.success("Ajouté au panier !");
  }

  return (
    <Link href={`/produits/${product.slug}`} className="group card-hover flex flex-col">
      {/* Image container */}
      <div className="relative aspect-[4/3] sm:aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges top */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="badge-trend bg-brand-accent text-white text-[11px]">
              -{discountPct}%
            </span>
          )}
          {isHot && (
            <span className="badge-trend bg-red-100 text-red-600">
              <Flame className="w-3 h-3" /> HOT
            </span>
          )}
          {isTrending && !isHot && (
            <span className="badge-trend bg-orange-100 text-orange-600">
              <Flame className="w-3 h-3" /> {getTrendLabel(product.trendScore)}
            </span>
          )}
        </div>

        {/* Trend score badge top-right */}
        {product.trendScore > 0 && (
          <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-primary-700 text-[10px] font-black px-2 py-1 rounded-lg shadow-sm">
            {product.trendScore}/100
          </div>
        )}

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-brand-accent hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-btn flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Ajouter
        </button>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {product.category && (
          <p className="text-[10px] font-semibold text-primary-500 uppercase tracking-wider mb-1">{product.category.name}</p>
        )}
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-2 text-gray-800 group-hover:text-primary-700 transition-colors flex-1">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-2.5">
          <div className="flex">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className={cn("w-3 h-3", i <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-200 text-yellow-200")} />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-medium">4.7</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-black text-base sm:text-lg text-brand-accent">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.comparePrice!)}</span>
            )}
          </div>
          {product.stock !== undefined && product.stock <= 10 && product.stock > 0 && (
            <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-1.5 py-0.5 rounded-md whitespace-nowrap">
              Stock limité
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
