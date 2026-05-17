export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Download, Plus, Radar, SlidersHorizontal } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, slugify } from "@/lib/utils";
import { getPremiumCategory } from "@/lib/premium-brand";
import { generatePremiumOpportunities } from "@/lib/prospecting/scraperService";
import { getScoreLabel } from "@/lib/prospecting/trendScoring";
import type { LuxuryDomain } from "@/lib/prospecting/prospectingTypes";
import ScoreBadge from "@/components/ui/ScoreBadge";
import { AdminTable, AdminTd, AdminTh } from "@/components/ui/AdminTable";

const domains: Array<{ value: LuxuryDomain | ""; label: string }> = [
  { value: "", label: "Tous les univers" },
  { value: "maison", label: "Maison" },
  { value: "beaute", label: "Beauté" },
  { value: "tech", label: "Tech" },
  { value: "voyage", label: "Voyage" },
  { value: "bijoux", label: "Bijoux" },
  { value: "bureau", label: "Bureau" },
  { value: "cadeau", label: "Cadeau" },
];

async function addOpportunityToCatalog(formData: FormData) {
  "use server";

  const opportunityId = String(formData.get("opportunityId") || "");
  const opportunity = generatePremiumOpportunities().find((item) => item.id === opportunityId);
  if (!opportunity) return;

  const categoryMeta = getPremiumCategory(opportunity.categorySlug);
  const category = await prisma.category.upsert({
    where: { slug: opportunity.categorySlug },
    update: { name: categoryMeta.label, description: categoryMeta.description },
    create: { slug: opportunity.categorySlug, name: categoryMeta.label, description: categoryMeta.description },
  });

  const slug = slugify(opportunity.title);
  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    revalidatePath("/admin/prospection");
    revalidatePath("/admin/produits");
    return;
  }

  await prisma.product.create({
    data: {
      name: opportunity.title,
      slug,
      shortDescription: opportunity.customerPromise,
      description: `<p>${opportunity.customerPromise}</p><p>${opportunity.angle}</p>`,
      price: opportunity.price,
      comparePrice: opportunity.comparePrice,
      cost: Math.round(opportunity.price * 0.38 * 100) / 100,
      stock: 24,
      categoryId: category.id,
      tags: opportunity.keywords.slice(0, 8),
      published: false,
      featured: opportunity.score >= 86,
      trendScore: opportunity.score,
      locale: "fr",
      benefits: opportunity.rationale.slice(0, 4),
      salesArguments: [opportunity.angle, "Positionnement cadeau premium", "Fiche à produire en direction artistique Vellio"],
      marketingAngle: opportunity.angle,
      tiktokHashtags: [],
      images: {
        create: opportunity.images.map((url, position) => ({ url, position, alt: opportunity.title })),
      },
    },
  });

  revalidatePath("/admin/prospection");
  revalidatePath("/admin/produits");
}

