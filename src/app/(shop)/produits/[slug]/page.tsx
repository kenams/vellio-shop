export const revalidate = 3600;
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetail from "@/components/product/ProductDetail";
import { getPremiumProductPresentation, toPublicProduct } from "@/lib/premium-brand";


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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vellio-shop.vercel.app";
  return {
    title: product.metaTitle || `${presentation.name} — Vellio`,
    description: product.metaDescription || presentation.shortDescription,
    alternates: { canonical: `${siteUrl}/produits/${params.slug}` },
    openGraph: {
      type: "website",
      title: presentation.name,
      description: presentation.shortDescription,
      url: `${siteUrl}/produits/${params.slug}`,
      siteName: "Vellio",
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vellio-shop.vercel.app";
  const presentation = getPremiumProductPresentation(product as any);
  const imageUrl = (product as any).images?.[0]?.url;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Collection", item: `${siteUrl}/produits` },
      ...(product.category ? [{ "@type": "ListItem", position: 3, name: product.category.name, item: `${siteUrl}/categorie/${product.category.slug}` }] : []),
      { "@type": "ListItem", position: product.category ? 4 : 3, name: product.name, item: `${siteUrl}/produits/${product.slug}` },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: presentation.name,
    description: product.metaDescription || presentation.shortDescription,
    url: `${siteUrl}/produits/${product.slug}`,
    ...(imageUrl && { image: [imageUrl] }),
    brand: { "@type": "Brand", name: "Vellio" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: (product as any).price,
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/produits/${product.slug}`,
      seller: { "@type": "Organization", name: "Vellio" },
    },
    ...((product as any).reviews?.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (
          (product as any).reviews.reduce((sum: number, r: any) => sum + (r.rating ?? 5), 0) /
          (product as any).reviews.length
        ).toFixed(1),
        reviewCount: (product as any).reviews.length,
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <ProductDetail
        product={toPublicProduct(product as any) as any}
        related={related.map((item) => toPublicProduct(item as any)) as any}
      />
    </>
  );
}
