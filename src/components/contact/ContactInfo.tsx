import { Phone, MapPin, Clock } from "lucide-react";
import { SITE } from "@/lib/site";
import { HoursTable } from "@/components/shared/HoursTable";
import { SectionLabel } from "@/components/shared/SectionLabel";

export function ContactInfo() {
  return (
    <div className="space-y-10">
      <div>
        <SectionLabel>VISIT US</SectionLabel>
        <div className="mt-5 flex items-start gap-4">
          <MapPin size={20} className="mt-1 shrink-0 text-[#c6973f]" />
          <div>
            <div className="font-display text-2xl text-white">
              {SITE.address.line1}
            </div>
            <div className="font-serif text-lg italic text-white/70">
              {SITE.address.line2}
            </div>
            <a
              href={SITE.address.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="link-gold mt-3 inline-block font-label text-xs uppercase tracking-[0.28em] text-[#c6973f]"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>CALL OR WALK IN</SectionLabel>
        <div className="mt-5 flex items-start gap-4">
          <Phone size={20} className="mt-1 shrink-0 text-[#c6973f]" />
          <div>
            <a
              href={SITE.phoneHref}
              className="font-display text-3xl text-white"
            >
              {SITE.phone}
            </a>
            <p className="mt-2 font-serif text-base italic text-white/60">
              We'll pick up. Walk-ins welcome every open hour.
            </p>
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>HOURS</SectionLabel>
        <div className="mt-5 flex items-start gap-4">
          <Clock size={20} className="mt-1 shrink-0 text-[#c6973f]" />
          <HoursTable className="flex-1" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Badge>LGBTQ+ Friendly</Badge>
        <Badge>Family Welcome</Badge>
        <Badge>Walk-Ins Welcome</Badge>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-[#c6973f]/60 px-4 py-1.5 font-label text-[10px] uppercase tracking-[0.28em] text-[#c6973f]">
      <span aria-hidden>✦</span>
      {children}
    </span>
  );
}
