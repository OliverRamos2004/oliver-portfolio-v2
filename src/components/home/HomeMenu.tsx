"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { HOME, type MenuItem, type SheetKey } from "@/data/home";
import { RollName } from "./RollName";
import { Sheet, type SheetFrom } from "./Sheet";
import { Cursor } from "./Cursor";
import styles from "./home.module.css";

/** Matches `.sheet`'s transform transition in home.module.css. */
const SLIDE_MS = 700;

interface HomeMenuProps {
  items: readonly MenuItem[];
  /** sheet bodies, rendered on the server and passed through */
  sheets: Record<SheetKey, ReactNode>;
}

/**
 * The home page: OLIVER RAMOS is the menu. Hovering (or keyboard-focusing) a
 * word rolls the name to that word's answer and turns the page its color;
 * clicking opens its sheet. Touch skips the preview: a tap opens the sheet.
 */
export function HomeMenu({ items, sheets }: HomeMenuProps) {
  const [hovered, setHovered] = useState<SheetKey | null>(null);
  const [open, setOpen] = useState<SheetKey | null>(null);
  // The journey: the sheet being covered stays in place until the new one lands.
  const [under, setUnder] = useState<SheetKey | null>(null);
  const [staged, setStaged] = useState<{ key: SheetKey; from: SheetFrom } | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const restoreFocus = useRef(false);
  const openRef = useRef<SheetKey | null>(null);
  const timers = useRef({ raf: 0, settle: 0 });

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const current = open ?? hovered;
  const active = items.find((item) => item.key === current);

  const preview = (key: SheetKey) => {
    if (open === null) setHovered(key);
  };

  const cancelJourney = useCallback(() => {
    cancelAnimationFrame(timers.current.raf);
    window.clearTimeout(timers.current.settle);
  }, []);

  const close = useCallback(() => {
    cancelJourney();
    restoreFocus.current = true;
    setOpen(null);
    setUnder(null);
    setStaged(null);
    setHovered(null);
  }, [cancelJourney]);

  /**
   * Sheet to sheet without going home. Frame 1 parks the target behind its
   * entry edge with transitions off; two frames later it slides in over the
   * current sheet, which drops away once it's covered.
   */
  const goTo = useCallback((key: SheetKey, from: SheetFrom) => {
    cancelJourney();
    const leaving = openRef.current;
    setStaged({ key, from });
    timers.current.raf = requestAnimationFrame(() => {
      timers.current.raf = requestAnimationFrame(() => {
        setUnder(leaving);
        setOpen(key);
        setStaged(null);
        timers.current.settle = window.setTimeout(() => setUnder(null), SLIDE_MS);
      });
    });
  }, [cancelJourney]);

  const step = useCallback(
    (by: 1 | -1) => {
      const at = items.findIndex((item) => item.key === openRef.current);
      if (at < 0) return;
      const to = items[(at + by + items.length) % items.length];
      goTo(to.key, by === 1 ? "below" : "above");
    },
    [items, goTo],
  );

  useEffect(() => cancelJourney, [cancelJourney]);

  // Focus goes back to the word that opened the sheet, once the home page is no longer inert.
  useEffect(() => {
    if (open !== null || !restoreFocus.current) return;
    restoreFocus.current = false;
    opener.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      // The case-file drawer opens over a sheet and owns these keys while it's up.
      if (document.body.dataset.drawerOpen) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close, step]);

  const tone = active?.tone ?? "paper";

  return (
    <div className={styles.root} data-tone={tone} data-surface={tone}>
      <main className={styles.home} inert={open !== null}>
        <h1 className={`display ${styles.stage}`} aria-label="Oliver Ramos">
          <RollName lines={active?.swap ?? HOME.swap} />
        </h1>

        <nav
          className={styles.menu}
          aria-label="Main"
          onPointerLeave={(e) => e.pointerType === "mouse" && open === null && setHovered(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(null);
          }}
        >
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              className={styles.word}
              data-active={item.key === current}
              data-cursor="Open"
              aria-haspopup="dialog"
              aria-controls={`sheet-${item.key}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && preview(item.key)}
              onFocus={(e) => e.currentTarget.matches(":focus-visible") && preview(item.key)}
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOpen(item.key);
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <p className={styles.cap}>{active?.caption ?? HOME.caption}</p>
      </main>

      {items.map((item, i) => (
        <Sheet
          key={item.key}
          id={`sheet-${item.key}`}
          pos={open === item.key ? "open" : under === item.key ? "under" : "away"}
          from={staged?.key === item.key ? staged.from : "below"}
          staged={staged?.key === item.key}
          tone={item.tone}
          title={item.label}
          prev={{ label: items[(i - 1 + items.length) % items.length].label, onGo: () => step(-1) }}
          next={{ label: items[(i + 1) % items.length].label, onGo: () => step(1) }}
          onClose={close}
        >
          {sheets[item.key]}
        </Sheet>
      ))}

      <Cursor />
    </div>
  );
}
