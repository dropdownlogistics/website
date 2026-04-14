'use client';

// ============================================================
// KNOWLEDGE VAULT — DDL wing page
// The corpus + Dex Jr. local AI node.
// CottageHumble palette, teal accent (#2C7A7B).
// ============================================================

const C = {
  navy:     '#0D1B2A',
  card:     '#10202f',
  cream:    '#F5F1EB',
  creamMid: 'rgba(245,241,235,0.7)',
  creamDim: 'rgba(245,241,235,0.5)',
  steel:    '#6B7B8D',
  border:   'rgba(245,241,235,0.08)',
  teal:     '#2C7A7B',
  tealSoft: 'rgba(44,122,123,0.12)',
  tealEdge: 'rgba(44,122,123,0.35)',
  crimson:  '#B23531',
};

const font = {
  display: "'Space Grotesk', sans-serif",
  mono:    "'JetBrains Mono', monospace",
  body:    "'Source Serif 4', Georgia, serif",
};

const STATS = [
  { value: '540K+',     label: 'Chunks' },
  { value: '9',         label: 'Collections' },
  { value: '44',        label: 'Vault Folders' },
  { value: 'Seat 1010', label: 'Dex Jr.' },
];

const NAV_CARDS = [
  { n: '01', label: 'Corpus',    t: '518K+ chunks across 9 collections. Nightly auto-ingestion at 3am CT.' },
  { n: '02', label: 'Council',   t: '10 seats. 9 cloud models. 1 local (qwen2.5-coder:7b, RTX 3070).' },
  { n: '03', label: 'Method',    t: 'Chaos \u2192 Structured \u2192 Automated. The operating methodology.' },
  { n: '04', label: 'Products',  t: 'AuditForge, Excelligence, BlindSpot, Ledger, WorkBench.' },
  { n: '05', label: 'Commands',  t: 'The CLI surface for querying the vault.' },
  { n: '06', label: 'Decisions', t: 'ADRs and operator rulings. The decision log.' },
  { n: '07', label: 'Standards', t: '65 ratified standards across the DDL ecosystem.' },
];

export default function KnowledgeVaultPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.navy,
        color: C.cream,
        fontFamily: font.body,
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* subtle crimson grid background, matching other pages */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(178,53,49,0.028) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(178,53,49,0.028) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          pointerEvents: 'none',
        }}
      />

      {/* teal glow behind hero */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          left: '50%',
          top: -240,
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(44,122,123,0.10) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      {/* ============ HERO ============ */}
      <section
        style={{
          position: 'relative',
          maxWidth: 820,
          margin: '0 auto',
          padding: '80px 24px 48px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: font.mono,
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: C.teal,
            marginBottom: 18,
          }}
        >
          Dropdown Logistics · Knowledge Infrastructure
        </div>

        <h1
          style={{
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            margin: '0 0 16px',
            color: C.cream,
          }}
        >
          Knowledge <span style={{ color: C.teal }}>Vault</span>
        </h1>

        <p
          style={{
            fontFamily: font.body,
            fontStyle: 'italic',
            fontSize: '1.15rem',
            color: C.creamMid,
            margin: '0 0 22px',
            lineHeight: 1.5,
          }}
        >
          The front door for DDL institutional memory.
        </p>

        <p
          style={{
            fontFamily: font.body,
            fontSize: '1rem',
            color: C.creamDim,
            lineHeight: 1.65,
            maxWidth: 640,
            margin: '0 auto',
          }}
        >
          A governed retrieval system built on 540,000+ chunks of DDL output
          across 9 collections. When the operator forgets, Dex Jr. hasn&apos;t.
          That is the design. That is the point.
        </p>
      </section>

      {/* ============ CANON TERM ============ */}
      <section
        style={{
          position: 'relative',
          maxWidth: 820,
          margin: '0 auto 56px',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${C.tealSoft} 0%, transparent 60%)`,
            border: `1px solid ${C.tealEdge}`,
            borderLeft: `3px solid ${C.teal}`,
            borderRadius: 10,
            padding: '28px 28px 26px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'baseline',
              flexWrap: 'wrap',
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontFamily: font.mono,
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: C.teal,
              }}
            >
              Canon Term
            </div>
            <div
              style={{
                fontFamily: font.display,
                fontWeight: 700,
                fontSize: '1.15rem',
                color: C.cream,
                letterSpacing: '-0.01em',
              }}
            >
              AccidentalIntelligence
            </div>
            <div
              style={{
                fontFamily: font.mono,
                fontSize: 9,
                color: C.steel,
                letterSpacing: '0.1em',
                marginLeft: 'auto',
              }}
            >
              COINED 2026-03-15
            </div>
          </div>
          <p
            style={{
              fontFamily: font.body,
              fontSize: '0.98rem',
              color: C.creamMid,
              lineHeight: 1.7,
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            When a governed, hallucination-free system produces an output so
            unexpected it reads as insight. Sibling to AccidentalInsight.
            First observed in AuditForge live demo.
          </p>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section
        style={{
          position: 'relative',
          maxWidth: 820,
          margin: '0 auto 64px',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 12,
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            style={{
              background: C.tealSoft,
              border: `1px solid ${C.tealEdge}`,
              borderRadius: 8,
              padding: '22px 14px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: font.mono,
                fontSize: 22,
                fontWeight: 600,
                color: C.cream,
                marginBottom: 6,
                letterSpacing: '-0.01em',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: font.mono,
                fontSize: 9,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: C.steel,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* ============ SEVEN NAV CARDS ============ */}
      <section
        style={{
          position: 'relative',
          maxWidth: 960,
          margin: '0 auto 64px',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            fontFamily: font.mono,
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: C.teal,
            marginBottom: 20,
          }}
        >
          THE VAULT
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
          }}
        >
          {NAV_CARDS.map((card) => (
            <div
              key={card.n}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderLeft: `2px solid ${C.teal}`,
                borderRadius: 8,
                padding: '20px 22px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: 11,
                    color: C.teal,
                    letterSpacing: '0.05em',
                  }}
                >
                  {card.n}
                </span>
                <span
                  style={{
                    fontFamily: font.display,
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: C.cream,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {card.label}
                </span>
              </div>
              <p
                style={{
                  fontFamily: font.body,
                  fontSize: '0.88rem',
                  color: C.creamMid,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {card.t}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section
        style={{
          position: 'relative',
          maxWidth: 820,
          margin: '0 auto',
          padding: '0 24px 80px',
          textAlign: 'center',
        }}
      >
        <a
          href="https://dropdownlogistics.github.io/knowledge-vault"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '16px 40px',
            background: C.crimson,
            color: C.cream,
            fontFamily: font.display,
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: '0.03em',
            borderRadius: 8,
            textDecoration: 'none',
            border: '1px solid rgba(178,53,49,0.5)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#C94440';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = C.crimson;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Visit Knowledge Vault ↗
        </a>

        <p
          style={{
            fontFamily: font.mono,
            fontSize: 10,
            color: C.steel,
            letterSpacing: '0.12em',
            marginTop: 18,
          }}
        >
          CHAOS → STRUCTURED → AUTOMATED
        </p>
      </section>
    </div>
  );
}
