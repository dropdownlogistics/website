# DDL Landing Overhaul — Design Spec

**Author:** Amos Sayer (DDL-3007) · 2026-07-24
**Status:** Approved (design validated via mockups; Operator go 2026-07-24)
**Target:** `components/DDLLanding.jsx` + new wing landing pages
**Data source:** `lib/products.js` (WINGS, FOUNDATION, PRODUCTS) — single-sourced, live registry

---

## 1. Goal

Replace the current static landing (fixed hero + hardcoded *old* wing taxonomy
`ddl`/`da`/`dossiers`/`dexverse`, largely narrative/lore) with a **registry-driven,
product-forward landing** organized by the ratified **4 wings + foundation**, with a
circulating orbital hero. Everything renders from `lib/products.js`, so the landing
never drifts from the registry the llms.txt system also reads.

## 2. Structure (top → bottom)

### 2a. Orbital hero (Option B — approved)
- Central **DD** mark (crimson-ringed), 4 **wing icon-nodes** orbiting on a slow ring.
- **3-layer motion** (the correct pattern): a spinning `.frame`, each node placed on
  the ring by a static `.arm` (`rotate(θ) translateY(-R) rotate(-θ)`), and each
  `.badge` counter-rotating (`anti`) so icons **stay upright** — no tumble, no cluster.
- Nodes are **icons, not words** (names live in the cards below). Placeholder marks:
  Professional=shield/check, Knowledge=layers, Markets=up-trend, Personal=verified-card.
  Real wing marks TBD (follow-up).
- **Hover** a node → surface the wing name + belief. **Click** → that wing's page.
- Title "Dropdown Logistics"; tagline **"Four wings. One foundation. One cathedral."**
  (replaces "Five wings. One cathedral.")
- Accent per node from `WINGS[].accent`.

### 2b. Ticker
- A single scrolling strip beneath the hero (the AuditForge ticker pattern, org-wide).
- Content: **product · status · live stat**, e.g. `AuditForge · live · 106 controls —
  BlindSpot · beta — PositionBook · invite · 241 trades — …`.
- Built from `PRODUCTS` (name, status) + `counts[]` (which reference `metrics.js`).
  Single-sourced; always current. Only `publicationStatus:'verified'` products shown.

### 2c. Expandable wing cards (×4)
- One card per `WINGS` entry, accent left-border.
- **Collapsed:** `Wing 0N` kicker · name · belief · `N products` · expand caret.
- **Hover:** raise + surface the wing info (belief/description) — no layout shift.
- **Expand:** reveal the wing's **product children** via `productsByWing(wing.id)` — a
  2-col grid (1-col mobile) of mini-cards: product name · status pill · tagline · link
  (to `url`, or `pages[0]` on the main site for case studies).
- **"Enter [Wing] →"** CTA → the wing landing page.
- Status pill colors: live=green, beta=blue, invite/waitlist/case-study/concept=steel.

### 2d. Foundation strip
- A quiet dashed row under the wings: `THE FOUNDATION · the layer beneath the wings`,
  listing **Ledger** (evidence) + **Substrate** (governance) from `FOUNDATION`.
  Present and credited, visually subordinate to the product wings.

### 2e. Story / Legacy (secondary)
- Preserve the old narrative content (DexVerse lore, origin story) as a **secondary
  "Story / Legacy" entry** off the main product spine — not a primary wing. Keeps the
  personality without competing with the product-forward hero.

## 3. Wing landing pages
- Route: `/wings/[wing]` (or reuse the existing wing href scheme if cleaner).
- Content: wing name + belief (hero), then the wing's products in full (name, tagline,
  status, stats, link) via `productsByWing`. Foundation gets an analogous page or a
  section. All from the registry.

## 4. Data wiring
- Import `{ WINGS, FOUNDATION, PRODUCTS, productsByWing }` from `@/lib/products`.
- Delete the hardcoded `wings` array + repurpose/retire the old `WingCard` for the
  narrative content only (moved to Story/Legacy).
- Counts display the registry `counts[].value` (already metrics-sourced). No new numbers.

## 5. Non-goals / follow-ups
- Real wing marks (icons are placeholders).
- Products with `publicationStatus:'pending'` (leverage, fuellog, substrate facts) show
  as "coming soon" or are omitted until confirmed — do not fabricate.
- Excelligence/Ledger deeper pages already exist; link, don't rebuild.

## 6. Constraints
- CottageHumble palette + font stack already defined in `DDLLanding.jsx` (`C`, `font`).
- Responsive: orbital scales; children grid 2→1 col; ticker scrolls within its strip;
  body never scrolls horizontally.
- `output: 'export'` static site — no runtime data fetch; registry is a build-time import.
- Path-limited commits (ddl-site steward WIP untouched).
