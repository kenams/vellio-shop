"use client";
import { useEffect, useState } from "react";
import { ShoppingBag, X } from "lucide-react";

const ACTIVITIES = [
  { name: "Sophie", city: "Lyon", product: "Support Téléphone Voiture", ago: "il y a 2 min" },
  { name: "Lucas", city: "Paris", product: "Pistolet de Massage Pro", ago: "il y a 5 min" },
  { name: "Emma", city: "Bordeaux", product: "Écouteurs Bluetooth ANC", ago: "il y a 8 min" },
  { name: "Nathan", city: "Marseille", product: "Montre Sport GPS", ago: "il y a 3 min" },
  { name: "Léa", city: "Toulouse", product: "Lampe Bureau LED", ago: "il y a 1 min" },
  { name: "Théo", city: "Nantes", product: "Friteuse à Air Chaud", ago: "il y a 6 min" },
  { name: "Chloé", city: "Strasbourg", product: "Masque LED Visage", ago: "il y a 4 min" },
  { name: "Hugo", city: "Lille", product: "Hub USB-C 9-en-1", ago: "il y a 7 min" },
  { name: "Manon", city: "Rennes", product: "Diffuseur Huiles Essentielles", ago: "il y a 9 min" },
  { name: "Jules", city: "Nice", product: "Repose-Poignets Ergonomique", ago: "il y a 2 min" },
  { name: "Alice", city: "Bordeaux", product: "Brosse Lissante Vapeur", ago: "il y a 11 min" },
  { name: "Marc", city: "Montpellier", product: "Tapis de Yoga Premium", ago: "il y a 4 min" },
  { name: "Julie", city: "Grenoble", product: "Chargeur Sans Fil 3-en-1", ago: "il y a 13 min" },
  { name: "Romain", city: "Nantes", product: "Caméra Surveillance 2K", ago: "il y a 8 min" },
];

export default function LiveActivity() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const initial = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(initial);
  }, [dismissed]);

  useEffect(() => {
    if (!visible || dismissed) return;
    const hide = setTimeout(() => setVisible(false), 5000);
    const next = setTimeout(() => {
      setIndex((i) => (i + 1) % ACTIVITIES.length);
      if (!dismissed) setVisible(true);
    }, 9000);
    return () => { clearTimeout(hide); clearTimeout(next); };
  }, [visible, index, dismissed]);

  if (dismissed || !visible) return null;

  const a = ACTIVITIES[index];

  return (
    <div className="fixed bottom-20 left-4 z-50 animate-slide-up">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 max-w-xs">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <ShoppingBag className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate">
            {a.name} ({a.city}) vient d'acheter
          </p>
          <p className="text-xs text-gray-500 truncate font-medium">{a.product}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{a.ago}</p>
        </div>
        <button
          onClick={() => { setVisible(false); setDismissed(true); }}
          className="p-1 text-gray-300 hover:text-gray-500 flex-shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
