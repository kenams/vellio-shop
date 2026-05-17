import { LockKeyhole, PackageCheck, RotateCcw, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";

const items = [
  { icon: Sparkles, title: "Sélection éditoriale", text: "Chaque pièce est choisie pour son usage, sa ligne et sa désirabilité.", accent: true },
  { icon: LockKeyhole, title: "Paiement sécurisé", text: "Transactions protégées via Stripe, sans stockage bancaire côté Vellio.", accent: false },
  { icon: PackageCheck, title: "Livraison suivie", text: "Expédition avec suivi et informations claires à chaque étape.", accent: false },
  { icon: RotateCcw, title: "Retours 30 jours", text: "Une expérience d'achat sereine, sans friction inutile.", accent: false },
];

export default function TrustBar() {
  return (
    <section className="border-y border-black/10 bg-white/70 backdrop-blur-sm">
      <Container className="grid gap-0 divide-y divide-black/8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text, accent }, i) => (
          <div key={title} className={`flex gap-4 px-6 py-7 ${i === 0 ? "bg-brand-accent/5" : ""}`}>
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${accent ? "border-brand-accent/40 bg-brand-accent/10" : "border-brand-accent/20 bg-brand-ivory"}`}>
              <Icon className="h-4 w-4 text-brand-accent" />
            </div>
            <div>
              <p className={`text-sm font-semibold ${accent ? "text-brand" : "text-brand"}`}>{title}</p>
              <p className="mt-1 text-xs leading-5 text-brand/52">{text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
