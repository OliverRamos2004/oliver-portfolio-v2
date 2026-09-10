"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

/** Edit to taste — shown in the wayfinding bar as an editorial flourish, not a real map pin. */
const COORDINATES = "30.2672° N / 97.7431° W";

const JUMP_LINKS = [
  { label: "Index", target: "#index" },
  { label: "Skills", target: "#skills" },
  { label: "Product", target: "#pm" },
  { label: "Explorations", target: "#explorations" },
  { label: "Gallery", target: "#gallery" },
  { label: "Contact", target: "#contact" },
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

  useEffect(() => {
    if (!menuOpen) return;

    document.body.dataset.drawerOpen = "true";
    lenis?.stop();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      delete document.body.dataset.drawerOpen;
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, lenis]);

  function handleJump(e: React.MouseEvent<HTMLAnchorElement>, target: string) {
    setMenuOpen(false);
    if (!isHome) return; // not on the page the section lives on — let the link really navigate to `/${target}`
    e.preventDefault();
    const el = document.querySelector(target);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -24 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  const textClass = variant === "dark" ? "text-white/70" : "text-charcoal/70";
  // Accent-as-running-text only reads on the dark surface (see Button.tsx / PORTFOLIO_SPEC.md
  // for why pastel-on-cream fails contrast) — the light variant gets an accent underline instead.
  const linkHoverClass =
    variant === "dark"
      ? "hover:text-accent"
      : "hover:text-charcoal hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4";

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-3 font-mono text-[11px] uppercase tracking-widest md:px-8 ${textClass}`}
        style={{ letterSpacing: "var(--tracking-widest)" }}
      >
        <span className="hidden sm:inline">{COORDINATES}</span>

        <nav className="hidden gap-8 md:flex">
          {JUMP_LINKS.map((link) => (
            <Link
              key={link.target}
              href={isHome ? link.target : `/${link.target}`}
              onClick={(e) => handleJump(e, link.target)}
              className={`transition-colors duration-200 ${linkHoverClass}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/about" className={`transition-colors duration-200 ${linkHoverClass}`}>
            About
          </Link>
        </nav>

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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-charcoal px-6 py-6 md:hidden"
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
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center text-white/60 transition-colors duration-200 hover:text-white"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-6">
              {JUMP_LINKS.map((link) => (
                <Link
                  key={link.target}
                  href={isHome ? link.target : `/${link.target}`}
                  onClick={(e) => handleJump(e, link.target)}
                  className="font-display text-4xl font-black uppercase leading-none text-white transition-colors duration-200 hover:text-accent"
                  style={{ letterSpacing: "var(--tracking-tightest)" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
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
