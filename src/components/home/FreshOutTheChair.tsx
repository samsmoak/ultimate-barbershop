"use client";

import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { AnimatedHeading } from "@/components/shared/AnimatedHeading";
import { FeaturedCutsCarouselClient } from "@/components/three/FeaturedCutsCarouselClient";
import type { Cut } from "@/types";

export function FreshOutTheChair({ cuts }: { cuts: Cut[] }) {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel>PORTFOLIO · 2025</SectionLabel>
            <AnimatedHeading
              as="h2"
              className="mt-6 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02] text-white"
            >
              Fresh Out The Chair
            </AnimatedHeading>
          </div>
          <p className="max-w-sm font-serif text-lg italic text-white/60">
            Drag, swipe, hover. Every card is a client who walked out of 2712 Richmond Hwy.
          </p>
        </div>
      </Container>

      {/* 3D Stage */}
      <div className="relative mt-16 h-[min(80vh,720px)] w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[12%] bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[12%] bg-gradient-to-l from-[#0a0a0a] to-transparent" />
        <FeaturedCutsCarouselClient cuts={cuts} />
      </div>

      <Container>
        <div className="mt-14 flex justify-center">
          <Link
            href="/cuts"
            className="link-gold inline-flex items-center gap-2 font-label text-sm uppercase tracking-[0.3em] text-[#c6973f]"
          >
            See All Cuts
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
