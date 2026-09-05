export type ProjectStatus = "live" | "archived" | "in-progress";

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt: string;
  /** width / height, used to reserve layout space before media loads */
  aspectRatio: number;
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
  /** one-line ledger summary, ~60-90 chars, shown in the index row */
  summary: string;
  /** longer editorial copy, shown at the top of the drawer */
  overview: string;
  /** architecture / systems-thinking breakdown, rendered as labeled blocks */
  systemNotes: SystemNote[];
  links: ProjectLink[];
  media: ProjectMedia[];
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
