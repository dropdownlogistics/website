'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PRODUCTS = [
  { label: 'AuditForge', href: '/auditforge', external: false, color: '#B23531' },
  { label: 'Ledger', href: '/ledger', external: false, color: '#C49A3C' },
  { label: 'BlindSpot', href: '/blindspot', external: false, color: '#22C55E' },
  { label: 'Excelligence', href: '/excelligence', external: false, color: '#D4A843' },
  { label: 'CanonPress', href: '/canonpress', external: false, color: '#B23531' },
  { label: 'Knowledge Vault', href: '/knowledge-vault', external: false, color: '#2C7A7B' },
  { label: 'WorkBench', href: '/workbench', external: false, color: '#B23531' },
  { label: 'PositionBook', href: '/positionbook', external: false, color: '#4A9E6B' },
];

const DDL_LINKS = [
  { label: 'Governance', href: '/governance' },
  { label: 'System Stack', href: '/system-stack' },
  { label: 'Charter', href: '/ddl/charter' },
  { label: 'DexVerse', href: '/dexverse' },
  { label: 'MDN Tool', href: '/tools/mdn' },
  { label: 'Brand', href: '/brand' },
  { label: 'Legacy', href: '/legacy' },
  { label: 'llms.txt', href: '/llms.txt' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [ddlOpen, setDdlOpen] = useState(false);

  return (
    <>
      <style>{`
        .ddl-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          height: 52px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          background: rgba(13,27,42,0.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(245,241,235,0.06);
          gap: 0;
        }
        .ddl-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
          margin-right: 24px;
        }
        .ddl-logo-mark {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1.5px solid #B23531;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 9px;
          color: #B23531;
          letter-spacing: -0.5px;
          flex-shrink: 0;
        }
        .ddl-logo-text { display: flex; flex-direction: column; gap: 1px; }
        .ddl-logo-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #F5F1EB;
          letter-spacing: -0.3px;
          line-height: 1;
        }
        .ddl-logo-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          color: #6B7B8D;
          letter-spacing: 0.04em;
          line-height: 1;
        }
        .ddl-desktop {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
        }
        .ddl-nav-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(245,241,235,0.6);
          background: transparent;
          border: none;
          padding: 6px 10px;
          cursor: pointer;
          letter-spacing: 0.04em;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
          text-decoration: none;
        }
        .ddl-nav-btn:hover, .ddl-nav-btn.active {
          color: #F5F1EB;
          background: rgba(245,241,235,0.06);
        }
        .ddl-nav-btn .chevron {
          font-size: 8px;
          opacity: 0.5;
          transition: transform 0.15s;
        }
        .ddl-nav-btn.open .chevron { transform: rotate(180deg); }

        .ddl-dropdown {
          position: absolute;
          top: 52px;
          background: #10202F;
          border: 1px solid rgba(245,241,235,0.08);
          border-radius: 8px;
          padding: 6px;
          min-width: 180px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
          z-index: 200;
        }
        .ddl-dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(245,241,235,0.7);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          cursor: pointer;
        }
        .ddl-dropdown-item:hover {
          background: rgba(245,241,235,0.06);
          color: #F5F1EB;
        }
        .ddl-dropdown-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .ddl-dropdown-ext {
          margin-left: auto;
          font-size: 9px;
          opacity: 0.3;
        }

        .ddl-nav-sep {
          width: 1px;
          height: 16px;
          background: rgba(245,241,235,0.08);
          margin: 0 8px;
          flex-shrink: 0;
        }

        .ddl-search-wrap {
          display: flex;
          align-items: center;
          margin-left: auto;
          flex-shrink: 0;
        }
        .ddl-search-input {
          background: rgba(245,241,235,0.05);
          border: 1px solid rgba(245,241,235,0.08);
          border-radius: 6px;
          padding: 5px 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(245,241,235,0.4);
          width: 140px;
          outline: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ddl-search-input:hover {
          border-color: rgba(245,241,235,0.15);
          color: rgba(245,241,235,0.6);
        }
        .ddl-mob-btn {
          display: none;
          background: transparent;
          border: 1px solid rgba(245,241,235,0.12);
          color: #F5F1EB;
          width: 32px;
          height: 32px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          flex-shrink: 0;
        }
        .ddl-mobile-menu {
          position: fixed;
          top: 52px;
          left: 0;
          right: 0;
          background: #10202F;
          border-bottom: 1px solid rgba(245,241,235,0.08);
          padding: 16px 24px 24px;
          z-index: 99;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ddl-mob-section {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: rgba(245,241,235,0.3);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 10px 0 6px;
          border-top: 1px solid rgba(245,241,235,0.06);
          margin-top: 4px;
        }
        .ddl-mob-section:first-child { border-top: none; margin-top: 0; }
        .ddl-mob-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: rgba(245,241,235,0.7);
          text-decoration: none;
          transition: color 0.15s;
        }
        .ddl-mob-link:hover { color: #F5F1EB; }

        @media (max-width: 768px) {
          .ddl-desktop { display: none; }
          .ddl-search-wrap { display: none; }
          .ddl-mob-btn { display: flex; margin-left: auto; }
        }
        @media (min-width: 769px) {
          .ddl-mobile-menu { display: none; }
        }
      `}</style>

      <nav className="ddl-nav">
        {/* Logo */}
        <Link href="/" className="ddl-logo">
          <div className="ddl-logo-mark">DD</div>
          <div className="ddl-logo-text">
            <span className="ddl-logo-name">Dropdown Logistics</span>
            <span className="ddl-logo-sub">Chaos {'->'} Structured {'->'} Automated</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="ddl-desktop">

          {/* Products dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className={`ddl-nav-btn ${productsOpen ? 'open' : ''}`}
              onClick={() => { setProductsOpen(!productsOpen); setDdlOpen(false); }}
            >
              Products <span className="chevron">&#9660;</span>
            </button>
            {productsOpen && (
              <div className="ddl-dropdown" style={{ left: 0 }}>
                {PRODUCTS.map(p => (
                  p.external ? (
                    <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="ddl-dropdown-item">
                      <div className="ddl-dropdown-dot" style={{ background: p.color }}></div>
                      {p.label}
                      <span className="ddl-dropdown-ext">&#8599;</span>
                    </a>
                  ) : (
                    <Link key={p.href} href={p.href} className="ddl-dropdown-item" onClick={() => setProductsOpen(false)}>
                      <div className="ddl-dropdown-dot" style={{ background: p.color }}></div>
                      {p.label}
                    </Link>
                  )
                ))}
              </div>
            )}
          </div>

          {/* DDL dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className={`ddl-nav-btn ${ddlOpen ? 'open' : ''}`}
              onClick={() => { setDdlOpen(!ddlOpen); setProductsOpen(false); }}
            >
              DDL <span className="chevron">&#9660;</span>
            </button>
            {ddlOpen && (
              <div className="ddl-dropdown" style={{ left: 0 }}>
                {DDL_LINKS.map(l => (
                  <Link key={l.href} href={l.href} className="ddl-dropdown-item" onClick={() => setDdlOpen(false)}>
                    <div className="ddl-dropdown-dot" style={{ background: '#B23531' }}></div>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="ddl-nav-sep" />

          {/* Direct links */}
          <a href="https://auditforge.dev" target="_blank" rel="noopener noreferrer" className="ddl-nav-btn">
            AuditForge &#8599;
          </a>
          <a href="https://excelligence.dev" target="_blank" rel="noopener noreferrer" className="ddl-nav-btn">
            Excelligence &#8599;
          </a>

        </div>

        {/* Search */}
        <div className="ddl-search-wrap">
          <input
            className="ddl-search-input"
            type="text"
            placeholder="Search..."
            readOnly
            onFocus={() => {
              window.dispatchEvent(new Event('ddl-open-search'));
              (document.activeElement as HTMLElement).blur();
            }}
          />
        </div>

        {/* Mobile toggle */}
        <button className="ddl-mob-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? '\u2715' : '\u2630'}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="ddl-mobile-menu">
          <div className="ddl-mob-section">Products</div>
          {PRODUCTS.map(p => (
            p.external ? (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="ddl-mob-link">
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, flexShrink: 0 }}></div>
                {p.label} &#8599;
              </a>
            ) : (
              <Link key={p.href} href={p.href} className="ddl-mob-link" onClick={() => setMobileOpen(false)}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, flexShrink: 0 }}></div>
                {p.label}
              </Link>
            )
          ))}
          <div className="ddl-mob-section">DDL</div>
          {DDL_LINKS.map(l => (
            <Link key={l.href} href={l.href} className="ddl-mob-link" onClick={() => setMobileOpen(false)}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#B23531', flexShrink: 0 }}></div>
              {l.label}
            </Link>
          ))}
        </div>
      )}

      {/* Close dropdowns on outside click */}
      {(productsOpen || ddlOpen) && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 99 }}
          onClick={() => { setProductsOpen(false); setDdlOpen(false); }}
        />
      )}
    </>
  );
}
