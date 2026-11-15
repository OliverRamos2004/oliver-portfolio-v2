"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";

/**
 * TEMPORARY (2026-11-15): compare About options on the live page. Shown only
 * with `?lab` in the URL; sets data attributes on the sheet's `.about` box,
 * which the CSS reads. Remove once the options are chosen.
 */
const GROUPS = [
  { key: "interests", label: "Interests", options: [["stack", "Stacked"], ["row", "In rows"]] },
  { key: "icons", label: "Icons", options: [["line", "Line"], ["solid", "Solid"], ["footer", "Big footer"]] },
] as const;

type Key = (typeof GROUPS)[number]["key"];

export function AboutLab() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [choice, setChoice] = useState<Record<Key, string>>({ interests: "stack", icons: "line" });

  useEffect(() => {
    // After mount: the page is static, so the query string isn't known on the server.
    const id = requestAnimationFrame(() => setOn(new URLSearchParams(window.location.search).has("lab")));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const box = ref.current?.parentElement;
    if (!box) return;
    box.dataset.interests = choice.interests;
    box.dataset.icons = choice.icons;
  }, [choice, on]);

  if (!on) return null;
  return (
    <div ref={ref} className={styles.lab}>
      {GROUPS.map((g) => (
        <div key={g.key}>
          <span>{g.label}</span>
          {g.options.map(([value, label]) => (
            <button
              key={value}
              type="button"
              data-on={choice[g.key] === value}
              onClick={() => setChoice((c) => ({ ...c, [g.key]: value }))}
            >
              {label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
