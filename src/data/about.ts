import type { TimelineEntry, InterestEntry } from "@/types/about";
import type { GalleryPhoto } from "@/types/gallery";

// Verified against the resume — only dated milestones that are actually confirmed.
// Pre-2025 history (when Wabash started, earlier work) is intentionally left out
// rather than invented; add real entries here once Oliver provides them.
export const timeline: TimelineEntry[] = [
  {
    year: "Sept 2025",
    heading: "Montgomery County Free Clinic",
    body: "Joined as Project Lead & Systems Analyst Intern — led a 3-person team migrating clinical records into a secure PostgreSQL/Supabase environment.",
  },
  {
    year: "Dec 2025",
    heading: "Goes Independent",
    body: "Started an independent technical consulting practice, partnering directly with Austin-area business owners on custom web and platform solutions.",
  },
  {
    year: "Feb 2026",
    heading: "Ramos Lawn Care & Services",
    body: "Took on Operations & Financial Systems Lead — architected the automated financial reporting system the business now runs on across 19 properties.",
  },
  {
    year: "May 2026",
    heading: "B.A. Computer Science",
    body: "Graduating from Wabash College, with coursework in database programming, algorithm design, data science, and data structures.",
  },
  {
    year: "2026",
    heading: "This Site",
    body: "Rebuilt this portfolio from the ground up to reflect the real practice — real projects, real skills, real story.",
  },
];

export const interests: InterestEntry[] = [
  {
    title: "Long-Format Film Photography",
    body: "Shoot mostly on an old manual 35mm body. No particular interest in getting faster at it.",
  },
  {
    title: "Mapping Personal GPS Traces",
    body: "The Untitled (Coordinates) print in Explorations came out of a habit, not a project brief — I've logged almost every walk I've taken since 2024.",
  },
  {
    title: "Restoring Mechanical Keyboards",
    body: "A slow, deliberately non-digital hobby that has nothing to do with the day job, which is exactly the point.",
  },
  {
    title: "Cooking as Systems Thinking",
    body: "The same instinct that makes me want to model a pipeline as an event log makes me insufferable to cook with — I want to know why a recipe works before I'll follow it.",
  },
];

export const aboutPhotos: GalleryPhoto[] = [
  { id: "about-1", src: "/about/01.jpg", alt: "Manual 35mm camera resting on a desk", caption: "Current camera, always within reach", aspectRatio: 4 / 5 },
  { id: "about-2", src: "/about/02.jpg", alt: "Partially disassembled mechanical keyboard", caption: "Mid-restoration — 2026", aspectRatio: 3 / 2 },
  { id: "about-3", src: "/about/03.jpg", alt: "Notebook page with sketched client workflow diagrams", caption: "Studio notebook — 2026", aspectRatio: 4 / 5 },
];
