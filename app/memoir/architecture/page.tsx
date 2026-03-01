'use client';

import { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// THE ROAD TO REASONABLE ASSURANCE — Manuscript Architecture Map
// Canonical v2.0 — 49 Excerpts — 52,595 Words — 7 Acts
// Preserved aesthetic: deep navy, crimson, gold, Libre Baskerville
// ═══════════════════════════════════════════════════════════════

interface ChapterData {
  num: number;
  title: string;
  open: string;
  arc: string;
  merged?: boolean;
  split?: boolean;
}

interface ActData {
  act: string;
  title: string;
  range: string;
  desc: string;
  chapters: ChapterData[];
}

interface InsightData {
  title: string;
  body: string;
  tag: string;
}

interface ReconRow {
  oldNum: string;
  newNum: string;
  title: string;
  strikeTitle?: boolean;
  change: string;
}

interface QuoteData {
  text: string;
  source: string;
}

// Color palette — preserved from original
const C = {
  navy: '#0D1B2A',
  navyMid: '#1B2838',
  navyLight: '#243447',
  crimson: '#9B111E',
  crimsonGlow: '#C41426',
  cream: '#F5F0E8',
  creamDim: '#E8E0D0',
  gold: '#D4A842',
  slate: '#8899AA',
  green: '#2D8F5E',
  blue: '#3B82F6',
  purple: '#8B5CF6',
  pink: '#E879A0',
  amber: '#F59E0B',
};

const ARC_BORDER_COLORS: Record<string, string> = {
  identity: C.purple,
  addiction: C.amber,
  crisis: C.crimsonGlow,
  emily: C.pink,
  audit: C.blue,
  recovery: C.green,
};

const ACTS: ActData[] = [
  {
    act: 'ACT I', title: 'The Foundation', range: 'Excerpts 1–6 · Before the first drink',
    desc: 'Family, childhood, the wiring that precedes everything. The reader meets Dave before alcohol enters the frame.',
    chapters: [
      { num: 1, title: 'Perspective', open: "I don't know when it started exactly.", arc: 'identity' },
      { num: 2, title: 'Lake Night', open: 'The lake house was never about the lake.', arc: 'identity' },
      { num: 3, title: 'The Coming Storm', open: 'Before the storm, the air changed.', arc: 'identity' },
      { num: 4, title: '3 South', open: 'The dorm room was small enough to memorize.', arc: 'identity' },
      { num: 5, title: 'Drink Drink Drink', open: 'The keg was the center of gravity.', arc: 'identity' },
      { num: 6, title: 'The Dance', open: 'The garage had its own rhythm.', arc: 'identity' },
    ],
  },
  {
    act: 'ACT II', title: 'The Discovery', range: 'Excerpts 7–13 · First drink through college',
    desc: 'Alcohol arrives. Not as destruction\u2014as solution. The freezer-counter-pour ritual begins. Freedom disguised as fun.',
    chapters: [
      { num: 7, title: 'The Rhythm', open: 'The ritual had a shape before I named it.', arc: 'addiction' },
      { num: 8, title: 'Loneliness or Freedom?', open: 'The phone was always in my hand.', arc: 'addiction' },
      { num: 9, title: 'GMAT', open: 'I never opened the study guide.', arc: 'addiction' },
      { num: 10, title: '21', open: 'Twenty-one was supposed to change things.', arc: 'addiction' },
      { num: 11, title: 'The Hill', open: 'Graduation felt like a finish line and a starting gun.', arc: 'identity' },
      { num: 12, title: 'Tulsa', open: "Tulsa wasn't a plan. It was a placement.", arc: 'audit' },
      { num: 13, title: 'The First Hiding', open: 'The first time I hid my drinking.', arc: 'addiction' },
    ],
  },
  {
    act: 'ACT III', title: 'The Professional Mask', range: 'Excerpts 14–20 · Early career, functional drinking',
    desc: 'Work becomes identity. Drinking becomes invisible. The system learns to hide itself inside professionalism.',
    chapters: [
      { num: 14, title: 'Liberty Tower, 13J', open: 'The condo changed everything.', arc: 'audit' },
      { num: 15, title: 'Pre-game', open: 'The walk downtown was part of it.', arc: 'addiction' },
      { num: 16, title: 'October 2009 (Train Shot)', open: 'She ordered a train shot.', arc: 'emily' },
      { num: 17, title: 'CPA', open: 'I failed BEC three times.', arc: 'audit' },
      { num: 18, title: 'KC / First Breakup', open: 'The drive back to Kansas City.', arc: 'identity' },
      { num: 19, title: 'August 2011 (The Dewey)', open: 'I got arrested on a Tuesday.', arc: 'crisis' },
      { num: 20, title: 'The Aftermath', open: 'The morning after the DUI.', arc: 'addiction' },
    ],
  },
  {
    act: 'ACT IV', title: 'The Spiral', range: "Excerpts 21–28 · Rock bottom isn\u2019t a single event",
    desc: "The system breaks. Multiple bottoms. Solo drinking. Desk drinking. The kitchen sequence accelerates. Three first drinks. The Walrus. March 25, 2018.",
    chapters: [
      { num: 21, title: "Working, Until It Wasn\u2019t", open: "Liberty Tower, 13J didn\u2019t just become my place. It became a little ecosystem.", arc: 'addiction' },
      { num: 22, title: 'My Second Job', open: 'At some point, the fun part stopped outweighing the price.', arc: 'addiction' },
      { num: 23, title: 'The Second First Drink', open: 'I remember exactly where I was when I had my second first drink.', arc: 'crisis' },
      { num: 24, title: 'Basement / Vacation Home', open: 'I moved in with my parents when I was thirty.', arc: 'addiction' },
      { num: 25, title: 'The Median', open: 'I was in Tulsa because I was moving out. The condo was sold.', arc: 'crisis', merged: true },
      { num: 26, title: 'The Third First Drink', open: "The second first drink had a setting. The third first drink didn\u2019t have any of that.", arc: 'crisis' },
      { num: 27, title: 'The Walrus', open: 'March 25, 2018 was a Sunday.', arc: 'crisis' },
      { num: 28, title: "I\u2019m CEO, Bitch", open: 'My time at Commerce Bank was coming to a close.', arc: 'recovery' },
    ],
  },
  {
    act: 'ACT V', title: 'The False Summit', range: 'Excerpts 29–36 · Emily, love, loss, rebuilding',
    desc: "Sobriety holds. Emily arrives. Matt dies. The reader thinks the story is over. It isn\u2019t. The floor is about to drop again.",
    chapters: [
      { num: 29, title: 'Coffee Meets Bagel', open: 'Dating in your thirties is exactly how it looks in the movies.', arc: 'identity', split: true },
      { num: 30, title: 'Emily', open: 'She had a flower in her hair. Big smile.', arc: 'emily', split: true },
      { num: 31, title: 'The Road', open: 'Aside from being away from my new girlfriend.', arc: 'emily' },
      { num: 32, title: 'Quarterly SOX Reporting', open: "The months between March and July weren\u2019t exciting.", arc: 'audit' },
      { num: 33, title: 'Mondo Condo', open: 'After the proposal, time stopped acting like time.', arc: 'emily' },
      { num: 34, title: 'Loose Ends', open: "Matt and I didn\u2019t have the kind of friendship that needed constant maintenance.", arc: 'crisis' },
      { num: 35, title: 'Benched', open: "I was back in the driver\u2019s seat.", arc: 'recovery' },
      { num: 36, title: 'Our People', open: 'Say what you want about Sons of Anarchy and Fast & Furious.', arc: 'identity' },
    ],
  },
  {
    act: 'ACT VI', title: 'The Unraveling', range: 'Excerpts 37–44 · Mania, diagnosis, catastrophic failure',
    desc: "The brain that survived addiction runs at full speed with no governor. Same engine. No containment. Emily becomes certified mail.",
    chapters: [
      { num: 37, title: 'Material Weakness', open: 'I became a corporate controller on paper, and a firefighter in practice.', arc: 'audit' },
      { num: 38, title: 'Going Concern', open: 'After the hospital job, I was back at the drawing board again.', arc: 'audit' },
      { num: 39, title: 'To The Moon', open: 'Once again, I was in a position that felt right.', arc: 'audit' },
      { num: 40, title: 'Whiplash', open: "My title didn\u2019t change, but my role did.", arc: 'crisis' },
      { num: 41, title: 'Overclocked', open: "I didn\u2019t pull all-nighters in college.", arc: 'crisis' },
      { num: 42, title: 'The Audit', open: 'Sometime before the California trip, Emily talked me into a full psych evaluation.', arc: 'identity' },
      { num: 43, title: 'Trendline (The Ramp)', open: "The scary part about the ramp isn\u2019t that it happens.", arc: 'crisis' },
      { num: 44, title: 'Catastrophic Failure', open: 'In early March 2024, my body staged a coup.', arc: 'crisis' },
    ],
  },
  {
    act: 'ACT VII', title: 'Reasonable Assurance', range: 'Excerpts 45–49 · Recovery, return, Emily, landing',
    desc: "The system comes back online. Not fixed\u2014governed. The memoir audits itself and arrives at the only conclusion available: reasonable assurance. Not certainty. Enough.",
    chapters: [
      { num: 45, title: 'Dinner for Two', open: 'Until the end of September.', arc: 'recovery' },
      { num: 46, title: 'Return to Office', open: "The first day back didn\u2019t feel like \u2018going to work.\u2019", arc: 'recovery' },
      { num: 47, title: 'Internal Control', open: 'The contract role went well.', arc: 'recovery' },
      { num: 48, title: 'Unqualified Opinion', open: 'When my first performance evaluation came back.', arc: 'recovery' },
      { num: 49, title: 'Reasonable Assurance', open: 'Christmas Day in Phoenix looks like a postcard.', arc: 'recovery' },
    ],
  },
];

const INSIGHTS: InsightData[] = [
  { title: 'The Kitchen Sequence Is the Addiction Story', body: 'Freezer \u2192 Counter \u2192 Pour appears across 7 excerpts spanning 10+ years. It starts as college fun, becomes ritual, goes covert, goes solo, gets institutionalized by liquor store staff, mutates into basement logistics, and finally collapses into raw pulls from the bottle. Tracking this single physical sequence IS the addiction arc.', tag: 'STRUCTURAL MOTIF' },
  { title: 'Excerpt 26 Is the Structural Black Hole', body: "Formerly Excerpt 27. The shortest excerpt in the manuscript. Contains suicidal ideation, desk drinking, and the Frank Costanza intervention. The compression is the point\u2014the darkest moment gets the fewest words. This is instinctive craft. A less disciplined writer would have made this the longest chapter.", tag: 'COMPRESSION' },
  { title: 'The Median Merge Creates a Single Impact Zone', body: 'Old Excerpts 25 and 26 (\u201CThe Median\u201D + \u201CHere We Go Again\u201D) now live as one ~1,200-word excerpt. The crash, the vow, the fire group, and the relapse pull all land in a single unbroken sequence. This mirrors the structural compression of the Black Hole excerpt\u2014velocity without escape.', tag: 'v2.0 RECONCILIATION' },
  { title: "Emily Is Not a Love Interest\u2014She\u2019s a Control Environment", body: "In audit terms, Emily is the control that compensates for the deficiency. She doesn\u2019t appear until Excerpt 30, and by Excerpt 44 she IS the operating system. Certified mail. Disability appeals. Boss emails. Care team coordination. \u201CSometimes love is certified mail\u201D is the thesis statement of the relationship.", tag: 'CHARACTER ARCHITECTURE' },
  { title: 'The Emily Split Gives the Reader Her Entrance', body: "Old Excerpt 30 tried to carry the dating comedy and the love story in one breath. The split creates two distinct registers: Excerpt 29 (\u201CCoffee Meets Bagel\u201D) is Dave re-entering the world\u2014funny, self-aware, slightly bruised. Excerpt 30 (\u201CEmily\u201D) is the moment the noise clears. The reader gets the same experience Dave had.", tag: 'v2.0 RECONCILIATION' },
  { title: "Audit Vocabulary Is the Voice\u2014Not Metaphor, Worldview", body: "The excerpt titles tell it: Internal Control, Material Weakness, Going Concern, Unqualified Opinion, Reasonable Assurance. These aren\u2019t clever word games. This is how Dave\u2019s brain actually processes experience. The diagnosis chapter is literally titled \u201CThe Audit.\u201D The memoir IS an audit\u2014of himself.", tag: 'VOICE' },
  { title: "Matt\u2019s Death Is the Emotional Peak\u2014Not the Rock Bottom", body: "The highest emotional intensity isn\u2019t in the addiction spiral\u2014it\u2019s in the grief excerpt. Excerpt 34 lands differently because it\u2019s the one crisis Dave didn\u2019t cause. Every other disaster is self-inflicted. Matt\u2019s death is the universe punching back. And the fact that Dave doesn\u2019t drink after it is the memoir\u2019s most important proof of concept.", tag: 'STRUCTURAL PEAK' },
  { title: 'The False Summit Makes This Structurally Unusual', body: "Excerpts 29\u201336\u2014Emily, wedding, Matt\u2019s death\u2014feel like the end of the book. The reader thinks the story resolved. Then Excerpt 37 starts and the floor drops into mania, diagnosis, and catastrophic failure. Most memoirs have one crisis arc. This one has two, and the second is the one no one sees coming.", tag: 'ARCHITECTURE' },
];

const RECON_ROWS: ReconRow[] = [
  { oldNum: '1\u201324', newNum: '1\u201324', title: '(Acts I\u2013IV)', change: 'No change. Titles aligned to prose.' },
  { oldNum: '25', newNum: '25', title: 'The Median', change: 'Merged with old Excerpt 26 (\u201CHere We Go Again\u201D). The crash, vow, church fire guys, and liquor store pull now live in one ~1,200-word excerpt.' },
  { oldNum: '26', newNum: '\u2014', title: 'Here We Go Again', strikeTitle: true, change: 'Absorbed into Excerpt 25.' },
  { oldNum: '27', newNum: '26', title: 'The Third First Drink', change: 'Renumbered. Content unchanged.' },
  { oldNum: '28', newNum: '27', title: 'The Walrus', change: 'Renumbered. Content unchanged.' },
  { oldNum: '29', newNum: '28', title: "I\u2019m CEO, Bitch", change: 'Renumbered. Moved to end of Act IV as the pivot out of the spiral. Absorbs dating preamble from old 30.' },
  { oldNum: '30 (pt.1)', newNum: '29', title: 'Coffee Meets Bagel', change: "Split from old Excerpt 30. Covers dating apps, the gauntlet, CMB discovery. Ends when Emily\u2019s profile appears." },
  { oldNum: '30 (pt.2)', newNum: '30', title: 'Emily', change: 'Split from old Excerpt 30. Opens at sushi. First date, D&D reveal, olive joke, hope. Pure Emily.' },
  { oldNum: '31\u201349', newNum: '31\u201349', title: '(Acts V\u2013VII)', change: 'Numbers shift naturally. Content unchanged.' },
];

const QUOTES: QuoteData[] = [
  { text: 'Sometimes love is certified mail.', source: 'On Emily' },
  { text: "The scary part about the ramp isn\u2019t that it happens.", source: 'Excerpt 43: Trendline' },
  { text: "I didn\u2019t pull all-nighters in college.", source: 'Excerpt 41: Overclocked (opening line)' },
  { text: 'In early March 2024, my body staged a coup.', source: 'Excerpt 44: Catastrophic Failure (opening line)' },
  { text: 'Christmas Day in Phoenix looks like a postcard.', source: 'Excerpt 49: Reasonable Assurance (opening line)' },
  { text: "Matt and I didn\u2019t have the kind of friendship that needed constant maintenance.", source: 'Excerpt 34: Loose Ends (opening line)' },
];

const LEGEND_ITEMS = [
  { color: C.amber, label: 'Addiction Arc' },
  { color: C.crimsonGlow, label: 'Crisis / Peak' },
  { color: C.pink, label: 'Emily / Love' },
  { color: C.blue, label: 'Career / Audit' },
  { color: C.green, label: 'Recovery' },
  { color: C.purple, label: 'Identity' },
];

// Peaks — chapters that get the crimson glow treatment
const PEAK_CHAPTERS = [25, 26, 34, 41, 44, 49];

function useScrollReveal(): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} style={{
      opacity: 0, transform: 'translateY(20px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function ChapterChip({ chapter, onHover, onLeave }: {
  chapter: ChapterData;
  onHover: (ch: ChapterData, e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  const isPeak = PEAK_CHAPTERS.includes(chapter.num);
  const borderColor = ARC_BORDER_COLORS[chapter.arc] || C.slate;

  return (
    <div
      onMouseEnter={(e) => onHover(chapter, e)}
      onMouseLeave={onLeave}
      style={{
        background: C.navyMid,
        border: `1px solid ${isPeak ? C.crimson : C.navyLight}`,
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: '4px',
        padding: '10px 14px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.72rem',
        color: C.creamDim,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        maxWidth: '240px',
        boxShadow: isPeak ? '0 0 12px rgba(155,17,30,0.2)' : 'none',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = C.crimson;
        e.currentTarget.style.background = C.navyLight;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = isPeak ? C.crimson : C.navyLight;
        e.currentTarget.style.background = C.navyMid;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span style={{ color: C.slate, marginRight: '6px' }}>
        {String(chapter.num).padStart(2, '0')}
      </span>
      {chapter.title}
      {chapter.merged && (
        <span style={{
          display: 'inline-block', fontSize: '0.55rem', color: C.gold,
          border: `1px solid rgba(212,168,66,0.4)`, borderRadius: '2px',
          padding: '1px 4px', marginLeft: '6px', verticalAlign: 'middle', letterSpacing: '0.05em',
        }}>MERGED</span>
      )}
      {chapter.split && (
        <span style={{
          display: 'inline-block', fontSize: '0.55rem', color: C.pink,
          border: `1px solid rgba(232,121,160,0.4)`, borderRadius: '2px',
          padding: '1px 4px', marginLeft: '6px', verticalAlign: 'middle', letterSpacing: '0.05em',
        }}>SPLIT</span>
      )}
    </div>
  );
}

function Tooltip({ chapter, position }: { chapter: ChapterData | null; position: { x: number; y: number } }) {
  if (!chapter) return null;
  return (
    <div style={{
      position: 'fixed', left: position.x + 16, top: position.y - 10,
      background: C.navy, border: `1px solid ${C.crimson}`, borderRadius: '6px',
      padding: '16px 20px', maxWidth: '320px', zIndex: 100,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)', pointerEvents: 'none',
    }}>
      <div style={{ fontSize: '0.95rem', color: C.cream, marginBottom: '6px', fontFamily: "'Source Serif 4', serif" }}>
        {chapter.title}
      </div>
      <div style={{ fontSize: '0.82rem', color: C.slate, fontStyle: 'italic', lineHeight: 1.5, fontFamily: "'Source Serif 4', serif" }}>
        &ldquo;{chapter.open}&rdquo;
      </div>
    </div>
  );
}

export default function ArchitecturePage() {
  const [mounted, setMounted] = useState(false);
  const [tooltipChapter, setTooltipChapter] = useState<ChapterData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => { setMounted(true); }, []);

  const handleChipHover = (ch: ChapterData, e: React.MouseEvent) => {
    setTooltipChapter(ch);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltipChapter) setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        padding: '100px 24px 32px',
        background: C.navy,
        color: C.cream,
        minHeight: '100vh',
        fontFamily: "'Source Serif 4', Georgia, serif",
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <Tooltip chapter={tooltipChapter} position={tooltipPos} />

      {/* Back nav */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '20px' }}>
        <a href="/memoir" style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '1px',
          color: C.slate, textDecoration: 'none', transition: 'color 0.2s ease',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.crimsonGlow)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.slate)}
        >
          &larr; MEMOIR
        </a>
      </div>

      {/* HERO */}
      <section style={{
        minHeight: '80vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        maxWidth: '800px', margin: '0 auto', padding: '0 0 60px',
      }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '0.02em', lineHeight: 1.2, marginBottom: '8px' }}>
          The Road to <span style={{ color: C.crimsonGlow }}>Reasonable Assurance</span>
        </h1>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', fontWeight: 300, color: C.slate, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '40px' }}>
          Manuscript Architecture Map
        </div>
        <div style={{ fontStyle: 'italic', color: C.slate, fontSize: '1.1rem', marginBottom: '60px' }}>
          Dave Kitchens &mdash; 49 Excerpts &mdash; 52,595 Words
        </div>

        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
          {[
            { num: '49', label: 'Chapters' },
            { num: '52.6K', label: 'Words' },
            { num: '~25', label: 'Years Covered' },
            { num: '7', label: 'Structural Acts' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '2.2rem', fontWeight: 500, color: C.gold, display: 'block' }}>{s.num}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.slate, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div style={{
          display: 'inline-block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
          color: C.green, border: `1px solid ${C.green}`, borderRadius: '3px',
          padding: '3px 10px', letterSpacing: '0.1em',
        }}>
          CANONICAL v2.0 &mdash; Reconciled March 2026
        </div>
      </section>

      {/* LEGEND */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', padding: '40px 0', maxWidth: '800px', margin: '0 auto' }}>
        {LEGEND_ITEMS.map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.slate }}>
            <div style={{ width: '16px', height: '3px', borderRadius: '1px', background: item.color }} />
            {item.label}
          </div>
        ))}
      </div>

      {/* ACTS */}
      <section style={{ padding: '80px 0', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', fontWeight: 500, color: C.crimsonGlow, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '40px', paddingLeft: '4px' }}>
          Structural Architecture &mdash; Seven Acts (Canonical)
        </div>

        {ACTS.map((act, idx) => (
          <ScrollReveal key={act.act} delay={idx * 50}>
            <div style={{
              marginBottom: '60px', borderLeft: `2px solid ${C.navyLight}`,
              paddingLeft: '30px', position: 'relative',
            }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: C.crimsonGlow,
                  letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px',
                }}>
                  {act.act}
                </div>
                <h2 style={{ fontSize: '1.5rem', color: C.cream, marginBottom: '4px' }}>{act.title}</h2>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: C.slate }}>{act.range}</div>
                <div style={{ fontSize: '0.95rem', color: C.slate, fontStyle: 'italic', marginTop: '8px', lineHeight: 1.6 }}>{act.desc}</div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {act.chapters.map(ch => (
                  <ChapterChip key={ch.num} chapter={ch} onHover={handleChipHover} onLeave={() => setTooltipChapter(null)} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* RECONCILIATION LOG */}
      <ScrollReveal>
        <section style={{ padding: '80px 0', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', fontWeight: 500, color: C.crimsonGlow, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '40px' }}>
            Reconciliation Log &mdash; v1.0 &rarr; v2.0
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem' }}>
              <thead>
                <tr>
                  {['Old #', 'New #', 'Title', 'Change'].map(h => (
                    <th key={h} style={{ textAlign: 'left', color: C.crimsonGlow, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 16px', borderBottom: `2px solid ${C.navyLight}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECON_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '10px 16px', borderBottom: `1px solid rgba(36,52,71,0.5)`, color: row.newNum === '\u2014' ? C.slate : C.creamDim, textDecoration: row.newNum === '\u2014' ? 'line-through' : 'none', opacity: row.newNum === '\u2014' ? 0.6 : 1 }}>{row.oldNum}</td>
                    <td style={{ padding: '10px 16px', borderBottom: `1px solid rgba(36,52,71,0.5)`, color: C.gold, fontWeight: 500 }}>{row.newNum}</td>
                    <td style={{ padding: '10px 16px', borderBottom: `1px solid rgba(36,52,71,0.5)`, color: C.creamDim, textDecoration: row.strikeTitle ? 'line-through' : 'none', opacity: row.strikeTitle ? 0.5 : 1 }}>{row.title}</td>
                    <td style={{ padding: '10px 16px', borderBottom: `1px solid rgba(36,52,71,0.5)`, color: C.slate, fontStyle: 'italic', fontFamily: "'Source Serif 4', serif", fontSize: '0.8rem' }}>{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </ScrollReveal>

      {/* STRUCTURAL INSIGHTS */}
      <section style={{ padding: '80px 0', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', fontWeight: 500, color: C.crimsonGlow, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '40px' }}>
          Structural DNA
        </div>
        {INSIGHTS.map((ins, i) => (
          <ScrollReveal key={i} delay={i * 30}>
            <div style={{
              background: C.navyMid, border: `1px solid ${C.navyLight}`, borderRadius: '6px',
              padding: '30px', marginBottom: '24px', position: 'relative', overflow: 'hidden',
              borderLeft: `4px solid ${C.crimson}`,
            }}>
              <h3 style={{ fontSize: '1.15rem', color: C.cream, marginBottom: '12px', lineHeight: 1.4 }}>{ins.title}</h3>
              <p style={{ fontSize: '0.95rem', color: C.slate, lineHeight: 1.7 }}>{ins.body}</p>
              <span style={{
                display: 'inline-block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
                color: C.gold, border: `1px solid ${C.gold}`, borderRadius: '3px',
                padding: '2px 8px', marginTop: '12px', letterSpacing: '0.1em',
              }}>{ins.tag}</span>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* KEY LINES */}
      <section style={{ padding: '80px 0', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', fontWeight: 500, color: C.crimsonGlow, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '40px' }}>
          Lines That Carry Weight
        </div>
        {QUOTES.map((q, i) => (
          <ScrollReveal key={i}>
            <div style={{ padding: '40px 0', borderBottom: i < QUOTES.length - 1 ? `1px solid ${C.navyLight}` : 'none' }}>
              <div style={{ fontSize: '1.3rem', fontStyle: 'italic', color: C.cream, lineHeight: 1.6, marginBottom: '12px' }}>
                &ldquo;{q.text}&rdquo;
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: C.crimsonGlow, letterSpacing: '0.1em' }}>
                &mdash; {q.source}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* FOOTER */}
      <section style={{ textAlign: 'center', padding: '80px 0', borderTop: `1px solid ${C.navyLight}` }}>
        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: C.creamDim, marginBottom: '20px' }}>
          &ldquo;Not certainty. Enough.&rdquo;
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: C.slate, letterSpacing: '0.1em' }}>
          THE ROAD TO REASONABLE ASSURANCE &middot; MANUSCRIPT MAP v2.0 (CANONICAL)
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: C.slate, letterSpacing: '0.1em', marginTop: '8px' }}>
          Built by Dave Kitchens + Claude (Opus) &middot; March 2026
        </p>
      </section>
    </div>
  );
}
