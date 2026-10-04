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
  "/for-photographers",
  "For Photographers | The Wedding Entity",
  "Explore education, tools, and resources for photographers building intentional creative businesses.",
);

export default function ForPhotographersPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="For photographers"
        title="Make stronger work and a steadier business"
        lede="Practical education and thoughtfully made tools for photographers who want clarity without copying someone else’s path."
        image={imagery.preWedding}
      />

      <SplitFeature
        eyebrow="Education"
        title="A generous, grounded approach"
        image={imagery.paris}
        link={{ href: "/education", label: "Explore education" }}
      >
        <p>
          Creative growth is most useful when it can be translated into your
          own voice. Our education pairs honest business context with
          repeatable ways to see, direct, edit, and communicate.
        </p>
      </SplitFeature>

      <NumberedList
        eyebrow="Resources"
        title="Choose your next step"
        intro="Begin with the support that fits the season of work you are in now."
        tint
        items={[
          {
            title: "Mentoring",
            text: "Focused conversations around portfolio, positioning, client experience, or the creative questions currently holding your attention.",
          },
          {
            title: "Presets",
            text: "A flexible editing foundation developed for natural skin, nuanced color, and a film-informed finish.",
          },
          {
            title: "Abundance Plan",
            text: "A practical framework for building a sustainable creative business around enoughness, intention, and aligned action.",
          },
        ]}
      />

      <SplitFeature
        eyebrow="Creative tools"
        title="Start closer to your final vision"
        image={imagery.couture}
        reverse
        link={{ href: "/presets", label: "Discover the presets" }}
      >
        <p>
          Tools should create space for discernment, not replace it. Our
          resources are designed as adaptable starting points for a distinct
          and consistent body of work.
        </p>
      </SplitFeature>

      <CallToAction
        title="Build what feels like yours"
        href="/education"
        label="View education"
      />
    </InteriorPage>
  );
}
