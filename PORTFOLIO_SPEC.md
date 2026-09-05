# PORTFOLIO_SPEC.md

**Project:** Oliver Ramos — Creative Technologist & Artist, personal portfolio
**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis · Lucide React
**Status:** Scaffolded and verified — `npm run build`, `npm run lint`, and `tsc --noEmit` all pass; home page and `/work/[slug]` routes render correctly.

This document is the architectural record of the site as built at
`oliver-portfolio-v2`, not an aspirational brief — every section below maps to
real files in `src/`. Where the original design brief called for something
Tailwind v4 or App Router does differently today, that deviation is called
out explicitly with the reasoning.

---

## Part 1 — Art Direction & Design Tokens

### 1.1 Color

| Token | Value | Usage |
|---|---|---|
| `--color-obsidian` | `#0D0D0E` | Primary background, near-black but not pure black (keeps hairlines and photography from crushing) |
| `--color-paper` | `#F3F2EE` | Primary foreground / text, off-white "concrete" tone |
| `--color-accent` | `#B4D4E1` | Pastel baby blue — hover states, active tags, drawer header label, external-link icons |
| `--color-accent-deep` | `#A3C7D6` | Pressed/active state of the accent, slightly more saturated |
| `--color-hairline-on-dark` | `rgba(255,255,255,0.12)` | Borders and dividers on the obsidian background |
| `--color-hairline-on-light` | `rgba(0,0,0,0.1)` | Reserved for any future light-surface panels (e.g. printed CV export) |

All five are declared once, in `src/app/globals.css`, inside a Tailwind v4
`@theme` block — Tailwind auto-generates `bg-obsidian`, `text-paper`,
`text-accent`, `border-hairline-on-dark`, etc. directly from these tokens.
There is no separate JS color palette to keep in sync.

**Why obsidian instead of pure `#000`:** pure black against the pastel blue
accent reads flat and digital; `#0D0D0E` has just enough warmth that the
accent looks considered rather than like a default `:hover { color: blue }`.

### 1.2 Typography

| Role | Typeface | Google Fonts name | Why |
|---|---|---|---|
| Display / manifesto | **Big Shoulders** (wght 600–900) | `Big_Shoulders` | Condensed, industrial, high x-height-to-cap ratio — the closest free equivalent to the compressed grotesk faces Acne Studios uses editorially. Condensed width does the "distorted proportion" work on its own; we layer `scaleX`/`scaleY` transforms on top for the hero only. |
| Body / UI | **Inter** (wght 400–500) | `Inter` | Neutral, highly legible at small sizes, doesn't compete with the display face. |
| System / mono | **IBM Plex Mono** (wght 400–500) | `IBM_Plex_Mono` | Used for every "technical" surface: ref numbers, tags, coordinates, the colophon. Reads as a terminal/spec-sheet register, distinct from the editorial body copy. |

All three load via `next/font/google` in `src/app/layout.tsx`, each bound to
a CSS variable (`--font-big-shoulders`, `--font-inter`, `--font-plex-mono`)
that `globals.css` maps to the semantic tokens `--font-display`,
`--font-sans`, `--font-mono`. Components never reference a Google Fonts name
directly — only `font-display` / `font-sans` / `font-mono` utility classes.

**Tracking (letter-spacing) scale**, also in `@theme`:

```css
--tracking-tightest: -0.045em;  /* hero manifesto, huge type needs negative tracking to stay tight */
--tracking-tight:    -0.02em;   /* section headings, index titles */
--tracking-wide:      0.08em;   /* tag chips, stack labels */
--tracking-widest:    0.18em;   /* mono uppercase labels — coordinates, "SYSTEM NOTES" eyebrows */
```

These are applied via inline `style={{ letterSpacing: "var(--tracking-*)" }}`
rather than Tailwind `tracking-*` utilities, so they don't collide with
Tailwind's own default tracking scale and stay a single source of truth.

### 1.3 Borders & Shape

