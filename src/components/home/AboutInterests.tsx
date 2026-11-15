"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { INTERESTS } from "@/data/about";
import { FINE_POINTER, useMediaQuery } from "@/lib/useMediaQuery";
import styles from "./home.module.css";

/**
 * The About sheet's interests in giant type, same behavior as the Work list:
 * hovering one dims the rest and, with a mouse, its photo opens from a slit
 * and trails the cursor. On touch, photos sit under their words instead.
 * Layout (stacked or in rows) comes from the `.about` box's data-interests.
 */
export function AboutInterests() {
  const fine = useMediaQuery(FINE_POINTER);
  const [active, setActive] = useState<string | null>(null);
  const [armed, setArmed] = useState(false);
  const peekRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const eased = useRef({ x: 0, y: 0 });
  const photo = INTERESTS.find((i) => i.id === active)?.photo;
  const peeking = fine && Boolean(photo);

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
    <section className={styles.interests} aria-label="Interests">
      <p className={styles.aboutLabel}>Off the clock</p>
      <ul
        className={styles.interestList}
        data-dim={active !== null}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          if (!pointer.current) eased.current = { x: e.clientX, y: e.clientY };
          pointer.current = { x: e.clientX, y: e.clientY };
        }}
      >
        {INTERESTS.map((item) => (
          <li
            key={item.id}
            className={styles.interest}
            data-active={active === item.id}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              setActive(item.id);
              setArmed(fine);
            }}
            onPointerLeave={() => setActive(null)}
          >
            <span className={`display ${styles.interestName}`}>{item.label}</span>
            {item.photo && (
              <Image
                className={styles.interestImg}
                src={item.photo.src}
                alt={item.photo.alt}
                width={item.photo.width}
                height={item.photo.height}
                sizes="100vw"
              />
            )}
          </li>
        ))}
      </ul>
      <div ref={peekRef} className={`${styles.peek} ${styles.peekTall}`} data-show={peeking} aria-hidden="true">
        {armed &&
          INTERESTS.map(
            (item) =>
              item.photo && (
                <Image
                  key={item.id}
                  src={item.photo.src}
                  alt=""
                  fill
                  sizes="320px"
                  className={styles.peekImg}
                  data-on={active === item.id}
                />
              ),
          )}
      </div>
    </section>
  );
}
