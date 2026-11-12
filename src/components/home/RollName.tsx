"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";

/** Matches `.roll`'s transition in home.module.css. */
const OUT_MS = 260;
const STAGGER_MS = 70;

/**
 * The signature motion (ROLL): the line slides down out of its mask, the text
 * changes while hidden, and the new text comes in from above. Decorative: the
 * <h1> it sits in carries the accessible name.
 */
export function RollName({ lines }: { lines: readonly [string, string] }) {
  return (
    <>
      <RollLine text={lines[0]} delay={0} />
      <RollLine text={lines[1]} delay={STAGGER_MS} />
    </>
  );
}

function RollLine({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shownRef = useRef(text);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    const el = ref.current;
    // Nothing to do if this text is already in place (and not mid-roll).
    if (!el || (text === shownRef.current && !el.style.transform)) return;

    const timers: number[] = [];
    let raf = 0;
    const swapText = () => {
      shownRef.current = text;
      setShown(text);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timers.push(window.setTimeout(swapText, 0));
    } else {
      timers.push(
        window.setTimeout(() => {
          // An interrupted roll can leave the line parked above the mask with
          // transitions off; jump it out of sight instead of sweeping through view.
          if (el.style.transition !== "none") el.style.transition = "";
          el.style.transform = "translateY(105%)";
          timers.push(
            window.setTimeout(() => {
              swapText();
              el.style.transition = "none";
              el.style.transform = "translateY(-105%)";
              // Two frames so the jump commits before the transition back in.
              raf = requestAnimationFrame(() => {
                raf = requestAnimationFrame(() => {
                  el.style.transition = "";
                  el.style.transform = "";
                });
              });
            }, OUT_MS),
          );
        }, delay),
      );
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      cancelAnimationFrame(raf);
    };
  }, [text, delay]);

  return (
    <span className={styles.line} aria-hidden="true">
      <span ref={ref} className={styles.roll}>
        {shown}
      </span>
    </span>
  );
}
