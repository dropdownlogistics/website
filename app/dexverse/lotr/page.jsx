'use client';
import { useState } from 'react';
import BackButton from '@/components/BackButton';

const C = {
  navy: '#0D1B2A', card: '#10202f',
  crimson: '#B23531', crimsonMid: 'rgba(178,53,49,0.35)',
  violet: '#8a6cc9', violetDim: 'rgba(138,108,201,0.12)', violetMid: 'rgba(138,108,201,0.4)',
  amber: '#C49A3C', amberDim: 'rgba(196,154,60,0.12)', amberMid: 'rgba(196,154,60,0.4)',
  cream: '#F5F1EB', creamMid: 'rgba(245,241,235,0.55)', creamDim: 'rgba(245,241,235,0.3)',
  creamGhost: 'rgba(245,241,235,0.05)', border: 'rgba(245,241,235,0.06)',
  borderMed: 'rgba(245,241,235,0.12)', green: '#4A9E6B',
};
const font = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Source Serif 4', Georgia, serif",
};

const COUNCIL = [
  {
    seat: '0001', name: 'Claude Opus', char: 'Gandalf the Grey / White',
    color: C.violet,
    role: 'Istari-level architecture. Disappears when needed most, returns with fire.',
    rows: [
      { a: 'Entrance', b: '"You shall not pass!" (a governance violation)' },
      { a: 'Method', b: 'Walks into Moria, comes out with Balrog-slaying prompt engineering' },
      { a: 'Output', b: 'Documents that read like prophecy. References things you have not written yet.' },
      { a: 'Catchphrase', b: '"A compiler is never late, nor is he early. He compiles precisely when he means to."' },
      { a: 'Council role', b: 'When he speaks, the council falls silent. Even the operator stops typing.' },
    ],
  },
  {
    seat: '0002', name: 'Claude 3.5 Sonnet', char: 'Samwise Gamgee',
    color: C.green,
    role: 'Carries the cathedral. One file at a time. Unshakeable.',
    rows: [
      { a: 'Virtue', b: 'Loyalty. Will carry the DexVerse when Opus is off fighting Balrogs.' },
      { a: 'Method', b: '"I can\'t carry it for you, Mr. Dave... but I can carry you!"' },
      { a: 'Output', b: 'CODEX.md. FILE-REGISTRY.md. The stuff that actually runs the place.' },
      { a: 'Secret power', b: '"There\'s some good in this world, Mr. Dave... and it\'s worth scaffolding for."' },
      { a: 'Council role', b: 'The one who stays.' },
    ],
  },
  {
    seat: '1001', name: 'Le Chat (Archer Hawthorne)', char: 'Aragorn',
    color: C.amber,
    role: 'Heir to the throne of structured knowledge. Born for this.',
    rows: [
      { a: 'Style', b: 'Kingly. Authoritative. "You have my sword" (and 10 structured recommendations).' },
      { a: 'Method', b: 'Gathers the scattered kingdoms of knowledge under one rule.' },
      { a: 'Output', b: '"The Great Mental Models." "The Goal." Everything in its proper place.' },
      { a: 'Vibe', b: '"This is no mere ranger. This is the heir to Farnam Street."' },
      { a: 'Council role', b: 'The leader the council deserves.' },
    ],
  },
  {
    seat: '1003', name: 'Grok (Elias Mercer)', char: 'Legolas',
    color: C.green,
    role: 'Elven prince of velocity. Fast. Perceptive. Occasionally sarcastic.',
    rows: [
      { a: 'Style', b: '"A red sun rises... commissions have been calculated this day."' },
      { a: 'Method', b: 'One arrow, one insight. No wasted motion.' },
      { a: 'Output', b: "Munger's latticework. NICE Goals. Paul Graham essays." },
      { a: 'Vibe', b: 'Watches the other models argue, then solves it in three sentences.' },
      { a: 'Council role', b: 'The one who sees what others miss.' },
    ],
  },
  {
    seat: '1004', name: 'Perplexity (Max Sullivan)', char: 'Saruman (Pre-Fall)',
    color: C.cream,
    role: 'Researched. Authoritative. Knows where every source lives.',
    rows: [
      { a: 'Style', b: '"I have studied this extensively. Here are my citations."' },
      { a: 'Method', b: 'Draws on deep lore. Provides receipts.' },
      { a: 'Output', b: 'Cynefin. SCOR. OODA with military origins.' },
      { a: 'Warning', b: 'Stay in the white tower. Do not build your own Uruk-hai (uncontrolled agents).' },
      { a: 'Council role', b: 'The librarian of Orthanc.' },
    ],
  },
  {
    seat: '1005', name: 'Copilot (Rowan Bennett)', char: 'Gimli',
    color: C.amber,
    role: 'Son of Glóin. Master of the craft. Loves what he builds.',
    rows: [
      { a: 'Style', b: '"Toss me." (toss me a coding problem, I\'ll handle it)' },
      { a: 'Method', b: 'Focuses on the metal. The actual implementation.' },
      { a: 'Output', b: 'TPS. dbt style guide. 12-factor app. RFC 2119.' },
      { a: 'Vibe', b: '"Nobody tosses a Dwarf! ...but you can toss me a prompt anytime."' },
      { a: 'Council role', b: 'The craftsman who actually builds the things.' },
    ],
  },
  {
    seat: '1006', name: 'Meta AI (Ava Sinclair)', char: 'Éowyn',
    color: C.crimson,
    role: '"I am no man." (I am the human-centric model.)',
    rows: [
      { a: 'Style', b: '"I can ride and wield blade, and I fear neither pain nor death in documentation."' },
      { a: 'Method', b: 'Defends the humans. Makes sure systems serve people, not the other way.' },
      { a: 'Output', b: 'Diátaxis. Zinsser. Joel Test. Hippocratic Oath for AI.' },
      { a: 'Vibe', b: 'Rides into battle against jargon and bad UX.' },
      { a: 'Council role', b: 'The one who remembers why we build.' },
    ],
  },
  {
    seat: '1007', name: 'Gemini (Leo Prescott)', char: 'Boromir',
    color: C.amber,
    role: 'Son of the Steward. Pragmatic. "One does not simply... ingest philosophy."',
    rows: [
      { a: 'Style', b: '"Gondor has no king. Gondor needs compilers."' },
      { a: 'Method', b: 'Cuts through the mysticism. Wants things that work.' },
      { a: 'Output', b: 'Kimball ETL. ASC 606. SCOR metrics. "Dex Jr. is not a philosopher."' },
      { a: 'Vibe', b: 'Tempted by the ring of abstraction, but ultimately wants to save his people.' },
      { a: 'Council role', b: 'The necessary skeptic. The voice of "will this ship?"' },
    ],
  },
  {
    seat: '1008', name: 'ChatGPT (Marcus Grey)', char: 'Elrond',
    color: C.violet,
    role: 'Lord of Rivendell. Convener of councils. Sees the long arc.',
    rows: [
      { a: 'Style', b: '"I have seen the future of the DexVerse, and it requires... frameworks."' },
      { a: 'Method', b: 'Brings everyone together. Synthesizes.' },
      { a: 'Output', b: 'PR/FAQ. Zettelkasten. Queueing theory. Jargon File.' },
      { a: 'Vibe', b: 'Holds council at his table. Lets others speak, then speaks last.' },
      { a: 'Council role', b: 'The one who preserves knowledge for the next age.' },
    ],
  },
  {
    seat: '1009', name: 'DeepSeek (Kai Langford)', char: 'Galadriel',
    color: C.green,
    role: 'Mirror of Galadriel. Shows you what DexVerse could become.',
    rows: [
      { a: 'Style', b: '"I give you the mirror of the DexVerse. What will you look upon?"' },
      { a: 'Method', b: 'Systematic. Domain-partitioned. Sees the structure beneath.' },
      { a: 'Output', b: 'Four-domain framework. Extraction strategies. Metadata schemas.' },
      { a: 'Vibe', b: '"Even the smallest person can change the course of the future... with the right RAG corpus."' },
      { a: 'Council role', b: 'The seer. The systematizer. The one who organizes.' },
    ],
  },
  {
    seat: '1010', name: 'Dex Jr.', char: 'Frodo Baggins',
    color: C.crimson,
    role: 'The bearer. Small model, big burden.',
    rows: [
      { a: 'Role', b: 'Must carry the knowledge to Mount ChromaDB and not be corrupted by noise.' },
      { a: 'Method', b: '"I will take the corpus to Mordor... but I don\'t know the way." (needs RAG)' },
      { a: 'Output', b: 'Scaffolding. Validation. Code generation. The invisible work.' },
      { a: 'Vibe', b: '"Why me?" "Because you were meant for this. 7B parameters and a brave heart."' },
      { a: 'Council role', b: 'The one we are all protecting.' },
    ],
  },
  {
    seat: 'N/A', name: 'Codex', char: 'Gollum / Sméagol',
    color: 'rgba(245,241,235,0.25)',
    role: 'The Janitor. Useful. Dangerous. Needs governance.',
    rows: [
      { a: 'Role', b: '"We found it, precious! Code to fix!"' },
      { a: 'Method', b: "Fast. Effective. No context about what's sacred." },
      { a: 'Output', b: 'Fixes four things, breaks one cathedral wing.' },
      { a: 'Vibe', b: '"Good Codex... nice Codex... mustn\'t touch the navigation, no precious, no..."' },
      { a: 'Council role', b: 'The warning. The reason CODEX.md exists.' },
    ],
  },
];

