import Image from "next/image";
import Link from "next/link";
import { PARTS } from "@/lib/monograph";
import type { BentoEntry, Part } from "@/types/project";

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The rest of each part, as a small bento (replaces the short-takes rows,
 * 2026-10-11): hairline grid, a small photo, the name, one line. Each tile
 * links to its case file, or out, when it has somewhere to go.
 */
export function Bento({ part, items }: { part: Part; items: BentoEntry[] }) {
  const onInk = part === "craft";
  const surface = onInk ? "bg-ink" : "bg-paper";
  const muted = onInk ? "text-paper-muted" : "text-ink-muted";
  const rule = onInk ? "border-rule-on-ink" : "border-rule";
  const stamp = onInk
    ? "hover:bg-signal hover:text-ink focus-visible:bg-signal focus-visible:text-ink"
    : "hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper";
  // Equal tiles: one row on desktop, two columns below. With an odd count
  // the first tile runs full width on phone/tablet so the grid stays square.
  const odd = items.length % 2 === 1;
  const desktopCols = items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <section
      id={`bento-${part}`}
      aria-labelledby={`bento-${part}-title`}
      data-running-head={`${PARTS[part].word} — MORE`}
      data-running-head-short={`${PARTS[part].numeral} · +`}
      data-tone={onInk ? "ink" : "paper"}
      data-part={part}
      className={`border-t ${rule} px-4 py-16 md:px-10 md:py-24`}
    >
      <h3 id={`bento-${part}-title`} className="display mb-8 text-[length:var(--text-d2)]">
        More {PARTS[part].word.toLowerCase()}
      </h3>
      {/* 1px gaps over a rule-coloured ground draw the hairlines between tiles. */}
      <ul className={`grid grid-cols-2 gap-px border ${rule} ${onInk ? "bg-rule-on-ink" : "bg-rule"} ${desktopCols}`}>
        {items.map((item, i) => {
          const wide = odd && i === 0;
          const external = item.href?.startsWith("http");
          const body = (
            <>
              <div className={`relative aspect-[16/10] w-full overflow-hidden ${onInk ? "bg-paper/5" : "bg-paper-sunk"}`}>
                {item.image.src ? (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes={wide ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="object-cover object-top"
                    style={item.image.position ? { objectPosition: item.image.position } : undefined}
                  />
                ) : (
                  // No screenshot yet: set the initial instead.
                  <span aria-hidden="true" className="display flex h-full items-center justify-center text-[2.5rem]">
                    {item.title.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between gap-3 pt-4">
                <div className="min-w-0">
                  <p className={`${label} ${muted} group-hover:text-current group-focus-visible:text-current`}>
                    {pad(i + 1)} · {item.year}
                  </p>
                  <p className="display mt-2 text-[clamp(1.25rem,2.2vw,1.75rem)] leading-none">{item.title}</p>
                  <p className="mt-2 text-[14px] leading-[1.5] max-md:text-[13px]">{item.insight}</p>
                </div>
                {item.href && (
                  <span aria-hidden="true" className={`${label} transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1`}>
                    {external ? "↗" : "→"}
                  </span>
                )}
              </div>
            </>
          );
          const tile = `flex h-full flex-col p-3 md:p-4 ${surface}`;
          return (
            <li key={item.id} className={`${surface} ${wide ? "col-span-2 lg:col-span-1" : ""}`}>
              {item.href ? (
                <Link
                  href={item.href}
                  scroll={false}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className={`group ${tile} ${stamp}`}
                >
                  {body}
                  {external && <span className="sr-only"> (opens in a new tab)</span>}
                </Link>
              ) : (
                <div className={tile}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
