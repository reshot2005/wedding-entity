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
  "/education",
  "Photography Education | The Wedding Entity",
  "Thoughtful photography mentoring for creative direction, client experience, portfolio, and sustainable business growth.",
);

export default function EducationPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="Photography education"
        title="Clarity for the work only you can make"
        lede="Focused guidance for photographers ready to refine their eye, strengthen their process, and build a business they can remain inside."
        image={imagery.paris}
      />

      <SplitFeature
        eyebrow="One-to-one mentoring"
        title="Start with the question that matters now"
        image={imagery.sculpturalBride}
      >
        <p>
          Each session is shaped around your current season. We can review a
          portfolio, clarify positioning, examine client experience, work
          through pricing, or unpack the creative habits behind stronger,
          more consistent photographs.
        </p>
      </SplitFeature>

      <NumberedList
        eyebrow="Possible focus"
        title="Practical and personal"
        intro="There is no generic curriculum. Together, we identify the work with the greatest leverage for your goals."
        tint
        items={[
          {
            title: "Creative voice",
            text: "Build visual consistency while making space for curiosity, experimentation, and the qualities that distinguish your perspective.",
          },
          {
            title: "Client experience",
            text: "Create communication and preparation systems that support better photographs and calmer working relationships.",
          },
          {
            title: "Business direction",
            text: "Align positioning, pricing, and priorities with the kind of work and life you are actually trying to sustain.",
          },
        ]}
      />

      <CallToAction
        title="Bring your real questions"
        href="/contact"
        label="Ask about mentoring"
      />
    </InteriorPage>
  );
}
