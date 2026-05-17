import Link from "next/link";
import { Instagram, LockKeyhole, Mail, PackageCheck, RotateCcw, ShieldCheck, Twitter } from "lucide-react";
import Container from "@/components/ui/Container";

const reassurance = [
  { icon: ShieldCheck, title: "Paiement sécurisé", sub: "Stripe · PCI-DSS" },
  { icon: PackageCheck, title: "Livraison suivie", sub: "Traçabilité claire" },
  { icon: RotateCcw, title: "Retours 30 jours", sub: "Process simple" },
  { icon: LockKeyhole, title: "Données protégées", sub: "HTTPS · RGPD" },
];

const shopLinks = [
  { href: "/produits", label: "Collection" },
  { href: "/categorie/maison-intelligente", label: "Maison Vellio" },
  { href: "/categorie/tech-gadgets", label: "Tech signature" },
  { href: "/categorie/beaute-soin", label: "Beauté architecturée" },
  { href: "/suivi", label: "Suivi de commande" },
];

const infoLinks = [
  { href: "/cgv", label: "Conditions générales" },
  { href: "/remboursement", label: "Retours et remboursements" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="border-y border-white/10 bg-white/[0.03]">
        <Container className="grid gap-0 divide-y divide-white/8 py-0 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {reassurance.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-start gap-3 px-6 py-7">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Icon className="h-4 w-4 text-brand-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-xs text-white/45">{sub}</p>
              </div>
            </div>
          ))}
        </Container>
      </div>

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent/35 bg-white/5 font-serif text-brand-accent text-lg">
              V
            </span>
            <span className="font-serif text-3xl font-semibold">Vellio</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/52">
            Maison de sélection contemporaine dédiée aux objets raffinés, à la tech premium et aux cadeaux haut de gamme.
          </p>
          <a href="mailto:contact@vellio.fr" className="mt-5 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
            <Mail className="h-4 w-4" />
            contact@vellio.fr
          </a>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/45 transition-colors hover:border-brand-accent/50 hover:text-brand-accent" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/45 transition-colors hover:border-brand-accent/50 hover:text-brand-accent" aria-label="Twitter / X">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">Maison</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/58 transition-colors hover:text-white">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">Informations</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {infoLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/58 transition-colors hover:text-white">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">Carnet privé</h4>
          <p className="mt-5 text-sm leading-7 text-white/52">Recevez les nouvelles pièces et les notes de style Vellio.</p>
          <form action="/api/newsletter" method="POST" className="mt-5 flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="votre@email.fr"
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/28 focus:border-brand-accent/60"
            />
            <button type="submit" className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-ivory">
              OK
            </button>
          </form>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Vellio — Tous droits réservés.</span>
          <span>Paiement sécurisé · Stripe PCI-DSS Niveau 1</span>
        </Container>
      </div>
    </footer>
  );
}
