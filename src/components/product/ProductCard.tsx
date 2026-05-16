"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Flame, TrendingUp } from "lucide-react";
import { formatPrice, getTrendLabel, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const mainImage = product.images?.[0]?.url || "/placeholder.jpg";
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPct = hasDiscount ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100) : 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ id: product.id, name: product.name, price: product.price, image: mainImage, quantity: 1, slug: product.slug });
    toast.success("Ajouté au panier !");
  }

  return (
    <Link href={`/produits/${product.slug}`} className="group card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image src={mainImage} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPct}%
          </span>
        )}
        {product.trendScore >= 75 && (
          <span className="absolute top-3 right-3 badge-trend bg-orange-100 text-orange-600">
            <Flame className="w-3 h-3" /> {getTrendLabel(product.trendScore)}
          </span>
        )}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 bg-white hover:bg-brand-accent hover:text-white text-gray-700 p-2.5 rounded-xl shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-brand-accent">{formatPrice(product.price)}</span>
            {hasDiscount && <span className="text-xs text-gray-400 line-through">{formatPrice(product.comparePrice!)}</span>}
          </div>
          {product.trendScore > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <TrendingUp className="w-3 h-3" />
              <span>{product.trendScore}/100</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
