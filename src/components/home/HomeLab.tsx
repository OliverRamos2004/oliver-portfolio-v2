"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";

/**
 * TEMPORARY (2026-11-15): tune the resting name's hard color bands on the
 * live home page. Shown only with `?lab` in the URL. Remove once chosen.
 */
const GROUPS = [
  {
    key: "palette",
    label: "Colors",
    options: [
      ["wineInk", "Wine + ink"],
      ["ink", "Ink"],
      ["wine", "Wine"],
      ["inkRose", "Ink + rose"],
      ["wineRose", "Wine + rose"],
      ["reverse", "Reverse (ink letters)"],
    ],
  },
  { key: "width", label: "Bands", options: [["thin", "Thin"], ["medium", "Medium"], ["wide", "Wide"]] },
  { key: "duration", label: "Loop", options: [["4", "4s"], ["8", "8s"], ["12", "12s"], ["16", "16s"], ["24", "24s"]] },
] as const;

export type HomeLabState = { palette: string; width: string; duration: string };

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
      {GROUPS.map((g) => (
        <div key={g.key} className={styles.labGroup}>
          <span>{g.label}</span>
          <div className={styles.labRow}>
            {g.options.map(([v, label]) => (
              <button key={v} type="button" data-on={value[g.key] === v} onClick={() => onChange({ ...value, [g.key]: v })}>
                {label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Whether the lab is on (the bands only run in the lab until one is chosen). */
export function useLabOn() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(new URLSearchParams(window.location.search).has("lab")));
    return () => cancelAnimationFrame(id);
  }, []);
  return on;
}
