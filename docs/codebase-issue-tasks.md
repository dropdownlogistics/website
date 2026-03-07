# Codebase issue backlog (proposed tasks)

## 1) Typo/branding consistency task
**Issue:** The project name appears with inconsistent spacing in branding.

- `README.md` title and footer use different forms.
- `app/analytics/page.tsx` footer also uses the spaced variant.

**Proposed task:** Standardize to one canonical spelling (recommended: "Dropdown Logistics") across all user-facing copy, metadata, and docs.

---

## 2) Bug fix task
**Issue:** Legacy route aliases (`/systems`, `/standards`) perform client-side redirects using `useEffect` + `router.replace`.

- This serves a rendered page first, then redirects in the browser.
- It can hurt SEO/crawlers and create visible redirect flashes.

**Proposed task:** Convert these aliases to server-side redirects (Next.js `redirect()` or static redirect config) so responses are proper HTTP redirects.

---

## 3) Comment/documentation discrepancy task
**Issue:** README states all 65 standards are "Enforced Standards" with OBS/PRO/REC/VEH classifications, but code labels `REC` as **"Watchlist Candidate"**.

- This implies REC entries are not enforced in the same sense as OBS/PRO.

**Proposed task:** Update README wording to reflect actual taxonomy (e.g., "65 standards and candidates") or adjust type labels if enforcement semantics changed.

---

## 4) Test improvement task
**Issue:** There is no test script in `package.json`, and no automated check to catch routing/content regressions.

**Proposed task:** Add a lightweight CI smoke test suite that:
1. Verifies key hub links resolve to existing routes (e.g., analytics/cards/nav routes).
2. Verifies public snapshot assets referenced by pages exist under `public/`.
3. Verifies redirect aliases (`/systems`, `/standards`) return expected redirect behavior.

This would catch broken-route regressions before deployment.
