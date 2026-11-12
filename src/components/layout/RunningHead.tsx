"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAustinTime } from "@/lib/useAustinTime";

type Tone = "paper" | "ink";

/** The home page's four words; each opens its sheet (HomeMenu reads the hash). */
const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#studio", label: "Studio" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

/**
 * The fixed header on /about and the case files: the name home, the four
 * words, Austin time. It takes the tone (paper/ink) of whichever section with
 * a data-running-head attribute crosses the viewport's midline. No hairline:
 * the header is a solid field of the surface color.
 */
export function RunningHead() {
  const [tone, setTone] = useState<Tone>("paper");
  const time = useAustinTime();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-running-head]");
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (!hit) return;
        setTone((hit.target as HTMLElement).dataset.tone === "ink" ? "ink" : "paper");
      },
      // A zero-height band at the midline: exactly one section intersects it.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const onInk = tone === "ink";
  const stamp = onInk
    ? "hover:bg-signal hover:text-paper focus-visible:bg-signal focus-visible:text-paper"
    : "hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${onInk ? "bg-ink text-paper" : "bg-paper text-ink"}`}>
      <div className="small-text flex h-12 items-center gap-4 px-4 md:px-10">
        <Link href="/" className={`mr-auto shrink-0 px-1 ${stamp}`}>
          Oliver Ramos
        </Link>
        <nav aria-label="Primary" className="flex shrink-0 items-center gap-1">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={`px-2 py-1 ${stamp}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <p className={`hidden w-[5.5rem] shrink-0 text-right tabular-nums lg:block ${onInk ? "text-paper-muted" : "text-ink-muted"}`}>
          {time ?? "--:--:--"}
        </p>
      </div>
    </header>
  );
}
