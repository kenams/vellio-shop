import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CookieConsent from "@/components/ui/CookieConsent";
import StoreHydrator from "@/components/ui/StoreHydrator";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://vellio-shop.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: { default: "Vellio — Maison de sélection contemporaine", template: "%s | Vellio" },
  description: "Vellio sélectionne des objets design, accessoires premium et pièces lifestyle pensés pour sublimer le quotidien avec sobriété.",
  keywords: ["Vellio", "maison premium", "objets design", "cadeaux haut de gamme", "lifestyle luxe", "sélection contemporaine"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Vellio",
    title: "Vellio — Maison de sélection contemporaine",
    description: "Une collection pensée pour l'élégance du quotidien.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vellio — Maison de sélection contemporaine",
    description: "Objets raffinés, tech premium et cadeaux choisis avec précision.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
      </head>
      <body>
        <StoreHydrator />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: { borderRadius: "999px", background: "#0b0b0c", color: "#fff" },
          }}
        />
        <CookieConsent />
      </body>
    </html>
  );
}
