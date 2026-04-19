"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LUXE_EASE } from "@/lib/motion";
import { Container } from "@/components/shared/Container";

export function AboutHero() {
  return (
    <section className="relative isolate flex h-[78svh] min-h-[520px] w-full items-end overflow-hidden bg-[#0a0a0a]">
      <Image
        src="/images/cuts/cut-05.jpg"
        alt="Interior of Ultimate Styles Barbershop — warm, atmospheric"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <span
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/30 to-[#0a0a0a]"
      />
      <Container className="relative z-[2] pb-20 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: LUXE_EASE }}
          className="font-label text-[11px] uppercase tracking-[0.36em] text-[#c6973f]"
        >
          EST. ALEXANDRIA · VA
        </motion.div>
        <h1 className="mt-6 overflow-hidden font-display text-[clamp(3rem,11vw,10rem)] leading-[0.92] tracking-[-0.02em]">
          <motion.span
            className="inline-block text-white"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.15, delay: 0.3, ease: LUXE_EASE }}
          >
            Our <span className="italic text-[#c6973f]">Story.</span>
          </motion.span>
        </h1>
      </Container>
    </section>
  );
}
