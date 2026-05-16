"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShoppingCart, Shield, Truck, RotateCcw, Star, Flame,
  ChevronDown, ChevronUp, Clock, Eye, Lock, CheckCircle, ArrowLeft, Zap
} from "lucide-react";
import { formatPrice, getTrendLabel, getTrendColor } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import Link from "next/link";
import type { Product } from "@/types";

interface Props { product: Product; related: Product[] }

function getDeliveryDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 10);
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

export default function ProductDetail({ product, related }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [viewers, setViewers] = useState(0);
  const { addItem } = useCartStore();
  const faq = product.faqJson as { question: string; answer: string }[] | null;
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPct = hasDiscount ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100) : 0;
  const stockCount = Math.floor(Math.random() * 8) + 3;

  useEffect(() => { setViewers(Math.floor(Math.random() * 12) + 4); }, []);

  function handleAdd() {
    addItem({
      id: product.id, name: product.name, price: product.price,
      image: product.images[0]?.url || "/placeholder.jpg", quantity: qty, slug: product.slug,
    });
    toast.success(`${qty}x ${product.name} ajouté au panier !`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12">
      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        name: product.name, description: product.shortDescription,
        image: product.images.map(i => i.url),
        offers: { "@type": "Offer", price: product.price, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
      })}} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/produits" className="hover:text-primary-600 transition-colors">Catalogue</Link>
        {product.category && <><span>/</span><span className="text-gray-600">{product.category.name}</span></>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Images */}
        <div>
          <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-primary-50/30 rounded-3xl overflow-hidden mb-3 shadow-card">
            <Image
              src={product.images[selectedImage]?.url || "/placeholder.jpg"}
              alt={product.name} fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.trendScore >= 75 && (
              <div className={`absolute top-4 left-4 badge-trend ${product.trendScore >= 90 ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"} font-bold text-sm px-3 py-1.5 shadow-sm`}>
                <Flame className="w-4 h-4" /> {getTrendLabel(product.trendScore)}
              </div>
            )}
            {hasDiscount && (
              <div className="absolute top-4 right-4 bg-brand-accent text-white font-black text-sm px-3 py-1.5 rounded-xl shadow-btn">
                -{discountPct}%
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2.5 flex-wrap">
              {product.images.map((img, i) => (
                <button key={img.id} onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    i === selectedImage ? "border-primary-500 shadow-btn-violet" : "border-transparent hover:border-gray-200"
                  }`}>
                  <Image src={img.url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {product.category && (
            <Link href={`/categorie/${product.category.slug}`} className="section-tag w-fit mb-3 no-underline">
              {product.category.name}
            </Link>
          )}
          <h1 className="text-2xl sm:text-3xl font-black text-brand mb-3 leading-tight">{product.name}</h1>

          {/* Stars + viewers */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-4 h-4 ${i <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-200 text-yellow-200"}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-700">4.7</span>
              <span className="text-sm text-gray-400">({Math.floor(Math.random() * 80) + 40} avis)</span>
            </div>
            {viewers > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-orange-600 bg-orange-50 rounded-full px-3 py-1.5 font-medium">
                <Eye className="w-3.5 h-3.5" />
                <span><strong>{viewers}</strong> personnes regardent</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-black text-brand-accent">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-xl text-gray-400 line-through">{formatPrice(product.comparePrice!)}</span>
            )}
            {hasDiscount && (
              <span className="bg-green-100 text-green-700 text-sm font-bold px-2.5 py-1 rounded-xl">
                Économisez {formatPrice(product.comparePrice! - product.price)}
              </span>
            )}
          </div>

          {/* Stock urgency */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
            <span className="text-sm text-gray-600">
              En stock — <strong className="text-orange-600">Plus que {stockCount} disponibles</strong>
            </span>
          </div>

          <p className="text-gray-600 mb-5 leading-relaxed text-sm sm:text-base">{product.shortDescription}</p>

          {/* Benefits */}
          {product.benefits?.length > 0 && (
            <ul className="space-y-2 mb-6">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{b}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Qty + Add */}
          <div className="flex gap-3 mb-5">
            <div className="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3.5 hover:bg-gray-50 text-gray-600 font-bold transition-colors">−</button>
              <span className="px-5 font-black text-brand">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3.5 hover:bg-gray-50 text-gray-600 font-bold transition-colors">+</button>
            </div>
            <button onClick={handleAdd} className="btn-primary flex-1 text-base py-3.5">
              <ShoppingCart className="w-5 h-5" /> Ajouter au panier
            </button>
          </div>

          {/* Delivery estimate */}
          <div className="flex items-center gap-3 p-3.5 bg-blue-50 rounded-2xl mb-4 text-sm">
            <Truck className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="text-gray-600">Livraison estimée : <strong className="text-blue-700">avant le {getDeliveryDate()}</strong></span>
          </div>

          {/* Reassurance grid */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 rounded-2xl border border-gray-100 mb-4">
            {[
              { icon: Shield, text: "Paiement sécurisé", sub: "SSL 256-bit" },
              { icon: Truck, text: "Livraison suivie", sub: "7-14 jours" },
              { icon: RotateCcw, text: "Retours faciles", sub: "30 jours" },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="text-center">
                <div className="w-9 h-9 rounded-xl bg-white shadow-card flex items-center justify-center mx-auto mb-1.5">
                  <Icon className="w-4 h-4 text-primary-600" />
                </div>
                <p className="text-xs font-semibold text-gray-700">{text}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl">
            <Lock className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
            <span className="text-xs text-gray-400 mr-1">Accepté :</span>
            <div className="flex gap-1.5 flex-wrap">
              {["VISA", "MC", "CB", "PayPal"].map(m => (
                <span key={m} className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-lg">{m}</span>
              ))}
            </div>
            <span className="ml-auto text-[10px] text-green-600 font-semibold">PCI-DSS ✓</span>
          </div>
        </div>
      </div>

      {/* Description + FAQ */}
      <div className="mt-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-black text-brand mb-5 flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-accent" /> Description
          </h2>
          <div className="prose prose-sm text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>

        {faq && faq.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-brand mb-5">Questions fréquentes</h2>
            <div className="space-y-3">
              {faq.map((f, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-4 text-left font-semibold text-sm hover:bg-gray-50 transition-colors">
                    {f.question}
                    {openFaq === i ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                  </button>
                  {openFaq === i && <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">{f.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-brand">Vous aimerez aussi</h2>
            <Link href="/produits" className="btn-ghost text-sm">Tout voir →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
