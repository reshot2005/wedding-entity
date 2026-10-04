import { siteImage } from "./siteImages";

export type ChromeLink = Readonly<{
  label: string;
  href: string;
  external?: boolean;
}>;

export type FooterImage = Readonly<{
  src: string;
  alt: string;
}>;

export const mastheadLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Offerings", href: "/offerings" },
  { label: "Journal", href: "/journal" },
  { label: "For Photographers", href: "/for-photographers" },
] as const satisfies readonly ChromeLink[];

export const drawerLinks = [
  ...mastheadLinks,
  { label: "Inquire", href: "/contact" },
] as const satisfies readonly ChromeLink[];

export const portfolioLinks = [
  { label: "Weddings", href: "/portfolio/weddings" },
  { label: "Portraits", href: "/portfolio/portraits" },
  { label: "Editorial", href: "/portfolio/editorial" },
] as const satisfies readonly ChromeLink[];

export const photographerLinks = [
  { label: "Favorite Tools & Resources", href: "/favorites" },
  { label: "ENTITY x Refined Presets", href: "/presets" },
  { label: "The Abundance Plan", href: "/abundance-plan" },
  { label: "ENTITY Education", href: "/education" },
] as const satisfies readonly ChromeLink[];

export const footerLinks = [
  ...mastheadLinks,
  { label: "Contact", href: "/contact" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/theweddingentity/",
    external: true,
  },
  { label: "Favorites", href: "/favorites" },
] as const satisfies readonly ChromeLink[];

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/theweddingentity/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/theweddingentity",
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/theweddingentity/",
  },
] as const satisfies readonly ChromeLink[];

export const studioIntroduction =
  "The Wedding Entity photographs destination weddings and fashion editorials with an editorial eye—holding architecture, movement, detail, and the unscripted exchanges that make each gathering personal.";

export const newsletterCopy =
  "Sign up for our weekly delivery of inspiration, wanderlust, and wonder — and never miss exclusive, behind-the-scenes glimpses at what we have been shooting.";

export const footerImages = [
  {
    src: siteImage(12),
    alt: "Wedding celebration photographed by ENTITY",
  },
  {
    src: siteImage(5),
    alt: "Bridal editorial photographed by ENTITY",
  },
  {
    src: siteImage(6),
    alt: "Engagement portrait photographed by ENTITY",
  },
  {
    src: siteImage(10),
    alt: "Fashion editorial photographed by ENTITY",
  },
  {
    src: siteImage(11),
    alt: "Destination wedding photographed by ENTITY",
  },
] as const satisfies readonly FooterImage[];
