# DDL Asset Gallery

Static image and asset registry for Dropdown Logistics.

## Structure

```
/gallery/
  gallery-index.json    ← Asset registry (read this first)
  README.md             ← You are here
  dex/                  ← Dex-era art, avatars, generated images
  council/              ← Council medals, banners, visual artifacts
  brand/                ← DDL logos, CottageHumble marks, favicons
  screenshots/          ← Reddit threads, analytics, site captures
  messages/             ← Text messages, iMessages, chat exports
  campaign/             ← D&D character art, campaign maps, tokens
  products/             ← Product mockups, pitch visuals, demos
  memoir/               ← Memoir-related images, cover art, promos
  meta/                 ← Process screenshots, build artifacts
```

## Adding Assets

1. Name the file: `kebab-case-descriptive-name.png`
2. Drop it in the correct category folder
3. Add an entry to `gallery-index.json` with all required fields
4. Commit and push

## Rules

- Formats: `.png` `.jpg` `.webp` `.svg` only
- Max size: 2MB per asset
- No dates in filenames
- Gallery is unlisted — no nav entry, no sitemap
- Access by direct path only: `/gallery/[category]/[filename]`
- Every asset MUST have a `gallery-index.json` entry
- Update `used_in` when an asset appears in a document or artifact

## Governance

- Asset IDs are sequential: `GAL-0001`, `GAL-0002`, etc.
- Schema version tracks `SYS-020`
- `gallery-index.json` is the single source of truth
- Do not guess filenames — read the index

---
Dropdown Logistics — Chaos → Structured → Automated
