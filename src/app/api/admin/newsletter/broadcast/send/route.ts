export const dynamic = "force-dynamic";
// Alias pour déclencher manuellement une campagne pré-définie
import { NextRequest, NextResponse } from "next/server";

const ADMIN_TOKEN = process.env.ADMIN_SECRET || "vellio-admin-2024";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://vellio-shop.vercel.app";

function checkAuth(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") || req.headers.get("x-admin-token");
  return secret === ADMIN_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const campaign = req.nextUrl.searchParams.get("campaign") || "weekly";

  const campaigns: Record<string, { subject: string; headline: string; body: string; ctaLabel: string; ctaUrl: string }> = {
    weekly: {
      subject: "Les nouvelles pièces Vellio sont disponibles ✦",
      headline: "La sélection de la semaine.",
      body: "Nous avons mis à jour la collection avec de nouvelles pièces choisies selon les mêmes critères : usage clair, ligne sobre, désirabilité mesurée.\n\nDes accessoires tech signature, des objets maison calmes et des pièces cadeaux pensées pour durer.",
      ctaLabel: "Voir les nouvelles pièces",
      ctaUrl: `${APP_URL}/produits`,
    },
    promo: {
      subject: "⚡ Livraison offerte dès 50€ — ce week-end seulement",
      headline: "Livraison offerte sur toute la collection.",
      body: "Profitez de la livraison gratuite dès 50€ d'achats sur toute la sélection Vellio. Une occasion de compléter votre espace ou de préparer un cadeau mémorable.\n\nLivraison suivie, retours sous 30 jours, paiement sécurisé Stripe.",
      ctaLabel: "Profiter de l'offre",
      ctaUrl: `${APP_URL}/produits`,
    },
    relance: {
      subject: "Vellio — Des pièces qui méritent votre attention",
      headline: "Vous ne nous avez pas rendu visite récemment.",
      body: "La collection Vellio a évolué depuis votre dernière visite. De nouvelles pièces ont rejoint la sélection — toujours selon les mêmes critères exigeants.\n\nObjecte de soin, tech sobre, maison calme : votre univers quotidien mérite des choix précis.",
      ctaLabel: "Redécouvrir la collection",
      ctaUrl: `${APP_URL}/produits`,
    },
  };

  const selected = campaigns[campaign] || campaigns.weekly;

  // Forward to broadcast endpoint
  const broadcastRes = await fetch(new URL("/api/admin/newsletter/broadcast", req.url), {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-token": ADMIN_TOKEN },
    body: JSON.stringify({ ...selected, dryRun: false }),
  });

  const result = await broadcastRes.json();
  return NextResponse.json({ campaign, ...result });
}
