import {
  CallToAction,
  ImageGallery,
  InteriorPage,
  PageHero,
  SplitFeature,
  createPageMetadata,
} from "@frontend/components/interior/Interior";
import { imagery } from "@backend/content/siteContent";

export const metadata = createPageMetadata(
  "/print-shop",
  "Fine Art Print Shop | The Wedding Entity",
  "Discover fine-art photographic prints selected from travels, landscapes, and editorial studies.",
);

const printCollection = [
  imagery.water,
  imagery.mural,
  imagery.paris,
  imagery.tuscany,
  imagery.resort,
];

export default function PrintShopPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="The print shop"
        title="A sense of place, made tangible"
        lede="Fine-art photographs selected from travels, landscapes, and quiet visual studies—printed to become part of a room."
        image={imagery.water}
      />

      <SplitFeature
        eyebrow="The collection"
        title="Images with space to keep seeing"
        image={imagery.tuscany}
      >
        <p>
          Each photograph is chosen for the way it holds atmosphere over time.
          Archival papers, considered scale, and restrained production allow
          the image to remain the center of the object.
        </p>
      </SplitFeature>

      <ImageGallery images={printCollection} />

      <CallToAction
        title="Find the right piece and scale"
        href="/contact"
        label="Request the print catalog"
      />
    </InteriorPage>
  );
}
