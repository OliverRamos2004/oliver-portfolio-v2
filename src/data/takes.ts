import type { ShortTakeEntry } from "@/types/project";
import { MALDEN } from "@/data/contact";

/**
 * Part II short takes that aren't client projects. Insight lines are
 * placeholders until Oliver writes them (SPEC §3, open items).
 */
export const takes: ShortTakeEntry[] = [
  {
    id: "malden-studios",
    part: "craft",
    order: 0,
    title: "MALDEN STUDIOS",
    year: 2025,
    // Draft from the studio's own mission line; Oliver's to edit.
    insight: "My design and development studio: websites and headless Shopify storefronts for brands with something to say.",
    image: { src: "/studio/malden.jpg", alt: "The Malden Studios home page: the wordmark over hot-air balloons at dawn" },
    // Unlinked until maldenstudios.com is live.
    ...(MALDEN.live && { href: MALDEN.href }),
  },
  {
    id: "cutbyoliver",
    part: "craft",
    order: 1,
    title: "CUTBYOLIVER",
    year: 2025,
    // From Oliver's About copy; his to edit.
    insight: "Barbering to me is a form of art.",
    image: { src: "/about/barbering.jpg", alt: "A haircut by CutbyOliver" },
  },
  {
    id: "photography",
    part: "craft",
    order: 2,
    title: "PHOTOGRAPHY",
    year: 2025,
    insight: "[INSIGHT — Oliver to write]",
    image: { src: "/gallery/04.jpg", alt: "Ancient cliff dwelling carved into sandstone, New Mexico" },
  },
  {
    id: "drumming",
    part: "craft",
    order: 3,
    title: "DRUMMING",
    year: 2026,
    // From Oliver's About copy; his to edit.
    insight: "Three years behind the kit: Brazilian jazz, funk and rock.",
    image: { src: "/about/drumset.jpg", alt: "Oliver's four-piece bop drum kit" },
  },
];
