"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
      lerp: 0.075,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger when present
    let cleanupSync: (() => void) | undefined;
    (async () => {
      try {
        const gsapModule = await import("gsap");
        const stModule = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.gsap ?? gsapModule.default;
        const ScrollTrigger = stModule.ScrollTrigger ?? stModule.default;
        gsap.registerPlugin(ScrollTrigger);
        const tick = () => ScrollTrigger.update();
        lenis.on("scroll", tick);
        cleanupSync = () => lenis.off("scroll", tick);
      } catch {
        // GSAP not yet installed / imported — no-op
      }
    })();

    return () => {
      cleanupSync?.();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
