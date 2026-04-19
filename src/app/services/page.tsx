import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesTabs } from "@/components/services/ServicesTabs";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Haircuts, beard services, specialty work, and kids cuts. Every service at Ultimate Styles Barbershop, priced clearly.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesTabs />
      <CTABanner
        heading="Ready to Sit in the Chair?"
        subtext="Book online in seconds. Walk-ins welcome."
        cta={{ label: "Book An Appointment", href: "/book" }}
      />
    </>
  );
}
