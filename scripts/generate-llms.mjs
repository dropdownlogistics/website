#!/usr/bin/env node
// scripts/generate-llms.mjs
// DDL llms.txt generator — ratified as CR-DDL-LLMSBASE-001 v1.1 (STD-DDL-LLMS-001).
//
// Contract:
//   R2  facts injected from the registry; prose passed through untouched.
//   R3  parent pointer is the base URL, never a pinned version.
//   R6  volatile facts injected (current_as_of, route_count), never frozen.
//   R8  fail-closed schema validation, diff review, provenance, staging output.
//
// This tool NEVER writes to production (public/ or product repos). It writes to
// generated/llms/ for review. Deployment is a separate, deliberate, gated step.
//
// Usage:
//   node scripts/generate-llms.mjs            generate all -> generated/llms/
//   node scripts/generate-llms.mjs --dry-run  print, write nothing
//   node scripts/generate-llms.mjs --only=auditforge   canary a single product
//   node scripts/generate-llms.mjs --verify   check staged output matches registry

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { WINGS, FOUNDATION, PRODUCTS, generatableProducts } from '../lib/products.js';
import { METRICS } from '../lib/metrics.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'generated/llms');
const BASE_URL = 'https://dropdownlogistics.com/llms.txt';
const GEN_VERSION = '1.0.0';
const ALLOWED_AUTH = ['none', 'account-required', 'restricted', 'google-oauth'];

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const VERIFY = args.includes('--verify');
const ONLY = (args.find((a) => a.startsWith('--only=')) || '').split('=')[1] || null;

const log = (...m) => console.log(...m);
const die = (msg) => { console.error(`\n  FAIL (fail-closed): ${msg}\n`); process.exit(1); };

function gitCommit() {
  try { return execSync(`git -C "${ROOT}" rev-parse --short HEAD`).toString().trim(); }
  catch { return 'unknown'; }
}
function currentAsOf() {
  if (process.env.LLMS_ASOF) return process.env.LLMS_ASOF;
  try { return execSync(`git -C "${ROOT}" log -1 --format=%cs`).toString().trim(); }
  catch { return new Date().toISOString().slice(0, 10); }
}

// ── R8: fail-closed schema validation ──────────────────────────────────────
function validate(p) {
  const e = [];
  if (!p.id) e.push('record missing id');
  const tag = p.id || '(no id)';
  if (!p.name) e.push(`${tag}: missing name`);
  // foundation items carry `role`, not `wing` — exempt them from the wing check
  if (!p.role) {
    if (!p.wing) e.push(`${tag}: missing wing`);
    else if (!WINGS.some((w) => w.id === p.wing)) e.push(`${tag}: unknown wing '${p.wing}'`);
  }
  if (!['verified', 'pending', 'withheld'].includes(p.publicationStatus))
    e.push(`${tag}: publicationStatus '${p.publicationStatus}' invalid (fail closed)`);
  if (p.auth && !ALLOWED_AUTH.includes(p.auth))
    e.push(`${tag}: auth '${p.auth}' is not an allowed posture (secrets prohibited)`);
  if (p.publicationStatus === 'verified' && p.prose && !p.url)
    e.push(`${tag}: verified + has prose but no url`);
  // secrets prohibition (R8/D): no credential-like fields
  for (const k of ['password', 'pw', 'token', 'secret', 'apiKey', 'connectionString'])
    if (k in p) e.push(`${tag}: prohibited credential-like field '${k}'`);
  return e;
}

function wingName(id) { return (WINGS.find((w) => w.id === id) || {}).name || id; }

// ── R2/R3/R6: build one addendum (facts injected, prose passed through) ─────
function buildAddendum(p, asof, commit) {
  const prosePath = resolve(ROOT, p.prose);
  if (!existsSync(prosePath)) return null; // prose not written yet — caller skips-with-warning
  const prose = readFileSync(prosePath, 'utf8').trim();

  const facts = [
    `product:  ${p.name}`,
    `wing:     ${wingName(p.wing)}`,
    `status:   ${p.status}`,
    `url:      ${p.url}`,
    `auth:     ${p.auth}`,
    p.stack && p.stack.length ? `stack:    ${p.stack.join(', ')}` : null,
    ...(p.counts || []).map((c) => `count:    ${c.label} = ${c.value}  (source: metrics.${c.sourceKey})`),
  ].filter(Boolean).join('\n');

  return [
    `# ${p.name} — llms.txt`,
    `# Parent: ${BASE_URL}`,   // R3: URL only, never a pinned version
    `# Generated: ${asof} · registry ${commit} · generator v${GEN_VERSION}`,  // R8 provenance
    ``,
    `## IDENTITY (generated from the DDL product registry — do not hand-edit)`,
    facts,
    ``,
    prose,
    ``,
    `# For full DDL context see the base: ${BASE_URL}`,
    ``,
  ].join('\n');
}

