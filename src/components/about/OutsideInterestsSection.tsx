import Image from "next/image";
import type { InterestEntry } from "@/types/about";
import type { GalleryPhoto } from "@/types/gallery";

export function OutsideInterestsSection({ interests, photos }: { interests: InterestEntry[]; photos: GalleryPhoto[] }) {
  return (
    <section className="hairline-t px-4 py-20 md:px-8 md:py-28">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-charcoal/40" style={{ letterSpacing: "var(--tracking-wide)" }}>
          03
        </span>
        <h2
          className="font-display text-xl font-bold uppercase text-charcoal md:text-2xl"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Outside the Studio
        </h2>
      </div>

      <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
        <dl className="grid gap-6">
          {interests.map((interest) => (
            <div key={interest.title}>
              <dt
                className="font-mono text-xs uppercase text-charcoal"
                style={{ letterSpacing: "var(--tracking-wide)" }}
              >
                {interest.title}
              </dt>
              <dd className="mt-1.5 font-sans text-sm leading-relaxed text-charcoal/65">{interest.body}</dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
          {photos.map((photo) => (
            <figure key={photo.id} className="border border-hairline-on-light">
              <div
                className="relative overflow-hidden bg-charcoal/5"
                style={{ aspectRatio: photo.aspectRatio }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="hairline-t px-2 py-1.5 font-mono text-[9px] uppercase text-charcoal/45" style={{ letterSpacing: "var(--tracking-wide)" }}>
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
