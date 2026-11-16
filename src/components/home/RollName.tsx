"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import styles from "./home.module.css";

/** Matches `.fillRoll`'s transition in home.module.css. */
const OUT_MS = 260;

/** Matches the phone layout query in home.module.css: there the name stacks. */
const STACK_QUERY =
  "(max-width: 760px), (max-width: 1100px) and (orientation: portrait) and (hover: none)";
/** Space between stacked lines, as a fraction of the box height. */
const STACK_GAP = 0.02;

/**
 * The name (at rest) or the hovered word's title, stretched so its ink fills the screen inside
 * `.fillBox`'s padding: x scales each line's width to the box, y scales its real
 * ink height (round letters' overshoot included) to its slot, after lifting the
 * line box so the top of the ink sits on the slot edge. On phones the name
 * stacks (OLIVER / RAMOS), one line per word, so the letters keep a readable
 * shape on a tall screen. Decorative: the page's <h1> carries the name for
 * screen readers.
 */
export function FillWord({
  text,
  restText,
}: {
  text: string;
  /** The resting text (the name): it cycles colors in hard wipes (2026-11-15). */
  restText?: string;
}) {
  const { ref, shown } = useRoll(text, 0);
  const stack = useMediaQuery(STACK_QUERY);
  const boxRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lines = shown ? (stack ? shown.split(" ") : [shown]) : [];
  const key = lines.join("|");
  const resting = Boolean(shown) && shown === restText;

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box || !key) return;

    const fit = () => {
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      const bs = getComputedStyle(box);
      const padX = parseFloat(bs.paddingLeft);
      const padY = parseFloat(bs.paddingTop);
      const innerW = box.clientWidth - padX * 2;
      const innerH = box.clientHeight - padY * 2;
      const els = lineRefs.current.slice(0, key.split("|").length);
      const gap = els.length > 1 ? innerH * STACK_GAP : 0;
      const slot = (innerH - gap * (els.length - 1)) / els.length;

      els.forEach((el, i) => {
        if (!el) return;
        const ws = getComputedStyle(el);
        ctx.font = `${ws.fontWeight} ${ws.fontSize} ${ws.fontFamily}`;
        const m = ctx.measureText((el.textContent ?? "").toUpperCase());
        const ink = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
        // offsetWidth ignores transforms, so no reset is needed before measuring.
        const sx = innerW / el.offsetWidth;
        const sy = slot / ink;
        const lift = m.fontBoundingBoxAscent - m.actualBoundingBoxAscent;
        const y = padY + i * (slot + gap);
        el.style.transform = `translate(${padX}px, ${y}px) scale(${sx}, ${sy}) translateY(${-lift}px)`;
      });
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
  }, [key]);

  return (
    <div
      ref={boxRef}
      className={styles.fillBox}
      data-rest={resting}
      aria-hidden="true"
    >
      {shown && (
        <span className={styles.fillMask}>
          {/* Mounts hidden above its mask; the roll brings it down. */}
          <span ref={ref} className={styles.fillRoll} style={{ transform: "translateY(-105%)" }}>
            {lines.map((line, i) => (
              <span
                key={i}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className={styles.fillWord}
              >
                {line}
              </span>
            ))}
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
