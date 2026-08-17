/**
 * verify-metrics-drift — is the site's own route map complete and honest?
 *
 * HISTORY, BECAUSE THE CHECK CHANGED SHAPE
 *
 * SD-004 (2026-08-14): lib/metrics.js calls itself "single source of truth for
 * all DDL dynamic numbers" and carried `DDL_ROUTES: '160+'` while /sitemap
 * independently derived 200 from its own wings array — two pages on one site
 * answering the same question differently, one computed and one typed. Same
 * failure shape as PA7-FINDING-003 and -007, on the org's own front door. This
 * script was written to recount the source and complain when they diverged.
 *
 * 2026-08-17: the wings array moved to lib/site-routes.js and DDL_ROUTES now
 * derives from it. **That makes the original comparison a tautology** — both
 * sides read one array and cannot disagree. A check that cannot fail is not a
 * check, so it was repointed at the gap the derivation does NOT close.
 *
 * WHAT IT CHECKS NOW
 *
 * DDL_ROUTES can no longer be wrong by neglect. It can still be wrong by
 * OMISSION: a route added under app/ and never added to the curated map is
 * built, live and uncounted. That is the same class of gap as the 44 undeclared
 * property routes (STD §1.4) — a route nobody declares is a route nobody counts
 * — one level in, on the site's own surface.
 *
 * Two directions, per STD §1.2:
 *
 *   built but not curated  → the map understates the site (reported, not fatal)
 *   curated but not built  → the map claims a route that does not exist (FAIL)
 *
 * The asymmetry is deliberate and explained at each branch.
 *
 * Run:  npm run verify:metrics
 * Exit: 0 the map claims nothing false · 1 it claims a route that isn't built
 */

import { execSync } from "node:child_process";
import { WINGS, ROUTE_COUNT, WING_COUNT } from "../lib/site-routes.js";
import { METRICS } from "../lib/metrics.js";

/** Static, browsable page routes under app/. Dynamic segments are not surfaces. */
function builtRoutes() {
  const files = execSync("git ls-files app", { encoding: "utf8" })
    .split("\n")
    .map((f) => f.trim().replace(/\\/g, "/"))
    .filter(Boolean);

  const out = new Set();
  for (const f of files) {
    if (/^app\/page\.(jsx|tsx|js|ts)$/.test(f)) {
      out.add("/");
      continue;
    }
    const m = f.match(/^app\/(.+)\/page\.(jsx|tsx|js|ts)$/);
    if (!m) continue;
    if (m[1].includes("[")) continue;
    out.add("/" + m[1]);
  }
  return out;
}

// next.config sets trailingSlash:true; the curated map is written without them.
// Normalize so a formatting convention never reads as a missing route.
const norm = (r) => (r !== "/" && r.endsWith("/") ? r.slice(0, -1) : r);

const built = builtRoutes();
const builtN = new Set([...built].map(norm));
const curatedN = new Set(WINGS.flatMap((w) => w.routes.map((r) => norm(r.href))));

const uncounted = [...builtN].filter((r) => !curatedN.has(r)).sort();
const phantom = [...curatedN].filter((r) => !builtN.has(r)).sort();

console.log(`[verify-metrics] DDL_ROUTES = ${METRICS.DDL_ROUTES} — DERIVED from lib/site-routes.js`);
console.log(`[verify-metrics] curated map: ${ROUTE_COUNT} routes across ${WING_COUNT} wings`);
console.log(`[verify-metrics] app/ builds: ${built.size} static page routes (dynamic segments excluded)`);

for (const r of phantom) {
  console.error(`[verify-metrics] PHANTOM: the map claims ${r} but app/ has no page for it`);
}

if (uncounted.length) {
  // Reported loudly, deliberately NOT fatal. Plenty of built routes are
  // legitimately outside a curated public map — the 404 boundary, OG image
  // routes, sub-pages a wing chooses not to list. Failing on those would train
  // people to silence the check, and a check people silence is worse than no
  // check at all.
  console.warn(`[verify-metrics] ${uncounted.length} built route(s) are NOT in the curated map:`);
  for (const r of uncounted) console.warn(`[verify-metrics]     ${r}`);
  console.warn("[verify-metrics] Not a failure — the map is curated, not exhaustive. But each of");
  console.warn("[verify-metrics] these is uncounted by DDL_ROUTES, so the number understates the site.");
}

console.log(
  "[verify-metrics] scope: the ROUTE MAP only. Every other METRICS value — CORPUS_CHUNKS, " +
  "DDL_GOVERNED_SYSTEMS, DDL_STANDARDS and the whole Excelligence block — is still an " +
  "unchecked constant.",
);

if (phantom.length) {
  console.error(`[verify-metrics] FAIL — ${phantom.length} route(s) claimed by the map do not exist`);
  process.exit(1);
}
console.log("[verify-metrics] PASS — the curated map claims no route that isn't built");
