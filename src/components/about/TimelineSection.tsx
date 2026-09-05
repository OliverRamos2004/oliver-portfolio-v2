import type { TimelineEntry } from "@/types/about";

export function TimelineSection({ entries }: { entries: TimelineEntry[] }) {
  return (
    <section className="hairline-t px-4 py-20 md:px-8 md:py-28">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-charcoal/40" style={{ letterSpacing: "var(--tracking-wide)" }}>
          02
        </span>
        <h2
          className="font-display text-xl font-bold uppercase text-charcoal md:text-2xl"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Timeline
        </h2>
      </div>

      <ul className="mt-10 max-w-2xl">
        {entries.map((entry) => (
          <li key={entry.year} className="hairline-t grid grid-cols-[4.5rem_1fr] gap-4 py-6 first:border-t-0 md:grid-cols-[5.5rem_1fr]">
            <span className="font-mono text-sm text-charcoal/40" style={{ letterSpacing: "var(--tracking-wide)" }}>
              {entry.year}
            </span>
            <div>
              <h3 className="font-display text-base font-bold uppercase text-charcoal">{entry.heading}</h3>
              <p className="mt-1.5 font-sans text-sm leading-relaxed text-charcoal/65">{entry.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
