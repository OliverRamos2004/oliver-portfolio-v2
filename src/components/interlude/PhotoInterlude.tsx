import Image from "next/image";
import type { Interlude } from "@/data/interludes";

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";

/** One photo, full-bleed, a mono caption bottom left (SPEC §4). */
export function PhotoInterlude({ photo }: { photo: Interlude }) {
  return (
    <figure className="relative h-[min(70svh,720px)] w-full overflow-hidden">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="100vw"
        loading="lazy"
        className="object-cover"
        style={{ objectPosition: photo.position }}
      />
      <figcaption className={`${label} absolute bottom-4 left-4 bg-ink px-2 py-1 text-paper md:bottom-6 md:left-10`}>
        {photo.caption}
      </figcaption>
    </figure>
  );
}
