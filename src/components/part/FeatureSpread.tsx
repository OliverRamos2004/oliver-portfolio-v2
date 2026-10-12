import Image from "next/image";
import Link from "next/link";
import { anchorId, featureRef, runningHead } from "@/lib/monograph";
import type { ProjectEntry, ProjectMedia } from "@/types/project";

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";

function Shot({ media, onInk, sizes }: { media: ProjectMedia; onInk: boolean; sizes: string }) {
  // Framed device shots have a transparent background: contain them on a stage.
  // Plain screenshots fill their box and crop from the top.
  const framed = media.device !== undefined;
  return (
    <div
      className={`relative w-full ${framed && !onInk ? "bg-paper-sunk" : ""}`}
      style={{ aspectRatio: framed ? "16 / 11" : media.aspectRatio }}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        className={framed ? "object-contain p-[6%]" : "object-cover object-top"}
      />
    </div>
  );
}

/**
 * A feature spread (SPEC §4): hard-cropped image on one side, the number,
 * huge title, one pull-quote and the credits on the other. Sides alternate.
 * The lead feature also shows its phone shot.
 */
export function FeatureSpread({ project, index, lead = false }: { project: ProjectEntry; index: number; lead?: boolean }) {
  const onInk = project.part === "craft";
  const flip = index % 2 === 1;
  const desktop = project.media.find((m) => m.device === "desktop") ?? project.media[0];
  const phone = lead ? project.media.find((m) => m.device === "phone") : undefined;
  const muted = onInk ? "text-paper-muted" : "text-ink-muted";
  const rule = onInk ? "border-rule-on-ink" : "border-rule";
  const stamp = onInk
    ? "hover:bg-signal hover:text-ink focus-visible:bg-signal focus-visible:text-ink"
    : "hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper";

  return (
    <article
      id={anchorId(project.id)}
      aria-labelledby={`${anchorId(project.id)}-title`}
      data-running-head={runningHead(project.part, project.order, project.title)}
      data-running-head-short={featureRef(project)}
      data-tone={onInk ? "ink" : "paper"}
      data-part={project.part}
      className={`grid grid-cols-4 gap-x-4 gap-y-8 border-t ${rule} px-4 py-16 md:grid-cols-12 md:px-10 md:py-24 ${lead ? "md:py-32" : ""}`}
    >
      {/* self-start: grid items stretch to the row, which would drop the phone (anchored to the bottom) far below the stage. */}
      <div className={`relative col-span-4 self-start md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""} ${phone ? "mb-[18%]" : ""}`}>
        {desktop && <Shot media={desktop} onInk={onInk} sizes="(min-width: 768px) 58vw, 100vw" />}
        {phone && (
          // The phone overlaps the desktop stage's bottom-right corner, like a magazine layout.
          <div className="absolute -bottom-[18%] right-[4%] w-[24%]">
            <div className="relative w-full" style={{ aspectRatio: phone.aspectRatio }}>
              <Image src={phone.src} alt={phone.alt} fill sizes="(min-width: 768px) 14vw, 24vw" className="object-contain" />
            </div>
          </div>
        )}
      </div>

      <div className={`col-span-4 flex flex-col md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
        <p className={`${label} ${muted}`}>
          {featureRef(project)}
          {lead && <span className="ml-3">Lead feature</span>}
        </p>
        <h3 id={`${anchorId(project.id)}-title`} className="display mt-4 text-[length:var(--text-d1)]">
          {project.title}
        </h3>
        {project.pullQuote && (
          <blockquote className="mt-8 font-display text-[length:var(--text-quote)] font-medium leading-[1.1] [font-stretch:100%]">
            “{project.pullQuote}”
          </blockquote>
        )}
        <dl className={`mt-10 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t ${rule} pt-4 ${label}`}>
          <dt className={muted}>Role</dt>
          <dd>{project.role}</dd>
          <dt className={muted}>Stack</dt>
          <dd>{project.stack.slice(0, 4).join(" · ")}</dd>
          <dt className={muted}>Year</dt>
          <dd>{project.year}</dd>
        </dl>
        <Link
          href={`/work/${project.id}`}
          scroll={false}
          className={`group mt-8 inline-flex self-start border ${onInk ? "border-paper" : "border-ink"} px-4 py-3 ${label} active:translate-y-px ${stamp}`}
        >
          Open case file
          <span aria-hidden="true" className="ml-3 inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
