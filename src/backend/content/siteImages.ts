export const siteImages = [
  "/images/photo-01.jpg",
  "/images/photo-02.jpg",
  "/images/photo-03.jpg",
  "/images/photo-04.jpg",
  "/images/photo-05.jpg",
  "/images/photo-06.jpg",
  "/images/photo-07.jpg",
  "/images/photo-08.jpg",
  "/images/photo-09.jpg",
  "/images/photo-10.jpg",
  "/images/photo-11.jpg",
  "/images/photo-12.jpg",
  "/images/photo-13.jpg",
  "/images/photo-14.jpg",
  "/images/photo-15.jpg",
  "/images/photo-16.jpg",
  "/images/photo-17.jpg",
  "/images/photo-18.jpg",
  "/images/photo-19.jpg",
  "/images/photo-20.jpg",
  "/images/photo-21.jpg",
  "/images/photo-22.jpg",
  "/images/photo-23.jpg",
  "/images/photo-24.jpg",
  "/images/photo-25.jpg",
  "/images/photo-26.jpg",
  "/images/photo-27.jpg",
  "/images/photo-28.jpg",
  "/images/photo-29.jpg",
  "/images/photo-30.jpg",
  "/images/photo-31.jpg",
  "/images/photo-32.jpg",
  "/images/photo-33.jpg",
  "/images/photo-34.jpg",
  "/images/photo-35.jpg",
] as const;

export type SiteImage = (typeof siteImages)[number];

export function siteImage(index: number) {
  return siteImages[
    ((index % siteImages.length) + siteImages.length) % siteImages.length
  ];
}

export const heroImage = "/images/hero_wedding.jpg";
export const heroLowerImage = "/images/hero_lower.jpg";
export const heroBioImage = "/images/hero_bio.jpg";
export const studioPortrait = siteImages[1] ?? siteImages[0];
export const secondaryPortrait = siteImages[2] ?? siteImages[0];
export const atelierSignature = "/images/entity-wordmark-light.svg";
