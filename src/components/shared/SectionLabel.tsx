import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-label text-[11px] uppercase tracking-[0.32em] text-[#c6973f]",
        className
      )}
    >
      <span aria-hidden className="inline-block h-[1px] w-10 bg-[#c6973f]" />
      {children}
    </div>
  );
}
