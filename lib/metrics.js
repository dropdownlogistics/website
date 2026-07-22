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
  DDL_ROUTES: '160+',

  // ── Excelligence ────────────────────────────────────────────────────
  EXCEL_ENTRIES: 105,
  EXCEL_EDGES: 228,
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
