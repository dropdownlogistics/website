'use client';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonMid: 'rgba(178,53,49,0.35)',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.3)',
  amber: '#C49A3C', amberDim: 'rgba(196,154,60,0.15)', amberMid: 'rgba(196,154,60,0.4)',
  creamGhost: 'rgba(245,241,235,0.05)', border: 'rgba(245,241,235,0.06)',
  borderMed: 'rgba(245,241,235,0.12)',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const DC001 = {
  id: 'DC-0001',
  title: 'CanonPress Restructuring Through Meadows\u2019 Leverage Points',
  seat: 'Elias Mercer',
  seatNum: '1003',
  date: '2026-03-13',
  topic: 'How the shift from one series to four maps against Donella Meadows\u2019 hierarchy of system interventions.',
  status: 'PUBLISHED',
};

export default function DeepCutPage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <BackButton href="/canonpress" />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '72px 24px 100px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amber, letterSpacing: '0.15em', marginBottom: 16 }}>
            CANONPRESS Â· SERIES
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            DeepCut
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 16, fontStyle: 'italic', color: C.creamMid, margin: '0 0 12px', lineHeight: 1.65, maxWidth: 520 }}>
            Single-model deep analysis. One voice, full depth, no council process.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamDim, lineHeight: 1.7, maxWidth: 560 }}>
            The operator picks a topic and a seat. The model goes as deep as the material takes it. Published as-needed.
          </p>
        </div>

        {/* DC-001 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 16 }}>ENTRIES</div>
          <Link href="/canonpress/deepcut/dc-001" style={{ textDecoration: 'none' }}>
          <div style={{
            background: C.card, border: `1px solid rgba(196,154,60,0.3)`,
            borderLeft: `3px solid ${C.amber}`,
            borderRadius: 8, padding: '20px 24px',
            cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontFamily: font.mono, fontSize: 10, color: C.amber }}>{DC001.id}</span>
                <span style={{ fontFamily: font.mono, fontSize: 8, color: C.amber, border: `1px solid ${C.amber}`, borderRadius: 3, padding: '2px 6px', letterSpacing: '0.1em' }}>{DC001.status}</span>
              </div>
              <span style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim }}>{DC001.date}</span>
            </div>
            <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.cream, marginBottom: 6 }}>{DC001.title}</div>
            <div style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, marginBottom: 12 }}>{DC001.topic}</div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>
              <span style={{ color: C.amberMid }}>SEAT {DC001.seatNum}</span> â€” {DC001.seat}
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

