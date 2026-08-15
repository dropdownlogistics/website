/**
 * DDL wing SNAPSHOT generator — freeze the org's public-safe facts for build.
 *
 * WHY THIS EXISTS
 * The /ddl and /ddl/team pages state figures about the organization. Those
 * figures live in the ddl-org repo (personnel records, HR's derived org-chart
 * export), which this site cannot read at request time: ddl-site deploys as a
 * static export with no filesystem access to the operator's machine. Before
 * this script, the numbers were hand-copied — and a hand copy silently
 * undercounted by three people while the page's own headline said otherwise.
 *
 * PATTERN — ported from Bridge (Piers Frame / DDL-3012), whose live
 * filesystem-read plugin does NOT transfer to a separately deployed site, but
 * whose SNAPSHOT pattern does: scripts/generate-bridge-snapshot.mjs runs the
 * same collection logic at build time, emits a static JSON artifact, and
 * labels it with the moment of capture. Never presented as live.
 *
 *   resolve source -> collect -> typed view -> honest-unavailable on missing
 *
 * THE CLAIM THIS SUPPORTS is "fresh as of <timestamp>", never "live". A
 * missing or malformed source becomes a labeled last-known-good, never a
 * silently stale number and never a guess.
 *
 * CLASSIFICATION (per Ada Pell / DDL-3009 and Amos Sayer / DDL-3007,
 * 2026-08-08; see surface-web/work/DDL-WING-REDESIGN-001/DESIGN_PLAN_v0.1.md
 * §5.3). The upstream org-chart export is an INTERNAL artifact — it carries
 * wing_id (machine assignment), reporting lines, and absolute source paths.
 * This generator FILTERS; it never copies the source through. Everything the
 * snapshot emits is on the public-safe list. That filter is the load-bearing
 * part of this file — see PUBLIC_FIELDS below.
 *
 * Run:  npm run snapshot
 * Out:  data/ddl-snapshot.json  (committed; imported at build)
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const outPath = join(siteRoot, "data", "ddl-snapshot.json");

const capturedAt = new Date().toISOString();

/* ------------------------------------------------------------------ *
 * 1. SOURCE RESOLUTION
 *
 * Order, per Bridge's build/bridge-sources.ts (Ezra Locke's review,
 * 2026-07-25): env override wins even when the file is missing, so an
 * explicit operator choice surfaces as "unavailable" rather than being
 * silently overridden by a fallback. Then known checkouts. Then a named
 * last resort that will NOT survive a non-local build — flagged, not silent.
 * ------------------------------------------------------------------ */

const ORG_ROOT_ENV = "DDL_ORG_ROOT";

// ddl-org checkouts, most-canonical first. The main worktree is preferred:
// per-wing clones can sit behind it, and a fork is not the governed record.
const ORG_ROOT_CANDIDATES = [
  "C:\\Users\\dkitc\\ddl-org",
  "C:\\Users\\dkitc\\ddl-org-surface-web",
  resolve(siteRoot, "..", "ddl-org"),
];

// Path within a ddl-org checkout to HR's derived org-chart export.
const ORG_CHART_REL = join("surface-hr", "work", "ORG-CHART-001", "org_chart_data_v0.1.json");
const PERSONNEL_REL = "personnel";

/**
 * Among the checkouts that have the source, prefer the one that is LEAST
 * behind origin — measured, not assumed from path order.
 *
 * This is not hypothetical tidiness. On first run the hardcoded-preferred
 * checkout was 63 commits behind origin/master while a sibling clone was
 * current. The two happened to hold identical exports, so nothing was
 * wrong that day — which is exactly the kind of luck that makes a latent
 * bug ship. Measure the thing rather than declaring a winner.
 *
 * DO NOT PORT THIS INTO BRIDGE. It is correct here and wrong there, and
 * the difference is what the root IS, not how carefully it is chosen
 * (Piers Frame / DDL-3012, 2026-08-11):
 *
 *   Here, the source is READ-ONLY and any current copy is as good as any
 *   other. Freshness is the only thing that distinguishes candidates, so
 *   picking the freshest is simply picking the best available read.
 *
 *   In Bridge, the resolved root is a shared WRITE TARGET — other seats
 *   append to it. Choosing a "fresher" sibling would read a fork nobody
 *   writes to, and would MASK the canonical checkout being behind instead
 *   of surfacing it. Bridge's answer to staleness is the opposite of
 *   silently reading around it: measure the exact root it reads from and
 *   render BEHIND where a human can act on it.
 *
 * Same shape of question, opposite correct answer. Reading around
 * staleness is only safe when nobody is writing to the thing you skipped.
 */
