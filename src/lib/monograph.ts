import { projects } from "@/data/projects";
import { takes } from "@/data/takes";
import type { Part, ProjectEntry, BentoEntry } from "@/types/project";

/**
 * The homepage is one magazine issue in two parts (SPEC §3). Everything that
 * orders, numbers or groups projects reads from here, so the Contents, the
 * spreads and the running head can never disagree.
 */

/**
 * `openerVw` is the opener headline size, measured so each line overruns the
 * viewport by ~12% (SYSTEMS: 35vw ran to 124%; "II CRAFT": 30.75vw to 99%).
 */
export const PARTS: Record<Part, { numeral: string; word: string; label: string; openerVw: number }> = {
  systems: { numeral: "I", word: "SYSTEMS", label: "PART I · SYSTEMS", openerVw: 32 },
  craft: { numeral: "II", word: "CRAFT", label: "PART II · CRAFT", openerVw: 35 },
};

export const PART_ORDER: Part[] = ["systems", "craft"];

const pad = (n: number) => String(n).padStart(2, "0");

/** "I·01" — a feature's catalogue number within its part. */
export function featureRef(project: ProjectEntry): string {
  return `${PARTS[project.part].numeral}·${pad(project.order)}`;
}

/**
 * The case file's reference: "I·01" for a feature; bento and archive
 * projects number separately ("I · +01"), so they never collide with a feature's ref.
 */
export function caseFileRef(project: ProjectEntry): string {
  if (project.tier === "feature") return featureRef(project);
  return `${PARTS[project.part].numeral} · +${pad(project.order)}`;
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

/** Project bento items (linked to their case file) followed by non-project tiles. */
export function bentoFor(part: Part): BentoEntry[] {
  const fromProjects: BentoEntry[] = projects
    .filter((p) => p.part === part && p.tier === "bento")
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
  bento: { names: string[]; page: number; href: string };
};

const pageLabel = (n: number) => `p.${pad(n)}`;
export { pageLabel };

/**
 * Magazine "page numbers" for the Contents. Cover is p.01, Contents p.02;
 * each part opener takes one page, each feature a two-page spread and the
 * bento one page.
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
    const bento = {
      names: bentoFor(part).map((t) => t.title),
      page,
      href: `#bento-${part}`,
    };
    page += 1;
    return { part, label: PARTS[part].label, features, bento };
  });
}
