"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CUTS } from "@/lib/cuts";
import type { Cut } from "@/types";
import { CutsFilters } from "./CutsFilters";
import { CutCard } from "./CutCard";
import { Lightbox } from "@/components/shared/Lightbox";
import { Container } from "@/components/shared/Container";
import { SectionLabel } from "@/components/shared/SectionLabel";

type FilterId = "all" | Cut["category"];

export function CutsGrid() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? CUTS
        : CUTS.filter((c) => c.category === filter),
    [filter]
  );

  return (
    <section className="relative bg-[#0a0a0a] py-20 sm:py-28">
      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>FILTER THE WORK</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-white">
              Browse the portfolio.
            </h2>
            <p className="mt-4 max-w-md font-serif text-lg italic text-white/60">
              Each image clicks open. Arrow keys to navigate. Book the look
              straight from the lightbox.
            </p>
          </div>
          <CutsFilters active={filter} onChange={setFilter} />
        </div>

        <motion.div
          layout
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((cut, i) => (
              <motion.div
                key={cut.id}
                layout
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.55,
                  delay: (i % 9) * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cut.size === "large" ? "sm:col-span-2" : ""}
              >
                <CutCard
                  cut={cut}
                  onOpen={() => setOpenIdx(i)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      <Lightbox
        cuts={filtered}
        activeIndex={openIdx}
        onClose={() => setOpenIdx(null)}
        onNavigate={(i) => setOpenIdx(i)}
      />
    </section>
  );
}
