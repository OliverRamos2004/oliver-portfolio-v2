"use client";

import { useMemo, useState } from "react";
import type { ArtifactEntry } from "@/types/project";
import { Button } from "@/components/ui/Button";

export function VisualExplorationsGrid({ artifacts }: { artifacts: ArtifactEntry[] }) {
  const categories = useMemo(() => Array.from(new Set(artifacts.map((a) => a.category))), [artifacts]);
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? artifacts.filter((a) => a.category === active) : artifacts;

  return (
    <section id="explorations" className="hairline-t px-4 py-24 md:px-8 md:py-32">
      <header className="mb-10 flex items-baseline justify-between md:mb-14">
        <h2
          className="font-display text-2xl font-bold uppercase text-charcoal md:text-3xl"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Visual Explorations
        </h2>
        <span className="hidden font-mono text-xs uppercase text-charcoal/50 sm:inline" style={{ letterSpacing: "var(--tracking-widest)" }}>
          Artifacts &amp; Fragments
        </span>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        <Button variant="light" active={active === null} onClick={() => setActive(null)}>
          All
        </Button>
        {categories.map((category) => (
          <Button key={category} variant="light" active={active === category} onClick={() => setActive(category)}>
            {category}
          </Button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((artifact, i) => (
          <figure
            key={artifact.id}
            className={`group mb-4 break-inside-avoid border border-hairline-on-light ${i % 3 === 1 ? "sm:mt-10" : ""}`}
          >
            <div
              className="flex items-center justify-center overflow-hidden bg-charcoal/5 font-mono text-[10px] uppercase text-charcoal/35 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              style={{ aspectRatio: artifact.media.aspectRatio }}
            >
              {artifact.media.alt}
            </div>
            <figcaption className="hairline-t flex items-baseline justify-between px-3 py-2.5">
              <span className="font-sans text-sm text-charcoal">{artifact.title}</span>
              <span className="font-mono text-[10px] uppercase text-charcoal/40" style={{ letterSpacing: "var(--tracking-wide)" }}>
                {artifact.medium} — {artifact.year}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
