export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { runDiscovery } from "@/lib/discovery";

export async function GET(req: NextRequest) {
  // Vérifie le secret cron (Vercel ou appel manuel admin)
  const secret = req.nextUrl.searchParams.get("secret") || req.headers.get("authorization")?.replace("Bearer ", "");
  const expected = process.env.CRON_SECRET || process.env.ADMIN_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    console.log("[cron/discover] Démarrage prospection automatique...");
    const result = await runDiscovery();
    console.log("[cron/discover] Terminé:", result);

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (err: any) {
    console.error("[cron/discover] Erreur:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

// Vercel cron déclenche cette route via GET
export async function POST(req: NextRequest) {
  return GET(req);
}
