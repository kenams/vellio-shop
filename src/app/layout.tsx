import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://vellio.fr"),
  title: { default: "Vellio — Boutique Tendance & Intelligente", template: "%s | Vellio" },
  description: "Découvrez les produits les plus tendance sélectionnés par notre IA. Livraison suivie, paiement sécurisé, retours faciles.",
  keywords: ["dropshipping", "produits tendance", "gadgets", "maison", "boutique en ligne"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Vellio",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
      </head>
      <body>
        {children}
        <Toaster position="bottom-right" toastOptions={{ duration: 3000, style: { borderRadius: "12px", background: "#1a1a2e", color: "#fff" } }} />
      </body>
    </html>
  );
}