- **Zero border-radius, globally, unconditionally:**
  ```css
  * { border-radius: 0 !important; }
  ```
  This is a deliberate blunt instrument in `globals.css` rather than
  `rounded-none` sprinkled per-component — it guarantees no future component
  (including third-party ones) can accidentally introduce a rounded corner.
- **Hairlines**, never a solid mid-gray border: `.hairline-t` / `.hairline-b`
  utility classes apply `border-{top,bottom}: 1px solid var(--color-hairline-on-dark)`.
  Used to divide the hero from the index, every index row, every drawer
  section, and the colophon.

### 1.4 Noise / Grain Overlay

A fixed, full-viewport, `pointer-events: none` layer using an inline SVG
`feTurbulence` filter as a `background-image` data URI — no image asset,
no extra network request:

```css
.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
}
```

`opacity: 0.05` + `mix-blend-mode: overlay` is the tuned value — high enough
to read as a matte, editorial finish under normal room lighting, low enough
that it never looks like a broken image or JPEG artifacting on close
inspection. Rendered once in the root layout (`NoiseOverlay` component), sits
above all page content (`z-40`) but below the drawer/backdrop (`z-50`).

---

## Part 2 — Information Architecture & Wireframe Breakdown

```
┌─────────────────────────────────────────────────────────┐
│ WAYFINDING BAR (fixed, z-30)                             │
│ 34.0522°N/118.2437°W   INDEX EXPLORATIONS INFO   14:32:07│
├─────────────────────────────────────────────────────────┤
│                                                           │
│   CREATIVE                                               │
│   TECHNOLOGIST      ← scaleX(0.92) scaleY(1.08)          │
│   & ARTIST                                                │
│                                                           │
│   Building systems with the same care usually reserved   │
│   for objects — a practice split between production      │
│   software and generative art. Based in Los Angeles.     │
│ ─────────────────────────────────────────────── hairline │
├─────────────────────────────────────────────────────────┤ id="index"
│ INDEX                                       04 Entries   │
│ ─────────────────────────────────────────────────────── │
│ 01  ATLAS           Generative Systems / Data Viz  2025 ↗│
│ ─────────────────────────────────────────────────────── │
│ 02  PERIMETER       Software Engineering / Systems 2024 ↗│
│ ─────────────────────────────────────────────────────── │
│ 03  RESONANCE       Sound / Kinetic Typography     2024 ↗│
│ ─────────────────────────────────────────────────────── │
│ 04  FIELD NOTES     Physical Computing / Sculpture 2023 ↗│
├─────────────────────────────────────────────────────────┤ id="explorations"
│ VISUAL EXPLORATIONS                Artifacts & Fragments │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                   │
│ │ Artifact │ │          │ │ Artifact │  masonry, 3-col    │
│ │   01     │ │ Artifact │ │   03     │  desktop / 1-col   │
│ └──────────┘ │   02     │ └──────────┘  mobile            │
│ ┌──────────┐ │ (offset) │ ┌──────────┐                   │
│ │ Artifact │ └──────────┘ │ Artifact │                   │
│ │   04     │              │   05     │                   │
│ └──────────┘              └──────────┘                   │
├─────────────────────────────────────────────────────────┤ id="info"
│ COLOPHON                                                  │
│ TOOLCHAIN          TYPE                CONTACT            │
│ Next.js 15         Big Shoulders       Email              │
│ TypeScript         Inter               GitHub             │
│ Tailwind v4        IBM Plex Mono       Instagram          │
│ Motion / Lenis                                            │
│ ─────────────────────────────────────────────── hairline │
│ © 2026 Oliver Ramos. Designed and built in Los Angeles.  │
└─────────────────────────────────────────────────────────┘
```

### 2.1 Wayfinding Bar

Fixed to the viewport top, `z-30`, present on **every** route (home and
`/work/[slug]`) so orientation never breaks when the drawer opens. Three
zones: static coordinates (left, hidden on mobile), jump links to `#index` /
`#explorations` / `#info` (center), live local clock (right, `HH:MM:SS`,
client-rendered to avoid a server/client time mismatch — see
`suppressHydrationWarning` note in Part 4).

