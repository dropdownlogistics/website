'use client';

import { useState, useEffect } from 'react';

const C = {
  navy: '#0D1B2A', navyDeep: '#070F1C', card: '#10202f',
  cream: '#F5F1EB', creamHigh: 'rgba(245,241,235,0.85)',
  creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.35)',
  creamGhost: 'rgba(245,241,235,0.08)', border: 'rgba(245,241,235,0.06)',
  crimson: '#B23531', amber: '#C49A3C', violet: '#8a6cc9',
  green: '#4A9E6B', blue: '#6B9DC2',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

function ColorSwatch({ hex, name, usage }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 6, background: hex,
        border: `1px solid rgba(245,241,235,0.1)`, flexShrink: 0,
      }} />
      <div>
        <div style={{ fontFamily: font.mono, fontSize: 12, color: C.cream }}>{hex}</div>
        <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim }}>{name} - {usage}</div>
      </div>
    </div>
  );
}

export default function BrandPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{
      maxWidth: 900, margin: '0 auto', padding: '60px 24px 100px',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(8px)',
      transition: 'all 0.6s ease',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <div style={{
          fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: C.crimson, marginBottom: 12,
        }}>Brand Identity</div>
        <div style={{
          fontFamily: font.display, fontSize: 32, fontWeight: 700,
          color: C.cream, marginBottom: 12, letterSpacing: '-0.5px',
        }}>Two Systems. One Architecture.</div>
        <div style={{
          fontFamily: font.body, fontSize: 17, color: C.creamMid,
          lineHeight: 1.8, maxWidth: 620,
        }}>
          Dropdown Logistics has two visual identities: the DDL governance
          crest and the D&amp;A analytics helix. Different marks, same
          design philosophy. Humble surface. Cathedral underneath.
        </div>
      </div>

      {/* ═══ DDL IDENTITY ═══ */}
      <div style={{ marginBottom: 64 }}>
        <div style={{
          fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: C.crimson, marginBottom: 20,
        }}>DDL - The Governance Engine</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16, marginBottom: 32,
        }}>
          {[
            { src: '/images/brand/full-crest.png', label: 'Full Crest' },
            { src: '/images/brand/seal-bold.png', label: 'Seal Bold' },
            { src: '/images/brand/seal-gold.png', label: 'Seal Gold' },
            { src: '/images/brand/wax-seal.png', label: 'Wax Seal' },
            { src: '/images/brand/quadrants.png', label: 'Quadrants' },
          ].map((item, i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 8, padding: 16, textAlign: 'center',
            }}>
              <img src={item.src} alt={item.label} style={{
                maxWidth: '100%', maxHeight: 180, objectFit: 'contain',
                marginBottom: 10,
              }} />
              <div style={{
                fontFamily: font.mono, fontSize: 10, color: C.creamDim,
                letterSpacing: '0.05em',
              }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.7, maxWidth: 560,
        }}>
          The circuit-crest monogram represents the governance layer.
          Technical, authoritative, system-engineered. Used in formal
          branding, templates, and documentation. The wax seal variant
          appears on ratified council documents.
        </div>
      </div>

      {/* ═══ D&A IDENTITY ═══ */}
      <div style={{ marginBottom: 64 }}>
        <div style={{
          fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: C.green, marginBottom: 20,
        }}>D&amp;A Analytics - The Intelligence Surface</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16, marginBottom: 24,
        }}>
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: 24, textAlign: 'center',
          }}>
            <img src="/images/brand/dna-helix-favicon.svg" alt="D&A Helix Mark"
              style={{ width: 120, height: 120, marginBottom: 12 }} />
            <div style={{
              fontFamily: font.mono, fontSize: 10, color: C.creamDim,
            }}>Helix Favicon</div>
          </div>
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: 24, textAlign: 'center',
          }}>
            <img src="/images/brand/dna-helix-mark.svg" alt="D&A Helix with Rungs"
              style={{ width: 120, height: 120, marginBottom: 12 }} />
            <div style={{
              fontFamily: font.mono, fontSize: 10, color: C.creamDim,
            }}>Helix Mark</div>
          </div>
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: 24, textAlign: 'center',
          }}>
            <img src="/images/brand/dna-stacked.png" alt="D&A Stacked Wordmark"
              style={{ maxWidth: '100%', maxHeight: 160, objectFit: 'contain', marginBottom: 12 }} />
            <div style={{
              fontFamily: font.mono, fontSize: 10, color: C.creamDim,
            }}>Stacked Wordmark</div>
          </div>
        </div>

        <div style={{
          fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.7, maxWidth: 560, marginBottom: 16,
        }}>
          The double helix represents two analysts who share actual DNA.
          Dave and Alex. D and A. The strands intertwine but maintain
          distinct colors: green for Dave, light green for Alex, neutral
          for the ampersand.
        </div>
        <div style={{
          fontFamily: font.body, fontSize: 15, fontStyle: 'italic',
          color: C.creamDim, lineHeight: 1.7,
        }}>
          Signal &rarr; Structure &rarr; Edge
        </div>

        {/* D&A Color Spec */}
        <div style={{
          marginTop: 24, padding: '20px 24px',
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
        }}>
          <div style={{
            fontFamily: font.mono, fontSize: 9, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: C.creamDim, marginBottom: 12,
          }}>D&amp;A Color Specification</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
            <ColorSwatch hex="#22C55E" name="d" usage="Dave" />
            <ColorSwatch hex="#86EFAC" name="a" usage="Alex" />
            <ColorSwatch hex="#E2E8F0" name="&" usage="Neutral" />
            <ColorSwatch hex="#0D2137" name="bg" usage="Background" />
          </div>
        </div>
      </div>

      {/* ═══ COTTAGEHUMBLE DESIGN SYSTEM ═══ */}
      <div style={{ marginBottom: 64 }}>
        <div style={{
          fontFamily: font.mono, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: C.amber, marginBottom: 20,
        }}>CottageHumble - Design System</div>

        <div style={{
          fontFamily: font.body, fontSize: 15, color: C.creamMid,
          lineHeight: 1.7, maxWidth: 560, marginBottom: 24,
        }}>
          The site design system shared by both identities. Dark navy base,
          cream typography, wing-specific accent colors. Every page on
          the site follows these tokens.
        </div>

        {/* Wing Colors */}
        <div style={{
          padding: '20px 24px', background: C.card,
          border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 16,
        }}>
          <div style={{
            fontFamily: font.mono, fontSize: 9, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: C.creamDim, marginBottom: 12,
          }}>Wing Colors</div>
          <ColorSwatch hex="#B23531" name="Crimson" usage="DDL wing" />
          <ColorSwatch hex="#C49A3C" name="Amber" usage="D&A wing" />
          <ColorSwatch hex="#8a6cc9" name="Violet" usage="DexVerse wing" />
          <ColorSwatch hex="#4A9E6B" name="Green" usage="Dossiers wing" />
          <ColorSwatch hex="#6B9DC2" name="Blue" usage="Products wing" />
        </div>

        {/* Surface Colors */}
        <div style={{
          padding: '20px 24px', background: C.card,
          border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 16,
        }}>
          <div style={{
            fontFamily: font.mono, fontSize: 9, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: C.creamDim, marginBottom: 12,
          }}>Surfaces</div>
          <ColorSwatch hex="#0D1B2A" name="Navy" usage="Primary background" />
          <ColorSwatch hex="#10202f" name="Card" usage="Card surfaces" />
          <ColorSwatch hex="#F5F1EB" name="Cream" usage="Primary text" />
        </div>

        {/* Typography */}
        <div style={{
          padding: '20px 24px', background: C.card,
          border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 16,
        }}>
          <div style={{
            fontFamily: font.mono, fontSize: 9, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: C.creamDim, marginBottom: 16,
          }}>Typography</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 600, color: C.cream, marginBottom: 4 }}>
              Space Grotesk
            </div>
            <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim }}>
              Display font. Headings, wing names, UI labels, navigation.
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: font.body, fontSize: 22, color: C.cream, marginBottom: 4 }}>
              Source Serif 4
            </div>
            <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim }}>
              Body font. Prose, descriptions, long-form content, memoir text.
            </div>
          </div>
          <div>
            <div style={{ fontFamily: font.mono, fontSize: 18, color: C.cream, marginBottom: 4 }}>
              JetBrains Mono
            </div>
            <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim }}>
              Monospace. Data, stats, metadata, code blocks, terminal displays.
            </div>
          </div>
        </div>

        {/* Principles */}
        <div style={{
          padding: '20px 24px', background: C.card,
          border: `1px solid ${C.border}`, borderRadius: 8,
        }}>
          <div style={{
            fontFamily: font.mono, fontSize: 9, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: C.creamDim, marginBottom: 12,
          }}>Hard Rules</div>
          {[
            'Dark navy base. Always.',
            'Cream text on navy. No white (#ffffff).',
            'No Inter. No Arial. No system fonts.',
            'No light mode.',
            'Wing accent colors are identity, not decoration.',
            'Cards: #10202f background, 1px border, 7-8px radius.',
            'Grain texture overlay at 3.5% opacity on every page.',
          ].map((rule, i) => (
            <div key={i} style={{
              fontFamily: font.body, fontSize: 14, color: C.creamMid,
              padding: '6px 0', borderBottom: i < 6 ? `1px solid ${C.border}` : 'none',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontFamily: font.mono, fontSize: 10, color: C.crimson, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
              {rule}
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div style={{
        paddingTop: 32, borderTop: `1px solid ${C.border}`,
        fontFamily: font.body, fontSize: 14, fontStyle: 'italic',
        color: C.creamDim, textAlign: 'center',
      }}>
        Beautified structure. Step 7 of 8.
      </div>
    </div>
  );
}