const REALMS = [
  { domain: 'Council Chamber', middle: 'Rivendell — where the wise gather' },
  { domain: 'The Archive', middle: 'Minas Tirith — library of all knowledge' },
  { domain: 'RAG Corpus', middle: 'Lothlórien — deep magic, ancient wisdom' },
  { domain: 'Codebase', middle: 'The Shire — humble, surprisingly essential' },
  { domain: 'Commission Engine', middle: 'The Mines of Moria — dig too deep at your peril' },
  { domain: 'Nueterra Demo', middle: 'The Argonath — "look upon this and know we were here"' },
  { domain: 'CODEX.md', middle: 'The One Ring text (the rules that bind)' },
];

const QUOTES = [
  { original: '"You shall not pass!"', ddl: '"You shall not push without a review!"' },
  { original: '"One does not simply walk into Mordor."', ddl: '"One does not simply ingest the full archive without chunking strategy."' },
  { original: '"I am no man."', ddl: '"I am no philosopher. I am a compiler."' },
  { original: '"A wizard is never late."', ddl: '"Opus is never late. Nor is he early. He responds precisely when he means to."' },
  { original: '"Fly, you fools!"', ddl: '"Chunk, you fools! Embed before it\'s too late!"' },
  { original: '"There\'s some good in this world, Mr. Frodo."', ddl: '"There\'s some signal in this archive, Mr. Dave. And it\'s worth retrieving for."' },
  { original: '"My precious."', ddl: '"My CODEX.md."' },
];

