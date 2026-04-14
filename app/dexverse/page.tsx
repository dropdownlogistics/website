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
  violet:      '#8a6cc9',
  violetDim:   'rgba(138,108,201,0.12)',
  violetLine:  'rgba(138,108,201,0.35)',
  steel:       '#6B7B8D',
  steelLine:   'rgba(107,123,141,0.35)',
};

const SLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.violet, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
    {children}
  </div>
);

const SHead = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18, ...style }}>
    {children}
  </div>
);

const SBody = ({ children, max = 680 }: { children: React.ReactNode; max?: number }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.02rem', color: C.dim, lineHeight: 1.75, maxWidth: max, marginBottom: 28 }}>
    {children}
  </div>
);

const heroStats = [
  { v: '540K+',     l: 'Corpus Chunks' },
  { v: '9',         l: 'Collections' },
  { v: 'RTX 3070',  l: 'The Rig' },
];

const dexCards = [
  { label: 'Model',   t: 'qwen2.5-coder:7b — Ollama-managed, context-optimized for code and structured data.' },
  { label: 'Store',   t: 'ChromaDB — Vector database. 9 collections. 540K+ chunks. Cosine similarity retrieval.' },
  { label: 'Cadence', t: 'Nightly auto-ingestion at 3am CT. GitHub-backed workflow. The corpus stays current.' },
];

const collections = [
  { name: 'dex_canon',       t: 'Ratified DDL standards and canon documents.' },
  { name: 'ddl_archive',     t: 'Archived threads and session history.' },
  { name: 'dex_code',        t: 'Code artifacts and technical documentation.' },
  { name: 'ext_creator',     t: 'External creator content and references.' },
  { name: 'council_reviews', t: 'All council review documents.' },
  { name: 'manic_audio',     t: '88 transcribed audio recordings from 2022-2023.' },
  { name: 'icloud_screens',  t: '1,443+ OCR-processed DirectScreens.' },
  { name: 'memoir',          t: 'LTKE memoir drafts and BTS entries.' },
  { name: 'standards',       t: '65 ratified DDL standards.' },
];

const hardware = [
  { k: 'GPU',          v: 'NVIDIA RTX 3070' },
  { k: 'RUNTIME',      v: 'Ollama' },
  { k: 'MODEL',        v: 'qwen2.5-coder:7b' },
  { k: 'VECTOR DB',    v: 'ChromaDB' },
  { k: 'INGESTION',    v: 'Nightly \u00b7 3am CT' },
  { k: 'INTERFACE',    v: 'MindFrame' },
  { k: 'COUNCIL SEAT', v: '1010' },
];

