import Link from "next/link";
import { Zap, Shield, Truck, RotateCcw, Star, Lock } from "lucide-react";

const reassurance = [
  { icon: Shield, text: "Paiement sécurisé SSL" },
  { icon: Truck, text: "Livraison suivie 7-14j" },
  { icon: RotateCcw, text: "Retours 30 jours" },
  { icon: Star, text: "4.8/5 — 2 400 avis" },
];

function VisaIcon() {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-auto" aria-label="Visa">
      <rect width="38" height="24" rx="4" fill="#1A1F71"/>
      <text x="6" y="17" fontSize="12" fontWeight="bold" fill="white" fontFamily="Arial">VISA</text>
    </svg>
  );
}
function MastercardIcon() {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-auto" aria-label="Mastercard">
      <rect width="38" height="24" rx="4" fill="#f9f9f9" stroke="#e0e0e0"/>
      <circle cx="14" cy="12" r="7" fill="#EB001B"/>
      <circle cx="24" cy="12" r="7" fill="#F79E1B"/>
      <path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00"/>
    </svg>
  );
}
function PaypalIcon() {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-auto" aria-label="PayPal">
      <rect width="38" height="24" rx="4" fill="#f9f9f9" stroke="#e0e0e0"/>
      <text x="5" y="16" fontSize="9" fontWeight="bold" fill="#003087" fontFamily="Arial">Pay</text>
      <text x="17" y="16" fontSize="9" fontWeight="bold" fill="#009cde" fontFamily="Arial">Pal</text>
    </svg>
  );
}
function CbIcon() {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-auto" aria-label="Carte Bleue">
      <rect width="38" height="24" rx="4" fill="#005B99"/>
      <text x="8" y="16" fontSize="10" fontWeight="bold" fill="white" fontFamily="Arial">CB</text>
    </svg>
  );
}
function ApplePayIcon() {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-auto" aria-label="Apple Pay">
      <rect width="38" height="24" rx="4" fill="#000"/>
      <text x="4" y="16" fontSize="8" fill="white" fontFamily="Arial">Apple Pay</text>
    </svg>
  );
}

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

      {/* Payment methods */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>Paiement 100% sécurisé via Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <VisaIcon />
            <MastercardIcon />
            <PaypalIcon />
            <CbIcon />
            <ApplePayIcon />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-5 text-white/30 text-xs space-y-1">
        <p>© {new Date().getFullYear()} Vellio — Boutique en ligne France. Tous droits réservés.</p>
        <p>Vellio SARL — France — <a href="mailto:contact@vellio-shop.vercel.app" className="hover:text-white/60">contact@vellio-shop.vercel.app</a></p>
      </div>
    </footer>
  );
}
