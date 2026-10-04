import { notFound } from "next/navigation";
import {
  CallToAction,
  ImageGallery,
  InteriorPage,
  PageHero,
  SplitFeature,
  createPageMetadata,
} from "@frontend/components/interior/Interior";
import { StructuredData } from "@frontend/components/StructuredData";
import {
  findPortfolioCollection,
  imagery,
  portfolioCollections,
  siteUrl,
} from "@backend/content/siteContent";

type PortfolioCategoryPageProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioCollections.map((collection) => ({
    category: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: PortfolioCategoryPageProps) {
  const { category } = await params;
  const collection = findPortfolioCollection(category);

  if (!collection) {
    return createPageMetadata(
      "/portfolio",
      "Portfolio | The Wedding Entity",
      "Explore selected photography by The Wedding Entity.",
    );
  }

  return createPageMetadata(
    `/portfolio/${collection.slug}`,
    `${collection.title} Portfolio | The Wedding Entity`,
    collection.introduction,
  );
}

export default async function PortfolioCategoryPage({
  params,
}: PortfolioCategoryPageProps) {
  const { category } = await params;
  const collection = findPortfolioCollection(category);

  if (!collection) notFound();
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${siteUrl}/portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: collection.title,
        item: `${siteUrl}/portfolio/${collection.slug}`,
      },
    ],
  };

  return (
    <InteriorPage>
      <PageHero
        eyebrow={collection.eyebrow}
        title={collection.title}
        lede={collection.introduction}
        image={collection.cover}
        compact
      />

      <ImageGallery images={collection.gallery} />

      <SplitFeature
        eyebrow="The perspective"
        title="Composed, never contained"
        image={imagery.mural}
        tint
      >
        <p>
          We balance thoughtful framing with a sensitivity to movement and
          personality. The finished collection is polished without losing the
          energy that made each moment worth keeping.
        </p>
      </SplitFeature>

      <CallToAction
        title="Imagine your story in this frame"
        href="/contact"
        label="Begin an inquiry"
      />
      <StructuredData value={breadcrumbData} />
    </InteriorPage>
  );
}
