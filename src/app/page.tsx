import type { Metadata } from "next";
import ClosingSequence from "@frontend/components/home/ClosingSequence";
import { HomeMotionScene } from "@frontend/components/home/HomeMotionScene";
import MiddleSequence from "@frontend/components/home/MiddleSequence";
import HomeLandingReady from "@frontend/components/home/HomeLandingReady";
import OpeningSequence from "@frontend/components/home/OpeningSequence";

export const metadata: Metadata = {
  title: {
    absolute: "The Wedding Entity | Wedding Stories",
  },
  description:
    "Explore wedding stories by The Wedding Entity, shaped around the people, details, movement, and feeling that make each celebration personal.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <HomeMotionScene>
          <HomeLandingReady />
          <OpeningSequence />
          <MiddleSequence />
          <ClosingSequence />
        </HomeMotionScene>
      </main>
    </>
  );
}
