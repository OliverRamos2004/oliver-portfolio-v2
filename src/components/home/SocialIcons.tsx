import { SOCIALS } from "@/data/socials";
import styles from "./home.module.css";

/**
 * Social links as icons. Two glyph sets are rendered and CSS shows one
 * (the `.about` box's data-icons): "line" in the site's square-ended stroke
 * (same weight as the arrows and ×; no rounded corners), or "solid" filled
 * marks. Line paths adapted from Lucide (ISC), squared off.
 */
type Glyph = { line: React.ReactNode; solid: React.ReactNode };

const GLYPHS: Record<string, Glyph> = {
  GitHub: {
    line: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </>
    ),
    solid: (
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
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
    solid: (
      <path d="M0 0h24v24H0zM3.6 9v11.5h3.5V9zm1.8-5.7a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1zM9.4 9v11.5h3.5v-5.7c0-1.5.3-2.9 2.1-2.9 1.8 0 1.9 1.7 1.9 3v5.6h3.5v-6.3c0-3.1-.7-5.5-4.3-5.5-1.7 0-2.9.9-3.4 1.9V9z" />
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
    solid: <path d="M0 0h24v24H0zm12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm0 2a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zM18 4.3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4z" />,
  },
};

export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={`${styles.socials} ${className ?? ""}`}>
      {SOCIALS.map((s) => {
        const g = GLYPHS[s.label];
        return (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noopener" aria-label={s.label} data-cursor="↗">
              {g && (
                <>
                  <svg
                    className={styles.glyphLine}
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
                  <svg className={styles.glyphSolid} viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true">
                    {g.solid}
                  </svg>
                </>
              )}
              <span className={styles.socialLabel}>{s.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
