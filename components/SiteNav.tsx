'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ═══════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════

interface NavLink { href: string; label: string; }
interface NavGroup { label: string; items: NavLink[]; }
interface Wing {
  id: string;
  name: string;
  tagline: string;
  color: string;
  home: string;
  groups: NavGroup[];
}

// ═══════════════════════════════════════════════════════
// CottageHumble Tokens
// ═══════════════════════════════════════════════════════

const C = {
  navy: '#0D1B2A',
  navyDeep: 'rgba(7,16,28,0.88)',
  navyPanel: 'rgba(12,20,34,0.96)',
  cream: '#F5F1EB',
  creamMid: 'rgba(245,241,235,0.55)',
  creamDim: 'rgba(245,241,235,0.4)',
  creamGhost: 'rgba(245,241,235,0.08)',
  border: 'rgba(245,241,235,0.06)',
  crimson: '#B23531',
  amber: '#C49A3C',
  violet: '#8a6cc9',
  green: '#4A9E6B',
  blue: '#6B9DC2',
};

const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

// ═══════════════════════════════════════════════════════
// Wing Definitions
// ═══════════════════════════════════════════════════════

const wingsData: Wing[] = [
  {
    id: 'ddl',
    name: 'DDL',
    tagline: 'Chaos → Structured → Automated',
    color: C.crimson,
    home: '/ddl',
    groups: [
      {
        label: 'Governance',
        items: [
          { href: '/council', label: 'Council' },
          { href: '/council/profiles', label: 'Council Profiles' },
          { href: '/standards', label: 'Standards' },
          { href: '/systems', label: 'Systems' },
          { href: '/registry', label: 'Registry' },
          { href: '/excelligence', label: 'Excelligence' },
        ],
      },
      {
        label: 'Framework',
        items: [
          { href: '/methodology', label: 'Methodology' },
          { href: '/mindframe', label: 'MindFrame' },
          { href: '/dexos', label: 'DexOS' },
          { href: '/framework/pss', label: 'PSS' },
          { href: '/framework/vibe-coding', label: 'Vibe Coding' },
          { href: '/guides/llm', label: 'LLM Guide' },
        ],
      },
      {
        label: 'Memoir & Story',
        items: [
          { href: '/memoir', label: 'Memoir' },
          { href: '/memoir/calendar', label: 'Release Calendar' },
          { href: '/forewords', label: 'Forewords' },
          { href: '/about', label: 'About' },
        ],
      },
      {
        label: 'Work',
        items: [
          { href: '/projects', label: 'Projects' },
          { href: '/prioritease', label: 'PrioritEase' },
          { href: '/work/rexcel', label: 'r/Excel' },
        ],
      },
    ],
  },
  {
    id: 'da',
    name: 'D&A',
    tagline: 'Data & Analytics',
    color: C.amber,
    home: '/blindspot',
    groups: [
      {
        label: 'BlindSpot',
        items: [
          { href: '/blindspot', label: 'Overview' },
          { href: '/blindspot/trading', label: 'Trading' },
          { href: '/blindspot/steam', label: 'Steam' },
          { href: '/blindspot/campaign', label: 'Campaign' },
          { href: '/blindspot/llm', label: 'LLM Setup' },
        ],
      },
      {
        label: 'Analytics',
        items: [
          { href: '/analytics', label: 'Overview' },
          { href: '/analytics/grammarly', label: 'Grammarly' },
          { href: '/analytics/sonic-thread', label: 'Sonic Thread' },
          { href: '/analytics/callback-engine', label: 'Callback Engine' },
          { href: '/analytics/catnip-map', label: 'Catnip Map' },
          { href: '/analytics/dexdash', label: 'DexDash' },
          { href: '/analytics/tone', label: 'Tone Analysis' },
          { href: '/analytics/memoir', label: 'Memoir Analytics' },
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
    tagline: 'The Lore Layer',
    color: C.violet,
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
          { href: '/knowledge/map', label: 'Knowledge Map' },
          { href: '/knowledge/glossary', label: 'Glossary' },
          { href: '/methodology/palette', label: 'Template Palette' },
        ],
      },
    ],
  },
  // ——— Accent-only wings (no dropdown groups) ———
  {
    id: 'dossiers',
    name: 'Dossiers',
    tagline: 'CottageHumble RPG',
    color: C.green,
    home: '/dossiers',
    groups: [],
  },
  {
    id: 'products',
    name: 'Products',
    tagline: 'Behavioral Intelligence',
    color: C.blue,
    home: '/products/behavioral-intelligence',
    groups: [],
  },
];

// ═══════════════════════════════════════════════════════
// Wing Detection
// ═══════════════════════════════════════════════════════

const routeWingMap: Record<string, string> = {
  '/blindspot':   'da',
  '/analytics':   'da',
  '/recaps':      'da',
  '/dexlore':     'dexverse',
  '/other-works': 'dexverse',
  '/knowledge':   'dexverse',
  '/dossiers':    'dossiers',
  '/products':    'products',
};

