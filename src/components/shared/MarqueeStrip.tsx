"use client";

import { cn } from "@/lib/cn";

type Props = {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  separator?: string;
  tone?: "gold" | "muted" | "dark-on-gold";
  size?: "sm" | "md" | "lg";
};

export function MarqueeStrip({
  items,
  direction = "left",
  speed = 42,
  className,
  separator = "✦",
  tone = "muted",
  size = "md",
}: Props) {
  const text =
    tone === "gold"
      ? "text-[#c6973f]"
      : tone === "dark-on-gold"
      ? "text-[#0a0a0a]"
      : "text-white/55";
  const sep =
    tone === "dark-on-gold" ? "text-[#0a0a0a]" : "text-[#c6973f]";
  const fontSize =
    size === "lg"
      ? "text-[clamp(2rem,4vw,3.25rem)]"
      : size === "sm"
      ? "text-sm"
      : "text-lg";

  // Render twice for seamless loop.
  const row = (
    <div
      className="flex shrink-0 items-center gap-10 whitespace-nowrap px-5"
    >
      {items.map((item, i) => (
        <span
          key={`${i}-${item}`}
          className={cn(
            "font-label uppercase tracking-[0.18em]",
            fontSize,
            text
          )}
        >
          {item}
          <span className={cn("mx-6", sep)} aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee-strip relative w-full overflow-hidden", className)}>
      <div
        className="flex w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {row}
        {row}
      </div>
      <style jsx>{`
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
