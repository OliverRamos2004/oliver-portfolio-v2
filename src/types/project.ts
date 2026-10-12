export type ProjectStatus = "live" | "archived" | "in-progress";

/** The two halves of the monograph (SPEC §1): Part I Systems, Part II Craft. */
export type Part = "systems" | "craft";

/**
 * Features get a full spread; bento items a tile in their part's bento;
 * archive projects keep a case file (/work/[slug]) but stay off the home page.
 */
export type Tier = "feature" | "bento" | "archive";

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
  part: Part;
  tier: Tier;
  /** position within its part and tier, 1-based; drives the derived ref (I·01) */
  order: number;
  /** features: the one interesting decision, ≤ 120 chars */
  pullQuote?: string;
  /** bento tiles: one line of real insight, ≤ 110 chars */
  insight?: string;
  /** links the case file to its PRD in prds.ts */
  prdId?: string;
}

/**
 * A bento tile that isn't a client project (Malden Studios, CutbyOliver,
 * drumming). Project bento items are mapped into the same shape for rendering.
 */
export interface BentoEntry {
  id: string;
  part: Part;
  order: number;
  title: string;
  year: number;
  insight: string;
  /** `position` is a CSS object-position; tiles crop from the top (right for screenshots) unless set. */
  image: { src: string; alt: string; position?: string };
  /** a case file (/work/…) or an outbound link; omit for no link */
  href?: string;
}

