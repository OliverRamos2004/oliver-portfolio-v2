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
export type FillVariant = "none" | "hollow" | "construct" | "react" | "print";

interface Guides {
  lines: { top: number; base: number; xs: number[] }[];
}

export function FillWord({
  text,
  variant = "none",
  restText,
}: {
  text: string;
  /** Lab (?lab): a treatment for the resting name only. */
  variant?: FillVariant;
  /** The resting text the variant applies to. */
  restText?: string;
}) {
  const { ref, shown } = useRoll(text, 0);
  const stack = useMediaQuery(STACK_QUERY);
  const boxRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [guides, setGuides] = useState<Guides | null>(null);
  const lines = shown ? (stack ? shown.split(" ") : [shown]) : [];
  const v: FillVariant = shown && shown === restText ? variant : "none";
  const key = `${lines.join("|")}#${v}`;

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box || !lines.length) return;

    const fit = () => {
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      const bs = getComputedStyle(box);
      const padX = parseFloat(bs.paddingLeft);
      const padY = parseFloat(bs.paddingTop);
      const innerW = box.clientWidth - padX * 2;
      const innerH = box.clientHeight - padY * 2;
      const els = lineRefs.current.slice(0, lines.length);
      const gap = els.length > 1 ? innerH * STACK_GAP : 0;
      const slot = (innerH - gap * (els.length - 1)) / els.length;
      const g: Guides = { lines: [] };

      els.forEach((el, i) => {
        if (!el) return;
        const ws = getComputedStyle(el);
        ctx.font = `${ws.fontWeight} ${ws.fontSize} ${ws.fontFamily}`;
        ctx.letterSpacing = ws.letterSpacing;
        const word = (el.textContent ?? "").toUpperCase();
        const m = ctx.measureText(word);
        const ink = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
        // offsetWidth ignores transforms, so no reset is needed before measuring.
        const sx = innerW / el.offsetWidth;
        const sy = slot / ink;
        const lift = m.fontBoundingBoxAscent - m.actualBoundingBoxAscent;
        const y = padY + i * (slot + gap);
        el.style.transform = `translate(${padX}px, ${y}px) scale(${sx}, ${sy}) translateY(${-lift}px)`;
        // The print texture counter-scales its dots with these.
        el.style.setProperty("--sx", String(sx));
        el.style.setProperty("--sy", String(sy));
        if (v === "construct") {
          const xs: number[] = [];
          for (let k = 0; k <= word.length; k++) {
            if (word[k - 1] === " ") continue;
            xs.push(padX + ctx.measureText(word.slice(0, k)).width * sx);
          }
          g.lines.push({ top: y, base: y + slot, xs });
        }
      });
      setGuides(v === "construct" ? g : null);
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
    // lines and v are derived from key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // React: letters near the mouse squash down in a wave.
  useEffect(() => {
    const box = boxRef.current;
    if (v !== "react" || !box) return;
    let raf = 0;
    let at: { x: number; y: number } | null = null;
    const letters = () => Array.from(box.querySelectorAll<HTMLElement>("[data-letter]"));
    const apply = () => {
      raf = 0;
      for (const l of letters()) {
        if (!at) {
          l.style.transform = "";
          continue;
        }
        const r = l.getBoundingClientRect();
        const d = Math.hypot(at.x - (r.left + r.width / 2), (at.y - (r.top + r.height / 2)) * 0.35);
        const f = Math.exp(-((d / 220) ** 2));
        l.style.transform = `scaleY(${1 - 0.32 * f})`;
      }
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      at = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => {
      at = null;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
      for (const l of letters()) l.style.transform = "";
    };
  }, [v, key]);

  return (
    <div ref={boxRef} className={styles.fillBox} data-variant={v} aria-hidden="true">
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
                {v === "react"
                  ? Array.from(line).map((ch, k) => (
                      <span key={k} data-letter className={styles.fillLetter}>
                        {ch === " " ? "\u00a0" : ch}
                      </span>
                    ))
                  : line}
              </span>
            ))}
            {guides && (
              <svg className={styles.fillGuides} width="100%" height="100%">
                {guides.lines.map((ln, i) => (
                  <g key={i}>
                    <line x1="0" x2="100%" y1={ln.top} y2={ln.top} />
                    <line x1="0" x2="100%" y1={ln.base} y2={ln.base} />
                    {ln.xs.map((x, k) => (
                      <line key={k} x1={x} x2={x} y1={ln.top} y2={ln.base} />
                    ))}
                    <text x="6" y={ln.top - 6}>cap {Math.round(ln.base - ln.top)}px</text>
                    <text x="6" y={ln.base + 14}>baseline</text>
                    {ln.xs.slice(0, -1).map((x, k) => (
                      <text key={k} x={x + 4} y={ln.base - 6}>
                        {String(k + 1).padStart(2, "0")}
                      </text>
                    ))}
                  </g>
                ))}
              </svg>
            )}
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
