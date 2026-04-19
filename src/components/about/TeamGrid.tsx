"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { Container } from "@/components/shared/Container";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { AnimatedHeading } from "@/components/shared/AnimatedHeading";
import { InstagramGlyph } from "@/components/shared/SocialIcons";
import { TEAM } from "@/lib/team";

export function TeamGrid() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 sm:py-32">
      <Container>
        <SectionLabel>THE ARTISTS</SectionLabel>
        <AnimatedHeading
          as="h2"
          className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] text-white"
        >
          The artists behind the chair.
        </AnimatedHeading>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {TEAM.map((b) => (
            <BarberCard
              key={b.id}
              name={b.name}
              title={b.title}
              image={b.image}
              bio={b.bio}
              years={b.years}
              instagram={b.instagram}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function BarberCard({
  name,
  title,
  image,
  bio,
  years,
  instagram,
}: {
  name: string;
  title: string;
  image: string;
  bio: string;
  years: number;
  instagram?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotX = useSpring(rx, { stiffness: 200, damping: 22 });
  const rotY = useSpring(ry, { stiffness: 200, damping: 22 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(x * 10);
    rx.set(-y * 6);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col border border-white/5 bg-[#111] transition-colors hover:border-[#c6973f]/50"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1a1a]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 95vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
        {/* Gold ring on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-3 border border-[#c6973f]/0 transition-all duration-500 group-hover:border-[#c6973f]/50"
        />
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl text-white">{name}</h3>
            <p className="mt-1 font-serif text-base italic text-[#c6973f]">
              {title}
            </p>
          </div>
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} on Instagram`}
              className="flex h-9 w-9 items-center justify-center border border-[#c6973f]/50 text-[#c6973f] transition-colors hover:bg-[#c6973f] hover:text-[#0a0a0a]"
            >
              <InstagramGlyph className="h-4 w-4" />
            </a>
          )}
        </div>
        <p className="mt-5 font-serif text-base leading-relaxed text-white/70">
          {bio}
        </p>
        <div className="mt-5 font-label text-[10px] uppercase tracking-[0.28em] text-white/40">
          {years} Years Behind The Chair
        </div>
      </div>
    </motion.article>
  );
}
