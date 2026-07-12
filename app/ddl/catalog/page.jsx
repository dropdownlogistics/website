// DDL Studio Catalog — /ddl/catalog
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
  borderLt:    'rgba(245,241,235,0.13)',
  crimson:     '#B23531',
  amber:       '#C49A3C',
  amberLine:   'rgba(196,154,60,0.25)',
  green:       '#4A9E6B',
  bsGreen:     '#22C55E',
  posGreen:    '#86EFAC',
  blue:        '#6B9DC2',
  sky:         '#3B82F6',
  teal:        '#2C7A7B',
  violet:      '#8A6CC9',
  gold:        '#D4A843',
  steel:       '#6B7B8D',
  steelMuted:  '#4A5A6A',
};

const stats = [
  { n: '10',   l: 'Products',           color: C.crimson },
  { n: '5',    l: 'Families',           color: C.cream },
  { n: '44+',  l: 'Governed systems',   color: C.cream },
  { n: '65+',  l: 'Published standards',color: C.cream },
  { n: '160+', l: 'Live routes',        color: C.cream },
  { n: '566K+',l: 'Corpus chunks',      color: C.cream },
];

const SLabel = ({ children, color }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: color || C.steelMuted, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
    {children}
  </div>
);

const FamilyHeader = ({ num, name, belief }) => (
  <div style={{ marginBottom: 36 }}>
    <SLabel>{num}</SLabel>
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.02em', marginBottom: 6 }}>{name}</div>
    <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: C.steel, lineHeight: 1.6, maxWidth: 520 }}>{belief}</div>
  </div>
);

const HonestLine = ({ children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steelMuted, lineHeight: 1.7, marginBottom: 14 }}>
    {children}
  </div>
);

const StatusDot = ({ color }) => (
  <div style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
);

const ProductStatus = ({ color, children }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
    <StatusDot color={color} />
    {children}
  </div>
);

const ProductName = ({ children }) => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.01em', marginBottom: 4 }}>{children}</div>
);

const ProductTagline = ({ children }) => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: C.steel, marginBottom: 16, lineHeight: 1.5 }}>{children}</div>
);

const ProductWhy = ({ children }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.cream, lineHeight: 1.65, marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>{children}</div>
);

const Divider = () => (
  <div style={{ height: 1, background: C.border, margin: '0 0 80px' }} />
);

const ProductLink = ({ href, label, external = true }) => {
  const style = { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steel, textDecoration: 'none', letterSpacing: '0.06em', marginTop: 14 };
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{label} →</a>;
  return <Link href={href} style={style}>{label} →</Link>;
};

const cardBase = {
  background: C.card,
  border: `1px solid ${C.border}`,
  position: 'relative',
  overflow: 'hidden',
  padding: '24px 24px 24px 28px',
};

const AccentBar = ({ color }) => (
  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: color }} />
);

