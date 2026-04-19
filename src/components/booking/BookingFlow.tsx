"use client";

import { useMemo, useReducer, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { TEAM } from "@/lib/team";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

type State = {
  step: number;
  serviceId: string | null;
  barberId: string | null;
  date: string | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
};

type Action =
  | { type: "next" }
  | { type: "prev" }
  | { type: "goto"; step: number }
  | { type: "service"; id: string }
  | { type: "barber"; id: string }
  | { type: "date"; date: string }
  | { type: "time"; time: string }
  | { type: "field"; key: "name" | "phone" | "email"; value: string };

const STEPS = [
  "Service",
  "Barber",
  "Date & Time",
  "Your Details",
  "Confirm",
];

const initial: State = {
  step: 0,
  serviceId: null,
  barberId: null,
  date: null,
  time: null,
  name: "",
  phone: "",
  email: "",
};

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "next":
      return { ...s, step: Math.min(s.step + 1, STEPS.length - 1) };
    case "prev":
      return { ...s, step: Math.max(s.step - 1, 0) };
    case "goto":
      return { ...s, step: a.step };
    case "service":
      return { ...s, serviceId: a.id };
    case "barber":
      return { ...s, barberId: a.id };
    case "date":
      return { ...s, date: a.date, time: null };
    case "time":
      return { ...s, time: a.time };
    case "field":
      return { ...s, [a.key]: a.value };
  }
}

