/** The Studio sheet's screenshot. */
export const studio = {
  image: {
    src: "/studio/malden.jpg",
    alt: "The Malden Studios home page: the wordmark over hot-air balloons at dawn",
    width: 2400,
    height: 1500,
  },
};

/**
 * The About sheet's portrait (2026-11-15, "portrait-led"): Oliver in profile,
 * looking up at the name. His own photo on white; the white drops into the
 * paper with mix-blend-mode: multiply, and the dramatic monochrome is a CSS
 * filter (.aboutFig in home.module.css).
 */
export const portrait = {
  src: "/about/profile.png",
  alt: "Oliver Ramos in profile, looking up",
  width: 976,
  height: 992,
};

/**
 * The About sheet's interests (2026-11-15): a giant list; hovering a word
 * shows its caption bottom right. Captions are Claude drafts from Oliver's old
 * /about copy (graphic design is new); his to edit.
 */
export const INTERESTS: readonly { id: string; label: string; caption: string }[] = [
  { id: "drums", label: "Drums", caption: "Three years behind the kit. Brazilian jazz, funk and rock." },
  { id: "barbering", label: "Barbering", caption: "A form of art. Four years cutting and styling hair." },
  { id: "reading", label: "Reading", caption: "Always mid-book. Favorite: Mary Shelley's Frankenstein." },
  { id: "graphic-design", label: "Graphic design", caption: "Posters, type and identities, mostly for the fun of it." },
];