### 2.2 Master Index

A single `<ul>` of hairline-divided rows, **not a data table** — no forced
"flagship" row gets special treatment; every entry gets the same ref number
+ title + tags + year + arrow treatment. Desktop shows a 5-column grid (ref,
title, discipline tags, year, arrow-glyph); mobile collapses to 2 columns and
folds the discipline/year into a summary line under the title.

### 2.3 Project Spec Sheet (Drawer)

Slides in from the right edge, `max-w-xl`, full viewport height. **Not a
routed blog template** — see Part 4 for exactly how it avoids that while
still being a real, shareable URL. Content order: ref + close button →
monumental title → metadata `<dl>` (year / role / discipline) → overview
paragraph → stack chips → System Notes (repeatable heading+body blocks,
this is where engineering decisions get argued, not just listed) → media →
external links.

### 2.4 Visual Explorations

CSS-columns masonry (`columns-1 sm:columns-2 lg:columns-3`), not a JS
masonry library — no layout-shift risk, no extra dependency. Every third
item gets a `sm:mt-10` offset to break the grid rhythm intentionally
(the "kinetic" read the brief asked for) without randomizing DOM order.

### 2.5 Colophon

Three-column mono footer: toolchain, type credits, contact — exactly the
three things a technical reader wants and a recruiter never reads, which is
the point.

---

## Part 3 — Project Data Schema & Content

### 3.1 Schema (`src/types/project.ts`)

```ts
export type ProjectStatus = "live" | "archived" | "in-progress";

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt: string;
  aspectRatio: number; // reserves layout space before media loads
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface SystemNote {
  heading: string;
  body: string;
}

export interface ProjectEntry {
  id: string;              // slug, used as the URL segment
  ref: string;              // zero-padded ledger ref, e.g. "01"
  title: string;
  year: number;
  discipline: string[];
  stack: string[];
  role: string;
  status: ProjectStatus;
  summary: string;          // one-line, index row
  overview: string;         // longer editorial copy, drawer top
  systemNotes: SystemNote[]; // architecture/decision breakdown
  links: ProjectLink[];
  media: ProjectMedia[];
}

export interface ArtifactEntry {
  id: string;
  title: string;
  year: number;
  medium: string;
  note: string;
  media: ProjectMedia;
}
```

No `featured` or `priority` field exists on purpose — the brief explicitly
rejected a forced-flagship bias, and sort order in `src/data/projects.ts` is
just array order, which the ledger renders as-is.

### 3.2 Content (`src/data/projects.ts`)

Four entries are seeded, deliberately mixing pure software engineering with
art/hardware practice so the index doesn't read as either a dev resume or an
art-school portfolio alone:

1. **ATLAS** (`01`, 2025) — Generative Systems / Data Visualization. A
   transit-data-driven kinetic-typography installation (Rust ingest service
   → WebSocket → WebGL SDF glyph shader). System Notes cover the data
   pipeline, the rendering approach, and a real hardware constraint (1.8ms/frame
   GPU budget) that justified the SDF choice over canvas/DOM text.
2. **PERIMETER** (`02`, 2024) — Software Engineering / Systems Architecture.
   A cross-border inventory ledger for independent fashion labels
   (Next.js, PostgreSQL, Prisma, Temporal). System Notes cover the
   append-only event-log consistency model, Temporal-based workflow
   orchestration, and a UI decision (paper-ledger visual grammar over a
   dashboard) grounded in who the actual users are.
3. **RESONANCE** (`03`, 2024) — Sound / Kinetic Typography / Creative
   Coding. Voice input rendered as a distorting typographic waveform
   (Web Audio autocorrelation pitch detection, canvas displacement-map
   glyph warping, zero external DSP dependency).
4. **FIELD NOTES** (`04`, 2023) — Physical Computing / Data Sculpture. A
   stepper-motor sculpture that bends steel wire to trace a week of local
   weather, deliberately screen-free and ephemeral, with photographic
   archival as the only persistent record.

