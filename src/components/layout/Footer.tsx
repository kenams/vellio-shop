import Link from "next/link";
import { Zap, Shield, Truck, RotateCcw, Star, Lock, Mail } from "lucide-react";

const reassurance = [
  { icon: Shield, title: "Paiement sécurisé", sub: "SSL 256-bit · Stripe" },
  { icon: Truck, title: "Livraison suivie", sub: "7-14 jours ouvrés" },
  { icon: RotateCcw, title: "Retours 30 jours", sub: "Remboursement rapide" },
  { icon: Star, title: "4.8/5 étoiles", sub: "2 400+ avis vérifiés" },
];

function PayIcon({ label, color, text }: { label: string; color: string; text: string }) {
  return (
    <div className={`flex items-center justify-center px-3 py-1.5 rounded-lg text-[11px] font-black text-white ${color} min-w-[44px]`}>
      {text}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand text-white mt-20">
      {/* Reassurance strip */}
      <div className="border-b border-white/10 bg-brand-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {reassurance.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4.5 h-4.5 text-brand-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-white/50 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-brand-accent flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight">vellio</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            La boutique intelligente qui détecte les produits tendance avant tout le monde grâce à l'IA.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Mail className="w-3.5 h-3.5" />
            <a href="mailto:contact@vellio-shop.vercel.app" className="hover:text-white/70 transition-colors">
              contact@vellio-shop.vercel.app
            </a>
          </div>
        </div>

        {/* Boutique */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-4">Boutique</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "/produits", label: "Tous les produits" },
              { href: "/categorie/tech-gadgets", label: "Tech & Gadgets" },
              { href: "/categorie/maison-intelligente", label: "Maison Intelligente" },
              { href: "/blog", label: "Blog tendances" },
              { href: "/suivi", label: "Suivre ma commande" },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/60 hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Infos */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-4">Informations</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "/cgv", label: "CGV" },
              { href: "/remboursement", label: "Remboursements" },
              { href: "/confidentialite", label: "Confidentialité" },
              { href: "/mentions-legales", label: "Mentions légales" },
              { href: "/contact", label: "Contact" },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/60 hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-4">Newsletter</h4>
          <p className="text-white/50 text-sm mb-4 leading-relaxed">Recevez les produits tendance en avant-première chaque semaine.</p>
          <form action="/api/newsletter" method="POST" className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="votre@email.fr"
              className="flex-1 px-3 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50 transition-all min-w-0"
            />
            <button type="submit" className="px-4 py-2.5 bg-brand-accent hover:bg-orange-600 rounded-xl text-sm font-bold transition-colors flex-shrink-0">
              OK
            </button>
          </form>
          <p className="text-xs text-white/30 mt-2">Pas de spam. Désabonnement en 1 clic.</p>
        </div>
      </div>

      {/* Payment + legal */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>Paiement sécurisé · Stripe PCI-DSS Niveau 1</span>
          </div>
          <div className="flex items-center gap-2">
            <PayIcon label="VISA" color="bg-[#1A1F71]" text="VISA" />
            <PayIcon label="MC" color="bg-[#252525]" text="MC" />
            <PayIcon label="CB" color="bg-[#005B99]" text="CB" />
            <PayIcon label="PayPal" color="bg-[#003087]" text="PP" />
            <PayIcon label="Apple Pay" color="bg-black" text="◆Pay" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 text-center py-5 text-white/25 text-xs">
        © {new Date().getFullYear()} Vellio — Tous droits réservés. Boutique en ligne France.
      </div>
    </footer>
  );
}
