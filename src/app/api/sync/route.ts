export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { runDiscovery } from "@/lib/discovery";

export async function POST(req: NextRequest) {
  const secret   = req.headers.get("authorization")?.replace("Bearer ", "") ??
                   req.nextUrl.searchParams.get("secret");
  const expected = process.env.ADMIN_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body   = await req.json().catch(() => ({}));
  const market = body.market ?? "fr";

  const result = await runDiscovery(market);
  return NextResponse.json({ ok: true, timestamp: new Date().toISOString(), ...result });
}

export async function GET(req: NextRequest) {
  const secret   = req.nextUrl.searchParams.get("secret");
  const expected = process.env.ADMIN_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const result = await runDiscovery("fr");
  return NextResponse.json({ ok: true, timestamp: new Date().toISOString(), ...result });
}
