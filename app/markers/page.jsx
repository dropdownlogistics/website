'use client';
import BackButton from '@/components/BackButton';

const C = {
  navy:        '#0D1B2A',
  card:        '#10202f',
  cream:       '#F5F1EB',
  dim:         'rgba(245,241,235,0.72)',
  body:        'rgba(245,241,235,0.6)',
  muted:       'rgba(245,241,235,0.35)',
  border:      'rgba(245,241,235,0.08)',
  borderSoft:  'rgba(245,241,235,0.05)',
  crimson:     '#B23531',
  steel:       '#6B7B8D',
};

const SLabel = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
    {children}
  </div>
);

const SBody = ({ children, max = 680 }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: max, marginBottom: 28 }}>
    {children}
  </div>
);

const RefLine = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.1em', marginTop: 28 }}>
    {children}
  </div>
);

const markers = [
  { date: 'May 2025',       id: 'MRK-001', name: 'DexCell',      t: 'The ChatGPT thread where the dimensional methodology was first applied to Excel. The origin of the DDL lineage.' },
  { date: 'September 2025', id: 'MRK-002', name: 'MindFrame',    t: 'The first structured AI interaction framework. Chaos became repeatable for the first time.' },
  { date: 'October 2025',   id: 'MRK-003', name: 'DexOS',        t: 'The local AI rig came online. RTX 3070. Ollama. The infrastructure became physical.' },
  { date: 'October 2025',   id: 'MRK-004', name: 'DDL',          t: 'Dropdown Logistics named and scoped. The studio had an identity.' },
  { date: 'November 2025',  id: 'MRK-005', name: 'Council',      t: 'The ten-seat AI council ratified. Multi-model deliberation became the standard.' },
  { date: 'December 2025',  id: 'MRK-006', name: 'Assurance Map', t: "The first governed audit artifact. AuditForge's conceptual origin." },
  { date: 'January 2026',   id: 'MRK-007', name: 'Memoir',       t: 'Little to Know Experience began publishing. The operator became D.K. Hale.' },
  { date: 'March 2026',     id: 'MRK-008', name: 'The Month',    t: '26 days. AuditForge, Excelligence, BlindSpot, Ledger, WorkBench, KV, CanonPress \u2014 all shipped or substantially built. The system proved itself.' },
];

export default function MarkersPage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/" label="back" />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; ECOSYSTEM MARKERS
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.8rem, 7vw, 4.8rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 32, color: C.cream }}>
          The markers.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          Each one is a threshold. Not a milestone.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8 }}>
          A milestone is planned. A marker is recognized in retrospect &mdash; the moment when you realize the system crossed into something it wasn&rsquo;t before. These eight markers document those crossings. They are permanent. They do not update.
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — EIGHT MARKERS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>EIGHT MARKERS &middot; 2025&ndash;2026</SLabel>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
            {markers.map((m, i) => (
              <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '170px 130px 1fr', gap: 24, padding: '22px 0', borderTop: i === 0 ? `1px solid ${C.border}` : 'none', borderBottom: `1px solid ${C.border}`, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: C.steel, letterSpacing: '0.05em', paddingTop: 4 }}>{m.date}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: C.crimson, letterSpacing: '0.06em', paddingTop: 4 }}>{m.id}</div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: C.cream, letterSpacing: '-0.01em', marginBottom: 8 }}>{m.name}</div>
                  <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.95rem', color: C.dim, lineHeight: 1.65 }}>{m.t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — CLOSING */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>WHAT THEY ARE</SLabel>
        <SBody>
          Markers are not achievements. They are coordinates. Each one says: the system was here, and then it wasn&rsquo;t anymore. The gap between markers is where the work lives.
        </SBody>
        <RefLine>Eight markers. Twenty-six months. One operator.</RefLine>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            Ecosystem Markers &middot; Dropdown Logistics
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            Eight thresholds. Twenty-six months. One operator.
          </div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
