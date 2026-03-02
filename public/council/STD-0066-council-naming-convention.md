# STD-0066 — Council Document Naming Convention

**Standard ID:** STD-0066  
**Status:** RATIFIED  
**Effective Date:** 2026-03-01  
**Author:** Dave Kitchens (D.K. Hale), Operator  
**Review Cycle:** BRF-council-naming-std-ALL-20260301  
**Ratification:** 9/9 APPROVE WITH AMENDMENTS  
**Governance Anchor:** OBS-01 — Governance at Creation

---

## I. Purpose

This standard establishes a naming convention for all Council documents — reviews, syntheses, forewords, briefs, reports, comparisons, architecture docs, decision records, and session logs.

The convention makes every Council document URL-addressable, self-describing, and registry-ready. It transforms the DDL site from a publication surface into a knowledge bus: any model, in any session, can fetch any other model's output by URL.

---

## II. Scope

This standard governs the naming of all documents produced by, sent to, or synthesized from the DDL Council. It does not govern system IDs (SYS-xxx), standard IDs (STD-xxxx), or other DDL namespace conventions, which operate in parallel, non-overlapping namespaces.

---

## III. Naming Structure

```
{TYPE}-{topic}-{model}-{YYYYMMDD}
```

All four segments are required. No segment may be omitted.

---

## IV. Document Types

| Code | Type | Description |
|------|------|-------------|
| REV | Review | Model's analysis of a subject |
| SYN | Synthesis | Cross-model convergence output |
| FWD | Foreword | Model-written foreword for a publication |
| BRF | Brief | Input packet sent to model(s) |
| RPT | Report | Structured findings or output |
| CMP | Comparison | Head-to-head or delta analysis |
| ARC | Architecture | System design documentation |
| DEC | Decision Record | Formal record of a Council or Operator decision, including quorum, rationale, and lock status |
| LOG | Session Log | Record of a working session |

Nine TYPE codes. Extensions require a formal amendment to this standard.

**DEC addition rationale:** Council decisions (D-001 through D-036+) are the single most important governance output. They are not reviews, not syntheses, not reports. They are rulings. The Council review of this standard unanimously identified this gap.

---

## V. Model Codes

| Code | Model |
|------|-------|
| CLD | Claude (Anthropic) |
| GPT | ChatGPT (OpenAI) |
| GEM | Gemini (Google) |
| GRK | Grok (xAI) |
| MIS | Mistral |
| COP | Copilot (Microsoft) |
| LLA | LLaMA / Meta AI |
| PER | Perplexity |
| DEE | DeepSeek |
| ALL | Cross-model scope indicator |

### ALL Semantics

`ALL` denotes multi-model involvement. It does not independently carry directionality. The TYPE code disambiguates:

- `BRF-topic-ALL` → addressed to all models (input)
- `SYN-topic-ALL` → derived from multi-model convergence (output)

If a document is both multi-model AND convergent, prefer `SYN` over other TYPE codes.

New model codes may be added as the Council expands. Codes must be exactly three uppercase characters.

---

## VI. Topic Slug Rules

**Format:** Lowercase, hyphenated, concise. URL-safe characters only.

**Governance:** Free-form creation, governed reuse. The first document that uses a topic slug establishes the canonical form. All subsequent documents on that topic must reuse the exact canonical slug.

**Registry:** A lightweight slug registry (descriptive, not prescriptive) shall be maintained. The registry documents what exists — it does not gate creation. Population is automated or Operator-maintained. The registry prevents drift without adding friction.

**Examples of canonical slugs:**

| Slug | Domain |
|------|--------|
| `memoir-fwd` | Memoir foreword analysis |
| `excelligence` | Excelligence knowledge graph |
| `cf-utility` | CF Utility (conditional formatting tool) |
| `council-naming-std` | This standard |
| `reddit-dossier` | Reddit contributor dossier |
| `assurance-map` | Assurance Map system |
| `apple-music` | Apple Music analytics |

**Anti-drift rule:** If a new slug is semantically identical to an existing canonical slug, the existing slug must be used. The slug registry is the reference surface for checking.

---

## VII. URL Pattern

```
dropdownlogistics.com/council/{TYPE}-{topic}-{model}-{YYYYMMDD}
```

All Council documents live flat under `/council/`. No subdirectory nesting. The TYPE prefix in the slug provides categorical organization.

