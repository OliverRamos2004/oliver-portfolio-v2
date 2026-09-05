export function PhilosophySection() {
  return (
    <section className="hairline-t px-4 py-20 md:px-8 md:py-28">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-charcoal/40" style={{ letterSpacing: "var(--tracking-wide)" }}>
          01
        </span>
        <h2
          className="font-display text-xl font-bold uppercase text-charcoal md:text-2xl"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Philosophy
        </h2>
      </div>

      <p
        className="mt-8 max-w-3xl font-display font-bold uppercase leading-[1.05] text-charcoal"
        style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "var(--tracking-tight)" }}
      >
        “I don&rsquo;t think of consulting and engineering as two different
        skill sets. A clinic administrator&rsquo;s actual workflow, a small
        business&rsquo;s real budget, a compliance requirement — that&rsquo;s
        the same kind of constraint an algorithm is, and it deserves the same
        rigor.”
      </p>

      <div className="mt-10 grid gap-6 md:max-w-2xl">
        <p className="font-sans text-base leading-relaxed text-charcoal/70">
          Most of what I&rsquo;ve built has been for people who needed
          something to simply work: a clinic that needed patient records off
          paper, a landscaping business that needed to see its own cash flow
          clearly, small business owners who needed a professional site
          launched without a six-month runway. None of that is glamorous
          work, but all of it required actually listening before writing a
          line of code.
        </p>
        <p className="font-sans text-base leading-relaxed text-charcoal/70">
          What I care about is being the person who can sit in a room with a
          healthcare administrator or a business owner, understand what they
          actually need — not what a generic template assumes they need —
          and then go build the exact right-sized system for it. That&rsquo;s
          the consulting work. The engineering is just how I keep the
          promise.
        </p>
      </div>
    </section>
  );
}
