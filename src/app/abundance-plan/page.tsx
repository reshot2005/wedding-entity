import {
  CallToAction,
  InteriorPage,
  NumberedList,
  PageHero,
  Quote,
  SplitFeature,
  createPageMetadata,
} from "@frontend/components/interior/Interior";
import { imagery } from "@backend/content/siteContent";

export const metadata = createPageMetadata(
  "/abundance-plan",
  "The Abundance Plan | The Wedding Entity",
  "A practical framework for photographers seeking a more intentional, sustainable creative business.",
);

export default function AbundancePlanPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="The Abundance Plan"
        title="Build from enough, not urgency"
        lede="A grounded framework for making clear business decisions, protecting creative energy, and defining growth on your own terms."
        image={imagery.desertCouple}
      />

      <Quote>
        Sustainable growth begins when success becomes specific enough to
        choose.
      </Quote>

      <SplitFeature
        eyebrow="The premise"
        title="A plan that can hold a life"
        image={imagery.preWedding}
      >
        <p>
          Creative businesses become fragile when every opportunity feels
          essential. The Abundance Plan helps you name what enough looks like,
          understand the numbers beneath it, and direct your effort toward the
          work with the clearest purpose.
        </p>
      </SplitFeature>

      <NumberedList
        eyebrow="Inside the plan"
        title="From reflection to action"
        intro="The framework connects values to practical choices so intention does not end at the vision board."
        tint
        items={[
          {
            title: "Define enough",
            text: "Clarify the financial, creative, and personal conditions that make your business genuinely supportive.",
          },
          {
            title: "Edit the noise",
            text: "Separate meaningful goals from inherited metrics, comparison, and strategies that do not fit your direction.",
          },
          {
            title: "Choose the next move",
            text: "Translate your priorities into a focused plan with decisions you can revisit as the business changes.",
          },
        ]}
      />

      <CallToAction
        title="Create a business with breathing room"
        href="/contact"
        label="Ask about the plan"
      />
    </InteriorPage>
  );
}
