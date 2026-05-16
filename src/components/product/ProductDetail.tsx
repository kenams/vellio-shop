"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Shield, Truck, RotateCcw, Star, Flame, ChevronDown, ChevronUp, Clock, Eye, Lock, CheckCircle } from "lucide-react";
import { formatPrice, getTrendLabel, getTrendColor } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import type { Product } from "@/types";

interface Props { product: Product; related: Product[] }

function getDeliveryDate(): string {
  const now = new Date();
  now.setDate(now.getDate() + 10);
  return now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

export default function ProductDetail({ product, related }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [viewers, setViewers] = useState(0);
  const { addItem } = useCartStore();
  const faq = product.faqJson as { question: string; answer: string }[] | null;

  const stockCount = ((product.stock ?? 30) > 0 && (product.stock ?? 30) <= 15)
    ? product.stock
    : Math.floor(Math.random() * 8) + 3;

  useEffect(() => {
    setViewers(Math.floor(Math.random() * 12) + 4);
  }, []);

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || "/placeholder.jpg",
      quantity: qty,
      slug: product.slug,
    });
    toast.success(`${qty}x ajouté au panier !`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.shortDescription,
        image: product.images.map(i => i.url),
        offers: { "@type": "Offer", price: product.price, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
      })}} />

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
            <Image src={product.images[selectedImage]?.url || "/placeholder.jpg"} alt={product.name} fill className="object-cover" />
            {product.trendScore >= 75 && (
              <div className={`absolute top-4 left-4 badge-trend bg-orange-100 ${getTrendColor(product.trendScore)} font-bold text-sm px-3 py-1.5`}>
                <Flame className="w-4 h-4" /> {getTrendLabel(product.trendScore)}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button key={img.id} onClick={() => setSelectedImage(i)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === selectedImage ? "border-primary-500" : "border-transparent"}`}>
                <Image src={img.url} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          {product.category && <p className="text-sm text-primary-600 font-medium mb-2">{product.category.name}</p>}
          <h1 className="text-3xl font-black mb-3">{product.name}</h1>

          {/* Reviews — toujours affichées */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-400 text-base">{"★★★★★"}</div>
            <span className="text-sm font-semibold text-gray-800">4.7/5</span>
            <span className="text-sm text-gray-400">— {Math.floor(Math.random() * 80) + 40} avis vérifiés</span>
          </div>

          {/* Viewers actifs */}
          {viewers > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-orange-600 bg-orange-50 rounded-lg px-3 py-2 mb-3 w-fit">
              <Eye className="w-3.5 h-3.5" />
              <span><strong>{viewers} personnes</strong> regardent ce produit en ce moment</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-black text-brand-accent">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <>
                <span className="text-xl text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded-lg">
                  -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* Stock urgency */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-gray-600">
              En stock — <strong className="text-orange-600">Plus que {stockCount} disponibles</strong>
            </span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.shortDescription}</p>

          {/* Benefits */}
          {product.benefits?.length > 0 && (
            <ul className="space-y-2 mb-6">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">✓</span> {b}
                </li>
              ))}
            </ul>
          )}

          {/* Qty + Add */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center border border-gray-200 rounded-xl">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-gray-50 rounded-l-xl">−</button>
              <span className="px-4 font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-gray-50 rounded-r-xl">+</button>
            </div>
            <button onClick={handleAdd} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Ajouter au panier
            </button>
          </div>

          {/* Livraison estimée */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded-xl">
            <Truck className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>Livraison estimée : <strong className="text-blue-700">avant le {getDeliveryDate()}</strong></span>
          </div>

          {/* Reassurance */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl mb-4">
            {[
              { icon: Shield, text: "Paiement sécurisé", sub: "SSL 256-bit" },
              { icon: Truck, text: "Livraison suivie", sub: "7-14 jours" },
              { icon: RotateCcw, text: "Retours faciles", sub: "30 jours" },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="text-center">
                <Icon className="w-5 h-5 mx-auto text-primary-600 mb-1" />
                <p className="text-xs font-semibold text-gray-700">{text}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

          {/* Modes de paiement */}
          <div className="flex items-center gap-2 p-3 border border-gray-100 rounded-xl">
            <Lock className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
            <span className="text-xs text-gray-500 mr-2">Paiement accepté :</span>
            <div className="flex gap-1.5 flex-wrap">
              {["VISA", "MC", "CB", "PayPal"].map(m => (
                <span key={m} className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-md">{m}</span>
              ))}
            </div>
          </div>

          {/* Achat sécurisé */}
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            <span>Achat sécurisé · Stripe certifié PCI-DSS niveau 1</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <div className="prose prose-sm text-gray-600" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>

        {/* FAQ */}
        {faq && faq.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
            <div className="space-y-3">
              {faq.map((f, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-50">
                    {f.question}
                    {openFaq === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openFaq === i && <div className="px-4 pb-4 text-sm text-gray-600">{f.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
