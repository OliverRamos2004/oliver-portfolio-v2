"use client";

import { useState } from "react";
import { INTERESTS } from "@/data/about";
import styles from "./home.module.css";

/**
 * The About sheet's interests in giant type. Hovering one dims the rest and
 * shows its caption bottom right, like the home page's caption. On touch the
 * captions sit under their words instead. Layout (stacked or in rows) comes
 * from the `.about` box's data-interests.
 */
export function AboutInterests() {
  const [active, setActive] = useState<string | null>(null);
  // Keep the last caption while it fades out.
  const [shown, setShown] = useState<string>("");

  return (
    <section className={styles.interests} aria-label="Interests">
      <p className={styles.aboutLabel}>Interests</p>
      <ul className={styles.interestList} data-dim={active !== null}>
        {INTERESTS.map((item) => (
          <li
            key={item.id}
            className={styles.interest}
            data-active={active === item.id}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              setActive(item.id);
              setShown(item.caption);
            }}
            onPointerLeave={() => setActive(null)}
          >
            <span className={`display ${styles.interestName}`}>{item.label}</span>
            <span className={styles.interestNote}>{item.caption}</span>
          </li>
        ))}
      </ul>
      <p className={styles.interestCap} data-show={active !== null} aria-hidden="true">
        {shown}
      </p>
    </section>
  );
}
