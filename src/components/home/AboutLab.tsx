"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";

/**
 * TEMPORARY (2026-11-15): a comparison panel for the About sheet, shown only
 * with `?lab` in the URL, so Oliver can pick options on the live page.
 * It sets data attributes on the sheet's `.about` box; the CSS reads them.
 * Remove once the options are chosen.
 */
const GROUPS = [
  { key: "tone", label: "Photo", options: [["dramatic", "Dramatic"], ["mono", "Mono"]] },
  { key: "name", label: "Name", options: [["behind", "Behind photo"], ["over", "Over photo"]] },
] as const;

type Choice = Record<(typeof GROUPS)[number]["key"], string>;

export function AboutLab() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [choice, setChoice] = useState<Choice>({ tone: "dramatic", name: "behind" });

  useEffect(() => {
    // Read after mount: the page is static, so the query string isn't known on the server.
    const id = requestAnimationFrame(() => setOn(new URLSearchParams(window.location.search).has("lab")));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const box = ref.current?.parentElement;
    if (!box) return;
    box.dataset.tone = choice.tone;
    box.dataset.name = choice.name;
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
