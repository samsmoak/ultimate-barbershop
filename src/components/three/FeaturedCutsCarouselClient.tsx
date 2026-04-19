"use client";

import dynamic from "next/dynamic";
import type { Cut } from "@/types";

const FeaturedCutsCarousel = dynamic(() => import("./FeaturedCutsCarousel"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center font-label text-xs tracking-[0.3em] text-[#c6973f]/70">
      LOADING THE CHAIR…
    </div>
  ),
});

export function FeaturedCutsCarouselClient({ cuts }: { cuts: Cut[] }) {
  return (
    <div className="absolute inset-0">
      <FeaturedCutsCarousel cuts={cuts} />
    </div>
  );
}
