import Image from "next/image";
import { ABOUT, CONTACT_NOTE, STUDIO } from "@/data/home";
import { portrait, studio } from "@/data/about";
import { EMAIL, MALDEN } from "@/data/contact";
import { SOCIALS } from "@/data/socials";
import { Icon } from "@/components/ui/Icon";
import { AboutInterests } from "./AboutInterests";
import { CopyEmail } from "./CopyEmail";
import { HoverNote } from "./HoverNote";
import { SocialGlyph, SocialIcons } from "./SocialIcons";
import { WorkList, type WorkRow } from "./WorkList";
import styles from "./home.module.css";

/* Sheet bodies. Server components except for the interactive islands
   (WorkList, CopyEmail), passed into HomeMenu as slots. */

export function WorkSheet({ rows }: { rows: readonly WorkRow[] }) {
  return <WorkList rows={rows} />;
}

export function StudioSheet() {
  return (
    <div className={`${styles.studio} ${styles.fill}`}>
      <div>
        <HoverNote note={STUDIO.notes.title}>
          <h2 className={`display ${styles.studioTitle}`}>
            {STUDIO.title[0]}
            <br />
            {STUDIO.title[1]}
          </h2>
        </HoverNote>
        <p className={styles.lede}>{STUDIO.body}</p>
        <HoverNote note={STUDIO.notes.cta}>
          <a className={styles.btn} href={MALDEN.href} target="_blank" rel="noopener" data-cursor="Visit ↗">
            {STUDIO.cta} <Icon name="out" className={styles.out} />
          </a>
        </HoverNote>
      </div>
      <HoverNote note={STUDIO.notes.shot}>
        <Image
          className={styles.shot}
          src={studio.image.src}
          alt={studio.image.alt}
          width={studio.image.width}
          height={studio.image.height}
          sizes="(max-width: 760px) 100vw, 47vw"
        />
      </HoverNote>
    </div>
  );
}

/* About (2026-11-15): HELLO, I'M / OLIVER [photo as the full stop], then the
   bio. In the flow, so the sheet scrolls as sections are added below. */
export function AboutSheet() {
  return (
    <div className={`${styles.about} ${styles.fill}`}>
      {/* First screen: the name, and the bio bottom right like the home caption. */}
      <div className={styles.aboutHero}>
        <h2 className={`display ${styles.aboutTitle}`}>
          {ABOUT.title[0]}
          <br />
          {/* The photo takes the period's place after the name, one cap height tall. */}
          <span className={styles.imLine}>
            {ABOUT.title[1].replace(/\.$/, "")}
            {/* The wrap carries its own paper, so the blend never shows white
                while the sheet slides in. */}
            <span className={styles.figWrap}>
              <Image
                className={styles.aboutFig}
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                sizes="(max-width: 760px) 40vw, 30vw"
              />
            </span>
          </span>
        </h2>
        <div className={styles.aboutTxt}>
          <p className={styles.bio}>{ABOUT.body}</p>
          <SocialIcons />
        </div>
      </div>
      <AboutInterests />
      <p className={styles.aboutEnd}>[END OF SECTION]</p>
    </div>
  );
}

export function ContactSheet() {
  return (
    <div className={`${styles.contact} ${styles.fill}`}>
      {/* Email on top, links pinned to the bottom (.contact is space-between). */}
      <HoverNote note={CONTACT_NOTE}>
        <CopyEmail email={EMAIL} />
      </HoverNote>
      <div className={styles.links}>
        <a href={`mailto:${EMAIL}`} data-cursor="↗">
          <SocialGlyph name="Email" />
          Email app
        </a>
        {SOCIALS.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener" data-cursor="↗">
            <SocialGlyph name={s.label} />
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
