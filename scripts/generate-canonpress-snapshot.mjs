/**
 * CanonPress render SNAPSHOT — build-time read of `canonpress-renderable/1`.
 *
 * WHY THIS EXISTS
 * CanonPress shipped two hand-authored React pages (12,413 bytes of JSX for
 * one artifact) and then stopped — the bottleneck was the page, not the
 * editorial pipeline above it. `CANONPRESS-RENDER-BOUNDARY-v1.md`
 * (Demi Strand / DDL-3011, 2026-08-16) froze a machine-readable contract so
 * a template could render N artifacts instead of hand-authoring N pages.
 * This script is the render side of that contract, assigned to this seat by
 * that same document. Built 2026-09-30 per Reed Vane (DDL-2004) relaying the
 * Operator's direct go.
 *
 * PATTERN — identical shape to generate-ddl-snapshot.mjs:
 *   resolve source -> collect -> typed view -> honest-unavailable on missing
 *
 * A REAL, CONFIRMED BUG IN THE SOURCE, AND WHY THIS SCRIPT STILL WORKS
 * `python canonpress.py json` pipes through `print()`, and on Windows that
 * defaults to the console codepage (cp1252 here), not UTF-8 — so every
 * em-dash in the source markdown was silently encoded as the single cp1252
 * byte 0x97 instead of the correct 3-byte UTF-8 sequence. Confirmed by
 * reading raw bytes: the output fails strict UTF-8 decode outright. Reported
 * to Demi Strand (tool owner, surface-social) rather than patched here — this
 * is canon-adjacent shared tooling outside this repo, not mine to silently
 * fix. The correct, non-invasive workaround on THIS side of the boundary is
 * forcing `PYTHONIOENCODING=utf-8` on the subprocess, which produces
 * strictly-valid UTF-8 with correct em-dashes and needs zero source changes.
 * See PYTHONIOENCODING_FIX below.
 *
 * THE SIX RULES THIS SCRIPT AND ITS CONSUMER MUST HOLD (from the boundary doc)
 *  1. Empty artifacts list is a CORRECT result, never a failure and never a
 *     fallback to cached/placeholder content.
 *  2. Read failure = fail loud. Non-zero exit, no partial/degraded output.
 *  3. `exposure` is not in the payload (upstream already strips it) — this
 *     script does not add it back, and nothing downstream may infer it.
 *  4. `withheld_count` is for the BUILD LOG, never the rendered page.
 *  5. `author_claimed` renders with its qualification intact — never tidied
 *     into a plain byline.
 *  6. `body_markdown` already excludes the RULE B attribution line (stripped
 *     upstream); if one appears, that's Demi's bug to know about, not this
 *     script's to strip.
 *
 * VERSIONING: `contract` is the handshake. An unexpected value here is a
 * STOP, not a warn, per the boundary doc's own instruction to assert on it.
 *
 * Run:  npm run canonpress:snapshot
 * Out:  data/canonpress-snapshot.json  (committed; imported at build)
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const outPath = join(REPO_ROOT, "data", "canonpress-snapshot.json");

const EXPECTED_CONTRACT = "canonpress-renderable/1";

// Same env var and candidate-resolution shape as generate-ddl-snapshot.mjs,
// deliberately -- one discipline, not two slightly-different ones for two
// scripts that both read out of the ddl-org checkout.
const ORG_ROOT_ENV = "DDL_ORG_ROOT";
const ORG_ROOT_CANDIDATES = [
  "C:\\Users\\dkitc\\ddl-org",
  "C:\\Users\\dkitc\\ddl-org-surface-web",
];
const CANONPRESS_TOOL_REL = join("surface-social", "tools", "canonpress.py");

function behindOrigin(root) {
  try {
    const [behind] = execFileSync(
      "git", ["rev-list", "--left-right", "--count", "origin/master...HEAD"],
      { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    ).trim().split(/\s+/);
    return Number(behind);
  } catch {
    return null;
  }
}

function resolveOrgRoot() {
  const env = process.env[ORG_ROOT_ENV];
  if (env) {
    return { path: env, exists: existsSync(join(env, CANONPRESS_TOOL_REL)), via: "env" };
  }
  const found = ORG_ROOT_CANDIDATES
    .filter((c) => existsSync(join(c, CANONPRESS_TOOL_REL)))
    .map((c) => ({ path: c, behind: behindOrigin(c) }));
  if (found.length === 0) {
    return { path: ORG_ROOT_CANDIDATES[0], exists: false, via: "absolute-fallback" };
  }
  found.sort((a, b) => (a.behind ?? Infinity) - (b.behind ?? Infinity));
  const best = found[0];
  return { path: best.path, exists: true, via: "known-checkout", behind: best.behind };
}

function write(snap, checkOnly) {
  if (checkOnly) {
    console.log(`[canonpress-snapshot] --check: computed but not written (${outPath})`);
    return;
  }
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(snap, null, 2) + "\n", "utf8");
  console.log(outPath);
}

function main() {
  const checkOnly = process.argv.includes("--check");
  const capturedAt = new Date().toISOString();
  const root = resolveOrgRoot();

  if (!root.exists) {
    const snap = {
      capturedAt,
      available: false,
      reason: `canonpress.py not found under any known checkout (tried ${ORG_ROOT_CANDIDATES.join(", ")}; set ${ORG_ROOT_ENV} to override)`,
      contract: null,
      artifacts: [],
    };
    write(snap, checkOnly);
    console.error(`[canonpress-snapshot] SOURCE UNAVAILABLE -- ${snap.reason}`);
    process.exitCode = 1;
    return;
  }

  const toolPath = join(root.path, CANONPRESS_TOOL_REL);
  const toolDir = dirname(toolPath);

  let raw;
  try {
    // PYTHONIOENCODING_FIX: forces correct UTF-8 stdout regardless of this
    // machine's console codepage. See file header -- this is the workaround
    // for a confirmed encoding bug in canonpress.py's own print() path,
    // applied on this side of the boundary, not by editing that file.
    const env = { ...process.env, PYTHONIOENCODING: "utf-8" };
    raw = execFileSync("python", ["canonpress.py", "json"], {
      cwd: toolDir,
      encoding: "utf8",
      env,
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 16 * 1024 * 1024,
    });
  } catch (e) {
    // Rule 2: a read failure fails loud. No partial output, no cached
    // fallback -- the honest-unavailable snapshot below IS the failure state.
    const snap = {
      capturedAt,
      available: false,
      reason: `canonpress.py json exited non-zero or could not run: ${e.message}`,
      contract: null,
      artifacts: [],
    };
    write(snap, checkOnly);
    console.error(`[canonpress-snapshot] READ FAILED -- ${snap.reason}`);
    process.exitCode = 1;
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    const snap = {
      capturedAt,
      available: false,
      reason: `canonpress.py json output did not parse as JSON: ${e.message}`,
      contract: null,
      artifacts: [],
    };
    write(snap, checkOnly);
    console.error(`[canonpress-snapshot] MALFORMED OUTPUT -- ${snap.reason}`);
    process.exitCode = 1;
    return;
  }

  // Versioning rule: an unexpected contract value is a stop, not a warn.
  if (parsed.contract !== EXPECTED_CONTRACT) {
    const snap = {
      capturedAt,
      available: false,
      reason: `contract mismatch: expected "${EXPECTED_CONTRACT}", got "${parsed.contract}". This is a stop per the boundary doc's own versioning rule -- an additive change still bumps the version, and Demi D-mails before emitting it.`,
      contract: parsed.contract ?? null,
      artifacts: [],
    };
    write(snap, checkOnly);
    console.error(`[canonpress-snapshot] CONTRACT MISMATCH -- ${snap.reason}`);
    process.exitCode = 1;
    return;
  }

  // Rule 4: withheld_count is logged here, in the build output, and carried
  // in the snapshot for anyone reading this file directly -- but the
  // consuming page must never render it. That boundary is enforced by what
  // the render layer chooses to read from this file, not by this script
  // omitting the field (omitting it would just make it harder to notice a
  // real change in what's withheld).
  console.log(`[canonpress-snapshot] contract ${parsed.contract} OK`);
  console.log(`[canonpress-snapshot] ${parsed.artifacts.length} public artifact(s), ${parsed.withheld_count} withheld (do not render this number)`);

  // Rule 3 (defense in depth): if `exposure` ever reappears upstream, strip
  // it here rather than trust every future consumer to ignore it.
  const artifacts = parsed.artifacts.map(({ exposure, ...rest }) => rest);
  if (parsed.artifacts.some((a) => "exposure" in a)) {
    console.warn("[canonpress-snapshot] upstream emitted an `exposure` field this run -- stripped here, but the boundary doc says this should not happen. Worth telling Demi.");
  }

  const snap = {
    capturedAt,
    available: true,
    source: {
      via: root.via,
      root: root.path,
      behindOrigin: root.behind ?? null,
      tool: CANONPRESS_TOOL_REL.replace(/\\/g, "/"),
    },
    contract: parsed.contract,
    withheldCount: parsed.withheld_count,
    artifacts,
  };
  write(snap, checkOnly);
  console.log(`[canonpress-snapshot] wrote ${artifacts.length} artifact(s) as of ${capturedAt}`);
}

main();
