"use client";

import { type ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const OPENING_SEQUENCE_IDS = new Set([
  "hero",
  "studio-intro",
  "known-for",
  "atelier",
]);

export function HomeMotionScene({ children }: { children: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const queries = gsap.matchMedia();
      queries.add("(prefers-reduced-motion: no-preference)", () => {
        const laterBlocks = gsap.utils
          .toArray<HTMLElement>("section")
          .filter((block) => {
            if (OPENING_SEQUENCE_IDS.has(block.id)) return false;
            if (block.closest("[data-skip-entrance]")) return false;
            return true;
          });

        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((layer) => {
          const travel = Number(layer.dataset.depth || 60);
          gsap.to(layer, {
            y: -travel,
            ease: "none",
            scrollTrigger: {
              trigger: layer.closest("section") ?? layer,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        laterBlocks.forEach((block) => {
          const incoming = Array.from(
            block.querySelectorAll<HTMLElement>(
              "h2, p, blockquote, figure, article",
            ),
          ).slice(0, 8);
          if (!incoming.length) return;

          gsap.fromTo(
            incoming,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 86%",
                once: true,
              },
            },
          );
        });
      });

      return () => queries.revert();
    },
    { scope: stage },
  );

  return <div ref={stage}>{children}</div>;
}
