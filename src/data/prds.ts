import type { PrdEntry } from "@/types/prd";

export const prds: PrdEntry[] = [
  {
    id: "matchcut",
    ref: "PRD-01",
    title: "MATCHCUT",
    subtitle: "Two-sided marketplace matching clients with independent barbers",
    year: 2026,
    role: "Founder & Product Lead",
    status: "in-progress",
    summary:
      "A deterministic matching engine for barber discovery — client and barber onboarding, waitlist live now, core app in build.",
    problem:
      "Clients looking for a new barber default to generic directories (Yelp, Google Maps, Instagram search) that rank on proximity and star rating, not on the things that actually predict a good haircut: hair texture compatibility, style specialty, price range, and chair vibe. Independent barbers and student barbers, meanwhile, have no low-cost channel to reach new clients outside of word-of-mouth or expensive ad spend — directories treat them the same as any other local business listing.",
    goals: [
      "Replace directory-style browsing with a deterministic, multi-factor match (hair texture, style specialty, price range, chair vibe) that surfaces a client's top 3 barbers instead of a scrollable list.",
      "Give independent and student barbers a lead-generation channel priced for their stage — free discovery, paid routing — instead of requiring them to compete on ad spend.",
      "Stay out of the booking stack entirely: route matched clients to the barber's existing booking tool (Booksy, Square, Acuity) rather than rebuilding scheduling.",
      "Validate demand cheaply before the core app ships, via an early-access waitlist reusing the same backend the real product will run on.",
    ],
    targetUsers: [
      {
        segment: "Clients",
        detail: "People seeking a new barber who want a personalized recommendation instead of scrolling reviews — initial focus on the Austin, TX metro.",
      },
      {
        segment: "Independent & student barbers",
        detail: "Booth renters and academy students who need consistent client flow but can't justify traditional marketing spend at their stage.",
      },
      {
        segment: "Barber academies (B2B)",
        detail: "Training programs that want a placement pipeline for graduating students as a recruiting differentiator.",
      },
    ],
    userStories: [
      "As a client, I answer a short questionnaire on hair type, style, and preferred vibe, and get a curated top-3 match instead of an open-ended list.",
      "As a client, I can see a compatibility breakdown for each match before I'm routed to their existing booking page.",
      "As an independent barber, I build a profile with photos, specialty tags, and a booking link, and pay a flat monthly rate scaled to unlimited client routing.",
      "As a student barber, I get a discounted tier so I can build clientele while still in training.",
      "As a barber, I track how many leads are being routed to me from a dashboard, without needing a separate analytics tool.",
      "As an academy administrator, I get an institutional license and an access code so students self-onboard under our program.",
    ],
    inScope: [
      "Client questionnaire → deterministic multi-factor matching → top-3 curated results",
      "Barber onboarding, profile/portfolio management, and a lead-tracking dashboard",
      "Tiered subscription billing (established pro, student/rising talent, academy B2B)",
      "Outbound handoff to third-party booking tools (Booksy, Square, Acuity)",
      "Early-access waitlist landing page as a parallel, low-effort validation track",
    ],
    outOfScope: [
      "In-app booking, scheduling, or payments between client and barber",
      "Markets outside the initial Austin/Pflugerville pilot area",
      "A generalized services marketplace beyond barbering",
    ],
    successMetrics: [
      { metric: "Barber supply seeded pre-launch", target: "10–15 local barbers onboarded for a 3–6 month free pilot" },
      { metric: "Early-access signups", target: "Waitlist conversion from build-in-public content" },
      { metric: "Paid conversion (post-pilot)", target: "Free pilot barbers converting to a paid tier" },
      { metric: "Match-to-booking handoff rate", target: "Share of curated matches that result in an outbound booking click" },
    ],
    risks: [
      "Two-sided marketplace cold-start — supply (barbers) has to be seeded manually before demand (clients) sees enough matches to be useful.",
      "No in-app booking means the funnel's last step is off-platform, which limits visibility into whether a match actually converted.",
      "Pricing tiers are locked for now but assume willingness to pay at the student tier, which hasn't been validated with real users yet.",
    ],
    links: [
      { label: "Waitlist", href: "https://instagram.com/joinmatchcut" },
      { label: "GitHub", href: "https://github.com/OliverRamos2004/matchcut-landing" },
    ],
  },
  {
    id: "ramos-lawn-care",
    ref: "PRD-02",
    title: "RAMOS LAWN CARE",
    subtitle: "Operations & financial reporting system for a working lawn care business",
    year: 2026,
    role: "Operations & Financial Systems Lead",
    status: "shipped",
    summary:
      "Turned a paper-run lawn care operation into one with automated billing and P&L reporting across 19 properties.",
    problem:
      "Ramos Lawn Care ran on paper: invoices written by hand, visits tracked from memory, and no reporting layer separating recurring revenue from one-off project work. That made it impossible to answer basic operating questions — what's this month's actual cash position, which accounts are behind on billing, is the crew's 4-day route actually profitable — without manually reconstructing the numbers.",
    goals: [
      "Eliminate paper invoicing and unbilled visits by digitizing the crew's billing workflow end-to-end.",
      "Give the business owner an automated P&L view that separates recurring revenue from project revenue, instead of one blended number.",
      "Make the 4-day crew route across 18 accounts auditable — every visit tied to a billing record, not tracked from memory.",
      "Ship a public-facing site first, establishing enough trust in the engagement to take on the financial-systems work next.",
    ],
    targetUsers: [
      {
        segment: "Business owner",
        detail: "Needs a real-time read on cash position and which revenue is recurring vs. one-off, to make hiring and pricing decisions.",
      },
      {
        segment: "Crew / field operations",
        detail: "Runs a fixed 4-day route across accounts and needs billing to follow automatically from completed visits, not a separate paperwork step.",
      },
      {
        segment: "Prospective clients",
        detail: "Land on the public site to evaluate and request service — the original scope before the engagement expanded.",
      },
    ],
    userStories: [
      "As the owner, I can see monthly gross revenue and net operating cash reserve broken out by recurring vs. project work.",
      "As the owner, I no longer reconcile invoices by hand — completed visits generate billing records automatically.",
      "As the crew, I follow the same 4-day route across 18 accounts and every visit is logged against its account without extra paperwork.",
      "As a prospective client, I can find the business online, see the service offering, and request work.",
    ],
    inScope: [
      "Public marketing site (the original engagement scope)",
      "Automated financial reporting: recurring vs. project revenue across 19 properties",
      "Automated billing reconciliation tied to the crew's visit schedule",
      "Digitization of the 4-day, 18-account crew workflow",
    ],
    outOfScope: [
      "Client-facing self-service scheduling or online payments",
      "Multi-crew / multi-route support (single crew, single route at this stage)",
      "A packaged product for other lawn care businesses (built specifically for this operation)",
    ],
    successMetrics: [
      { metric: "Monthly gross revenue tracked", target: "$10.7K+ visible in the automated reporting layer" },
      { metric: "Net operating cash reserve", target: "21.7%, now a reportable figure instead of a manual estimate" },
      { metric: "Unbilled visits", target: "Eliminated — every completed visit produces a billing record" },
      { metric: "Accounts on the digitized route", target: "18 accounts across a 4-day crew cycle" },
    ],
    risks: [
      "The reporting and billing system was purpose-built for one business's workflow, so extending it to a second crew or route would need real rework, not just configuration.",
      "Single points of ownership (one owner, one crew) meant scope could shift mid-engagement — the project itself started as a site build and grew into the financial-systems work.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/OliverRamos2004/ramos-lawn-website" },
      { label: "Live Site", href: "https://ramoslawnservices.com" },
    ],
  },
];
