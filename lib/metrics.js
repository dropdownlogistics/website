// lib/metrics.js
// Single source of truth for all DDL dynamic numbers.
// Update a value here; every page that imports METRICS picks it up automatically.
// No need to hunt across 20 files when a count changes.

import { ROUTE_COUNT } from './site-routes.js';

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
  // DERIVED 2026-08-17. This was a CHECKED constant for the whole of
  // STANDARDIZATION-001, because the wings array lived inside
  // app/sitemap/page.jsx and referenced that page's local colour palette. It now
  // lives in lib/site-routes.js with colours stored as token names, so this
  // COUNTS instead of claiming.
  //
  // The "+" is deliberate and is not rounding. ROUTE_COUNT is the site's
  // CURATED map — the routes it presents as its own surface — not an
  // enumeration of every route Next builds. The number is a floor that was
  // actually counted, and "+" says exactly that.
  //
  // This value can no longer be wrong by neglect. It can still be wrong by
  // omission: adding a route without adding it to lib/site-routes.js leaves it
  // uncounted — the same class of gap as the 44 undeclared property routes
  // (STD §1.4), and not fixed by this change.
  DDL_ROUTES: `${ROUTE_COUNT}+`,

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