Every entry follows the same "one real technical constraint or decision per
System Note" rule — this is what keeps the copy from reading like generic
resume bullet points ("built a dashboard using React") while still proving
engineering depth.

### 3.3 Visual Explorations Content (`src/data/artifacts.ts`)

Six lighter-weight artifacts (generative print, physical computing loop,
sound visualization, type specimen, unreleased video) — intentionally
smaller in scope than the four main projects, feeding the masonry grid.

---

## Part 4 — Component Architecture

### 4.1 Component Tree

```
app/layout.tsx                          (root: fonts, SmoothScrollProvider, NoiseOverlay)
├── app/page.tsx                        (home)
│   ├── components/layout/Wayfinding.tsx
│   ├── components/hero/HeroManifesto.tsx
│   ├── components/index/ProjectIndexTable.tsx
│   ├── components/explorations/VisualExplorationsGrid.tsx
│   └── components/layout/Colophon.tsx
├── app/@modal/default.tsx              (parallel slot fallback → null)
├── app/@modal/(.)work/[slug]/page.tsx  (INTERCEPTED route → overlay drawer)
│   └── components/drawer/ProjectDrawer.tsx  (isOverlay=true)
└── app/work/[slug]/page.tsx            (direct-nav fallback → full page)
    ├── components/layout/Wayfinding.tsx
    └── components/drawer/ProjectDrawer.tsx  (isOverlay=false)
```

### 4.2 State management for the drawer — routing, not `useState`

The brief asked for a slide-out that "does not route to a generic blog
template" while preserving scroll state. Rather than a React Context flag
(`isOpen` / `activeProject`), this is built with **Next.js App Router
intercepting + parallel routes** — the idiomatic App Router answer to
exactly this problem (it's the same pattern behind e.g. Instagram-style
photo modals):

- `app/@modal/default.tsx` renders `null` — the parallel `modal` slot is
  empty on any route that doesn't match it.
- `app/@modal/(.)work/[slug]/page.tsx` **intercepts** navigation to
  `/work/[slug]` when the link is clicked from a sibling route (the home
  page) — Next renders this into the `modal` slot *on top of* the
  still-mounted home page, instead of replacing it. This is what gives you
  "scroll position preserved" for free: the index page never unmounts.
- `app/work/[slug]/page.tsx` is the **non-intercepted** version of the same
  route — a hard refresh, a shared link, or a direct visit renders this
  full-bleed standalone page instead, so the project is never a dead end.
- `<Link href={`/work/${project.id}`} scroll={false}>` in
  `ProjectIndexTable.tsx` — `scroll={false}` is required even with
  interception, otherwise Next's default scroll-to-top-of-new-route
  behavior would still fight the "preserve scroll" requirement.
- Closing calls `router.back()` (overlay) or `router.push("/")` (standalone
  fallback) from inside `ProjectDrawer.tsx`.

**Trade-off documented for transparency:** this is more moving parts than a
`useState`-driven modal. It's worth it here specifically because the brief
asked for real, shareable per-project URLs (`/work/atlas`) *and* an overlay
UX — a Context-based modal can't give you both without manually
synchronizing `router.push` + local state, which is more fragile than
delegating to the router's own reconciliation. If you later decide you don't
need shareable URLs, collapsing this to a Context provider is a valid
simplification.

### 4.3 Lenis (smooth scroll)

`components/layout/SmoothScrollProvider.tsx` is a client component wrapping
the whole app in `layout.tsx`. It owns the Lenis instance and its own
`requestAnimationFrame` loop, and exposes the instance via a
`useLenis()` hook so any component can call `lenis.scrollTo(...)` (used by
`Wayfinding`'s jump links) or `lenis.stop()` / `lenis.start()` (used by
`ProjectDrawer` to freeze background scroll while the overlay is open,
alongside the `body[data-drawer-open="true"] { overflow: hidden }` CSS rule
for the scrollbar itself).

