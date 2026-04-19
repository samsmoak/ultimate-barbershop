import Link from "next/link";
import { Globe } from "lucide-react";
import { SITE } from "@/lib/site";
import { Container } from "@/components/shared/Container";
import { InstagramGlyph, FacebookGlyph } from "@/components/shared/SocialIcons";

export function Footer() {
  return (
    <footer className="relative border-t border-[#c6973f]/60 bg-[#0a0a0a] pb-10 pt-20">
      <Container>
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="font-label text-sm uppercase tracking-[0.28em] text-white"
            aria-label="The Ultimate Barber — Home"
          >
            THE ULTIMATE BARBER
            <span className="text-[#c6973f]">.</span>
          </Link>
          <p className="mt-3 font-serif text-xl italic text-[#c6973f]">
            {SITE.tagline}
          </p>
        </div>

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-grotesk text-[12px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 text-sm sm:grid-cols-3">
          <div>
            <div className="font-label text-[11px] tracking-[0.22em] text-[#c6973f]">
              VISIT
            </div>
            <p className="mt-3 text-white/80">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
            </p>
            <a
              href={SITE.address.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="link-gold mt-3 inline-block text-[#c6973f]"
            >
              Get Directions
            </a>
          </div>

          <div>
            <div className="font-label text-[11px] tracking-[0.22em] text-[#c6973f]">
              CALL
            </div>
            <a
              href={SITE.phoneHref}
              className="mt-3 block font-display text-2xl text-white"
            >
              {SITE.phone}
            </a>
            <p className="mt-3 text-white/60">Walk-ins welcome · LGBTQ+ Friendly</p>
          </div>

          <div>
            <div className="font-label text-[11px] tracking-[0.22em] text-[#c6973f]">
              HOURS
            </div>
            <p className="mt-3 text-white/80">
              Mon–Fri &nbsp; 8:00a – 7:00p
              <br />
              Saturday &nbsp; 8:00a – 6:00p
              <br />
              Sunday &nbsp; Closed
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-5">
            <a
              href={SITE.socials.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="text-[#c6973f] transition-colors hover:text-[#e8c97a]"
            >
              <InstagramGlyph className="h-[18px] w-[18px]" />
            </a>
            <a
              href={SITE.socials.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="text-[#c6973f] transition-colors hover:text-[#e8c97a]"
            >
              <FacebookGlyph className="h-[18px] w-[18px]" />
            </a>
            <a
              href={SITE.socials.google}
              aria-label="Google reviews"
              target="_blank"
              rel="noreferrer"
              className="text-[#c6973f] transition-colors hover:text-[#e8c97a]"
            >
              <Globe size={18} />
            </a>
          </div>

          <span className="inline-flex items-center gap-2 border border-[#c6973f]/60 px-3 py-1 font-label text-[10px] uppercase tracking-[0.24em] text-[#c6973f]">
            <span aria-hidden>✦</span>
            LGBTQ+ FRIENDLY
          </span>
        </div>

        <p className="mt-10 text-center text-xs text-white/40">
          © 2025 The Ultimate Barber · Alexandria, VA · All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
}
