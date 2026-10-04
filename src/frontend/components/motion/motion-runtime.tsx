"use client";

import Lenis, {
  type LenisOptions,
  type ScrollToOptions,
} from "lenis";
import { usePathname } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { useReducedMotion } from "../../hooks/use-reduced-motion";
import { gsap, ScrollTrigger } from "./engine";

type ScrollDestination = number | string | HTMLElement;

interface MotionRuntimeValue {
  reducedMotion: boolean;
  refreshScrollEffects: () => void;
  pauseSmoothScroll: () => void;
  resumeSmoothScroll: () => void;
  scrollTo: (
    destination: ScrollDestination,
    options?: ScrollToOptions,
  ) => void;
}

interface MotionRuntimeProps {
  children: ReactNode;
  lenisOptions?: LenisOptions;
}

const MotionRuntimeContext = createContext<MotionRuntimeValue | null>(null);

function nativeScrollTo(
  destination: ScrollDestination,
  options: ScrollToOptions | undefined,
  reducedMotion: boolean,
) {
  const behavior: ScrollBehavior =
    reducedMotion || options?.immediate ? "auto" : "smooth";
  const offset = options?.offset ?? 0;

  if (typeof destination === "number") {
    window.scrollTo({ top: destination + offset, behavior });
    return;
  }

  const element =
    typeof destination === "string"
      ? document.querySelector<HTMLElement>(destination)
      : destination;

  if (!element) {
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior });
}

export function MotionRuntime({
  children,
  lenisOptions,
}: MotionRuntimeProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      ...lenisOptions,
      autoRaf: false,
    });
    const updateScrollEffects = () => ScrollTrigger.update();
    const advanceLenis = (timeInSeconds: number) => {
      lenis.raf(timeInSeconds * 1000);
    };

    lenisRef.current = lenis;
    lenis.on("scroll", updateScrollEffects);
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(advanceLenis);

    return () => {
      gsap.ticker.remove(advanceLenis);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", updateScrollEffects);
      lenis.destroy();

      if (lenisRef.current === lenis) {
        lenisRef.current = null;
      }
    };
  }, [lenisOptions, reducedMotion]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, reducedMotion]);

  const refreshScrollEffects = useCallback(() => {
    lenisRef.current?.resize();
    ScrollTrigger.refresh();
  }, []);

  const pauseSmoothScroll = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const resumeSmoothScroll = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const scrollTo = useCallback(
    (destination: ScrollDestination, options?: ScrollToOptions) => {
      const lenis = lenisRef.current;

      if (lenis) {
        lenis.scrollTo(destination, options);
        return;
      }

      nativeScrollTo(destination, options, reducedMotion);
    },
    [reducedMotion],
  );

  const value = useMemo<MotionRuntimeValue>(
    () => ({
      reducedMotion,
      refreshScrollEffects,
      pauseSmoothScroll,
      resumeSmoothScroll,
      scrollTo,
    }),
    [
      pauseSmoothScroll,
      reducedMotion,
      refreshScrollEffects,
      resumeSmoothScroll,
      scrollTo,
    ],
  );

  return (
    <MotionRuntimeContext.Provider value={value}>
      {children}
    </MotionRuntimeContext.Provider>
  );
}

export function useMotionRuntime() {
  const runtime = useContext(MotionRuntimeContext);

  if (!runtime) {
    throw new Error("useMotionRuntime must be used inside MotionRuntime.");
  }

  return runtime;
}
