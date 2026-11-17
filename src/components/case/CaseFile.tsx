"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import type { ProjectEntry, ProjectMedia } from "@/types/project";
import type { PrdEntry } from "@/types/prd";
import type { CaseStep } from "@/lib/caseNav";
import { Icon } from "@/components/ui/Icon";
import { PrdSection } from "./PrdSection";
import styles from "./case.module.css";

const EASE = [0.7, 0, 0.2, 1] as const;

const STATUS: Record<ProjectEntry["status"], string> = {
  live: "Live",
  archived: "Archived",
  "in-progress": "Building",
};

interface CaseFileProps {
  project: ProjectEntry;
  prd?: PrdEntry;
  name: string;
  prev: CaseStep;
  next: CaseStep;
  /** true when opened over the home page (intercepted route): close goes back. */
  isOverlay: boolean;
}

/**
 * The case file (2026-11-16, layout B of the lab): the name, dek, facts and
 * links stay pinned on the left half while the shots bleed down the right
 * half, then the story and PRD. Same header as the home sheets; it ends on
 * the next project's name. Full screen in both contexts: over the home page
 * on in-site clicks (the intercepted @modal route), alone on direct links.
 */
export function CaseFile({ project, prd, name, prev, next, isOverlay }: CaseFileProps) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const tone = project.part === "craft" ? "ink" : "paper";

  const close = useCallback(() => {
    if (isOverlay) router.back();
    else router.push("/#work");
  }, [isOverlay, router]);

  useEffect(() => {
    // Locks body scroll and tells HomeMenu to leave Esc / arrows to us.
    document.body.dataset.drawerOpen = "true";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      delete document.body.dataset.drawerOpen;
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  const desktop = project.media.filter((m) => m.device !== "phone");
  const phones = project.media.filter((m) => m.device === "phone");
  // PRD links that duplicate a project link are shown once.
  const links = [...project.links, ...(prd?.links ?? []).filter((l) => !project.links.some((p) => p.href === l.href))];
  const Title = isOverlay ? "h2" : "h1";

  return (
    <motion.div
      className={styles.case}
      data-tone={tone}
      role={isOverlay ? "dialog" : undefined}
      aria-modal={isOverlay ? true : undefined}
      aria-label={`${name} case file`}
      initial={isOverlay && !reduce ? { y: "101%" } : false}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className={styles.bar}>
        <Link href="/#work" className={styles.where} data-cursor="Work">
          Work
        </Link>
        <div className={styles.controls}>
          <Link href={prev.href} replace={isOverlay} scroll={false} data-cursor={prev.label} aria-label={`Back: ${prev.label}`}>
            <Icon name="back" className={styles.icon} />
          </Link>
          <Link href={next.href} replace={isOverlay} scroll={false} data-cursor={next.label} aria-label={`Next: ${next.label}`}>
            <Icon name="next" className={styles.icon} />
          </Link>
          <button type="button" onClick={close} data-cursor="Close" aria-label={`Close ${name}`}>
            <Icon name="close" className={styles.icon} />
          </button>
        </div>
      </div>

      <div className={styles.scroll}>
        <div className={styles.grid}>
          <aside className={styles.pin}>
            <Title className="sr-only">{project.title}</Title>
            <FitTitle text={name} className={styles.title} />
            <div className={styles.pinFoot}>
              {project.dek && <p className={styles.dek}>{project.dek}</p>}
              <dl className={styles.facts}>
                <dt>Role</dt>
                <dd>{project.role}</dd>
                <dt>Year</dt>
                <dd>{project.status === "in-progress" ? `${project.year}, building` : project.year}</dd>
                <dt>Stack</dt>
                <dd>{project.stack.join(", ")}</dd>
                <dt>Status</dt>
                <dd>{project.statusLabel ?? STATUS[project.status]}</dd>
              </dl>
              {links.length > 0 && (
                <ul className={styles.links}>
                  {links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className={styles.btn} data-cursor="↗">
                        {l.label}
                        <Icon name="out" className={styles.out} />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>

          <div className={styles.flow}>
            <section aria-label="Screens" className={styles.shots}>
              {desktop.map((m, i) => (
                <Shot key={m.src} m={m} priority={i === 0} />
              ))}
              {phones.length > 0 && (
                <div className={styles.phones}>
                  {phones.map((m) => (
                    <figure key={m.src} className={styles.phone}>
                      <span className={styles.shotImg} style={{ aspectRatio: m.aspectRatio }}>
                        <Image src={m.src} alt={m.alt} fill sizes="(min-width: 900px) 16vw, 45vw" className={styles.contain} />
                      </span>
                      {m.caption && <figcaption>{m.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              )}
            </section>

            <div className={styles.text}>
              <p className={styles.lede}>{project.overview}</p>
              {project.systemNotes.length > 0 && (
                <ol className={styles.notes}>
                  {project.systemNotes.map((n, i) => (
                    <li key={n.heading}>
                      <span aria-hidden="true" className={styles.num}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className={styles.noteHead}>{n.heading}</h3>
                        <p>{n.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
              {prd && <PrdSection prd={prd} onInk={tone === "ink"} isPage />}
            </div>
          </div>
        </div>

        <p className={styles.end}>
          <Link href={next.href} replace={isOverlay} scroll={false} data-cursor="Next">
            <span className={styles.endLabel}>Next</span>
            <span className={styles.endName}>{next.label}</span>
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

/** One display line per word on narrow screens, one line on wide ones; each line is sized to the box width. */
function FitTitle({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const box = ref.current;
    if (!box) return;
    const fit = () => {
      const w = box.clientWidth;
      box.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
        el.style.fontSize = "100px";
        const natural = el.scrollWidth || 1;
        el.style.fontSize = `${Math.floor((w / natural) * 100 * 0.995)}px`;
      });
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
  }, [text]);

  return (
    <p ref={ref} className={`display ${className}`} aria-hidden="true">
      <span data-line className={styles.lineWide}>
        {text}
      </span>
      {text.split(" ").map((w, i) => (
        <span key={i} data-line className={styles.lineNarrow}>
          {w}
        </span>
      ))}
    </p>
  );
}

function Shot({ m, priority }: { m: ProjectMedia; priority: boolean }) {
  return (
    <figure className={styles.shot}>
      <span className={styles.shotImg} style={{ aspectRatio: m.aspectRatio }}>
        {m.type === "image" ? (
          <Image src={m.src} alt={m.alt} fill sizes="(min-width: 900px) 50vw, 100vw" priority={priority} className={styles.contain} />
        ) : (
          <video src={m.src} muted loop playsInline autoPlay className={styles.contain} />
        )}
      </span>
      {m.caption && <figcaption>{m.caption}</figcaption>}
    </figure>
  );
}
