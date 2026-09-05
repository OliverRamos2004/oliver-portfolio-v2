import type { ArtifactEntry } from "@/types/project";

export const artifacts: ArtifactEntry[] = [
  {
    id: "artifact-01",
    title: "MatchCut",
    year: 2025,
    category: "Brand Identity",
    medium: "Brand Identity",
    note: "Wordmark and cover treatment for MatchCut, the in-progress project.",
    media: { type: "image", src: "/explorations/matchcut-green.jpg", alt: "MatchCut wordmark on a teal-to-green gradient", aspectRatio: 1 },
  },
  {
    id: "artifact-02",
    title: "CutbyOliver",
    year: 2025,
    category: "Brand Identity",
    medium: "Brand Identity",
    note: "Cover art for the CutbyOliver barbering brand.",
    media: { type: "image", src: "/explorations/cutbyoliver.jpg", alt: "CutbyOliver wordmark over an abstract color-field cover", aspectRatio: 1 },
  },
  {
    id: "artifact-03",
    title: "Ramos Lawn Logo v1",
    year: 2026,
    category: "Brand Identity",
    medium: "Logo Design",
    note: "First logo pass for Ramos Lawn Care & Services.",
    media: { type: "image", src: "/explorations/ramos-lawn-logo.png", alt: "Ramos Lawn Care & Services logo, a tree mark over the wordmark", aspectRatio: 1 },
  },
];
