import Link from "next/link";
import { Zap, Shield, Truck, RotateCcw, Star } from "lucide-react";

const reassurance = [
  { icon: Shield, text: "Paiement sécurisé SSL" },
  { icon: Truck, text: "Livraison suivie 7-14j" },
  { icon: RotateCcw, text: "Retours 30 jours" },
  { icon: Star, text: "4.8/5 — 2 400 avis" },
];

export default function Footer() {
  return (
    <footer className="bg-brand text-white mt-24">
      {/* Reassurance */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {reassurance.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-brand-accent flex-shrink-0" />
              <span className="text-sm text-white/80">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl mb-4">
            <Zap className="w-5 h-5 text-brand-accent" /> vellio
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            La boutique intelligente qui détecte les produits tendance avant tout le monde.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Boutique</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/produits" className="hover:text-white transition-colors">Tous les produits</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog tendances</Link></li>
            <li><Link href="/suivi" className="hover:text-white transition-colors">Suivre ma commande</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Informations</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
            <li><Link href="/remboursement" className="hover:text-white transition-colors">Remboursements</Link></li>
            <li><Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-white/60 text-sm mb-3">Recevez les produits tendance en avant-première.</p>
          <form action="/api/newsletter" method="POST" className="flex gap-2">
            <input type="email" name="email" placeholder="votre@email.fr" className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent" />
            <button type="submit" className="px-4 py-2 bg-brand-accent hover:bg-red-600 rounded-lg text-sm font-medium transition-colors">OK</button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-6 text-white/40 text-xs">
        © {new Date().getFullYear()} Vellio. Tous droits réservés. — Vellio SARL, France
      </div>
    </footer>
  );
}
