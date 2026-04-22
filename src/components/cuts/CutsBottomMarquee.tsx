"use client";

import { MarqueeStrip } from "@/components/shared/MarqueeStrip";

export function CutsBottomMarquee() {
  return (
    <section className="relative border-y border-[#c6973f]/40 bg-[#0a0a0a] py-8">
      <MarqueeStrip
        items={[
          "Book Your Look →",
          "(703) 549-8820 →",
          "Walk-Ins Welcome →",
          "The Ultimate Barber →",
        ]}
        separator="·"
        tone="gold"
        size="lg"
        speed={58}
      />
    </section>
  );
}