export default async function AdminProspectionPage({
  searchParams,
}: {
  searchParams: { domain?: LuxuryDomain; minScore?: string };
}) {
  const minScore = Number(searchParams.minScore || 70);
  const opportunities = generatePremiumOpportunities({
    domain: searchParams.domain || undefined,
    minScore: Number.isFinite(minScore) ? minScore : 70,
    sort: "score",
  });
  const existingSlugs = new Set(
    (await prisma.product.findMany({
      where: { slug: { in: opportunities.map((item) => slugify(item.title)) } },
      select: { slug: true },
    })).map((item) => item.slug)
  );

  const averageScore = opportunities.length
    ? Math.round(opportunities.reduce((total, item) => total + item.score, 0) / opportunities.length)
    : 0;

  return (
    <div className="space-y-8">
      <div className="rounded-[1.75rem] bg-brand p-8 text-white shadow-card">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent">
              <Radar className="h-4 w-4" />
              Prospection premium
            </p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-none">Opportunités Maison Vellio</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">
              Analyse de signaux publics, sans extraction interdite : tendances agrégées, inspirations éditoriales et familles de produits premium à transformer en catalogue.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-3xl font-semibold">{opportunities.length}</p>
              <p className="text-xs text-white/45">opportunités</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-3xl font-semibold">{averageScore}</p>
              <p className="text-xs text-white/45">score moyen</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-3xl font-semibold">100%</p>
              <p className="text-xs text-white/45">sources publiques</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-4 shadow-card lg:flex-row lg:items-center lg:justify-between">
        <form method="GET" className="flex flex-col gap-3 sm:flex-row">
          <label className="flex items-center gap-2 rounded-full border border-black/10 bg-brand-ivory px-4 py-2 text-sm text-brand/60">
            <SlidersHorizontal className="h-4 w-4 text-brand-accent" />
            <select name="domain" defaultValue={searchParams.domain || ""} className="bg-transparent outline-none">
              {domains.map((domain) => (
                <option key={domain.value} value={domain.value}>{domain.label}</option>
              ))}
            </select>
          </label>
          <input name="minScore" defaultValue={String(minScore)} type="number" min="0" max="100" className="input-field w-full sm:w-36" />
          <button type="submit" className="btn-primary">Filtrer</button>
        </form>
        <div className="flex gap-2">
          <Link href="/api/admin/prospection" className="btn-secondary">
            <Download className="h-4 w-4" />
            JSON
          </Link>
          <Link href="/api/admin/prospection?format=csv" className="btn-secondary">
            <Download className="h-4 w-4" />
            CSV
          </Link>
        </div>
      </div>

      <AdminTable>
        <table className="w-full min-w-[980px]">
          <thead>
            <tr className="border-b border-black/10 bg-brand-ivory/70">
              <AdminTh>Opportunité</AdminTh>
              <AdminTh>Score</AdminTh>
              <AdminTh>Univers</AdminTh>
              <AdminTh>Prix</AdminTh>
              <AdminTh>Angle marketing</AdminTh>
              <AdminTh className="text-right">Action</AdminTh>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {opportunities.map((opportunity) => {
              const slug = slugify(opportunity.title);
              const exists = existingSlugs.has(slug);
              const category = getPremiumCategory(opportunity.categorySlug);

              return (
                <tr key={opportunity.id} className="transition-colors hover:bg-brand-ivory/45">
                  <AdminTd>
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-brand-ivory">
                        {opportunity.images[0] && <Image src={opportunity.images[0]} alt="" fill className="object-cover" sizes="56px" />}
                      </div>
                      <div>
                        <p className="font-semibold text-brand">{opportunity.title}</p>
                        <p className="mt-1 text-xs text-brand/45">{getScoreLabel(opportunity.score)} · confiance {opportunity.confidence}%</p>
                      </div>
                    </div>
                  </AdminTd>
                  <AdminTd>
                    <ScoreBadge score={opportunity.score} />
                  </AdminTd>
                  <AdminTd>{category.label}</AdminTd>
                  <AdminTd>
                    <p className="font-semibold text-brand">{formatPrice(opportunity.price)}</p>
                    <p className="text-xs text-brand/35 line-through">{formatPrice(opportunity.comparePrice)}</p>
                  </AdminTd>
                  <AdminTd>
                    <p className="max-w-md text-sm leading-6 text-brand/60">{opportunity.angle}</p>
                  </AdminTd>
                  <AdminTd className="text-right">
                    {exists ? (
                      <span className="rounded-full bg-brand-ivory px-3 py-2 text-xs font-semibold text-brand/55">Préparé</span>
                    ) : (
                      <form action={addOpportunityToCatalog}>
                        <input type="hidden" name="opportunityId" value={opportunity.id} />
                        <button type="submit" className="btn-primary py-2 text-xs">
                          <Plus className="h-3.5 w-3.5" />
                          Ajouter catalogue
                        </button>
                      </form>
                    )}
                  </AdminTd>
                </tr>
              );
            })}
          </tbody>
        </table>
      </AdminTable>
    </div>
  );
}
