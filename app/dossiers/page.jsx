'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy:       '#0D1B2A',
  card:       '#10202f',
  cream:      '#F5F1EB',
  dim:        'rgba(245,241,235,0.55)',
  muted:      'rgba(245,241,235,0.3)',
  ghost:      'rgba(245,241,235,0.06)',
  border:     'rgba(245,241,235,0.06)',
  green:      '#4A9E6B',
  greenDim:   'rgba(74,158,107,0.12)',
  greenBorder:'rgba(74,158,107,0.25)',
  violet:     '#8a6cc9',
  violetDim:  'rgba(138,108,201,0.12)',
  amber:      '#C49A3C',
  amberDim:   'rgba(196,154,60,0.12)',
  steel:      '#6B7B8D',
  copper:     '#C49A3C',
};

const universes = [
  {
    id: 'dnd',
    name: 'Ash, Snow & Steel',
    system: 'D&D 5e / Skyrim overlay',
    color: C.violet,
    colorDim: C.violetDim,
    desc: 'A Skyrim-overlaid 5e campaign. The party navigates a world where the ancient and the arcane are never far apart.',
    characters: [
      { name: 'Feliciano', role: 'Paladin', href: '/dossiers/feliciano' },
      { name: 'Hillie', role: 'Warlock', href: '/dossiers/hillie' },
    ],
    party: { label: 'Party', href: '/dossiers/ash-snow-steel' },
  },
  {
    id: 'divinity',
    name: 'Fort Joy',
    system: 'Divinity: Original Sin 2',
    color: C.amber,
    colorDim: C.amberDim,
    desc: 'The Fort Joy cohort. Bound by circumstance, forged by combat. Every dossier built from live playthrough data.',
    characters: [
      { name: 'Merrick', role: 'Mage', href: '/dossiers/merrick' },
      { name: 'Riflen', role: 'Fighter', href: '/dossiers/riflen' },
      { name: 'Doc Rickets', role: 'Rogue', href: '/dossiers/doc-rickets' },
    ],
    party: { label: 'Party', href: '/dossiers/fort-joy' },
  },
  {
    id: 'skyrim',
    name: 'Leafshadow Lineage',
    system: 'The Elder Scrolls V: Skyrim',
    color: C.green,
    colorDim: C.greenDim,
    desc: 'Three generations of Argonians. A chronicle built as a living document — dossiers, lineage, and portrait governance.',
    characters: [
      { name: 'Xuth Jr.', role: 'Argonian', href: '/dossiers/xuth-jr' },
      { name: 'Xuth III', role: 'Argonian', href: '/dossiers/xuth-iii' },
      { name: 'Xuth Sr.', role: 'Daedric', href: '/dossiers/xuth-sr' },
    ],
    party: { label: 'Chronicle', href: '/dossiers/leafshadow-lineage' },
  },
];

const meta = [
  { label: 'HAL Style Lock', desc: 'Portrait governance protocol', href: '/dossiers/hal-style-lock' },
  { label: 'Campaign Analytics', desc: 'RPG dashboard', href: '/dossiers/campaign-analytics' },
];

export default function DossiersLanding() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton />

      {/* ── HERO ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px 64px' }}>

        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          color: C.green,
          letterSpacing: '0.2em',
          marginBottom: 20,
        }}>
          DOSSIERS · CHARACTER ARCHIVE
        </div>

        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          maxWidth: 680,
          marginBottom: 20,
        }}>
          The people who lived<br/>
          <span style={{ color: C.green }}>in the campaigns.</span>
        </div>

        <div style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: '1rem',
          color: C.dim,
          maxWidth: 520,
          lineHeight: 1.8,
          marginBottom: 16,
        }}>
          CottageHumble-styled character dossiers across three universes. Each file is a governed document — built from live campaign data, maintained like a registry, designed like a product.
        </div>

        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem',
          color: C.steel,
          letterSpacing: '0.05em',
        }}>
          D&D 5e · Divinity: Original Sin 2 · The Elder Scrolls V
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 960, margin: '0 auto' }}/>

      {/* ── UNIVERSES ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          color: C.green,
          letterSpacing: '0.2em',
          marginBottom: 32,
        }}>
          THREE UNIVERSES
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {universes.map((u) => (
            <div key={u.id} style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${u.color}`,
              borderRadius: 8,
              padding: '32px 28px',
              marginBottom: 16,
            }}>
              {/* Universe header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.6rem',
                    color: u.color,
                    letterSpacing: '0.15em',
                    marginBottom: 6,
                  }}>{u.system}</div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    letterSpacing: '-0.01em',
                  }}>{u.name}</div>
                </div>
                <Link href={u.party.href} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  color: u.color,
                  textDecoration: 'none',
                  border: `1px solid ${u.color}`,
                  padding: '6px 14px',
                  borderRadius: 4,
                  opacity: 0.8,
                }}>
                  {u.party.label} →
                </Link>
              </div>

              <div style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '0.9rem',
                color: C.dim,
                lineHeight: 1.7,
                marginBottom: 24,
                maxWidth: 560,
              }}>{u.desc}</div>

              {/* Character cards */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {u.characters.map((ch) => (
                  <Link key={ch.href} href={ch.href} style={{
                    background: u.colorDim,
                    border: `1px solid ${u.color}22`,
                    borderRadius: 6,
                    padding: '10px 16px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    minWidth: 120,
                  }}>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: C.cream,
                    }}>{ch.name}</div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.55rem',
                      color: u.color,
                      letterSpacing: '0.1em',
                    }}>{ch.role}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── META / GOVERNANCE ── */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            color: C.steel,
            letterSpacing: '0.2em',
            marginBottom: 20,
          }}>
            META & GOVERNANCE
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {meta.map((m) => (
              <Link key={m.href} href={m.href} style={{
                background: C.navy,
                border: `1px solid ${C.border}`,
                borderRadius: 6,
                padding: '16px 20px',
                textDecoration: 'none',
                minWidth: 200,
              }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: C.cream,
                  marginBottom: 4,
                }}>{m.label}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem',
                  color: C.steel,
                }}>{m.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESIGN NOTE ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            color: C.steel,
            letterSpacing: '0.15em',
            minWidth: 140,
            paddingTop: 3,
          }}>
            THE FORMAT
          </div>
          <div style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: '0.9rem',
            color: C.dim,
            lineHeight: 1.8,
            maxWidth: 520,
          }}>
            Every dossier follows the CottageHumble standard — navy surface, cream text, universe-specific accent color. Each file is a governed document, not a wiki entry. The format repeats. The characters change.
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        borderTop: `1px solid ${C.border}`,
        maxWidth: 960,
        margin: '0 auto',
        padding: '28px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.55rem',
          color: C.steel,
          letterSpacing: '0.1em',
        }}>
          DOSSIERS · CHARACTER ARCHIVE · DROPDOWN LOGISTICS
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.55rem',
          color: C.steel,
        }}>
          The format repeats. The characters change.
        </div>
      </div>

    </div>
  );
}
