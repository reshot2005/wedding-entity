import {
  CallToAction,
  ImageGallery,
  InteriorPage,
  PageHero,
  SectionIntro,
  createPageMetadata,
} from "@frontend/components/interior/Interior";
import { imagery } from "@backend/content/siteContent";

export const metadata = createPageMetadata(
  "/favorites",
  "Favorites | The Wedding Entity",
  "A curated collection of tools, objects, and visual references loved by The Wedding Entity.",
);

const favoriteImages = [
  imagery.floralPortrait,
  imagery.mural,
  imagery.water,
  imagery.couture,
  imagery.resort,
];

export default function FavoritesPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="Favorites"
        title="Things worth returning to"
        lede="A living edit of places, objects, ideas, and tools that bring beauty or usefulness to the work."
        image={imagery.bungalow}
      />

      <SectionIntro
        eyebrow="The edit"
        title="Chosen for feeling and function"
      >
        <p>
          Good recommendations carry context. These favorites are not a list
          of everything available; they are the things that have earned a
          place through repeated use, lasting craft, or a point of view that
          continues to inspire.
        </p>
      </SectionIntro>

      <ImageGallery images={favoriteImages} />

      <CallToAction
        title="Bring more intention to your process"
        href="/for-photographers"
        label="Resources for photographers"
      />
    </InteriorPage>
  );
}