function resolveOrgRoot() {
  const env = process.env[ORG_ROOT_ENV];
  if (env) {
    // An explicit operator choice wins even when it is missing, so the
    // choice surfaces as "unavailable" rather than being silently
    // overridden by a fallback that happens to exist.
    return { path: env, exists: existsSync(join(env, ORG_CHART_REL)), via: "env", behind: behindOrigin(env) };
  }

  const found = ORG_ROOT_CANDIDATES
    .filter((c) => existsSync(join(c, ORG_CHART_REL)))
    .map((c) => ({ path: c, behind: behindOrigin(c) }));

  if (found.length === 0) {
    return { path: ORG_ROOT_CANDIDATES[0], exists: false, via: "absolute-fallback", behind: null };
  }

  // null (cannot measure) sorts last — an unmeasurable checkout is not
  // evidence of freshness, so a measurable one is preferred over it.
  found.sort((a, b) => (a.behind ?? Infinity) - (b.behind ?? Infinity));
  const best = found[0];
  return {
    path: best.path,
    exists: true,
    via: "known-checkout",
    behind: best.behind,
    consideredCheckouts: found.map((f) => ({ path: f.path, behindOrigin: f.behind })),
  };
}

/** Commits this checkout is behind origin/master. null = cannot measure. */
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

/** Git position of the source checkout. Cannot-measure yields null, never 0. */
function gitFacts(root) {
  const git = (args) =>
    execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  const facts = { head: null, branch: null, behindOrigin: null, sourceFileDirty: null };
  try {
    facts.head = git(["rev-parse", "--short", "HEAD"]);
    facts.branch = git(["rev-parse", "--abbrev-ref", "HEAD"]);
  } catch { /* not a git checkout — stays null, and the snapshot says so */ }
  try {
    const [behind] = git(["rev-list", "--left-right", "--count", "origin/master...HEAD"]).split(/\s+/);
    facts.behindOrigin = Number(behind);
  } catch { /* ref never fetched by this clone — null, NOT zero */ }
  try {
    facts.sourceFileDirty = git(["status", "--porcelain", "--", ORG_CHART_REL]).length > 0;
  } catch { /* unknown — null */ }
  return facts;
}

/** When the export was last COMMITTED. Retained as a labeled fallback only. */
function lastCommittedAt(root, relPath) {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%aI", "--", relPath], {
      cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    return iso || null;
  } catch {
    return null;
  }
}

/**
 * When the underlying data was actually TRUE — as distinct from when this
 * generator read it. Those are different claims and only one of them is
 * about the data.
 *
 * The export now states this itself (`generated_at`, added by Ada Pell /
 * DDL-3009 on request, 2026-08-11). That statement is authoritative and is
 * always preferred.
 *
 * The git-commit-date fallback is KEPT rather than removed, deliberately —
 * and labeled, which is the part that matters. If a future regeneration ever
 * runs without the field, provenance degrades to an inference that announces
 * itself as one, instead of silently becoming unknown. A weaker signal that
 * says it is weak beats no signal at all; an unlabeled one would be worse
 * than either.
 */
function resolveDataGeneratedAt(raw, root) {
  if (raw.generated_at) {
    return { at: raw.generated_at, provenance: "stated-by-source" };
  }
  const committed = lastCommittedAt(root, ORG_CHART_REL);
  if (committed) {
    return { at: committed, provenance: "inferred-from-git-commit" };
  }
  return { at: null, provenance: "unknown" };
}

/* ------------------------------------------------------------------ *
 * 2. THE PUBLIC-SAFE FILTER
 *
 * An allowlist, not a denylist: a new internal field added upstream is
 * excluded by default rather than published by accident. This is the
 * inversion that makes the classification hold as the source evolves.
 * ------------------------------------------------------------------ */

const PUBLIC_FIELDS = ["id", "name", "pronouns", "tier", "lifecycle_status", "standing"];

