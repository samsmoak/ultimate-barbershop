import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { AnimatedHeading } from "@/components/shared/AnimatedHeading";

export function Story() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/5">
            <Image
              src="/images/scene/hero.jpg"
              alt="Leather barber chair and brass detail"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
          </div>

          <div>
            <SectionLabel>BUILT ON CRAFT · EST. 2015</SectionLabel>
            <AnimatedHeading
              as="h2"
              className="mt-6 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] text-white"
            >
              Alexandria&apos;s premier chair. Nothing less.
            </AnimatedHeading>
            <div className="mt-8 space-y-6 font-serif text-lg leading-relaxed text-white/75">
              <p>
                The Ultimate Barber started with a simple idea: a shop where
                every man&mdash;every person&mdash;could walk in and know the
                hands on the clippers actually cared. No rushed fades. No
                assumed styles. No door-to-door turnover.
              </p>
              <p>
                We built the room to feel like a private club with the door
                kicked wide open. Leather chairs. Warm brass. Music that isn't
                fighting for attention. The coffee is on. The conversation is
                easy. The work is not.
              </p>
              <p>
                We&apos;re welcoming to every background&mdash;veterans,
                families, first dates, grooms, kids in their very first chair,
                queer folks looking for a masculine cut that actually reads
                right. If you have hair, we have a chair. {" "}
                <span className="italic text-[#c6973f]">That is the promise.</span>
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Pill>LGBTQ+ Friendly</Pill>
              <Pill>Family Welcome</Pill>
              <Pill>Walk-Ins Welcome</Pill>
              <Pill>Licensed &amp; Insured</Pill>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-[#c6973f]/60 px-4 py-1.5 font-label text-[10px] uppercase tracking-[0.28em] text-[#c6973f]">
      <span aria-hidden>✦</span>
      {children}
    </span>
  );
}
