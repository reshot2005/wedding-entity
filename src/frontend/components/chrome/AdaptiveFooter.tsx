"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./SiteFooter";

export function AdaptiveFooter() {
  const pathname = usePathname();
  return pathname === "/" ? null : <SiteFooter />;
}
