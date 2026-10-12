import type { ReactNode } from "react";
import type { Part as PartName } from "@/types/project";

/**
 * One half of the monograph. Part I is ink on paper, Part II paper on ink
 * (SPEC §1). Clips horizontally so bleeding headlines never add page scroll.
 */
export function Part({ part, children }: { part: PartName; children: ReactNode }) {
  const onInk = part === "craft";
  return (
    <div
      id={`part-${part}`}
      className={`overflow-x-clip ${onInk ? "bg-ink text-paper" : "bg-paper text-ink"}`}
    >
      {children}
    </div>
  );
}
