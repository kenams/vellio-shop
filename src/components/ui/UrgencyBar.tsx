"use client";

import { Clock, Flame, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

function getViewers(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return 12 + (h % 38);
}

function getShippingCountdown() {
  const now = new Date();
  // Cutoff = today 14:00 if before, else tomorrow 14:00
  const cutoff = new Date(now);
  cutoff.setHours(14, 0, 0, 0);
  if (now >= cutoff) cutoff.setDate(cutoff.getDate() + 1);
  const diff = cutoff.getTime() - now.getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

export default function UrgencyBar({ productId }: { productId: string }) {
  const viewers = getViewers(productId);
  const [countdown, setCountdown] = useState("");
  const [viewerCount, setViewerCount] = useState(viewers);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getShippingCountdown());
      // Randomly fluctuate viewer count ±1
      setViewerCount((v) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(8, Math.min(viewers + 12, v + delta));
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [viewers]);

  return (
    <div className="mt-5 space-y-2">
      {/* Viewer count */}
      <div className="flex items-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-2.5">
        <Flame className="h-4 w-4 shrink-0 text-orange-500" />
        <p className="text-sm font-medium text-orange-800">
          <span className="font-bold">{viewerCount} personnes</span> regardent cet article en ce moment
        </p>
      </div>

      {/* Shipping countdown */}
      <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-2.5">
        <Clock className="h-4 w-4 shrink-0 text-green-600" />
        <p className="text-sm text-green-800">
          Commandez dans <span className="font-bold font-mono text-green-700">{countdown}</span> — livraison demain garantie
        </p>
      </div>

      {/* Trust micro-line */}
      <div className="flex items-center gap-2 px-1 text-xs text-brand/45">
        <ShieldCheck className="h-3.5 w-3.5 text-brand-accent" />
        <span>Paiement sécurisé · Stripe PCI-DSS · Retours 30 jours</span>
      </div>
    </div>
  );
}
