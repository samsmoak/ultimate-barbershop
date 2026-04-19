"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type Field = "name" | "phone" | "email" | "message";

export function ContactForm() {
  const [state, setState] = useState<Record<Field, string>>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (key: Field, value: string) =>
    setState((s) => ({ ...s, [key]: value }));

  const onSend = async () => {
    setSending(true);
    // Simulated send; downstream integration can post to /api/contact
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setSubmitted(true);
  };

  const valid =
    state.name.trim().length > 1 &&
    state.message.trim().length > 3 &&
    /\S+@\S+\.\S+/.test(state.email);

  return (
    <div className="relative border border-white/10 bg-[#111] p-6 sm:p-10">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="font-label text-[11px] uppercase tracking-[0.32em] text-[#c6973f]">
              SEND A MESSAGE
            </div>
            <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
              Tell us what you&apos;re thinking.
            </h2>
            <p className="mt-3 font-serif text-lg italic text-white/60">
              We&apos;ll reply within the same day, usually sooner.
            </p>

            <div className="mt-10 space-y-6">
              <Floating
                label="Name"
                value={state.name}
                onChange={(v) => update("name", v)}
              />
              <Floating
                label="Phone"
                value={state.phone}
                onChange={(v) => update("phone", v)}
                type="tel"
              />
              <Floating
                label="Email"
                value={state.email}
                onChange={(v) => update("email", v)}
                type="email"
              />
              <FloatingArea
                label="Message"
                value={state.message}
                onChange={(v) => update("message", v)}
              />

              <button
                type="button"
                onClick={onSend}
                disabled={!valid || sending}
                data-cursor="button"
                className={cn(
                  "inline-flex items-center gap-3 px-7 py-3.5 font-label text-[12px] uppercase tracking-[0.28em] transition-colors",
                  valid && !sending
                    ? "bg-[#c6973f] text-[#0a0a0a] hover:bg-[#e8c97a]"
                    : "cursor-not-allowed bg-white/5 text-white/30"
                )}
              >
                {sending ? "Sending…" : "Send Message →"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-[420px] flex-col items-center justify-center py-12 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c6973f] bg-[#c6973f]/10">
              <Check size={26} className="text-[#c6973f]" />
            </div>
            <h3 className="mt-8 font-display text-3xl text-white">
              Got it. We&apos;ll be in touch.
            </h3>
            <p className="mt-3 max-w-sm font-serif text-lg italic text-white/60">
              Thanks for reaching out. Meanwhile — the chair is open.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Floating({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block h-14 w-full border border-white/10 bg-[#0e0e0e] px-3 pt-2 font-grotesk text-sm text-white transition-colors focus:border-[#c6973f] focus:shadow-[0_0_30px_rgba(198,151,63,0.2)]"
      />
    </label>
  );
}

function FloatingArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
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
      <textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block min-h-[140px] w-full resize-none border border-white/10 bg-[#0e0e0e] px-3 pt-5 font-grotesk text-sm text-white transition-colors focus:border-[#c6973f] focus:shadow-[0_0_30px_rgba(198,151,63,0.2)]"
      />
    </label>
  );
}
