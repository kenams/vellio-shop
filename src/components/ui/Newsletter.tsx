import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-brand text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">Carnet privé</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-none sm:text-5xl">Recevoir les nouvelles pièces avant leur mise en avant.</h2>
        </div>
        <div className="flex flex-col justify-end">
          <p className="max-w-xl text-sm leading-7 text-white/60">
            Notes de style, éditions limitées et sélection d'objets design. Un envoi mesuré, pensé comme un carnet de maison.
          </p>
          <form action="/api/newsletter" method="POST" className="mt-7 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              name="email"
              required
              placeholder="votre@email.fr"
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand-accent/60"
            />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-brand-ivory">
              S'inscrire <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
