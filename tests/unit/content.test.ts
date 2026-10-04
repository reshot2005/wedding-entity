import { describe, expect, it } from "vitest";
import {
  extendedNavigation,
  journalStories,
  mainNavigation,
  portfolioCollections,
} from "@backend/content/siteContent";
import {
  atelierFrames,
  compactStageFrames,
  wideStageFrames,
} from "@backend/content/visualFrames";

describe("published content", () => {
  it("keeps every navigation destination unique", () => {
    const destinations = [...mainNavigation, ...extendedNavigation].map(
      (item) => item.href,
    );
    expect(new Set(destinations).size).toBe(destinations.length);
  });

  it("provides the three signature portfolio collections", () => {
    expect(portfolioCollections.map((collection) => collection.slug)).toEqual([
      "weddings",
      "portraits",
      "editorial",
    ]);
    portfolioCollections.forEach((collection) => {
      expect(collection.gallery.length).toBeGreaterThanOrEqual(5);
    });
  });

  it("uses unique journal slugs and local media", () => {
    expect(new Set(journalStories.map((story) => story.slug)).size).toBe(
      journalStories.length,
    );
    journalStories.forEach((story) => {
      expect(story.image.src).toMatch(/^\/images\/.+\.(jpe?g|png|webp)$/);
      expect(story.summary.length).toBeGreaterThan(60);
    });
  });

  it("keeps the homepage slideshow media assignments intact", () => {
    expect(wideStageFrames).toHaveLength(9);
    expect(compactStageFrames).toHaveLength(12);
    expect(atelierFrames).toHaveLength(11);
    expect(wideStageFrames[0].src).toMatch(/^\/images\/photo-\d+\.jpg$/);
    expect(atelierFrames[0].src).toMatch(/^\/images\/photo-\d+\.jpg$/);
  });
});