### 4.4 Motion (Framer Motion) configs

All transitions use the same "expo out" cubic-bezier — deliberately not a
spring, per the brief's "no cartoony bouncing" instruction:

```ts
const EASE_CRISP = [0.76, 0, 0.24, 1] as const;
```

- **Hero manifesto** (`HeroManifesto.tsx`): each line sits inside an
  `overflow-hidden` wrapper and animates `y: "110%" → "0%"`, staggered
  `0.09s` apart, `0.9s` duration — a clip-reveal, not a fade.
- **Drawer panel** (`ProjectDrawer.tsx`): `x: "100%" → "0%"`, `0.55s`,
  `EASE_CRISP` — a hard, deliberate slide, not an elastic pop.
- **Backdrop**: opacity `0 → 1`, `0.4s`, same easing curve, so it settles
  fractionally before the panel finishes (feels like weight, not delay).

### 4.5 Hydration-sensitive spots

- **Wayfinding's clock** renders `"--:--:--"` on the server and the real
  time only after mount, with `suppressHydrationWarning` — the standard,
  correct way to handle a client-only value in the App Router without
  fighting React's hydration diffing.

---

## Part 5 — Production Code

The following files are the load-bearing scaffolds. Full versions live in
the repo; excerpted here are the parts a reviewer would actually check.

### 5.1 Design tokens (`src/app/globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-obsidian: #0d0d0e;
  --color-paper: #f3f2ee;
  --color-accent: #b4d4e1;
  --color-accent-deep: #a3c7d6;
  --color-hairline-on-dark: rgba(255, 255, 255, 0.12);
  --color-hairline-on-light: rgba(0, 0, 0, 0.1);

  --font-display: var(--font-big-shoulders), "Arial Narrow", sans-serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-plex-mono), "SFMono-Regular", monospace;

  --tracking-tightest: -0.045em;
  --tracking-tight: -0.02em;
  --tracking-wide: 0.08em;
  --tracking-widest: 0.18em;

  --ease-crisp: cubic-bezier(0.76, 0, 0.24, 1);
}

* { border-radius: 0 !important; }

html { background: var(--color-obsidian); color-scheme: dark; }

body {
  background: var(--color-obsidian);
  color: var(--color-paper);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--color-accent); color: var(--color-obsidian); }

.noise-overlay {
  position: fixed; inset: 0; z-index: 40; pointer-events: none;
  opacity: 0.05; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
}

.hairline-b { border-bottom: 1px solid var(--color-hairline-on-dark); }
.hairline-t { border-top: 1px solid var(--color-hairline-on-dark); }

