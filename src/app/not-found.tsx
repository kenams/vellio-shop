import Link from "next/link";
import { Zap, Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="flex items-center gap-2 text-brand font-black text-3xl mb-8">
        <Zap className="w-7 h-7 text-brand-accent" />
        vellio
      </div>

      <div className="w-24 h-24 rounded-3xl bg-brand/5 flex items-center justify-center mx-auto mb-6">
        <span className="text-5xl font-black text-brand/20">404</span>
      </div>

      <h1 className="text-2xl font-black text-brand mb-3">Page introuvable</h1>
      <p className="text-gray-500 max-w-sm mb-8">
        Cette page n'existe pas ou a été déplacée. Retournez à l'accueil ou explorez notre catalogue.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn-primary flex items-center gap-2">
          <Home className="w-4 h-4" /> Accueil
        </Link>
        <Link href="/produits" className="btn-secondary flex items-center gap-2">
          <Search className="w-4 h-4" /> Catalogue <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
