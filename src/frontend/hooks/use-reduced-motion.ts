"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);

  return () => mediaQuery.removeEventListener("change", onChange);
}

function readMotionPreference() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function readServerMotionPreference() {
  return true;
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    readMotionPreference,
    readServerMotionPreference,
  );
}
