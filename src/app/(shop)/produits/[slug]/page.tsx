export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetail from "@/components/product/ProductDetail";
import { getPremiumProductPresentation, toPublicProduct } from "@/lib/premium-brand";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });
  if (!product) return {};
  const presentation = getPremiumProductPresentation(product as any);
  return {
    title: product.metaTitle || presentation.name,
    description: product.metaDescription || presentation.shortDescription,
    openGraph: { title: presentation.name, description: presentation.shortDescription },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug, published: true },
    include: {
      images: { orderBy: { position: "asc" } },
      trendData: true,
      reviews: { where: { approved: true }, orderBy: { createdAt: "desc" } },
      category: true,
    },
  });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { published: true, categoryId: product.categoryId, id: { not: product.id } },
    take: 4,
    include: { images: { take: 1 }, trendData: true },
    orderBy: { trendScore: "desc" },
  });

  return (
    <ProductDetail
      product={toPublicProduct(product as any) as any}
      related={related.map((item) => toPublicProduct(item as any)) as any}
    />
  );
}
