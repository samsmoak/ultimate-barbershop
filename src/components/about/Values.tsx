"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/shared/Container";
import { SectionLabel } from "@/components/shared/SectionLabel";

const VALUES = [
  {
    title: "Precision",
    body: "Every fade is millimetered. Every line is pulled with intent. Rushed work is not work.",
  },
  {
    title: "Respect",
    body: "Your time, your style, your story. We listen before we cut, and we remember next time.",
  },
  {
    title: "Community",
    body: "Alexandria is home. Our clients are neighbors. The shop is theirs as much as ours.",
  },
  {
    title: "Excellence",
    body: "4.4★ across 136 reviews isn't the ceiling — it's the floor we built from.",
  },
];

export function Values() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    (async () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const [{ default: gsap }, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".value-card",
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
            },
          }
        );
      }, ref);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={ref} className="relative bg-[#111] py-24 sm:py-32">
      <Container>
        <SectionLabel>WHAT WE STAND ON</SectionLabel>
        <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-white">
          Four words on the wall.
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="value-card group relative flex h-full flex-col border border-white/10 bg-[#0a0a0a] p-8 transition-colors hover:border-[#c6973f]/60"
            >
              <span
                aria-hidden
                className="font-label text-5xl text-[#c6973f]"
              >
                ✦
              </span>
              <h3 className="mt-6 font-display text-3xl text-white">
                {v.title}
              </h3>
              <p className="mt-4 font-serif text-base leading-relaxed text-white/65">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
