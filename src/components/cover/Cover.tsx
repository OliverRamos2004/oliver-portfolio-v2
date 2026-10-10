/**
 * The cover (SPEC §4): type only. The name is set larger than the viewport
 * and cropped by its right edge; the section clips so the crop never adds
 * horizontal scroll. The h1 keeps the full name for assistive tech.
 */
export function Cover() {
  return (
    <section
      id="top"
      data-running-head="COVER"
      data-running-head-short="COVER"
      data-tone="paper"
      className="overflow-x-clip bg-paper pt-16 text-ink"
    >
      <h1 className="display -ml-[0.04em] whitespace-nowrap px-4 pt-6 text-[length:var(--text-cover)] md:px-10">
        <span className="block">Oliver</span>
        <span className="block">Ramos</span>
      </h1>
      <div className="mt-8 grid grid-cols-4 gap-4 border-t border-rule px-4 py-6 md:mt-12 md:grid-cols-12 md:px-10">
        <p className="col-span-4 font-mono text-[length:var(--text-quote)] leading-[1.15] md:col-span-7">
          I build systems and I make things.
        </p>
        <p className="col-span-2 font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em] text-ink-muted md:col-span-2 md:col-start-9">
          Austin, TX
        </p>
        <p className="col-span-2 text-right font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em] text-ink-muted md:col-span-2 md:col-start-11">
          Issue 2026
        </p>
      </div>
    </section>
  );
}
