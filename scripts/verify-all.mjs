/**
 * verify-all — every property check, one command, one honest summary.
 *
 * WHY THIS EXISTS
 *
 * STANDARDIZATION-001 built three checks (`verify:routes`, `verify:metrics`,
 * `snapshot`) and left them all manual. That was logged as an open carry-back
 * through the whole pass and never closed, which is the failure mode
 * ddl-canon's own conformance README names in one line:
 *
 *   "A standard nobody checks is a document."
 *
 * A check that must be remembered is a check that will eventually not be run.
 * This is the single entry point so there is nothing to remember.
 *
 * WHAT IT DOES NOT DO
 *
 * It does not install a git hook and it does not gate anything. Other sessions
 * work in this repo, and silently making their pushes slower or blockable is
 * not a change one seat should make alone (STD §6.4). The hook is documented at
 * the bottom of this file for whoever decides it should exist.
 *
 * REPORTING RULES (STD §3.1)
 *
 * Every check reports what it could NOT cover, not only what passed. A bare
 * PASS that cannot see a whole property is the wrong shape of true — that was
 * SD-003, and the same blind spot then turned up twice more in tools written
 * after it. So this runner distinguishes three outcomes, not two:
 *
 *   PASS         the check ran and every claim it makes held
 *   PASS(part)   the check ran, its claims held, and it names what it missed
 *   FAIL         a claim was false
 *   UNAVAILABLE  the check could not run at all
 *
 * UNAVAILABLE is deliberately not FAIL. Cannot-measure is not measured-false
 * (STD §5), and collapsing them would make a flaky network look like a broken
 * property.
 *
 * Run:  npm run verify
 * Exit: 0 nothing is false · 1 at least one claim is false
 *       (partial coverage and unavailability do NOT fail the run; they print)
 */

import { spawn } from "node:child_process";

const CHECKS = [
  {
    name: "routes",
    script: "scripts/verify-product-routes.mjs",
    what: "registry route claims vs the live web, plus undeclared public routes",
  },
  {
    name: "metrics",
    script: "scripts/verify-metrics-drift.mjs",
    what: "DDL_ROUTES against the sitemap source",
  },
  {
    name: "snapshot",
    script: "scripts/generate-ddl-snapshot.mjs",
    // --check is load-bearing, not a nicety. Without it this generator rewrites
    // data/ddl-snapshot.json on every run (capturedAt and the source repo's git
    // head change by design), so `npm run verify` handed you a dirty working
    // tree and made "did anything change?" unanswerable — the check would be
    // one of the things that changed. A verification command must be read-only.
    args: ["--check"],
    what: "org snapshot freshness, integrity and figure coverage (read-only)",
  },
];

/** Runs one check, capturing output. Never throws — a crashed check is a result. */
function run(script, args = []) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [script, ...args], {
      stdio: ["ignore", "pipe", "pipe"],
      // The conformance tool taught this one: a tool that cannot render its own
      // output on the platform the org actually uses will not be run (STD §5.9).
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
    });
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (out += d));
    child.on("error", (e) => resolve({ code: null, out: String(e) }));
    child.on("close", (code) => resolve({ code, out }));
  });
}

/**
 * Classify a finished check.
 *
 * Reads the check's own words rather than inferring from the exit code alone,
 * because exit 0 currently means "nothing false" in these scripts and says
 * nothing about coverage. Both signals are used; neither is trusted alone.
 */
function classify({ code, out }) {
  if (code === null) return "UNAVAILABLE";
  if (code === 2) return "UNAVAILABLE";
  if (code !== 0) return "FAIL";
  if (/PASS \(partial\)|UNCOVERED|UNDECLARED|STATED \(not derived\)|not derived/i.test(out)) {
    return "PASS(part)";
  }
  return "PASS";
}

/** Lines a human should see even when everything passed. */
function highlights(out) {
  return out
    .split("\n")
    .filter((l) => /UNCOVERED|UNDECLARED|BROKEN|PROMOTE|RESOLVED|STALE|STATED \(not derived\)|figure coverage|integrity|could not/i.test(l))
    .map((l) => l.replace(/^\[[^\]]+\]\s*/, "").trim())
    .filter(Boolean);
}

const started = new Date().toISOString();
console.log(`\n  DDL property verification — ${started}\n`);

const results = [];
for (const check of CHECKS) {
  process.stdout.write(`  ${check.name.padEnd(9)} running…`);
  const r = await run(check.script, check.args);
  const verdict = classify(r);
  results.push({ ...check, ...r, verdict });
  process.stdout.write(`\r  ${check.name.padEnd(9)} ${verdict.padEnd(12)} ${check.what}\n`);
}

console.log("");
for (const r of results) {
  const notes = highlights(r.out);
  if (!notes.length) continue;
  console.log(`  ── ${r.name}`);
  for (const n of notes) console.log(`     ${n}`);
  console.log("");
}

const failed = results.filter((r) => r.verdict === "FAIL");
const partial = results.filter((r) => r.verdict === "PASS(part)");
const unavailable = results.filter((r) => r.verdict === "UNAVAILABLE");

// Deliberately verbose about scope. The whole point of this pass was that a
// summary which does not state its own limits is the wrong shape of true.
console.log(`  ${results.length} check(s) run · ${failed.length} failing · ${partial.length} passing with known gaps · ${unavailable.length} unavailable`);
console.log("");
console.log("  NOT covered by any check here: visual/brand conformance (see");
console.log("  ddl-canon/tools/design-conformance), content accuracy of prose,");
console.log("  accessibility, performance, and traffic. Absence of a failure");
console.log("  below is not evidence about any of those.");
console.log("");

if (failed.length) {
  for (const f of failed) {
    console.error(`  FAIL: ${f.name} — rerun with: node ${f.script}`);
  }
  process.exit(1);
}
if (unavailable.length) {
  for (const u of unavailable) {
    console.warn(`  UNAVAILABLE (not a verdict): ${u.name} could not run.`);
  }
}
console.log("  No false claims found.\n");

/*
 * ── Making this automatic, for whoever decides it should be ─────────────────
 *
 * Not installed by this file, on purpose. Other sessions push to this repo and
 * a hook that blocks or slows their pushes is a shared-workflow change, not a
 * one-seat call.
 *
 * As a pre-push hook (.git/hooks/pre-push, chmod +x):
 *
 *     #!/bin/sh
 *     npm run verify || exit 1
 *
 * Caveat worth knowing before anyone does that: `verify:routes` makes ~60 live
 * HTTP requests and takes a while. On a slow link that is a long pre-push wait,
 * and a check people resent is a check people bypass with --no-verify — which
 * is strictly worse than a manual check they choose to run.
 *
 * A scheduled run is probably the better shape: it catches drift that appears
 * without anyone pushing, which is exactly how these properties drifted in the
 * first place — five of them went four months with no commits at all while
 * their claims went stale underneath them.
 */
