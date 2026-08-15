// lib/products.js
// Single source of truth for DDL product RECORDS (structured).
//
// Companion to lib/metrics.js:
//   - metrics.js  = the dynamic NUMBERS (one place, propagates everywhere).
//   - products.js = the structured PRODUCT records (wing, status, url, accent, auth, prose).
//
// CONTRACT (STD-DDL-LLMS-001; ratified as CR-DDL-LLMSBASE-001 v1.1, 2026-07-23):
//   - Counts REFERENCE METRICS. Never hardcode a number here — import it.
//   - This module is the SAME source read by (a) the landing-page wings and
//     (b) the generate-llms script that emits each site's /llms.txt addendum.
//   - publicationStatus: 'verified' | 'pending' | 'withheld'  (R8, fail-closed)
//       ONLY 'verified' records emit public facts. 'pending'/'withheld' are
//       skipped by the generator. A record with no publicationStatus is treated
//       as NOT verified (fail closed) — never guess a record into publication.
//   - pages        = routes that EXIST and resolve, ALWAYS RELATIVE TO THE
//                    PRODUCT'S OWN ROOT (`url`), never repeating a path that
//                    `url` already carries. Checked by
//                    scripts/verify-product-routes.mjs; a 404 here is a failure.
//                    One rule since SD-002 (2026-08-15) — three shapes coexisted
//                    before that and each needed different resolution logic.
//   - plannedPages = routes that are INTENDED and not built yet. Checked the
//                    other way: if one starts resolving it should be promoted
//                    into `pages`.
//       SD-001 (STANDARDIZATION-001, 2026-08-14). These were one field, which
//       meant a record could assert a route it did not have while sitting next
//       to publicationStatus:'verified'. Splitting them keeps the intent —
//       AuditForge's /pricing and /branding are genuinely planned, it is the
//       org's cited reference implementation — without letting intent read as
//       fact. Same distinction as stated-vs-derived elsewhere in this repo.
//
// Wings were re-cut to 4 + a foundation on 2026-07-23 (Operator-approved).

import { METRICS } from './metrics.js';

// ── WINGS (the circulating families on the landing hero) ────────────────────
export const WINGS = [
  {
    id: 'professional-systems',
    name: 'Professional Systems',
    order: 1,
    accent: '#B23531',
    belief: 'Govern operational work. The reference implementation proves it works.',
  },
  {
    id: 'knowledge-systems',
    name: 'Knowledge Systems',
    order: 2,
    accent: '#2C7A7B',
    belief: 'Preserve institutional memory. One stores, one retrieves — together they make the corpus permanent.',
  },
  {
    id: 'markets-wagers',
    name: 'Markets & Wagers',
    order: 3,
    accent: '#22C55E',
    belief: 'Measure behavior honestly where money is on the line. Personal evidence, not enterprise data.',
  },
  {
    id: 'personal-record',
    name: 'Personal Record',
    order: 4,
    accent: '#C49A3C',
    belief: 'Your life, verified and portable. The proof exists before the memory fades.',
  },
];

// ── FOUNDATION (the layer beneath the wings — not products you choose) ───────
export const FOUNDATION = [
  {
    id: 'ledger',
    name: 'Ledger',
    role: 'evidence-layer',
    accent: '#B23531',
    belief: 'The evidence layer. Surfaces when products generate enough verified data to connect.',
    publicationStatus: 'verified',
  },
  {
    id: 'substrate',
    name: 'Substrate',
    role: 'governance-layer',
    accent: '#6B7B8D',
    belief: 'The governance layer. Where DDL records and enforces its own decisions.',
    publicationStatus: 'pending', // facts not yet source-confirmed
  },
];

