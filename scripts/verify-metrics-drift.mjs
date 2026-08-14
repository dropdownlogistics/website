/**
 * Metrics drift check — recount the source, compare to the published constant.
 *
 * SD-004 (STANDARDIZATION-001, 2026-08-14).
 *
 * lib/metrics.js calls itself "single source of truth for all DDL dynamic
 * numbers." It carried DDL_ROUTES: '160+' while /sitemap independently derived
 * 200 from its own wings array — two pages on one site answering the same
 * question differently, one computed and one typed. Same failure shape as
 * PA7-FINDING-003 (WorkBench's two stat strips) and PA7-FINDING-007 (Knowledge
 * Vault's misattached subtitle), except on the org's own front door.
 *
 * A constant cannot be trusted just because it sits in a file named
 * single-source-of-truth. What makes it trustworthy is something recounting
 * the underlying thing and complaining when they diverge. That is this script.
 *
 * The right end state is DDL_ROUTES deriving at import time. It cannot yet:
 * the wings array lives inside app/sitemap/page.jsx and references that page's
 * local colour palette, so lifting it into lib/ is a real refactor. Until then
 * the constant is CHECKED rather than DERIVED — a weaker guarantee, named as
 * weaker rather than dressed up.
 *
 * Run:  npm run verify:metrics
 * Exit: 0 in agreement · 1 drifted · 2 could not measure
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { METRICS } from "../lib/metrics.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Recount routes and wings straight out of the sitemap's own data block. */
function countFromSitemap() {
  const src = readFileSync(join(root, "app", "sitemap", "page.jsx"), "utf8");
  const start = src.indexOf("const wings = [");
  if (start === -1) return null;
  const end = src.indexOf("\n];", start);
  if (end === -1) return null;
  const block = src.slice(start, end);
  const routes = (block.match(/\{\s*href:/g) || []).length;
  const wings = (block.match(/label: '[^']+', color:/g) || []).length;
  return routes > 0 ? { routes, wings } : null;
}

/** '200+' → 200 · 200 → 200 · '44+' → 44 */
function floorOf(v) {
  if (typeof v === "number") return v;
  const m = String(v).match(/(\d+)/);
  return m ? Number(m[1]) : null;
}

const counted = countFromSitemap();
if (!counted) {
  console.error("[verify-metrics] could not locate the wings block in app/sitemap/page.jsx");
  console.error("[verify-metrics] INCONCLUSIVE — cannot-measure is not the same as agreement");
  process.exit(2);
}

const claimed = floorOf(METRICS.DDL_ROUTES);
console.log(`[verify-metrics] sitemap source: ${counted.routes} routes across ${counted.wings} wings`);
console.log(`[verify-metrics] METRICS.DDL_ROUTES claims: ${METRICS.DDL_ROUTES}`);

const drifted = [];

// '200+' is satisfied by exactly 200 or more. It fails when the real count has
// grown past the claim (understated, as it was) or fallen below it (overstated).
if (claimed === null) {
  drifted.push("DDL_ROUTES is not parseable as a number");
} else if (counted.routes < claimed) {
  drifted.push(`DDL_ROUTES claims ${METRICS.DDL_ROUTES} but only ${counted.routes} routes exist — overstated`);
} else if (counted.routes >= claimed + 10) {
  // A '+' figure is allowed to trail reality a little; 10 is the point where
  // it stops being a floor and starts being a stale number wearing one.
  drifted.push(`DDL_ROUTES claims ${METRICS.DDL_ROUTES} but ${counted.routes} routes exist — understated by ${counted.routes - claimed}`);
}

for (const d of drifted) console.error(`[verify-metrics] DRIFT: ${d}`);

if (drifted.length) {
  console.error("[verify-metrics] FAIL — the published constant and the source disagree");
  process.exit(1);
}
console.log("[verify-metrics] PASS — DDL_ROUTES agrees with the sitemap source");
console.log("[verify-metrics] scope: this checks DDL_ROUTES only. Every other METRICS value is still an unchecked constant.");
