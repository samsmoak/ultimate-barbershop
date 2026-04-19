import Link from "next/link";
import { SITE } from "@/lib/site";

export function MapEmbed() {
  return (
    <section className="relative w-full bg-[#0a0a0a]">
      <div className="relative h-[480px] w-full overflow-hidden border-y border-[#c6973f]/40">
        <iframe
          title="Map to The Ultimate Barber"
          src={SITE.address.embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full grayscale-[85%] invert-[0.92] contrast-[1.1] hue-rotate-[180deg]"
          allowFullScreen
        />
      </div>
      <div className="flex items-center justify-center py-6">
        <Link
          href={SITE.address.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-[#c6973f] px-6 py-3 font-label text-[11px] uppercase tracking-[0.28em] text-[#0a0a0a] transition-colors hover:bg-[#e8c97a]"
        >
          Get Directions →
        </Link>
      </div>
    </section>
  );
}
