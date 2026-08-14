// lib/metrics.js
// Single source of truth for all DDL dynamic numbers.
// Update a value here; every page that imports METRICS picks it up automatically.
// No need to hunt across 20 files when a count changes.

export const METRICS = {

  // ── Corpus / Dex Jr. ────────────────────────────────────────────────
  CORPUS_CHUNKS: '540K+',        // conservative placeholder — pending full audit
  CORPUS_COLLECTIONS: 9,
  VAULT_FOLDERS: 44,

  // ── DDL catalog aggregate stats ──────────────────────────────────────
  DDL_PRODUCTS: 10,
  DDL_FAMILIES: 5,
  DDL_GOVERNED_SYSTEMS: '44+',
  DDL_STANDARDS: '65+',
  // SD-004 (2026-08-14): was '160+' while /sitemap independently DERIVED 200
  // from its own wings array. Two pages on one site answering the same
  // question differently, one computed and one typed — the same failure shape
  // as PA7-FINDING-003 (WorkBench) and -007 (Knowledge Vault), on the front
  // door. Corrected to the derived figure and pinned by
  // scripts/verify-metrics-drift.mjs, which recounts the source and fails if
  // this drifts again.
  // NOT yet derived at import time: the wings array lives inside
  // app/sitemap/page.jsx and references that page's local colour palette, so
  // extracting it to lib/ is a real refactor — carried to the standards pass
  // rather than done unattended. Until then this is a CHECKED constant, not a
  // derived one, and the distinction is the point.
  DDL_ROUTES: '200+',

  // ── Excelligence ────────────────────────────────────────────────────
  EXCEL_ENTRIES: 123,
  EXCEL_EDGES: 337,
  EXCEL_TYPES: 7,
  EXCEL_TIERS: 4,
  EXCEL_STANDARDS: 2,

  // ── AuditForge ──────────────────────────────────────────────────────
  AF_CONTROLS: 106,
  AF_AUDITORS: 47,
  AF_PROCESS_AREAS: 9,
  AF_RISKS: 17,
  AF_ENGAGEMENTS: 4,
  AF_DOC_TYPES: 4,

  // ── PositionBook ────────────────────────────────────────────────────
  PB_TRADES: 241,
  PB_WIN_RATE: '30.5%',
  PB_AVG_R: '2.31R',

  // ── SlopeStat ───────────────────────────────────────────────────────
  SS_PEAK_SPEED: '64.9 mph',

  // ── BlindSpot ───────────────────────────────────────────────────────
  BS_TILT_PATTERNS: 12,

};
