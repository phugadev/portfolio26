/* ============================================================
   lib/site.ts — all content, typed. Edit here, not in JSX.
   ============================================================ */

export type BandKey = "590" | "520" | "470" | "405";

export interface Wavelength {
  nm: BandKey;
  name: string;
  cssVar: string; // e.g. "var(--l590)"
  aug: boolean;
  copy: string;
}

export const wavelengths: Wavelength[] = [
  {
    nm: "590",
    name: "INTERFACE",
    cssVar: "var(--l590)",
    aug: false,
    copy: "React, Next.js, design systems. The surface people actually touch, built to feel inevitable.",
  },
  {
    nm: "520",
    name: "SYSTEMS",
    cssVar: "var(--l520)",
    aug: false,
    copy: "APIs, data, services. TypeScript, Python, SQL/NoSQL. The part that has to be right at 3am.",
  },
  {
    nm: "470",
    name: "CLOUD",
    cssVar: "var(--l470)",
    aug: true,
    copy: "Infrastructure as code, CI/CD, deploys that survive Fridays. Bolted on, kept sharp.",
  },
  {
    nm: "405",
    name: "INTELLIGENCE",
    cssVar: "var(--l405)",
    aug: true,
    copy: "LLM tooling, retrieval, agents — wired into real products, measured like software.",
  },
];

/* hex values for canvas / JS use (kept in sync with globals.css) */
export const wavelengthHex: Record<BandKey, string> = {
  "590": "#FFA028",
  "520": "#3CF58F",
  "470": "#38CFFF",
  "405": "#A97DFF",
};

export interface Capstone {
  id: string;
  hue: BandKey; // dominant band, drives card accent
  status: string;
  title: string;
  workingTitle: boolean;
  body: string;
  proves: string;
  edge: string;
  bands: BandKey[]; // lit bands
}

export const capstones: Capstone[] = [
  {
    id: "CAPSTONE 01",
    hue: "405",
    status: "IN BUILD · TARGET Q3 2026",
    title: "AI music provenance",
    workingTitle: true,
    body:
      "Fingerprinting AI-derived music at scale: detecting when generated tracks lean on copyrighted human works, even where conventional fingerprinting breaks down. Built for rights-holders, treated as an engineering problem — audio DSP meets production ML.",
    proves:
      "Hard-domain AI shipped to production by one engineer — ingest, analysis, evidence, at scale.",
    edge: "Audio production & DSP background most fullstack engineers don't have.",
    bands: ["590", "520", "470", "405"],
  },
  {
    id: "CAPSTONE 02",
    hue: "590",
    status: "IN DEFINITION",
    title: "AI CMO for frontier tech",
    workingTitle: true,
    body:
      "Narrative and marketing intelligence for companies building hard things — AI, energy, robotics — in emerging markets. Sectors full of substance and short on story; this closes the gap between what they build and how the world (and their investors) hears about it.",
    proves:
      "A revenue-facing AI product with a repeatable partnership motion, run end to end.",
    edge: "Positioning instinct applied where the market gap is narrative, not tech.",
    bands: ["590", "520", "405"],
  },
];

export type CredentialType = "CERT" | "COURSE" | "EXAM" | "TARGET";

export interface Credential {
  id: string;
  type: CredentialType;
  provider: string;
  title: string;
  year: string;
  bands: BandKey[];
  url: string | null;
}

export const credentials: Credential[] = [
  {
    id: "C-01",
    type: "CERT",
    provider: "SEMRUSH",
    title: "SEO Fundamentals",
    year: "2023",
    bands: ["590"],
    url: null,
  },
  {
    id: "C-02",
    type: "TARGET",
    provider: "GOOGLE",
    title: "Professional Cloud Architect",
    year: "2026",
    bands: ["470"],
    url: null,
  },
  {
    id: "C-03",
    type: "TARGET",
    provider: "DEEPLEARNING.AI",
    title: "Machine Learning Specialization",
    year: "2026",
    bands: ["405"],
    url: null,
  },
  {
    id: "C-04",
    type: "TARGET",
    provider: "DEEPLEARNING.AI",
    title: "Generative AI with Large Language Models",
    year: "2026",
    bands: ["405"],
    url: null,
  },
];

