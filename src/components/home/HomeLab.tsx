"use client";

import { useEffect, useState } from "react";
import type { FillVariant } from "./RollName";
import styles from "./home.module.css";

/**
 * TEMPORARY (2026-11-15): compare treatments for the resting name on the live
 * home page. Shown only with `?lab` in the URL. Remove once one is chosen.
 */
const OPTIONS: [FillVariant, string][] = [
  ["none", "Now"],
  ["hollow", "Hollow skeleton"],
  ["construct", "Exposed construction"],
  ["react", "Letters that react"],
  ["print", "Raw print"],
  ["fadeInk", "Gradient: ink fade"],
  ["tonalInk", "Gradient: tonal to ink"],
  ["tonalWine", "Gradient: tonal to wine"],
];

export function HomeLab({ value, onChange }: { value: FillVariant; onChange: (v: FillVariant) => void }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    // After mount: the page is static, so the query string isn't known on the server.
    const id = requestAnimationFrame(() => setOn(new URLSearchParams(window.location.search).has("lab")));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!on) return null;
  return (
    <div className={`${styles.lab} ${styles.homeLab}`}>
      {OPTIONS.map(([key, label]) => (
        <button key={key} type="button" data-on={value === key} onClick={() => onChange(key)}>
          {label}
        </button>
      ))}
    </div>
  );
}
