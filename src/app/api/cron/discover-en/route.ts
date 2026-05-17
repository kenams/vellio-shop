export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { runDiscovery } from "@/lib/discovery";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") || req.headers.get("authorization")?.replace("Bearer ", "");
  const market = (req.nextUrl.searchParams.get("market") as any) || "en-US";
  const expected = process.env.CRON_SECRET || process.env.ADMIN_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    console.log(`[cron/discover-en] Starting EN discovery (market: ${market})...`);
    const result = await runDiscovery(market);
    console.log("[cron/discover-en] Done:", result);
    return NextResponse.json({ ok: true, timestamp: new Date().toISOString(), ...result });
  } catch (err: any) {
    console.error("[cron/discover-en] Error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
