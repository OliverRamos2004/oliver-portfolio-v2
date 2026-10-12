import type { Part } from "@/types/project";

export interface Interlude {
  src: string;
  alt: string;
  /** Mono caption, "place · year" (SPEC §4). */
  caption: string;
  /** CSS object-position for the wide crop; defaults to centre. */
  position?: string;
}

/**
 * Photo interludes, one per part (SPEC §1.5: photos as connective tissue).
 * Only the landscape originals are wide enough to run full-bleed; the
 * 1350px portraits would crop hard and upscale.
 */
export const INTERLUDES: Record<Part, Interlude> = {
  systems: {
    src: "/gallery/06.jpg",
    alt: "Scissortail Park pedestrian bridge at night, its two tall spires lit up",
    caption: "Oklahoma City · 2026",
    // Keep the walkway and people in the wide desktop crop, not just the spire tips.
    position: "50% 85%",
  },
  craft: {
    src: "/gallery/01.jpg",
    alt: "Drum kit, sticks resting on the snare",
    caption: "Practice kit, Austin · 2026",
  },
};
