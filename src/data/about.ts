import type { InterestEntry } from "@/types/about";

/**
 * The About profile (mini-consultation 2026-10-10): Oliver's own words with
 * typos fixed and each block trimmed to 2–3 sentences. His to edit.
 */
export const bio = [
  "I'm Oliver. I have a bachelor's in computer science and an eye for art and design.",
  "I love to build things that are both functional and beautiful, and to solve problems in a way that is practical and efficient. My work is a reflection of my own personal journey.",
];

export const philosophy = {
  lead: "I believe in the continuous pursuit of growth through learning, hands-on experience and community work.",
  quote: "If I am not a different person at the end of the journey than when I started, transformation hasn't really happened.",
};

/** "The studio" on /about. A draft adapted from Malden's mission line; Oliver's to edit. */
export const studio = {
  body: [
    "In 2025 I started Malden Studios, a design and development studio in Austin.",
    "We build websites and headless Shopify storefronts for brands with something to say. YOSI Archive and Back Issue Supply were built there.",
  ],
  image: {
    src: "/studio/malden.jpg",
    alt: "The Malden Studios home page: the wordmark over hot-air balloons at dawn",
    width: 2400,
    height: 1500,
  },
};

export const portrait = {
  src: "/about/hero.jpg",
  alt: "Oliver Ramos in the studio",
  // The file's real size, so the frame always matches the photo (no hand-set ratio).
  width: 2000,
  height: 1371,
};

export const interests: InterestEntry[] = [
  {
    id: "drumming",
    title: "Drumming",
    body: "I've been playing drums for over three years and I love it. I've played in a few bands and I'm always looking to play more: Brazilian jazz, funk and rock.",
    photo: { src: "/about/drumset.jpg", alt: "Oliver's four-piece bop drum kit", width: 1200, height: 1600 },
  },
  {
    id: "barbering",
    title: "Barbering",
    body: "Barbering to me is a form of art. In my free time I cut and style hair, and I've been doing it for over four years.",
    photo: { src: "/about/barbering.jpg", alt: "A haircut by CutbyOliver", width: 1200, height: 1600 },
  },
  {
    id: "building",
    title: "Building",
    body: "In my free time I've caught a passion for building projects. Right now that's MatchCut, a discovery engine for barbers and clients.",
    photo: { src: "/about/ramos-grad.JPG", alt: "Oliver at his graduation, 2026", width: 1143, height: 1600 },
  },
  {
    id: "self-improvement",
    title: "Self-improvement",
    body: "I read, work out and keep looking to learn more. My favorite book is Mary Shelley's Frankenstein.",
  },
];
