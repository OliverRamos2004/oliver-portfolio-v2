import Link from "next/link";
import { MALDEN } from "@/data/contact";

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";
const stamp = "hover:bg-signal hover:text-ink focus-visible:bg-signal focus-visible:text-ink";

/**
 * The issue's closing line (SPEC §3): credits the studio once. On /about it
 * also points back into the issue, since that page has no Credits section.
 */
export function Masthead({ links = false }: { links?: boolean }) {
  return (
    <footer className={`grid grid-cols-4 gap-x-4 gap-y-3 border-t border-rule-on-ink px-4 py-8 md:grid-cols-12 md:px-10 ${label}`}>
      <p className="col-span-4 flex flex-wrap gap-x-4 gap-y-2 md:col-span-5">
        <span>Oliver Ramos · © 2026</span>
        {links && (
          <>
            <Link href="/#contents" className={stamp}>Back to the issue ↗</Link>
            <Link href="/#credits" className={stamp}>Contact ↗</Link>
          </>
        )}
      </p>
      <p className="col-span-4 flex items-center gap-3 self-start md:col-span-4">
        <span className="text-paper-muted">Studio</span>
        <span aria-hidden="true" className="flex-1 border-b border-dotted border-paper-muted/50" />
        {MALDEN.live ? (
          <a href={MALDEN.href} target="_blank" rel="noopener noreferrer" className={stamp}>
            {MALDEN.name} ↗
          </a>
        ) : (
          <span>
            {MALDEN.name} <span className="text-paper-muted">(soon)</span>
          </span>
        )}
      </p>
      <p className="col-span-4 text-paper-muted md:col-span-3 md:text-right">Set in Archivo &amp; IBM Plex Mono</p>
    </footer>
  );
}
