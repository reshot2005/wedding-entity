"use client";

import { useEffect, useState } from "react";
import { heroBioImage, heroImage, heroLowerImage } from "@backend/content/siteImages";
import HomeLanding from "./HomeLanding";

export default function HomeLandingReady() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    setPreloaderDone(true);
  }, []);

  if (!preloaderDone) {
    return null;
  }

  return (
    <HomeLanding
      ready
      backgroundSrc={heroImage}
      lowerBackgroundSrc={heroLowerImage}
      logoSrc={heroBioImage}
      logoAlt="The Wedding Entity"
      tagline="Capturing your love's legacy with an elegant, editorial, and Italian flair."
      ctaLabel="Check availability"
      ctaHref="/contact"
      projectName="Emily & David"
      projectHref="/projects/emily-david"
    />
  );
}
