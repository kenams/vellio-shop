import { LockKeyhole, PackageCheck, RotateCcw, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";

const items = [
  { icon: Sparkles, title: "Sélection éditoriale", text: "Chaque pièce est choisie pour son usage, sa ligne et sa désirabilité." },
  { icon: LockKeyhole, title: "Paiement sécurisé", text: "Transactions protégées via Stripe, sans stockage bancaire côté Vellio." },
  { icon: PackageCheck, title: "Livraison suivie", text: "Expédition avec suivi et informations claires à chaque étape." },
  { icon: RotateCcw, title: "Retours 30 jours", text: "Une expérience d'achat sereine, sans friction inutile." },
];

export default function TrustBar() {
  return (
    <section className="border-y border-black/10 bg-white/55">
      <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-accent/25 bg-brand-ivory">
              <Icon className="h-4 w-4 text-brand-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-brand">{title}</p>
              <p className="mt-1 text-xs leading-5 text-brand/55">{text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
