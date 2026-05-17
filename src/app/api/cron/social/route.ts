export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://vellio-shop.vercel.app";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") || req.headers.get("authorization")?.replace("Bearer ", "");
  const expected = process.env.CRON_SECRET || process.env.ADMIN_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Récupérer les produits trending pour personnaliser les posts
  const trending = await prisma.product.findMany({
    where: { published: true },
    orderBy: [{ trendScore: "desc" }],
    take: 3,
    select: { name: true, price: true, slug: true, shortDescription: true },
  });

  const hour = new Date().getUTCHours();
  const slot = hour < 9 ? "matin" : hour < 14 ? "midi" : "soir";

  const xPost = generateXPost(slot, trending);
  const igCaption = generateIGCaption(slot, trending);

  // Log le contenu généré (visible dans Vercel logs → aide au suivi)
  console.log(`[cron/social] ${slot.toUpperCase()} — Contenu prêt:`);
  console.log(`X: ${xPost.slice(0, 100)}...`);
  console.log(`IG: ${igCaption.slice(0, 100)}...`);

  return NextResponse.json({
    ok: true,
    slot,
    timestamp: new Date().toISOString(),
    content: { x: xPost, instagram: igCaption },
    trending: trending.map(p => p.name),
  });
}

function generateXPost(slot: string, trending: { name: string; price: number; slug: string }[]) {
  const product = trending[0];
  const slots: Record<string, string> = {
    matin: `Nouvelle journée, nouvelle sélection.

${product ? `✦ ${product.name} — ${product.price.toFixed(2)}€` : "Des pièces qui méritent leur place."}

Vellio — sélection contemporaine.
→ ${APP_URL}/produits

#design #lifestyle #premium`,

    midi: `Pause déjeuner. Bonne occasion de découvrir.

${product ? `${product.name} est dans la sélection du moment.` : "La collection Vellio évolue chaque semaine."}

Livraison offerte dès 50€ → ${APP_URL}

#vellio #shopping`,

    soir: `Ce soir, prenez le temps de choisir.

${product ? `→ ${product.name}` : "→ La collection complète"}
${APP_URL}/produits

Livraison suivie · Retours 30j · Stripe sécurisé
#vellio #premium`,
  };
  return slots[slot] || slots.matin;
}

function generateIGCaption(slot: string, trending: { name: string; price: number; slug: string; shortDescription: string | null }[]) {
  const product = trending[0];
  const slots: Record<string, string> = {
    matin: `✦ Bonjour.

Nouvelle journée, nouvelle pièce dans la sélection.

${product ? `${product.name} — ${product.price.toFixed(2)}€\n${product.shortDescription || ""}` : "Des objets qui justifient leur place dans votre quotidien."}

Livraison offerte dès 50€ · Retours 30 jours.
🔗 ${APP_URL}/produits

#vellio #design #lifestyle #premium #cadeaupremium #objetsdesign #contemporain #maisondecoration #techdesign #shopping`,

    midi: `✦ La sélection du moment.

${product ? `${product.name}\n${product.shortDescription || "Un objet choisi pour son usage et sa ligne."}` : "Chez Vellio, chaque pièce est sélectionnée selon des critères précis : usage réel, ligne sobre, durabilité."}

→ ${APP_URL}/produits

#vellio #objetsdesign #interiordesign #homedecor #lifestyle #design #minimalisme #contemporain #premium #maisondecoration`,

    soir: `✦ Avant de dormir.

Pensez à ce que vous aimeriez trouver dans votre espace demain matin.

${product ? `${product.name} — déjà dans votre sélection ?` : "La collection Vellio attend."}

→ ${APP_URL}/produits

#vellio #deco #maison #design #lifestyle #interieur #contemporain #premium #objets #homedecor`,
  };
  return slots[slot] || slots.matin;
}
