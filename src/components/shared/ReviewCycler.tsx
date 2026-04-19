"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Review } from "@/types";
import { Star } from "lucide-react";

export function ReviewCycler({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setI((n) => (n + 1) % reviews.length),
      7000
    );
    return () => clearInterval(id);
  }, [reviews.length]);

  const r = reviews[i];

  return (
    <div className="relative mx-auto max-w-5xl text-center">
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 select-none text-[min(26vw,320px)] font-display italic leading-none text-[#c6973f]/10">
        &ldquo;
      </div>
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={r.id}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className="mb-6 flex items-center justify-center gap-1">
            {Array.from({ length: r.stars }).map((_, n) => (
              <Star
                key={n}
                size={16}
                className="fill-[#c6973f] text-[#c6973f]"
              />
            ))}
          </div>
          <p className="font-serif text-[clamp(1.35rem,2.4vw,2rem)] italic leading-[1.45] text-white/90">
            &ldquo;{r.body}&rdquo;
          </p>
          <footer className="mt-8 font-label text-[11px] uppercase tracking-[0.3em] text-[#c6973f]">
            — {r.name}
            {r.localGuide ? " · Local Guide" : ""}
          </footer>
        </motion.blockquote>
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-center gap-3">
        {reviews.map((_, n) => (
          <button
            key={n}
            onClick={() => setI(n)}
            aria-label={`Show review ${n + 1}`}
            className={`h-[2px] transition-all ${
              n === i ? "w-10 bg-[#c6973f]" : "w-5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
