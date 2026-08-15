// 404 — /not-found
//
// Added 2026-08-15 as the last step of D-2 (strip canon-forbidden `system-ui`).
//
// Removing system-ui from DDL's own font stacks took the count in built output
// from 1,114 occurrences to 310. The remaining 310 were not ours: with no
// custom not-found page, Next.js falls back to its built-in 404, which ships
//
//     font-family: system-ui, "Segoe UI", Roboto, ...
//
// and that boundary is embedded in EVERY page's flight payload — so a font
// canon explicitly forbids was riding along on all 298 built pages. It could
// not be find-and-replaced out, because it was never in the source.
//
// This page replaces it. Colours and fonts are canon values from
// ddl-canon/coding/brand-tokens.json v1.1.0.
import Link from 'next/link';

const C = {
  navy:    '#0D1B2A',
  card:    '#10202f',
  cream:   '#F5F1EB',
  dim:     'rgba(245,241,235,0.72)',
  body:    'rgba(245,241,235,0.6)',
  border:  'rgba(245,241,235,0.07)',
  crimson: '#B23531',
  steel:   '#6B7B8D',
};

const font = {
  display: "'Space Grotesk', sans-serif",
  mono:    "'JetBrains Mono', monospace",
  body:    "'Source Serif 4', Georgia, serif",
};

const routes = [
  { href: '/',          label: 'Front door' },
  { href: '/systems',   label: 'Systems' },
  { href: '/ddl',       label: 'The organization' },
  { href: '/sitemap',   label: 'Every route' },
];

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh', background: C.navy, color: C.cream,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '32px',
    }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>
        <div style={{
          fontFamily: font.mono, fontSize: '11px', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: C.crimson, marginBottom: '18px',
        }}>
          404 · route not found
        </div>

        <h1 style={{
          fontFamily: font.display, fontWeight: 700, fontSize: 'clamp(28px, 5vw, 40px)',
          lineHeight: 1.15, margin: '0 0 16px',
        }}>
          This page isn&rsquo;t in the record.
        </h1>

        <p style={{
          fontFamily: font.body, fontSize: '16px', lineHeight: 1.6,
          color: C.dim, margin: '0 0 28px',
        }}>
          Either it moved, or it never existed. Both happen. The routes below
          are current.
        </p>

        <div style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: '4px', padding: '8px',
        }}>
          {routes.map((r, i) => (
            <Link
              key={r.href}
              href={r.href}
              style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '12px 14px',
                textDecoration: 'none', color: C.cream,
                fontFamily: font.display, fontSize: '15px',
                borderTop: i === 0 ? 'none' : `1px solid ${C.border}`,
              }}
            >
              <span>{r.label}</span>
              <span style={{ fontFamily: font.mono, fontSize: '12px', color: C.steel }}>
                {r.href}
              </span>
            </Link>
          ))}
        </div>

        <div style={{
          fontFamily: font.mono, fontSize: '11px', color: C.steel,
          marginTop: '24px', letterSpacing: '0.04em',
        }}>
          Dropdown Logistics · dropdownlogistics.com
        </div>
      </div>
    </main>
  );
}
