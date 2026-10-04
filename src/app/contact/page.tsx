import {
  ContentSection,
  InteriorPage,
  PageHero,
  SplitFeature,
  createPageMetadata,
} from "@frontend/components/interior/Interior";
import { InquiryForm } from "@frontend/components/interior/InquiryForm";
import { imagery } from "@backend/content/siteContent";

export const metadata = createPageMetadata(
  "/contact",
  "Contact | The Wedding Entity",
  "Inquire with The Wedding Entity about wedding, portrait, editorial, education, or print commissions.",
);

export default function ContactPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="Begin a conversation"
        title="Tell us what you are imagining"
        lede="Share the shape of your plans, the people at their center, and what you hope the photographs will hold."
        image={imagery.water}
        compact
      />

      <ContentSection
        eyebrow="Your inquiry"
        title="A few details to begin"
      >
        <InquiryForm />
      </ContentSection>

      <SplitFeature
        eyebrow="What happens next"
        title="A personal response, not an automated pitch"
        image={imagery.sailboat}
        tint
      >
        <p>
          After you email your inquiry, we will review your plans and respond
          with availability and a thoughtful next step. Wedding proposals are
          tailored to location, coverage, and the scale of your celebration.
        </p>
      </SplitFeature>
    </InteriorPage>
  );
}
