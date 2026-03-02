'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink { href: string; label: string; }
interface NavGroup { label: string; items: NavLink[]; }
interface Wing { id: string; name: string; color: string; home: string; groups: NavGroup[]; }

// ═══════════════════════════════════════════════════════════
// Wing Definitions
// ═══════════════════════════════════════════════════════════

const wingsData: Wing[] = [
  {
    id: 'ddl',
    name: 'DDL',
    color: '#B23531',
    home: '/ddl',
    groups: [
      {
        label: 'Governance',
        items: [
          { href: '/council', label: 'Council' },
          { href: '/standards', label: 'Standards' },
          { href: '/systems', label: 'Systems' },
          { href: '/registry', label: 'Registry' },
          { href: '/excelligence', label: 'Graph' },
        ],
      },
      {
        label: 'Framework',
        items: [
          { href: '/methodology', label: 'Methodology' },
          { href: '/cognitive', label: 'Cognitive' },
          { href: '/mindframe', label: 'MindFrame' },
          { href: '/dexos', label: 'DexOS' },
          { href: '/guides/llm', label: 'LLM Guide' },
        ],
      },
      {
        label: 'Story',
        items: [
          { href: '/memoir', label: 'Memoir' },
          { href: '/forewords', label: 'Forewords' },
          { href: '/about', label: 'About' },
        ],
      },
      {
        label: 'Work',
        items: [
          { href: '/projects', label: 'Projects' },
          { href: '/prioritease', label: 'PrioritEase' },
        ],
      },
    ],
  },
  {
    id: 'da',
    name: 'D&A',
    color: '#C49A3C',
    home: '/blindspot',
    groups: [
      {
        label: 'Modules',
        items: [
          { href: '/blindspot/trading', label: 'Trading' },
          { href: '/blindspot/steam', label: 'Steam' },
          { href: '/blindspot/campaign', label: 'Campaign' },
          { href: '/blindspot/backtest', label: 'Backtest' },
          { href: '/blindspot/llm', label: 'LLM Setup' },
        ],
      },
      {
        label: 'Recaps',
        items: [
          { href: '/recaps', label: 'All Recaps' },
          { href: '/recaps/apple-music', label: 'Apple Music' },
          { href: '/recaps/annual-signal', label: 'Annual Signal' },
          { href: '/recaps/predictions', label: 'Predictions' },
        ],
      },
    ],
  },
  {
    id: 'dexverse',
    name: 'DexVerse',
    color: '#8a6cc9',
    home: '/dexlore',
    groups: [
      {
        label: 'Lore',
        items: [
          { href: '/dexlore', label: 'Hub' },
          { href: '/dexlore/continuum', label: 'Continuum' },
          { href: '/dexlore/council', label: 'Companions' },
          { href: '/other-works', label: 'Other Works' },
        ],
      },
      {
        label: 'Reference',
        items: [
          { href: '/knowledge/glossary', label: 'Glossary' },
          { href: '/methodology/palette', label: 'Template Palette' },
          { href: '/methodology/palette/narrative', label: 'Palette Narrative' },
        ],
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// Wing Detection
// ═══════════════════════════════════════════════════════════

// Map route prefixes to wings
const routeWingMap: Record<string, string> = {
  // D&A wing
  '/blindspot': 'da',
  '/recaps': 'da',
  // DexVerse wing
  '/dexlore': 'dexverse',
  '/other-works': 'dexverse',
  '/knowledge/glossary': 'dexverse',
  '/methodology/palette': 'dexverse',
  // Everything else → DDL
};

function detectWing(pathname: string | null): Wing {
  if (!pathname) return wingsData[0];

  // Check specific routes first (longer prefixes take priority)
  const sortedPrefixes = Object.keys(routeWingMap).sort((a, b) => b.length - a.length);
  for (const prefix of sortedPrefixes) {
    if (pathname.startsWith(prefix)) {
      const wingId = routeWingMap[prefix];
      return wingsData.find(w => w.id === wingId) || wingsData[0];
    }
  }

  // Default to DDL
  return wingsData[0];
}

// ═══════════════════════════════════════════════════════════
// Dropdown Component
// ═══════════════════════════════════════════════════════════

function Dropdown({ group, isActive, pathname, wingColor }: {
  group: NavGroup;
  isActive: (h: string) => boolean;
  pathname: string | null;
  wingColor: string;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const groupActive = group.items.some(i => isActive(i.href));

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div
      onMouseEnter={() => { if (timer.current) clearTimeout(timer.current); setOpen(true); }}
      onMouseLeave={() => { timer.current = setTimeout(() => setOpen(false), 120); }}
      style={{ position: 'relative' }}
    >
      <button onClick={() => setOpen(!open)} style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500,
        color: groupActive ? 'rgba(245,241,235,0.8)' : 'rgba(245,241,235,0.4)',
        background: open ? 'rgba(255,255,255,0.04)' : 'transparent',
        border: 'none', padding: '5px 10px', borderRadius: 5, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s',
      }}>
        {group.label}
        <span style={{ fontSize: 8, opacity: 0.5, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'inline-block' }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
          marginTop: 6, background: 'rgba(12,20,34,0.96)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 8, padding: '6px 4px', minWidth: 150,
          boxShadow: '0 12px 40px rgba(0,0,0,0.4)', animation: 'ddlDropIn 0.15s ease',
        }}>
          {group.items.map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: isActive(item.href) ? '#F5F1EB' : 'rgba(245,241,235,0.5)',
              textDecoration: 'none', padding: '7px 14px', borderRadius: 5,
              background: isActive(item.href) ? wingColor + '20' : 'transparent',
              transition: 'all 0.12s', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { if (!isActive(item.href)) { (e.currentTarget).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget).style.color = 'rgba(245,241,235,0.8)'; } }}
              onMouseLeave={e => { if (!isActive(item.href)) { (e.currentTarget).style.background = 'transparent'; (e.currentTarget).style.color = 'rgba(245,241,235,0.5)'; } }}
            >{item.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Wing Switcher — the three-door toggle
// ═══════════════════════════════════════════════════════════

function WingSwitcher({ currentWing, isActive }: { currentWing: Wing; isActive: (h: string) => boolean }) {
  return (
    <>
      {wingsData.map((w, i) => (
        <Link key={w.id} href={w.home} style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
          fontWeight: currentWing.id === w.id ? 600 : 400,
          color: currentWing.id === w.id ? w.color : 'rgba(245,241,235,0.4)',
          textDecoration: 'none', padding: '6px 12px', borderRadius: 6,
          background: currentWing.id === w.id ? w.color + '12' : 'transparent',
          transition: 'all 0.15s',
        }}>{w.name}</Link>
      ))}
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Nav
// ═══════════════════════════════════════════════════════════

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const wing = detectWing(pathname);

  // Landing page — no nav, just the landing
  const isLanding = pathname === '/';

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

  if (isLanding) return null; // Landing page manages its own chrome

  return (
    <>
      <style>{`
        @keyframes ddlDropIn { from { opacity:0; transform:translateX(-50%) translateY(-4px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
        @keyframes ddlSlideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width:768px) { .ddl-desk { display:none!important; } .ddl-mob-btn { display:flex!important; } .ddl-tagline { display:none!important; } .ddl-bar { height:52px!important; padding:0 16px!important; } }
        @media (min-width:769px) { .ddl-mob-btn { display:none!important; } .ddl-mob-menu { display:none!important; } }
      `}</style>

      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: `1px solid ${wing.color}15`,
        background: 'rgba(7,16,28,0.88)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      }}>
        <div className="ddl-bar" style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60,
        }}>
          {/* Logo — always goes home */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: `linear-gradient(135deg, ${wing.color}, ${wing.color}90)`,
              boxShadow: `0 2px 8px ${wing.color}40`,
              transition: 'all 0.3s',
            }} />
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#F5F1EB', lineHeight: 1.2 }}>
                Dropdown Logistics
              </div>
              <div className="ddl-tagline" style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: wing.color + '80', letterSpacing: '0.04em',
                transition: 'color 0.3s',
              }}>
                {wing.id === 'ddl' ? 'Chaos → Structured → Automated' :
                  wing.id === 'da' ? 'BlindSpot Analytics' :
                    'The Lore Layer'}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="ddl-desk" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Wing switcher */}
            <WingSwitcher currentWing={wing} isActive={isActive} />
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)', margin: '0 8px' }} />
            {/* Wing-specific groups */}
            {wing.groups.map(g => (
              <Dropdown key={g.label} group={g} isActive={isActive} pathname={pathname} wingColor={wing.color} />
            ))}
          </nav>

          {/* Mobile button */}
          <button className="ddl-mob-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
            style={{ display: 'none', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'rgba(245,241,235,0.6)', fontSize: 22, cursor: 'pointer', padding: 8, width: 40, height: 40, borderRadius: 6 }}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="ddl-mob-menu" style={{
            position: 'fixed', top: 52, left: 0, right: 0, bottom: 0,
            background: 'rgba(7,16,28,0.98)', backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)', overflowY: 'auto',
            padding: '20px 24px 40px', animation: 'ddlSlideDown 0.2s ease',
          }}>
            {/* Wing switcher — mobile */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: wing.color, marginBottom: 10 }}>Wings</div>
              {wingsData.map(w => (
                <Link key={w.id} href={w.home} onClick={() => setMobileOpen(false)} style={{
                  display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: 16,
                  fontWeight: wing.id === w.id ? 600 : 400,
                  color: wing.id === w.id ? w.color : 'rgba(245,241,235,0.5)',
                  textDecoration: 'none', padding: '10px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>{w.name} — {w.id === 'ddl' ? 'Governance' : w.id === 'da' ? 'Analytics' : 'Lore'}</Link>
              ))}
            </div>

            {/* Current wing groups */}
            {wing.groups.map(g => (
              <div key={g.label} style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: wing.color, marginBottom: 10 }}>{g.label}</div>
                {g.items.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{
                    display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: 16,
                    fontWeight: isActive(item.href) ? 600 : 400,
                    color: isActive(item.href) ? '#F5F1EB' : 'rgba(245,241,235,0.5)',
                    textDecoration: 'none', padding: '10px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}>{item.label}</Link>
                ))}
              </div>
            ))}

            <div style={{ textAlign: 'center', paddingTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: 'rgba(245,241,235,0.1)', textTransform: 'uppercase' }}>
              Cottage — Humble surface. Cathedral underneath.
            </div>
          </div>
        )}
      </header>
    </>
  );
}
