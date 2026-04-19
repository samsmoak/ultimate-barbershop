"use client";

import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SectionLabel } from "@/components/shared/SectionLabel";

const SHOTS = [
  { src: "/images/cuts/cut-03.jpg", alt: "Tools laid out on a dark counter" },
  { src: "/images/cuts/cut-05.jpg", alt: "Barber chair in warm light" },
  { src: "/images/scene/hero.jpg", alt: "Leather and brass detail" },
  { src: "/images/scene/interior.jpg", alt: "Barber at work, side profile" },
  { src: "/images/cuts/cut-15.jpg", alt: "Client receiving the finish" },
];

export function ShopExperience() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>INSIDE THE SHOP</SectionLabel>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-white">
              Step inside The Ultimate Barber.
            </h2>
          </div>
          <p className="max-w-sm font-serif text-base italic text-white/60">
            Drag horizontally. The room was built to be photographed.
          </p>
        </div>
      </Container>

      <div
        className="mt-14 flex gap-5 overflow-x-auto px-6 pb-6 sm:px-10 lg:px-16"
        style={{ scrollbarWidth: "none" }}
      >
        {SHOTS.map((s, i) => (
          <div
            key={i}
            className="relative h-[60vh] min-h-[420px] w-[75vw] shrink-0 overflow-hidden border border-white/5 sm:w-[55vw] lg:w-[38vw]"
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent"
            />
            <span className="absolute bottom-5 left-5 font-label text-[10px] uppercase tracking-[0.28em] text-[#c6973f]">
              0{i + 1}
            </span>
          </div>
        ))}
        <div className="w-4 shrink-0" aria-hidden />
      </div>
    </section>
  );
}
