"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/utils";

interface Props {
  name: string;
  price: number;
  image: string;
  onAdd: () => void;
}

export default function StickyBuy({ name, price, image, onAdd }: Props) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Invisible sentinel placed after the add-to-cart button */}
      <div ref={sentinelRef} className="h-px w-full" />

      {/* Sticky bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md transition-transform duration-300 sm:px-6 lg:px-8 ${visible ? "translate-y-0" : "translate-y-full"}`}>
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-brand">{name}</p>
            <p className="text-sm font-semibold text-brand-accent">{formatPrice(price)}</p>
          </div>
          <button
            onClick={onAdd}
            className="btn-primary shrink-0 px-5 py-2.5 text-sm"
          >
            <ShoppingBag className="h-4 w-4" />
            Ajouter
          </button>
        </div>
      </div>
    </>
  );
}
