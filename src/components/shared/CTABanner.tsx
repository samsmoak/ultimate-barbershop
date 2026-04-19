"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  heading: string;
  subtext?: string;
  cta: { label: string; href: string };
  className?: string;
};

export function CTABanner({ heading, subtext, cta, className }: Props) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#c6973f] text-[#0a0a0a]",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-25 diag-stripes"
      />

      <motion.svg
        aria-hidden
        className="pointer-events-none absolute left-[-15%] top-1/2 h-[220%] w-[28%] -translate-y-1/2 text-[#0a0a0a]/70"
        initial={{ x: "-20%", opacity: 0 }}
        whileInView={{ x: "320%", opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        viewBox="0 0 120 240"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="28" cy="58" r="18" />
          <circle cx="28" cy="182" r="18" />
          <path d="M42 72 L112 122" />
          <path d="M42 168 L112 118" />
          <path d="M108 116 L118 120 L108 124" />
        </g>
      </motion.svg>

      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-start gap-8 px-6 py-20 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <h2 className="max-w-2xl font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05]">
            {heading}
          </h2>
          {subtext && (
            <p className="mt-4 font-grotesk text-base uppercase tracking-[0.18em] text-[#0a0a0a]/75">
              {subtext}
            </p>
          )}
        </div>

        <Link
          href={cta.href}
          data-cursor="button"
          className="group inline-flex items-center gap-3 bg-[#0a0a0a] px-8 py-4 font-label text-sm uppercase tracking-[0.28em] text-white transition-all hover:bg-black"
        >
          {cta.label}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
