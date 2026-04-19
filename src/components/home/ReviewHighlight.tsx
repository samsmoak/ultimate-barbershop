import { ReviewCycler } from "@/components/shared/ReviewCycler";
import { Container } from "@/components/shared/Container";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { SITE } from "@/lib/site";
import { REVIEWS } from "@/lib/reviews";

export function ReviewHighlight() {
  const featured = REVIEWS.slice(0, 3);
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-28 sm:py-36">
      <Container>
        <div className="flex justify-center">
          <SectionLabel>IN THE WORDS OF OUR CLIENTS</SectionLabel>
        </div>
        <div className="mt-16">
          <ReviewCycler reviews={featured} />
        </div>
        <p className="mt-14 text-center font-label text-[11px] uppercase tracking-[0.32em] text-white/50">
          {SITE.rating.count} Reviews · {SITE.rating.stars.toFixed(1)} Stars on Google
        </p>
      </Container>
    </section>
  );
}
