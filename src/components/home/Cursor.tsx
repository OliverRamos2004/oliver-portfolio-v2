"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FINE_POINTER, useMediaQuery } from "@/lib/useMediaQuery";
import styles from "./home.module.css";

/**
 * The custom cursor: a 12px square that grows into a 56px block over links
 * and buttons, with a label tag read from the target's `data-cursor`
 * (OPEN / VIEW / COPY / ESC / ↗). Mouse and trackpad only; touch keeps the
 * native behavior. While mounted, `html.custom-cursor` hides the system cursor.
 */
export function Cursor() {
  const enabled = useMediaQuery(FINE_POINTER);
  const dotRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const tag = tagRef.current;
    if (!enabled || !dot || !tag) return;

    const html = document.documentElement;
    html.classList.add("custom-cursor");

    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let seen = false;
    let raf = 0;
    let target: HTMLElement | null = null;

    // Only write attributes when the value changes; this runs every frame.
    const set = (el: HTMLElement, key: string, value: string) => {
      if (el.dataset[key] !== value) el.dataset[key] = value;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      if (!seen) {
        seen = true;
        cx = mx;
        cy = my;
      }
    };
    const onOver = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      target = el?.closest<HTMLElement>("a, button") ?? null;
      const surface = el?.closest<HTMLElement>("[data-surface]")?.dataset.surface ?? "paper";
      set(dot, "surface", surface);
      set(tag, "surface", surface);
    };
    const onLeave = () => {
      seen = false;
    };

    const loop = () => {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      // A target can go inert under the pointer (its sheet closed) without a new pointerover.
      const live = target !== null && target.isConnected && !target.closest("[inert]");
      const label = live ? (target?.dataset.cursor ?? "") : "";

      set(dot, "hidden", String(!seen));
      set(dot, "big", String(live));
      if (tag.textContent !== label) tag.textContent = label;
      set(tag, "show", String(seen && label !== ""));

      const half = dot.offsetWidth / 2;
      dot.style.transform = `translate3d(${cx - half}px, ${cy - half}px, 0)`;
      tag.style.transform = `translate3d(${mx + 20}px, ${my + 20}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    html.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      html.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      html.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  // Portaled to <body>: the home root is position: fixed (its own stacking
  // context), so inside it the cursor would sit under the case-file drawer.
  return createPortal(
    <>
      <div ref={dotRef} className={styles.cursor} data-hidden="true" aria-hidden="true" />
      <div ref={tagRef} className={styles.tag} aria-hidden="true" />
    </>,
    document.body,
  );
}
