"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorState = "default" | "link" | "image" | "button";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.5 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.5 });
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (hidden) setHidden(false);
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => setState((s) => (s === "default" ? "link" : s));
    const onUp = () => resolveState();

    const resolveState = (target?: EventTarget | null) => {
      const el =
        (target as HTMLElement) ||
        document.elementFromPoint(x.get(), y.get()) ||
        null;
      if (!el) {
        setState("default");
        return;
      }
      const interactive = (el as HTMLElement).closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      ) as HTMLElement | null;
      if (!interactive) {
        setState("default");
        return;
      }
      const explicit = interactive.getAttribute("data-cursor");
      if (explicit === "image") setState("image");
      else if (explicit === "button" || interactive.tagName === "BUTTON")
        setState("button");
      else setState("link");
    };

    const onOver = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => resolveState(e.target));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y, hidden]);

  if (!enabled) return null;

  const ringSize =
    state === "image" ? 84 : state === "button" ? 72 : state === "link" ? 64 : 40;

  const ringBg =
    state === "image"
      ? "rgba(198,151,63,0.95)"
      : state === "button"
      ? "rgba(198,151,63,0.25)"
      : state === "link"
      ? "rgba(198,151,63,0.1)"
      : "rgba(0,0,0,0.15)";

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          translateX: ringX,
          translateY: ringY,
          width: ringSize,
          height: ringSize,
          background: ringBg,
          backdropFilter: state === "default" ? "blur(4px)" : "none",
          opacity: hidden ? 0 : 1,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#c6973f] transition-[width,height,background] duration-300 ease-out"
      >
        <AnimatePresence>
          {state === "image" && (
            <motion.span
              key="view"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="font-label text-[11px] tracking-[0.2em] text-white"
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        aria-hidden
        style={{
          translateX: dotX,
          translateY: dotY,
          opacity: hidden ? 0 : state === "image" ? 0 : 1,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c6973f] shadow-[0_0_12px_rgba(198,151,63,0.9)]"
      />
    </>
  );
}
