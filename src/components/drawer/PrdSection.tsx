import type { PrdEntry } from "@/types/prd";

const label = "font-mono text-[length:var(--text-label)] uppercase tracking-[0.14em]";

type Tone = { muted: string; rule: string };

/** Block headings sit one level below the section heading (h3 on the page, h4 in the drawer). */
type BlockHeading = "h3" | "h4";

const body = "text-[15px] leading-[1.6] max-md:text-[14px]";

function tone(onInk: boolean): Tone {
  return { muted: onInk ? "text-paper-muted" : "text-ink-muted", rule: onInk ? "border-rule-on-ink" : "border-rule" };
}

function Block({ heading, as: H, t, children }: { heading: string; as: BlockHeading; t: Tone; children: React.ReactNode }) {
  return (
    <div className={`mt-10 border-t ${t.rule} pt-5`}>
      <H className={`${label} ${t.muted} mb-4`}>{heading}</H>
      {children}
    </div>
  );
}

function List({ items, t, dim = false }: { items: string[]; t: Tone; dim?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 ${body} ${dim ? t.muted : ""}`}>
          <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-signal" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * The PRD, folded into the case file (SPEC §4) — it replaced the standalone
 * /pm/[slug] page, which now 308s to /work/[slug]#prd. Anchored as #prd.
 */
export function PrdSection({ prd, onInk, isPage }: { prd: PrdEntry; onInk: boolean; isPage: boolean }) {
  const t = tone(onInk);
  const Heading = isPage ? "h2" : "h3";
  const sub: BlockHeading = isPage ? "h3" : "h4";
  const { muted, rule } = t;

  return (
    <section id="prd" aria-labelledby="prd-title" className={`mt-16 border-t-2 ${onInk ? "border-paper" : "border-ink"} pt-6`}>
      <p className={`${label} ${muted}`}>
        {prd.ref} · {prd.status === "shipped" ? "Shipped" : "In progress"}
      </p>
      <Heading id="prd-title" className="display mt-3 text-[length:var(--text-d2)]">
        Product requirements
      </Heading>
      <p className={`mt-4 max-w-xl ${body}`}>{prd.subtitle}</p>

      <Block t={t} as={sub} heading="Problem">
        <p className={`max-w-2xl ${body}`}>{prd.problem}</p>
      </Block>

      <Block t={t} as={sub} heading="Goals">
        <List t={t} items={prd.goals} />
      </Block>

      <Block t={t} as={sub} heading="Target users">
        <dl className="grid gap-6 sm:grid-cols-2">
          {prd.targetUsers.map((u) => (
            <div key={u.segment}>
              <dt className="font-display text-lg font-semibold uppercase leading-tight [font-stretch:80%]">{u.segment}</dt>
              <dd className={`mt-1.5 ${body} ${muted}`}>{u.detail}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block t={t} as={sub} heading="User stories">
        <List t={t} items={prd.userStories} />
      </Block>

      <Block t={t} as={sub} heading="Scope">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className={`${label} mb-3`}>In</p>
            <List t={t} items={prd.inScope} />
          </div>
          <div>
            <p className={`${label} mb-3`}>Out</p>
            <List t={t} items={prd.outOfScope} dim />
          </div>
        </div>
      </Block>

      <Block t={t} as={sub} heading="Success metrics">
        <dl className={`grid border-t ${rule} sm:grid-cols-2`}>
          {prd.successMetrics.map((m) => (
            <div key={m.metric} className={`border-b ${rule} py-3 sm:odd:border-r sm:odd:pr-4 sm:even:pl-4`}>
              <dt className={`${label} ${muted}`}>{m.metric}</dt>
              <dd className={`mt-1.5 ${body}`}>{m.target}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block t={t} as={sub} heading="Risks & open questions">
        <List t={t} items={prd.risks} />
      </Block>
    </section>
  );
}
