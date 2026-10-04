"use client";

import { type RefObject, useRef } from "react";

import {
  gsap,
  useGSAP,
} from "../components/motion/engine";
import { useReducedMotion } from "./use-reduced-motion";

export interface ScrubbedParallaxOptions {
  axis?: "x" | "y";
  disabled?: boolean;
  distance?: number;
  end?: string;
  scrub?: boolean | number;
  start?: string;
  trigger?: RefObject<Element | null>;
}

export function useScrubbedParallax<T extends HTMLElement = HTMLDivElement>({
  axis = "y",
  disabled = false,
  distance = 120,
  end = "bottom top",
  scrub = 0.8,
  start = "top bottom",
  trigger,
}: ScrubbedParallaxOptions = {}) {
  const targetRef = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const target = targetRef.current;
      const triggerElement = trigger?.current ?? target;

      if (!target || !triggerElement || disabled || reducedMotion) {
        return;
      }

      const halfDistance = distance / 2;
      const from = axis === "x" ? { x: -halfDistance } : { y: -halfDistance };
      const to = axis === "x" ? { x: halfDistance } : { y: halfDistance };

      gsap.set(target, { willChange: "transform" });
      gsap.fromTo(target, from, {
        ...to,
        ease: "none",
        scrollTrigger: {
          end,
          invalidateOnRefresh: true,
          scrub,
          start,
          trigger: triggerElement,
        },
      });
    },
    {
      dependencies: [
        axis,
        disabled,
        distance,
        end,
        reducedMotion,
        scrub,
        start,
        trigger,
      ],
      revertOnUpdate: true,
      scope: targetRef,
    },
  );

  return targetRef;
}
