"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./home.module.css";

/** Matches `.fillRoll`'s transition in home.module.css. */
const OUT_MS = 260;

/**
 * The name (at rest) or the hovered word's title, stretched so its ink fills the screen inside
 * `.fill`'s padding: x scales the word's width to the box, y scales its real
 * ink height (round letters' overshoot included) to the box, after lifting the
 * line box so the top of the ink sits on the padding edge. Decorative: the
 * page's <h1> carries the name for screen readers.
 */
export function FillWord({ text }: { text: string }) {
  const { ref, shown } = useRoll(text, 0);
  const boxRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const word = wordRef.current;
    if (!box || !word || !shown) return;

    const fit = () => {
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      const ws = getComputedStyle(word);
      const bs = getComputedStyle(box);
      ctx.font = `${ws.fontWeight} ${ws.fontSize} ${ws.fontFamily}`;
      const m = ctx.measureText(shown.toUpperCase());
      const ink = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
      const padX = parseFloat(bs.paddingLeft);
      const padY = parseFloat(bs.paddingTop);
      // offsetWidth ignores transforms, so no reset is needed before measuring.
      const sx = (box.clientWidth - padX * 2) / word.offsetWidth;
      const sy = (box.clientHeight - padY * 2) / ink;
      const lift = m.fontBoundingBoxAscent - m.actualBoundingBoxAscent;
      word.style.transform = `translate(${padX}px, ${padY}px) scale(${sx}, ${sy}) translateY(${-lift}px)`;
    };

    fit();
    let live = true;
    // Re-fit once the face has loaded, in case the fallback was measured.
    document.fonts.ready.then(() => live && fit());
    window.addEventListener("resize", fit);
    return () => {
      live = false;
      window.removeEventListener("resize", fit);
    };
  }, [shown]);

  return (
    <div ref={boxRef} className={styles.fill} aria-hidden="true">
      {shown && (
        <span ref={wordRef} className={styles.fillWord}>
          <span className={styles.fillMask}>
            {/* Mounts hidden above its mask; the roll brings it down. */}
            <span ref={ref} className={styles.fillRoll} style={{ transform: "translateY(-105%)" }}>
              {shown}
            </span>
          </span>
        </span>
      )}
    </div>
  );
}

/**
 * The roll engine: returns the text to render and a ref for the moving span.
 * The new text swaps in while the span is hidden below its mask.
 */
function useRoll(text: string, delay: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const shownRef = useRef(text);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    const el = ref.current;
    // Nothing to do if this text is already in place (and not mid-roll).
    if (text === shownRef.current && !el?.style.transform) return;

    const timers: number[] = [];
    let raf = 0;
    const swapText = () => {
      shownRef.current = text;
      setShown(text);
    };
    // Roll the new text in from above once it has rendered. The span may be
    // new (FillWord mounts it with the first word), so look it up again.
    const rollIn = () => {
      const target = ref.current;
      if (!target) return;
      target.style.transition = "none";
      target.style.transform = "translateY(-105%)";
      // Two frames so the jump commits before the transition back in.
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => {
          target.style.transition = "";
          target.style.transform = "";
        });
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timers.push(
        window.setTimeout(() => {
          swapText();
          // A newly mounted FillWord span starts parked above; show it in place.
          raf = requestAnimationFrame(() => {
            if (ref.current) ref.current.style.transform = "";
          });
        }, 0),
      );
    } else if (!el || el.style.transform === "translateY(-105%)") {
      // Nothing on screen yet (no span, or a fresh one parked above its mask):
      // swap now, then roll in after the render. This is also the intro.
      timers.push(
        window.setTimeout(() => {
          swapText();
          raf = requestAnimationFrame(rollIn);
        }, delay),
      );
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
              raf = requestAnimationFrame(rollIn);
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

  return { ref, shown };
}
