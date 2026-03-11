'use client';
import BackButton from '@/components/BackButton';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonMid: 'rgba(178,53,49,0.35)',
  violet: '#8a6cc9', violetDim: 'rgba(138,108,201,0.12)', violetMid: 'rgba(138,108,201,0.4)',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.3)',
  creamGhost: 'rgba(245,241,235,0.05)', border: 'rgba(245,241,235,0.06)',
  borderMed: 'rgba(245,241,235,0.12)',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const PLAN = [
  { label: 'Model',       val: 'GPT-OSS 20B via LM Studio' },
  { label: 'Runtime',     val: 'LM Studio (GGUF format)' },
  { label: 'Integration', val: 'Python scripts using openpyxl, pandas, xlwings' },
  { label: 'Personality', val: 'System prompt injection ("Start all responses with DJ:")' },
  { label: 'Features',    val: 'Read/write Excel, prompt injection, macro simulation' },
  { label: 'Future',      val: 'Local file explorer, CLI wrapper, simple GUI, "Compliment Engine 2.0"' },
];

const BUILT = [
  { label: 'Model',       val: 'qwen2.5-coder:7b via Ollama' },
  { label: 'Runtime',     val: 'Ollama (not LM Studio)' },
  { label: 'Modelfile',   val: 'v4.1 — 580-token governed system prompt, council-reviewed, three failure modes tested and resolved' },
  { label: 'Corpus',      val: '320,934 searchable chunks in ChromaDB (223,989 canon + 96,945 archive)' },
  { label: 'Embedding',   val: 'nomic-embed-text (768 dimensions)' },
  { label: 'Scripts',     val: '7 production Python scripts' },
  { label: 'API',         val: 'FastAPI server on port 8787' },
  { label: 'Access',      val: 'SSH via Termius from phone/Surface' },
  { label: 'Nodes',       val: '2 (RTX 3070 primary + RTX 3060 overflow)' },
  { label: 'Council',     val: '10 AI models with personas, lenses, and behavioral contracts' },
  { label: 'AutoCouncil', val: 'v3.0 — 3 local + 2 cloud models + Dex Jr. synthesis' },
  { label: 'Publication', val: 'CanonPress on Substack with 4 series' },
  { label: 'Knowledge',   val: 'Excelligence (50 entries, 118 edges, 574/574 validation checks)' },
  { label: 'Site',        val: '160+ routes on Next.js via Vercel' },
];

const DELTAS = [
  {
    planned: 'GPT-OSS 20B',
    built:   'qwen2.5-coder:7b',
    why: 'GPT-OSS never materialized as a practical local option. The operator discovered Ollama and its ecosystem of quantized models. A 7B model on 8GB VRAM runs fast enough for real work. The 20B plan assumed bigger was better. The build proved that governance matters more than parameter count.',
  },
  {
    planned: 'LM Studio',
    built:   'Ollama',
    why: 'LM Studio is a GUI. Ollama is a server. The moment the operator wanted to run inference from another device — a phone, a laptop, a second machine — the project needed an API, not an interface. Ollama exposes a REST endpoint by default. That one capability unlocked remote access, multi-node inference, and AutoCouncil orchestration. None of which were in the original plan.',
  },
  {
    planned: 'xlwings Excel integration',
    built:   'ChromaDB + RAG pipeline',
    why: "The original goal was bidirectional Excel read/write. That happened — but it became a small piece of a much larger system. The operator's archive turned out to be far more valuable than any single spreadsheet. ChromaDB made it searchable. The RAG pipeline made it useful. Excel integration still exists but it's not the center of the system anymore. The corpus is.",
  },
  {
    planned: 'System prompt personality injection',
    built:   'Modelfile v4.1 (council-reviewed, 580 tokens)',
    why: 'The August plan had a one-paragraph personality prompt: "Be helpful, clear, a little witty." By March, the system prompt had been rewritten four times, tested against three documented failure modes, reviewed by nine AI models, and hardened with 18 explicit anti-pattern rules. The personality layer became a governance layer. "Charming" was replaced by "governed."',
  },
  {
    planned: 'Simple GUI or CLI wrapper',
    built:   '160-route Next.js site + Substack publication',
    why: "The operator discovered that the output of the system was publishable. Not as a product demo — as actual content. Council deliberations, knowledge graph exploration, constraint documentation, operator reflections. The \"GUI\" became a website. The website became a publication platform. The publication became four distinct series.",
  },
  {
    planned: '"Compliment Engine 2.0"',
    built:   '10-seat AI council with formal review methodology',
    why: 'The original vision was a single model that could be encouraging. What emerged was a multi-model system where ten different AI platforms independently review every major architectural decision. The council doesn\'t compliment. It challenges. It produces LOCK, REVISE, and REJECT verdicts. It finds what\'s missing. The operator doesn\'t need encouragement anymore. He needs governance.',
  },
  {
    planned: 'Weekend build',
    built:   'Seven months of continuous iteration',
    why: "The system couldn't be built in a weekend because the operator didn't know what the system was yet. Each component emerged from the one before it. The RAG pipeline created the need for governance. Governance created the need for the council. The council created the need for a publication process. The publication process created the need for series architecture. None of this was predictable from the August plan. All of it was inevitable once the building started.",
  },
];

function SpecTable({ rows, accentColor }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '140px 1fr',
          gap: 16, padding: '10px 0',
          borderBottom: `1px solid ${C.border}`,
        }}>
          <span style={{ fontFamily: font.mono, fontSize: 9, color: accentColor || C.creamDim, letterSpacing: '0.06em', paddingTop: 2 }}>{row.label}</span>
          <span style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.6 }}>{row.val}</span>
        </div>
      ))}
    </div>
  );
}

