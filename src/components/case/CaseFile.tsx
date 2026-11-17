"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import type { ProjectEntry, ProjectMedia } from "@/types/project";
import type { PrdEntry } from "@/types/prd";
import type { CaseStep } from "@/lib/caseNav";
import { Icon } from "@/components/ui/Icon";
import { PrdSection } from "@/components/drawer/PrdSection";
import styles from "./case.module.css";

export type CaseLayout = "a" | "b" | "c";

const EASE = [0.7, 0, 0.2, 1] as const;

const STATUS: Record<ProjectEntry["status"], string> = {
  live: "Live",
  archived: "Archived",
  "in-progress": "Building",
};

interface CaseFileProps {
  layout: CaseLayout;
  project: ProjectEntry;
  prd?: PrdEntry;
  name: string;
  prev: CaseStep;
  next: CaseStep;
  /** true when opened over the home page (intercepted route): close goes back. */
  isOverlay: boolean;
}

/**
 * The case file, restyled (2026-11-16 lab). Three layouts share one header,
 * the facts, the links and the PRD:
 *   A: the name fills the first screen, shots run full bleed, then facts | story.
 *   B: name + facts pinned left, shots bled down the right half.
 *   C: a contact sheet of every shot (lightbox on click), PRD folded.
 */
export function CaseFile({ layout, project, prd, name, prev, next, isOverlay }: CaseFileProps) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const tone = project.part === "craft" ? "ink" : "paper";
  const [lightbox, setLightbox] = useState<number | null>(null);
  const lightboxOpen = lightbox !== null;

  const close = useCallback(() => {
    if (isOverlay) router.back();
    else router.push("/#work");
  }, [isOverlay, router]);

  useEffect(() => {
    document.body.dataset.drawerOpen = "true";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !document.body.dataset.lightbox) close();
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
  const status = project.statusLabel ?? STATUS[project.status];

  const facts = (
    <dl className={styles.facts}>
      <dt>Role</dt>
      <dd>{project.role}</dd>
      <dt>Year</dt>
      <dd>{project.status === "in-progress" ? `${project.year}, building` : project.year}</dd>
      <dt>Stack</dt>
      <dd>{project.stack.join(", ")}</dd>
      <dt>Status</dt>
      <dd>{status}</dd>
    </dl>
  );

  const linkRow = links.length > 0 && (
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
  );

  const story = (
    <div className={styles.story}>
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
    </div>
  );

  const prdBlock = prd && (
    <div className={styles.prd}>
      <PrdSection prd={prd} onInk={tone === "ink"} isPage />
    </div>
  );

  let body: ReactNode;
  if (layout === "a") {
    body = (
      <>
        <header className={styles.heroA}>
          <FitTitle text={name} className={styles.titleA} />
          <div className={styles.heroFoot}>
            {project.dek && <p className={styles.dek}>{project.dek}</p>}
            <p className={styles.heroMeta}>
              {project.kind ?? project.discipline[0]}, {project.status === "in-progress" ? "building" : project.year}
            </p>
          </div>
        </header>
        <section aria-label="Screens" className={styles.bleed}>
          {desktop.map((m, i) => (
            <Shot key={m.src} m={m} priority={i === 0} sizes="100vw" />
          ))}
          {phones.length > 0 && <PhoneRow media={phones} />}
        </section>
        <div className={styles.split}>
          <aside className={styles.splitSide}>
            {facts}
            {linkRow}
          </aside>
          <div>
            {story}
            {prdBlock}
          </div>
        </div>
      </>
    );
  } else if (layout === "b") {
    body = (
      <div className={styles.gridB}>
        <aside className={styles.pinB}>
          <FitTitle text={name} className={styles.titleB} />
          <div className={styles.pinFoot}>
            {project.dek && <p className={styles.dek}>{project.dek}</p>}
            {facts}
            {linkRow}
          </div>
        </aside>
        <div className={styles.flowB}>
          <section aria-label="Screens" className={styles.shotsB}>
            {desktop.map((m, i) => (
              <Shot key={m.src} m={m} priority={i === 0} sizes="(min-width: 900px) 50vw, 100vw" />
            ))}
            {phones.length > 0 && <PhoneRow media={phones} />}
          </section>
          <div className={styles.flowText}>
            {story}
            {prdBlock}
          </div>
        </div>
      </div>
    );
  } else {
    body = (
      <>
        <header className={styles.headC}>
          <FitTitle text={name} className={styles.titleC} />
          <div className={styles.headFoot}>
            {project.dek && <p className={styles.dek}>{project.dek}</p>}
            {facts}
          </div>
        </header>
        <section aria-label="Screens" className={styles.sheetC}>
          {project.media.map((m, i) => (
            <button
              key={m.src}
              type="button"
              className={styles.cell}
              data-device={m.device ?? "desktop"}
              data-cursor="View"
              onClick={() => setLightbox(i)}
              aria-label={`Open ${m.caption ?? m.alt}`}
            >
              <span className={styles.cellImg} style={{ aspectRatio: m.device === "phone" ? 600 / 1151 : 1600 / 1083 }}>
                <Image src={m.src} alt="" fill sizes="(min-width: 900px) 25vw, 50vw" className={styles.contain} priority={i < 2} />
              </span>
              <span className={styles.cellCap}>
                <span>{String(i + 1).padStart(2, "0")}</span> {m.caption ?? m.alt}
              </span>
            </button>
          ))}
        </section>
        <div className={styles.split}>
          <aside className={styles.splitSide}>{linkRow}</aside>
          <div>
            {story}
            {prd && (
              <details className={styles.fold}>
                <summary data-cursor="Open">
                  <span>Product requirements</span>
                  <span aria-hidden="true" className={styles.plus} />
                </summary>
                {prdBlock}
              </details>
            )}
          </div>
        </div>
        {lightboxOpen && (
          <Lightbox media={project.media} index={lightbox} onIndex={setLightbox} onClose={() => setLightbox(null)} />
        )}
      </>
    );
  }

  return (
    <motion.div
      className={styles.case}
      data-tone={tone}
      data-layout={layout}
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
        {isOverlay ? <h2 className="sr-only">{project.title}</h2> : <h1 className="sr-only">{project.title}</h1>}
        {body}
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

  const words = text.split(" ");
  return (
    <p ref={ref} className={`display ${className}`} aria-hidden="true">
      <span data-line className={styles.lineWide}>
        {text}
      </span>
      {words.map((w, i) => (
        <span key={i} data-line className={styles.lineNarrow}>
          {w}
        </span>
      ))}
    </p>
  );
}

function Shot({ m, priority, sizes }: { m: ProjectMedia; priority: boolean; sizes: string }) {
  return (
    <figure className={styles.shot}>
      <span className={styles.shotImg} style={{ aspectRatio: m.aspectRatio }}>
        {m.type === "image" ? (
          <Image src={m.src} alt={m.alt} fill sizes={sizes} priority={priority} className={styles.contain} />
        ) : (
          <video src={m.src} muted loop playsInline autoPlay className={styles.contain} />
        )}
      </span>
      {m.caption && <figcaption>{m.caption}</figcaption>}
    </figure>
  );
}

function PhoneRow({ media }: { media: ProjectMedia[] }) {
  return (
    <div className={styles.phones}>
      {media.map((m) => (
        <figure key={m.src} className={styles.phone}>
          <span className={styles.shotImg} style={{ aspectRatio: m.aspectRatio }}>
            <Image src={m.src} alt={m.alt} fill sizes="(min-width: 900px) 16vw, 45vw" className={styles.contain} />
          </span>
          {m.caption && <figcaption>{m.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function Lightbox({
  media,
  index,
  onIndex,
  onClose,
}: {
  media: ProjectMedia[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const m = media[index];
  const step = useCallback((d: number) => onIndex((index + d + media.length) % media.length), [index, media.length, onIndex]);

  useEffect(() => {
    document.body.dataset.lightbox = "true";
    closeRef.current?.focus({ preventScroll: true });
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      // Let the case file's Esc handler see this key press as "lightbox was open".
      setTimeout(() => delete document.body.dataset.lightbox, 0);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, step]);

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Screenshot">
      <div className={styles.lbBar}>
        <p className={styles.lbCount}>
          {String(index + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
        </p>
        <div className={styles.controls}>
          <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" data-cursor="Back">
            <Icon name="back" className={styles.icon} />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next screenshot" data-cursor="Next">
            <Icon name="next" className={styles.icon} />
          </button>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close screenshot" data-cursor="Close">
            <Icon name="close" className={styles.icon} />
          </button>
        </div>
      </div>
      <div className={styles.lbStage} onClick={onClose}>
        <Image key={m.src} src={m.src} alt={m.alt} fill sizes="100vw" className={styles.contain} />
      </div>
      <p className={styles.lbCap} aria-live="polite">
        {m.caption ?? m.alt}
      </p>
    </div>
  );
}
