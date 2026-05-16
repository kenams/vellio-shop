/**
 * Cron script — Met à jour les scores de tendance pour tous les produits publiés
 * Usage: npm run cron:trend
 * Recommandé: lancer via cron GitHub Actions ou Vercel Cron (toutes les 24h)
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const DELAY_MS = 1500; // éviter rate-limiting OpenAI

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updateProductScore(productId: string, productName: string): Promise<void> {
  try {
    const res = await fetch(`${APP_URL}/api/ai/trend-score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-cron-secret": process.env.CRON_SECRET || "",
      },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error(`  ❌ ${productName}: ${res.status} — ${error}`);
      return;
    }

    const data = await res.json();
    console.log(`  ✅ ${productName}: score ${data.score}/100 (TikTok: ${data.tiktokTrend}, SEO: ${data.seoPotential})`);
  } catch (err: any) {
    console.error(`  ❌ ${productName}: ${err.message}`);
  }
}

async function main() {
  const startTime = Date.now();
  console.log(`\n🚀 Vellio — Cron trend score — ${new Date().toISOString()}`);
  console.log(`   Target: ${APP_URL}\n`);

  const products = await prisma.product.findMany({
    where: { published: true },
    select: { id: true, name: true, trendScore: true, updatedAt: true },
    orderBy: { trendScore: "asc" }, // on met à jour les moins bons en premier
  });

  if (products.length === 0) {
    console.log("ℹ️  Aucun produit publié à mettre à jour.");
    return;
  }

  console.log(`📦 ${products.length} produit(s) à mettre à jour...\n`);

  let updated = 0;
  let failed = 0;

  for (const product of products) {
    process.stdout.write(`→ [${updated + failed + 1}/${products.length}] ${product.name} `);
    await updateProductScore(product.id, product.name);
    updated++;
    if (updated < products.length) {
      await sleep(DELAY_MS);
    }
  }

  const duration = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n📊 Résultat: ${updated} mis à jour, ${failed} erreurs — durée: ${duration}s`);

  // Log en base
  await prisma.aIProductResearch.create({
    data: {
      query: `cron-trend — ${products.length} produits`,
      results: { updated, failed, duration, timestamp: new Date().toISOString() },
      model: "cron",
      status: failed > 0 ? "partial" : "completed",
    },
  });

  console.log("✅ Cron terminé.\n");
}

main()
  .catch((e) => {
    console.error("❌ Erreur fatale cron:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