export interface Principle {
  id: string;
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    id: "P-01",
    title: "Boring in production is a feature.",
    body: "Flair belongs in the design phase. Once it ships, the highest compliment a system can earn is that nobody talks about it.",
  },
  {
    id: "P-02",
    title: "One engineer, whole pipeline.",
    body: "Owning idea → architecture → build → deploy → operate removes the most expensive thing on any project: hand-off loss.",
  },
  {
    id: "P-03",
    title: "Complexity must be earned.",
    body: "Every dependency, service and abstraction pays rent or gets evicted. This applies to this website too.",
  },
];

export interface LogEntry {
  v: string;
  date: string;
  msg: string;
  current?: boolean;
}

export const changelog: LogEntry[] = [
  {
    v: "v5.5",
    date: "2026-07",
    msg: "phugadev pixel avatar in nav brand. Hamburger icon alignment fix on mobile. Scroll-cue restored to bottom-right absolute position.",
    current: true,
  },
  {
    v: "v5.4",
    date: "2026-07",
    msg: "WebGL Prism hero background (ogl). Tech-stack marquee strip. Live London clock in header. Dispersion mobile redesign: 2×2 tappable band tiles replace unreadable SVG. Numbered credential/system IDs retained.",
  },
  {
    v: "v5.3",
    date: "2026-07",
    msg: "Mobile hamburger menu with animated toggle. Credentials section replaces placeholder work. CSS dot-grid background. Hero cascade entrance animations. Capstone hover glow + lift. Active-section nav underline. Dispersion overflow fix.",
  },
  {
    v: "v5.2",
    date: "2026-07",
    msg: "Centred full-viewport hero with scroll cue. Dispersion simplified to hover-highlight. Glitch made periodic. Full-width dividers removed. Ported to Next.js 15 + TypeScript.",
  },
  {
    v: "v5.1",
    date: "2026-07",
    msg: "Merge pass — condensed display voice, interactive dispersion, palette tuned, capstones named, module framing, status chips.",
  },
  {
    v: "v5.0",
    date: "2026-07",
    msg: "Signal — dark direction rebuilt around a wavelength taxonomy. Dispersion legend, capstone programme, augmented-stack schematic.",
  },
  {
    v: "v4.0",
    date: "2026-06",
    msg: "Atlas — restraint-forward fork. Graphite on paper, operating-model diagram, interaction-earned colour.",
  },
  {
    v: "v3.4",
    date: "2026-06",
    msg: "HUD refinements — operational panel, IR35 status, magnetic cards, mechanical transitions.",
  },
  {
    v: "v3.0",
    date: "2026-05",
    msg: "Portfolio OS — first dark instrument-panel concept. Kinetic dot-field hero.",
  },
];

export const site = {
  version: "v5.5",
  directionName: "SIGNAL",
  name: "Enric Trillo",
  brand: "enric.trillo",
  eyebrow: "ENRIC TRILLO · SENIOR FULLSTACK ENGINEER",
  lede:
    "I design, build and ship production software end to end — the interface people touch, the systems underneath, and the cloud and intelligence layers bolted on top. Seven-plus years in production. Currently building two capstone products in the open to prove the whole pipeline, solo.",
  chips: ["AVAILABLE · Q3 2026", "OUTSIDE IR35", "LONDON, UK", "REMOTE"],
  opPanel: [
    { k: "STATUS", v: "AVAILABLE · Q3 2026", hot: true },
    { k: "ENGAGEMENT", v: "CONTRACT · OUTSIDE IR35", hot: false },
    { k: "LOCATION", v: "LONDON / REMOTE", hot: false },
    { k: "OPERATES AS", v: "METASYDE (LTD)", hot: false },
  ],
  stackNote:
    '"Augmented" isn\'t a job title — it\'s a maintenance policy. The core is the career; the modules are deliberate additions, each taken to production depth before the next dock opens. Certified: Semrush. Targeting: Google Cloud · DeepLearning.AI.',
  links: {
    email: "mailto:hello@metasyde.com",
    linkedin: "https://www.linkedin.com/in/enrictrillo/",
    github: "https://github.com/phugadev",
    x: "https://x.com/phugadev",
  },
};
