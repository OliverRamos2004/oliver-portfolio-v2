import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { SideProjectEntry } from "@/types/project";

export function SideProjectsSection({ projects }: { projects: SideProjectEntry[] }) {
  return (
    <section id="side-projects" className="hairline-t px-4 py-24 md:px-8 md:py-32">
      <header className="mb-10 flex items-baseline justify-between hairline-b pb-4 md:mb-14">
        <h2
          className="font-display text-2xl font-bold uppercase text-charcoal md:text-3xl"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Smaller Builds
        </h2>
        <span className="font-mono text-xs uppercase text-charcoal/50" style={{ letterSpacing: "var(--tracking-widest)" }}>
          {String(projects.length).padStart(2, "0")} Entries
        </span>
      </header>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const primaryLink = project.links[0];
          return (
            <a
              key={project.id}
              href={primaryLink?.href}
              target="_blank"
              rel="noreferrer"
              className="group block border border-hairline-on-light transition-colors duration-300 hover:bg-charcoal/[0.02]"
            >
              <div className="relative overflow-hidden bg-charcoal/5" style={{ aspectRatio: project.media.aspectRatio }}>
                <Image
                  src={project.media.src}
                  alt={project.media.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="hairline-t p-4">
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <span
                    className="font-display text-lg font-extrabold uppercase text-charcoal"
                    style={{ letterSpacing: "var(--tracking-tight)" }}
                  >
                    {project.title}
                  </span>
                  <span className="font-mono text-[10px] text-charcoal/40">{project.year}</span>
                </div>

                <p className="mb-3 font-sans text-sm text-charcoal/60">{project.tagline}</p>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="font-mono text-[10px] uppercase text-charcoal/40"
                    style={{ letterSpacing: "var(--tracking-wide)" }}
                  >
                    {project.stack.join(" / ")}
                  </span>
                  {primaryLink && (
                    <span
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase text-charcoal/50 transition-colors duration-300 group-hover:text-accent-deep"
                      style={{ letterSpacing: "var(--tracking-wide)" }}
                    >
                      {primaryLink.label}
                      <ArrowUpRight size={12} strokeWidth={1.5} />
                    </span>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