// ── PRODUCTS (repo-backed roster only — Operator scope ruling 2026-07-23) ────
// status vocab: live | beta | invite | waitlist | concept | case-study
//   case-study = a self-contained DDL Case Study demo (no live deploy, no backend)
// auth vocab:   none | google-oauth   (all demos are auth-free after the 2026-07-23 Clerk teardown)
// lifecycle (R4): active | experimental | case-study | private | archived | superseded | retired
export const PRODUCTS = [
  // Professional Systems ─────────────────────────────────────────────────────
  {
    id: 'auditforge',
    name: 'AuditForge',
    wing: 'professional-systems',
    status: 'live',
    publicationStatus: 'verified',
    tagline: 'The audit package generates itself.',
    url: 'https://auditforge.dev',
    repo: 'dropdownlogistics/auditforge',
    pages: ['/'],
    plannedPages: ['/branding', '/pricing'], // SD-001 · both 404 as of 2026-08-14 · PA7-FINDING-002
    accent: '#B23531',
    auth: 'none',
    stack: ['Next.js', 'Prisma', 'Neon Postgres', 'Vercel'],
    counts: [
      { label: 'controls', value: METRICS.AF_CONTROLS, sourceKey: 'AF_CONTROLS' },
      { label: 'auditors', value: METRICS.AF_AUDITORS, sourceKey: 'AF_AUDITORS' },
      { label: 'engagements', value: METRICS.AF_ENGAGEMENTS, sourceKey: 'AF_ENGAGEMENTS' },
    ],
    prose: 'content/llms/auditforge.md',
  },
  {
    id: 'workbench',
    name: 'WorkBench',
    wing: 'professional-systems',
    status: 'beta',
    publicationStatus: 'verified',
    tagline: "You're not buying a suite. You're building a stack.",
    url: 'https://workbench-ddl.vercel.app',
    repo: 'dropdownlogistics/workbench',
    pages: ['/'],
    plannedPages: ['/pricing'], // SD-001 · 404 as of 2026-08-14 (tiers live at dropdownlogistics.com/workbench/pricing)
    accent: '#3B82F6', // WorkBench Light — sanctioned standalone theme (v3.0 pending)
    auth: 'none',
    stack: ['Next.js'],
    counts: [],
    prose: 'content/llms/workbench.md',
  },
  {
    id: 'fleetline',
    name: 'Fleetline',
    wing: 'professional-systems', // Analytics Engine · freight brokerage ops
    status: 'case-study',
    publicationStatus: 'verified',
    tagline: 'Freight operations intelligence — load lifecycle, carrier scoring, lane revenue, exception management.',
    url: null, // no standalone deploy — case study hosted on the main site
    repo: null,
    pages: ['/projects/fleetline'],
    accent: '#F59E0B', // amber — primary throughout the case study
    auth: 'none',
    stack: ['Next.js', 'Vercel'],
    counts: [], // all page numbers are demo/sample illustration — none sourced from METRICS
    prose: null, // covered by the main-site base llms.txt; no standalone addendum
  },

  // Knowledge Systems ─────────────────────────────────────────────────────────
  {
    id: 'knowledge-vault',
    name: 'DDL Knowledge Vault',
    wing: 'knowledge-systems',
    status: 'live',
    publicationStatus: 'verified',
    tagline: 'Institutional memory, governed and permanent.',
    url: 'https://dropdownlogistics.github.io/knowledge-vault/',
    repo: 'dropdownlogistics/knowledge-vault',
    pages: ['/'],
    accent: '#2C7A7B',
    auth: 'none',
    counts: [
      { label: 'corpus chunks', value: METRICS.CORPUS_CHUNKS, sourceKey: 'CORPUS_CHUNKS' },
      { label: 'collections', value: METRICS.CORPUS_COLLECTIONS, sourceKey: 'CORPUS_COLLECTIONS' },
      { label: 'vault folders', value: METRICS.VAULT_FOLDERS, sourceKey: 'VAULT_FOLDERS' },
    ],
    prose: 'content/llms/knowledge-vault.md',
  },
  {
    id: 'dex',
    name: 'Dex Jr.',
    wing: 'knowledge-systems',
    status: 'live',
    publicationStatus: 'verified',
    tagline: 'The local council seat. Retrieval over the full governed archive.',
    url: 'https://dropdownlogistics.com/dexverse/dex-jr',
    repo: 'dropdownlogistics/dex-rag',
    // SD-002 (2026-08-15): was ['/dexverse/dex-jr'], which duplicated the path
    // already in `url` — the only record in the registry doing so. Normalized
    // to the rule every other record already followed: PAGES ARE RELATIVE TO
    // THE PRODUCT'S OWN ROOT. Naive concatenation of the old shape produced
    // /dexverse/dex-jr/dexverse/dex-jr, which is how it was found.
    pages: ['/'],
    accent: '#8A6CC9',
    auth: 'none',
    counts: [],
    prose: 'content/llms/dex.md',
  },
  {
    id: 'excelligence',
    name: 'Excelligence',
    wing: 'knowledge-systems',
    status: 'live',
    publicationStatus: 'verified',
    tagline: 'Excel knowledge, governed and graphed.',
    url: 'https://excelligence.dev',
    repo: 'dropdownlogistics/excelligence',
    pages: ['/', '/explorer', '/pricing'],
    accent: '#D4A843',
    auth: 'none',
    counts: [
      { label: 'entries', value: METRICS.EXCEL_ENTRIES, sourceKey: 'EXCEL_ENTRIES' },
      { label: 'edges', value: METRICS.EXCEL_EDGES, sourceKey: 'EXCEL_EDGES' },
      { label: 'types', value: METRICS.EXCEL_TYPES, sourceKey: 'EXCEL_TYPES' },
      { label: 'tiers', value: METRICS.EXCEL_TIERS, sourceKey: 'EXCEL_TIERS' },
    ],
    // prose lives in ddl-canon/products/excelligence — regeneration routes through Ezra (DDL-3008)
    prose: null,
    canonProse: true,
  },

  // Markets & Wagers ──────────────────────────────────────────────────────────
  {
    id: 'blindspot',
    name: 'BlindSpot',
    wing: 'markets-wagers',
    status: 'beta',
    publicationStatus: 'verified',
    tagline: "The house doesn't have better odds. It has better data.",
    url: 'https://blindspot.bet',
    repo: 'dropdownlogistics/blindspot-bet',
    pages: ['/'],
    plannedPages: ['/branding', '/pricing'], // SD-001 · both 404 as of 2026-08-14
    accent: '#22C55E',
    auth: 'none',
    stack: ['Next.js'],
    counts: [
      { label: 'tilt patterns', value: METRICS.BS_TILT_PATTERNS, sourceKey: 'BS_TILT_PATTERNS' },
    ],
    prose: 'content/llms/blindspot.md',
  },
  {
    id: 'positionbook',
    name: 'PositionBook',
    wing: 'markets-wagers',
    status: 'invite',
    publicationStatus: 'verified',
    tagline: 'You are not losing. You are not tracking.',
    url: 'https://positionbook.vercel.app',
    repo: 'dropdownlogistics/positionbook',
    pages: ['/'],
    accent: '#22C55E',
    auth: 'none',
    stack: ['Next.js'],
    counts: [
      { label: 'trades analyzed', value: METRICS.PB_TRADES, sourceKey: 'PB_TRADES' },
      { label: 'win rate', value: METRICS.PB_WIN_RATE, sourceKey: 'PB_WIN_RATE' },
      { label: 'avg R', value: METRICS.PB_AVG_R, sourceKey: 'PB_AVG_R' },
    ],
    prose: 'content/llms/positionbook.md',
  },
  {
    id: 'leverage',
    name: 'Leverage',
    wing: 'markets-wagers',
    status: 'concept',
    publicationStatus: 'pending', // facts not yet source-confirmed
    tagline: '',
    url: null,
    repo: 'dropdownlogistics/leverage-app',
    pages: [],
    accent: null,
    auth: 'none',
    counts: [],
  },

  // Personal Record ───────────────────────────────────────────────────────────
  {
    id: 'slopestat',
    name: 'SlopeStat',
    wing: 'personal-record',
    status: 'live',
    publicationStatus: 'verified',
    tagline: 'Your rides. Your boards. Your card.',
    url: 'https://slopestat.vercel.app',
    repo: 'dropdownlogistics/slopestat',
    pages: ['/'],
    accent: '#C49A3C',
    auth: 'none',
    counts: [
      { label: 'peak speed logged', value: METRICS.SS_PEAK_SPEED, sourceKey: 'SS_PEAK_SPEED' },
    ],
    prose: 'content/llms/slopestat.md',
  },
  {
    id: 'admitone',
    name: 'AdmitOne',
    wing: 'personal-record',
    status: 'waitlist',
    publicationStatus: 'verified',
    tagline: 'Not what you streamed. Not what you rated. What you showed up for.',
    url: 'https://admitone.vercel.app',
    repo: 'dropdownlogistics/admitone',
    pages: ['/'],
    accent: '#C49A3C',
    auth: 'none',
    counts: [],
    prose: 'content/llms/admitone.md',
  },
  {
    id: 'healthstack',
    name: 'HealthStack',
    wing: 'personal-record', // Governance Architecture · local-first health
    status: 'case-study',
    publicationStatus: 'verified',
    tagline: 'Personal health intelligence — encrypted local-first observation capture, governed AI output envelope, sensitivity-tiered data sovereignty.',
    url: null, // no standalone deploy — case study hosted on the main site
    repo: null,
    pages: ['/projects/healthstack'],
    accent: '#0EA5E9', // sky blue — primary throughout the case study
    auth: 'none',
    stack: ['SQLite', 'DuckDB', 'Next.js'],
    counts: [], // demo data only — none sourced from METRICS
    prose: null, // covered by the main-site base llms.txt; no standalone addendum
  },
  {
    id: 'fuellog',
    name: 'FuelLog',
    wing: 'personal-record',
    status: 'concept',
    publicationStatus: 'pending', // facts not yet source-confirmed
    tagline: '',
    url: null,
    repo: 'dropdownlogistics/fuellog',
    pages: [],
    accent: null,
    auth: 'none',
    counts: [],
  },
];

// ── Convenience selectors ────────────────────────────────────────────────────
export const productsByWing = (wingId) => PRODUCTS.filter((p) => p.wing === wingId);

// Generator gate (R2 + R8, fail-closed): a record emits an addendum ONLY if it
// is explicitly publicationStatus:'verified', not canon-hosted, and has prose.
export const generatableProducts = () =>
  PRODUCTS.filter((p) => p.publicationStatus === 'verified' && !p.canonProse && p.prose);
