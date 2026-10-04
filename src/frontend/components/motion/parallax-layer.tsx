"use client";

import { type HTMLAttributes, type RefObject } from "react";

import { useScrubbedParallax } from "../../hooks/use-scrubbed-parallax";

export interface ParallaxLayerProps extends HTMLAttributes<HTMLDivElement> {
  axis?: "x" | "y";
  disabled?: boolean;
  distance?: number;
  end?: string;
  scrub?: boolean | number;
  start?: string;
  trigger?: RefObject<Element | null>;
}

export function ParallaxLayer({
  axis,
  disabled,
  distance,
  end,
  scrub,
  start,
  trigger,
  ...props
}: ParallaxLayerProps) {
  const parallaxRef = useScrubbedParallax<HTMLDivElement>({
    axis,
    disabled,
    distance,
    end,
    scrub,
    start,
    trigger,
  });

  return <div ref={parallaxRef} {...props} />;
}
