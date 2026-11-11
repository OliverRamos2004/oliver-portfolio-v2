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
  label: string;
  /** what the giant name rolls to while this word is hovered */
  swap: readonly [string, string];
  caption: string;
  tone: Tone;
}

export const HOME = {
  swap: ["Oliver", "Ramos"],
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
    swap: ["I build", "systems"],
    caption: `Stores and software for small businesses. ${workCount()}`,
    tone: "ink",
  },
  {
    key: "studio",
    label: "Studio",
    swap: ["Malden", "Studios"],
    caption: "My studio. Design-led Shopify stores for brands worth looking at.",
    tone: "signal",
  },
  {
    key: "about",
    label: "About",
    swap: ["Also", "drums"],
    caption: "CS degree, an eye for design, three years behind the kit.",
    tone: "paper",
  },
  {
    key: "contact",
    label: "Contact",
    swap: ["Say", "hello"],
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
  body: "Computer science degree, an eye for art and design, and a habit of building the thing instead of talking about it. I like work that's useful and good to look at, in that order and at the same time.",
  facts: [
    ["Now", "Malden Studios · MatchCut"],
    ["Before", "Clinic systems · family lawn business"],
    ["Off hours", "Drums: Brazilian jazz, funk, rock"],
    ["Based", "Austin, TX"],
  ],
} as const;
