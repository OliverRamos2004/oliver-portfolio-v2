"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { HOME, type MenuItem, type SheetKey } from "@/data/home";
import { useAustinTime } from "@/lib/useAustinTime";
import { RollName } from "./RollName";
import { Sheet } from "./Sheet";
import { Cursor } from "./Cursor";
import styles from "./home.module.css";

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
  const opener = useRef<HTMLButtonElement | null>(null);
  const restoreFocus = useRef(false);
  const time = useAustinTime();

  const current = open ?? hovered;
  const active = items.find((item) => item.key === current);

  const preview = (key: SheetKey) => {
    if (open === null) setHovered(key);
  };

  const close = useCallback(() => {
    restoreFocus.current = true;
    setOpen(null);
    setHovered(null);
  }, []);

  // Focus goes back to the word that opened the sheet, once the home page is no longer inert.
  useEffect(() => {
    if (open !== null || !restoreFocus.current) return;
    restoreFocus.current = false;
    opener.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      // The case-file drawer opens over a sheet and owns Esc while it's up.
      if (e.key !== "Escape" || document.body.dataset.drawerOpen) return;
      close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const tone = active?.tone ?? "paper";

  return (
    <div className={styles.root} data-tone={tone} data-surface={tone}>
      <main className={styles.home} inert={open !== null}>
        <header className={`${styles.top} ${styles.label}`}>
          <span>Oliver Ramos · Austin, TX</span>
          <span aria-hidden="true">{time ? `${time} CT` : "--:--:-- CT"}</span>
        </header>

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
              data-cursor="OPEN"
              aria-haspopup="dialog"
              aria-controls={`sheet-${item.key}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && preview(item.key)}
              onFocus={(e) => e.currentTarget.matches(":focus-visible") && preview(item.key)}
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOpen(item.key);
              }}
            >
              <span className={styles.n} aria-hidden="true">
                {item.n}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <p className={styles.cap}>{active?.caption ?? HOME.caption}</p>
      </main>

      {items.map((item) => (
        <Sheet
          key={item.key}
          id={`sheet-${item.key}`}
          open={open === item.key}
          tone={item.tone}
          n={item.n}
          title={item.label}
          onClose={close}
        >
          {sheets[item.key]}
        </Sheet>
      ))}

      <Cursor />
    </div>
  );
}
