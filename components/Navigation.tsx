'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/systems', label: 'Systems' },
  { href: '/standards', label: 'Standards' },
  { href: '/excelligence', label: 'Graph' },
  { href: '/forewords', label: 'Forewords' },
  { href: '/council', label: 'Council' },
  { href: '/memoir', label: 'Memoir' },
  { href: '/about', label: 'About' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 px-6 ${
        scrolled
          ? 'bg-ddl-navy/95 backdrop-blur-md border-b border-ddl-muted/15'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-[60px]">
        {/* Logo */}
        <Link href="/" className="font-heading text-sm font-semibold tracking-[0.15em] uppercase no-underline">
          <span className="text-ddl-cream">DROP DOWN </span>
          <span className="text-ddl-crimson">LOGISTICS</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-ddl-cream transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <span className={`block w-5 h-px bg-ddl-cream transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-ddl-cream transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-7 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-mono text-[0.7rem] uppercase tracking-[0.1em] no-underline transition-colors duration-200 relative pb-2 ${
                pathname === item.href
                  ? 'text-ddl-crimson'
                  : 'text-ddl-muted-light hover:text-ddl-cream'
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-ddl-crimson" />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-ddl-navy-light border-t border-ddl-muted/15 px-6 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block font-mono text-[0.75rem] uppercase tracking-[0.1em] no-underline py-3 border-b border-ddl-muted/10 ${
                pathname === item.href
                  ? 'text-ddl-crimson'
                  : 'text-ddl-muted-light'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
