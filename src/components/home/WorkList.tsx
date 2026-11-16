"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProjectStatus } from "@/types/project";
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
 * rest. (The cursor-following preview photo was removed 2026-11-15.)
 */
export function WorkList({ rows }: { rows: readonly WorkRow[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={styles.list} data-dim={active !== null}>
      {rows.map((row) => (
        <Link
          key={row.id}
          href={row.href}
          className={styles.proj}
          data-active={active === row.id}
          data-cursor="View"
          onPointerEnter={(e) => e.pointerType === "mouse" && setActive(row.id)}
          onPointerLeave={() => setActive(null)}
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
  );
}
