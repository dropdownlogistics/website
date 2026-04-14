'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy:        '#0D1B2A',
  card:        '#10202f',
  cream:       '#F5F1EB',
  dim:         'rgba(245,241,235,0.72)',
  body:        'rgba(245,241,235,0.6)',
  muted:       'rgba(245,241,235,0.35)',
  border:      'rgba(245,241,235,0.08)',
  borderSoft:  'rgba(245,241,235,0.05)',
  crimson:     '#B23531',
  crimsonLine: 'rgba(178,53,49,0.35)',
  steel:       '#6B7B8D',
  steelLine:   'rgba(107,123,141,0.35)',
};

const SLabel = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.crimson, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
    {children}
  </div>
);

const SHead = ({ children, style }) => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18, ...style }}>
    {children}
  </div>
);

const SBody = ({ children, max = 680 }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: max, marginBottom: 28 }}>
    {children}
  </div>
);

const tokens = [
  { name: 'Navy',    hex: '#0D1B2A', t: 'Background. Every surface.' },
  { name: 'Card',    hex: '#10202f', t: 'Card surface. One step lighter.' },
  { name: 'Cream',   hex: '#F5F1EB', t: 'Primary text. Always.' },
  { name: 'Crimson', hex: '#B23531', t: 'DDL accent. Studio voice.' },
  { name: 'Steel',   hex: '#6B7B8D', t: 'Muted. Secondary. Archival.' },
];

const fonts = [
  { sample: 'Space Grotesk', family: "'Space Grotesk', sans-serif", weight: 700, size: '1.6rem', label: 'Display' },
  { sample: 'JetBrains Mono', family: "'JetBrains Mono', monospace", weight: 500, size: '1.2rem', label: 'Data' },
  { sample: 'Source Serif 4', family: "'Source Serif 4', serif", weight: 400, italic: true, size: '1.2rem', label: 'Body' },
];

const kits = [
  { name: 'DDL Studio',      color: '#B23531', href: '/brand/ddl' },
  { name: 'AuditForge',      color: '#B23531', href: '/brand/auditforge' },
  { name: 'BlindSpot',       color: '#4A9E6B', href: '/brand/blindspot' },
  { name: 'Excelligence',    color: '#D4A843', href: '/brand/excelligence' },
  { name: 'Ledger',          color: '#C49A3C', href: '/brand/ledger' },
  { name: 'WorkBench',       color: '#B23531', href: '/brand/workbench' },
  { name: 'CanonPress',      color: '#B23531', href: '/brand/canonpress' },
  { name: 'Knowledge Vault', color: '#2C7A7B', href: '/brand/knowledge-vault' },
  { name: 'PositionBook',    color: '#4A9E6B', href: '/brand/positionbook' },
];

export default function BrandingHub() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/" label="back" />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimson, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; BRAND SYSTEM
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.6rem, 6.5vw, 4.6rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 32, color: C.cream }}>
          CottageHumble
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          Humble surface. Cathedral underneath.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8, marginBottom: 40 }}>
          One design system. Nine products. Every surface in the DDL ecosystem runs on the same token set &mdash; navy, cream, crimson, and one accent color per product. The architecture doesn&rsquo;t change. The brand data does.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 220px))', gap: 12 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 22px' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2rem', color: C.cream, lineHeight: 1, marginBottom: 8 }}>9</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Products</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 22px' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '2rem', color: C.cream, lineHeight: 1, marginBottom: 8 }}>1</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Design System</div>
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — TOKENS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>CORE TOKENS</SLabel>
          <SHead>The palette.</SHead>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 24, marginBottom: 48 }}>
            {tokens.map((t) => (
              <div key={t.name} style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 6, padding: '18px 18px' }}>
                <div style={{ width: 40, height: 40, background: t.hex, borderRadius: 4, border: t.hex === C.cream ? `1px solid ${C.border}` : 'none', marginBottom: 14 }} />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: C.cream, fontWeight: 500, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: C.steel, marginBottom: 10, letterSpacing: '0.04em' }}>{t.hex}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: C.body, lineHeight: 1.55, fontStyle: 'italic' }}>{t.t}</div>
              </div>
            ))}
          </div>

          <SLabel>TYPOGRAPHY</SLabel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 0, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', marginTop: 16 }}>
            {fonts.map((f, i) => (
              <div key={f.sample} style={{ background: C.navy, padding: '28px 26px', borderRight: i < fonts.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ fontFamily: f.family, fontWeight: f.weight, fontSize: f.size, fontStyle: f.italic ? 'italic' : 'normal', color: C.cream, marginBottom: 14, lineHeight: 1.2 }}>
                  {f.sample}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — BRAND KITS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>BRAND KITS</SLabel>
        <SHead>Nine products. Nine accents.</SHead>
        <SBody>
          Each product inherits CottageHumble and adds one accent color. The kit documents the mark, the tokens, the tagline, and the tone.
        </SBody>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginTop: 24 }}>
          {kits.map((k) => (
            <Link key={k.href} href={k.href} style={{
              display: 'block', background: C.card, border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${k.color}`, borderRadius: 6, padding: '20px 22px', textDecoration: 'none',
              transition: 'border-color 0.15s, background 0.15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.navy; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.card; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: k.color, letterSpacing: '-0.01em' }}>{k.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: k.color, letterSpacing: '0.05em' }}>&rarr;</div>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, letterSpacing: '0.06em' }}>{k.href}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* SECTION 4 — CLOSING */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>THE RULE</SLabel>

          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 2.6vw, 1.85rem)', color: C.cream, lineHeight: 1.45, borderLeft: `2px solid ${C.crimson}`, paddingLeft: 22, marginTop: 12, marginBottom: 32, maxWidth: 760 }}>
            &ldquo;No white backgrounds. No Inter. No light mode.&rdquo;
          </div>

          <SBody>
            CottageHumble is not a mood board. It is a constraint system. Every surface is dark. Every font is intentional. Every accent is assigned. The brand tokens are the architecture.
          </SBody>

          <a href="/brand-tokens.json" download
             style={{ display: 'inline-block', background: 'transparent', color: C.cream, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.steelLine}` }}>
            Download brand-tokens.json &rarr;
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            CottageHumble &middot; Dropdown Logistics Design System
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            One design system. Nine products. Humble surface. Cathedral underneath.
          </div>
        </div>
        <Link href="/brand-tokens.json" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
          /brand-tokens.json
        </Link>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
