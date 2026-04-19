import { Hero } from "@/components/home/Hero";
import { HomeMarquee } from "@/components/home/HomeMarquee";
import { Stats } from "@/components/home/Stats";
import { Experience } from "@/components/home/Experience";
import { FreshOutTheChair } from "@/components/home/FreshOutTheChair";
import { BarbersTeaser } from "@/components/home/BarbersTeaser";
import { ReviewHighlight } from "@/components/home/ReviewHighlight";
import { CTABanner } from "@/components/shared/CTABanner";
import { CUTS } from "@/lib/cuts";

export default function HomePage() {
  // Feature 8 large cuts in the 3D carousel
  const featured = CUTS.slice(0, 8);
  return (
    <>
      <Hero />
      <HomeMarquee />
      <Stats />
      <Experience />
      <FreshOutTheChair cuts={featured} />
      <BarbersTeaser />
      <ReviewHighlight />
      <CTABanner
        heading="Ready for Your Best Cut Yet?"
        subtext="Book online in seconds. Walk-ins also welcome."
        cta={{ label: "Book Now", href: "/book" }}
      />
    </>
  );
}
