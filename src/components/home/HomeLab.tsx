"use client";

import { useEffect, useState } from "react";
import type { FillVariant } from "./RollName";
import styles from "./home.module.css";

/**
 * TEMPORARY (2026-11-15): compare color animations for the resting name on
 * the live home page. Shown only with `?lab` in the URL. Remove once chosen.
 */
const STYLES: [FillVariant, string][] = [
  ["none", "Now"],
  ["smooth", "Smooth gradient"],
  ["hard", "Hard bands"],
  ["sweep", "Sweep"],
  ["cycle", "Color cycle"],
];
const DURATIONS = [4, 8, 16];

export type HomeLabState = { variant: FillVariant; duration: number };

export function HomeLab({ value, onChange }: { value: HomeLabState; onChange: (v: HomeLabState) => void }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    // After mount: the page is static, so the query string isn't known on the server.
    const id = requestAnimationFrame(() => setOn(new URLSearchParams(window.location.search).has("lab")));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!on) return null;
  return (
    <div className={`${styles.lab} ${styles.homeLab}`}>
      {STYLES.map(([key, label]) => (
        <button key={key} type="button" data-on={value.variant === key} onClick={() => onChange({ ...value, variant: key })}>
          {label}
        </button>
      ))}
      <div className={styles.labRow}>
        {DURATIONS.map((d) => (
          <button key={d} type="button" data-on={value.duration === d} onClick={() => onChange({ ...value, duration: d })}>
            {d}s
          </button>
        ))}
      </div>
    </div>
  );
}
