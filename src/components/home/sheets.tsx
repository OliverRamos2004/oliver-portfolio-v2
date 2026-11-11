import Image from "next/image";
import { ABOUT, STUDIO } from "@/data/home";
import { portrait, studio } from "@/data/about";
import { EMAIL, MALDEN, RESUMES } from "@/data/contact";
import { SOCIALS } from "@/data/socials";
import { CopyEmail } from "./CopyEmail";
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
        <a className={styles.btn} href={MALDEN.href} target="_blank" rel="noopener" data-cursor="GO ↗">
          {STUDIO.cta} <span aria-hidden="true">↗</span>
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

export function AboutSheet() {
  return (
    <div className={`${styles.about} ${styles.fill}`}>
      <Image
        className={styles.portrait}
        style={{ objectPosition: portrait.position }}
        src={portrait.src}
        alt={portrait.alt}
        width={portrait.width}
        height={portrait.height}
        sizes="(max-width: 760px) 100vw, 50vw"
      />
      <div className={styles.aboutTxt}>
        <h2 className={`display ${styles.aboutTitle}`}>
          {ABOUT.title[0]}
          <br />
          {ABOUT.title[1]}
        </h2>
        <div>
          <p className={styles.bio}>{ABOUT.body}</p>
          <dl className={`${styles.facts} ${styles.label}`}>
            {ABOUT.facts.map(([term, value]) => (
              <div key={term} className="contents">
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export function ContactSheet() {
  return (
    <div className={`${styles.contact} ${styles.fill}`}>
      <span className={`${styles.label} ${styles.muted}`}>Click to copy</span>
      <div>
        <CopyEmail email={EMAIL} />
        <div className={`${styles.links} ${styles.label}`}>
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
    </div>
  );
}
