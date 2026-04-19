"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroHelixClient } from "@/components/three/HeroHelixClient";
import { LUXE_EASE } from "@/lib/motion";
import { SITE } from "@/lib/site";

const line1 = ["The", "Ultimate"];
const line2 = "Barber.";

export function Hero() {
  return (
    <section className="relative isolate flex h-[100svh] w-full items-end overflow-hidden bg-[#0a0a0a]">
      {/* Full-bleed hero image */}
      <Image
        src="/images/scene/hero.jpg"
        alt="Dark, atmospheric barbershop interior with warm lighting"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/75 via-[#0a0a0a]/55 to-[#0a0a0a]"
      />

      {/* R3F helix layer — barely visible texture */}
      <div className="pointer-events-none absolute inset-0 z-[2] opacity-[0.18] mix-blend-screen">
        <HeroHelixClient className="h-full w-full" />
      </div>

      <div className="relative z-[3] mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-28">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: LUXE_EASE, delay: 0.2 }}
          className="flex items-center gap-3 font-label text-[11px] uppercase tracking-[0.32em] text-[#c6973f]"
        >
          <span aria-hidden className="inline-block h-[1px] w-8 bg-[#c6973f]" />
          Alexandria, VA · Since We Opened The Door
        </motion.div>

        {/* Headline — GSAP-less word reveal using Framer (same visual) */}
        <h1 className="font-display text-[clamp(3rem,11vw,10.5rem)] leading-[0.92] tracking-[-0.02em]">
          <span className="block">
            {line1.map((w, i) => (
              <span key={w} className="mr-4 inline-block overflow-hidden align-middle">
                <motion.span
                  className="inline-block text-white"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    ease: LUXE_EASE,
                    delay: 0.35 + i * 0.12,
                  }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="inline-block italic text-[#c6973f]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: LUXE_EASE, delay: 0.7 }}
            >
              {line2}
            </motion.span>
          </span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: LUXE_EASE, delay: 1.1 }}
          className="max-w-xl font-grotesk text-[13px] uppercase tracking-[0.28em] text-white/70 sm:text-[15px]"
        >
          {SITE.tagline}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: LUXE_EASE, delay: 1.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/book"
            data-cursor="button"
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-[#c6973f] px-8 py-4 font-label text-[12px] uppercase tracking-[0.28em] text-[#0a0a0a] transition-all hover:bg-[#e8c97a]"
            style={{ boxShadow: "0 0 40px rgba(198,151,63,0.28)" }}
          >
            <span className="gold-pulse absolute inset-0" aria-hidden />
            <span className="relative">Book Your Appointment</span>
            <span
              aria-hidden
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/cuts"
            className="group inline-flex items-center gap-3 border border-white/35 bg-transparent px-8 py-4 font-label text-[12px] uppercase tracking-[0.28em] text-white transition-colors hover:border-white hover:bg-white/5"
          >
            See Our Work
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-10 right-6 flex flex-col items-center gap-3 sm:right-12"
        >
          <span className="rotate-90 font-label text-[10px] uppercase tracking-[0.36em] text-white/60">
            SCROLL
          </span>
          <motion.span
            className="h-16 w-[1px] origin-top bg-[#c6973f]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, delay: 1.8, ease: LUXE_EASE }}
          />
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="font-label text-[14px] text-[#c6973f]"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
