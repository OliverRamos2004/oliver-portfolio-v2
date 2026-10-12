const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";

/**
 * The seam between Part I (paper) and Part II (ink): a hard cut, no gradient,
 * with a 2px signal rule on the seam (SPEC §4). The running head flips tone
 * when Part II's opener crosses the midline, so this needs no script, and it
 * reads the same under reduced motion (it is already a cut).
 */
export function Turn() {
  return (
    <div className="border-b-2 border-signal bg-paper px-4 pt-16 pb-6 text-ink md:px-10 md:pt-24">
      <a
        href="#part-craft"
        className={`${label} inline-block px-1 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper`}
      >
        Turn the page <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
