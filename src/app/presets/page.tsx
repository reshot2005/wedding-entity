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
  "/presets",
  "Photography Presets | The Wedding Entity",
  "A refined preset foundation for natural skin, nuanced color, and consistent photography edits.",
);

export default function PresetsPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="Editing tools"
        title="Color that leaves room for the photograph"
        lede="A flexible preset foundation made for natural skin, dimensional light, and a finish that feels refined without becoming fixed."
        image={imagery.couture}
      />

      <SplitFeature
        eyebrow="The philosophy"
        title="A starting point, never a shortcut"
        image={imagery.boldEditorial}
      >
        <p>
          The strongest edit responds to the image in front of it. These tools
          bring files closer to a cohesive color language, leaving you with
          the important work of refining tone, density, and feeling.
        </p>
      </SplitFeature>

      <NumberedList
        eyebrow="Designed for"
        title="Consistency with range"
        intro="Built to move through changing light and varied environments without flattening their character."
        tint
        items={[
          {
            title: "Honest skin",
            text: "Balanced warmth and restrained saturation help skin remain believable across diverse light and surroundings.",
          },
          {
            title: "Nuanced color",
            text: "Clean neutrals, grounded greens, and controlled highlights create richness without an overpowering cast.",
          },
          {
            title: "Adaptable finish",
            text: "A coherent base supports bright celebrations, quiet interiors, fashion portraits, and after-dark atmosphere.",
          },
        ]}
      />

      <CallToAction
        title="Shape the finish into your own"
        href="/contact"
        label="Ask about presets"
      />
    </InteriorPage>
  );
}
