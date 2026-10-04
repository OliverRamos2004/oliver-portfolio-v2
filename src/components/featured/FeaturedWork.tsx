import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import type { ProjectEntry, ProjectMedia } from "@/types/project";

interface FeaturedProject {
  project: ProjectEntry;
  desktop: ProjectMedia;
  phone: ProjectMedia;
}

/** featured projects in band order, skipping any that lack a desktop + phone shot */
function pickFeatured(projects: ProjectEntry[]): FeaturedProject[] {
  return projects
    .filter((p) => p.featured !== undefined)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0))
    .flatMap((project) => {
      const desktop = project.media.find((m) => m.device === "desktop");
      const phone = project.media.find((m) => m.device === "phone");
      return desktop && phone ? [{ project, desktop, phone }] : [];
    });
}

export function FeaturedWork({ projects }: { projects: ProjectEntry[] }) {
  const featured = pickFeatured(projects);
  if (featured.length === 0) return null;

  return (
    <section id="work" className="px-4 pt-16 md:px-8 md:pt-24">
      <header className="flex items-baseline justify-between gap-4 hairline-b pb-4">
        <h2
          className="font-display text-2xl font-bold uppercase text-charcoal md:text-3xl"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Selected Work
        </h2>
        <span className="font-mono text-xs uppercase text-charcoal/50 hidden sm:inline" style={{ letterSpacing: "var(--tracking-widest)" }}>
          {String(featured.length).padStart(2, "0")} Case Studies
        </span>
      </header>

      <ul>
        {featured.map(({ project, desktop, phone }, i) => (
          <li key={project.id} className={clsx(i > 0 && "hairline-t")}>
            <FeaturedRow project={project} desktop={desktop} phone={phone} flip={i % 2 === 1} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function FeaturedRow({ project, desktop, phone, flip }: FeaturedProject & { flip: boolean }) {
  const inProgress = project.status === "in-progress";

  return (
    <Link
      href={`/work/${project.id}`}
      scroll={false}
      className="group grid gap-8 py-12 lg:grid-cols-12 lg:items-end lg:gap-14 lg:py-16"
    >
      {/* two columns only from lg: at md a 5-col copy column is narrower than the display titles */}
      <div className={clsx("lg:col-span-5", flip && "lg:order-2")}>
        <span className="font-mono text-[11px] uppercase text-charcoal/40" style={{ letterSpacing: "var(--tracking-widest)" }}>
          {project.ref} — {project.discipline.join(" / ")}
        </span>

        <h3
          className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] text-charcoal md:text-6xl"
          style={{ letterSpacing: "var(--tracking-tightest)" }}
        >
          {project.title}
        </h3>

        <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-charcoal/70">{project.summary}</p>

        <dl
          className="mt-7 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-mono text-[11px] uppercase"
          style={{ letterSpacing: "var(--tracking-wide)" }}
        >
          <dt className="text-charcoal/40">Role</dt>
          <dd className="text-charcoal">{project.role}</dd>
          <dt className="text-charcoal/40">Stack</dt>
          <dd className="text-charcoal">{project.stack.slice(0, 3).join(" · ")}</dd>
          <dt className="text-charcoal/40">Status</dt>
          <dd className="inline-flex items-center gap-1.5 text-charcoal">
            {inProgress && <span className="h-1.5 w-1.5 animate-pulse bg-accent" aria-hidden />}
            {project.statusLabel ?? (inProgress ? "Building" : "Live")}
          </dd>
        </dl>

        <span
          className="mt-8 inline-flex items-center gap-1.5 border-b border-charcoal pb-1 font-mono text-xs uppercase text-charcoal transition-colors duration-300 group-hover:border-accent-deep"
          style={{ letterSpacing: "var(--tracking-wide)" }}
        >
          View case study
          <ArrowUpRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>

      {/* Stage: framed desktop shot with the phone overlapping its lower corner */}
      <div className={clsx("relative lg:col-span-7", flip && "lg:order-1")}>
        <div className="relative border border-hairline-on-light bg-charcoal/[0.045] py-[7%] pl-[5%] pr-[12%] transition-colors duration-500 group-hover:bg-charcoal/[0.07]">
          {/* "Fig." label ties the stage to the drawer's Spec Sheet language */}
          <span
            className="absolute left-3 top-2 font-mono text-[10px] uppercase text-charcoal/40 md:left-4 md:top-3"
            style={{ letterSpacing: "var(--tracking-wide)" }}
          >
            Fig. {project.ref}
            {desktop.caption && ` — ${desktop.caption}`}
          </span>
          <Image
            src={desktop.src}
            alt={desktop.alt}
            width={1600}
            height={Math.round(1600 / desktop.aspectRatio)}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-auto w-full transition-transform duration-500 ease-[var(--ease-crisp)] motion-safe:group-hover:-translate-y-1.5"
          />
        </div>
        <Image
          src={phone.src}
          alt={phone.alt}
          width={600}
          height={Math.round(600 / phone.aspectRatio)}
          sizes="(min-width: 1024px) 12vw, 22vw"
          className="absolute -bottom-[5%] right-[3%] h-auto w-[21%] transition-transform duration-500 ease-[var(--ease-crisp)] motion-safe:group-hover:-translate-y-3"
        />
      </div>
    </Link>
  );
}
