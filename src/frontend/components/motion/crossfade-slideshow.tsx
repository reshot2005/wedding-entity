"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { useReducedMotion } from "../../hooks/use-reduced-motion";

export const CROSSFADE_INTERVALS = {
  primary: 1700,
  secondary: 1500,
} as const;

export interface CrossfadeSlideshowProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  autoPlay?: boolean;
  controls?: boolean;
  initialSlide?: number;
  intervalMs?: number;
  label?: string;
  slides: readonly ReactNode[];
  transitionMs?: number;
}

const visuallyHidden = {
  border: 0,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
} as const;

export function CrossfadeSlideshow({
  autoPlay = true,
  controls = true,
  initialSlide = 0,
  intervalMs = CROSSFADE_INTERVALS.primary,
  label = "Slideshow",
  onMouseEnter,
  onMouseLeave,
  slides,
  transitionMs = 700,
  ...props
}: CrossfadeSlideshowProps) {
  const reducedMotion = useReducedMotion();
  const slideCount = slides.length;
  const [slideIndex, setSlideIndex] = useState(() =>
    slideCount > 0 ? Math.max(0, initialSlide) % slideCount : 0,
  );
  const [paused, setPaused] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const activeIndex = slideCount > 0 ? slideIndex % slideCount : 0;
  const isRunning =
    autoPlay &&
    !paused &&
    !pointerInside &&
    !pageHidden &&
    !reducedMotion &&
    slideCount > 1;

  useEffect(() => {
    const handleVisibilityChange = () => {
      setPageHidden(document.visibilityState !== "visible");
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSlideIndex((current) => (current + 1) % slideCount);
    }, Math.max(100, intervalMs));

    return () => window.clearTimeout(timer);
  }, [activeIndex, intervalMs, isRunning, slideCount]);

  const showPrevious = () => {
    setSlideIndex((current) => (current - 1 + slideCount) % slideCount);
  };

  const showNext = () => {
    setSlideIndex((current) => (current + 1) % slideCount);
  };

  return (
    <div
      aria-label={label}
      aria-roledescription="carousel"
      onMouseEnter={(event) => {
        setPointerInside(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setPointerInside(false);
        onMouseLeave?.(event);
      }}
      role="region"
      {...props}
    >
      <div style={{ display: "grid" }}>
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              aria-hidden={!isActive}
              aria-label={`Slide ${index + 1} of ${slideCount}`}
              aria-roledescription="slide"
              inert={isActive ? undefined : true}
              key={index}
              role="group"
              style={{
                gridArea: "1 / 1",
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                transition: reducedMotion
                  ? "none"
                  : `opacity ${Math.max(0, transitionMs)}ms ease`,
                zIndex: isActive ? 1 : 0,
              }}
            >
              {slide}
            </div>
          );
        })}
      </div>

      <span
        aria-live={isRunning ? "off" : "polite"}
        aria-atomic="true"
        style={visuallyHidden}
      >
        {slideCount > 0
          ? `Showing slide ${activeIndex + 1} of ${slideCount}`
          : "No slides available"}
      </span>

      {controls && slideCount > 1 ? (
        <div aria-label="Slideshow controls" role="group">
          <button aria-label="Show previous slide" onClick={showPrevious} type="button">
            Previous
          </button>
          {autoPlay && !reducedMotion ? (
            <button
              aria-label={paused ? "Start slideshow" : "Pause slideshow"}
              onClick={() => setPaused((current) => !current)}
              type="button"
            >
              {paused ? "Play" : "Pause"}
            </button>
          ) : null}
          <button aria-label="Show next slide" onClick={showNext} type="button">
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
