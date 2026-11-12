/**
 * The site's one icon set: back, next, close, out (↗). Drawn strokes, square
 * ends, so every arrow and the × share one weight. 1em by default, so it
 * sizes with the text it sits in; pass a className to size it differently.
 */
const PATHS = {
  back: "M21 12H4M11 5l-7 7 7 7",
  next: "M3 12h17M13 5l7 7-7 7",
  close: "M5 5l14 14M19 5L5 19",
  out: "M6 18L18 6M8 6h10v10",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="square"
      aria-hidden="true"
      style={{ display: "inline-block", flex: "none" }}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
