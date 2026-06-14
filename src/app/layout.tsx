import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CookieConsent from "@/components/ui/CookieConsent";
import StoreHydrator from "@/components/ui/StoreHydrator";
import RecentPurchaseToast from "@/components/ui/RecentPurchaseToast";
import ExitIntent from "@/components/ui/ExitIntent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vellio-shop.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Vellio — Maison de sélection contemporaine", template: "%s | Vellio" },
  description: "Vellio sélectionne des objets design, accessoires premium et tech lifestyle pensés pour sublimer le quotidien. Livraison gratuite dès 50€.",
  keywords: ["Vellio", "boutique design", "objets premium", "cadeaux haut de gamme", "tech lifestyle", "accessoires maison", "sélection contemporaine", "dropshipping France"],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Vellio",
    title: "Vellio — Maison de sélection contemporaine",
    description: "Une sélection d'objets design et tech premium pensée pour l'élégance du quotidien. Livraison gratuite dès 50€.",
    url: SITE_URL,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Vellio — Maison de sélection contemporaine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vellio — Maison de sélection contemporaine",
    description: "Objets raffinés, tech premium et cadeaux choisis avec précision. Livraison gratuite dès 50€.",
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "Store"],
      "@id": `${SITE_URL}/#organization`,
      name: "Vellio",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image.png` },
      description: "Boutique en ligne — objets design, tech premium et accessoires lifestyle sélectionnés avec précision.",
      creator: { "@type": "Organization", name: "KAH Digital", url: "https://kah-digital.ch" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Vellio",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/produits?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <StoreHydrator />
        <RecentPurchaseToast />
        <ExitIntent />
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
