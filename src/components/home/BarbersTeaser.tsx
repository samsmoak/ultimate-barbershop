"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { AnimatedHeading } from "@/components/shared/AnimatedHeading";
import { TEAM } from "@/lib/team";

export function BarbersTeaser() {
  return (
    <section className="relative overflow-hidden bg-[#111111] py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>THE TEAM</SectionLabel>
            <AnimatedHeading
              as="h2"
              className="mt-6 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02] text-white"
            >
              Meet Your Barber
            </AnimatedHeading>
          </div>
          <Link
            href="/about"
            className="link-gold font-label text-sm uppercase tracking-[0.28em] text-[#c6973f]"
          >
            Meet The Full Team →
          </Link>
        </div>
      </Container>

      <div
        className="mt-14 flex gap-8 overflow-x-auto overflow-y-hidden px-6 pb-6 sm:px-10 lg:px-16"
        style={{ scrollbarWidth: "none" }}
      >
        {TEAM.map((b, i) => (
          <motion.article
            key={b.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex w-[260px] shrink-0 flex-col items-center text-center sm:w-[300px]"
          >
            <div className="relative h-[300px] w-[240px] overflow-hidden border border-[#c6973f]/30 bg-[#1a1a1a] transition-all duration-500 sm:h-[360px] sm:w-[280px] group-hover:border-[#c6973f] group-hover:shadow-[0_0_60px_rgba(198,151,63,0.25)]">
              <Image
                src={b.image}
                alt={b.name}
                fill
                sizes="280px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 font-label text-[10px] uppercase tracking-[0.28em] text-[#c6973f]">
                {b.years} yrs · {b.specialties[0]}
              </span>
            </div>
            <h3 className="mt-6 font-display text-2xl text-white">
              {b.name}
            </h3>
            <p className="mt-1 font-serif text-base italic text-white/60">
              {b.title}
            </p>
          </motion.article>
        ))}
        <div className="w-8 shrink-0" aria-hidden />
      </div>
    </section>
  );
}
