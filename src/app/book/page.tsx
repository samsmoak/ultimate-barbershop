import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { Container } from "@/components/shared/Container";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book your next cut at The Ultimate Barber. Five easy steps. Walk-ins also welcome.",
};

export default function BookPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0a0a] pb-10 pt-32 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(198,151,63,0.12),transparent_60%)]"
        />
        <Container>
          <SectionLabel>IN THE CHAIR</SectionLabel>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.02] text-white">
            Book Your <span className="italic text-[#c6973f]">Appointment.</span>
          </h1>
          <p className="mt-5 max-w-xl font-serif text-lg italic text-white/60">
            Five steps. Sixty seconds. Chair waiting.
          </p>
        </Container>
      </section>

      <section className="bg-[#0a0a0a] pb-28">
        <Container>
          <Suspense
            fallback={
              <div className="h-96 animate-pulse border border-white/5 bg-[#111]" />
            }
          >
            <BookingFlow />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
