"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Tone } from "@/data/home";
import styles from "./home.module.css";

/** Where a sheet sits: on top, left in place under the sheet sliding over it, or off screen. */
export type SheetPos = "open" | "under" | "away";
/** Which edge an away sheet waits behind, so it enters from that side. */
export type SheetFrom = "below" | "above";

interface Step {
  label: string;
  onGo: () => void;
}

interface SheetProps {
  id: string;
  pos: SheetPos;
  from: SheetFrom;
  /** true for one frame while an away sheet jumps to its `from` edge without animating */
  staged: boolean;
  tone: Tone;
  title: string;
  prev: Step;
  next: Step;
  onClose: () => void;
  children: ReactNode;
}

/**
 * A full-screen sheet. Modal by construction: the parent makes the home page
 * `inert` while one is open, and any sheet that isn't on top is `inert`
 * (away sheets are also `visibility: hidden`). Esc and the arrow keys are
 * handled by the parent so they can defer to the case-file drawer.
 */
export function Sheet({ id, pos, from, staged, tone, title, prev, next, onClose, children }: SheetProps) {
  const ref = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = pos === "open";

  useEffect(() => {
    if (!open) return;
    ref.current?.scrollTo(0, 0);
    closeRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <section
      ref={ref}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={styles.sheet}
      data-tone={tone}
      data-surface={tone}
      data-open={open}
      data-pos={pos}
      data-from={from}
      data-staged={staged}
      inert={!open}
    >
      <button
        ref={closeRef}
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label={`Close ${title}`}
        data-cursor="Close"
      >
        <span aria-hidden="true">×</span>
      </button>
      <div className={styles.stack}>{children}</div>
      <nav className={styles.journey} aria-label="Sections">
        <button type="button" onClick={prev.onGo} data-cursor="Back">
          <span aria-hidden="true">← </span>
          {prev.label}
        </button>
        <button type="button" onClick={next.onGo} data-cursor="Next">
          {next.label}
          <span aria-hidden="true"> →</span>
        </button>
      </nav>
    </section>
  );
}
