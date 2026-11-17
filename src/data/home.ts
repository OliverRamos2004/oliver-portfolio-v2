/**
 * Home: "the name is the menu" (docs/Specs/2026-11-refresh/README.md).
 * Every word on the home page and in the four sheets lives here, so copy
 * edits happen in one file. Drafted by Claude; Oliver's to edit before merge.
 */

import { projects } from "./projects";

export type SheetKey = "work" | "studio" | "about" | "contact";

/** Surface color: the page while a word is hovered, and that word's sheet. */
export type Tone = "ink" | "signal" | "paper";

export interface MenuItem {
  key: SheetKey;
  /** the menu word, and the title that fills the screen while it's hovered */
  label: string;
  caption: string;
  tone: Tone;
}

export const HOME = {
  /** what fills the screen at rest */
  name: "Oliver Ramos",
  caption: "I build systems, create art, ship software, and play drums.",
} as const;

/**
 * The Work sheet, top to bottom. `id` must match a project in projects.ts
 * (year, status and the case-file link come from there); `name` is the short
 * display name, sized to fit one line at 10vw.
 */
export const WORK = [
  { id: "yosi-archive", name: "YOSI Archive", kind: "Online store", image: "/work/yosi-archive/desktop-01-home.webp" },
  { id: "matchcut", name: "MatchCut", kind: "Barber app · founder", image: "/work/matchcut/desktop-01-landing.webp" },
  { id: "clinic-intake", name: "Clinic Intake", kind: "Clinic software", image: "/work/clinic-intake/desktop-01-basic-info.webp" },
  { id: "back-issue-supply", name: "Back Issue", kind: "Shopify store", image: "/work/back-issue-supply/desktop-01-home.webp" },
  { id: "ramos-lawn-care", name: "Ramos Lawn", kind: "Site + ops system", image: "/work/ramos-lawn-care.png" },
  { id: "green-valley-storage", name: "Green Valley", kind: "Website", image: "/work/green-valley-storage.png" },
  { id: "tex-country-materials", name: "Tex Country", kind: "Website", image: "/work/tex-country-materials.png" },
] as const;

const NUMBER = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/** "Six shipped, one in progress.", counted from WORK so the caption can't drift from the list. */
function workCount(): string {
  const listed = WORK.map((w) => projects.find((p) => p.id === w.id));
  const building = listed.filter((p) => p?.status === "in-progress").length;
  const shipped = listed.length - building;
  const n = (k: number) => NUMBER[k] ?? String(k);
  return building ? `${n(shipped)} shipped, ${n(building).toLowerCase()} in progress.` : `${n(shipped)} shipped.`;
}

export const MENU: readonly MenuItem[] = [
  {
    key: "work",
    label: "Work",
    caption: `Stores and software for small businesses. ${workCount()}`,
    tone: "ink",
  },
  {
    key: "studio",
    label: "Studio",
    caption: "Malden Studios. My creative space, and where I take client work.",
    tone: "signal",
  },
  {
    key: "about",
    label: "About",
    caption: "Developer, drummer, barber. Based in Austin.",
    tone: "paper",
  },
  {
    key: "contact",
    label: "Contact",
    caption: "Say hello. Projects, jobs, or just to talk.",
    tone: "ink",
  },
];


export const STUDIO = {
  title: ["Malden", "Studios"],
  body: "A design and development studio in Austin. Shopify stores and websites for brands with something to say.",
  cta: "maldenstudios.com",
  // Hover descriptions (Claude drafts; Oliver's to edit).
  notes: {
    title: "Recent: YOSI Archive.",
    cta: "Opens the studio site in a new tab.",
    shot: "maldenstudios.com",
  },
} as const;

/** Hover description on the Contact sheet's giant email (Claude draft). */
export const CONTACT_NOTE = "Click to copy. I answer within a day.";

export const ABOUT = {
  title: ["Hello, I'm", "Oliver."],
  // Oliver's own bio (from the old /about), minus "I'm Oliver." (the headline),
  // opening with where he's based. Sits bottom right of the first screen.
  body: "Based in Austin, TX. I have a bachelor's in computer science and an eye for art and design. I love to build things that are both functional and beautiful. I start with the structure and strip it down to what the work needs, then let the details carry it. My work is a reflection of my own personal journey.",
} as const;
