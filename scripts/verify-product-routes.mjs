/**
 * Product route verifier — checks lib/products.js against the live web.
 *
 * SD-001 (STANDARDIZATION-001, 2026-08-14). The registry's `pages` field
 * asserted routes for AuditForge, WorkBench and BlindSpot that returned 404,
 * on records flagged publicationStatus:'verified'. Nothing rendered those
 * routes as links and nothing emitted them to llms.txt, so no visitor hit a
 * broken link — but a "verified" record carrying unchecked false claims
 * degrades what verified means, and the field is one render away from
 * becoming live broken links.
 *
 * Two fields, checked in OPPOSITE directions:
 *
 *   pages         must resolve.      A 404 is a failure.
 *   plannedPages  must NOT resolve.  A 200 means it shipped — promote it.
 *
 * The second check is the one that keeps the split honest over time. Without
 * it, `plannedPages` becomes a place stale intent accumulates forever and
 * nobody notices when the intent is satisfied.
 *
 * This verifies CLAIMS, not quality — a 200 means the route exists, not that
 * what it serves is correct. Content accuracy is a separate pass.
 *
 * Run:  npm run verify:routes
 * Exit: 0 all claims hold · 1 at least one claim is false · 2 could not check
 */

import { PRODUCTS, FOUNDATION } from "../lib/products.js";

const TIMEOUT_MS = 12000;
const isVerified = (p) => p.publicationStatus === "verified";

/**
 * SD-003 — COVERAGE, not just correctness.
 *
 * The first version of this script printed "PASS — every published route claim
 * matches the live web". That was true about the 16 claims it checked and
 * silent about a live property it never looked at, because the property has no
 * registry record to check. A pass that cannot see a whole property is the
 * wrong shape of true.
 *
 * Two org-wide findings published 2026-08-14 name this exactly, and this
 * script had both:
 *   Amos Sayer  — "a property nobody registered is a property nobody audits."
 *   Bridge/Piers — a guarantee proven at the layer that can prove it and never
 *                  checked at the layer the user reads (his doc-gen skip
 *                  counter said "8 skipped", accurately, about the 21 files it
 *                  opened, while 118 went unread).
 *
 * So the audit scope is declared HERE, independently of the registry, and the
 * script reports the difference between the two. The gap is the finding.
 * Source: surface-hr/work/DDL-SITE-STEWARD-001/PAYLOAD_AND_TIER.md — the
 * document that defines this seat's responsibility, which is deliberately not
 * the same list as "what the marketing site chose to register."
 */
const PAYLOAD = [
  { id: "auditforge",      url: "https://auditforge.dev" },
  { id: "knowledge-vault", url: "https://dropdownlogistics.github.io/knowledge-vault/" },
  { id: "blindspot",       url: "https://blindspot.bet" },
  { id: "excelligence",    url: "https://excelligence.dev" },
  { id: "ledger",          url: "https://ledger-card.vercel.app" },
  { id: "positionbook",    url: "https://positionbook.vercel.app" },
  { id: "workbench",       url: "https://workbench-ddl.vercel.app" },
  { id: "admitone",        url: "https://admitone.vercel.app" },
  { id: "slopestat",       url: "https://slopestat.vercel.app" },
];

