"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

const PURCHASES = [
  { name: "Camille", city: "Paris", product: "Bougie Rituel Ambre" },
  { name: "Lucas", city: "Lyon", product: "Casque Signature Pro" },
  { name: "Emma", city: "Bordeaux", product: "Diffuseur Céramique" },
  { name: "Hugo", city: "Nantes", product: "Carnet Cuir Premium" },
  { name: "Léa", city: "Toulouse", product: "Montre Minimale" },
  { name: "Thomas", city: "Strasbourg", product: "Chargeur Magnétique" },
  { name: "Chloé", city: "Marseille", product: "Bracelet Signature" },
  { name: "Antoine", city: "Lille", product: "Lampe Bambou Design" },
  { name: "Julie", city: "Rennes", product: "Parfum d'Ambiance" },
  { name: "Maxime", city: "Montpellier", product: "Porte-cartes Cuir" },
];

function getMinutesAgo(seed: number) {
  const values = [2, 4, 6, 8, 11, 14, 17, 23];
  return values[seed % values.length];
}

export default function RecentPurchaseToast() {
  useEffect(() => {
    let idx = Math.floor(Math.random() * PURCHASES.length);

    function showNext() {
      const p = PURCHASES[idx % PURCHASES.length];
      const mins = getMinutesAgo(idx);
      idx++;

      toast.custom(
        (t) => (
          <div
            className={`flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-card transition-all ${t.visible ? "opacity-100" : "opacity-0"}`}
            style={{ minWidth: 260, maxWidth: 320 }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-ivory text-lg">🛍️</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-brand">
                {p.name} ({p.city})
              </p>
              <p className="truncate text-xs text-brand/55">vient d&apos;acheter <span className="font-medium text-brand/75">{p.product}</span></p>
              <p className="text-[10px] text-brand/35">il y a {mins} min</p>
            </div>
          </div>
        ),
        { duration: 4500, position: "bottom-left" }
      );
    }

    // First show after 8s, then every 35-55s
    const first = setTimeout(showNext, 8000);
    const interval = setInterval(showNext, 42000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return null;
}
