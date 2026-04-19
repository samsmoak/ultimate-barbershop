import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

export function HoursTable({ className }: { className?: string }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <dl className={cn("divide-y divide-white/5 border-y border-white/5", className)}>
      {SITE.hours.map((h) => {
        const isToday = h.day === today;
        return (
          <div
            key={h.day}
            className={cn(
              "flex items-center justify-between py-3 font-grotesk text-sm",
              isToday && "text-white"
            )}
          >
            <dt className="flex items-center gap-2 uppercase tracking-[0.18em] text-white/70">
              {isToday && <span className="h-1.5 w-1.5 rounded-full bg-[#c6973f]" aria-hidden />}
              {h.day}
            </dt>
            <dd className="tabular-nums text-white/80">
              {h.open ? `${h.open} – ${h.close}` : "Closed"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
