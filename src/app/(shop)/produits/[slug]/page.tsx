import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetail from "@/components/product/ProductDetail";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return {};
  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription,
    openGraph: { title: product.name, description: product.shortDescription },
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

  return <ProductDetail product={product as any} related={related as any} />;
}
