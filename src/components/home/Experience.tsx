"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatedHeading } from "@/components/shared/AnimatedHeading";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Container } from "@/components/shared/Container";

type Panel = {
  label: string;
  title: string;
  body: string;
  image: string;
};

const PANELS: Panel[] = [
  {
    label: "I",
    title: "The Craft",
    body:
      "Every consultation begins before the cape goes on. We listen first, read the grain of your hair, map your bone structure, and only then pick up the clippers. Precision doesn't rush.",
    image: "/images/cuts/cut-03.jpg",
  },
  {
    label: "II",
    title: "The Atmosphere",
    body:
      "Leather chairs, warm brass, and the low hum of clippers. The shop was built to feel like a private club — except the door is open to everyone. Coffee's on when you walk in.",
    image: "/images/cuts/cut-05.jpg",
  },
  {
    label: "III",
    title: "The Confidence",
    body:
      "You don't leave with a haircut. You leave walking two inches taller. That's the reason clients drive in from DC, Maryland, and three states over — and keep coming back every two weeks.",
    image: "/images/scene/interior.jpg",
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let cleaned = false;

    const run = async () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const [{ default: gsap }, stModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const ScrollTrigger = stModule.ScrollTrigger ?? stModule.default;
      gsap.registerPlugin(ScrollTrigger);
      if (cleaned) return;

      ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(".experience-panel");
        panels.forEach((panel) => {
          const image = panel.querySelector<HTMLElement>(".panel-image");
          const text = panel.querySelector<HTMLElement>(".panel-text");
          if (!image || !text) return;
          gsap.fromTo(
            image,
            { scale: 1.15, opacity: 0.4 },
            {
              scale: 1,
              opacity: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 75%",
                end: "bottom 35%",
                scrub: 0.4,
              },
            }
          );
          gsap.fromTo(
            text.querySelectorAll<HTMLElement>(".panel-fragment"),
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 65%",
              },
            }
          );
        });
      }, sectionRef);
    };

    run();

    return () => {
      cleaned = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-36"
    >
      <Container>
        <div className="max-w-3xl">
          <SectionLabel>THE RITUAL</SectionLabel>
          <AnimatedHeading
            as="h2"
            className="mt-6 font-serif text-[clamp(2.5rem,6vw,5.5rem)] italic leading-[1.02] text-white"
          >
            More Than a Haircut.
          </AnimatedHeading>
          <p className="mt-4 font-display text-2xl italic text-[#c6973f]">
            It&apos;s a ritual.
          </p>
        </div>
      </Container>

      <div className="mt-20 flex flex-col">
        {PANELS.map((p, i) => (
          <div
            key={p.title}
            className="experience-panel relative grid grid-cols-1 items-center lg:grid-cols-12"
          >
            {/* Gold accent stripe left edge */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-10 h-[calc(100%-80px)] w-[2px] bg-gradient-to-b from-transparent via-[#c6973f] to-transparent"
            />

            <div
              className={`panel-image relative col-span-1 h-[70vh] min-h-[480px] overflow-hidden lg:col-span-7 ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/60 via-transparent to-transparent"
              />
            </div>

            <div
              className={`panel-text col-span-1 flex flex-col gap-7 px-6 py-16 sm:px-12 lg:col-span-5 lg:px-16 ${
                i % 2 === 1 ? "lg:order-1" : ""
              }`}
            >
              <span className="panel-fragment font-label text-[11px] uppercase tracking-[0.36em] text-[#c6973f]">
                {p.label} · Chapter
              </span>
              <h3 className="panel-fragment font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-white">
                {p.title}
              </h3>
              <p className="panel-fragment max-w-md font-serif text-xl italic leading-relaxed text-white/70">
                {p.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
