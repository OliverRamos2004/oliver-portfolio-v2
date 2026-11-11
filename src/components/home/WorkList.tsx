"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectStatus } from "@/types/project";
import { FINE_POINTER, useMediaQuery } from "@/lib/useMediaQuery";
import styles from "./home.module.css";

export interface WorkRow {
  id: string;
  href: string;
  name: string;
  kind: string;
  year: number;
  status: ProjectStatus;
  image: string;
}

/**
 * The Work sheet: projects in giant type. Hovering (or focusing) one dims the
 * rest; with a mouse, a preview opens from a slit and trails the cursor.
 * Previews only load after the first hover, so touch visitors never fetch them.
 */
export function WorkList({ rows }: { rows: readonly WorkRow[] }) {
  const fine = useMediaQuery(FINE_POINTER);
  const [active, setActive] = useState<string | null>(null);
  const [peeking, setPeeking] = useState(false);
  const [armed, setArmed] = useState(false);
  const peekRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const eased = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const peek = peekRef.current;
    if (!peeking || !peek) return;
    let raf = 0;
    const loop = () => {
      const p = pointer.current;
      if (p) {
        const e = eased.current;
        e.x += (p.x - e.x) * 0.22;
        e.y += (p.y - e.y) * 0.22;
        const w = peek.offsetWidth;
        const h = peek.offsetHeight;
        const x = Math.min(e.x + 32, window.innerWidth - w - 16);
        const y = Math.max(16, Math.min(e.y - h / 2, window.innerHeight - h - 16));
        peek.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [peeking]);

  return (
    <>
      <div
        className={styles.list}
        data-dim={active !== null}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          if (!pointer.current) eased.current = { x: e.clientX, y: e.clientY };
          pointer.current = { x: e.clientX, y: e.clientY };
        }}
      >
        {rows.map((row) => (
          <Link
            key={row.id}
            href={row.href}
            className={styles.proj}
            data-active={active === row.id}
            data-cursor="View"
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              setActive(row.id);
              setPeeking(fine);
              setArmed(fine);
            }}
            onPointerLeave={() => {
              setActive(null);
              setPeeking(false);
            }}
            onFocus={() => setActive(row.id)}
            onBlur={() => setActive(null)}
          >
            <span className={`display ${styles.projName}`}>{row.name}</span>
            <span className={styles.projMeta}>
              {row.kind}, {row.status === "in-progress" ? "building" : row.year}
            </span>
          </Link>
        ))}
      </div>
      <div ref={peekRef} className={styles.peek} data-show={peeking} aria-hidden="true">
        {armed &&
          rows.map((row) => (
            <Image
              key={row.id}
              src={row.image}
              alt=""
              fill
              sizes="(max-width: 1350px) 34vw, 460px"
              className={styles.peekImg}
              data-on={active === row.id}
            />
          ))}
      </div>
    </>
  );
}
