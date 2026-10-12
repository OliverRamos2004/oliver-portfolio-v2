import { PARTS, runningHead } from "@/lib/monograph";
import type { Part } from "@/types/project";

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";

/** A full-page section opener: the part's word, cropped by the viewport. */
export function PartOpener({ part }: { part: Part }) {
  const { numeral, word, label: partLabel, openerEm } = PARTS[part];
  const onInk = part === "craft";
  return (
    <section
      aria-labelledby={`opener-${part}`}
      data-running-head={runningHead(part)}
      data-running-head-short={`${numeral}`}
      data-tone={onInk ? "ink" : "paper"}
      data-part={part}
      className="flex min-h-[80svh] flex-col justify-between pt-20"
    >
      <p className={`${label} px-4 md:px-10 ${onInk ? "text-paper-muted" : "text-ink-muted"}`}>{partLabel}</p>
      <h2
        id={`opener-${part}`}
        className="display reveal -ml-[0.04em] whitespace-nowrap px-[var(--gutter)] pb-2 [--gutter:1rem] md:[--gutter:2.5rem]"
        style={{ fontSize: `calc((100vw - var(--gutter)) / ${openerEm})` }}
      >
        {onInk && <span className="text-signal">{numeral} </span>}
        {word}
      </h2>
    </section>
  );
}
