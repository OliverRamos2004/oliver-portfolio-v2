export type ProjectStatus = "live" | "archived" | "in-progress";

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt: string;
  /** width / height, used to reserve layout space before media loads */
  aspectRatio: number;
  /** set on framed device shots (transparent background) — they render with object-contain on a stage instead of a cropped cover */
  device?: "desktop" | "phone";
  /** short mono caption shown under the drawer gallery's main stage */
  caption?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface SystemNote {
  heading: string;
  body: string;
}

export interface ProjectEntry {
  /** stable slug, used as the URL segment and React key */
  id: string;
  /** zero-padded ledger reference, e.g. "01" */
  ref: string;
  title: string;
  year: number;
  discipline: string[];
  stack: string[];
  role: string;
  status: ProjectStatus;
  /** overrides the status wording where "Live"/"Building" is too coarse, e.g. "Live demo" */
  statusLabel?: string;
  /** one-line ledger summary, ~60-90 chars, shown in the index row */
  summary: string;
  /** longer editorial copy, shown at the top of the drawer */
  overview: string;
  /** architecture / systems-thinking breakdown, rendered as labeled blocks */
  systemNotes: SystemNote[];
  links: ProjectLink[];
  media: ProjectMedia[];
  /**
   * position in the homepage Selected Work band (1 = first); omit to keep a
   * project out of it. Featured rows use the first desktop + first phone shot
   * in `media`, so a featured project needs at least one of each.
   */
  featured?: number;
}

export interface ArtifactEntry {
  id: string;
  title: string;
  year: number;
  /** short filter-friendly label, e.g. "Generative" — the grid's filter buttons key off this */
  category: string;
  /** longer display string shown in the caption, e.g. "Generative — p5.js" */
  medium: string;
  note: string;
  media: ProjectMedia;
}

/**
 * Smaller, lighter-weight builds (hackathon sprints, quick demos) — a card
 * grid with a single screenshot and an outbound link, not a full case-study
 * drawer like ProjectEntry.
 */
export interface SideProjectEntry {
  id: string;
  title: string;
  year: number;
  /** one-line pitch, ~60-90 chars, shown under the title */
  tagline: string;
  stack: string[];
  links: ProjectLink[];
  media: ProjectMedia;
}
