"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/services";
import type { ServiceCategory } from "@/types";
import { Container } from "@/components/shared/Container";

export function ServicesTabs() {
  const [tab, setTab] = useState<ServiceCategory>("haircuts");
  const active = useMemo(
    () => SERVICE_CATEGORIES.find((c) => c.id === tab)!,
    [tab]
  );
  const services = useMemo(
    () => SERVICES.filter((s) => s.category === tab),
    [tab]
  );

  return (
    <section className="relative bg-[#0a0a0a] py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div
            role="tablist"
            aria-label="Service categories"
            className="flex flex-wrap gap-1 border border-white/10 bg-[#0e0e0e] p-1"
          >
            {SERVICE_CATEGORIES.map((c) => {
              const on = c.id === tab;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setTab(c.id)}
                  className={`relative px-5 py-2.5 font-label text-[11px] uppercase tracking-[0.28em] transition-colors ${
                    on ? "text-[#0a0a0a]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="services-tab-pill"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 30,
                      }}
                      className="absolute inset-0 bg-[#c6973f]"
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              );
            })}
          </div>
          <p className="max-w-sm font-serif text-lg italic text-white/60">
            {active.blurb}
          </p>
        </div>

        <div className="mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-7"
            >
              {services.map((s, i) => (
                <motion.article
                  key={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative border border-white/10 bg-[#111] p-7 transition-colors hover:border-[#c6973f]/60"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-[3px] bg-[#c6973f] opacity-80 transition-all duration-500 group-hover:w-[6px]"
                  />
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-grotesk text-lg uppercase tracking-[0.14em] text-white">
                        {s.name}
                      </h3>
                      <p className="mt-3 max-w-sm font-serif text-base italic leading-relaxed text-white/65">
                        {s.description}
                      </p>
                    </div>
                    <div className="shrink-0 font-label text-[clamp(2rem,3vw,2.75rem)] leading-none text-[#c6973f]">
                      {s.price}
                    </div>
                  </div>
                  <Link
                    href={{ pathname: "/book", query: { service: s.id } }}
                    className="mt-6 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.28em] text-[#c6973f] opacity-80 transition-opacity hover:opacity-100"
                  >
                    Book This Service →
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
