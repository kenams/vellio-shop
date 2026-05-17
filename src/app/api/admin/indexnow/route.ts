export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_TOKEN = process.env.ADMIN_SECRET || "vellio-admin-2024";
const BASE = "https://vellio.fr";
// IndexNow key — doit correspondre au fichier /public/<key>.txt
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "vellio-indexnow-2024";

function checkAuth(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") || req.headers.get("x-admin-token");
  return secret === ADMIN_TOKEN;
}

const ALL_URLS = [
  `${BASE}/`,
  `${BASE}/produits`,
  `${BASE}/blog`,
  `${BASE}/cadeaux-premium`,
  `${BASE}/objets-design-maison`,
  `${BASE}/blog/meilleurs-cadeaux-homme-originaux-2026`,
  `${BASE}/blog/idee-cadeau-anniversaire-original-femme`,
  `${BASE}/blog/accessoires-bureau-design-premium-teletravail`,
  `${BASE}/blog/objets-design-tendance-maison-2026`,
  `${BASE}/blog/art-du-detail-maison-vellio`,
  `${BASE}/blog/tech-signature-sans-bruit-visuel`,
  `${BASE}/blog/cadeaux-haut-de-gamme-utiles`,
  `${BASE}/blog/rituels-beaute-minimalistes`,
  `${BASE}/categorie/maison-intelligente`,
  `${BASE}/categorie/tech-gadgets`,
  `${BASE}/categorie/beaute-soin`,
  `${BASE}/categorie/gadgets-voiture`,
  `${BASE}/categorie/bureau-productivite`,
  `${BASE}/categorie/mode-accessoires`,
  `${BASE}/categorie/sport-outdoor`,
  `${BASE}/categorie/cadeaux-premium`,
];

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const engines = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  const payload = {
    host: "vellio.fr",
    key: INDEXNOW_KEY,
    keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
    urlList: ALL_URLS,
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
    } catch (e: any) {
      results[engine] = `error: ${e.message}`;
    }
  }

  return NextResponse.json({ ok: true, submitted: ALL_URLS.length, results });
}
