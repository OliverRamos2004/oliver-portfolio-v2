"use client";

import { useState } from "react";
import { INTERESTS } from "@/data/about";
import { FINE_POINTER, useMediaQuery } from "@/lib/useMediaQuery";
import styles from "./home.module.css";

/**
 * The About sheet's interests on one horizontal line. Hovering (or focusing)
 * a word dims the others and shows its description bottom right, like the
 * home caption. Touch has no hover, so a tap toggles it instead.
 */
export function AboutInterests() {
  const fine = useMediaQuery(FINE_POINTER);
  const [active, setActive] = useState<string | null>(null);
  // Keep the last description while it fades out.
  const [shown, setShown] = useState("");
  const show = (id: string | null) => {
    setActive(id);
    const item = INTERESTS.find((i) => i.id === id);
    if (item) setShown(item.caption);
  };

  return (
    <section className={styles.interests} aria-label="Interests">
      <p className={styles.aboutLabel}>Interests</p>
      <ul className={styles.interestList} data-dim={active !== null}>
        {INTERESTS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`display ${styles.interestName}`}
              data-active={active === item.id}
              aria-describedby={active === item.id ? "interest-cap" : undefined}
              onPointerEnter={(e) => e.pointerType === "mouse" && show(item.id)}
              onPointerLeave={(e) => e.pointerType === "mouse" && show(null)}
              onFocus={(e) => e.currentTarget.matches(":focus-visible") && show(item.id)}
              onBlur={() => show(null)}
              onClick={() => !fine && show(active === item.id ? null : item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <p id="interest-cap" className={styles.interestCap} data-show={active !== null} role="status">
        {shown}
      </p>
    </section>
  );
}
