import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { AnimatedHeading } from "@/components/shared/AnimatedHeading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find The Ultimate Barber — 1308 Mt Vernon Ave, Alexandria, VA. Call (703) 549-8820 or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0a0a] pb-10 pt-32 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(198,151,63,0.14),transparent_60%)]"
        />
        <Container>
          <SectionLabel>REACH US</SectionLabel>
          <AnimatedHeading
            as="h1"
            className="mt-6 font-display text-[clamp(3rem,11vw,10rem)] leading-[0.92] tracking-[-0.02em] text-white"
          >
            Find Us.
          </AnimatedHeading>
          <p className="mt-6 max-w-xl font-serif text-xl italic text-white/60">
            Right on Mt Vernon Ave. Open six days a week. The coffee is on.
          </p>
        </Container>
      </section>

      <section className="bg-[#0a0a0a] py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ContactInfo />
            <ContactForm />
          </div>
        </Container>
      </section>

      <MapEmbed />
    </>
  );
}