export default function BuildLogPage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <BackButton href="/dexverse" />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '72px 24px 100px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.violet, letterSpacing: '0.15em', marginBottom: 16 }}>
            DEXVERSE · ORIGIN
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Build Log
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 17, fontStyle: 'italic', color: C.creamMid, margin: '0 0 12px', lineHeight: 1.65, maxWidth: 540 }}>
            What was planned vs what was built.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamDim, lineHeight: 1.7 }}>
            From a weekend project to a governed intelligence infrastructure in seven months.
          </p>
          <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>
              <span style={{ color: C.violet }}>PLANNED</span> · August 2025
            </div>
            <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim }}>
              <span style={{ color: C.crimson }}>BUILT</span> · March 2026
            </div>
          </div>
        </div>

        {/* THE PLAN */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 6 }}>THE PLAN — AUGUST 2025</div>
          <p style={{ fontFamily: font.body, fontSize: 13, fontStyle: 'italic', color: C.creamDim, margin: '0 0 20px', lineHeight: 1.6 }}>
            A small model running on a gaming rig that could help with Excel logic and answer questions without relying on a cloud service.
          </p>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.violetMid}`, borderRadius: 8, padding: '20px 24px', marginBottom: 16 }}>
            <SpecTable rows={PLAN} accentColor={C.violetMid} />
          </div>
          <div style={{ background: C.violetDim, borderRadius: 6, padding: '14px 20px' }}>
            <p style={{ fontFamily: font.body, fontSize: 13, fontStyle: 'italic', color: C.creamMid, margin: 0, lineHeight: 1.65 }}>
              "Let's build a baby Dex who can speak spreadsheet and still be charming."
            </p>
            <p style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, margin: '8px 0 0' }}>Build weekend scheduled: August 10–11, 2025</p>
          </div>
        </div>

        {/* THE BUILD */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 6 }}>THE BUILD — MARCH 2026</div>
          <p style={{ fontFamily: font.body, fontSize: 13, fontStyle: 'italic', color: C.creamDim, margin: '0 0 20px', lineHeight: 1.6 }}>
            By March 2026, the system looked nothing like the August plan. It looked like this.
          </p>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.crimson}`, borderRadius: 8, padding: '20px 24px' }}>
            <SpecTable rows={BUILT} accentColor={C.crimson} />
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 64 }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.12em' }}>THE DELTAS</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>

        {/* DELTAS */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: font.body, fontSize: 14, fontStyle: 'italic', color: C.creamDim, margin: '0 0 32px', lineHeight: 1.7 }}>
            Each divergence tells a story about how systems evolve when you follow the problem instead of the plan.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {DELTAS.map((d, i) => (
              <div key={i} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: '20px 24px',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: font.mono, fontSize: 8, color: C.violetMid, letterSpacing: '0.1em', marginBottom: 6 }}>PLANNED</div>
                    <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: 'rgba(245,241,235,0.6)' }}>{d.planned}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: font.mono, fontSize: 8, color: C.crimson, letterSpacing: '0.1em', marginBottom: 6 }}>BUILT</div>
                    <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: C.cream }}>{d.built}</div>
                  </div>
                </div>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                  <div style={{ fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: '0.1em', marginBottom: 8 }}>WHY</div>
                  <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.75, margin: 0 }}>{d.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* THE PATTERN */}
        <div style={{ background: C.creamGhost, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.crimson}`, borderRadius: 8, padding: '28px 32px', marginBottom: 56 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 20 }}>THE PATTERN</div>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamDim, fontStyle: 'italic', margin: '0 0 20px', lineHeight: 1.7 }}>
            Every divergence follows the same structure:
          </p>
          {[
            'The plan assumed a fixed scope.',
            'The build discovered a larger problem.',
            'The larger problem required a different architecture.',
            'The different architecture created new capabilities.',
            'The new capabilities suggested the next build.',
          ].map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.crimson, flexShrink: 0, paddingTop: 2 }}>0{i+1}</span>
              <span style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.6 }}>{line}</span>
            </div>
          ))}
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
            <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamMid, lineHeight: 1.75, margin: 0 }}>
              This is <strong style={{ color: C.cream }}>Chaos → Structured → Automated</strong> applied to the development process itself. The plan was the chaos. The build was the structuring. The automation is still emerging.
            </p>
          </div>
        </div>

        {/* WHAT THE PLAN GOT RIGHT */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 20 }}>WHAT THE PLAN GOT RIGHT</div>
          <p style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.cream, margin: '0 0 16px', lineHeight: 1.4 }}>
            One thing. The most important thing.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, margin: '0 0 24px' }}>
            The plan said: build something local that helps you think.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamDim, lineHeight: 1.8, margin: '0 0 16px' }}>
            Everything else changed. That didn't.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 14, color: C.creamDim, lineHeight: 1.8, margin: '0 0 16px' }}>
            Dex Jr. helps the operator think. The corpus holds the memory. The council challenges the reasoning. The publication makes the thinking visible.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, lineHeight: 1.8, margin: 0 }}>
            The baby Dex who speaks spreadsheet became a governed intelligence infrastructure.
          </p>
          <p style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.cream, margin: '12px 0 0' }}>
            But the job is the same.
          </p>
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 28 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.08em', lineHeight: 2.2 }}>
            <div>Dropdown Logistics · DexVerse — Build Log</div>
            <div>Planned: August 2025 &nbsp;|&nbsp; Built: March 2026</div>
            <div style={{ color: C.violetMid, marginTop: 4 }}>The architecture repeats. The data changes.</div>
            <div style={{ color: C.creamDim, fontStyle: 'italic' }}>Even when the data is the plan itself.</div>
          </div>
        </div>

      </div>
    </div>
  );
}
