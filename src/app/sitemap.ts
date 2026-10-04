import type { MetadataRoute } from "next";
import {
  extendedNavigation,
  journalStories,
  mainNavigation,
  portfolioCollections,
  siteUrl,
} from "@backend/content/siteContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixedPaths = [
    "",
    ...mainNavigation.map((item) => item.href),
    ...extendedNavigation.map((item) => item.href),
  ];

  return [
    ...Array.from(new Set(fixedPaths)).map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("monthly" as const) : ("yearly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
    ...portfolioCollections.map((collection) => ({
      url: `${siteUrl}/portfolio/${collection.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...journalStories.map((story) => ({
      url: `${siteUrl}/journal/${story.slug}`,
      lastModified: new Date(story.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
