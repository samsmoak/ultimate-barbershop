"use client";

import { motion } from "framer-motion";
import { CUT_FILTERS } from "@/lib/cuts";
import type { Cut } from "@/types";
import { cn } from "@/lib/cn";

type FilterId = "all" | Cut["category"];

type Props = {
  active: FilterId;
  onChange: (id: FilterId) => void;
};

export function CutsFilters({ active, onChange }: Props) {
  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 sm:gap-3">
      {CUT_FILTERS.map((f) => {
        const isActive = f.id === active;
        return (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            className={cn(
              "relative shrink-0 rounded-full border px-5 py-2.5 font-label text-[11px] uppercase tracking-[0.28em] transition-colors",
              isActive
                ? "border-[#c6973f] text-[#0a0a0a]"
                : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="cuts-filter-pill"
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="absolute inset-0 rounded-full bg-[#c6973f]"
              />
            )}
            <span className="relative">{f.label}</span>
          </button>
        );
      })}
    </div>
  );
}
