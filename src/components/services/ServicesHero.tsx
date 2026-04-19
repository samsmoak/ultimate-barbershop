"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LUXE_EASE } from "@/lib/motion";
import { Container } from "@/components/shared/Container";

export function ServicesHero() {
  return (
    <section className="relative isolate flex h-[70svh] min-h-[480px] w-full items-end overflow-hidden bg-[#0a0a0a]">
      <Image
        src="/images/cuts/cut-03.jpg"
        alt="Straight razor on dark marble surface"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-75"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]"
      />

      <div className="relative z-[2] w-full">
        <Container>
          <div className="pb-16 pt-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: LUXE_EASE, delay: 0.15 }}
              className="font-label text-[11px] uppercase tracking-[0.36em] text-[#c6973f]"
            >
              THE MENU
            </motion.div>
            <h1 className="mt-6 overflow-hidden font-display text-[clamp(3rem,10vw,8rem)] leading-[0.92] tracking-[-0.02em] text-white">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: LUXE_EASE, delay: 0.3 }}
              >
                Services &amp; <span className="italic text-[#c6973f]">Pricing.</span>
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="mt-6 max-w-xl font-serif text-xl italic text-white/70 sm:text-2xl"
            >
              Every cut is crafted with intention.
            </motion.p>
          </div>
        </Container>
      </div>
    </section>
  );
}
