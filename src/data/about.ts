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
 * looking up at the name. His own photo (profile.png, on white), pre-blended
 * into the paper color as a mono and a color file (multiply, baked
 * 2026-11-16 so iOS Safari can't show the white square). Color on hover.
 */
export const portrait = {
  src: "/about/profile-mono.webp",
  colorSrc: "/about/profile-color.webp",
  alt: "Oliver Ramos in profile, looking up",
  width: 590,
  height: 600,
};

/**
 * The About sheet's interests (2026-11-15): a giant list; hovering a word
 * shows its caption bottom right. Captions are Claude drafts from Oliver's old
 * /about copy (graphic design is new); his to edit.
 */
export const INTERESTS: readonly { id: string; label: string; caption: string }[] = [
  { id: "drums", label: "Drums", caption: "Three years behind the kit. Rock, soul and Brazilian jazz." },
  { id: "barbering", label: "Barbering", caption: "Not as often anymore, but the clippers still come out now and then." },
  { id: "reading", label: "Reading", caption: "Gothic fiction, self-improvement and the classics. Favorite: Frankenstein." },
  { id: "graphic-design", label: "Graphic design", caption: "Where the eye for design started." },
];