function detectWing(pathname: string | null): Wing {
  if (!pathname) return wingsData[0];
  const sorted = Object.keys(routeWingMap).sort((a, b) => b.length - a.length);
  for (const prefix of sorted) {
    if (pathname.startsWith(prefix)) {
      const wingId = routeWingMap[prefix];
      return wingsData.find(w => w.id === wingId) || wingsData[0];
    }
  }
  return wingsData[0];
}

// ═══════════════════════════════════════════════════════
// Contextual Logo Link
// On a wing landing → go home
// On a subpage → go to wing landing
// ═══════════════════════════════════════════════════════

function getLogoHref(pathname: string | null, wing: Wing): string {
  if (!pathname) return '/';
  // Strip trailing slash for comparison
  const clean = pathname.replace(/\/$/, '') || '/';
  const wingHome = wing.home.replace(/\/$/, '');
  // If we're on the wing's home page, go to site root
  if (clean === wingHome) return '/';
  // Otherwise go to wing home
  return wing.home;
}

// ═══════════════════════════════════════════════════════
// Dropdown Component
// ═══════════════════════════════════════════════════════

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
        fontFamily: font.mono, fontSize: 11, fontWeight: 500,
        color: groupActive ? 'rgba(245,241,235,0.8)' : C.creamDim,
        background: open ? C.creamGhost : 'transparent',
        border: 'none', padding: '5px 10px', borderRadius: 5, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s',
      }}>
        {group.label}
        <span style={{
          fontSize: 8, opacity: 0.5,
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s', display: 'inline-block',
        }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
          marginTop: 6, background: C.navyPanel,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${C.creamGhost}`, borderRadius: 8,
          padding: '6px 4px', minWidth: 160,
          boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          animation: 'ddlDropIn 0.15s ease',
        }}>
          {group.items.map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'block', fontFamily: font.mono, fontSize: 11,
              color: isActive(item.href) ? C.cream : C.creamMid,
              textDecoration: 'none', padding: '7px 14px', borderRadius: 5,
              background: isActive(item.href) ? wingColor + '20' : 'transparent',
              transition: 'all 0.12s', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { if (!isActive(item.href)) { e.currentTarget.style.background = C.creamGhost; e.currentTarget.style.color = 'rgba(245,241,235,0.8)'; } }}
              onMouseLeave={e => { if (!isActive(item.href)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.creamMid; } }}
            >{item.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Wing Switcher
// ═══════════════════════════════════════════════════════

function WingSwitcher({ currentWing }: { currentWing: Wing }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {wingsData.map(w => (
        <Link key={w.id} href={w.home} style={{
          fontFamily: font.display, fontSize: 13,
          fontWeight: currentWing.id === w.id ? 600 : 400,
          color: currentWing.id === w.id ? w.color : C.creamDim,
          textDecoration: 'none', padding: '6px 10px', borderRadius: 6,
          background: currentWing.id === w.id ? w.color + '12' : 'transparent',
          transition: 'all 0.15s', whiteSpace: 'nowrap',
        }}>{w.name}</Link>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Mobile Menu
// ═══════════════════════════════════════════════════════

function MobileMenu({ wing, isActive, onClose }: {
  wing: Wing;
  isActive: (h: string) => boolean;
  onClose: () => void;
}) {
  const mobileSections: NavLink[] = [
    { href: '/dossiers', label: 'Dossiers' },
    { href: '/products/behavioral-intelligence', label: 'Products' },
    { href: '/memoir', label: 'Memoir' },
    { href: '/projects', label: 'Projects' },
  ];

  return (
    <div style={{
      position: 'fixed', top: 52, left: 0, right: 0, bottom: 0,
      background: 'rgba(7,16,28,0.98)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      overflowY: 'auto', padding: '20px 24px 40px',
      animation: 'ddlSlideDown 0.2s ease', zIndex: 50,
    }}>
      {/* Wing switcher */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: font.mono, fontSize: 9, letterSpacing: '0.14em',
          textTransform: 'uppercase' as const, color: wing.color, marginBottom: 10,
        }}>Wings</div>
        {wingsData.filter(w => w.groups.length > 0).map(w => (
          <Link key={w.id} href={w.home} onClick={onClose} style={{
            display: 'block', fontFamily: font.display, fontSize: 16,
            fontWeight: wing.id === w.id ? 600 : 400,
            color: wing.id === w.id ? w.color : C.creamMid,
            textDecoration: 'none', padding: '10px 0',
            borderBottom: `1px solid ${C.border}`,
          }}>{w.name} — {w.tagline}</Link>
        ))}
      </div>

      {/* Section links */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: font.mono, fontSize: 9, letterSpacing: '0.14em',
          textTransform: 'uppercase' as const, color: C.creamDim, marginBottom: 10,
        }}>Sections</div>
        {mobileSections.map(s => (
          <Link key={s.href} href={s.href} onClick={onClose} style={{
            display: 'block', fontFamily: font.display, fontSize: 16,
            fontWeight: isActive(s.href) ? 600 : 400,
            color: isActive(s.href) ? C.cream : C.creamMid,
            textDecoration: 'none', padding: '10px 0',
            borderBottom: `1px solid ${C.border}`,
          }}>{s.label}</Link>
        ))}
      </div>

      {/* Current wing dropdown groups (expanded) */}
      {wing.groups.length > 0 && (
        <>
          <div style={{
            fontFamily: font.mono, fontSize: 9, letterSpacing: '0.14em',
            textTransform: 'uppercase' as const, color: wing.color,
            marginBottom: 10, marginTop: 8,
          }}>{wing.name} Navigation</div>
          {wing.groups.map(g => (
            <div key={g.label} style={{ marginBottom: 20 }}>
              <div style={{
                fontFamily: font.mono, fontSize: 9, letterSpacing: '0.1em',
                textTransform: 'uppercase' as const, color: C.creamDim,
                marginBottom: 8, paddingLeft: 8,
              }}>{g.label}</div>
              {g.items.map(item => (
                <Link key={item.href} href={item.href} onClick={onClose} style={{
                  display: 'block', fontFamily: font.display, fontSize: 15,
                  fontWeight: isActive(item.href) ? 600 : 400,
                  color: isActive(item.href) ? C.cream : C.creamMid,
                  textDecoration: 'none', padding: '8px 0 8px 16px',
                  borderBottom: `1px solid ${C.border}`,
                  background: isActive(item.href) ? wing.color + '10' : 'transparent',
                }}>{item.label}</Link>
              ))}
            </div>
          ))}
        </>
      )}

      <div style={{
        textAlign: 'center' as const, paddingTop: 24,
        fontFamily: font.mono, fontSize: 9, letterSpacing: '0.3em',
        color: 'rgba(245,241,235,0.1)', textTransform: 'uppercase' as const,
      }}>
        Cottage — Humble surface. Cathedral underneath.
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Main Nav
// ═══════════════════════════════════════════════════════

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wing = detectWing(pathname);
  const logoHref = getLogoHref(pathname, wing);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Landing page — no nav
  if (pathname === '/') return null;

  // Mount guard
  if (!mounted) return <div style={{ height: 60 }} />;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <>
      <style>{`
        @keyframes ddlDropIn {
          from { opacity:0; transform:translateX(-50%) translateY(-4px); }
          to { opacity:1; transform:translateX(-50%) translateY(0); }
        }
        @keyframes ddlSlideDown {
          from { opacity:0; transform:translateY(-8px); }
          to { opacity:1; transform:translateY(0); }
        }
        @media (max-width:900px) {
          .ddl-desk { display:none!important; }
          .ddl-mob-btn { display:flex!important; }
          .ddl-tagline { display:none!important; }
          .ddl-bar { height:52px!important; padding:0 16px!important; }
        }
        @media (min-width:901px) {
          .ddl-mob-btn { display:none!important; }
        }
      `}</style>

      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: `1px solid ${wing.color}15`,
        background: C.navyDeep,
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      }}>
        <div className="ddl-bar" style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 60, gap: 8,
        }}>
          {/* Logo — contextual back navigation */}
          <Link href={logoHref} style={{
            textDecoration: 'none', display: 'flex',
            alignItems: 'center', gap: 10, flexShrink: 0,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: `linear-gradient(135deg, ${wing.color}, ${wing.color}90)`,
              boxShadow: `0 2px 8px ${wing.color}40`,
              transition: 'all 0.3s',
            }} />
            <div>
              <div style={{
                fontFamily: font.display, fontSize: 14, fontWeight: 600,
                color: C.cream, lineHeight: 1.2,
              }}>
                Dropdown Logistics
              </div>
              <div className="ddl-tagline" style={{
                fontFamily: font.mono, fontSize: 10,
                color: wing.color + '80', letterSpacing: '0.04em',
                transition: 'color 0.3s',
              }}>
                {logoHref === '/' ? wing.tagline : '← ' + wing.name}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="ddl-desk" style={{
            display: 'flex', alignItems: 'center', gap: 2,
          }}>
            <WingSwitcher currentWing={wing} />

            {wing.groups.length > 0 && (
              <div style={{
                width: 1, height: 20,
                background: C.creamGhost, margin: '0 6px',
              }} />
            )}

            {wing.groups.map(g => (
              <Dropdown
                key={g.label}
                group={g}
                isActive={isActive}
                pathname={pathname}
                wingColor={wing.color}
              />
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="ddl-mob-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none',
              color: mobileOpen ? C.cream : 'rgba(245,241,235,0.6)',
              fontSize: 22, cursor: 'pointer', padding: 8,
              width: 40, height: 40, borderRadius: 6,
              transition: 'color 0.15s',
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <MobileMenu
            wing={wing}
            isActive={isActive}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </header>
    </>
  );
}
