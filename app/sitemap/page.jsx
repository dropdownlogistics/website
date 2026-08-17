'use client';
import { useState } from 'react';
import Link from 'next/link';
import { WINGS, ROUTE_COUNT } from '@/lib/site-routes';

const C = {
  navy: '#0D1B2A', card: '#10202f', cardHi: '#132435',
  crimson: '#B23531', amber: '#C49A3C', violet: '#8a6cc9',
  green: '#4A9E6B', steel: '#4A7C9B', teal: '#2C7A7B',
  blue: '#6B9DC2', daGreen: '#22C55E',
  cream: '#F5F1EB', dim: 'rgba(245,241,235,0.55)',
  muted: 'rgba(245,241,235,0.3)', border: 'rgba(245,241,235,0.07)',
};

const font = {
  display: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// Route data now lives in lib/site-routes.js so it can be counted (see that
// file). Colours arrive as token names; this page resolves them against its own
// palette, which is the decoupling that let the array move at all.
const wings = WINGS.map((w) => ({ ...w, color: C[w.colorToken] ?? C.steel }));

// ROUTE_COUNT, not a local reduce. A reduce over wings counts ENTRIES (200) --
// thirteen hrefs are cross-listed under more than one wing, which is correct
// navigation and a wrong route count. This page said "200 routes" while there
// are 185. Per-wing counts below stay as entry counts, because in a wing's own
// menu the cross-listed item genuinely is an item of that menu.
const totalRoutes = ROUTE_COUNT;

function WingCard({ wing, isOpen, onToggle }) {
  return (
    <div style={{
      background: isOpen ? C.cardHi : C.card,
      border: `1px solid ${isOpen ? wing.color + '40' : C.border}`,
      borderTop: `2px solid ${isOpen ? wing.color : 'transparent'}`,
      borderRadius: 8,
      overflow: 'hidden',
      transition: 'all 0.15s',
      cursor: 'pointer',
    }} onClick={onToggle}>

      {/* Header */}
      <div style={{ padding: '18px 18px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: '1rem', color: isOpen ? wing.color : C.cream, transition: 'color 0.15s' }}>
            {wing.label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontFamily: font.mono, fontSize: '0.5rem', color: wing.color, background: wing.color + '18', padding: '3px 7px', borderRadius: 3, letterSpacing: '0.08em' }}>
              {wing.tag}
            </div>
            <div style={{ fontFamily: font.mono, fontSize: '0.55rem', color: C.muted }}>
              {wing.routes.length}
            </div>
            <div style={{ fontFamily: font.mono, fontSize: '0.6rem', color: C.muted, transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
              &#x25BE;
            </div>
          </div>
        </div>
        <div style={{ fontFamily: font.body, fontSize: '0.75rem', color: isOpen ? C.dim : 'rgba(245,241,235,0.35)', lineHeight: 1.5, transition: 'color 0.15s' }}>
          {wing.tagline}
        </div>
      </div>

      {/* Routes */}
      {isOpen && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: '12px 18px 16px' }}
          onClick={e => e.stopPropagation()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {wing.routes.map(route => (
              <Link key={route.href + route.label} href={route.href} style={{
                fontFamily: font.mono, fontSize: '0.65rem',
                color: wing.color, textDecoration: 'none',
                padding: '4px 0',
                borderBottom: `1px solid rgba(245,241,235,0.03)`,
                display: 'block',
              }}>
                {route.label} &#x2192;
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiteMap() {
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState('');

  const toggle = (label) => setOpen(open === label ? null : label);

  const displayed = filter
    ? wings.map(w => ({
        ...w,
        routes: w.routes.filter(r => r.label.toLowerCase().includes(filter.toLowerCase())),
      })).filter(w => w.routes.length > 0 || w.label.toLowerCase().includes(filter.toLowerCase()))
    : wings;

  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: font.body }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: font.mono, fontSize: 11, color: C.amber, letterSpacing: '0.2em', marginBottom: 12 }}>
            DDL &middot; SITE MAP
          </div>
          <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Everything
          </div>
          <div style={{ fontFamily: font.mono, fontSize: 12, color: C.muted }}>
            {totalRoutes} routes across {wings.length} wings.
          </div>
        </div>

        {/* Filter */}
        <div style={{ marginBottom: 32 }}>
          <input
            type="text"
            placeholder="Filter routes..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{
              width: '100%', maxWidth: 400,
              background: C.card, border: `1px solid rgba(245,241,235,0.12)`,
              borderRadius: 6, padding: '8px 14px',
              fontFamily: font.mono, fontSize: 12,
              color: C.cream, outline: 'none',
            }}
          />
        </div>

        {/* Wing cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12,
        }}>
          {displayed.map(wing => (
            <WingCard
              key={wing.label}
              wing={wing}
              isOpen={open === wing.label}
              onToggle={() => toggle(wing.label)}
            />
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: font.mono, fontSize: 11, color: C.muted }}>
            {totalRoutes} routes &middot; {wings.length} wings &middot; dropdownlogistics.com
          </span>
          <span style={{ fontFamily: font.mono, fontSize: 11, color: C.muted }}>
            Chaos &#x2192; Structured &#x2192; Automated
          </span>
        </div>

      </div>
    </div>
  );
}