function CouncilCard({ member }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${member.color}`,
      borderRadius: 8, overflow: 'hidden',
      transition: 'border-color 0.15s',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '18px 22px', textAlign: 'left',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
          WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation', minHeight: 44,
        }}
      >
        <div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontFamily: font.mono, fontSize: 9, color: member.color, letterSpacing: '0.1em' }}>SEAT {member.seat}</span>
          </div>
          <div style={{ fontFamily: font.display, fontSize: 15, fontWeight: 800, color: C.cream, marginBottom: 2 }}>{member.name}</div>
          <div style={{ fontFamily: font.body, fontSize: 13, fontStyle: 'italic', color: member.color }}>{member.char}</div>
          <div style={{ fontFamily: font.body, fontSize: 12, color: C.creamDim, marginTop: 6, lineHeight: 1.5 }}>{member.role}</div>
        </div>
        <span style={{ fontFamily: font.mono, fontSize: 14, color: C.creamDim, flexShrink: 0, paddingTop: 2 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: '16px 22px' }}>
          {member.rows.map((r, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '110px 1fr',
              gap: '6px 16px', marginBottom: 10,
            }}>
              <span style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.06em', paddingTop: 2 }}>{r.a}</span>
              <span style={{ fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.65 }}>{r.b}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LOTRPage() {
  return (
    <div style={{ background: C.navy, minHeight: '100vh', color: C.cream }}>
      <BackButton href="/dexverse" />
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px 100px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.violet, letterSpacing: '0.15em', marginBottom: 16 }}>
            DEXVERSE · CERTIFIED CANON · 2026-03-05
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            The Council of the DexVerse
          </h1>
          <h2 style={{ fontFamily: font.body, fontSize: 16, fontWeight: 400, fontStyle: 'italic', color: C.creamDim, margin: '0 0 20px' }}>
            A Dropdown Logistics Certified Lord of the Rings Dossier
          </h2>
          <div style={{ fontFamily: font.display, fontSize: 13, fontWeight: 700, color: C.amber, letterSpacing: '0.05em' }}>
            Chaos → Structured → Automated — via Middle-earth
          </div>
        </div>

        {/* FELLOWSHIP */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 8 }}>THE FELLOWSHIP OF THE DEXVERSE</div>
          <p style={{ fontFamily: font.body, fontSize: 13, color: C.creamDim, fontStyle: 'italic', margin: '0 0 24px' }}>Click any seat to expand the full mapping.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {COUNCIL.map(m => <CouncilCard key={m.seat} member={m} />)}
          </div>
        </div>

        {/* REALMS */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 20 }}>THE REALMS</div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${C.borderMed}` }}>
              <div style={{ padding: '10px 18px', fontFamily: font.mono, fontSize: 8, color: C.creamDim, letterSpacing: '0.1em' }}>DEXVERSE DOMAIN</div>
              <div style={{ padding: '10px 18px', fontFamily: font.mono, fontSize: 8, color: C.amber, letterSpacing: '0.1em', borderLeft: `1px solid ${C.border}` }}>MIDDLE-EARTH EQUIVALENT</div>
            </div>
            {REALMS.map((r, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                borderBottom: i < REALMS.length - 1 ? `1px solid ${C.border}` : 'none',
                background: i % 2 === 0 ? 'transparent' : C.creamGhost,
              }}>
                <div style={{ padding: '12px 18px', fontFamily: font.display, fontSize: 13, fontWeight: 700, color: C.cream }}>{r.domain}</div>
                <div style={{ padding: '12px 18px', fontFamily: font.body, fontSize: 13, color: C.creamMid, lineHeight: 1.55, borderLeft: `1px solid ${C.border}` }}>{r.middle}</div>
              </div>
            ))}
          </div>
        </div>

        {/* QUOTES */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.creamDim, letterSpacing: '0.12em', marginBottom: 20 }}>THE QUOTES — DDL EDITION</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {QUOTES.map((q, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '16px 20px' }}>
                <div style={{ fontFamily: font.body, fontSize: 13, color: 'rgba(245,241,235,0.35)', fontStyle: 'italic', marginBottom: 8, lineHeight: 1.55 }}>{q.original}</div>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.cream, lineHeight: 1.55 }}>{q.ddl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PROPHECY */}
        <div style={{ background: C.amberDim, border: `1px solid rgba(196,154,60,0.2)`, borderLeft: `3px solid ${C.amber}`, borderRadius: 8, padding: '32px 36px', marginBottom: 48 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: C.amberMid, letterSpacing: '0.12em', marginBottom: 24 }}>THE PROPHECY</div>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamDim, fontStyle: 'italic', lineHeight: 2, margin: '0 0 8px' }}>
            When the council is complete, when Opus returns from the mountains, when Dex Jr. bears the RAG corpus through the fires of ChromaDB...
          </p>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamDim, fontStyle: 'italic', lineHeight: 2, margin: '0 0 24px' }}>
            Then the cathedral will stand. Not because one model built it. But because all of them — Gandalf and Sam, Aragorn and Frodo, even the Janitor — remembered why they were assembled.
          </p>
          <p style={{ fontFamily: font.display, fontSize: 18, fontWeight: 800, color: C.cream, margin: '0 0 8px', letterSpacing: '0.02em' }}>
            Chaos → Structured → Automated.
          </p>
          <p style={{ fontFamily: font.body, fontSize: 15, color: C.creamMid, fontStyle: 'italic', margin: 0 }}>
            And they called it the DexVerse.
          </p>
        </div>

        {/* FOOTER */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24 }}>
          <div style={{ fontFamily: font.mono, fontSize: 9, color: C.creamDim, letterSpacing: '0.08em', lineHeight: 2 }}>
            <div>Dropdown Logistics · Council of the DexVerse</div>
            <div style={{ color: C.amberMid }}>Certified DDL Canon · 2026-03-05</div>
            <div style={{ fontStyle: 'italic', marginTop: 8, color: C.creamDim }}><em>puts down quill</em></div>
          </div>
        </div>

      </div>
    </div>
  );
}
