// Shared council seat profile template
'use client';
import Link from 'next/link';
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
  steel:       '#6B7B8D',
  steelLine:   'rgba(107,123,141,0.35)',
};

function SLabel({ children, color }) {
  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: color || C.steel, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
      {children}
    </div>
  );
}

function Tile({ label, items, accent }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${accent}`, borderRadius: 8, padding: '22px 20px' }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: accent, marginBottom: 12 }}>{label}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.dim, lineHeight: 1.55, padding: '4px 0', borderBottom: i < items.length - 1 ? `1px solid ${C.borderSoft}` : 'none' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReceiptRow({ k, v }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, padding: '10px 0', borderBottom: `1px solid ${C.borderSoft}`, alignItems: 'baseline' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.1em' }}>{k}</div>
      <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.dim, lineHeight: 1.55 }}>{v}</div>
    </div>
  );
}

export default function CouncilProfile({ data }) {
  const { seat, name, model, accent, domain, lotr, lotrDesc, photo, callout,
    contract, calibration, record, reference, routing } = data;

  const accentLine = accent + '35';
  const firstName = name.split(' ')[0];

  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/ddl/council" label="council" />

      {/* SECTION 1 — PROFILE HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, alignItems: 'start' }}>
          <div style={{ maxWidth: 280 }}>
            <img
              src={photo}
              alt={name}
              style={{ width: 280, height: 280, objectFit: 'cover', display: 'block', borderRadius: '50%', border: `2px solid ${accent}` }}
            />
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: accent, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16 }}>
              DDL ADVISORY COUNCIL &middot; SEAT {seat}
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 10 }}>
              {name}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: C.steel, letterSpacing: '0.04em', marginBottom: 16 }}>
              {model}
            </div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.15rem', color: C.cream, lineHeight: 1.5, marginBottom: 16, maxWidth: 560 }}>
              {domain}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.muted, letterSpacing: '0.04em', marginBottom: 12 }}>
              LOTR: {lotr}
            </div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.body, lineHeight: 1.6, maxWidth: 520 }}>
              {lotrDesc}
            </div>
          </div>
        </div>

        {callout && (
          <div style={{ marginTop: 32, background: C.card, border: `1px solid ${accentLine}`, borderLeft: `3px solid ${accent}`, borderRadius: 6, padding: '18px 22px', maxWidth: 700 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: accent, letterSpacing: '0.12em', marginBottom: 8 }}>NOTE</div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.dim, lineHeight: 1.6 }}>{callout}</div>
          </div>
        )}
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — OPERATIONAL CONTRACT */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel color={accent}>HOW {firstName.toUpperCase()} WORKS</SLabel>

          <div style={{ maxWidth: 700 }}>
            <ReceiptRow k="DEFAULT MODE" v={contract.defaultMode} />
            <ReceiptRow k="ENTRY CONDITIONS" v={contract.entry} />
            <ReceiptRow k="EXECUTION PATTERN" v={contract.execution} />
            <ReceiptRow k="OUTPUT" v={contract.output} />
          </div>
        </div>
      </div>

      {/* SECTION 3 — CALIBRATION */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel color={accent}>OBSERVED IN THE FIELD</SLabel>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginTop: 24 }}>
          <Tile label="Observed Strengths" items={calibration.strengths} accent={accent} />
          <Tile label="Failure Modes" items={calibration.failures} accent={accent} />
          <Tile label="Drift Signals" items={calibration.drift} accent={accent} />
          <Tile label="Recovery" items={calibration.recovery} accent={accent} />
        </div>
      </div>

      {/* SECTION 4 — COUNCIL RECORD */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel color={accent}>COUNCIL RECORD</SLabel>

          <div style={{ maxWidth: 700, marginBottom: 32 }}>
            <ReceiptRow k="VOTING TENDENCY" v={record.voting} />
            {record.notable.map((n, i) => (
              <ReceiptRow key={i} k={i === 0 ? 'NOTABLE' : ''} v={n} />
            ))}
          </div>

          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', color: C.cream, lineHeight: 1.45, borderLeft: `2px solid ${accent}`, paddingLeft: 22, maxWidth: 640 }}>
            &ldquo;{record.quote}&rdquo;
          </div>
        </div>
      </div>

      {/* SECTION 5 — REFERENCE FRAME */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel color={accent}>REFERENCE FRAME</SLabel>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginTop: 24 }}>
          {reference.map((r, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 20px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: accent, letterSpacing: '0.1em', marginBottom: 8 }}>{r.type}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>{r.name}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.body, lineHeight: 1.55 }}>{r.parallel}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${accent}`, borderRadius: 6, padding: '18px 22px', maxWidth: 700 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: accent, letterSpacing: '0.1em', marginBottom: 8 }}>LOTR MAPPING</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>{lotr}</div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: C.dim, lineHeight: 1.55 }}>{lotrDesc}</div>
        </div>
      </div>

      {/* SECTION 6 — ROUTING */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel color={accent}>WHEN TO ACTIVATE</SLabel>

          <div style={{ maxWidth: 700 }}>
            <ReceiptRow k="BEST PAIRED WITH" v={routing.best} />
            <ReceiptRow k="AVOID PAIRING" v={routing.avoid} />
            <ReceiptRow k="ESCALATION PATH" v={routing.escalation} />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            {name} &middot; Seat {seat}
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            DDL Advisory Council &middot; Dropdown Logistics
          </div>
        </div>
        <Link href="/ddl/council" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
          /ddl/council
        </Link>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: auto 1fr"] {
            display: flex !important;
            flex-direction: column !important;
          }
          div[style*="max-width: 280px"] {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
