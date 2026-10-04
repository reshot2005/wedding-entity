import {
  CallToAction,
  InteriorPage,
  NumberedList,
  PageHero,
  SplitFeature,
  createPageMetadata,
} from "@frontend/components/interior/Interior";
import { imagery } from "@backend/content/siteContent";

export const metadata = createPageMetadata(
  "/offerings",
  "Offerings | The Wedding Entity",
  "Discover wedding, portrait, and editorial photography commissions tailored with care and creative clarity.",
);

export default function OfferingsPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="Photography commissions"
        title="Coverage shaped around what matters"
        lede="No two gatherings ask for the same attention. Each offering begins with your priorities and becomes a considered, personal scope."
        image={imagery.resort}
      />

      <NumberedList
        eyebrow="Offerings"
        title="A complete visual record"
        intro="Our commissions are built to preserve both the architecture of an event and the fleeting exchanges within it."
        items={[
          {
            title: "Wedding weekends",
            text: "Multi-day coverage for destination and local celebrations, from welcome gatherings through farewell brunches.",
          },
          {
            title: "Intimate celebrations",
            text: "Focused coverage for ceremonies and gatherings where every guest is part of the center of the story.",
          },
          {
            title: "Portraits & editorial",
            text: "Pre-wedding portraits, fashion stories, and creative commissions with an intentional visual direction.",
          },
        ]}
      />

      <SplitFeature
        eyebrow="Every commission"
        title="What is included"
        image={imagery.wedding}
        tint
      >
        <p>
          Creative consultation, timeline guidance, location planning, and a
          carefully edited high-resolution gallery are foundational to our
          work. Additional photographers, film coverage, albums, and extended
          travel are shaped to fit your plans.
        </p>
      </SplitFeature>

      <SplitFeature
        eyebrow="The finished work"
        title="Made to live beyond a screen"
        image={imagery.couture}
        reverse
      >
        <p>
          Archival albums and fine-art prints turn a digital collection into
          something tactile—an object to revisit, share, and keep within the
          rhythm of family life.
        </p>
      </SplitFeature>

      <CallToAction
        title="Let us create your tailored proposal"
        href="/contact"
        label="Request availability"
      />
    </InteriorPage>
  );
}