export function BookingFlow() {
  const params = useSearchParams();
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    const pre = params.get("service");
    if (pre && SERVICES.some((s) => s.id === pre)) {
      dispatch({ type: "service", id: pre });
    }
  }, [params]);

  const canAdvance = useMemo(() => {
    switch (state.step) {
      case 0:
        return !!state.serviceId;
      case 1:
        return !!state.barberId;
      case 2:
        return !!state.date && !!state.time;
      case 3:
        return (
          state.name.trim().length > 1 &&
          state.phone.trim().length >= 7 &&
          /\S+@\S+\.\S+/.test(state.email)
        );
      default:
        return false;
    }
  }, [state]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state.step > 0) dispatch({ type: "prev" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.step]);

  const service = SERVICES.find((s) => s.id === state.serviceId);
  const barber = TEAM.find((b) => b.id === state.barberId);

  const progressPct = ((state.step + (state.step === STEPS.length - 1 ? 1 : 0)) /
    STEPS.length) *
    100;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
      <div className="relative overflow-hidden border border-white/5 bg-[#111] p-6 sm:p-10">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div className="font-label text-[11px] uppercase tracking-[0.32em] text-[#c6973f]">
              Step {state.step + 1} · {STEPS[state.step]}
            </div>
            <div className="font-label text-[11px] uppercase tracking-[0.32em] text-white/40">
              {state.step + 1} / {STEPS.length}
            </div>
          </div>
          <div className="mt-4 h-[2px] w-full overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-[#c6973f]"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <div className="min-h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {state.step === 0 && (
                <StepService
                  selected={state.serviceId}
                  onSelect={(id) => dispatch({ type: "service", id })}
                />
              )}
              {state.step === 1 && (
                <StepBarber
                  selected={state.barberId}
                  onSelect={(id) => dispatch({ type: "barber", id })}
                />
              )}
              {state.step === 2 && (
                <StepDateTime
                  date={state.date}
                  time={state.time}
                  onDate={(d) => dispatch({ type: "date", date: d })}
                  onTime={(t) => dispatch({ type: "time", time: t })}
                />
              )}
              {state.step === 3 && (
                <StepDetails
                  name={state.name}
                  phone={state.phone}
                  email={state.email}
                  onField={(key, value) =>
                    dispatch({ type: "field", key, value })
                  }
                />
              )}
              {state.step === 4 && (
                <StepConfirm service={service} barber={barber} state={state} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={() => dispatch({ type: "prev" })}
            disabled={state.step === 0}
            className={cn(
              "inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.28em] transition-opacity",
              state.step === 0
                ? "cursor-not-allowed text-white/20"
                : "text-white/70 hover:text-white"
            )}
          >
            <ChevronLeft size={14} /> Back
          </button>
          {state.step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => canAdvance && dispatch({ type: "next" })}
              disabled={!canAdvance}
              data-cursor="button"
              className={cn(
                "inline-flex items-center gap-3 px-6 py-3 font-label text-[11px] uppercase tracking-[0.28em] transition-colors",
                canAdvance
                  ? "bg-[#c6973f] text-[#0a0a0a] hover:bg-[#e8c97a]"
                  : "cursor-not-allowed bg-white/5 text-white/30"
              )}
            >
              {state.step === STEPS.length - 2 ? "Confirm Booking" : "Continue"}
              <ChevronRight size={14} />
            </button>
          ) : (
            <a
              href={SITE.phoneHref}
              data-cursor="button"
              className="inline-flex items-center gap-3 bg-[#c6973f] px-6 py-3 font-label text-[11px] uppercase tracking-[0.28em] text-[#0a0a0a] hover:bg-[#e8c97a]"
            >
              <Phone size={14} /> Call to Confirm
            </a>
          )}
        </div>
      </div>

      {/* Side panel */}
      <aside className="space-y-8">
        <div className="border border-[#c6973f]/40 bg-[#111] p-7">
          <div className="font-label text-[11px] uppercase tracking-[0.32em] text-[#c6973f]">
            Prefer the phone?
          </div>
          <a
            href={SITE.phoneHref}
            className="mt-3 block font-display text-3xl text-white"
          >
            {SITE.phone}
          </a>
          <p className="mt-3 text-sm text-white/60">
            Walk-ins welcome during all business hours.
          </p>
        </div>

        <div className="border border-white/10 bg-[#0e0e0e] p-7">
          <div className="font-label text-[11px] uppercase tracking-[0.32em] text-[#c6973f]">
            What to Expect
          </div>
          <ol className="mt-5 space-y-5 text-sm text-white/75">
            <li className="flex gap-4">
              <span className="font-label text-2xl text-[#c6973f]">01</span>
              <div>
                <div className="font-grotesk uppercase tracking-[0.14em] text-white">
                  Arrive
                </div>
                <p className="mt-1">
                  Come in five minutes early. Coffee's on. Relax.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-label text-2xl text-[#c6973f]">02</span>
              <div>
                <div className="font-grotesk uppercase tracking-[0.14em] text-white">
                  Consult
                </div>
                <p className="mt-1">
                  Your barber takes two minutes to map the cut before it
                  starts.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-label text-2xl text-[#c6973f]">03</span>
              <div>
                <div className="font-grotesk uppercase tracking-[0.14em] text-white">
                  Transform
                </div>
                <p className="mt-1">
                  Sit back. Leave sharper than you came in.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="border border-white/10 bg-[#0e0e0e] p-7">
          <div className="font-label text-[11px] uppercase tracking-[0.32em] text-[#c6973f]">
            Hours
          </div>
          <ul className="mt-4 space-y-1.5 text-sm text-white/70">
            <li className="flex justify-between">
              <span>Mon – Fri</span>
              <span className="tabular-nums text-white">8:00a – 7:00p</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span className="tabular-nums text-white">8:00a – 6:00p</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-white/50">Closed</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

// ----- Steps -----

function StepService({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl text-white sm:text-4xl">
        Choose your service.
      </h2>
      <p className="mt-3 font-serif text-lg italic text-white/60">
        Pick one. You can add more at checkout in the chair.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SERVICES.map((s) => {
          const on = selected === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className={cn(
                "relative border p-5 text-left transition-colors",
                on
                  ? "border-[#c6973f] bg-[#c6973f]/10"
                  : "border-white/10 bg-[#0e0e0e] hover:border-white/30"
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-grotesk text-base uppercase tracking-[0.14em] text-white">
                  {s.name}
                </div>
                <div className="font-label text-xl text-[#c6973f]">
                  {s.price}
                </div>
              </div>
              <p className="mt-1 text-xs text-white/55">{s.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepBarber({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl text-white sm:text-4xl">
        Choose your barber.
      </h2>
      <p className="mt-3 font-serif text-lg italic text-white/60">
        Familiar with a barber? Pick them. Otherwise &mdash; first available is
        all of us.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button
          type="button"
          onClick={() => onSelect("any")}
          className={cn(
            "relative flex h-[220px] flex-col items-start justify-end overflow-hidden border p-5 text-left transition-colors",
            selected === "any"
              ? "border-[#c6973f] bg-[#c6973f]/10"
              : "border-white/10 bg-[#0e0e0e] hover:border-white/30"
          )}
        >
          <div className="font-label text-[10px] uppercase tracking-[0.28em] text-[#c6973f]">
            Fastest
          </div>
          <div className="mt-2 font-display text-2xl text-white">
            First Available
          </div>
          <p className="mt-1 text-xs text-white/60">Next open barber, any chair.</p>
        </button>
        {TEAM.map((b) => {
          const on = selected === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => onSelect(b.id)}
              className={cn(
                "group relative flex h-[220px] flex-col items-start justify-end overflow-hidden border p-5 text-left transition-colors",
                on
                  ? "border-[#c6973f]"
                  : "border-white/10 hover:border-white/30"
              )}
            >
              <Image
                src={b.image}
                alt={b.name}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 80vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/40 to-transparent" />
              <div className="relative">
                <div className="font-label text-[10px] uppercase tracking-[0.28em] text-[#c6973f]">
                  {b.years} yrs · {b.specialties[0]}
                </div>
                <div className="mt-2 font-display text-2xl text-white">
                  {b.name}
                </div>
                <p className="mt-1 text-xs text-white/70">{b.title}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDateTime({
  date,
  time,
  onDate,
  onTime,
}: {
  date: string | null;
  time: string | null;
  onDate: (d: string) => void;
  onTime: (t: string) => void;
}) {
  const days = useMemo(() => {
    const out: { label: string; iso: string; dow: number; closed: boolean }[] = [];
    const now = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const dow = d.getDay();
      out.push({
        label: d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        iso: d.toISOString().slice(0, 10),
        dow,
        closed: dow === 0,
      });
    }
    return out;
  }, []);

  const slots = useMemo(() => {
    if (!date) return [];
    const d = new Date(date + "T12:00:00");
    const dow = d.getDay();
    if (dow === 0) return [];
    const closeHour = dow === 6 ? 18 : 19; // Sat 6p, else 7p
    const openHour = 8;
    const list: string[] = [];
    for (let h = openHour; h < closeHour; h++) {
      list.push(`${h}:00`, `${h}:30`);
    }
    return list.map((t) => {
      const [hh, mm] = t.split(":").map(Number);
      const suffix = hh >= 12 ? "PM" : "AM";
      const h12 = hh % 12 || 12;
      return `${h12}:${mm.toString().padStart(2, "0")} ${suffix}`;
    });
  }, [date]);

  return (
    <div>
      <h2 className="font-display text-3xl text-white sm:text-4xl">
        Pick a date and time.
      </h2>
      <p className="mt-3 font-serif text-lg italic text-white/60">
        Next two weeks of availability. Sundays we're closed.
      </p>

      <div className="mt-8">
        <div className="font-label text-[11px] uppercase tracking-[0.28em] text-white/50">
          Date
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {days.map((d) => {
            const on = d.iso === date;
            return (
              <button
                key={d.iso}
                type="button"
                disabled={d.closed}
                onClick={() => onDate(d.iso)}
                className={cn(
                  "border px-3 py-3 text-left text-xs uppercase tracking-[0.12em] transition-colors",
                  d.closed
                    ? "cursor-not-allowed border-white/5 bg-[#0a0a0a] text-white/25"
                    : on
                    ? "border-[#c6973f] bg-[#c6973f] text-[#0a0a0a]"
                    : "border-white/10 bg-[#0e0e0e] text-white/80 hover:border-white/40"
                )}
              >
                {d.label}
                {d.closed && (
                  <span className="block text-[10px] text-white/30">
                    Closed
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {date && (
        <div className="mt-8">
          <div className="font-label text-[11px] uppercase tracking-[0.28em] text-white/50">
            Time
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {slots.map((t) => {
              const on = time === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTime(t)}
                  className={cn(
                    "border px-3 py-2 text-sm tabular-nums transition-colors",
                    on
                      ? "border-[#c6973f] bg-[#c6973f] text-[#0a0a0a]"
                      : "border-white/10 bg-[#0e0e0e] text-white/80 hover:border-white/40"
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StepDetails({
  name,
  phone,
  email,
  onField,
}: {
  name: string;
  phone: string;
  email: string;
  onField: (k: "name" | "phone" | "email", v: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl text-white sm:text-4xl">
        Your details.
      </h2>
      <p className="mt-3 font-serif text-lg italic text-white/60">
        We'll send a confirmation and a reminder the day before.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <FloatingInput
          label="Full Name"
          value={name}
          onChange={(v) => onField("name", v)}
          autoComplete="name"
        />
        <FloatingInput
          label="Phone"
          value={phone}
          onChange={(v) => onField("phone", v)}
          autoComplete="tel"
          type="tel"
        />
        <div className="sm:col-span-2">
          <FloatingInput
            label="Email"
            value={email}
            onChange={(v) => onField("email", v)}
            autoComplete="email"
            type="email"
          />
        </div>
      </div>
    </div>
  );
}

function StepConfirm({
  state,
  service,
  barber,
}: {
  state: State;
  service: ReturnType<typeof SERVICES.find>;
  barber: ReturnType<typeof TEAM.find>;
}) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#c6973f] bg-[#c6973f]/10"
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <Check size={34} className="text-[#c6973f]" />
        </motion.div>
      </motion.div>

      <h2 className="mt-8 font-display text-3xl text-white sm:text-4xl">
        Appointment Locked In.
      </h2>
      <p className="mt-3 font-serif text-lg italic text-white/60">
        We'll text you to confirm. Walk-ins welcome too.
      </p>

      <div className="mt-10 w-full max-w-md border border-white/10 bg-[#0e0e0e] p-6 text-left">
        <Row label="Name" value={state.name || "—"} />
        <Row label="Service" value={service?.name || "—"} />
        <Row
          label="Barber"
          value={
            barber ? `${barber.name} · ${barber.title}` : "First Available"
          }
        />
        <Row
          label="When"
          value={
            state.date
              ? `${new Date(state.date + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })} · ${state.time ?? "—"}`
              : "—"
          }
        />
        <Row label="Phone" value={state.phone || "—"} />
        <Row label="Email" value={state.email || "—"} last />
      </div>

      <Link
        href="/cuts"
        className="mt-10 link-gold font-label text-[11px] uppercase tracking-[0.3em] text-[#c6973f]"
      >
        Browse The Cuts →
      </Link>
    </div>
  );
}

function Row({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-6 py-3",
        !last && "border-b border-white/5"
      )}
    >
      <span className="font-label text-[10px] uppercase tracking-[0.28em] text-white/50">
        {label}
      </span>
      <span className="truncate font-grotesk text-sm text-white">{value}</span>
    </div>
  );
}

function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  const filled = value.length > 0;
  return (
    <label className="group relative block">
      <span
        className={cn(
          "pointer-events-none absolute left-3 font-label text-[11px] uppercase tracking-[0.24em] transition-all",
          filled
            ? "-top-2 text-[10px] text-[#c6973f]"
            : "top-4 text-white/50 group-focus-within:-top-2 group-focus-within:text-[10px] group-focus-within:text-[#c6973f]"
        )}
      >
        {label}
      </span>
      <input
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block h-12 w-full border border-white/10 bg-[#0e0e0e] px-3 pt-2 font-grotesk text-sm text-white focus:border-[#c6973f]"
      />
    </label>
  );
}
