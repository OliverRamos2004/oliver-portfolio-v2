import type { ProjectEntry } from "@/types/project";

export const projects: ProjectEntry[] = [
  {
    id: "clinic-intake",
    ref: "01",
    title: "CLINIC INTAKE",
    year: 2025,
    discipline: ["Software Engineering", "Healthcare IT"],
    stack: ["TypeScript", "React", "PostgreSQL", "Supabase"],
    role: "Project Lead & Systems Analyst Intern",
    status: "live",
    summary:
      "Replaced a paper-based patient intake process with a secure, ACID-compliant system for a local free clinic.",
    overview:
      "Montgomery County Free Clinic ran patient intake entirely on paper. As Project Lead & Systems Analyst Intern, I led a 3-person team migrating clinical records into a secure PostgreSQL/Supabase backend — running workflow-mapping sessions directly with healthcare administrators to convert real clinical needs into technical specifications, reducing intake errors and speeding up administrative work.",
    systemNotes: [
      {
        heading: "Migration approach",
        body: "Legacy paper intake forms were digitized into a relational schema designed around ACID compliance, so patient records stay consistent under concurrent clinic-floor usage.",
      },
      {
        heading: "Stakeholder process",
        body: "Ran workflow-mapping sessions directly with clinic administrators — non-technical staff — to convert their actual intake process into form validation rules and a database schema, rather than guessing at requirements.",
      },
      {
        heading: "Team",
        body: "Led a 3-person team through the migration, splitting schema design, form-validation logic, and clinic-side rollout.",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/OliverRamos2004/moco-clinic-forms-main" },
      { label: "Live", href: "https://moco-clinic-forms-main.vercel.app/" },
    ],
    media: [{ type: "image", src: "/work/clinic-intake.png", alt: "Montgomery County Free Clinic digital intake form interface", aspectRatio: 1280 / 900 }],
  },
  {
    id: "ramos-lawn-care",
    ref: "02",
    title: "RAMOS LAWN CARE",
    year: 2026,
    discipline: ["Software Engineering", "Operations & Financial Systems"],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    role: "Operations & Financial Systems Lead",
    status: "live",
    summary:
      "Built the company's site, then architected the automated financial reporting system the business now runs on.",
    overview:
      "Started as a client site build, then grew into an operating role. Architected an automated financial reporting system tracking recurring vs. project revenue across 19 properties — managing $10.7K+ in monthly gross revenue and a 21.7% net operating cash reserve — and streamlined 4-day crew workflows across 18 accounts with automated billing reconciliation, eliminating paper invoicing and unbilled visits.",
    systemNotes: [
      {
        heading: "Financial systems",
        body: "Automated P&L reporting distinguishing recurring vs. project revenue across 19 properties — the reporting layer the business now uses for cash-flow decisions.",
      },
      {
        heading: "Process digitization",
        body: "Digitized 4-day crew workflows across 18 accounts and automated billing reconciliation, eliminating paper invoicing and previously-unbilled visits.",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/OliverRamos2004/ramos-lawn-website" },
      { label: "Live", href: "https://ramoslawnservices.com" },
    ],
    media: [{ type: "image", src: "/work/ramos-lawn-care.png", alt: "Ramos Lawn Care & Services website homepage", aspectRatio: 1280 / 900 }],
  },
  {
    id: "tex-country-materials",
    ref: "03",
    title: "TEX COUNTRY MATERIALS",
    year: 2026,
    discipline: ["Web Development", "Client Consulting"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    role: "Independent Technical Consultant & Developer",
    status: "live",
    summary:
      "Business site for an Austin-area materials hauling company — dirt, mulch, gravel, road base, screened sand.",
    overview:
      "Built and deployed a professional site for Tex Country Materials LLC, an Austin-area hauling company, as part of an independent consulting engagement — from client requirements through launch on a custom domain.",
    systemNotes: [
      {
        heading: "Stack choice",
        body: "Chose Next.js over a static build specifically to leave room for future features — a quote-request form, service-area lookup — without a rebuild.",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/OliverRamos2004/texas-country-site-app" },
      { label: "Live", href: "https://texcountrymaterials.com" },
    ],
    media: [{ type: "image", src: "/work/tex-country-materials.png", alt: "Tex Country Materials website homepage", aspectRatio: 1280 / 720 }],
  },
  {
    id: "green-valley-storage",
    ref: "04",
    title: "GREEN VALLEY STORAGE",
    year: 2025,
    discipline: ["Web Development", "Client Consulting"],
    stack: ["HTML5", "CSS3", "JavaScript", "Figma", "Netlify"],
    role: "Independent Technical Consultant & Developer",
    status: "live",
    summary: "Full business site for an Austin-area hauling company, from Figma prototype to deployment.",
    overview:
      "Green Valley Storage LLC needed a professional web presence built from scratch. Prototyped the site in Figma with the owner, then built and deployed it independently — full ownership from requirements through launch.",
    systemNotes: [
      {
        heading: "Process",
        body: "Worked directly with the business owner to scope the site, prototyping in Figma before writing any code — standard practice for every independent client engagement.",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/OliverRamos2004/Green-Valley-Storage-LLC" },
      { label: "Live", href: "https://greenvalleystoragellc.com/" },
    ],
    media: [{ type: "image", src: "/work/green-valley-storage.png", alt: "Green Valley Storage LLC website homepage", aspectRatio: 1280 / 900 }],
  },
  {
    id: "jackies-bouquets",
    ref: "05",
    title: "JACKY'S BOUQUETS",
    year: 2025,
    discipline: ["Web Development", "Client Consulting"],
    stack: ["HTML5", "CSS3", "JavaScript", "AWS S3", "Git"],
    role: "Independent Technical Consultant & Developer",
    status: "live",
    summary: "Storefront site for a South Texas florist, prototyped in Figma and deployed to AWS S3.",
    overview:
      "Delivered a professional storefront for a local florist — from Figma prototype through AWS S3 deployment for fast, reliable access.",
    systemNotes: [
      {
        heading: "Deployment",
        body: "Deployed as a static site on AWS S3 rather than a heavier framework — the right-sized choice for a small storefront that needed to be fast and cheap to host.",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/OliverRamos2004/Jackies-Bouquets" },
      { label: "Live", href: "https://jackies-bouquets.vercel.app/" },
    ],
    media: [{ type: "image", src: "/work/jackies-bouquets.png", alt: "Jacky's Bouquets website homepage", aspectRatio: 1600 / 917 }],
  },
  {
    id: "matchcut",
    ref: "06",
    title: "MATCHCUT",
    year: 2026,
    discipline: ["B2B SaaS", "Marketplace"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    role: "Founder & Developer",
    status: "in-progress",
    summary:
      "A two-sided marketplace matching independent barbers and barbershops with clients — app prototype and waitlist live now.",
    overview:
      "MatchCut is a B2B SaaS marketplace connecting independent barbers and barbershops with clients, streamlining discovery, booking, and relationship management for both sides. Currently in active development — the early-access waitlist landing page is live while the core platform is being built.",
    systemNotes: [
      {
        heading: "Current stage",
        body: "Early-access waitlist landing page is live and collecting signups while the core two-sided marketplace platform is in development.",
      },
    ],
    links: [
      { label: "Instagram", href: "https://instagram.com/joinmatchcut" },
      { label: "GitHub", href: "https://github.com/OliverRamos2004/matchcut-landing" },
    ],
    featured: 1,
    media: [
      { type: "image", device: "desktop", src: "/work/matchcut/desktop-01-landing.webp", alt: "MatchCut landing page: \"Find your barber by texture, style, and vibe\" beside a 3D barber chair", caption: "Landing", aspectRatio: 1600 / 1083 },
      { type: "image", device: "desktop", src: "/work/matchcut/desktop-02-questionnaire.webp", alt: "MatchCut questionnaire step asking about the client's hair texture", caption: "Questionnaire", aspectRatio: 1600 / 1083 },
      { type: "image", device: "desktop", src: "/work/matchcut/desktop-03-top-match.webp", alt: "MatchCut results page showing the client's top barber match", caption: "Top match · sample data", aspectRatio: 1600 / 1083 },
      { type: "image", device: "desktop", src: "/work/matchcut/desktop-04-site.webp", alt: "joinmatchcut.com waitlist page with client, barber, and academy sign-up tabs", caption: "joinmatchcut.com waitlist", aspectRatio: 1600 / 1083 },
      { type: "image", device: "phone", src: "/work/matchcut/phone-05-top-match.webp", alt: "MatchCut on a phone: top match card with match percentage and distance", caption: "Top match · sample data", aspectRatio: 600 / 1151 },
      { type: "image", device: "phone", src: "/work/matchcut/phone-01-splash.webp", alt: "MatchCut phone splash screen over a barbershop photo", caption: "Splash", aspectRatio: 600 / 1151 },
      { type: "image", device: "phone", src: "/work/matchcut/phone-03-questionnaire.webp", alt: "MatchCut phone questionnaire: choose straight, wavy, curly, or coily hair", caption: "Questionnaire", aspectRatio: 600 / 1151 },
      { type: "image", device: "phone", src: "/work/matchcut/phone-04-concierge.webp", alt: "MatchCut phone loading screen curating the client's matches", caption: "Concierge loading", aspectRatio: 600 / 1151 },
      { type: "image", device: "phone", src: "/work/matchcut/phone-06-profile-reveal.webp", alt: "MatchCut phone barber profile reveal with booking button", caption: "Profile reveal · sample data", aspectRatio: 600 / 1151 },
      { type: "image", device: "phone", src: "/work/matchcut/phone-09-academy-code.webp", alt: "MatchCut barber onboarding confirming the profile is linked to a barber academy", caption: "Academy code · barber onboarding", aspectRatio: 600 / 1151 },
    ],
  },
  {
    id: "sterling-parking-solutions",
    ref: "07",
    title: "STERLING PARKING SOLUTIONS",
    year: 2026,
    discipline: ["Web Development", "Client Consulting"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma"],
    role: "Independent Technical Consultant & Developer",
    status: "in-progress",
    summary:
      "Brand site for an Austin valet and private-event parking company, positioned as hospitality rather than logistics.",
    overview:
      "Sterling Parking Solutions is a licensed, insured valet operation for private events and venues in Austin. The brief was to make it read like a five-star hospitality brand instead of another local valet vendor. I ran discovery with the founders, set an \"Old-World Concierge\" direction, and am building the site across Home, About, Contact, FAQ, and Gallery, with regular stakeholder syncs shaping each pass.",
    systemNotes: [
      {
        heading: "Positioning",
        body: "Competitors lead with trust badges and instant booking. Sterling states its licensing and insurance in one confident line and puts the weight on taste and exclusivity, modeled on the hospitality brands the client pointed to as references.",
      },
      {
        heading: "Client-driven iteration",
        body: "Feedback from stakeholder syncs turns directly into build passes. The home page's detail tiles now link each claim to the page that backs it up, and the site got a full-screen mobile nav after the founders found the menu missing on phones.",
      },
      {
        heading: "Current stage",
        body: "Core pages are built. Final copy sign-off, gallery photography, and the contact form's email delivery are still open before launch.",
      },
    ],
    links: [],
    media: [],
  },
  {
    id: "yosi-archive",
    ref: "08",
    title: "YOSI ARCHIVE",
    year: 2026,
    discipline: ["Headless Commerce", "Client Consulting"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shopify Storefront API", "GraphQL", "Vercel"],
    role: "Independent Technical Consultant & Developer",
    status: "in-progress",
    summary:
      "Brutalist headless Shopify storefront for an archival clothing brand, with a custom front end on Shopify checkout.",
    overview:
      "YOSI Archive is a digital flagship for an archival clothing seller. It's a custom brutalist storefront built in Next.js, with Shopify handling products, inventory, and checkout through the Storefront API. The MVP is scoped to a homepage and a filterable catalog, with guest checkout through Shopify's native flow so there's no custom auth to build or maintain.",
    systemNotes: [
      {
        heading: "Headless architecture",
        body: "A server-only GraphQL client reads products from the Shopify Storefront API, so the access token never reaches the browser. The catalog uses incremental revalidation, so new pieces show up within a minute without a redeploy.",
      },
      {
        heading: "Scope discipline",
        body: "Checkout goes to Shopify's hosted checkout URL instead of a custom cart and payment flow. That keeps the MVP small, secure, and cheap to run for a single-owner brand.",
      },
      {
        heading: "Current stage",
        body: "The storefront is connected to the live Shopify store and the catalog renders real products. Product detail, the cart flow, and a preview deploy for client review come next.",
      },
    ],
    links: [],
    media: [],
  },
  {
    id: "back-issue-supply",
    ref: "09",
    title: "BACK ISSUE SUPPLY",
    year: 2026,
    discipline: ["Shopify Theme", "Concept Build"],
    stack: ["Shopify", "Liquid", "JavaScript", "Metaobjects", "Shopify Flow"],
    role: "Designer & Developer, Malden Studios",
    status: "live",
    statusLabel: "Live demo",
    summary:
      "A vintage denim dealer's Shopify store built like an interactive Japanese denim magazine, the magazine you can take apart.",
    overview:
      "Back Issue Supply is a concept brand I built through my studio, Malden Studios: an archive dealer selling one-of-one 1940s–80s denim and workwear to collectors who read product pages like spec sheets. The store is laid out as an issue of a magazine. The home page is the current issue, every garment is a numbered lot with a museum-label spec sheet, and pieces that sell become \"back issues\" in a permanent, filterable Archive. Alongside the theme I built a five-section pack designed from day one to be sold separately.",
    systemNotes: [
      {
        heading: "Theme + section pack",
        body: "A fork of Shopify's Horizon theme with custom masthead, lot cards, Archive and lot templates, plus archive-pack: five clean-room, single-file sections (issue cover, contents, lot hotspots, detail spread, spec sheet) that work in any theme. Horizon's licence doesn't allow redistributing its code, so the sellable sections were written from scratch and synced into the theme by a script.",
      },
      {
        heading: "Data model + automation",
        body: "Issue, contents and annotation metaobjects plus 13 product metafields, all editable in the admin. A Shopify Flow rule moves a one-of-one to the Archive and stamps its sold date when stock hits zero; Search & Discovery filters by decade, mill and garment type.",
      },
      {
        heading: "Progressive enhancement",
        body: "Hotspot details are an ordered list in the HTML: without JavaScript you get a readable numbered list, with it you get markers and a sliding drawer. The detail spread's sticky layout is pure CSS, and theme JavaScript totals about 3 KB gzipped.",
      },
      {
        heading: "Measured results",
        body: "Lighthouse mobile (median of 3): Performance 98–100, CLS 0, SEO 100 across home, lot and Archive pages. A 76-check browser QA suite covers phone and desktop widths, keyboard-only paths, reduced motion and no-JS.",
      },
      {
        heading: "Imagery",
        body: "A concept store, so no real inventory: the cover and one lot use licensed Unsplash photos, and the other lots and close-ups are AI-generated from one fixed prompt so they read as a single shoot. A client build would swap in real product photography.",
      },
    ],
    links: [{ label: "Live demo (password: issue07)", href: "https://malden-studio.myshopify.com" }],
    featured: 2,
    media: [
      { type: "image", device: "desktop", src: "/work/back-issue-supply/desktop-01-home.webp", alt: "Back Issue Supply home page: the Issue 07 magazine cover over a selvedge denim photo", caption: "Home · Issue 07 cover", aspectRatio: 1600 / 1083 },
      { type: "image", device: "desktop", src: "/work/back-issue-supply/desktop-02-detail-spread.webp", alt: "Back Issue Supply detail spread: 'Anatomy of a five-pocket' with numbered callouts", caption: "Detail spread · Anatomy of a five-pocket", aspectRatio: 1600 / 1083 },
      { type: "image", device: "desktop", src: "/work/back-issue-supply/desktop-04-feature-lot.webp", alt: "Back Issue Supply feature lot page for Lot 0161 with its museum-label spec sheet", caption: "Lot 0161 · feature", aspectRatio: 1600 / 1083 },
      { type: "image", device: "desktop", src: "/work/back-issue-supply/desktop-05-sold-lot.webp", alt: "Back Issue Supply sold lot page with a 'Notify me of similar pieces' prompt", caption: "Sold lot 0152", aspectRatio: 1600 / 1083 },
      { type: "image", device: "desktop", src: "/work/back-issue-supply/desktop-03-archive.webp", alt: "Back Issue Supply Archive: a filterable grid of sold pieces", caption: "Archive", aspectRatio: 1600 / 1083 },
      { type: "image", device: "phone", src: "/work/back-issue-supply/phone-02-lot-hotspot.webp", alt: "Back Issue Supply on a phone: a lot's annotation close-up in a bottom sheet", caption: "Lot 0147 · annotation close-up", aspectRatio: 600 / 1151 },
      { type: "image", device: "phone", src: "/work/back-issue-supply/phone-01-home.webp", alt: "Back Issue Supply phone home: magazine cover and contents", caption: "Home", aspectRatio: 600 / 1151 },
      { type: "image", device: "phone", src: "/work/back-issue-supply/phone-04-detail-spread.webp", alt: "Back Issue Supply phone detail spread with numbered callouts", caption: "Detail spread", aspectRatio: 600 / 1151 },
      { type: "image", device: "phone", src: "/work/back-issue-supply/phone-03-archive.webp", alt: "Back Issue Supply phone Archive with filters", caption: "Archive filters", aspectRatio: 600 / 1151 },
    ],
  },
];
