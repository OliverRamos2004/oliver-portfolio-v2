import { WORK } from "@/data/home";
import { projects } from "@/data/projects";

export interface CaseStep {
  href: string;
  label: string;
}

/** The short display name the Work sheet uses ("Back Issue"), else the project title. */
export function caseName(id: string): string {
  return WORK.find((w) => w.id === id)?.name ?? projects.find((p) => p.id === id)?.title ?? id;
}

/** Previous / next case file in the Work sheet's order, looping. Off-list projects enter at the top. */
export function caseNav(id: string): { prev: CaseStep; next: CaseStep } {
  const ids = WORK.map((w) => w.id as string);
  const i = ids.indexOf(id);
  const at = (n: number) => {
    const target = ids[(n + ids.length) % ids.length];
    return { href: `/work/${target}`, label: caseName(target) };
  };
  return i === -1 ? { prev: at(ids.length - 1), next: at(0) } : { prev: at(i - 1), next: at(i + 1) };
}
