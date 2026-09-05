export interface SkillItem {
  name: string;
  /** what this actually means in practice — years, context, or specific tools */
  detail: string;
}

export interface SkillCategory {
  id: string;
  /** zero-padded ledger reference, e.g. "01" — matches the Index's numbering convention */
  ref: string;
  heading: string;
  description: string;
  items: SkillItem[];
}
