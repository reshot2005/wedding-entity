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
  "/about",
  "About | The Wedding Entity",
  "Meet the photography studio creating artful, emotionally present records of celebrations around the world.",
);

export default function AboutPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="About the studio"
        title="A point of view, grounded in people"
        lede="We photograph celebrations with an editorial eye and a documentary instinct—making room for beauty without asking life to stand still."
        image={imagery.tuscany}
      />

      <SplitFeature
        eyebrow="Our philosophy"
        title="Attentive by design"
        image={imagery.floralPortrait}
      >
        <p>
          The Wedding Entity approaches every commission as both collaboration
          and observation. We learn the visual language of your celebration,
          prepare for its shape, and stay responsive to everything that cannot
          be planned.
        </p>
        <p>
          The result is a collection with range: composed portraits, honest
          exchanges, and the details that give a gathering its particular
          atmosphere.
        </p>
      </SplitFeature>

      <Quote credit="The Wedding Entity">
        Photographs should hold the feeling of being there—not only the way it
        looked.
      </Quote>

      <NumberedList
        eyebrow="The approach"
        title="Care before, presence within"
        intro="A thoughtful process creates the conditions for natural, enduring photographs."
        items={[
          {
            title: "Listen closely",
            text: "We begin with your priorities, relationships, and sense of place so the coverage feels personal from the outset.",
          },
          {
            title: "Prepare fully",
            text: "Timeline guidance, location study, and creative planning keep the day spacious while protecting what matters most.",
          },
          {
            title: "Photograph intuitively",
            text: "Clear direction appears when useful; quiet observation takes over when a moment already says enough.",
          },
        ]}
      />

      <SplitFeature
        eyebrow="Worldwide"
        title="At home wherever your story gathers"
        image={imagery.sailboat}
        reverse
        tint
        link={{ href: "/portfolio", label: "View the portfolio" }}
      >
        <p>
          From intimate weekends to multi-day destination celebrations, our
          work is shaped by light, landscape, culture, and the people you have
          brought together.
        </p>
      </SplitFeature>

      <CallToAction
        title="Tell us what you are planning"
        href="/contact"
        label="Begin an inquiry"
      />
    </InteriorPage>
  );
}