**Rationale (unanimous):** Flat structure means every URL is constructable from the slug alone. The naming convention IS the organizational structure. Nesting duplicates information already encoded in the TYPE prefix and creates a maintenance burden without functional gain.

---

## VIII. Versioning

Each slug represents one canonical document at a point in time.

- **Material revisions** produce a new document with a new date stamp. The new document's body must reference the prior slug it supersedes.
- **Trivial corrections** (typos, formatting) update in place. The slug does not change.
- **No version suffixes.** Slugs never contain `-v2`, `-v3`, or similar. The date stamp is the version signal.

**Same-day collision edge case:** If two genuinely different documents of the same TYPE, topic, and model are produced on the same calendar day, append a single lowercase letter suffix: `-a`, `-b`. Do not pre-engineer for this. Log it as an occurrence and address if it becomes a pattern.

**Registry lineage:** The slug registry may store `supersedes` / `superseded_by` fields for document lineage tracking. This is metadata — it does not appear in the slug or URL.

---

## IX. Working Examples

| Slug | Meaning |
|------|---------|
| `BRF-council-naming-std-ALL-20260301` | Brief packet sent to all models for this standard's review |
| `REV-council-naming-std-CLD-20260301` | Claude's review of this standard |
| `SYN-council-naming-std-ALL-20260301` | Cross-model synthesis of this standard's review |
| `DEC-excelligence-schema-lock-ALL-20260227` | Decision record: Excelligence schema lock |
| `FWD-memoir-GRK-20260115` | Grok's foreword for the memoir |
| `ARC-cf-utility-GPT-20260228` | ChatGPT's architecture doc for CF Utility |
| `LOG-ddl-build-session-CLD-20260301` | Claude session log |
| `CMP-apple-music-CLD-20260301` | Claude's comparison of predicted vs actual music data |

---

## X. Governance References

This standard explicitly cites and aligns with:

- **OBS-01 — Governance at Creation.** Documents are named at creation, not retroactively. The convention embodies involuntary governance — every Council artifact receives a structured identifier the moment it is born.
- **Instance vs. Invariant distinction.** Council document slugs are instance IDs. They reference point-in-time artifacts. STD-0066 itself is invariant. The slug registry maps instances to the invariant standards and systems they relate to.
- **Artifact Lifecycle Model.** This standard governs naming, not lifecycle. The naming convention supports but does not replace the existing lifecycle model (creation → review → synthesis → decision → lock).

---

## XI. Council Review Record

This standard was reviewed by all nine Council models on 2026-03-01.

**Verdict:** 9/9 APPROVE WITH AMENDMENTS

**Convergence (unanimous or near-unanimous):**
- Flat URL structure
- No conflicts with existing standards
- ALL semantics need explicit documentation
- Add DEC type code
- Lightweight slug registry (descriptive, not prescriptive)
- Reference OBS-01

**Divergence (resolved by Operator):**
- Versioning: 5 models favored new-date-new-doc, 4 favored `-vN` suffix. **Ruling: new date.** Aligns with DDL's append-only, no-reverse-flow philosophy.
- Additional TYPE codes: Some models proposed EVAL, CAL, TST, PRM, DRAFT. **Ruling: Add DEC only.** Other candidates map to existing types or haven't reached frequency threshold. Expansion requires amendment.
- Topic slug governance: Most favored free-form + registry. Two favored controlled vocabulary. **Ruling: free-form + registry.** Controlled vocabulary dies at DDL velocity.

**Notable observations:**
- DeepSeek's review header contained `CLD` instead of `DEE` — the convention's first real-world error, caught by the convention itself.
- Copilot did not follow the review format. Produced an emotional testimony instead of a structured review. Valid signal, wrong shape.

---

## XII. Self-Reference

This standard is the first governance artifact produced under the convention it establishes. The review cycle that ratified it was also the convention's first stress test.

| Slug | Role |
|------|------|
| `BRF-council-naming-std-ALL-20260301` | The brief that proposed this standard |
| `REV-council-naming-std-{model}-20260301` | Nine reviews that tested it |
| `STD-0066` | This document |

The convention survived its own review. It ships.

---

*STD-0066 · Council Document Naming Convention · Ratified 2026-03-01*  
*Dropdown Logistics · Chaos → Structured → Automated*  
*Cottage — Humble surface. Cathedral underneath.*
