import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exportOpportunitiesCsv, generatePremiumOpportunities } from "@/lib/prospecting/scraperService";
import type { LuxuryDomain } from "@/lib/prospecting/prospectingTypes";

const ADMIN_TOKEN = process.env.ADMIN_SECRET || "vellio-admin-2024";

function isAuthorized(req: NextRequest): boolean {
  const cookieToken = cookies().get("admin_token")?.value;
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  return cookieToken === ADMIN_TOKEN || bearer === ADMIN_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const domain = req.nextUrl.searchParams.get("domain") as LuxuryDomain | null;
  const format = req.nextUrl.searchParams.get("format") || "json";
  const minScore = Number(req.nextUrl.searchParams.get("minScore") || 0);
  const opportunities = generatePremiumOpportunities({
    domain: domain || undefined,
    minScore: Number.isFinite(minScore) ? minScore : 0,
    sort: "score",
  });

  if (format === "csv") {
    return new NextResponse(exportOpportunitiesCsv(opportunities), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=vellio-prospection.csv",
      },
    });
  }

  return NextResponse.json({ ok: true, count: opportunities.length, opportunities });
}
