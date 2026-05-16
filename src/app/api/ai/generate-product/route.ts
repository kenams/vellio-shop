export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { generateProductSheet, calculateTrendScore } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { name, category, supplierPrice, targetPrice, keywords } = await req.json();
    if (!name || !category || !supplierPrice || !targetPrice) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    const [sheet, trend] = await Promise.all([
      generateProductSheet({ name, category, supplierPrice, targetPrice, keywords }),
      calculateTrendScore({ name, category, supplierPrice, targetPrice }),
    ]);

    await prisma.aIProductResearch.create({
      data: {
        query: `${name} — ${category}`,
        results: { sheet, trend },
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        status: "completed",
      },
    });

    return NextResponse.json({
      sheet: { ...sheet, slug: sheet.slug || slugify(name) },
      trend,
    });
  } catch (err: any) {
    console.error("[ai/generate]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
