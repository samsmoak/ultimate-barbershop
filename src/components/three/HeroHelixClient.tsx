"use client";

import dynamic from "next/dynamic";

const HeroHelix = dynamic(() => import("./HeroHelix"), {
  ssr: false,
  loading: () => null,
});

export function HeroHelixClient({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <HeroHelix />
    </div>
  );
}