body[data-drawer-open="true"] { overflow: hidden; }
```

*(Why no `tailwind.config.ts`: Tailwind v4's idiomatic config surface is CSS
itself via `@theme` — the JS config file from v3 is legacy in v4 projects
scaffolded with the current `create-next-app`. Introducing one here would
just be a second, competing source of truth.)*

### 5.2 `ProjectIndexTable` (`src/components/index/ProjectIndexTable.tsx`)

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectEntry } from "@/types/project";

export function ProjectIndexTable({ projects }: { projects: ProjectEntry[] }) {
  return (
    <section id="index" className="px-4 py-24 md:px-8 md:py-32">
      <header className="mb-10 flex items-baseline justify-between hairline-b pb-4 md:mb-14">
        <h2 className="font-display text-2xl font-bold uppercase text-paper md:text-3xl"
            style={{ letterSpacing: "var(--tracking-tight)" }}>
          Index
        </h2>
        <span className="font-mono text-xs uppercase text-paper/50"
              style={{ letterSpacing: "var(--tracking-widest)" }}>
          {String(projects.length).padStart(2, "0")} Entries
        </span>
      </header>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              href={`/work/${project.id}`}
              scroll={false}
              className="group hairline-b grid grid-cols-[3rem_1fr] items-center gap-4 py-6
                         transition-colors duration-300 hover:bg-paper/[0.03]
                         md:grid-cols-[4rem_1fr_auto_auto_auto] md:gap-8 md:px-2"
            >
              <span className="font-mono text-sm text-paper/40 transition-colors duration-300 group-hover:text-accent"
                    style={{ letterSpacing: "var(--tracking-wide)" }}>
                {project.ref}
              </span>

              <span className="min-w-0">
                <span className="block font-display text-3xl font-extrabold uppercase text-paper
                                  transition-transform duration-300 group-hover:translate-x-1.5 md:text-4xl"
                      style={{ letterSpacing: "var(--tracking-tight)" }}>
                  {project.title}
                </span>
                <span className="mt-1 block truncate font-sans text-sm text-paper/50 md:hidden">
                  {project.summary}
                </span>
              </span>

              <span className="hidden font-mono text-xs uppercase text-paper/50 md:block"
                    style={{ letterSpacing: "var(--tracking-wide)" }}>
                {project.discipline.join(" / ")}
              </span>

              <span className="hidden font-mono text-xs text-paper/40 md:block">{project.year}</span>

              <span className="hidden text-paper/30 transition-all duration-300
                                group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block">
                <ArrowUpRight size={20} strokeWidth={1.5} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

Hover state is CSS-only (`group` / `group-hover:`) rather than
Motion/JS-driven — a table with dozens of future entries should never pay a
JS listener cost per row for a color/translate change.

### 5.3 `ProjectDrawer` (`src/components/drawer/ProjectDrawer.tsx`)

```tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
import type { ProjectEntry } from "@/types/project";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

const EASE_CRISP = [0.76, 0, 0.24, 1] as const;

interface ProjectDrawerProps {
  project: ProjectEntry;
  isOverlay: boolean; // true = intercepted overlay, false = standalone fallback page
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
    isOverlay ? router.back() : router.push("/");
  }

  const content = (/* header, metadata, overview, stack chips, system notes,
                        media grid, links — see full file */ null);

  if (!isOverlay) return <div className="min-h-screen">{content}</div>;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_CRISP }}
        onClick={close}
        className="fixed inset-0 z-50 bg-obsidian/70"
      />
      <motion.div
        key="panel"
        initial={{ x: "100%" }} animate={{ x: "0%" }} exit={{ x: "100%" }}
        transition={{ duration: 0.55, ease: EASE_CRISP }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-xl border-l border-hairline-on-dark shadow-2xl"
        role="dialog" aria-modal="true" aria-label={`${project.title} spec sheet`}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}
```

*(The `content` body is elided above for length — the real file at
`src/components/drawer/ProjectDrawer.tsx` renders the full header / metadata
`<dl>` / overview / stack chips / System Notes / media grid / links exactly
as wireframed in Part 2.3.)*

The routing glue that makes this an overlay-with-a-real-URL rather than a
plain modal:

```tsx
// src/app/@modal/(.)work/[slug]/page.tsx  — INTERCEPTED route
export default async function InterceptedWorkModal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();
  return <ProjectDrawer project={project} isOverlay />;
}

// src/app/work/[slug]/page.tsx  — direct-nav fallback, same data, full page
export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();
  return (<><Wayfinding /><ProjectDrawer project={project} isOverlay={false} /></>);
}
```

---

## Verified

```
npm run build   # ✓ compiles, ✓ typechecks, ✓ generates 4 static /work/* pages
npm run lint    # ✓ no errors
npm run dev     # ✓ home page and /work/atlas both return 200, no hydration errors
```

## Next steps (not yet built)

- Real photography/video assets to replace the labeled placeholder blocks in
  `ProjectDrawer` and `VisualExplorationsGrid` (currently `aspectRatio`-boxed
  divs, so swapping in `next/image` / `<video>` is a drop-in change).
- A `robots.txt` / `sitemap.ts` and Open Graph image once real content and a
  domain are decided.
- Deployment (Vercel is the natural target given `next.config.ts` is already
  present and untouched).
