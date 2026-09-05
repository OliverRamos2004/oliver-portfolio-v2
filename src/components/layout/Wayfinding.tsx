"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

/** Edit to taste — shown in the wayfinding bar as an editorial flourish, not a real map pin. */
const COORDINATES = "30.2672° N / 97.7431° W";

const JUMP_LINKS = [
  { label: "Index", target: "#index" },
  { label: "Skills", target: "#skills" },
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

  function handleJump(e: React.MouseEvent<HTMLAnchorElement>, target: string) {
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
    <div
      className={`fixed inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-3 font-mono text-[11px] uppercase tracking-widest md:px-8 ${textClass}`}
      style={{ letterSpacing: "var(--tracking-widest)" }}
    >
      <span className="hidden sm:inline">{COORDINATES}</span>
      <nav className="flex gap-5 md:gap-8">
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
      <span suppressHydrationWarning>{time ?? "--:--:--"}</span>
    </div>
  );
}
