export type PrdStatus = "shipped" | "in-progress";

export interface PrdLink {
  label: string;
  href: string;
}

export interface PrdMetric {
  metric: string;
  target: string;
}

export interface PrdEntry {
  /** stable slug, used as the URL segment and React key */
  id: string;
  /** zero-padded ledger reference, e.g. "01" */
  ref: string;
  title: string;
  subtitle: string;
  year: number;
  role: string;
  status: PrdStatus;
  /** one-line summary shown on the homepage card */
  summary: string;
  problem: string;
  goals: string[];
  targetUsers: { segment: string; detail: string }[];
  userStories: string[];
  inScope: string[];
  outOfScope: string[];
  successMetrics: PrdMetric[];
  risks: string[];
  links: PrdLink[];
}
