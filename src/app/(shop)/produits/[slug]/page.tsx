export const revalidate = 3600; // ISR 1h
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetail from "@/components/product/ProductDetail";
import { getPremiumProductPresentation, toPublicProduct } from "@/lib/premium-brand";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return products.map((p) => ({ slug: p.slug }));
}

const getProduct = unstable_cache(
  async (slug: string) => prisma.product.findUnique({
    where: { slug, published: true },
    include: {
      images: { orderBy: { position: "asc" } },
      trendData: true,
      reviews: { where: { approved: true }, orderBy: { createdAt: "desc" } },
      category: true,
    },
  }),
  ["product-detail"],
  { revalidate: 3600, tags: ["products"] }
);

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return {};
  const presentation = getPremiumProductPresentation(product as any);
  const imageUrl = (product as any).images?.[0]?.url;
  return {
    title: product.metaTitle || presentation.name,
    description: product.metaDescription || presentation.shortDescription,
    alternates: { canonical: `/produits/${params.slug}` },
    openGraph: {
      type: "website",
      title: presentation.name,
      description: presentation.shortDescription,
      url: `/produits/${params.slug}`,
      ...(imageUrl && { images: [{ url: imageUrl, width: 900, height: 900, alt: presentation.name }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: presentation.name,
      description: presentation.shortDescription,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { published: true, categoryId: product.categoryId, id: { not: product.id } },
    take: 4,
    include: { images: { take: 1 }, trendData: true },
    orderBy: { trendScore: "desc" },
  });

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://vellio.fr" },
      { "@type": "ListItem", position: 2, name: "Collection", item: "https://vellio.fr/produits" },
      ...(product.category ? [{ "@type": "ListItem", position: 3, name: product.category.name, item: `https://vellio.fr/categorie/${product.category.slug}` }] : []),
      { "@type": "ListItem", position: product.category ? 4 : 3, name: product.name, item: `https://vellio.fr/produits/${product.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ProductDetail
        product={toPublicProduct(product as any) as any}
        related={related.map((item) => toPublicProduct(item as any)) as any}
      />
    </>
  );
}
