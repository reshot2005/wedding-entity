import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdaptiveChrome, AdaptiveFooter } from "@frontend/components/chrome";
import { MotionRuntime } from "@frontend/components/motion";
import { StructuredData } from "@frontend/components/StructuredData";
import { siteUrl } from "@backend/content/siteContent";
import { heroImage } from "@backend/content/siteImages";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Wedding Entity | Wedding Stories",
    template: "%s | The Wedding Entity",
  },
  description:
    "Explore wedding stories shaped around the people, details, movement, and feeling that make each celebration personal.",
  applicationName: "The Wedding Entity",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "The Wedding Entity",
    description:
      "Wedding stories shaped around people, place, movement, and feeling.",
    url: "/",
    siteName: "The Wedding Entity",
    type: "website",
    images: [
      {
        url: heroImage,
        alt: "A destination wedding story by The Wedding Entity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding Entity",
    description:
      "Wedding stories shaped around people, place, movement, and feeling.",
    images: [heroImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "The Wedding Entity",
    url: siteUrl,
    description:
      "Wedding photography shaped around people, details, movement, and feeling.",
    sameAs: ["https://www.instagram.com/theweddingentity/"],
  };

  return (
    <html lang="en">
      <body>
        <MotionRuntime>
          <a className="skipLink" href="#main-content">
            Skip to content
          </a>
          <AdaptiveChrome />
          {children}
          <AdaptiveFooter />
        </MotionRuntime>
        <StructuredData value={organizationData} />
      </body>
    </html>
  );
}
