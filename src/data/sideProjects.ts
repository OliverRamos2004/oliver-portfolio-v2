import type { SideProjectEntry } from "@/types/project";

export const sideProjects: SideProjectEntry[] = [
  {
    id: "atx-redline",
    title: "ATX // REDLINE",
    year: 2026,
    tagline:
      "A brutalist forensic-audit pitch tool for local-business redesigns — planned, built, and shipped solo in a 1-hour hackathon sprint.",
    stack: ["React", "Vite", "Tailwind CSS"],
    links: [{ label: "GitHub", href: "https://github.com/OliverRamos2004/atx-redline" }],
    media: {
      type: "image",
      src: "/side-projects/atx-redline.png",
      alt: "ATX // REDLINE split-view comparator showing a legacy small-business site next to its brutalist flagship rebrand",
      aspectRatio: 2924 / 1672,
    },
  },
];
