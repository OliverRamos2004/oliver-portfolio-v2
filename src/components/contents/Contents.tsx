import { contents, pageLabel } from "@/lib/monograph";

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";
// Ink stamp (SPEC §2): instant fill, no transition.
const stamp = "hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper";

/** A magazine contents page: features with page markers, then one short-takes row per part. */
export function Contents() {
  const parts = contents();
  return (
    <section
      id="contents"
      data-running-head="CONTENTS"
      data-running-head-short="CONTENTS"
      data-tone="paper"
      className="bg-paper px-4 py-16 text-ink md:px-10 md:py-24"
    >
      <h2 className="display mb-10 text-[length:var(--text-d2)] md:mb-14">Contents</h2>
      <div className="grid gap-12 md:grid-cols-2 md:gap-10">
        {parts.map((part) => (
          <div key={part.part}>
            <p className={`${label} border-b border-ink pb-3`}>{part.label}</p>
            <ol>
              {part.features.map((row) => (
                <li key={row.href} className="border-b border-rule">
                  <a href={row.href} className={`group flex items-baseline gap-3 py-4 ${stamp}`}>
                    <span className={`${label} w-8 shrink-0`}>{row.ref}</span>
                    <span className="display text-[clamp(1.5rem,3vw,2.5rem)] leading-none">{row.title}</span>
                    <span aria-hidden="true" className="mx-2 flex-1 border-b border-dotted border-current opacity-40" />
                    <span className={label}>{pageLabel(row.page)}</span>
                  </a>
                </li>
              ))}
              <li className="border-b border-rule">
                <a href={part.shortTakes.href} className={`flex items-baseline gap-3 py-4 ${stamp}`}>
                  <span className={`${label} w-8 shrink-0`}>+</span>
                  <span className={`${label} flex-1`}>
                    Short takes — {part.shortTakes.names.join(" · ")}
                  </span>
                  <span className={label}>{pageLabel(part.shortTakes.page)}</span>
                </a>
              </li>
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