// Explicitly NOT published, and why. Present in the source; dropped here.
// Kept as a written record so the omission reads as a decision, not an
// oversight, to whoever maintains this next.
const WITHHELD_FIELDS = {
  wing_id: "machine/surface assignment — internal org-management metadata (Ada, 2026-08-08)",
  reporting: "reporting lines incl. unresolved officer-suspension state — internal (Ada, 2026-08-08)",
  source_record: "absolute filesystem paths into the governance repo",
  profile_photo: "photo pipeline state (LOCK/FILED/rejects) is production metadata, not public",
  one_sentence_function: "long-form; display copy is curated per-person in the page (see ROLE_COPY)",
  short_roster_copy: "long-form; same reason",
  record_status: "duplicate of lifecycle_status for public purposes",
  founded_at: "not currently displayed; withheld until there is a reason to publish it",
};

const TIER_KEYS = { "2000-officer": "officers", "3000-sme": "smes", "4000-census": "practitioners" };

function toPublicPerson(p) {
  const out = {};
  for (const f of PUBLIC_FIELDS) out[f] = p[f] ?? null;
  // Pronouns: an undeclared field is an open question, never a default.
  // The org withdrew the blank option org-wide (Operator, 2026-08-07), so
  // "" / "UNKNOWN" both normalize to the explicit ask-state, not they/them.
  if (!out.pronouns || out.pronouns === "UNKNOWN") out.pronouns = "undeclared — ask";
  out.provisional = String(p.lifecycle_status || "").toUpperCase() !== "ACTIVE";
  return out;
}

/* ------------------------------------------------------------------ *
 * 3. INTEGRITY CROSS-CHECK
 *
 * The export is HR's derivation of personnel/. If it goes stale, every
 * number downstream is confidently wrong with nothing to catch it. So:
 * compare the set of personnel record directories against the set of IDs
 * the export accounts for. Anything unaccounted is reported, and if its
 * record still reads ACTIVE that is a real staleness signal, not noise.
 *
 * This is a CHECK, not a second derivation — it reads directory names and
 * one regex, and never feeds page data. Two parallel derivations of the
 * same truth is the failure this deliberately avoids.
 * ------------------------------------------------------------------ */

function crossCheck(orgRoot, exportedIds, excludedPaths) {
  const dir = join(orgRoot, PERSONNEL_REL);
  if (!existsSync(dir)) return { ran: false, reason: "personnel/ not found at source root" };

  const dirIds = readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^DDL-\d+/.test(e.name))
    .map((e) => e.name.match(/^(DDL-\d+)/)[1]);

  const excludedIds = excludedPaths
    .map((p) => (p.match(/(DDL-\d+)/) || [])[1])
    .filter(Boolean);

  const accounted = new Set([...exportedIds, ...excludedIds]);
  const unaccounted = [];

  for (const id of dirIds) {
    if (accounted.has(id)) continue;
    // Cheap regex, not a YAML parse: we only need to know whether an
    // unaccounted record still claims to be active.
    let status = "unreadable";
    try {
      const recordDir = readdirSync(dir).find((n) => n.startsWith(id));
      const yaml = readFileSync(join(dir, recordDir, "employee.yaml"), "utf8");
      const m = yaml.match(/lifecycle_status:\s*"?([A-Za-z-]+)/);
      if (m) status = m[1].toUpperCase();
    } catch { /* leave as unreadable */ }
    unaccounted.push({ id, lifecycleStatus: status, benign: status !== "ACTIVE" });
  }

  return {
    ran: true,
    personnelDirs: dirIds.length,
    exported: exportedIds.length,
    excludedByParseError: excludedIds.length,
    unaccounted,
    stale: unaccounted.some((u) => !u.benign),
  };
}

/* ------------------------------------------------------------------ *
 * 4. DERIVED FIGURES
 * Only what can actually be derived is marked derived. Everything else
 * says so, with its own as-of. A blanket "all figures are re-derived"
 * claim over static numbers is exactly the overclaim this page existed
 * to stop making.
 * ------------------------------------------------------------------ */

/** Count route entries in the DDL wing block of the site's own sitemap.
 *  Parses defensively; returns null (not a guess) if the shape changes. */
