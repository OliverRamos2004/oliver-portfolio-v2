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
  caption: "I build systems for small businesses, and I make things.",
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
    caption: "My studio. Design-led Shopify stores for brands worth looking at.",
    tone: "signal",
  },
  {
    key: "about",
    label: "About",
    caption: "CS degree, an eye for design, three years behind the kit.",
    tone: "paper",
  },
  {
    key: "contact",
    label: "Contact",
    caption: "One email. I answer within a day.",
    tone: "ink",
  },
];


export const STUDIO = {
  title: ["Malden", "Studios"],
  body: "A design and development studio in Austin. Shopify stores and websites for brands with something to say. Launch builds in about two weeks.",
  cta: "maldenstudios.com",
} as const;

export const ABOUT = {
  title: ["I'm", "Oliver."],
  // Oliver's own bio (from the old /about), minus "I'm Oliver.", which is the headline.
  body: "I have a bachelor's in computer science and an eye for art and design. I love to build things that are both functional and beautiful, and to solve problems in a way that is practical and efficient. My work is a reflection of my own personal journey.",
  facts: [
    ["Now", "Malden Studios · MatchCut"],
    ["Before", "Clinic systems · family lawn business"],
    ["Based", "Austin, TX"],
  ],
} as const;