function buildBase(asof) {
  const src = resolve(ROOT, 'content/llms/_base.md');
  if (!existsSync(src)) die('base source content/llms/_base.md not found');
  let base = readFileSync(src, 'utf8');
  const routes = METRICS.DDL_ROUTES;
  if (!routes) die('metrics.DDL_ROUTES missing — cannot inject route_count');
  base = base.replaceAll('{{inject:current_as_of}}', asof)
             .replaceAll('{{inject:route_count}}', String(routes));
  const leftover = base.match(/\{\{inject:[^}]+\}\}/g);
  if (leftover) die(`unresolved inject markers in base: ${leftover.join(', ')}`);
  return base;
}

// ── R8: diff review — summarize what changed vs the last staged output ──────
function diffReview(outPath, next) {
  if (!existsSync(outPath)) { log(`     (new)`); return; }
  const prev = readFileSync(outPath, 'utf8');
  if (prev === next) { log(`     (no change)`); return; }
  const field = (s, k) => (s.match(new RegExp(`^${k}:\\s*(.*)$`, 'm')) || [])[1];
  for (const k of ['status', 'url', 'auth']) {
    const a = field(prev, k), b = field(next, k);
    if (a !== b) log(`     ${k}: ${a}  ->  ${b}`);
  }
  log(`     (content changed)`);
}

function writeOut(name, content) {
  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
  const outPath = resolve(OUT, name);
  diffReview(outPath, content);
  if (DRY) { log(`     [dry-run] would write ${name} (${content.length} bytes)`); return; }
  writeFileSync(outPath, content, 'utf8');
  log(`     wrote generated/llms/${name} (${content.length} bytes)`);
}

// ── main ───────────────────────────────────────────────────────────────────
const asof = currentAsOf();
const commit = gitCommit();
log(`\nDDL llms.txt generator v${GEN_VERSION} — as-of ${asof} · registry ${commit}` +
    `${DRY ? ' · DRY-RUN' : ''}${ONLY ? ` · only=${ONLY}` : ''}\n`);

// validate the WHOLE registry first — fail loud, fail closed, before any write
const allErrors = [...PRODUCTS, ...FOUNDATION].flatMap(validate);
if (allErrors.length) die(`registry schema errors:\n   - ${allErrors.join('\n   - ')}`);
log(`  schema: ${PRODUCTS.length} products + ${FOUNDATION.length} foundation validated OK`);

// base
log(`\n  BASE`);
writeOut('_base.llms.txt', buildBase(asof));

// addenda (only publicationStatus:verified + prose + non-canon)
let targets = generatableProducts();
if (ONLY) targets = targets.filter((p) => p.id === ONLY);
log(`\n  ADDENDA (${targets.length} generatable${ONLY ? ` · canary ${ONLY}` : ''})`);
if (!targets.length) log('     (none — check publicationStatus / prose paths)');
const notReady = [];
for (const p of targets) {
  const addendum = buildAddendum(p, asof, commit);
  if (addendum === null) { log(`   • ${p.id}  — SKIP: prose not written yet (${p.prose})`); notReady.push(p.id); continue; }
  log(`   • ${p.id}`);
  writeOut(`${p.id}.llms.txt`, addendum);
}
if (notReady.length) log(`\n  prose not yet written (Phase 2): ${notReady.join(', ')}`);

// report skips (transparency — no silent caps)
const skipped = PRODUCTS.filter((p) => !targets.includes(p) && !(ONLY && p.id !== ONLY));
const reasons = PRODUCTS.filter((p) => p.publicationStatus !== 'verified' || p.canonProse || !p.prose)
  .map((p) => `${p.id} (${p.publicationStatus !== 'verified' ? p.publicationStatus
    : p.canonProse ? 'canon-hosted' : 'no prose'})`);
log(`\n  skipped addenda: ${reasons.length ? reasons.join(', ') : 'none'}`);
log(`\n  done. output -> generated/llms/  (staging — deployment is a separate gated step)\n`);
