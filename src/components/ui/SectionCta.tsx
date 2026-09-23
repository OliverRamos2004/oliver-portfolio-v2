"use client";

import type { MouseEvent, ReactNode } from "react";
import { useLenis } from "@/components/layout/SmoothScrollProvider";
import { Button } from "@/components/ui/Button";

/** Thin hairline-bounded strip for a scattered row of CTA buttons between sections. */
export function SectionCta({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-10 md:px-8">
      {children}
    </div>
  );
}

/** Button variant of Wayfinding's in-page jump-link — smooth-scrolls to a section id. */
export function JumpButton({ target, children }: { target: string; children: ReactNode }) {
  const lenis = useLenis();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const el = document.querySelector(target);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -24 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <Button href={target} onClick={handleClick}>
      {children}
    </Button>
  );
}
