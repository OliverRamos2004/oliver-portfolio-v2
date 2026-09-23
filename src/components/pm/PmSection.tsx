import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PrdEntry } from "@/types/prd";

export function PmSection({ prds }: { prds: PrdEntry[] }) {
  return (
    <section id="pm" className="px-4 py-24 md:px-8 md:py-32">
      <header className="mb-10 flex items-baseline justify-between pb-4 md:mb-14">
        <h2
          className="font-display text-2xl font-bold uppercase text-charcoal md:text-3xl"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Product
        </h2>
        <span
          className="hidden font-mono text-xs uppercase text-charcoal/50 sm:inline"
          style={{ letterSpacing: "var(--tracking-widest)" }}
        >
          PRDs &amp; Product Thinking
        </span>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {prds.map((prd) => (
          <Link
            key={prd.id}
            href={`/pm/${prd.id}`}
            className="group hairline-t block pt-6 transition-colors duration-200 md:border-t-0 md:pt-0"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-charcoal/40" style={{ letterSpacing: "var(--tracking-wide)" }}>
                {prd.ref}
              </span>
              <h3
                className="font-display text-xl font-bold uppercase text-charcoal transition-colors duration-200 group-hover:text-accent-deep md:text-2xl"
                style={{ letterSpacing: "var(--tracking-tight)" }}
              >
                {prd.title}
              </h3>
            </div>
            <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-charcoal/60">{prd.summary}</p>
            <span
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase text-charcoal transition-colors duration-200 group-hover:text-accent-deep"
              style={{ letterSpacing: "var(--tracking-wide)" }}
            >
              Read PRD
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
