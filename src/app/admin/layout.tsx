import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, ShoppingCart, Zap, Brain, LogOut } from "lucide-react";

const ADMIN_TOKEN = process.env.ADMIN_SECRET || "vellio-admin-2024";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/produits", icon: ShoppingBag, label: "Produits" },
  { href: "/admin/commandes", icon: ShoppingCart, label: "Commandes" },
  { href: "/admin/ia", icon: Brain, label: "Module IA" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token !== ADMIN_TOKEN) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-brand text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <Zap className="w-6 h-6 text-brand-accent" />
          <span className="font-black text-lg">vellio</span>
          <span className="text-white/40 text-xs ml-1 mt-0.5">admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4 border-t border-white/10 pt-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-white/40 hover:text-white text-xs transition-colors"
          >
            <Zap className="w-3 h-3" /> Voir la boutique
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 text-white/40 hover:text-white text-xs transition-colors w-full text-left"
            >
              <LogOut className="w-3 h-3" /> Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">Administration Vellio</div>
          <div className="text-xs text-gray-400">Connecté en tant qu'Admin</div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
