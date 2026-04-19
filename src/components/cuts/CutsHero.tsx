"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LUXE_EASE } from "@/lib/motion";

export function CutsHero() {
  return (
    <section className="relative isolate flex h-[92svh] min-h-[580px] w-full items-end overflow-hidden bg-[#0a0a0a]">
      <Image
        src="/images/cuts/cut-02.jpg"
        alt="Close-up of a fresh fade — editorial, detailed"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/30 to-[#0a0a0a]"
      />

      <div className="relative z-[2] mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: LUXE_EASE, delay: 0.15 }}
          className="font-label text-[11px] uppercase tracking-[0.36em] text-[#c6973f]"
        >
          The Portfolio · Alexandria, VA
        </motion.div>

        <h1 className="mt-6 font-display text-[clamp(4rem,17vw,16rem)] leading-[0.88] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            <motion.span
              className="inline-block text-white"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: LUXE_EASE, delay: 0.3 }}
            >
              The
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="inline-block italic text-[#c6973f]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: LUXE_EASE, delay: 0.45 }}
            >
              Cuts.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: LUXE_EASE }}
          className="mt-8 max-w-2xl font-serif text-2xl italic text-white/75 sm:text-3xl"
        >
          Every line tells a story.
        </motion.p>
      </div>
    </section>
  );
}
