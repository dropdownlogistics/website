'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'REGISTRY', href: '/registry' },
  { label: 'GRAPH', href: '/excelligence' },
  { label: 'FOREWORDS', href: '/forewords' },
  { label: 'COUNCIL', href: '/council' },
  { label: 'MEMOIR', href: '/memoir' },
  { label: 'METHODOLOGY', href: '/methodology' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'ANALYTICS', href: '/analytics' },
  { label: 'ABOUT', href: '/about' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 60,
      background: 'rgba(15, 26, 46, 0.92)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(178, 53, 49, 0.2)',
      display: 'flex', alignItems: 'center', padding: '0 24px',
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <Link href="/" style={{ fontWeight: 700, fontSize: 14, color: '#F5F1EB', textDecoration: 'none', letterSpacing: 2, marginRight: 32 }}>
        DDL
      </Link>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', gap: 4, flex: 1, overflowX: 'auto' }} className="hide-mobile">
        {navItems.filter(i => i.label !== 'HOME').map(item => (
          <Link key={item.href} href={item.href} style={{
            fontSize: 11, letterSpacing: 1.5, padding: '8px 12px', textDecoration: 'none', whiteSpace: 'nowrap',
            color: isActive(item.href) ? '#F5F1EB' : '#8A8E94',
            borderBottom: isActive(item.href) ? '2px solid #B23531' : '2px solid transparent',
            transition: 'all 0.3s',
          }}>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <button onClick={() => setIsOpen(!isOpen)} className="show-mobile" style={{
        marginLeft: 'auto', background: 'none', border: 'none', color: '#F5F1EB',
        fontSize: 24, cursor: 'pointer', padding: 8, display: 'none',
      }}>
        {isOpen ? '\u2715' : '\u2630'}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 26, 46, 0.98)', backdropFilter: 'blur(20px)',
          padding: '24px', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 99,
        }}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} style={{
              fontSize: 14, letterSpacing: 2, padding: '12px 16px', textDecoration: 'none',
              color: isActive(item.href) ? '#F5F1EB' : '#8A8E94',
              borderLeft: isActive(item.href) ? '3px solid #B23531' : '3px solid transparent',
            }}>
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
