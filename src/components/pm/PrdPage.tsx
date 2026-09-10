import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { PrdEntry } from "@/types/prd";

export function PrdPage({ prd }: { prd: PrdEntry }) {
  return (
    <div className="min-h-screen bg-charcoal">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:px-8 md:pt-36">
        <Link
          href="/#pm"
          className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase text-white/50 transition-colors duration-200 hover:text-accent"
          style={{ letterSpacing: "var(--tracking-wide)" }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to Product
        </Link>

        <span
          className="mt-8 block font-mono text-xs uppercase text-accent"
          style={{ letterSpacing: "var(--tracking-widest)" }}
        >
          PRD / {prd.ref}
        </span>

        <h1
          className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] text-white md:text-6xl"
          style={{ letterSpacing: "var(--tracking-tightest)" }}
        >
          {prd.title}
        </h1>

        <p className="mt-4 max-w-xl font-sans text-base text-white/60">{prd.subtitle}</p>

        {prd.status === "in-progress" && (
          <span
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase text-accent"
            style={{ letterSpacing: "var(--tracking-widest)" }}
          >
            <span className="h-1.5 w-1.5 animate-pulse bg-accent" aria-hidden />
            Currently Building
          </span>
        )}

        <dl
          className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-xs uppercase text-white/60 md:grid-cols-3"
          style={{ letterSpacing: "var(--tracking-wide)" }}
        >
          <div>
            <dt className="text-white/35">Year</dt>
            <dd className="mt-1 text-white">{prd.year}</dd>
          </div>
          <div>
            <dt className="text-white/35">Role</dt>
            <dd className="mt-1 text-white">{prd.role}</dd>
          </div>
          <div>
            <dt className="text-white/35">Status</dt>
            <dd className="mt-1 text-white">{prd.status === "shipped" ? "Shipped" : "In Progress"}</dd>
          </div>
        </dl>

        <Section heading="Problem">
          <p className="max-w-2xl font-sans text-sm leading-relaxed text-white/70">{prd.problem}</p>
        </Section>

        <Section heading="Goals">
          <BulletList items={prd.goals} />
        </Section>

        <Section heading="Target Users">
          <dl className="grid gap-6 sm:grid-cols-2">
            {prd.targetUsers.map((u) => (
              <div key={u.segment}>
                <dt className="font-display text-base font-bold uppercase text-white">{u.segment}</dt>
                <dd className="mt-1.5 font-sans text-sm leading-relaxed text-white/60">{u.detail}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section heading="User Stories">
          <BulletList items={prd.userStories} />
        </Section>

        <Section heading="Scope">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="font-mono text-[11px] uppercase text-white/40" style={{ letterSpacing: "var(--tracking-wide)" }}>
                In Scope
              </h4>
              <BulletList items={prd.inScope} className="mt-3" />
            </div>
            <div>
              <h4 className="font-mono text-[11px] uppercase text-white/40" style={{ letterSpacing: "var(--tracking-wide)" }}>
                Out of Scope
              </h4>
              <BulletList items={prd.outOfScope} className="mt-3" muted />
            </div>
          </div>
        </Section>

        <Section heading="Success Metrics">
          <dl className="grid gap-4 sm:grid-cols-2">
            {prd.successMetrics.map((m) => (
              <div key={m.metric} className="border border-hairline-on-dark px-4 py-3">
                <dt className="font-mono text-[11px] uppercase text-white/40" style={{ letterSpacing: "var(--tracking-wide)" }}>
                  {m.metric}
                </dt>
                <dd className="mt-1.5 font-sans text-sm text-white">{m.target}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section heading="Risks & Open Questions">
          <BulletList items={prd.risks} />
        </Section>

        {prd.links.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-4 hairline-t-dark pt-8">
            {prd.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 font-mono text-xs uppercase text-white transition-colors duration-200 hover:text-accent"
                style={{ letterSpacing: "var(--tracking-wide)" }}
              >
                {link.label}
                <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="mt-12 hairline-t-dark pt-8">
      <h3
        className="mb-5 font-mono text-xs uppercase text-accent"
        style={{ letterSpacing: "var(--tracking-widest)" }}
      >
        {heading}
      </h3>
      {children}
    </div>
  );
}

function BulletList({ items, className = "", muted = false }: { items: string[]; className?: string; muted?: boolean }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3 font-sans text-sm leading-relaxed ${muted ? "text-white/45" : "text-white/70"}`}
        >
          <span className="mt-2 h-1 w-1 shrink-0 bg-accent" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}
