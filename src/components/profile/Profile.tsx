import Image from "next/image";
import { bio, interests, philosophy, portrait } from "@/data/about";
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
        className="grid grid-cols-4 gap-x-4 gap-y-10 border-t border-rule bg-paper px-4 py-16 text-ink md:grid-cols-12 md:px-10 md:py-24"
      >
        <figure className="col-span-4 md:col-span-7">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 768px) 58vw, 100vw"
            priority
            className="h-auto w-full"
          />
        </figure>
        <div className="col-span-4 md:col-span-4 md:col-start-9">
          <p className={`${label} text-ink-muted`}>Oliver Ramos · Austin, TX</p>
          {bio.map((p) => (
            <p key={p} className="mt-6 text-[15px] leading-[1.6] max-md:text-[14px]">{p}</p>
          ))}
        </div>

        <blockquote className="col-span-4 mt-6 border-t border-rule pt-10 md:col-span-10 md:mt-12">
          <p className={`${label} text-ink-muted`}>Philosophy</p>
          <p className="mt-6 font-display text-[length:var(--text-d2)] font-semibold leading-[1.02] [font-stretch:85%]">
            “{philosophy.quote}”
          </p>
          <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.6] text-ink-muted">{philosophy.lead}</p>
        </blockquote>
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