export default function DexVerseWing() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/" label="back" />

      {/* SECTION 1 — HERO */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '88px 24px 72px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.violet, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 28 }}>
          DROPDOWN LOGISTICS &middot; LOCAL AI LAYER
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 32 }}>
          <span style={{ color: C.cream }}>Dex</span><span style={{ color: C.violet }}>Verse</span>
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '1.3rem', color: C.cream, lineHeight: 1.5, maxWidth: 720, marginBottom: 28 }}>
          The rig stays awake.
        </div>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: C.dim, maxWidth: 680, lineHeight: 1.8, marginBottom: 40 }}>
          DexVerse is the local AI infrastructure underneath DDL. One rig. One model. 540K+ chunks of institutional memory. When the cloud models forget, Dex Jr. hasn&rsquo;t. That is the architecture. That is the point.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {heroStats.map((s) => (
            <div key={s.l} style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.violet}`, borderRadius: 6, padding: '22px 22px' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.8rem', color: C.cream, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 }}>{s.v}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: C.border, maxWidth: 980, margin: '0 auto' }} />

      {/* SECTION 2 — DEX JR. */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>SEAT 1010</SLabel>
          <SHead>The local council seat.</SHead>
          <SBody>
            Dex Jr. is not a chatbot. It is a governed retrieval system running on the operator&rsquo;s own hardware. qwen2.5-coder:7b on an RTX 3070. ChromaDB vector store. Nightly ingestion at 3am CT. It holds the DDL corpus and answers questions from it &mdash; no hallucination risk, no external dependency, no data leaving the building.
          </SBody>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 24 }}>
            {dexCards.map((d) => (
              <div key={d.label} style={{ background: C.navy, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.violet}`, borderRadius: 8, padding: '24px 24px' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.violet, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>{d.label}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: C.dim, lineHeight: 1.65 }}>{d.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — CORPUS */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>NINE COLLECTIONS</SLabel>
        <SHead>What it knows.</SHead>
        <SBody>
          The corpus is the institutional memory of DDL. Every canon document, every council review, every code artifact, every archived thread &mdash; ingested, chunked, and indexed. The collections are the architecture.
        </SBody>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginTop: 24 }}>
          {collections.map((c) => (
            <div key={c.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `2px solid ${C.violet}`, borderRadius: 6, padding: '18px 20px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: C.cream, letterSpacing: '0.02em', marginBottom: 8 }}>{c.name}</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.body, lineHeight: 1.6 }}>{c.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4 — RIG */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>HARDWARE</SLabel>
          <SHead>Local means local.</SHead>
          <SBody>
            DexVerse runs on dedicated hardware in the operator&rsquo;s home. No cloud dependency. No API cost. No data leaving the building. The rig is the infrastructure.
          </SBody>

          <div style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 6, padding: '24px 28px', marginTop: 16, maxWidth: 640 }}>
            {hardware.map((row, i) => (
              <div key={row.k} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.borderSoft}`, alignItems: 'baseline' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.steel, letterSpacing: '0.14em' }}>{row.k}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: C.cream, letterSpacing: '0.02em' }}>{row.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5 — CLOSING */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
        <SLabel>THE POINT</SLabel>

        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 2.6vw, 1.85rem)', color: C.cream, lineHeight: 1.45, borderLeft: `2px solid ${C.violet}`, paddingLeft: 22, marginTop: 12, marginBottom: 32, maxWidth: 760 }}>
          &ldquo;If it ever looked like it was reasoning beyond the data &mdash; that wouldn&rsquo;t be AI. That would be Accidental Intelligence.&rdquo;
        </div>

        <SBody>
          DexVerse is not a product. It is infrastructure. It exists so the system doesn&rsquo;t forget. Every council review, every build session, every canon term &mdash; indexed, retrievable, permanent.
        </SBody>

        <Link href="/knowledge-vault"
              style={{ display: 'inline-block', background: 'transparent', color: C.violet, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.9rem', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', border: `1px solid ${C.violetLine}` }}>
          Visit Knowledge Vault &rarr;
        </Link>
      </div>

      {/* WHAT'S INSIDE */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '80px 24px' }}>
          <SLabel>WHAT&rsquo;S INSIDE</SLabel>
          <SHead>DexVerse sub-routes.</SHead>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginTop: 24 }}>
            {[
              { name: 'Dex Jr.',         href: '/dexverse/dex-jr',     t: 'Profile, commands, corpus state, Modelfile history, calibration records. Seat 1010 in full.' },
              { name: 'Origin',          href: '/dexverse/origin',     t: 'How the system was built. Four eras from first prompt to governed infrastructure.' },
              { name: 'NeuralHowlround', href: '/dexverse/howlround',  t: 'Canon term. Recursive prompting producing aesthetic depth without structural grounding.' },
              { name: 'LOTR',            href: '/dexverse/lotr',       t: 'Council deep-dive. Narrative architecture through a DDL lens.' },
              { name: 'Build Log',       href: '/dexverse/build-log',  t: 'What was built, when, and why. The rig stays awake.' },
            ].map((s) => (
              <Link key={s.href} href={s.href} style={{
                display: 'block', background: C.navy, border: `1px solid ${C.border}`,
                borderLeft: `2px solid ${C.violet}`, borderRadius: 6, padding: '20px 22px', textDecoration: 'none',
                transition: 'background 0.15s',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = C.card; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = C.navy; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: C.cream, letterSpacing: '-0.01em' }}>{s.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.violet, letterSpacing: '0.05em' }}>&rarr;</div>
                </div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.body, lineHeight: 1.6, marginBottom: 8 }}>{s.t}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steel, letterSpacing: '0.06em' }}>{s.href}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: C.cream, marginBottom: 6 }}>
            DexVerse &middot; Dropdown Logistics Local AI Layer
          </div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.body }}>
            The rig stays awake.
          </div>
        </div>
        <Link href="/dexverse" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.05em' }}>
          /dexverse
        </Link>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 980, margin: '0 auto', padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, letterSpacing: '0.22em' }}>
          CHAOS &rarr; STRUCTURED &rarr; AUTOMATED
        </div>
      </div>
    </div>
  );
}
