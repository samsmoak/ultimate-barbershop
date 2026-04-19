import type { Metadata } from "next";
import { CutsHero } from "@/components/cuts/CutsHero";
import { CutsGrid } from "@/components/cuts/CutsGrid";
import { CutsBottomMarquee } from "@/components/cuts/CutsBottomMarquee";

export const metadata: Metadata = {
  title: "The Cuts",
  description:
    "The editorial portfolio of The Ultimate Barber. Precision fades, clean lineups, beard architecture, and kids cuts — photographed in-shop, cut in-house.",
};

export default function CutsPage() {
  return (
    <>
      <CutsHero />
      <CutsGrid />
      <CutsBottomMarquee />
    </>
  );
}
