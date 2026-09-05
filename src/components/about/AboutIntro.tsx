import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AboutIntro() {
  return (
    <section className="px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
      <Link
        href="/#index"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase text-charcoal/50 transition-colors duration-200 hover:text-charcoal"
        style={{ letterSpacing: "var(--tracking-wide)" }}
      >
        <ArrowLeft size={13} strokeWidth={1.5} />
        Index
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
        <div>
          <span className="font-mono text-xs uppercase text-charcoal/50" style={{ letterSpacing: "var(--tracking-widest)" }}>
            About
          </span>
          <h1
            className="mt-3 font-display font-black uppercase leading-[0.85] text-charcoal"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", letterSpacing: "var(--tracking-tightest)" }}
          >
            Built from
            <br />
            both halves.
          </h1>
          <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-charcoal/70">
            I&rsquo;m Oliver — a creative technologist and artist based in
            Austin, TX. Most of what I make sits at an uncomfortable seam:
            rigorous enough to ship to production, strange enough that a
            client would probably not have asked for it. I didn&rsquo;t set
            out to work this way; it&rsquo;s just where every project I
            actually cared about kept ending up.
          </p>
        </div>

        <div
          className="flex items-center justify-center border border-hairline-on-light bg-charcoal/5 font-mono text-[10px] uppercase text-charcoal/35"
          style={{ aspectRatio: 4 / 5 }}
        >
          Portrait — Austin, TX, 2026
        </div>
      </div>
    </section>
  );
}
