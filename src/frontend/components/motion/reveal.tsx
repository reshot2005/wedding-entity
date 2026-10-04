"use client";

import {
  type CSSProperties,
  type HTMLAttributes,
  useRef,
} from "react";

import { useReducedMotion } from "../../hooks/use-reduced-motion";
import { gsap, useGSAP } from "./engine";

export interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  axis?: "x" | "y";
  delay?: number;
  distance?: number;
  duration?: number;
  ease?: string;
  once?: boolean;
  start?: string;
}

export function Reveal({
  axis = "y",
  delay = 0,
  distance = 36,
  duration = 0.9,
  ease = "power3.out",
  once = true,
  start = "top 88%",
  style,
  ...props
}: RevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root || reducedMotion) {
        return;
      }

      const offset = axis === "x" ? { x: distance } : { y: distance };

      gsap.fromTo(
        root,
        {
          autoAlpha: 0,
          ...offset,
        },
        {
          autoAlpha: 1,
          delay,
          duration,
          ease,
          x: axis === "x" ? 0 : undefined,
          y: axis === "y" ? 0 : undefined,
          scrollTrigger: {
            trigger: root,
            start,
            once,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        },
      );
    },
    {
      dependencies: [
        axis,
        delay,
        distance,
        duration,
        ease,
        once,
        reducedMotion,
        start,
      ],
      revertOnUpdate: true,
      scope: rootRef,
    },
  );

  const mergedStyle: CSSProperties = {
    ...style,
    willChange: reducedMotion ? style?.willChange : "transform, opacity",
  };

  return <div ref={rootRef} style={mergedStyle} {...props} />;
}
