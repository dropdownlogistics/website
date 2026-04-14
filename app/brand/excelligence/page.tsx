'use client';
import Link from 'next/link';

export default function ExcelligenceBrandKit() {
  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A' }}>
      <nav style={{ height: 36, background: '#0D1B2A', borderBottom: '1px solid rgba(245,241,235,0.08)', display: 'flex', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#F5F1EB', textDecoration: 'none', padding: '0 16px' }}>
          ← Back
        </Link>
      </nav>
      <iframe src="/brand/Excelligence-BrandKit-v1_0.html" style={{ display: 'block', width: '100%', height: 'calc(100vh - 36px)', border: 'none' }} />
    </div>
  );
}
