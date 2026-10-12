"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/** Editorial flourish, not a map pin. */
const COORDINATES = "30.2672° N / 97.7431° W";

type Head = { label: string; short: string; tone: "paper" | "ink"; inPart: boolean };

const INITIAL: Head = { label: "COVER", short: "COVER", tone: "paper", inPart: false };

/** Austin time, to match the coordinates (not the visitor's local time). */
function useAustinTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Chicago",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/**
 * The fixed running head (SPEC §4): like the line at the top of a magazine
 * page, it names where you are ("SYSTEMS — 01 YOSI ARCHIVE") and switches
 * paper/ink at the turn. One IntersectionObserver watches every section with
 * a data-running-head attribute and picks whichever crosses the viewport's
 * midline. Decorative: the real headings carry the semantics.
 */
export function RunningHead() {
  const [head, setHead] = useState<Head>(INITIAL);
  const time = useAustinTime();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-running-head]");
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (!hit) return;
        const el = hit.target as HTMLElement;
        setHead({
          label: el.dataset.runningHead ?? INITIAL.label,
          short: el.dataset.runningHeadShort ?? el.dataset.runningHead ?? INITIAL.short,
          tone: el.dataset.tone === "ink" ? "ink" : "paper",
          inPart: el.dataset.part !== undefined,
        });
      },
      // A zero-height band at the midline: exactly one section intersects it.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const onInk = head.tone === "ink";
  const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";
  const stamp = onInk
    ? "hover:bg-signal hover:text-ink focus-visible:bg-signal focus-visible:text-ink"
    : "hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b ${
        onInk ? "border-rule-on-ink bg-ink text-paper" : "border-rule bg-paper text-ink"
      }`}
    >
      <div className="flex h-12 items-center gap-4 px-4 md:px-10">
        <Link href="/#top" className={`${label} hidden shrink-0 px-1 md:block ${stamp}`}>
          Oliver Ramos
        </Link>
        <p className={`${label} flex min-w-0 flex-1 items-center gap-2 md:justify-center`} aria-hidden="true">
          {head.inPart && <span className="inline-block h-2 w-2 shrink-0 bg-signal" />}
          <span className="truncate md:hidden">{head.short}</span>
          <span className="hidden truncate md:inline">{head.label}</span>
        </p>
        <nav aria-label="Primary" className="flex shrink-0 items-center gap-1">
          <Link href="/#contents" className={`${label} px-2 py-1 ${stamp}`}>Work</Link>
          <Link href="/about" className={`${label} px-2 py-1 ${stamp}`}>About</Link>
          <Link href="/#credits" className={`${label} px-2 py-1 ${stamp}`}>Contact</Link>
        </nav>
        <p className={`${label} hidden shrink-0 tabular-nums lg:block ${onInk ? "text-paper-muted" : "text-ink-muted"}`}>
          {COORDINATES} · {time ?? "--:--:--"}
        </p>
      </div>
    </header>
  );
}
