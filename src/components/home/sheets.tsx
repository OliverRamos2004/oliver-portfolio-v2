import Image from "next/image";
import { ABOUT, STUDIO } from "@/data/home";
import { portrait, studio } from "@/data/about";
import { EMAIL, MALDEN, RESUMES } from "@/data/contact";
import { SOCIALS } from "@/data/socials";
import { Icon } from "@/components/ui/Icon";
import { AboutInterests } from "./AboutInterests";
import { AboutLab } from "./AboutLab";
import { CopyEmail } from "./CopyEmail";
import { SocialIcons } from "./SocialIcons";
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
        <h2 className={`display ${styles.studioTitle}`}>
          {STUDIO.title[0]}
          <br />
          {STUDIO.title[1]}
        </h2>
        <p className={styles.lede}>{STUDIO.body}</p>
        <a className={styles.btn} href={MALDEN.href} target="_blank" rel="noopener" data-cursor="Visit ↗">
          {STUDIO.cta} <Icon name="out" className={styles.out} />
        </a>
      </div>
      <Image
        className={styles.shot}
        src={studio.image.src}
        alt={studio.image.alt}
        width={studio.image.width}
        height={studio.image.height}
        sizes="(max-width: 760px) 100vw, 47vw"
      />
    </div>
  );
}

/* About (2026-11-15): HELLO, I'M / OLIVER [photo as the full stop], then the
   bio. In the flow, so the sheet scrolls as sections are added below. */
export function AboutSheet() {
  return (
    <div className={`${styles.about} ${styles.fill}`}>
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
      {/* Bio: the lead big, like a pull quote; the rest, facts and icons beside it. */}
      <div className={styles.aboutTxt}>
        <p className={styles.lead}>{ABOUT.lead}</p>
        <div className={styles.aboutSide}>
          <p className={styles.bio}>{ABOUT.body}</p>
          <dl className={styles.facts}>
            {ABOUT.facts.map(([term, value]) => (
              <div key={term} className="contents">
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <SocialIcons className={styles.socialsInline} />
        </div>
      </div>
      <AboutInterests />
      <SocialIcons className={styles.socialsFooter} />
      <AboutLab />
    </div>
  );
}

export function ContactSheet() {
  return (
    <div className={`${styles.contact} ${styles.fill}`}>
      {/* Email on top, links pinned to the bottom (.contact is space-between). */}
      <CopyEmail email={EMAIL} />
      <div className={styles.links}>
        <a href={`mailto:${EMAIL}`} data-cursor="↗">
          Email app
        </a>
        {SOCIALS.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener" data-cursor="↗">
            {s.label}
          </a>
        ))}
        {RESUMES.map((r) => (
          <a key={r.href} href={r.href} target="_blank" rel="noopener" data-cursor="PDF">
            {r.label}
          </a>
        ))}
      </div>
    </div>
  );
}
