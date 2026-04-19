"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import type { Cut } from "@/types";
import { barberById } from "@/lib/team";

type Props = {
  cuts: Cut[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

export function Lightbox({ cuts, activeIndex, onClose, onNavigate }: Props) {
  const active = activeIndex !== null ? cuts[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        onNavigate((activeIndex + 1) % cuts.length);
      if (e.key === "ArrowLeft")
        onNavigate((activeIndex - 1 + cuts.length) % cuts.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, cuts.length, onClose, onNavigate]);

  const barber = active ? barberById(active.barberId) : null;

  return (
    <AnimatePresence>
      {active && activeIndex !== null && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0a0a0a]/92 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#c6973f] hover:text-[#c6973f]"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            aria-label="Previous cut"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex - 1 + cuts.length) % cuts.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center border border-[#c6973f]/50 text-[#c6973f] transition-colors hover:bg-[#c6973f] hover:text-[#0a0a0a] sm:left-8"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            aria-label="Next cut"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex + 1) % cuts.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center border border-[#c6973f]/50 text-[#c6973f] transition-colors hover:bg-[#c6973f] hover:text-[#0a0a0a] sm:right-8"
          >
            <ChevronRight size={24} />
          </button>

          <motion.div
            onClick={(e) => e.stopPropagation()}
            layoutId={`cut-${active.id}`}
            className="relative flex h-[86vh] w-[90vw] max-w-6xl flex-col overflow-hidden border border-[#c6973f]/40 bg-[#0a0a0a] sm:flex-row"
          >
            <div className="relative h-[55%] w-full sm:h-full sm:w-[65%]">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
              <div>
                <span className="inline-flex bg-[#c6973f] px-3 py-1 font-label text-[10px] uppercase tracking-[0.28em] text-[#0a0a0a]">
                  {active.category}
                </span>
                <h3 className="mt-6 font-display text-4xl leading-tight text-white">
                  {active.caption}
                </h3>
                <p className="mt-4 font-serif text-lg italic text-white/70">
                  {active.alt}
                </p>
                {barber && (
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <div className="font-label text-[10px] uppercase tracking-[0.28em] text-[#c6973f]">
                      Cut By
                    </div>
                    <div className="mt-1 font-grotesk text-white">
                      {barber.name} · {barber.title}
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/book"
                onClick={onClose}
                className="mt-10 inline-flex items-center gap-3 self-start bg-[#c6973f] px-6 py-3 font-label text-[12px] uppercase tracking-[0.28em] text-[#0a0a0a] transition-all hover:bg-[#e8c97a]"
              >
                Book This Look
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
