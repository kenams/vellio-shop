export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_TOKEN = process.env.ADMIN_SECRET ?? "__no_admin_secret_configured__";
const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://vellio.kah-digital.ch";
const HOST = new URL(BASE).host;
// IndexNow key — doit correspondre au fichier /public/<key>.txt
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "vellio-indexnow-2024";

function checkAuth(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") || req.headers.get("x-admin-token");
  return secret === ADMIN_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ select: { slug: true } }),
    prisma.product.findMany({
      where: { published: true },
      select: { slug: true },
      orderBy: { updatedAt: "desc" },
      take: 500,
    }),
  ]);

  const urlList = [
    `${BASE}/`,
    `${BASE}/produits`,
    `${BASE}/blog`,
    ...categories.map((c) => `${BASE}/categorie/${c.slug}`),
    ...products.map((p) => `${BASE}/produits/${p.slug}`),
  ];

  const engines = ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow"];

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  const results: Record<string, string> = {};

  for (const engine of engines) {
    try {
      const res = await fetch(engine, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      results[engine] = `${res.status} ${res.statusText}`;
    } catch (e: unknown) {
      results[engine] = `error: ${e instanceof Error ? e.message : String(e)}`;
    }
  }

  return NextResponse.json({ ok: true, submitted: urlList.length, results });
}
