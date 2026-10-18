import { skillsLedger } from "@/data/skills";
import { SOCIALS } from "@/data/socials";
import { RESUMES } from "@/data/contact";
import { ContactForm } from "./ContactForm";
import { Masthead } from "./Masthead";

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";
const stamp = "hover:bg-signal hover:text-ink focus-visible:bg-signal focus-visible:text-ink";

/**
 * The back of the issue (SPEC §3): the contact headline cropped like the
 * openers, then contact, skills, resumes and socials (each said once), and
 * the masthead, which credits the studio.
 */
export function Credits() {
  return (
    <section
      id="credits"
      aria-labelledby="credits-title"
      data-running-head="CONTACT"
      data-running-head-short="CONTACT"
      data-tone="ink"
      className="overflow-x-clip border-t border-rule-on-ink bg-ink pt-20 text-paper"
    >
      <p className={`${label} px-4 text-paper-muted md:px-10`}>Contact</p>
      {/* Two lines measured to overrun the viewport like the openers. */}
      <h2 id="credits-title" className="display reveal -ml-[0.04em] mt-6 whitespace-nowrap px-4 text-[length:var(--text-contact)] md:px-10">
        <span className="block">Let’s build</span>
        <span className="block">something.</span>
      </h2>

      <div className="mt-16 grid grid-cols-4 gap-x-4 gap-y-16 border-t border-rule-on-ink px-4 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="col-span-4 md:col-span-7">
          <ContactForm />
        </div>

        <div className="col-span-4 grid content-start gap-12 md:col-span-4 md:col-start-9">
          <div>
            <h3 className={`${label} border-b border-rule-on-ink pb-3 text-paper-muted`}>Skills</h3>
            <dl className="mt-4 grid gap-4">
              {skillsLedger.map((c) => (
                <div key={c.heading} className="grid grid-cols-[7.5rem_1fr] gap-4">
                  <dt className={`${label} text-paper-muted`}>{c.heading.split(" & ")[0]}</dt>
                  <dd className={label}>{c.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className={`${label} border-b border-rule-on-ink pb-3 text-paper-muted`}>Resumes</h3>
            <ul className="mt-2">
              {RESUMES.map((r) => (
                <li key={r.href}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className={`group flex justify-between py-2 ${label} ${stamp}`}>
                    {r.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={`${label} border-b border-rule-on-ink pb-3 text-paper-muted`}>Elsewhere</h3>
            <ul className="mt-2">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={`flex justify-between py-2 ${label} ${stamp}`}>
                    {s.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Masthead />
    </section>
  );
}
