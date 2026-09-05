const COLUMNS = [
  {
    heading: "Toolchain",
    rows: ["Next.js 16 / App Router", "TypeScript", "Tailwind CSS v4", "Motion", "Lenis", "Vercel"],
  },
  {
    heading: "Type",
    rows: ["Big Shoulders — Display", "Inter — Body", "IBM Plex Mono — System"],
  },
];

export function Colophon() {
  return (
    <footer id="info" className="hairline-t-dark bg-charcoal px-4 py-16 md:px-8 md:py-20">
      <div className="grid gap-10 sm:grid-cols-2">
        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h3 className="font-mono text-xs uppercase text-accent" style={{ letterSpacing: "var(--tracking-widest)" }}>
              {col.heading}
            </h3>
            <ul className="mt-4 space-y-2">
              {col.rows.map((row) => (
                <li key={row} className="font-mono text-sm text-white/60" style={{ letterSpacing: "var(--tracking-wide)" }}>
                  {row}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="hairline-t-dark mt-12 pt-6 font-mono text-[11px] uppercase text-white/35" style={{ letterSpacing: "var(--tracking-wide)" }}>
        © {new Date().getFullYear()} Oliver Ramos. Designed and built in Austin, TX.
      </p>
    </footer>
  );
}
