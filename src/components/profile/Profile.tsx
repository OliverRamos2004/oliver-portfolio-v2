import Image from "next/image";
import { bio, interests, portrait, studio } from "@/data/about";
import { MALDEN } from "@/data/contact";
import { Masthead } from "@/components/credits/Masthead";

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * /about as a magazine profile: the same two-sided story as the homepage in
 * miniature. Profile on paper, Outside the Studio on ink.
 */
export function Profile() {
  return (
    <>
      <section
        aria-labelledby="profile-title"
        data-running-head="PROFILE"
        data-running-head-short="PROFILE"
        data-tone="paper"
        className="overflow-x-clip bg-paper pt-20 text-ink"
      >
        <p className={`${label} px-4 text-ink-muted md:px-10`}>About</p>
        {/* Sized like the part openers: measured to overrun the viewport ~12%. */}
        {/* relative: keeps the absolutely-positioned sr-only text inside the clipped section. */}
        <h1 id="profile-title" className="display reveal relative -ml-[0.04em] mt-6 whitespace-nowrap px-4 text-[length:var(--text-profile)] md:px-10">
          Profile<span className="sr-only">: Oliver Ramos</span>
        </h1>
      </section>

      <section
        aria-label="Oliver Ramos"
        data-running-head="PROFILE — OLIVER RAMOS"
        data-running-head-short="PROFILE"
        data-tone="paper"
        className="border-t border-rule bg-paper text-ink"
      >
        {/* Full-bleed portrait with the lead set over its bottom edge, like a magazine profile opener.
            3:4 on phones leaves room under the face for the text; 16:9 on wide screens. */}
        <div className="relative aspect-[3/4] w-full md:aspect-[4/3] lg:aspect-[16/9]">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{ objectPosition: portrait.position }}
          />
          {/* The photo is a light wall and a light shirt: paper text needs this scrim to stay legible.
              Bottom-up below lg; left-to-right at lg, where the 16:9 crop fixes the face right of
              center, so the text keeps to the left five columns and the face stays bright. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/45 via-35% to-transparent to-70% lg:bg-linear-to-r lg:from-ink/85 lg:via-ink/40 lg:via-35% lg:to-55%"
          />
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 gap-x-4 px-4 pb-6 text-paper md:grid-cols-12 md:px-10 md:pb-10">
            <p className={`${label} col-span-4 text-paper/85 md:col-span-12`}>Oliver Ramos · Austin, TX</p>
            <p className="col-span-4 mt-3 font-display text-[clamp(1.75rem,4vw,3.5rem)] font-medium leading-[1.05] [font-stretch:100%] md:col-span-8 lg:col-span-5">
              {bio[0]}
            </p>
          </div>
        </div>
        <div className="max-w-[60ch] px-4 py-16 md:px-10 md:py-24">
          {bio.slice(1).map((p) => (
            <p key={p} className="text-[15px] leading-[1.6] max-md:text-[14px] [&+p]:mt-6">{p}</p>
          ))}
        </div>
      </section>

      {/* The studio, on paper, sets up "Outside the studio" on ink. */}
      <section
        aria-labelledby="studio-title"
        data-running-head="PROFILE — THE STUDIO"
        data-running-head-short="STUDIO"
        data-tone="paper"
        className="grid grid-cols-4 gap-x-4 gap-y-10 border-t border-rule bg-paper px-4 py-16 text-ink md:grid-cols-12 md:px-10 md:py-24"
      >
        <div className="col-span-4 md:col-span-4">
          <p className={`${label} text-ink-muted`}>The studio</p>
          <h2 id="studio-title" className="display mt-6 text-[length:var(--text-d2)]">
            {MALDEN.name}
          </h2>
          <p className={`${label} mt-4 text-ink-muted`}>Austin, TX · Est. 2025</p>
          {studio.body.map((p) => (
            <p key={p} className="mt-6 text-[15px] leading-[1.6] max-md:text-[14px]">{p}</p>
          ))}
          {MALDEN.live ? (
            <a
              href={MALDEN.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${label} mt-8 inline-block px-1 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper`}
            >
              Visit the studio ↗
            </a>
          ) : (
            <p className={`${label} mt-8 text-ink-muted`}>Site coming soon</p>
          )}
        </div>
        <figure className="col-span-4 md:col-span-7 md:col-start-6">
          <Image
            src={studio.image.src}
            alt={studio.image.alt}
            width={studio.image.width}
            height={studio.image.height}
            sizes="(min-width: 768px) 58vw, 100vw"
            className="h-auto w-full border border-rule"
          />
        </figure>
      </section>

      <section
        aria-labelledby="outside-title"
        data-running-head="OUTSIDE THE STUDIO"
        data-running-head-short="OUTSIDE"
        data-tone="ink"
        className="overflow-x-clip bg-ink px-4 py-16 text-paper md:px-10 md:py-24"
      >
        <h2 id="outside-title" className="display text-[length:var(--text-d1)]">
          Outside the studio
        </h2>
        <ul className="mt-12 grid gap-x-4 gap-y-12 md:grid-cols-12">
          {interests.map((item, i) => (
            <li key={item.id} className="border-t border-rule-on-ink pt-4 md:col-span-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                {item.photo ? (
                  <Image src={item.photo.src} alt={item.photo.alt} fill sizes="(min-width: 768px) 24vw, 100vw" className="object-cover" />
                ) : (
                  <span aria-hidden="true" className="display flex h-full items-center justify-center border border-rule-on-ink text-[8rem]">
                    {item.title.charAt(0)}
                  </span>
                )}
              </div>
              <p className={`${label} mt-4 text-paper-muted`}>
                {pad(i + 1)} · {item.title}
              </p>
              <p className="mt-2 text-[14px] leading-[1.6]">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <div className="bg-ink text-paper">
        <Masthead links />
      </div>
    </>
  );
}
