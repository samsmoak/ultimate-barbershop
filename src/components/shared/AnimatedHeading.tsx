"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { LUXE_EASE } from "@/lib/motion";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
};

// Splits the visible string into words and reveals each with a y-slide.
// Non-string children render with a simple fade-up.
export function AnimatedHeading({
  as = "h2",
  children,
  className,
  delay = 0,
  staggerDelay = 0.08,
}: Props) {
  const reduce = useReducedMotion();

  if (typeof children !== "string") {
    return createElement(
      as,
      { className: cn(className) },
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: LUXE_EASE, delay }}
      >
        {children}
      </motion.div>
    );
  }

  const words = children.split(" ");

  const inner = (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="inline-flex flex-wrap">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="relative overflow-hidden pb-[0.15em] pr-[0.25em] leading-[1.05]"
          >
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: "105%", opacity: 0 }}
              whileInView={
                reduce
                  ? undefined
                  : { y: 0, opacity: 1 }
              }
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.9,
                ease: LUXE_EASE,
                delay: delay + i * staggerDelay,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </>
  );

  return createElement(
    as,
    { className: cn("inline-block", className) },
    inner
  );
}
