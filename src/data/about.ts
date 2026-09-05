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
    heading: "Freelance Technical Work",
    body: "Started an independent technical consulting practice, partnering directly with Austin-area business owners on custom web and platform solutions.",
  },
  {
    year: "Feb 2026",
    heading: "Ramos Lawn Care & Services",
    body: "Took on Operations & Financial Systems Lead — architected the automated financial reporting system the business now runs on across 19 properties.",
  },
  {
    year: "May 2026",
    heading: "B.A. Computer Science + Studio Art",
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
    title: "Drumming",
    body: "I've been playing drums for over 3 years and I love it. I've played in a few bands and I'm always looking to play more. I enjoy playing Brazilian Jazz, Funk, and Rock.",
  },
  {
    title: "CS Projects",
    body: "On my free time, i have caught a passion for building projects. I am currently working on MatchCut: a web discovery search engine for Barbers and Clients.",
  },
  {
    title: "Barbering",
    body: "Barbering to me is a form of art. On my free time, I enjoy cutting and styling hair. I  have been doing it for over 4 years now.",
  },
  {
    title: "Self Improvement",
    body: "I immerse myself in self improvement by reading books, working out, and always seeking to learn more. My favorite book is Mary Shelley's Frankeinstein.",
  },
];

export const aboutPhotos: GalleryPhoto[] = [
  { id: "about-1", src: "/about/drumset.jpg", alt: "My 4-pc Bop Drumset", caption: "Drumset", aspectRatio: 1200 / 1600 },
  { id: "about-2", src: "/about/barbering.jpg", alt: "Haircut by @CutbyOliver", caption: "Barbering", aspectRatio: 1200 / 1600 },
  { id: "about-3", src: "/about/ramos-grad.JPG", alt: "Oliver as a recent grad", caption: "Graduation — 2026", aspectRatio: 1143 / 1600 },
];
