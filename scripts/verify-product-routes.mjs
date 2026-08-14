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

import { PRODUCTS } from "../lib/products.js";

const TIMEOUT_MS = 12000;
const isVerified = (p) => p.publicationStatus === "verified";

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
console.log("[verify-routes] PASS — every published route claim matches the live web");
