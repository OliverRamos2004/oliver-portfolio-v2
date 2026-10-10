import Image from "next/image";
import Link from "next/link";
import { PARTS } from "@/lib/monograph";
import type { Part, ShortTakeEntry } from "@/types/project";

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";
const pad = (n: number) => String(n).padStart(2, "0");

/** Rule-separated rows: thumb, catalogue label, one line of insight (SPEC §4). */
export function ShortTakes({ part, items }: { part: Part; items: ShortTakeEntry[] }) {
  const onInk = part === "craft";
  const muted = onInk ? "text-paper-muted" : "text-ink-muted";
  const rule = onInk ? "border-rule-on-ink" : "border-rule";
  const stamp = onInk
    ? "hover:bg-signal hover:text-ink focus-visible:bg-signal focus-visible:text-ink"
    : "hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper";

  return (
    <section
      id={`short-takes-${part}`}
      aria-labelledby={`short-takes-${part}-title`}
      data-running-head={`${PARTS[part].word} — SHORT TAKES`}
      data-running-head-short={`${PARTS[part].numeral} · +`}
      data-tone={onInk ? "ink" : "paper"}
      data-part={part}
      className={`border-t ${rule} px-4 py-16 md:px-10 md:py-24`}
    >
      <h3 id={`short-takes-${part}-title`} className="display mb-8 text-[length:var(--text-d2)]">
        Short takes
      </h3>
      <ul>
        {items.map((item, i) => {
          const body = (
            <>
              <div className={`relative h-24 w-24 shrink-0 overflow-hidden ${onInk ? "" : "bg-paper-sunk"}`}>
                {item.image.src ? (
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="96px" className="object-cover object-top" />
                ) : (
                  // No screenshots yet (e.g. an in-progress build): set the initial instead.
                  <span aria-hidden="true" className="display flex h-full items-center justify-center text-[3.5rem]">
                    {item.title.charAt(0)}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`${label} ${muted} group-hover:text-current group-focus-visible:text-current`}>
                  {pad(i + 1)} {item.title} · {item.year}
                </p>
                <p className="mt-2 text-[15px] leading-[1.5] max-md:text-[14px]">{item.insight}</p>
              </div>
              {item.href && (
                <span aria-hidden="true" className={`${label} self-start transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1`}>
                  ↗
                </span>
              )}
            </>
          );
          const row = "group flex items-center gap-4 py-4 md:gap-6";
          return (
            <li key={item.id} className={`border-b ${rule} ${i === 0 ? `border-t` : ""}`}>
              {item.href ? (
                <Link href={item.href} scroll={false} className={`${row} ${stamp}`}>
                  {body}
                </Link>
              ) : (
                <div className={row}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
