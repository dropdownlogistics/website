'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink { href: string; label: string; }
interface NavGroup { label: string; items: NavLink[]; }

const pillars: NavLink[] = [
  { href: '/ddl', label: 'DDL' },
  { href: '/dexos', label: 'DexOS' },
  { href: '/mindframe', label: 'MindFrame' },
];

const groups: NavGroup[] = [
  {
    label: 'Work',
    items: [
      { href: '/projects', label: 'Projects' },
      { href: '/blindspot', label: 'BlindSpot' },
      { href: '/council', label: 'Council' },
      { href: '/excelligence', label: 'Graph' },
    ],
  },
  {
    label: 'Knowledge',
    items: [
      { href: '/registry', label: 'Registry' },
      { href: '/standards', label: 'Standards' },
      { href: '/systems', label: 'Systems' },
      { href: '/methodology', label: 'Methodology' },
      { href: '/analytics', label: 'Analytics' },
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
];

/* ─── DROPDOWN ─── */
function Dropdown({ group, isActive, pathname }: { group: NavGroup; isActive: (h: string) => boolean; pathname: string | null }) {
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
              background: isActive(item.href) ? 'rgba(178,53,49,0.12)' : 'transparent',
              transition: 'all 0.12s', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { if (!isActive(item.href)) { (e.currentTarget).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget).style.color = 'rgba(245,241,235,0.8)'; }}}
              onMouseLeave={e => { if (!isActive(item.href)) { (e.currentTarget).style.background = 'transparent'; (e.currentTarget).style.color = 'rgba(245,241,235,0.5)'; }}}
            >{item.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── MAIN NAV ─── */
export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

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
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(7,16,28,0.88)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      }}>
        <div className="ddl-bar" style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60,
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #B23531, #97072F)', boxShadow: '0 2px 8px rgba(178,53,49,0.3)' }} />
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#F5F1EB', lineHeight: 1.2 }}>Dropdown Logistics</div>
              <div className="ddl-tagline" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(245,241,235,0.3)', letterSpacing: '0.04em' }}>Chaos → Structured → Automated</div>
            </div>
          </Link>

          {/* Desktop */}
          <nav className="ddl-desk" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {pillars.map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
                fontWeight: isActive(l.href) ? 600 : 400,
                color: isActive(l.href) ? '#F5F1EB' : 'rgba(245,241,235,0.5)',
                textDecoration: 'none', padding: '6px 12px', borderRadius: 6,
                background: isActive(l.href) ? 'rgba(255,255,255,0.06)' : 'transparent',
                transition: 'all 0.15s',
              }}>{l.label}</Link>
            ))}
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)', margin: '0 8px' }} />
            {groups.map(g => <Dropdown key={g.label} group={g} isActive={isActive} pathname={pathname} />)}
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
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B23531', marginBottom: 10 }}>Pillars</div>
              {pillars.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                  display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: 16,
                  fontWeight: isActive(l.href) ? 600 : 400,
                  color: isActive(l.href) ? '#F5F1EB' : 'rgba(245,241,235,0.5)',
                  textDecoration: 'none', padding: '10px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>{l.label}</Link>
              ))}
            </div>
            {groups.map(g => (
              <div key={g.label} style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B23531', marginBottom: 10 }}>{g.label}</div>
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
              Chaos → Structured → Automated
            </div>
          </div>
        )}
      </header>
    </>
  );
}