export default function CatalogPage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream, fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <BackButton href="/ddl" label="ddl" />

      {/* HERO */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 40px 80px', borderBottom: `1px solid ${C.border}`, marginBottom: 80 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.crimson, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
          DDL Studio Catalog · 2026
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05, marginBottom: 32, maxWidth: 820 }}>
          One architecture.<br />
          Ten domains.<br />
          <span style={{ color: C.crimson }}>The analytics are the byproduct.</span>
        </div>

        {/* Statement cells */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, maxWidth: 820, marginBottom: 40 }}>
          {[
            { label: 'Operating Constraints', text: 'Ten products. One CPA. One rig. The architecture does not change. The data does.' },
            { label: 'The Belief', text: 'Every product captures structured work. The dashboards emerge. They are not the point. The governed record is.' },
          ].map(c => (
            <div key={c.label} style={{ background: C.card, border: `1px solid ${C.borderLt}`, padding: '22px 24px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: C.steelMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{c.label}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.45, letterSpacing: '-0.01em' }}>{c.text}</div>
            </div>
          ))}
        </div>

        {/* Method flow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 40 }}>
          {['Chaos', '→', 'Structured', '→', 'Automated', '→', 'Compounding'].map((w, i) => (
            <span key={i} style={{
              fontFamily: i % 2 === 0 ? "'Space Grotesk', sans-serif" : "'JetBrains Mono', monospace",
              fontSize: i % 2 === 0 ? '0.9rem' : '0.7rem',
              fontWeight: i % 2 === 0 ? 600 : 400,
              color: i === 6 ? C.steel : (i % 2 === 0 ? C.cream : C.crimson),
              margin: i % 2 === 1 ? '0 16px' : 0,
            }}>{w}</span>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', paddingTop: 40, borderTop: `1px solid ${C.border}` }}>
          {stats.map(s => (
            <div key={s.l} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: s.color }}>{s.n}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.steel, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 120px' }}>

        {/* Architecture callout */}
        <div style={{ background: C.card, border: `1px solid ${C.borderLt}`, borderLeft: `3px solid ${C.crimson}`, borderRadius: '0 6px 6px 0', padding: '24px 28px', marginBottom: 80 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.crimson, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>How to read this catalog</div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: C.dim, lineHeight: 1.75, maxWidth: 700 }}>
            Every product here starts with a human problem. <strong style={{ fontWeight: 600, color: C.cream }}>The work gets structured. Everything else emerges.</strong> That&rsquo;s not a design philosophy &mdash; it&rsquo;s a pattern that kept repeating until it became the only way to build. Five families. One evidence layer underneath all of them. One architecture above all of them.
          </div>
        </div>

        {/* ── FAMILY 01 — PROFESSIONAL SYSTEMS ── */}
        <div style={{ marginBottom: 80 }}>
          <FamilyHeader num="Family 01" name="Professional Systems" belief="Govern operational work. One platform. Reference implementations prove it works." />

          {/* WorkBench platform block */}
          <div style={{ background: C.card, border: `1px solid ${C.borderLt}`, borderRadius: '8px 8px 0 0', overflow: 'hidden', marginBottom: 2 }}>
            <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem', padding: '2px 7px', borderRadius: 2, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(59,130,246,0.1)', color: C.sky }}>Platform</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.01em' }}>WorkBench</div>
              <div style={{ marginLeft: 'auto', fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.steel }}>Build the stack your business actually needs.</div>
            </div>
            <div style={{ padding: '16px 24px 20px' }}>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: C.steel, lineHeight: 1.7, marginBottom: 20, maxWidth: 680 }}>
                Every business ends up buying disconnected software that doesn&rsquo;t share a single record. WorkBench starts with one governed data layer. Every module reads it. Nothing syncs. Nothing drifts. <strong style={{ fontWeight: 600, color: C.cream }}>One measure, defined once, read everywhere.</strong> Modules are the à la carte option — or choose a preconfigured edition built from those same modules.
              </div>

              {/* AuditForge edition row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.border}`, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steelMuted, width: 80, flexShrink: 0 }}>└── edition</div>
                <div style={{ flex: '0 0 auto' }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.88rem', color: C.crimson }}>AuditForge</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steelMuted, marginTop: 2 }}>auditforge.dev · LIVE</div>
                </div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: C.steel, marginLeft: 'auto', maxWidth: 320, textAlign: 'right', lineHeight: 1.4 }}>
                  The audit practice edition. Controls, risks, findings, team roster, billing, document generation — all built from WorkBench modules. The auditor issues the opinion. AuditForge produces everything that supports it.
                </div>
              </div>

              {/* Future editions row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', flexWrap: 'wrap' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steelMuted, width: 80, flexShrink: 0 }}>└── roadmap</div>
                <div style={{ flex: '0 0 auto' }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.88rem', color: C.steelMuted }}>Future Editions</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steelMuted, marginTop: 2 }}>HRForge · ClinicForge · LawForge · ···</div>
                </div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.82rem', color: C.steelMuted, marginLeft: 'auto', maxWidth: 320, textAlign: 'right', lineHeight: 1.4 }}>
                  Same platform. Different configuration. The modules are already built — each new edition is a selection, not a rebuild.
                </div>
              </div>

              {/* Platform honest line */}
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steelMuted, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                <span style={{ color: C.steel }}>Honest line:</span> WorkBench is the architecture with a landing page. AuditForge is the proof that the architecture works. Neither is a coincidence.
              </div>
            </div>
          </div>

          {/* AuditForge detail card */}
          <div style={{ ...cardBase, borderRadius: '0 0 6px 6px', border: `1px solid ${C.border}`, borderTop: `1px solid ${C.borderSoft}` }}>
            <AccentBar color={C.crimson} />
            <ProductStatus color={C.green}>Live — demo has real governed data</ProductStatus>
            <ProductName>AuditForge</ProductName>
            <ProductTagline>&ldquo;The audit package generates itself.&rdquo;</ProductTagline>
            <ProductWhy>Audit teams spend their expertise assembling documentation instead of performing audit work. The population, the controls, the walkthrough package — all of it gets generated. The auditor&rsquo;s job is the opinion.</ProductWhy>
            <HonestLine><strong style={{ color: C.steel }}>What it does:</strong> 106 controls, 47 auditors, 4 document types (RCM, MCL, Walkthrough, Audit Plan), findings lifecycle, billing substrate. Full seed data visible on demo. Under 30 seconds from data to governed package.</HonestLine>
            <ProductLink href="https://auditforge.dev" label="auditforge.dev" />
          </div>
        </div>

        <Divider />

        {/* ── FAMILY 02 — KNOWLEDGE SYSTEMS ── */}
        <div style={{ marginBottom: 80 }}>
          <FamilyHeader num="Family 02" name="Knowledge Systems" belief="Preserve institutional memory. One stores. One retrieves. Together they make the corpus permanent." />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
            {/* Knowledge Vault */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 24, position: 'relative', overflow: 'hidden', borderRadius: '6px 0 0 6px' }}>
              <AccentBar color={C.teal} />
              <div style={{ paddingLeft: 4 }}>
                <SLabel color={C.steelMuted}>Memory · stores</SLabel>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.01em', marginBottom: 6 }}>Knowledge Vault</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.steel, lineHeight: 1.6, marginBottom: 12 }}>
                  The public-facing index to DDL&rsquo;s entire institutional memory. Eight pages covering the corpus, the council, the methodology, the products, the ADRs, the standards. Not a product in the commercial sense — the architecture&rsquo;s public ledger. Institutional memory dies in inboxes and laptop drives. DDL&rsquo;s doesn&rsquo;t.
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steelMuted, lineHeight: 1.7 }}>
                  <strong style={{ color: C.steel }}>Status:</strong> Live v1.4 · GitHub Pages<br />
                  <strong style={{ color: C.steel }}>Honest line:</strong> The most honest page in the portfolio — it documents the architecture that generates everything else, including itself.
                </div>
                <ProductLink href="https://dropdownlogistics.github.io/knowledge-vault/" label="knowledge-vault" />
              </div>
            </div>

            {/* Dex Jr. */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 24, position: 'relative', overflow: 'hidden', borderRadius: '0 6px 6px 0' }}>
              <AccentBar color={C.violet} />
              <div style={{ paddingLeft: 4 }}>
                <SLabel color={C.steelMuted}>Intelligence · retrieves</SLabel>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.01em', marginBottom: 6 }}>Dex Jr. · Seat 1010</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.85rem', color: C.steel, lineHeight: 1.6, marginBottom: 12 }}>
                  Local RAG infrastructure powering the 10th council seat. ChromaDB + Ollama, running on an RTX 3070. 566K+ corpus chunks across four live collections. Every context reset costs the operator a full re-explanation. The corpus fixes that permanently. The only council member with access to the full governed archive.
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steelMuted, lineHeight: 1.7 }}>
                  <strong style={{ color: C.steel }}>Status:</strong> Live · local only · no public URL<br />
                  <strong style={{ color: C.steel }}>Honest line:</strong> Zero public users. Load-bearing infrastructure under every other product&rsquo;s AI-assisted development.
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* ── FAMILY 03 — D&A ANALYTICS ── */}
        <div style={{ marginBottom: 80 }}>
          <FamilyHeader num="Family 03" name="D&amp;A Analytics" belief="Measure behavior honestly. Personal evidence, not enterprise data. Find the pattern before it costs you." />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
            {/* BlindSpot */}
            <div style={{ ...cardBase, borderRadius: '6px 0 0 0' }}>
              <AccentBar color={C.bsGreen} />
              <ProductStatus color={C.bsGreen}>Live · free beta · sign-up open</ProductStatus>
              <ProductName>BlindSpot</ProductName>
              <ProductTagline>&ldquo;The house doesn&rsquo;t have better odds. It has better data.&rdquo;</ProductTagline>
              <ProductWhy>Most bettors don&rsquo;t lose because of bad picks. They lose because they never measure behavior. 84% of bettors have never tracked a single bet — that&rsquo;s the edge BlindSpot sells.</ProductWhy>
              <HonestLine><strong style={{ color: C.steel }}>What it does:</strong> Bet log, ROI by sport/type/platform, Tilt Detection (12 behavioral patterns that predict long-run losses), Cash-Out Tracker, Live Lines, Parlay Analysis. Built by two people who share actual DNA.</HonestLine>
              <ProductLink href="https://blindspot.bet" label="blindspot.bet" />
            </div>

            {/* PositionBook */}
            <div style={{ ...cardBase, borderRadius: '0 6px 0 0' }}>
              <AccentBar color={C.posGreen} />
              <ProductStatus color={C.posGreen}>Live · invite-only</ProductStatus>
              <ProductName>PositionBook</ProductName>
              <ProductTagline>&ldquo;You are not losing. You are not tracking.&rdquo;</ProductTagline>
              <ProductWhy>Most traders know their PnL. None of them know which setups produce it. PositionBook answers the question that brokerage statements can&rsquo;t: which of your behaviors actually make money.</ProductWhy>
              <HonestLine><strong style={{ color: C.steel }}>What it does:</strong> Trade log, KPI dashboard (30.5% win rate, 2.31R avg), strategy breakdown, equity curve, Trade Card — shareable credential with public R/win rate, private PnL. 241 trades at launch are real data.</HonestLine>
              <ProductLink href="https://positionbook.vercel.app" label="positionbook.vercel.app" />
            </div>

            {/* SlopeStat */}
            <div style={{ ...cardBase, borderRadius: '0 0 0 6px' }}>
              <AccentBar color={C.amber} />
              <ProductStatus color={C.amber}>Live · sign-up open</ProductStatus>
              <ProductName>SlopeStat</ProductName>
              <ProductTagline>&ldquo;Your rides. Your boards. Your card.&rdquo;</ProductTagline>
              <ProductWhy>Your season disappears into memory. Speed, mountains, boards — none of it goes anywhere. SlopeStat builds a verified, portable record of every session before it&rsquo;s gone.</ProductWhy>
              <HonestLine><strong style={{ color: C.steel }}>What it does:</strong> Quiver management, session logging, Rider Card at /rider/[id], OG image generation for social sharing, 3 verification tiers. Demo: Toddy K, Crystal Mountain, 64.9 mph peak, Jones quiver.</HonestLine>
              <ProductLink href="https://slopestat.vercel.app" label="slopestat.vercel.app" />
            </div>

            {/* AdmitOne */}
            <div style={{ ...cardBase, borderRadius: '0 0 6px 0' }}>
              <AccentBar color={C.amber} />
              <ProductStatus color={C.amber}>Phase A · waitlist live</ProductStatus>
              <ProductName>AdmitOne</ProductName>
              <ProductTagline>&ldquo;Not what you streamed. Not what you rated. What you showed up for.&rdquo;</ProductTagline>
              <ProductWhy>You remember being there. The proof doesn&rsquo;t exist anywhere. AdmitOne makes the stub the anchor — every concert, game, film, flight becomes a governed record that enriches automatically.</ProductWhy>
              <HonestLine><strong style={{ color: C.steel }}>What it does:</strong> 5 ingestion methods, Setlist.fm enrichment, anniversary resurfacing, 4 collection views. Richest landing page in the stack — emotionally legible before a single line of core product ships. Also the SideDoor into Ledger.</HonestLine>
              <ProductLink href="https://admitone.vercel.app" label="admitone.vercel.app" />
            </div>
          </div>
        </div>

        <Divider />

        {/* ── FAMILY 04 — EXCELLIGENCE ── */}
        <div style={{ marginBottom: 80 }}>
          <FamilyHeader num="Family 04 · Knowledge Craft" name="Excelligence" belief="Excel knowledge disappears every time someone leaves a company. Excelligence makes it permanent and traversable." />

          <div style={{ ...cardBase, borderRadius: 6, maxWidth: 680, border: `1px solid ${C.border}` }}>
            <AccentBar color={C.gold} />
            <ProductStatus color={C.gold}>Live · v0.2 · schema locked · 9/9 council LOCK</ProductStatus>
            <ProductName>Excelligence</ProductName>
            <ProductTagline>&ldquo;Excel knowledge, governed and graphed.&rdquo;</ProductTagline>
            <ProductWhy>Excel expertise lives in people&rsquo;s heads, not in systems. When they leave, it leaves with them. Excelligence structures that knowledge as a traversable graph — typed, tiered, connected by governed edges.</ProductWhy>
            <HonestLine><strong style={{ color: C.steel }}>What it does:</strong> 65 entries, 156 edges, 7 entry types, 4 skill tiers, force-directed graph explorer, learning paths, CF Pattern Library, 2 institutional standards. The schema is the product — 9/9 unanimous LOCK is the credibility signal. Not a tutorial. Not a glossary. A knowledge graph.</HonestLine>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steelMuted, fontStyle: 'italic', marginBottom: 4 }}>
              &ldquo;The graph is the cathedral. Everything else is scaffolding.&rdquo; &mdash; Rowan Bennett, Seat 1005
            </div>
            <ProductLink href="https://excelligence.dev" label="excelligence.dev" />
          </div>
        </div>

        <Divider />

        {/* ── FAMILY 05 — LEDGER ── */}
        <div style={{ marginBottom: 80 }}>
          <FamilyHeader num="The Evidence Layer" name="Ledger" belief="Not a product users choose. The platform that surfaces when other products generate enough verified data." />

          {/* Ledger Layer block */}
          <div style={{ background: C.card, border: `1px solid ${C.amberLine}`, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: 'rgba(196,154,60,0.06)', borderBottom: `1px solid rgba(196,154,60,0.15)`, padding: '24px 32px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Cross-cutting · Evidence Layer</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.015em', marginBottom: 6 }}>Your life. On the record.</div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: C.steel, lineHeight: 1.65, maxWidth: 580 }}>
                Ledger isn&rsquo;t a product you sign up for. It&rsquo;s the layer that emerges when AuditForge generates an audit card, AdmitOne logs a stub, SlopeStat records a season. The card is a read view on governed data produced elsewhere. <strong style={{ fontWeight: 600, color: C.cream }}>The card is not gatekept. The verification is what compounds.</strong>
              </div>
            </div>
            <div style={{ padding: '24px 32px' }}>
              {/* Data flow */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 24 }}>
                {['AuditForge → CT-AUDIT-001', 'AdmitOne → CT-SET-001', 'SlopeStat → CT-SLOPESTAT-001'].map((s, i) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', background: 'rgba(245,241,235,0.04)', border: `1px solid ${C.borderLt}`, borderRadius: 4, padding: '6px 12px', color: C.steel }}>{s}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.amber }}>→</div>
                  </div>
                ))}
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.8rem', background: 'rgba(196,154,60,0.08)', border: `1px solid rgba(196,154,60,0.2)`, borderRadius: 4, padding: '6px 14px', color: C.amber }}>Ledger Card</div>
              </div>

              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: C.steel, lineHeight: 1.7, marginBottom: 16, maxWidth: 620 }}>
                The flywheel: firm adopts AuditForge → auditors get verified cards automatically → auditors share cards → auditors move firms → portability is paid → firm buys AuditForge at new firm. Free card. Premium badge. Card analytics. Portfolio export. The user never had to set it up.
              </div>

              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: C.steelMuted, lineHeight: 1.8, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                <strong style={{ color: C.steel }}>Honest line:</strong> Ledger&rsquo;s distribution model is structurally different from every other product in the stack. It doesn&rsquo;t compete with them. It consumes evidence produced by all of them.<br />
                <strong style={{ color: C.steel }}>Coming:</strong> BlindSpot → Bettor Card · PositionBook → Trader Card · Excelligence → Practitioner Card
              </div>
            </div>
          </div>

          {/* Ledger product card */}
          <div style={{ ...cardBase, borderRadius: '0 0 6px 6px', border: `1px solid ${C.border}`, borderTop: `1px solid ${C.borderSoft}`, marginTop: 2 }}>
            <AccentBar color={C.amber} />
            <ProductStatus color={C.amber}>Live · demo accessible · no auth required to view</ProductStatus>
            <ProductName>Ledger</ProductName>
            <ProductTagline>&ldquo;Every domain. Every moment. One governed record.&rdquo;</ProductTagline>
            <HonestLine><strong style={{ color: C.steel }}>4 card types live:</strong> CT-AUDIT-001 · CT-SET-001 · CT-SLOPESTAT-001 · CT-CHARTER-001 (coming) · Built in Next.js, no Clerk/Prisma/Neon — Ledger itself is a rendering surface. The data comes from other products.</HonestLine>
            <ProductLink href="https://ledger-card.vercel.app" label="ledger-card.vercel.app" />
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 80, paddingTop: 36, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steelMuted, lineHeight: 2 }}>
            Dropdown Logistics · Studio Catalog · 2026<br />
            dropdownlogistics.com · One operator. One rig.<br />
            Design System: CottageHumble · Chaos → Structured → Automated
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: C.steelMuted, textAlign: 'right', lineHeight: 2 }}>
            The architecture does not change.<br />
            The data does.<br />
            Dave Kitchens, CPA
          </div>
        </div>

      </div>
    </div>
  );
}
