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
  { value: '540K+',    label: 'Chunks' },
  { value: '9',        label: 'Collections' },
  { value: 'Seat 1010', label: 'Dex Jr.' },
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
          The corpus remembers everything.
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

      {/* ============ STATS ============ */}
      <section
        style={{
          position: 'relative',
          maxWidth: 820,
          margin: '0 auto 64px',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
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

      {/* ============ TWO SECTIONS ============ */}
      <section
        style={{
          position: 'relative',
          maxWidth: 820,
          margin: '0 auto 64px',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 16,
        }}
      >
        {/* What It Is */}
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: '28px 28px 26px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: C.teal,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              fontFamily: font.mono,
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C.teal,
              marginBottom: 14,
            }}
          >
            What It Is
          </div>
          <p
            style={{
              fontFamily: font.body,
              fontSize: '0.98rem',
              color: C.creamMid,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Not a chatbot. A governed retrieval system built on the
            operator&apos;s own output — canon documents, council reviews, code
            artifacts, and archived threads. ChromaDB vector store. Nightly
            auto-ingestion at 3am CT. GitHub-backed workflow.
          </p>
        </div>

        {/* Dex Jr. */}
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: '28px 28px 26px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: C.teal,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              fontFamily: font.mono,
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C.teal,
              marginBottom: 14,
            }}
          >
            Dex Jr.
          </div>
          <p
            style={{
              fontFamily: font.body,
              fontSize: '0.98rem',
              color: C.creamMid,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Local AI node running qwen2.5-coder:7b on RTX 3070. Seat 1010 in
            the DDL council. Answers questions from the corpus through the
            MindFrame interface. The rig stays awake.
          </p>
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
