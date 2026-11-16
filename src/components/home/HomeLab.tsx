"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";

/**
 * TEMPORARY (2026-11-15): compare resting-screen ideas on the live home page.
 * Shown only with `?lab` in the URL. Remove once one is chosen.
 */
export type HomeLabState = { face: boolean; idle: boolean; reveal: boolean };

const OPTIONS: { key: keyof HomeLabState; label: string }[] = [
  { key: "face", label: "Face as the full stop" },
  { key: "idle", label: "Idle roll" },
  { key: "reveal", label: "Cursor reveal" },
];

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
      {OPTIONS.map((o) => (
        <div key={o.key}>
          <span>{o.label}</span>
          <button type="button" data-on={!value[o.key]} onClick={() => onChange({ ...value, [o.key]: false })}>
            Off
          </button>
          <button type="button" data-on={value[o.key]} onClick={() => onChange({ ...value, [o.key]: true })}>
            On
          </button>
        </div>
      ))}
    </div>
  );
}
