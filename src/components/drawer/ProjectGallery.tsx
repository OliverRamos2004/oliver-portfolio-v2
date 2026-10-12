"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import type { ProjectMedia } from "@/types/project";

/** stage keeps the desktop-shot ratio so switching to a phone shot never shifts the drawer's layout */
const STAGE_RATIO = 1600 / 1083;
const EASE_CRISP = [0.76, 0, 0.24, 1] as const;

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";

export function ProjectGallery({ media, title, onInk }: { media: ProjectMedia[]; title: string; onInk: boolean }) {
  const stage = onInk ? "bg-paper/5" : "bg-paper-sunk";
  const muted = onInk ? "text-paper-muted" : "text-ink-muted";
  const hover = onInk ? "hover:text-signal" : "hover:bg-ink hover:text-paper";
  const [active, setActive] = useState(0);
  const current = media[active];
  const count = media.length;
  const reduceMotion = useReducedMotion();

  function step(delta: number) {
    setActive((i) => (i + delta + count) % count);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  }

  return (
    <div role="region" aria-roledescription="gallery" aria-label={`${title} screenshots`} onKeyDown={onKeyDown} className="max-w-3xl">
      <div className={`relative ${stage}`} style={{ aspectRatio: STAGE_RATIO }}>
        <motion.div
          key={current.src}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: EASE_CRISP }}
          className="absolute inset-[5%]"
        >
          {current.type === "image" ? (
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-contain"
            />
          ) : (
            <video src={current.src} className="h-full w-full object-contain" muted loop playsInline autoPlay />
          )}
        </motion.div>
      </div>

      <div
        className={`mt-3 flex items-center justify-between gap-4 ${label} ${muted}`}>
        <span aria-live="polite" className="truncate">
          {current.caption ?? current.alt}
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <button onClick={() => step(-1)} aria-label="Previous screenshot" className={`px-1 ${hover}`}>
            <span aria-hidden="true">←</span>
          </button>
          <span className={`tabular-nums ${onInk ? "text-paper" : "text-ink"}`}>
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <button onClick={() => step(1)} aria-label="Next screenshot" className={`px-1 ${hover}`}>
            <span aria-hidden="true">→</span>
          </button>
        </span>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {media.map((m, i) => (
          <button
            key={m.src}
            onClick={() => setActive(i)}
            aria-label={`Show ${m.caption ?? m.alt}`}
            aria-current={i === active}
            className={clsx(
              "relative h-16 shrink-0 outline-offset-0 transition-opacity duration-200 focus-visible:opacity-100 focus-visible:outline-offset-[-2px]",
              stage,
              m.device === "phone" ? "w-10" : "w-24",
              i === active ? "opacity-100 outline outline-1 outline-signal" : "opacity-45 hover:opacity-100",
            )}
          >
            {m.type === "image" && <Image src={m.src} alt="" fill sizes="96px" className="object-contain p-1" />}
          </button>
        ))}
      </div>
    </div>
  );
}
