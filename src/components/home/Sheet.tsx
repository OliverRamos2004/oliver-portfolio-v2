"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Tone } from "@/data/home";
import styles from "./home.module.css";

interface SheetProps {
  id: string;
  open: boolean;
  tone: Tone;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * A full-screen sheet that slides up over the home page. Modal by
 * construction: the parent makes the home page `inert` while one is open,
 * and a closed sheet is `inert` + `visibility: hidden`. Esc is handled by
 * the parent so it can defer to the case-file drawer when that's on top.
 */
export function Sheet({ id, open, tone, title, onClose, children }: SheetProps) {
  const ref = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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
    </section>
  );
}
