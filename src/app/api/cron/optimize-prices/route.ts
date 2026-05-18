export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Plafond de variation par passage (sécurité anti-dérives)
const MAX_INCREASE_PCT = 0.12; // +12% max
const MAX_DECREASE_PCT = 0.08; // -8% max
const MIN_MARGIN_PCT = 0.35;   // 35% marge minimum absolue
const STALE_DAYS = 10;         // produit sans vente depuis 10j = stale

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") || req.headers.get("authorization")?.replace("Bearer ", "");
  const expected = process.env.CRON_SECRET || process.env.ADMIN_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const dryRun = req.nextUrl.searchParams.get("dry") === "1";

  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const staleDate = new Date(Date.now() - STALE_DAYS * 24 * 60 * 60 * 1000);

    const products = await prisma.product.findMany({
      where: { published: true },
      select: {
        id: true, slug: true, name: true,
        price: true, comparePrice: true, cost: true,
        trendScore: true, createdAt: true,
        orderItems: {
          where: { order: { createdAt: { gte: sevenDaysAgo }, status: { not: "CANCELLED" } } },
          select: { quantity: true },
        },
      },
    });

    const changes: Array<{
      slug: string; name: string;
      priceOld: number; priceNew: number;
      compareOld: number | null; compareNew: number | null;
      reason: string;
    }> = [];

    for (const p of products) {
      const recentOrders = p.orderItems.reduce((sum, i) => sum + i.quantity, 0);
      const marginPct = (p.price - p.cost) / p.price;
      const isStale = p.createdAt < staleDate && recentOrders === 0;
      const isHot = recentOrders >= 2;
      const isTrending = p.trendScore >= 82;

      let newPrice = p.price;
      let newCompare = p.comparePrice;
      let reason = "";

      // ── HOT PRODUCT : ajoute compare price pour montrer valeur + légère hausse
      if (isHot && !p.comparePrice) {
        newCompare = Math.round(p.price * 1.15 * 100) / 100;
        newPrice = Math.round(p.price * Math.min(1 + MAX_INCREASE_PCT * 0.5, 1.06) * 100) / 100;
        reason = `hot (${recentOrders} ventes/7j) → +6% + comparePrice`;
      }

      // ── TRENDING SANS VENTE : montre valeur perçue
      else if (isTrending && !p.comparePrice && recentOrders === 0) {
        newCompare = Math.round(p.price * 1.12 * 100) / 100;
        reason = `trending score ${p.trendScore} → comparePrice ajouté`;
      }

      // ── STALE : réduit prix pour déclencher première vente
      else if (isStale && marginPct > MIN_MARGIN_PCT + 0.10) {
        const discounted = Math.round(p.price * (1 - MAX_DECREASE_PCT) * 100) / 100;
        const minPrice = Math.round(p.cost / (1 - MIN_MARGIN_PCT) * 100) / 100;
        if (discounted >= minPrice) {
          if (!p.comparePrice) newCompare = p.price;
          newPrice = discounted;
          reason = `stale (${STALE_DAYS}j sans vente, trend ${p.trendScore}) → -8%`;
        }
      }

      // ── COMPARE PRICE EXPIRÉ : nettoie si prix actuel > compare (incohérent)
      if (p.comparePrice && p.price >= p.comparePrice) {
        newCompare = null;
        reason += " | comparePrice incohérent → supprimé";
      }

      // ── Vérifie marge minimale finale
      const finalMargin = (newPrice - p.cost) / newPrice;
      if (finalMargin < MIN_MARGIN_PCT) {
        newPrice = Math.round(p.cost / (1 - MIN_MARGIN_PCT) * 100) / 100;
        reason += " | marge forcée 35%";
      }

      const priceChanged = Math.abs(newPrice - p.price) > 0.001;
      const compareChanged = newCompare !== p.comparePrice;

      if ((priceChanged || compareChanged) && reason) {
        changes.push({
          slug: p.slug, name: p.name,
          priceOld: p.price, priceNew: newPrice,
          compareOld: p.comparePrice ?? null, compareNew: newCompare ?? null,
          reason,
        });

        if (!dryRun) {
          await prisma.product.update({
            where: { id: p.id },
            data: { price: newPrice, comparePrice: newCompare ?? undefined },
          });
        }
      }
    }

    return NextResponse.json({
      ok: true,
      dryRun,
      timestamp: new Date().toISOString(),
      checked: products.length,
      changed: changes.length,
      changes,
    });
  } catch (err: any) {
    console.error("[cron/optimize-prices] Error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
