import type { Review } from "@/types";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  review: Review;
  className?: string;
  featured?: boolean;
};

export function ReviewCard({ review, className, featured }: Props) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500",
        "hover:border-[#c6973f]/40 hover:bg-white/[0.04]",
        featured && "border-[#c6973f]/40",
        className
      )}
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: review.stars }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className="fill-[#c6973f] text-[#c6973f]"
          />
        ))}
      </div>
      <p
        className={cn(
          "mt-5 flex-1 font-serif text-xl italic leading-relaxed text-white/90",
          featured && "text-2xl"
        )}
      >
        &ldquo;{review.body}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c6973f]/50 bg-[#1a1a1a] font-label text-sm text-[#c6973f]">
          {review.name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <div className="font-grotesk text-sm text-white">{review.name}</div>
          <div className="text-xs text-white/50">
            {review.when}
            {review.localGuide ? " · Local Guide" : ""}
          </div>
        </div>
      </div>
    </article>
  );
}
