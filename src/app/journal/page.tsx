import {
  InteriorPage,
  JournalCards,
  PageHero,
  Quote,
  createPageMetadata,
  interiorStyles as styles,
} from "@frontend/components/interior/Interior";
import { imagery, journalStories } from "@backend/content/siteContent";

export const metadata = createPageMetadata(
  "/journal",
  "Journal | The Wedding Entity",
  "Notes on wedding photography, portrait direction, design, and creating meaningful visual records.",
);

export default function JournalPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="The journal"
        title="Notes on making images matter"
        lede="Observations from behind the camera on preparation, presence, and the choices that create an enduring collection."
        image={imagery.mural}
      />

      <section className={styles.section} aria-label="Journal stories">
        <JournalCards stories={journalStories} />
      </section>

      <Quote>
        The most lasting images make a specific moment feel newly present.
      </Quote>
    </InteriorPage>
  );
}
