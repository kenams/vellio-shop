import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
import Link from "next/link";
import { BarChart3, LayoutDashboard, LogOut, Package, Pencil, ShoppingBag, ShoppingCart } from "lucide-react";

const ADMIN_TOKEN = process.env.ADMIN_SECRET || "vellio-admin-2024";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/produits", icon: ShoppingBag, label: "Produits" },
  { href: "/admin/commandes", icon: ShoppingCart, label: "Commandes" },
  { href: "/admin/prospection", icon: Package, label: "Catalogue" },
  { href: "/admin/ia", icon: Pencil, label: "Éditorial" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token !== ADMIN_TOKEN) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-brand-ivory">
      <aside className="hidden w-64 shrink-0 flex-col bg-brand text-white md:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent/35 bg-white/5 font-serif text-brand-accent">V</span>
            <div>
              <p className="font-serif text-2xl font-semibold leading-none">Vellio</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/35">atelier admin</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/62 transition-all hover:bg-white/10 hover:text-white">
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 px-3 py-4">
          <Link href="/" className="flex items-center gap-2 rounded-2xl px-3 py-2 text-xs text-white/42 transition-colors hover:bg-white/10 hover:text-white">
            <BarChart3 className="h-3.5 w-3.5" />
            Voir la boutique
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="mt-1 flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left text-xs text-white/42 transition-colors hover:bg-white/10 hover:text-white">
              <LogOut className="h-3.5 w-3.5" />
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-black/10 bg-brand-ivory/90 px-4 py-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand/40">Administration</p>
              <p className="mt-1 text-sm font-medium text-brand">Maison Vellio</p>
            </div>
            <Link href="/admin/prospection" className="btn-secondary hidden sm:inline-flex">Prospection premium</Link>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