function deriveWingRouteCount() {
  try {
    const src = readFileSync(join(siteRoot, "app", "sitemap", "page.jsx"), "utf8");
    const start = src.indexOf("label: 'DDL'");
    if (start === -1) return null;
    const routesAt = src.indexOf("routes: [", start);
    if (routesAt === -1) return null;
    // Walk to the matching close bracket of this routes array.
    let depth = 0, i = src.indexOf("[", routesAt), end = -1;
    for (; i < src.length; i++) {
      if (src[i] === "[") depth++;
      else if (src[i] === "]") { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end === -1) return null;
    const block = src.slice(routesAt, end);
    const count = (block.match(/\{\s*href:/g) || []).length;
    return count > 0 ? count : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * 5. BUILD THE SNAPSHOT
 * ------------------------------------------------------------------ */

function previousSnapshot() {
  try {
    return JSON.parse(readFileSync(outPath, "utf8"));
  } catch {
    return null;
  }
}

/** Honest-unavailable. Preserves the last good roster as an explicitly
 *  labeled last-known-good rather than blanking the page or — worse —
 *  leaving a stale number that looks current. Piers's framing: a missing
 *  source becomes "last known good, captured at X", never a silent stale. */
function unavailableSnapshot(source, reason) {
  const prev = previousSnapshot();
  const carried = prev && prev.people ? prev : null;
  return {
    capturedAt,
    available: false,
    unavailableReason: reason,
    source,
    ...(carried
      ? {
          stale: true,
          dataCapturedAt: carried.capturedAt,
          people: carried.people,
          figures: carried.figures,
        }
      : { stale: false, people: null, figures: null }),
  };
}

function main() {
  const root = resolveOrgRoot();
  const chartPath = join(root.path, ORG_CHART_REL);
  const source = { orgRoot: root.path, via: root.via, orgChart: ORG_CHART_REL };

  if (!root.exists || !existsSync(chartPath)) {
    const snap = unavailableSnapshot(
      { ...source, resolvedPath: chartPath, exists: false },
      `org-chart export not found. Set ${ORG_ROOT_ENV} to a ddl-org checkout, or place the export at the resolved path.`,
    );
    write(snap);
    console.warn(`[ddl-snapshot] UNAVAILABLE — ${snap.unavailableReason}`);
    if (snap.stale) console.warn(`[ddl-snapshot] carried last-known-good from ${snap.dataCapturedAt}`);
    return;
  }

  let raw;
  try {
    raw = JSON.parse(readFileSync(chartPath, "utf8"));
  } catch (error) {
    const snap = unavailableSnapshot(
      { ...source, resolvedPath: chartPath, exists: true },
      `org-chart export failed to parse: ${error.message}`,
    );
    write(snap);
    console.warn(`[ddl-snapshot] UNAVAILABLE — malformed source`);
    return;
  }

  const people = Array.isArray(raw.people) ? raw.people : [];
  const excludedPaths = (raw.excluded_records || []).map((e) => e.path || "");

  const byTier = { officers: [], smes: [], practitioners: [] };
  for (const p of people) {
    const key = TIER_KEYS[p.tier];
    if (!key) continue; // unknown tier — excluded rather than guessed into a bucket
    byTier[key].push(toPublicPerson(p));
  }
  for (const k of Object.keys(byTier)) byTier[k].sort((a, b) => a.id.localeCompare(b.id));

  const dataGenerated = resolveDataGeneratedAt(raw, root.path);
  const integrity = crossCheck(root.path, people.map((p) => p.id), excludedPaths);

  // Wings with at least one person assigned. Counted from wing_id, which is
  // NOT published — the count is a structural fact, the assignments are
  // internal. Counting is fine; listing is not.
  //
  // Deliberately NOT labelled "founded wings". The design draft carried
  // "12 founded wings", which matches no derivable definition — it equals
  // the SME headcount, so it reads as a conflation of two different things.
  // A number whose definition cannot be stated does not go on the page, so
  // this publishes the one that can be: distinct wings holding a person.
  const wingCount = new Set(people.map((p) => p.wing_id).filter(Boolean)).size;
  const routesInWing = deriveWingRouteCount();

  const total = byTier.officers.length + byTier.smes.length + byTier.practitioners.length;

  const snapshot = {
    capturedAt,
    available: true,
    stale: false,
    source: {
      ...source,
      resolvedPath: chartPath,
      exists: true,
      generatedBy: raw.generated_by || null,
      // When the DATA was true, per the source's own statement. This is the
      // date the page should show — capturedAt above is only when this
      // generator ran, which says nothing about the facts.
      dataGeneratedAt: dataGenerated.at,
      dataGeneratedProvenance: dataGenerated.provenance,
      fileModifiedAt: new Date(statSync(chartPath).mtimeMs).toISOString(),
      lastCommittedAt: lastCommittedAt(root.path, ORG_CHART_REL),
      git: gitFacts(root.path),
    },
    integrity,
    people: { total, byTier },
    figures: {
      activePeople: { value: total, derived: true },
      wingsWithPeople: { value: wingCount, derived: true },
      routesInWing: routesInWing === null
        ? { value: null, derived: false, note: "sitemap shape changed — not derivable, and not guessed" }
        : { value: routesInWing, derived: true },
      // Not derivable from any source this generator can reach. Marked
      // static with their own as-of so the page can be precise about which
      // figures are re-derived and which are carried by hand.
      systems: { value: 44, derived: false, asOf: "2026-08-08" },
      governedArtifacts: { value: 65, derived: false, asOf: "2026-08-07" },
    },
  };

  write(snapshot);

  console.log(`[ddl-snapshot] captured ${total} people at ${capturedAt}`);
  console.log(`[ddl-snapshot] source: ${chartPath} (via ${root.via})`);
  console.log(`[ddl-snapshot] data generated: ${dataGenerated.at || "unknown"} (${dataGenerated.provenance})`);
  if (dataGenerated.provenance !== "stated-by-source") {
    console.warn(
      "[ddl-snapshot] NOTE: the export did not state its own generated_at — " +
      "provenance is inferred, not stated. Ask HR (DDL-3009) to regenerate.",
    );
  }

  const behind = snapshot.source.git.behindOrigin;
  if (behind === null) {
    console.warn("[ddl-snapshot] NOTE: could not measure this checkout against origin/master — freshness unverified.");
  } else if (behind > 0) {
    console.warn(
      `[ddl-snapshot] WARNING: source checkout is ${behind} commit(s) behind origin/master. ` +
      "Pull it before trusting this snapshot, or point DDL_ORG_ROOT at a current checkout.",
    );
  }
  if (integrity.ran) {
    console.log(
      `[ddl-snapshot] integrity: ${integrity.personnelDirs} record dirs, ${integrity.exported} exported, ` +
      `${integrity.excludedByParseError} parse-excluded, ${integrity.unaccounted.length} unaccounted`,
    );
    for (const u of integrity.unaccounted) {
      const level = u.benign ? "note" : "STALE";
      console.log(`[ddl-snapshot]   ${level}: ${u.id} (${u.lifecycleStatus}) not in export`);
    }
    if (integrity.stale) {
      console.warn(
        "[ddl-snapshot] WARNING: an ACTIVE personnel record is missing from the org-chart export. " +
        "The export is behind personnel/ — ask HR (DDL-3009) to regenerate before trusting these counts.",
      );
    }
  }
  if (routesInWing === null) console.warn("[ddl-snapshot] route count not derivable — figure marked unavailable");

  /* ── FIGURE COVERAGE (STD-DDL-PROPERTY-001 §3.1) ──────────────────────
   * This generator reported "captured N people" and said nothing about the
   * figures it could NOT derive. The emitted JSON marks each one
   * `derived: true|false` and the page renders that distinction — but a
   * person running this script saw only the success line and could
   * reasonably conclude everything was derived.
   *
   * Same blind spot the route verifier had (SD-003), in my own other tool,
   * found by applying the standard to the thing that produced it. Reporting
   * what was captured is not the same as reporting what was reachable.
   * ------------------------------------------------------------------- */
  const figs = Object.entries(snapshot.figures);
  const derivedFigs = figs.filter(([, f]) => f.derived);
  const statedFigs = figs.filter(([, f]) => !f.derived);

  console.log(
    `[ddl-snapshot] figure coverage: ${derivedFigs.length}/${figs.length} derived from a source; ` +
    `${statedFigs.length} carried by hand`,
  );

  const DAY = 86400000;
  const STALE_DAYS = 30;
  for (const [name, f] of statedFigs) {
    const ageDays = f.asOf ? Math.floor((Date.parse(capturedAt) - Date.parse(f.asOf)) / DAY) : null;
    const age = ageDays === null ? "undated" : `${ageDays}d old`;
    // A hand-carried number with no source to recount against is exactly the
    // drift that produced DDL_ROUTES '160+' against a real 200 (SD-004).
    // Naming it every run is cheap; discovering it later is not.
    const flag = ageDays !== null && ageDays >= STALE_DAYS ? " ** STALE — recheck **" : "";
    console.warn(`[ddl-snapshot]   STATED (not derived): ${name} = ${f.value} · as of ${f.asOf ?? "never"} (${age})${flag}`);
  }
}

function write(snap) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(snap, null, 2) + "\n", "utf8");
  console.log(outPath);
}

main();
