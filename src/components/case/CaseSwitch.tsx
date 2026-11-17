"use client";

import { useSyncExternalStore } from "react";
import type { ProjectEntry } from "@/types/project";
import type { PrdEntry } from "@/types/prd";
import type { CaseStep } from "@/lib/caseNav";
import { ProjectDrawer } from "@/components/drawer/ProjectDrawer";
import { RunningHead } from "@/components/layout/RunningHead";
import { CaseFile, type CaseLayout } from "./CaseFile";

const KEY = "caseLab";
const LAYOUTS: CaseLayout[] = ["a", "b", "c"];

interface CaseSwitchProps {
  project: ProjectEntry;
  prd?: PrdEntry;
  name: string;
  prev: CaseStep;
  next: CaseStep;
  isOverlay: boolean;
}

const listeners = new Set<() => void>();
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function read(): CaseLayout | null {
  try {
    const q = new URLSearchParams(window.location.search).get("lab");
    if (q !== null) {
      const pick = (LAYOUTS as string[]).includes(q) ? (q as CaseLayout) : "a";
      sessionStorage.setItem(KEY, pick);
      return pick;
    }
    const saved = sessionStorage.getItem(KEY);
    return saved && (LAYOUTS as string[]).includes(saved) ? (saved as CaseLayout) : null;
  } catch {
    return null;
  }
}

/**
 * TEMPORARY (2026-11-16): `?lab` on a case file turns on the restyle lab for
 * this tab; a panel switches A / B / C, Off returns to the current case file.
 * Visitors without the flag see the current design. Remove once one is picked.
 */
export function CaseSwitch(props: CaseSwitchProps) {
  const layout = useSyncExternalStore(subscribe, read, () => null);

  function pick(next: CaseLayout | null) {
    try {
      if (next) sessionStorage.setItem(KEY, next);
      else sessionStorage.removeItem(KEY);
      // Drop ?lab so the stored pick wins on the next read.
      const url = new URL(window.location.href);
      url.searchParams.delete("lab");
      window.history.replaceState(window.history.state, "", url);
    } catch {}
    listeners.forEach((l) => l());
  }

  if (!layout) {
    return props.isOverlay ? (
      <ProjectDrawer project={props.project} isOverlay />
    ) : (
      <>
        <RunningHead />
        <ProjectDrawer project={props.project} isOverlay={false} />
      </>
    );
  }

  return (
    <>
      <CaseFile key={props.project.id} layout={layout} {...props} />
      <div
        role="group"
        aria-label="Case file lab"
        style={{
          position: "fixed",
          left: 12,
          bottom: 12,
          zIndex: 60,
          display: "flex",
          gap: 2,
          background: "#151412",
          padding: 4,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {[...LAYOUTS, null].map((l) => (
          <button
            key={l ?? "off"}
            type="button"
            onClick={() => pick(l)}
            style={{
              padding: "6px 10px",
              cursor: "pointer",
              background: layout === l ? "#d0657a" : "transparent",
              color: "#f2eee6",
            }}
          >
            {l ? l.toUpperCase() : "Off"}
          </button>
        ))}
      </div>
    </>
  );
}
