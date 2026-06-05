"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const POPUP_KEY = "vellio_newsletter_seen";
const DELAY_MS = 25_000; // 25 secondes sur la page

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(POPUP_KEY)) return;
    const t = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setVisible(false);
    localStorage.setItem(POPUP_KEY, "1");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "popup_promo" }),
      });
      setSubmitted(true);
      localStorage.setItem(POPUP_KEY, "1");
      setTimeout(close, 3000);
    } finally {
      setLoading(false);
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center" onClick={close}>
      <div
        className="relative w-full max-w-md rounded-t-3xl bg-[#0b0b0c] p-8 sm:rounded-3xl"
        style={{ border: "1px solid rgba(200,169,110,0.2)" }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={close} className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-xl bg-white/8 text-white/40 hover:bg-white/15">
          <X size={14} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">✦</div>
            <h2 className="text-xl font-bold text-white mb-2">Bienvenue dans le cercle.</h2>
            <p className="text-sm text-white/50">Votre code <strong className="text-[#c8a96e]">BIENVENUE10</strong> a été envoyé par email.</p>
          </div>
        ) : (
          <>
            <div className="mb-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#c8a96e]">Offre exclusive</div>
            <h2 className="mb-2 text-2xl font-bold text-white leading-tight">
              −10% sur<br />votre première commande
            </h2>
            <p className="mb-6 text-sm text-white/50 leading-6">
              Rejoignez le carnet Vellio. Recevez votre code de bienvenue, les nouvelles pièces en avant-première et les sélections exclusives.
            </p>

            <form onSubmit={submit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="w-full rounded-xl bg-white/6 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#c8a96e]/50"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#c8a96e] py-3 text-sm font-bold text-[#0b0b0c] transition hover:bg-[#d4b87a] disabled:opacity-60"
              >
                {loading ? "Envoi…" : "Obtenir mon code −10% →"}
              </button>
            </form>

            <p className="mt-3 text-center text-[11px] text-white/25">
              Jamais de spam · Un email max/semaine · Désabonnement en 1 clic
            </p>
          </>
        )}
      </div>
    </div>
  );
}
