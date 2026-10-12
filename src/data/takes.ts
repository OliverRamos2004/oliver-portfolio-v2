import type { BentoEntry } from "@/types/project";
import { MALDEN } from "@/data/contact";

/**
 * Part II bento tiles that aren't client projects. Insight lines are
 * drafts for Oliver to edit.
 */
export const takes: BentoEntry[] = [
  {
    id: "malden-studios",
    part: "craft",
    order: 1,
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
    order: 2,
    title: "CUTBYOLIVER",
    year: 2025,
    // From Oliver's About copy; his to edit.
    insight: "Barbering to me is a form of art.",
    image: { src: "/about/barbering.jpg", alt: "A haircut by CutbyOliver", position: "50% 60%" },
  },
  {
    id: "drumming",
    part: "craft",
    order: 3,
    title: "DRUMMING",
    year: 2026,
    // From Oliver's About copy; his to edit.
    insight: "Three years behind the kit: Brazilian jazz, funk and rock.",
    image: { src: "/about/drumset.jpg", alt: "Oliver's four-piece bop drum kit", position: "center" },
  },
];
