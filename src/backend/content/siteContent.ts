import { siteImage } from "./siteImages";

export type VisualAsset = {
  src: string;
  alt: string;
};

export type PortfolioCollection = {
  slug: "weddings" | "portraits" | "editorial";
  title: string;
  eyebrow: string;
  introduction: string;
  cover: VisualAsset;
  gallery: VisualAsset[];
};

export type JournalStory = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  image: VisualAsset;
  paragraphs: string[];
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://theweddingentity.com";

export const mainNavigation = [
  { href: "/about", label: "About" },
  { href: "/offerings", label: "Offerings" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/journal", label: "Journal" },
  { href: "/for-photographers", label: "For Photographers" },
  { href: "/contact", label: "Inquire" },
] as const;

export const extendedNavigation = [
  { href: "/education", label: "Education" },
  { href: "/favorites", label: "Favorites" },
  { href: "/presets", label: "Presets" },
  { href: "/abundance-plan", label: "Abundance Plan" },
  { href: "/print-shop", label: "Print Shop" },
] as const;

export const imagery = {
  tuscany: {
    src: siteImage(0),
    alt: "A couple walking through a sunlit destination wedding landscape",
  },
  couture: {
    src: siteImage(1),
    alt: "Editorial bridal fashion photographed in soft natural light",
  },
  paris: {
    src: siteImage(2),
    alt: "Bridal fashion portrait in an elegant architectural setting",
  },
  sculpturalBride: {
    src: siteImage(3),
    alt: "Sculptural bridal couture portrait",
  },
  water: {
    src: siteImage(4),
    alt: "Calm blue water surrounding a destination celebration",
  },
  floralPortrait: {
    src: siteImage(5),
    alt: "Bride with layered flowers in an editorial portrait",
  },
  desertCouple: {
    src: siteImage(6),
    alt: "Couple photographed together in an open landscape",
  },
  reception: {
    src: siteImage(7),
    alt: "Evening wedding reception beneath celebratory lights",
  },
  sailboat: {
    src: siteImage(8),
    alt: "Couple sharing a quiet portrait beside the water",
  },
  resort: {
    src: siteImage(9),
    alt: "Wedding portrait framed by dramatic modern architecture",
  },
  boldEditorial: {
    src: siteImage(10),
    alt: "Bold editorial wedding portrait",
  },
  mexico: {
    src: siteImage(11),
    alt: "Destination wedding scene rich with color and architecture",
  },
  florida: {
    src: siteImage(12),
    alt: "Outdoor wedding celebration in warm evening light",
  },
  mural: {
    src: siteImage(13),
    alt: "Editorial portrait beside painted color",
  },
  preWedding: {
    src: siteImage(14),
    alt: "Pre-wedding portrait in a quiet setting",
  },
  bungalow: {
    src: siteImage(15),
    alt: "Refined wedding portrait with a relaxed editorial feeling",
  },
  wedding: {
    src: siteImage(16),
    alt: "Newlyweds surrounded by the atmosphere of their wedding day",
  },
} as const satisfies Record<string, VisualAsset>;

export const portfolioCollections: PortfolioCollection[] = [
  {
    slug: "weddings",
    title: "Weddings",
    eyebrow: "The planned and the unexpected",
    introduction:
      "A complete record of celebration, from its considered design to the exchanges that happen in an instant.",
    cover: imagery.wedding,
    gallery: [
      imagery.tuscany,
      imagery.reception,
      imagery.florida,
      imagery.mexico,
      imagery.water,
    ],
  },
  {
    slug: "portraits",
    title: "Portraits",
    eyebrow: "Presence over performance",
    introduction:
      "Thoughtful direction and attentive observation create portraits that feel composed without losing their ease.",
    cover: imagery.desertCouple,
    gallery: [
      imagery.desertCouple,
      imagery.resort,
      imagery.sailboat,
      imagery.preWedding,
      imagery.bungalow,
    ],
  },
  {
    slug: "editorial",
    title: "Editorial",
    eyebrow: "A clear visual point of view",
    introduction:
      "Fashion, form, and atmosphere brought together in images that remain connected to the people within them.",
    cover: imagery.couture,
    gallery: [
      imagery.couture,
      imagery.paris,
      imagery.sculpturalBride,
      imagery.floralPortrait,
      imagery.boldEditorial,
    ],
  },
];

export const journalStories: JournalStory[] = [
  {
    slug: "making-space-for-the-unscripted",
    title: "Making Space for the Unscripted",
    summary:
      "How an unhurried timeline gives meaningful exchanges room to become part of the visual story.",
    date: "2026-06-18",
    image: imagery.reception,
    paragraphs: [
      "The strongest photographs often happen between scheduled moments. A little breathing room allows people to arrive fully, move naturally, and remain connected to the celebration.",
      "We prepare carefully, then pay attention to what the day offers: the glance across a room, a hand held under the table, and the shift in energy when music begins.",
    ],
  },
  {
    slug: "direction-that-still-feels-like-you",
    title: "Direction That Still Feels Like You",
    summary:
      "A practical approach to portrait direction that provides clarity while leaving personality intact.",
    date: "2026-04-07",
    image: imagery.desertCouple,
    paragraphs: [
      "Direction should make a portrait feel easier, not more performed. Small prompts and thoughtful positioning create structure without turning attention away from the relationship.",
      "Light, pace, and comfort guide each decision. The goal is a composed image that still resembles the people standing within it.",
    ],
  },
  {
    slug: "details-with-a-life-beyond-the-day",
    title: "Details with a Life Beyond the Day",
    summary:
      "Why invitations, flowers, clothing, and place matter most when photographed as parts of a larger story.",
    date: "2026-02-12",
    image: imagery.floralPortrait,
    paragraphs: [
      "Objects become meaningful through context. A handwritten note, a familiar flower, or a carefully chosen fabric says something about the people who gathered.",
      "We move between wide scenes and close observations so the finished collection holds both atmosphere and texture.",
    ],
  },
];

export function findPortfolioCollection(slug: string) {
  return portfolioCollections.find((collection) => collection.slug === slug);
}

export function findJournalStory(slug: string) {
  return journalStories.find((story) => story.slug === slug);
}
