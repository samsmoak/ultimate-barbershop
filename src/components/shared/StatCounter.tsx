"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  duration?: number;
  className?: string;
};

export function StatCounter({
  value,
  suffix,
  prefix,
  decimals = 0,
  label,
  duration = 1.6,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (latest) => {
    const n = Number(latest);
    return n.toFixed(decimals);
  });

  const spanRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const unsub = display.on("change", (v) => {
      if (spanRef.current) spanRef.current.textContent = v;
    });
    return () => unsub();
  }, [display]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.25, 1, 0.5, 1],
    });
    return controls.stop;
  }, [inView, value, mv, duration]);

  return (
    <div ref={ref} className={cn("flex flex-col items-start", className)}>
      <div className="font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-none text-white">
        {prefix}
        <span ref={spanRef}>0</span>
        {suffix}
      </div>
      <div className="mt-3 font-label text-[11px] uppercase tracking-[0.22em] text-[#c6973f]">
        {label}
      </div>
    </div>
  );
}
