"use client";

import { ShieldCheck } from "lucide-react";

export default function UrgencyBar() {
  return (
    <div className="mt-5 flex items-center gap-2 px-1 text-xs text-brand/45">
      <ShieldCheck className="h-3.5 w-3.5 text-brand-accent" />
      <span>Paiement sécurisé · Stripe PCI-DSS · Retours 30 jours</span>
    </div>
  );
}
