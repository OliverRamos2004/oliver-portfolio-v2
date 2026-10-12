"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import type { ProjectEntry } from "@/types/project";
import { prds } from "@/data/prds";
import { caseFileRef } from "@/lib/monograph";
import { ProjectGallery } from "./ProjectGallery";
import { PrdSection } from "./PrdSection";

const EASE_CRISP = [0.76, 0, 0.24, 1] as const;
const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ProjectDrawerProps {
  project: ProjectEntry;
  /** true when rendered as the intercepted overlay (has a background page to return to) */
  isOverlay: boolean;
}

const STATUS: Record<ProjectEntry["status"], string> = {
  live: "Live",
  archived: "Archived",
  "in-progress": "Building",
};

/**
 * The case file (SPEC §4): a drawer over the issue on in-site clicks (the
 * intercepted @modal route), a full page on direct links. Its tone follows
 * the project's part — paper for Systems, ink for Craft — and it carries the
 * project's PRD, when one exists, at #prd.
 */
export function ProjectDrawer({ project, isOverlay }: ProjectDrawerProps) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const onInk = project.part === "craft";
  const ref = caseFileRef(project);
  const prd = project.prdId ? prds.find((p) => p.id === project.prdId) : undefined;

  useEffect(() => {
    if (!isOverlay) return;
    const panel = panelRef.current;
    // Return focus to whatever opened the drawer (the spread's link) on close.
    const opener = document.activeElement as HTMLElement | null;

    document.body.dataset.drawerOpen = "true";
    panel?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        router.back();
        return;
      }
      // Focus trap: Tab cycles inside the panel.
      if (e.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      delete document.body.dataset.drawerOpen;
      window.removeEventListener("keydown", onKeyDown);
      opener?.focus({ preventScroll: true });
    };
  }, [isOverlay, router]);

  const surface = onInk ? "bg-ink text-paper" : "bg-paper text-ink";
  const muted = onInk ? "text-paper-muted" : "text-ink-muted";
  const rule = onInk ? "border-rule-on-ink" : "border-rule";
  const stamp = onInk
    ? "hover:bg-signal hover:text-ink focus-visible:bg-signal focus-visible:text-ink"
    : "hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper";
  const body = "text-[15px] leading-[1.6] max-md:text-[14px]";

  // 2+ shots open on a gallery; a lone screenshot sits at the bottom instead.
  const hasGallery = project.media.length > 1;
  // One h1 per page: the case file is the page on a direct link, a section of the issue in the drawer.
  const Title = isOverlay ? "h2" : "h1";
  // Section and note headings sit one and two levels below the title.
  const SectionHeading = isOverlay ? "h3" : "h2";
  const NoteHeading = isOverlay ? "h4" : "h3";
  // PRD links that duplicate a project link (same GitHub repo) are shown once.
  const links = [...project.links, ...(prd?.links ?? []).filter((l) => !project.links.some((p) => p.href === l.href))];

  const content = (
    <div className={`flex h-full flex-col ${surface}`}>
      <header className={`flex shrink-0 items-center justify-between gap-4 border-b ${rule} px-4 py-3 md:px-10`}>
        <p className={label}>
          <span aria-hidden="true" className="mr-2 inline-block h-2 w-2 bg-signal" />
          Case file · {ref}
        </p>
        {isOverlay ? (
          <button type="button" onClick={() => router.back()} className={`${label} px-2 py-1 ${stamp}`}>
            Close <span aria-hidden="true">✕</span>
          </button>
        ) : (
          <Link href="/" className={`${label} px-2 py-1 ${stamp}`}>
            <span aria-hidden="true">←</span> The issue
          </Link>
        )}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-8 md:px-10 md:py-12">
        {hasGallery && <ProjectGallery media={project.media} title={project.title} onInk={onInk} />}

        <p className={`${label} ${muted} ${hasGallery ? "mt-10" : ""}`}>
          {ref} · {project.statusLabel ?? STATUS[project.status]}
        </p>
        <Title className="display mt-3 text-[length:var(--text-d2)]">{project.title}</Title>

        {project.pullQuote && (
          <blockquote className="mt-6 font-display text-[length:var(--text-quote)] font-medium leading-[1.1] [font-stretch:100%]">
            “{project.pullQuote}”
          </blockquote>
        )}

        <dl className={`mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t ${rule} pt-4 ${label}`}>
          <dt className={muted}>Role</dt>
          <dd>{project.role}</dd>
          <dt className={muted}>Year</dt>
          <dd>{project.year}</dd>
          <dt className={muted}>Discipline</dt>
          <dd>{project.discipline.join(" · ")}</dd>
          <dt className={muted}>Stack</dt>
          <dd>{project.stack.join(" · ")}</dd>
        </dl>

        <p className={`mt-8 max-w-2xl ${body}`}>{project.overview}</p>

        <section aria-labelledby="system-notes" className={`mt-12 border-t ${rule} pt-6`}>
          <SectionHeading id="system-notes" className={`${label} ${muted}`}>
            System notes
          </SectionHeading>
          <ol className="mt-6 grid gap-8">
            {project.systemNotes.map((note, i) => (
              <li key={note.heading} className="grid grid-cols-[2.5rem_1fr] gap-x-2">
                <span aria-hidden="true" className={`${label} pt-1 ${onInk ? "text-signal" : "text-ink"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <NoteHeading className="font-display text-xl font-semibold uppercase leading-tight [font-stretch:80%]">{note.heading}</NoteHeading>
                  <p className={`mt-2 max-w-2xl ${body} ${muted}`}>{note.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {project.media.length === 1 && (
          <div className={`mt-12 grid gap-4 border-t ${rule} pt-8 sm:grid-cols-2`}>
            {project.media.map((m) => (
              <div
                key={m.src}
                className={`relative overflow-hidden ${onInk ? "bg-paper/5" : "bg-paper-sunk"}`}
                style={{ aspectRatio: m.aspectRatio }}
              >
                {m.type === "image" ? (
                  <Image src={m.src} alt={m.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                ) : (
                  <video src={m.src} className="h-full w-full object-cover" muted loop playsInline autoPlay />
                )}
              </div>
            ))}
          </div>
        )}

        {prd && <PrdSection prd={prd} onInk={onInk} isPage={!isOverlay} />}

        {links.length > 0 && (
          <ul className={`mt-12 flex flex-wrap gap-2 border-t ${rule} pt-6`}>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex border ${onInk ? "border-paper" : "border-ink"} px-4 py-3 ${label} active:translate-y-px ${stamp}`}
                >
                  {link.label}
                  <span aria-hidden="true" className="ml-3 inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  if (!isOverlay) {
    // Full page: sits under the fixed running head, which reads its label from here.
    return (
      <main
        data-running-head={`CASE FILE — ${ref} ${project.title}`}
        data-running-head-short={ref}
        data-tone={onInk ? "ink" : "paper"}
        data-part={project.part}
        className={`min-h-screen pt-12 ${surface}`}
      >
        <div className="mx-auto max-w-3xl">{content}</div>
      </main>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_CRISP }}
        onClick={() => router.back()}
        className="fixed inset-0 z-50 bg-ink/70"
      />
      <motion.div
        key="panel"
        ref={panelRef}
        tabIndex={-1}
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.55, ease: EASE_CRISP }}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-2xl border-l ${rule} outline-none`}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case file`}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}
