import {
  CallToAction,
  InteriorPage,
  PageHero,
  PortfolioCards,
  createPageMetadata,
  interiorStyles as styles,
} from "@frontend/components/interior/Interior";
import { imagery, portfolioCollections } from "@backend/content/siteContent";

export const metadata = createPageMetadata(
  "/portfolio",
  "Portfolio | The Wedding Entity",
  "Explore selected wedding, portrait, and editorial photography by The Wedding Entity.",
);

export default function PortfolioPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="Selected work"
        title="Images with beauty and pulse"
        lede="A study in celebration, character, fashion, and place—photographed with intention and room for surprise."
        image={imagery.boldEditorial}
      />

      <section className={styles.section} aria-label="Portfolio collections">
        <PortfolioCards collections={portfolioCollections} />
      </section>

      <CallToAction
        title="Your story belongs here"
        href="/contact"
        label="Work with us"
      />
    </InteriorPage>
  );
}
