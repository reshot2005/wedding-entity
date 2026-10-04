import { notFound } from "next/navigation";
import {
  CallToAction,
  InteriorPage,
  PageHero,
  ProseArticle,
  createPageMetadata,
} from "@frontend/components/interior/Interior";
import { StructuredData } from "@frontend/components/StructuredData";
import {
  findJournalStory,
  journalStories,
  siteUrl,
} from "@backend/content/siteContent";

type JournalStoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return journalStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: JournalStoryPageProps) {
  const { slug } = await params;
  const story = findJournalStory(slug);

  if (!story) {
    return createPageMetadata(
      "/journal",
      "Journal | The Wedding Entity",
      "Notes on photography, celebration, and making meaningful images.",
    );
  }

  return createPageMetadata(
    `/journal/${story.slug}`,
    `${story.title} | The Wedding Entity`,
    story.summary,
  );
}

export default async function JournalStoryPage({
  params,
}: JournalStoryPageProps) {
  const { slug } = await params;
  const story = findJournalStory(slug);

  if (!story) notFound();
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.summary,
    datePublished: story.date,
    image: `${siteUrl}${story.image.src}`,
    mainEntityOfPage: `${siteUrl}/journal/${story.slug}`,
    author: { "@type": "Organization", name: "The Wedding Entity" },
    publisher: { "@type": "Organization", name: "The Wedding Entity" },
  };

  return (
    <InteriorPage>
      <PageHero
        eyebrow="From the journal"
        title={story.title}
        lede={story.summary}
        image={story.image}
        compact
      />

      <ProseArticle date={story.date}>
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </ProseArticle>

      <CallToAction
        title="See the idea in practice"
        href="/portfolio"
        label="Explore the portfolio"
      />
      <StructuredData value={articleData} />
    </InteriorPage>
  );
}
