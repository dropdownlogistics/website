'use client';
import { usePathname } from 'next/navigation';

export default function LayoutFooter() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  return (
    <footer style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 32px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12, rowGap: 8,
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(245,241,235,0.25)' }}>
          {'© '}{new Date().getFullYear()}{' Dropdown Logistics'}
        </span>
        <span style={{ fontFamily: "'Source Serif 4', serif", fontSize: 12, fontStyle: 'italic', color: 'rgba(245,241,235,0.15)' }}>
          CottageHumble surface. Cathedral underneath.
        </span>
        <a href="/sitemap" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(245,241,235,0.25)', textDecoration: 'none', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
          All Routes {'\u2192'}
        </a>
      </div>
    </footer>
  );
}
