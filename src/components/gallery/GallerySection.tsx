import type { GalleryPhoto } from "@/types/gallery";

export function GallerySection({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <section id="gallery" className="hairline-t px-4 py-24 md:px-8 md:py-32">
      <header className="mb-10 flex items-baseline justify-between md:mb-14">
        <h2
          className="font-display text-2xl font-bold uppercase text-charcoal md:text-3xl"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Gallery
        </h2>
        <span className="hidden font-mono text-xs uppercase text-charcoal/50 sm:inline" style={{ letterSpacing: "var(--tracking-widest)" }}>
          Studio &amp; Practice
        </span>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {photos.map((photo) => (
          <figure key={photo.id} className="group border border-hairline-on-light">
            <div
              className="flex items-center justify-center overflow-hidden bg-charcoal/5 font-mono text-[9px] uppercase text-charcoal/35 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              style={{ aspectRatio: photo.aspectRatio }}
            >
              {photo.alt}
            </div>
            <figcaption className="hairline-t px-2.5 py-2 font-mono text-[10px] uppercase text-charcoal/45" style={{ letterSpacing: "var(--tracking-wide)" }}>
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
