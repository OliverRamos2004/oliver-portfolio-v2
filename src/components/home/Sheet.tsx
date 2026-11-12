'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type { Tone } from '@/data/home';
import styles from './home.module.css';

/** Where a sheet sits: on top, left in place under the sheet sliding over it, or off screen. */
export type SheetPos = 'open' | 'under' | 'away';
/** Which edge an away sheet waits behind, so it enters from that side. */
export type SheetFrom = 'below' | 'above';

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

/** Back / next / close drawn as one icon set so their strokes match exactly. */
const PATHS = {
  back: "M21 12H4M11 5l-7 7 7 7",
  next: "M3 12h17M13 5l7 7-7 7",
  close: "M5 5l14 14M19 5L5 19",
} as const;

function Icon({ name }: { name: keyof typeof PATHS }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

/**
 * A full-screen sheet. Modal by construction: the parent makes the home page
 * `inert` while one is open, and any sheet that isn't on top is `inert`
 * (away sheets are also `visibility: hidden`). Esc and the arrow keys are
 * handled by the parent so they can defer to the case-file drawer.
 */
export function Sheet({
  id,
  pos,
  from,
  staged,
  tone,
  title,
  prev,
  next,
  onClose,
  children,
}: SheetProps) {
  const ref = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = pos === 'open';

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
      {/* The sheet's header: where you are on the left; back, next, close on the right. */}
      <div className={styles.bar}>
        <p className={styles.where}>{title}</p>
        <div className={styles.controls}>
          <nav className={styles.journey} aria-label="Sections">
            {/* Arrows only; the destination is in the accessible name and the cursor tag. */}
            <button
              type="button"
              onClick={prev.onGo}
              data-cursor={prev.label}
              aria-label={`Back: ${prev.label}`}
            >
              <Icon name="back" />
            </button>
            <button
              type="button"
              onClick={next.onGo}
              data-cursor={next.label}
              aria-label={`Next: ${next.label}`}
            >
              <Icon name="next" />
            </button>
          </nav>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label={`Close ${title}`}
            data-cursor="Close"
          >
            <Icon name="close" />
          </button>
        </div>
      </div>
      <div className={styles.stack}>{children}</div>
    </section>
  );
}
