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
          My Philosophy
        </h2>
      </div>

      <p
        className="mt-8 max-w-3xl font-display font-bold uppercase leading-[1.05] text-charcoal"
        style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "var(--tracking-tight)" }}
      >
        “I believe in the relentless pursuit of growth: through learning, hands-on 
          experiences, and the communities that help us prosper together. 
          If you aren&rsquo;t a slightly different person at the end of the journey 
          than when you started, transformation hasn&rsquo;t really happened. 
          In a professional setting, that mindset shapes everything I build. 
          None of it is glamorous work, but all of it requires listening first 
          and growing alongside the people you&rsquo;re building for.”
      </p>

      <div className="mt-10 grid gap-6 md:max-w-2xl">
        <p className="font-sans text-base leading-relaxed text-charcoal/70">
        What I care about is being the person who can sit in a room with a
          healthcare administrator or a business owner, understand what they
          actually need,
          and then go build the exact right-sized system for it. That&rsquo;s
          the consulting work. The engineering is just how I keep the
          promise.
        </p>

      </div>
    </section>
  );
}
