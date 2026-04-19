"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="font-label text-[15px] uppercase leading-none tracking-[0.22em] text-white"
            aria-label="Ultimate Styles Barbershop — Home"
          >
            ULTIMATE STYLES BARBERSHOP
            <span className="text-[#c6973f]">.</span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {SITE.nav.slice(0, 6).map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative font-grotesk text-[12px] uppercase tracking-[0.24em] transition-colors",
                    active ? "text-white" : "text-white/70 hover:text-white"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-[#c6973f]"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Link
              href="/book"
              data-cursor="button"
              className="group relative inline-flex h-10 items-center gap-2 bg-[#c6973f] px-5 font-label text-[12px] uppercase tracking-[0.22em] text-[#0a0a0a] transition-all hover:bg-[#e8c97a]"
            >
              Book Now
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center text-white lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-12 pt-28 sm:px-10">
              <ul className="space-y-6">
                {SITE.nav.map((item, i) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.08 * i,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative flex items-center"
                    >
                      {active && (
                        <span className="mr-4 h-6 w-[2px] bg-[#c6973f]" />
                      )}
                      <Link
                        href={item.href}
                        className={cn(
                          "font-display text-4xl italic leading-none sm:text-5xl",
                          active ? "text-white" : "text-white/60"
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-auto border-t border-white/10 pt-6 text-sm text-[#777]">
                <div className="font-label text-[11px] tracking-[0.22em] text-[#c6973f]">
                  COME IN, CALL, OR BOOK
                </div>
                <a href={SITE.phoneHref} className="mt-2 block font-display text-2xl text-white">
                  {SITE.phone}
                </a>
                <div className="mt-2">
                  {SITE.address.line1}, {SITE.address.line2}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
