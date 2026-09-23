"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

/** Edit to taste — shown in the wayfinding bar as an editorial flourish, not a real map pin. */
const COORDINATES = "30.2672° N / 97.7431° W";

type NavLink = { type: "link"; label: string; target: string };
type NavCategory = { type: "category"; label: string; items: { label: string; target: string }[] };
type NavItem = NavLink | NavCategory;

const NAV_ITEMS: NavItem[] = [
  { type: "link", label: "Home", target: "#top" },
  {
    type: "category",
    label: "Work",
    items: [
      { label: "Index", target: "#index" },
      { label: "Product", target: "#pm" },
      { label: "Resume", target: "#resume" },
    ],
  },
  {
    type: "category",
    label: "Studio",
    items: [
      { label: "Skillset", target: "#skills" },
      { label: "Gallery", target: "#gallery" },
    ],
  },
  { type: "link", label: "Contact", target: "#contact" },
];

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

interface WayfindingProps {
  /** "dark" for use on a charcoal surface (the standalone /work/[slug] fallback page) */
  variant?: "light" | "dark";
}

export function Wayfinding({ variant = "light" }: WayfindingProps) {
  const time = useLocalTime();
  const lenis = useLenis();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!menuOpen) return;

    document.body.dataset.drawerOpen = "true";
    lenis?.stop();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      delete document.body.dataset.drawerOpen;
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, lenis]);

  // Also collapses any open drawer category, so it doesn't reopen already-expanded next time.
  function closeMenu() {
    setMenuOpen(false);
    setOpenCategory(null);
  }

  function handleJump(e: React.MouseEvent<HTMLAnchorElement>, target: string) {
    closeMenu();
    if (!isHome) return; // not on the page the section lives on — let the link really navigate
    e.preventDefault();

    if (target === "#top") {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.querySelector(target);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -24 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  // "#top" has no matching element id — it's a scroll-to-top sentinel handled
  // above, and off-home should just link to the plain root instead of "/#top".
  function linkHref(target: string) {
    if (isHome) return target;
    return target === "#top" ? "/" : `/${target}`;
  }

  const textClass = variant === "dark" ? "text-white/70" : "text-charcoal/70";
  // Accent-as-running-text only reads on the dark surface (see Button.tsx / PORTFOLIO_SPEC.md
  // for why pastel-on-cream fails contrast) — the light variant gets an accent underline instead.
  const linkHoverClass =
    variant === "dark"
      ? "hover:text-accent"
      : "hover:text-charcoal hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4";
  const panelClass =
    variant === "dark" ? "border-hairline-on-dark bg-charcoal" : "border-hairline-on-light bg-cream";

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 font-mono text-[11px] uppercase tracking-widest md:px-8 ${textClass}`}
        style={{ letterSpacing: "var(--tracking-widest)" }}
      >
        <span className="hidden justify-self-start sm:inline">{COORDINATES}</span>

        <nav className="col-start-2 hidden items-center justify-self-center gap-8 md:flex">
          {NAV_ITEMS.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.target}
                href={linkHref(item.target)}
                onClick={(e) => handleJump(e, item.target)}
                className={`transition-colors duration-200 ${linkHoverClass}`}
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  className={`flex items-center gap-1 uppercase transition-colors duration-200 ${linkHoverClass}`}
                >
                  {item.label}
                  <ChevronDown
                    size={11}
                    strokeWidth={1.5}
                    className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  />
                </button>

                <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className={`flex flex-col gap-3 whitespace-nowrap border px-4 py-3 ${panelClass}`}>
                    {item.items.map((sub) => (
                      <Link
                        key={sub.target}
                        href={linkHref(sub.target)}
                        onClick={(e) => handleJump(e, sub.target)}
                        className={`transition-colors duration-200 ${linkHoverClass}`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ),
          )}
          <Link href="/about" className={`transition-colors duration-200 ${linkHoverClass}`}>
            About
          </Link>
        </nav>

        <div className="col-start-3 flex items-center justify-self-end">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className={`flex h-8 w-8 items-center justify-center md:hidden ${textClass}`}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          <span className="shrink-0 pl-4" suppressHydrationWarning>
            {time ?? "--:--:--"}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-charcoal px-6 py-6 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex items-center justify-between">
              <span
                className="font-mono text-[11px] uppercase text-white/40"
                style={{ letterSpacing: "var(--tracking-widest)" }}
              >
                {COORDINATES}
              </span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center text-white/60 transition-colors duration-200 hover:text-white"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-6">
              {NAV_ITEMS.map((item) =>
                item.type === "link" ? (
                  <Link
                    key={item.target}
                    href={linkHref(item.target)}
                    onClick={(e) => handleJump(e, item.target)}
                    className="font-display text-4xl font-black uppercase leading-none text-white transition-colors duration-200 hover:text-accent"
                    style={{ letterSpacing: "var(--tracking-tightest)" }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => setOpenCategory(openCategory === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between font-display text-4xl font-black uppercase leading-none text-white transition-colors duration-200 hover:text-accent"
                      style={{ letterSpacing: "var(--tracking-tightest)" }}
                    >
                      {item.label}
                      <ChevronDown
                        size={24}
                        strokeWidth={1.5}
                        className={`transition-transform duration-200 ${
                          openCategory === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openCategory === item.label && (
                      <div className="mt-4 flex flex-col gap-4 pl-1">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.target}
                            href={linkHref(sub.target)}
                            onClick={(e) => handleJump(e, sub.target)}
                            className="font-mono text-sm uppercase text-white/70 transition-colors duration-200 hover:text-accent"
                            style={{ letterSpacing: "var(--tracking-widest)" }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              )}
              <Link
                href="/about"
                onClick={closeMenu}
                className="font-display text-4xl font-black uppercase leading-none text-white transition-colors duration-200 hover:text-accent"
                style={{ letterSpacing: "var(--tracking-tightest)" }}
              >
                About
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
