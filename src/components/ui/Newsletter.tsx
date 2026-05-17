"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative overflow-hidden bg-brand text-white">
      {/* Ambient */}
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-accent/10 blur-[80px]" />
      <div className="pointer-events-none absolute left-[20%] bottom-0 h-48 w-48 rounded-full bg-brand-accent/6 blur-[60px]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">Carnet privé</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-none sm:text-5xl">
            Recevoir les nouvelles pièces avant leur mise en avant.
          </h2>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["🧑‍💼", "👩‍🎨", "👨‍💻", "👩‍⚕️"].map((e, i) => (
                <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand bg-brand-ivory text-sm">{e}</span>
              ))}
            </div>
            <p className="text-xs text-white/50">+2 400 membres déjà inscrits</p>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <p className="max-w-xl text-sm leading-7 text-white/58">
            Notes de style, éditions limitées et sélection d&apos;objets design. Un envoi mesuré, pensé comme un carnet de maison.
          </p>

          {status === "success" ? (
            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-green-400/30 bg-green-400/10 px-6 py-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
              <p className="text-sm font-semibold text-white">Bienvenue dans le carnet Vellio. À très bientôt.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votre@email.fr"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand-accent/60 focus:ring-2 focus:ring-brand-accent/20"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition-all hover:-translate-y-0.5 hover:bg-brand-ivory disabled:opacity-60"
              >
                {status === "loading" ? "..." : <><span>S&apos;inscrire</span> <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-2 text-xs text-red-400">Une erreur est survenue, réessayez.</p>
          )}
        </div>
      </div>
    </section>
  );
}
