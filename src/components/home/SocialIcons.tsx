import { SOCIALS } from "@/data/socials";
import styles from "./home.module.css";

/**
 * Social links as line icons in the site's square-ended stroke (same family
 * as the arrows and ×; no rounded corners). Paths adapted from Lucide (ISC),
 * squared off.
 */
type Glyph = { line: React.ReactNode };

const GLYPHS: Record<string, Glyph> = {
  GitHub: {
    line: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </>
    ),
  },
  LinkedIn: {
    line: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <path d="M2 9h4v12H2z" />
        <path d="M3 3h2v2H3z" />
      </>
    ),
  },
  Email: {
    line: (
      <>
        <path d="M2 5h20v14H2z" />
        <path d="M2 5l10 8 10-8" />
      </>
    ),
  },
  Instagram: {
    line: (
      <>
        <path d="M2 2h20v20H2z" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  },
};

/** One line glyph (GitHub, LinkedIn, Instagram, Email), 1em, currentColor. */
export function SocialGlyph({ name, className }: { name: string; className?: string }) {
  const g = GLYPHS[name];
  if (!g) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {g.line}
    </svg>
  );
}

export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={`${styles.socials} ${className ?? ""}`}>
      {SOCIALS.map((s) => {
        const g = GLYPHS[s.label];
        return (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noopener" aria-label={s.label} data-cursor="↗">
              {g && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  aria-hidden="true"
                >
                  {g.line}
                </svg>
              )}
              <span className={styles.socialLabel}>{s.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
