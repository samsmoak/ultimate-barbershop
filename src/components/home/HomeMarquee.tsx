"use client";

import { MarqueeStrip } from "@/components/shared/MarqueeStrip";

const row1 = [
  "Precision Fades",
  "Beard Trims",
  "Hot Towel Shaves",
  "Kids Cuts",
  "Lineups",
  "Alexandria VA",
];
const row2 = [
  "Walk-Ins Welcome",
  "LGBTQ+ Friendly",
  "4.4★ · 492 Reviews",
  "Open 6 Days",
];

export function HomeMarquee() {
  return (
    <section className="relative border-y border-white/5 bg-[#0a0a0a] py-8">
      <MarqueeStrip items={row1} direction="left" speed={48} />
      <div className="mt-5">
        <MarqueeStrip items={row2} direction="right" speed={56} />
      </div>
    </section>
  );
}
