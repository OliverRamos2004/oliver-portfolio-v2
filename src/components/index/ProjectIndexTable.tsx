import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectEntry } from "@/types/project";

export function ProjectIndexTable({ projects }: { projects: ProjectEntry[] }) {
  return (
    <section id="index" className="px-4 py-24 md:px-8 md:py-32">
      <header className="mb-10 flex items-baseline justify-between hairline-b pb-4 md:mb-14">
        <h2
          className="font-display text-2xl font-bold uppercase text-charcoal md:text-3xl"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Index
        </h2>
        <span className="font-mono text-xs uppercase text-charcoal/50" style={{ letterSpacing: "var(--tracking-widest)" }}>
          {String(projects.length).padStart(2, "0")} Entries
        </span>
      </header>

      <ul>
        {projects.map((project) => {
          const inProgress = project.status === "in-progress";
          return (
            <li key={project.id}>
              <Link
                href={`/work/${project.id}`}
                scroll={false}
                className="group hairline-b grid grid-cols-[3rem_1fr] items-center gap-4 py-6 transition-colors duration-300 hover:bg-charcoal/[0.04] md:grid-cols-[4rem_1fr_auto_auto_auto] md:gap-8 md:px-2"
                style={inProgress ? { borderBottomStyle: "dashed" } : undefined}
              >
                <span
                  className="-mx-1.5 px-1.5 py-0.5 font-mono text-sm text-charcoal/40 transition-colors duration-300 group-hover:bg-accent group-hover:text-charcoal"
                  style={{ letterSpacing: "var(--tracking-wide)" }}
                >
                  {project.ref}
                </span>

                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span
                      className="block font-display text-3xl font-extrabold uppercase text-charcoal transition-transform duration-300 group-hover:translate-x-1.5 md:text-4xl"
                      style={{ letterSpacing: "var(--tracking-tight)" }}
                    >
                      {project.title}
                    </span>
                    {inProgress && (
                      <span
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-charcoal/50"
                        style={{ letterSpacing: "var(--tracking-widest)" }}
                      >
                        <span className="h-1.5 w-1.5 animate-pulse bg-accent" aria-hidden />
                        In Progress
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block truncate font-sans text-sm text-charcoal/50 md:hidden">
                    {project.summary}
                  </span>
                </span>

                <span className="hidden font-mono text-xs uppercase text-charcoal/50 md:block" style={{ letterSpacing: "var(--tracking-wide)" }}>
                  {project.discipline.join(" / ")}
                </span>

                <span className="hidden font-mono text-xs text-charcoal/40 md:block">{project.year}</span>

                <span className="hidden text-charcoal/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-deep md:block">
                  <ArrowUpRight size={20} strokeWidth={1.5} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
