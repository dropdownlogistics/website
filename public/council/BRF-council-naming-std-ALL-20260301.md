# BRF-council-naming-std-ALL-20260301

**Document Type:** Brief (Input Packet)  
**Distribution:** All Council Models  
**Date:** 2026-03-01  
**Author:** Dave Kitchens (D.K. Hale), Operator  
**Standard Under Review:** STD-0066 — Council Document Naming Convention  
**Expected Output:** REV-council-naming-std-{YOUR_MODEL_CODE}-20260301

---

## I. Context — Who You're Advising

**Dropdown Logistics (DDL)** is a one-person operations studio that builds governance-grade systems using a methodology called Chaos → Structured → Automated. The operator (Dave) is a CPA and Senior Staff Auditor with 10+ years in internal audit, specializing in dimensional data architecture, Excel modeling, and governance systems.

DDL currently maintains **44 governed systems** and **65 published standards**. Every system has an ID (SYS-001 through SYS-044). Every standard has an ID (STD-0001 through STD-0065). All are documented, versioned, and published at [dropdownlogistics.com](https://dropdownlogistics.com).

**The Council** is DDL's multi-model AI methodology. Nine models participate in convergent analysis — each receives the same input, produces independent output, and a synthesis identifies convergence, divergence, and signal. The nine models:

| Code | Model | Primary Strength |
|------|-------|-----------------|
| CLD | Claude (Anthropic) | Architecture, governance, structured analysis |
| GPT | ChatGPT (OpenAI) | Broad reasoning, creative synthesis |
| GEM | Gemini (Google) | Research integration, information synthesis |
| GRK | Grok (xAI) | Direct assessment, unconventional angles |
| MIS | Mistral | Technical precision, European perspective |
| COP | Copilot (Microsoft) | Enterprise integration, workflow context |
| LLA | LLaMA/Meta AI | Open-source perspective, technical depth |
| PER | Perplexity | Source-backed research, citation rigor |
| DEE | DeepSeek | Deep reasoning, mathematical/logical analysis |

---

## II. The Problem This Standard Solves

Council documents currently have no naming convention. Forewords, reviews, syntheses, briefs, and architecture docs are created in individual sessions, copy-pasted between models, and referenced informally. This creates three problems:

1. **No addressability.** A model cannot fetch another model's output by URL. Every cross-reference requires manual upload or paste.
2. **No versioning signal.** There's no way to tell from a filename when a document was created, which model produced it, or what type of document it is.
3. **No registry path.** Documents can't be indexed, filtered, or searched systematically because they lack structured metadata in their identifiers.

The proposed standard solves all three by establishing a naming convention that makes every council document URL-addressable, self-describing, and registry-ready.

---

## III. The Proposed Convention

### Naming Structure

```
{TYPE}-{topic}-{model}-{YYYYMMDD}
```

### Document Types

| Code | Type | Description |
|------|------|-------------|
| REV | Review | Model's analysis of a subject |
| SYN | Synthesis | Cross-model convergence output |
| FWD | Foreword | Model-written foreword for a publication |
| BRF | Brief | Input packet sent TO model(s) |
| RPT | Report | Structured findings or output |
| CMP | Comparison | Head-to-head or delta analysis |
| ARC | Architecture | System design documentation |
| LOG | Session Log | Record of a working session |

### Model Codes

| Code | Model |
|------|-------|
| CLD | Claude |
| GPT | ChatGPT |
| GEM | Gemini |
| GRK | Grok |
| MIS | Mistral |
| COP | Copilot |
| LLA | LLaMA / Meta AI |
| PER | Perplexity |
| DEE | DeepSeek |
| ALL | Cross-model (convergent outputs or multi-target briefs) |

### Topic Slug Rules

- Lowercase, hyphenated, concise
- Freeform creation, governed reuse (first use establishes canonical slug)
- Examples: `memoir-fwd`, `excelligence`, `cf-utility`, `reddit-dossier`, `apple-music`, `assurance-map`, `council-naming-std`

### URL Pattern

```
dropdownlogistics.com/council/{TYPE}-{topic}-{model}-{YYYYMMDD}
```

### Working Examples

| Slug | Meaning |
|------|---------|
| `REV-memoir-fwd-CLD-20260301` | Claude's review of the memoir foreword |
| `SYN-excelligence-ALL-20260215` | Cross-model synthesis on Excelligence |
| `CMP-apple-music-CLD-20260301` | Claude's comparison of predicted vs actual music data |
| `BRF-reddit-dossier-ALL-20260301` | Brief packet sent to all models for Reddit dossier |
| `ARC-cf-utility-GPT-20260228` | ChatGPT's architecture doc for CF Utility |
| `FWD-memoir-GRK-20260115` | Grok's foreword for the memoir |
| `LOG-ddl-build-session-CLD-20260301` | Claude session log |

---

## IV. Known Open Questions

The operator has identified these as unresolved. Your review should address each.

### Q1 — Does `ALL` pull double duty?

`ALL` is currently used for both convergent outputs (SYN-topic-ALL) and multi-target inputs (BRF-topic-ALL). These are semantically different — one means "produced by convergence across models" and the other means "sent to all models." The TYPE code disambiguates today, but is this a latent collision?

### Q2 — How should versioning work?

The date stamp captures when a document was created. If a document is revised (e.g., a review is updated after feedback), should the convention encode version? Options: `-v2` suffix, new date (new document), or metadata-only versioning (not in the slug).

### Q3 — Are eight TYPE codes sufficient?

The current set covers reviews, syntheses, forewords, briefs, reports, comparisons, architecture docs, and session logs. Are there document types the council produces (or will produce) that don't map cleanly to these eight? Candidates to consider: calibration documents, decision records, test plans, evaluations.

### Q4 — Topic slug governance: free-form or controlled vocabulary?

Should topic slugs be free-form with first-use-establishes-canonical, or should there be a maintained registry of approved slugs? What are the tradeoffs?

### Q5 — URL structure: flat or nested?

Should all council documents live flat under `/council/` or be nested by type (`/council/rev/`, `/council/syn/`, etc.)? What are the implications for fetchability, maintenance, and scalability?

### Q6 — Conflicts with existing DDL standards?

DDL has 65 existing standards. Does this convention conflict with, duplicate, or need to reference any of them? In particular, consider artifact naming (how systems and standards are already identified), governance-at-creation principles, and the artifact lifecycle model.

---

## V. Your Assignment

Produce a review document with the following structure:

### Required Output Format

```
# REV-council-naming-std-{YOUR_MODEL_CODE}-20260301

## Verdict
[APPROVE / APPROVE WITH AMENDMENTS / REQUEST REVISION]

## Convention Assessment
[Your analysis of the naming structure, type codes, model codes, 
topic slugs, and URL pattern. What works. What doesn't.]

## Open Question Responses
### Q1 — ALL Double Duty
[Your position]

### Q2 — Versioning
[Your position]

### Q3 — TYPE Code Sufficiency
[Your position]

### Q4 — Topic Slug Governance
[Your position]

### Q5 — URL Structure
[Your position]

### Q6 — Existing Standard Conflicts
[Your position]

## Amendments (if any)
[Specific changes you recommend, stated precisely enough to implement]

## Risk Flag (if any)
[Anything that could cause problems at scale or under edge cases]

## One-Line Summary
[Your review in one sentence]
```

### Review Principles

- Be specific. "This looks good" is not a review.
- If you recommend a change, state the exact change — not just the concern.
- If you disagree with another model's likely position, say so and say why.
- The operator values convergence (where models agree) and divergence (where they don't) equally. Don't hedge toward consensus. Say what you actually think.
- This standard governs how YOUR outputs will be named. You have skin in this game.

---

## VI. Meta

This document is itself the first artifact produced under the convention it proposes. Its slug is `BRF-council-naming-std-ALL-20260301`. Your review will be the second. The synthesis that follows will be the third.

If the convention survives its own council review, it ships as **STD-0066**.

Chaos → Structured → Automated.

---

*Dropdown Logistics · STD-0066 Review Cycle · BRF-council-naming-std-ALL-20260301*  
*Cottage — Humble surface. Cathedral underneath.*
