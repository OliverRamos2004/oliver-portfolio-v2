"use client";

import { useState, type ReactNode } from "react";
import styles from "./home.module.css";

/**
 * The site's hover description (2026-11-15): hovering (or keyboard-focusing)
 * the wrapped content fades a short note in at the bottom right, like the
 * home caption and the About interests. Mouse and keyboard only; touch has
 * no hover, so the note simply doesn't appear there.
 */
export function HoverNote({ note, children }: { note: string; children: ReactNode }) {
  const [on, setOn] = useState(false);

  return (
    <div
      className={styles.hoverNote}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOn(true)}
      onPointerLeave={() => setOn(false)}
      onFocus={(e) => (e.target as HTMLElement).matches(":focus-visible") && setOn(true)}
      onBlur={() => setOn(false)}
    >
      {children}
      <p className={styles.hoverCap} data-show={on} aria-hidden="true">
        {note}
      </p>
    </div>
  );
}
