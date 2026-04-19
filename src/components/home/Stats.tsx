import { StatCounter } from "@/components/shared/StatCounter";
import { Container } from "@/components/shared/Container";

export function Stats() {
  return (
    <section className="relative bg-[#0a0a0a] py-20">
      <Container>
        <div className="grid grid-cols-2 gap-y-12 sm:gap-y-16 lg:grid-cols-4">
          <div className="relative px-4 sm:px-6 lg:pr-8">
            <StatCounter value={136} suffix="+" label="Happy Clients" />
            <GoldDivider hide="first" />
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <StatCounter
              value={4.4}
              decimals={1}
              suffix="★"
              label="Google Rating"
            />
            <GoldDivider />
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <StatCounter value={6} label="Days A Week" />
            <GoldDivider />
          </div>
          <div className="relative px-4 sm:px-6 lg:pl-8">
            <StatCounter value={10} suffix="+" label="Expert Barbers" />
            <GoldDivider />
          </div>
        </div>
      </Container>
    </section>
  );
}

function GoldDivider({ hide }: { hide?: "first" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute left-0 top-1/2 hidden h-20 w-[1px] -translate-y-1/2 bg-gradient-to-b from-transparent via-[#c6973f]/60 to-transparent lg:block ${
        hide === "first" ? "lg:hidden" : ""
      }`}
    />
  );
}
