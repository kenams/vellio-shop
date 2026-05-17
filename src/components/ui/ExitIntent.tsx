"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("exit_seen")) return;

    let triggered = false;

    function onMouseLeave(e: MouseEvent) {
      if (triggered || dismissed) return;
      if (e.clientY <= 0) {
        triggered = true;
        // Small delay so it doesn't flash immediately
        setTimeout(() => setShow(true), 200);
        sessionStorage.setItem("exit_seen", "1");
      }
    }

    // Only on desktop (touch devices don't have mouseleave)
    if (window.matchMedia("(pointer: fine)").matches) {
      document.addEventListener("mouseleave", onMouseLeave);
    }

    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [dismissed]);

  function close() {
    setShow(false);
    setDismissed(true);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={close}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-brand text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={close} className="absolute right-4 top-4 rounded-full p-2 text-white/40 transition-colors hover:text-white" aria-label="Fermer">
          <X className="h-4 w-4" />
        </button>

        {/* Gold accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-brand-accent/0 via-brand-accent to-brand-accent/0" />

        <div className="p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">Votre sélection vous attend</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight">
            Avant de partir, profitez de la livraison offerte
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Tous vos articles sont encore dans votre panier. Finalisez votre commande et recevez-les sous 48–72h.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 border-y border-white/10 py-5">
            {[
              { emoji: "🔒", label: "Paiement\nsécurisé" },
              { emoji: "📦", label: "Livraison\nsuivie" },
              { emoji: "↩️", label: "Retours\n30 jours" },
            ].map(({ emoji, label }) => (
              <div key={label} className="text-center">
                <p className="text-xl">{emoji}</p>
                <p className="mt-1 whitespace-pre-line text-[10px] leading-4 text-white/50">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link href="/panier" onClick={close} className="btn-primary w-full justify-center bg-white text-brand hover:bg-brand-ivory">
              Finaliser ma commande
            </Link>
            <button onClick={close} className="text-xs text-white/35 transition-colors hover:text-white/55">
              Non merci, je reviendrai plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
