import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { Story } from "@/components/about/Story";
import { TeamGrid } from "@/components/about/TeamGrid";
import { Values } from "@/components/about/Values";
import { ShopExperience } from "@/components/about/ShopExperience";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ultimate Styles Barbershop — our story, the team, the values we cut by, and the room we built on Mt Vernon Ave in Alexandria, VA.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <TeamGrid />
      <Values />
      <ShopExperience />
      <CTABanner
        heading="The Chair Is Open."
        subtext="Come in, call, or book online."
        cta={{ label: "Book Now", href: "/book" }}
      />
    </>
  );
}
