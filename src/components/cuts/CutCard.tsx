"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import type { Cut } from "@/types";
import { barberById } from "@/lib/team";
import { cn } from "@/lib/cn";

type Props = {
  cut: Cut;
  onOpen: () => void;
};

export function CutCard({ cut, onOpen }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const rotX = useSpring(rx, { stiffness: 240, damping: 25, mass: 0.4 });
  const rotY = useSpring(ry, { stiffness: 240, damping: 25, mass: 0.4 });

  const handleMove = (e: PointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    ry.set((x - 0.5) * 16); // -8 to 8
    rx.set(-(y - 0.5) * 10); // -5 to 5
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const barber = barberById(cut.barberId);
  const big = cut.size === "large";

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      data-cursor="image"
      layoutId={`cut-${cut.id}`}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative block w-full cursor-pointer overflow-hidden bg-[#111] text-left transition-[box-shadow,border-color] duration-500",
        "border border-white/5",
        "hover:border-[#c6973f]/70 hover:shadow-[0_30px_80px_-20px_rgba(198,151,63,0.3)]",
        big
          ? "aspect-[4/5] sm:aspect-[16/10] sm:col-span-2"
          : "aspect-[4/5]"
      )}
    >
      <motion.div
        style={{ z: 20, transform: "translateZ(20px)" }}
        className="absolute inset-0"
      >
        <Image
          src={cut.src}
          alt={cut.alt}
          fill
          sizes={
            big
              ? "(min-width: 1024px) 66vw, 100vw"
              : "(min-width: 1024px) 33vw, 100vw"
          }
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
        />
      </motion.div>

      {/* Dark gradient overlay (always subtle, intensifies on hover) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/15 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Category pill (persistent) */}
      <span className="absolute left-5 top-5 z-10 inline-flex bg-[#c6973f] px-3 py-1 font-label text-[10px] uppercase tracking-[0.28em] text-[#0a0a0a]">
        {cut.category}
      </span>

      {/* Overlay content — slides up from bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-8">
        <div className="font-label text-[10px] uppercase tracking-[0.32em] text-[#c6973f]">
          {barber ? `${barber.name} · ${barber.title}` : "Our Team"}
        </div>
        <div className="mt-2 font-display text-2xl text-white sm:text-3xl">
          {cut.caption}
        </div>
        <Link
          href="/book"
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-[#c6973f]"
        >
          Book This Look →
        </Link>
      </div>

      {/* Big caption when not hovered — persistent visual */}
      <div className="absolute inset-x-0 bottom-0 p-6 transition-opacity duration-500 group-hover:opacity-0 sm:p-8">
        <div className="font-display text-xl text-white sm:text-2xl">
          {cut.caption}
        </div>
      </div>
    </motion.button>
  );
}

