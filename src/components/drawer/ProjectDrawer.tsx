"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
import type { ProjectEntry } from "@/types/project";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

const EASE_CRISP = [0.76, 0, 0.24, 1] as const;

interface ProjectDrawerProps {
  project: ProjectEntry;
  /** true when rendered as the intercepted overlay (has a background page to return to) */
  isOverlay: boolean;
}

export function ProjectDrawer({ project, isOverlay }: ProjectDrawerProps) {
  const router = useRouter();
  const lenis = useLenis();

  useEffect(() => {
    if (!isOverlay) return;

    document.body.dataset.drawerOpen = "true";
    lenis?.stop();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") router.back();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      delete document.body.dataset.drawerOpen;
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOverlay, router, lenis]);

  function close() {
    if (isOverlay) router.back();
    else router.push("/");
  }

  const content = (
    <div className="flex h-full flex-col bg-charcoal">
      <header className="hairline-b-dark flex items-center justify-between px-6 py-5 md:px-10">
        <span className="font-mono text-xs uppercase text-accent" style={{ letterSpacing: "var(--tracking-widest)" }}>
          Spec Sheet / {project.ref}
        </span>
        <button
          onClick={close}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center text-white/60 transition-colors duration-200 hover:text-white"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </header>

      <div
        data-lenis-prevent
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8 md:px-10 md:py-12"
      >

        <h2
          className="font-display text-5xl font-black uppercase leading-[0.9] text-white md:text-6xl"
          style={{ letterSpacing: "var(--tracking-tightest)" }}
        >
          {project.title}
        </h2>

        {project.status === "in-progress" && (
          <span
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase text-accent"
            style={{ letterSpacing: "var(--tracking-widest)" }}
          >
            <span className="h-1.5 w-1.5 animate-pulse bg-accent" aria-hidden />
            Currently Building
          </span>
        )}

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-xs uppercase text-white/60 md:grid-cols-4" style={{ letterSpacing: "var(--tracking-wide)" }}>
          <div>
            <dt className="text-white/35">Year</dt>
            <dd className="mt-1 text-white">{project.year}</dd>
          </div>
          <div>
            <dt className="text-white/35">Role</dt>
            <dd className="mt-1 text-white">{project.role}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-white/35">Discipline</dt>
            <dd className="mt-1 text-white">{project.discipline.join(", ")}</dd>
          </div>
        </dl>

        <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-white/80">{project.overview}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border border-hairline-on-dark px-3 py-1.5 font-mono text-[11px] uppercase text-white/70"
              style={{ letterSpacing: "var(--tracking-wide)" }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-8 hairline-t-dark pt-8">
          <h3 className="font-mono text-xs uppercase text-accent" style={{ letterSpacing: "var(--tracking-widest)" }}>
            System Notes
          </h3>
          {project.systemNotes.map((note) => (
            <div key={note.heading}>
              <h4 className="font-display text-lg font-bold uppercase text-white">{note.heading}</h4>
              <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-white/70">{note.body}</p>
            </div>
          ))}
        </div>

        {project.media.length > 0 && (
          <div className="mt-12 grid gap-4 hairline-t-dark pt-8 sm:grid-cols-2">
            {project.media.map((m) => (
              <div
                key={m.src}
                className="relative overflow-hidden border border-hairline-on-dark bg-white/5"
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

        {project.links.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-4 hairline-t-dark pt-8">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 font-mono text-xs uppercase text-white transition-colors duration-200 hover:text-accent"
                style={{ letterSpacing: "var(--tracking-wide)" }}
              >
                {link.label}
                <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (!isOverlay) {
    return <div className="min-h-screen bg-charcoal">{content}</div>;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_CRISP }}
        onClick={close}
        className="fixed inset-0 z-50 bg-charcoal/70"
      />
      <motion.div
        key="panel"
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.55, ease: EASE_CRISP }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-xl border-l border-hairline-on-dark shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} spec sheet`}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}
