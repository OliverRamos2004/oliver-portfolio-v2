"use client";

import { useState } from "react";
import { INTERESTS } from "@/data/about";
import styles from "./home.module.css";

/**
 * The About sheet's interests in giant type, one row each with its caption
 * on the right (the Work list's pattern, critique 2026-11-15). Hovering a row
 * dims the others and brings its caption to full ink. On phones the caption
 * sits under the word.
 */
export function AboutInterests() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className={styles.interests} aria-label="Interests">
      <p className={styles.aboutLabel}>Interests</p>
      <ul className={styles.interestList} data-dim={active !== null}>
        {INTERESTS.map((item) => (
          <li
            key={item.id}
            className={styles.interest}
            data-active={active === item.id}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(item.id)}
            onPointerLeave={() => setActive(null)}
          >
            <span className={`display ${styles.interestName}`}>{item.label}</span>
            <span className={styles.interestNote}>{item.caption}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
