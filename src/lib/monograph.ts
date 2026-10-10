import { projects } from "@/data/projects";
import { takes } from "@/data/takes";
import type { Part, ProjectEntry, ShortTakeEntry } from "@/types/project";

/**
 * The homepage is one magazine issue in two parts (SPEC §3). Everything that
 * orders, numbers or groups projects reads from here, so the Contents, the
 * spreads and the running head can never disagree.
 */

export const PARTS: Record<Part, { numeral: string; word: string; label: string }> = {
  systems: { numeral: "I", word: "SYSTEMS", label: "PART I · SYSTEMS" },
  craft: { numeral: "II", word: "CRAFT", label: "PART II · CRAFT" },
};

export const PART_ORDER: Part[] = ["systems", "craft"];

const pad = (n: number) => String(n).padStart(2, "0");

/** "I·01" — a feature's catalogue number within its part. */
export function featureRef(project: ProjectEntry): string {
  return `${PARTS[project.part].numeral}·${pad(project.order)}`;
}

/** Text for the fixed running head, e.g. "SYSTEMS — 01 YOSI ARCHIVE". */
export function runningHead(part: Part, order?: number, title?: string): string {
  const word = PARTS[part].word;
  return order && title ? `${word} — ${pad(order)} ${title}` : word;
}

export function anchorId(id: string): string {
  return `feature-${id}`;
}

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export function featuresFor(part: Part): ProjectEntry[] {
  return projects.filter((p) => p.part === part && p.tier === "feature").sort(byOrder);
}

/** Project short takes (linked to their case file) followed by non-project takes. */
export function shortTakesFor(part: Part): ShortTakeEntry[] {
  const fromProjects: ShortTakeEntry[] = projects
    .filter((p) => p.part === part && p.tier === "short")
    .sort(byOrder)
    .map((p) => {
      const shot = p.media.find((m) => m.type === "image");
      return {
        id: p.id,
        part: p.part,
        order: p.order,
        title: p.title,
        year: p.year,
        insight: p.insight ?? p.summary,
        image: shot ? { src: shot.src, alt: shot.alt } : { src: "", alt: "" },
        href: `/work/${p.id}`,
      };
    });
  const extra = takes.filter((t) => t.part === part).sort(byOrder);
  return [...fromProjects, ...extra];
}

export type ContentsRow = { ref: string; title: string; page: number; href: string };
export type ContentsPart = {
  part: Part;
  label: string;
  features: ContentsRow[];
  shortTakes: { names: string[]; page: number; href: string };
};

const pageLabel = (n: number) => `p.${pad(n)}`;
export { pageLabel };

/**
 * Magazine "page numbers" for the Contents. Cover is p.01, Contents p.02;
 * each part opener takes one page, each feature a two-page spread, short
 * takes one page, and the photo interlude after Part I one page.
 */
export function contents(): ContentsPart[] {
  let page = 3;
  return PART_ORDER.map((part) => {
    page += 1; // the part opener
    const features = featuresFor(part).map((p) => {
      const row = { ref: pad(p.order), title: p.title, page, href: `#${anchorId(p.id)}` };
      page += 2;
      return row;
    });
    const shortTakes = {
      names: shortTakesFor(part).map((t) => t.title),
      page,
      href: `#short-takes-${part}`,
    };
    page += 1;
    if (part === "systems") page += 1; // photo interlude before the turn
    return { part, label: PARTS[part].label, features, shortTakes };
  });
}
