import type { SkillCategory } from "@/types/skills";

interface SkillsSectionProps {
  categories: SkillCategory[];
  /** false when a divider-less CTA strip already precedes this section */
  dividerTop?: boolean;
}

export function SkillsSection({ categories, dividerTop = true }: SkillsSectionProps) {
  return (
    <section
      id="skills"
      className={`${dividerTop ? "hairline-t " : ""}px-4 py-16 md:px-8 md:py-24`}
    >
      <header className="mb-10 flex items-baseline justify-between pb-4 md:mb-14">
        <h2
          className="font-display text-2xl font-bold uppercase text-charcoal md:text-3xl"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Skillset
        </h2>
        <span className="hidden font-mono text-xs uppercase text-charcoal/50 sm:inline" style={{ letterSpacing: "var(--tracking-widest)" }}>
          Capabilities &amp; Depth
        </span>
      </header>

      <div className="grid gap-14 lg:grid-cols-3 lg:gap-8">
        {categories.map((category) => (
          <div key={category.id} className="hairline-t pt-6 lg:border-t-0 lg:pt-0">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-charcoal/40" style={{ letterSpacing: "var(--tracking-wide)" }}>
                {category.ref}
              </span>
              <h3
                className="font-display text-xl font-bold uppercase text-charcoal"
                style={{ letterSpacing: "var(--tracking-tight)" }}
              >
                {category.heading}
              </h3>
            </div>
            <p className="mt-2 max-w-xs font-sans text-sm text-charcoal/60">{category.description}</p>

            {/* names only — scannable; the long `detail` copy stays in skills.ts (title tooltip) */}
            <ul className="mt-6">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  title={item.detail}
                  className="hairline-t py-2.5 font-mono text-xs uppercase text-charcoal"
                  style={{ letterSpacing: "var(--tracking-wide)" }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
