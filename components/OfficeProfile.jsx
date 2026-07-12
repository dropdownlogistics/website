// Shared office profile template — distinct from CouncilProfile
// Offices execute; council seats pressure-test. Different schema, same visual system.
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

function ReceiptRow({ k, v }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: 16, padding: '10px 0', borderBottom: `1px solid ${C.borderSoft}`, alignItems: 'baseline' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.1em' }}>{k}</div>
      <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.dim, lineHeight: 1.6 }}>{v}</div>
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

export default function OfficeProfile({ data, peerData }) {
  const {
    id, name, title, lane, platform, accent, domain,
    photo, guiding,
    contract,   // defaultMode, when, style, authority
    calibration,// strengths, failures, renewal
    reference,  // analogs (array of {type, name, parallel})
    relationship,// peer, routing
  } = data;

  const accentLine = accent + '35';
  const firstName = name.split(' ')[0];

  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/ddl/offices" label="offices" />

      {/* SECTION 1 — PROFILE HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, alignItems: 'start' }}>
          <div style={{ maxWidth: 280 }}>
            <img
              src={photo}
              alt={name}
              style={{ width: 280, height: 280, objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: '50%', border: `2px solid ${accent}` }}
            />
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: accent, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16 }}>
              DDL OPERATIONAL OFFICE &middot; {id}
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 10 }}>
              {name}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: C.steel, letterSpacing: '0.04em', marginBottom: 6 }}>
              {platform}
            </div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.15rem', color: C.cream, lineHeight: 1.5, marginBottom: 16, maxWidth: 560 }}>
              {title}
            </div>
            <div style={{ display: 'inline-block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: accent, letterSpacing: '0.14em', padding: '5px 12px', border: `1px solid ${accentLine}`, borderRadius: 20, marginBottom: 12 }}>
              {lane}
            </div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.body, lineHeight: 1.6, maxWidth: 520 }}>
              {domain}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — OPERATING LANE */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel color={accent}>HOW {firstName.toUpperCase()} WORKS</SLabel>
          <div style={{ maxWidth: 700 }}>
            <ReceiptRow k="OPERATING MODE" v={contract.defaultMode} />
            <ReceiptRow k="WHEN TO BRING IN" v={contract.when} />
            <ReceiptRow k="WORKING STYLE" v={contract.style} />
            <ReceiptRow k="AUTHORITY CEILING" v={contract.authority} />
          </div>
        </div>
      </div>

      {/* SECTION 3 — CALIBRATION */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel color={accent}>OBSERVED IN THE FIELD</SLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginTop: 24 }}>
          <Tile label="Observed Strengths" items={calibration.strengths} accent={accent} />
          <Tile label="Failure Modes" items={calibration.failures} accent={accent} />
          <Tile label="Renewal Triggers" items={calibration.renewal} accent={accent} />
        </div>
      </div>

      {/* SECTION 4 — REFERENCE FRAME */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel color={accent}>REFERENCE FRAME</SLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginTop: 24 }}>
            {reference.map((r, i) => (
              <div key={i} style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 20px' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: accent, letterSpacing: '0.1em', marginBottom: 8 }}>{r.type}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>{r.name}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.body, lineHeight: 1.55 }}>{r.parallel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5 — PEER RELATIONSHIP */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel color={accent}>PEER RELATIONSHIP &amp; ROUTING</SLabel>
        <div style={{ maxWidth: 700 }}>
          <ReceiptRow k="PEER OFFICE" v={relationship.peer} />
          <ReceiptRow k="ROUTING RULE" v={relationship.routing} />
          <ReceiptRow k="REPORTS TO" v={relationship.reports} />
        </div>

        {peerData && (
          <div style={{ marginTop: 32 }}>
            <Link href={`/ddl/offices/${peerData.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${peerData.accent}`,
                borderRadius: 6, padding: '20px 22px', display: 'flex', gap: 16, alignItems: 'center',
                maxWidth: 480, transition: 'transform 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
              >
                <img
                  src={peerData.photo}
                  alt={peerData.name}
                  style={{ width: 56, height: 56, objectFit: 'cover', objectPosition: 'top', borderRadius: '50%', border: `2px solid ${peerData.accent}`, flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: peerData.accent, letterSpacing: '0.12em', marginBottom: 4 }}>PEER OFFICE</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 2 }}>{peerData.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.04em' }}>{peerData.title} &rarr;</div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* SECTION 6 — GUIDING PRINCIPLE */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel color={accent}>GUIDING PRINCIPLE</SLabel>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)', color: C.cream, lineHeight: 1.45, borderLeft: `2px solid ${accent}`, paddingLeft: 22, maxWidth: 680 }}>
            &ldquo;{guiding}&rdquo;
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            {name} &middot; {id}
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            DDL Operational Office &middot; Dropdown Logistics
          </div>
        </div>
        <Link href="/ddl/offices" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
          /ddl/offices
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
          div[style*="grid-template-columns: 190px 1fr"] {
            grid-template-columns: 140px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