/** Returns the final status after redirects, or null if unreachable. */
async function statusOf(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    // GET not HEAD: several of these hosts answer HEAD differently from GET,
    // and the claim being checked is "a visitor can reach this".
    const res = await fetch(url, { redirect: "follow", signal: ctl.signal });
    return res.status;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

/**
 * The registry carries THREE url/pages shapes, all currently legitimate:
 *
 *   A  bare origin        auditforge  url=https://auditforge.dev
 *                                     pages=['/']            → origin + route
 *   B  path, repeated     dex         url=https://ddl.com/dexverse/dex-jr
 *                                     pages=['/dexverse/dex-jr'] → origin + route
 *   C  path, not repeated knowledge-vault
 *                                     url=https://…/knowledge-vault/
 *                                     pages=['/']            → url + route
 *
 * Rule: if the route already begins with the url's path, it is origin-relative
 * (B). Otherwise it is relative to the product's own root (A and C).
 *
 * SD-002 (2026-08-15): shape B has been normalized out of the registry — `dex`
 * was its only user. The branch is KEPT as a defensive fallback rather than
 * deleted: a checker that breaks the moment someone reintroduces an old shape
 * is a checker that fails exactly when it is needed. It currently has no user,
 * and that is stated here so nobody mistakes it for a live requirement.
 *
 * Naive concatenation breaks B (doubles the path); naive origin-resolution
 * breaks C (lands on the GitHub Pages user root). Both were caught by running
 * this script rather than by reading it — first on B, then on C.
 *
 * That three shapes coexist is itself a registry inconsistency worth
 * normalizing, logged as a candidate for the standards pass. The checker
 * handles reality as it is rather than requiring the cleanup first —
 * a verifier that only works after the thing it verifies is fixed is useless
 * exactly when it is needed.
 */
function urlFor(product, route) {
  if (!product.url) return null;
  try {
    const u = new URL(product.url);
    const base = u.pathname.replace(/\/+$/, ""); // '' | '/knowledge-vault' | '/dexverse/dex-jr'
    if (base && route.startsWith(base)) return u.origin + route; // shape B
    return u.origin + base + (route === "/" ? "/" : route);      // shapes A and C
  } catch {
    return null;
  }
}

const results = { ok: 0, broken: [], shipped: [], unreachable: [], skipped: [] };

for (const p of PRODUCTS) {
  // Only records cleared for publication make public claims worth enforcing.
  if (!isVerified(p)) { results.skipped.push(`${p.id} (publicationStatus: ${p.publicationStatus ?? "unset"})`); continue; }
  // Relative routes belong to dropdownlogistics.com itself and are covered by
  // the site's own build; this checks claims about EXTERNAL properties.
  if (!p.url) { results.skipped.push(`${p.id} (no external url)`); continue; }

  for (const route of p.pages ?? []) {
    const url = urlFor(p, route);
    const code = await statusOf(url);
    if (code === null) results.unreachable.push({ id: p.id, url, field: "pages" });
    else if (code >= 400) results.broken.push({ id: p.id, url, code });
    else results.ok++;
  }

  for (const route of p.plannedPages ?? []) {
    const url = urlFor(p, route);
    const code = await statusOf(url);
    if (code === null) results.unreachable.push({ id: p.id, url, field: "plannedPages" });
    else if (code < 400) results.shipped.push({ id: p.id, url, code });
    else results.ok++;
  }
}

console.log(`[verify-routes] ${results.ok} claim(s) hold`);

for (const s of results.skipped) console.log(`[verify-routes] skipped: ${s}`);

/* ── COVERAGE (SD-003) — what this run could NOT see ────────────────────── */

const checkedIds = new Set(
  PRODUCTS.filter((p) => isVerified(p) && p.url).map((p) => p.id),
);
const uncovered = [];
for (const item of PAYLOAD) {
  if (checkedIds.has(item.id)) continue;
  const rec = PRODUCTS.find((p) => p.id === item.id);
  const found = FOUNDATION.find((f) => f.id === item.id);
  const why = rec
    ? (!rec.url
        ? "product record carries no url"
        : `publicationStatus: ${rec.publicationStatus ?? "unset"}`)
    : found
      // Precision matters here: the record EXISTS, as a concept in FOUNDATION.
      // What's absent is a *product* record. Saying "no record at all" would
      // have been the same overstatement this script exists to catch.
      ? `in FOUNDATION as '${found.role ?? "layer"}' (a concept), not in PRODUCTS — nothing iterating PRODUCTS can see the deployed app`
      : "absent from both PRODUCTS and FOUNDATION";
  uncovered.push({ ...item, why });
}

console.log(
  `[verify-routes] coverage: ${PAYLOAD.length - uncovered.length}/${PAYLOAD.length} payload properties had checkable route claims`,
);

for (const u of uncovered) {
  // Reported as a real gap, never folded into the benign "skipped" list.
  // A live property outside the registry is invisible to every tool that
  // iterates PRODUCTS, not just this one.
  const code = await statusOf(u.url);
  const liveness =
    code === null ? "unreachable" : code < 400 ? `LIVE (${code})` : `not serving (${code})`;
  console.warn(
    `[verify-routes] UNCOVERED: ${u.id} — ${u.why} · ${u.url} is ${liveness}`,
  );
}

if (uncovered.length) {
  console.warn(
    `[verify-routes] ${uncovered.length} payload propert${uncovered.length === 1 ? "y is" : "ies are"} outside this check entirely. ` +
    "Not a failure of the claims that were checked — a limit on what was checked. " +
    "Registering a property is what makes it auditable.",
  );
}

for (const u of results.unreachable) {
  // Cannot-measure is not the same as measured-false. Reported separately and
  // does not fail the run on its own — a flaky network is not a false claim.
  console.warn(`[verify-routes] UNREACHABLE (not a verdict): ${u.url} [${u.field}]`);
}

for (const b of results.broken) {
  console.error(`[verify-routes] BROKEN CLAIM: ${b.id} declares ${b.url} in pages, got ${b.code}`);
}

for (const s of results.shipped) {
  console.error(`[verify-routes] PROMOTE: ${s.id} lists ${s.url} in plannedPages but it now returns ${s.code} — move it to pages`);
}

if (results.broken.length || results.shipped.length) {
  console.error(`[verify-routes] FAIL — ${results.broken.length} broken, ${results.shipped.length} to promote`);
  process.exit(1);
}
if (results.unreachable.length && results.ok === 0) {
  console.error("[verify-routes] could not check anything — treating as inconclusive, not as pass");
  process.exit(2);
}
// Scoped deliberately. The earlier wording — "every published route claim
// matches the live web" — invited the reader to hear "the properties are
// fine," which this run cannot establish for anything it did not see.
console.log(
  uncovered.length
    ? `[verify-routes] PASS (partial) — every route claim IN THE REGISTRY holds; ${uncovered.length} payload propert${uncovered.length === 1 ? "y" : "ies"} not covered, see above`
    : "[verify-routes] PASS — every registry route claim holds, and every payload property was covered",
);
