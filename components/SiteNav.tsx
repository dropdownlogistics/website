'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pillars = [
  { href: '/ddl', label: 'DDL' },
  { href: '/dexos', label: 'DexOS' },
  { href: '/mindframe', label: 'MindFrame' },
];

const explore = [
  { href: '/registry', label: 'Registry' },
  { href: '/graph', label: 'Graph' },
  { href: '/forewords', label: 'Forewords' },
  { href: '/council', label: 'Council' },
  { href: '/memoir', label: 'Memoir' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/projects', label: 'Projects' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/about', label: 'About' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(7,16,28,0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: 'linear-gradient(135deg, #B23531, #97072F)',
            boxShadow: '0 2px 8px rgba(178,53,49,0.3)',
          }} />
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: '#F5F1EB',
              lineHeight: 1.2,
            }}>
              Dropdown Logistics
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: 'rgba(245,241,235,0.3)',
              letterSpacing: '0.04em',
            }}>
              Chaos → Structured → Automated
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          {/* Pillar links */}
          {pillars.map((l) => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: isActive(l.href) ? 600 : 400,
              color: isActive(l.href) ? '#F5F1EB' : 'rgba(245,241,235,0.5)',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: 6,
              background: isActive(l.href) ? 'rgba(255,255,255,0.06)' : 'transparent',
              transition: 'all 0.15s',
            }}>
              {l.label}
            </Link>
          ))}

          {/* Divider */}
          <div style={{
            width: 1,
            height: 20,
            background: 'rgba(255,255,255,0.08)',
            margin: '0 8px',
          }} />

          {/* Explore links - scrollable on smaller screens */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            overflowX: 'auto',
            maxWidth: 'calc(100vw - 600px)',
          }}>
            {explore.map((l) => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: isActive(l.href) ? 'rgba(245,241,235,0.7)' : 'rgba(245,241,235,0.3)',
                textDecoration: 'none',
                padding: '4px 8px',
                borderRadius: 4,
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}>
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'rgba(245,241,235,0.6)',
            fontSize: 20,
            cursor: 'pointer',
            padding: 8,
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          padding: '12px 24px 20px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(7,16,28,0.95)',
        }}>
          {[...pillars, ...explore].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              display: 'block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              color: isActive(l.href) ? '#F5F1EB' : 'rgba(245,241,235,0.5)',
              textDecoration: 'none',
              padding: '8px 0',
            }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
