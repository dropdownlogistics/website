'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════
// THE BRAID — Dual-Arc Timeline Visualization
// Little to Know Experience · Dave Kitchens
// Two threads. Two crises. One architecture.
// Preserved aesthetic: warm dark (#1A1714), Cormorant Garamond + Anybody
// ═══════════════════════════════════════════════════════════════

interface Excerpt {
  num: number;
  title: string;
  words: number;
  year: number;
  arc: string;
  tags: string[];
  open: string;
}

interface BraidPosition {
  x: number;
  y1: number;
  y2: number;
  nodeY: number;
  amplitude: number;
}

interface Phase {
  label: string;
  range: [number, number];
  color: string;
}

const EXCERPTS: Excerpt[] = [
  { num: 1, title: "Perspective", words: 1135, year: 2004, arc: "identity", tags: ["sobriety","quiet","identity"], open: "The first thing you should know is that this isn't a story about drinking." },
  { num: 2, title: "Lake Night", words: 1724, year: 2004, arc: "addiction", tags: ["first-drink","quiet","friendship"], open: "The lake was glass." },
  { num: 3, title: "The Coming Storm", words: 1807, year: 2004, arc: "addiction", tags: ["escalation","storm","consequence"], open: "It escalated the way weather does in Kansas." },
  { num: 4, title: "3 South", words: 1634, year: 2005, arc: "addiction", tags: ["college","blackout","limits"], open: "The dorm was called 3 South." },
  { num: 5, title: "Drink Drink Drink", words: 1048, year: 2005, arc: "addiction", tags: ["keg","belonging","permission"], open: "The keg was the center of the room." },
  { num: 6, title: "The Dance (Garage)", words: 1517, year: 2006, arc: "addiction", tags: ["productivity","garage","routine"], open: "The garage was where the choreography started." },
  { num: 7, title: "The Dance (Ritual)", words: 987, year: 2006, arc: "addiction", tags: ["ritual","choreography","kitchen"], open: "Freezer. Counter. Pour." },
  { num: 8, title: "Loneliness or Freedom?", words: 860, year: 2007, arc: "addiction", tags: ["isolation","texting","deletion"], open: "I still catch myself doing that motion sometimes." },
  { num: 9, title: "GMAT", words: 832, year: 2008, arc: "identity", tags: ["avoidance","winging-it","procrastination"], open: "I never studied." },
  { num: 10, title: "21", words: 679, year: 2005, arc: "addiction", tags: ["birthday","prairie-fire"], open: "Twenty-one didn't feel like a threshold." },
  { num: 11, title: "The Hill", words: 1106, year: 2006, arc: "identity", tags: ["graduation","KU","pride"], open: "The hill at KU is real." },
  { num: 12, title: "Tulsa", words: 1284, year: 2008, arc: "identity", tags: ["new-city","ONEOK","cohort"], open: "Tulsa was a clean start that wasn't clean." },
  { num: 13, title: "The First Hiding", words: 1333, year: 2008, arc: "addiction", tags: ["hiding","game-day","hangover"], open: "I was willing to do it quietly, alone, in the kitchen." },
  { num: 14, title: "Liberty Tower, 13J", words: 1075, year: 2009, arc: "identity", tags: ["condo","Cole","freedom"], open: "The condo was on the 13th floor." },
  { num: 15, title: "Pre-game", words: 809, year: 2009, arc: "addiction", tags: ["pregame","walking","downtown"], open: "The choreography wasn't just for parties anymore. It could be private." },
  { num: 16, title: "October 2009 (Train Shot)", words: 596, year: 2009, arc: "addiction", tags: ["girlfriend","bar","train-shot"], open: "The girlfriend's rugby team was in town." },
  { num: 17, title: "CPA", words: 1214, year: 2010, arc: "identity", tags: ["CPA","failure","avoidance"], open: "I failed the CPA exam the first time." },
  { num: 18, title: "KC / First Breakup", words: 889, year: 2010, arc: "identity", tags: ["breakup","parents","relief"], open: "The breakup was a relief disguised as a loss." },
  { num: 19, title: "August 2011 (The Dewey)", words: 1209, year: 2011, arc: "addiction", tags: ["DUI","arrest","jail"], open: "Managed 'out of order' in manuscript." },
  { num: 20, title: "The Aftermath", words: 1360, year: 2011, arc: "addiction", tags: ["aftermath","lawyer","diversion"], open: "The deal was simple." },
  { num: 21, title: "Working, Until It Wasn't", words: 1642, year: 2012, arc: "addiction", tags: ["Stinnett","Kendra","confrontation"], open: "Stinnett wasn't the kind of boss who yelled." },
  { num: 22, title: "My Second Job", words: 1604, year: 2013, arc: "addiction", tags: ["liquor-store","daily","blackout"], open: "My trash vodka would be sitting on the counter when I walked in." },
  { num: 23, title: "The Second First Drink", words: 1668, year: 2014, arc: "crisis", tags: ["relapse","Cherry-Street","60-days"], open: "No bargaining." },
  { num: 24, title: "Basement / Vacation Home", words: 1431, year: 2015, arc: "addiction", tags: ["parents-basement","hiding","empties"], open: "The routine didn't disappear—it mutated into logistics." },
  { num: 25, title: "The Median", words: 828, year: 2016, arc: "crisis", tags: ["crash","median","highway"], open: "There's a stretch of highway." },
  { num: 26, title: "Here We Go Again", words: 417, year: 2017, arc: "crisis", tags: ["vow","church","fire"], open: "I had a bottle within reach." },
  { num: 27, title: "The Third First Drink", words: 513, year: 2017, arc: "blackhole", tags: ["desk-drinking","suicidal-ideation","collapse"], open: "And at some point… I started taking pulls straight off it like an absolute degenerate." },
  { num: 28, title: "The Walrus", words: 1310, year: 2018, arc: "recovery", tags: ["sobriety-day","detox","hallucination"], open: "March 25, 2018 was a Sunday." },
  { num: 29, title: "I'm CEO, Bitch", words: 521, year: 2018, arc: "bridge", tags: ["consulting","independence","sobriety"], open: "My time at Commerce Bank was coming to a close." },
  { num: 30, title: "Emily", words: 1310, year: 2019, arc: "emily", tags: ["dating","Coffee-Meets-Bagel","sushi"], open: "Dating in your thirties is exactly how it looks in the movies." },
  { num: 31, title: "The Road", words: 1092, year: 2020, arc: "bridge", tags: ["travel","hourly","COVID"], open: "Aside from being away from my new girlfriend." },
  { num: 32, title: "Quarterly SOX Reporting", words: 875, year: 2020, arc: "bridge", tags: ["proposal","D&D","COVID"], open: "The months between March and July weren't exciting." },
  { num: 33, title: "Mondo Condo", words: 1262, year: 2021, arc: "bridge", tags: ["Austin","house","fired"], open: "After the proposal, time stopped acting like time." },
  { num: 34, title: "Loose Ends", words: 1907, year: 2021, arc: "grief", tags: ["Matt","death","grief"], open: "Matt and I didn't have the kind of friendship that needed constant maintenance." },
  { num: 35, title: "Benched", words: 744, year: 2022, arc: "bridge", tags: ["unemployment","pool","hospital-startup"], open: "I was back in the driver's seat." },
  { num: 36, title: "Our People", words: 2132, year: 2022, arc: "emily", tags: ["wedding","Emily","brother"], open: "Say what you want about Sons of Anarchy and Fast & Furious." },
  { num: 37, title: "Material Weakness", words: 979, year: 2022, arc: "mental", tags: ["controller","fog","payroll"], open: "I became a corporate controller on paper, and a firefighter in practice." },
  { num: 38, title: "Going Concern", words: 537, year: 2023, arc: "mental", tags: ["unemployment","Kendra","divine-intervention"], open: "After the hospital job, I was back at the drawing board again." },
  { num: 39, title: "To The Moon", words: 607, year: 2023, arc: "mental", tags: ["data-analytics","raise","Alteryx"], open: "Once again, I was in a position that felt right." },
  { num: 40, title: "Whiplash", words: 1412, year: 2023, arc: "mental", tags: ["reprimand","Tampa","politics"], open: "My title didn't change, but my role did." },
  { num: 41, title: "Overclocked", words: 1182, year: 2024, arc: "crisis2", tags: ["mania","insomnia","spending"], open: "I didn't pull all-nighters in college." },
  { num: 42, title: "The Audit", words: 1380, year: 2024, arc: "mental", tags: ["diagnosis","Bipolar-II","ADHD"], open: "Sometime before the California trip, Emily talked me into a full psych evaluation." },
  { num: 43, title: "Trendline (The Ramp)", words: 675, year: 2024, arc: "crisis2", tags: ["ramp","Diablo","mania"], open: "The scary part about the ramp isn't that it happens." },
  { num: 44, title: "Catastrophic Failure", words: 1323, year: 2024, arc: "crisis2", tags: ["bed","disability","denial"], open: "In early March 2024, my body staged a coup." },
  { num: 45, title: "Dinner for Two", words: 573, year: 2024, arc: "recovery2", tags: ["job-search","AI-interview","hope"], open: "Until the end of September." },
  { num: 46, title: "Return to Office", words: 727, year: 2024, arc: "recovery2", tags: ["first-day","Psych","coffee"], open: "The first day back didn't feel like 'going to work.'" },
  { num: 47, title: "Internal Control", words: 1167, year: 2024, arc: "recovery2", tags: ["audit","manager","process"], open: "The contract role went well." },
  { num: 48, title: "Unqualified Opinion", words: 533, year: 2025, arc: "recovery2", tags: ["normal","calibrated","work"], open: "When my first performance evaluation came back." },
  { num: 49, title: "Reasonable Assurance", words: 1639, year: 2025, arc: "arrival", tags: ["peace","quiet","Christmas"], open: "Christmas Day in Phoenix looks like a postcard." },
];

const ARC_COLORS: Record<string, string> = {
  identity: "#8B9DAF",
  addiction: "#D4944C",
  crisis: "#C43E3A",
  blackhole: "#FFFFFF",
  recovery: "#5B8C6A",
  bridge: "#6B7B8D",
  emily: "#D4749C",
  grief: "#7B6B8D",
  mental: "#7BA3C9",
  crisis2: "#C43E3A",
  recovery2: "#5B8C6A",
  arrival: "#D4944C",
};

const ARC_LABELS: Record<string, string> = {
  identity: "Identity",
  addiction: "Addiction",
  crisis: "Crisis",
  blackhole: "Black Hole",
  recovery: "Recovery",
  bridge: "The Bridge",
  emily: "Emily",
  grief: "Grief",
  mental: "Mental Health",
  crisis2: "Second Crisis",
  recovery2: "Second Recovery",
  arrival: "Arrival",
};

const PHASES: Phase[] = [
  { label: "Arc 1 — Addiction", range: [1, 28], color: "#D4944C" },
  { label: "The Bridge", range: [29, 36], color: "#6B7B8D" },
  { label: "Arc 2 — Mental Health", range: [37, 49], color: "#7BA3C9" },
];

function getPhase(num: number): Phase | undefined {
  return PHASES.find(p => num >= p.range[0] && num <= p.range[1]);
}

function getBraidPositions(total: number): BraidPosition[] {
  const positions: BraidPosition[] = [];
  for (let i = 0; i < total; i++) {
    const excerpt = EXCERPTS[i];
    const baseY = 200;
    let amplitude = 55;
    if (excerpt.num >= 23 && excerpt.num <= 28) amplitude = 30;
    if (excerpt.num === 27) amplitude = 8;
    if (excerpt.num >= 29 && excerpt.num <= 36) amplitude = 65;
    if (excerpt.num === 36) amplitude = 80;
    if (excerpt.num >= 41 && excerpt.num <= 44) amplitude = 25;

    const freq1 = Math.PI * 2 * (i / 12);
    const y1 = baseY - Math.sin(freq1) * amplitude;
    const y2 = baseY + Math.sin(freq1) * amplitude;

    let nodeY = baseY;
    if (excerpt.arc === "blackhole") {
      nodeY = baseY;
    } else if (["addiction", "crisis", "recovery"].includes(excerpt.arc)) {
      nodeY = y1;
    } else if (["mental", "crisis2", "recovery2"].includes(excerpt.arc)) {
      nodeY = y2;
    } else if (excerpt.arc === "emily" || excerpt.arc === "grief") {
      nodeY = baseY;
    } else if (excerpt.arc === "bridge") {
      nodeY = baseY + (Math.sin(i * 0.7) * 10);
    } else if (excerpt.arc === "arrival") {
      nodeY = baseY;
    } else {
      nodeY = y1 + (y2 - y1) * 0.3;
    }

    positions.push({ x: 80 + (i * ((1200 - 160) / (total - 1))), y1, y2, nodeY, amplitude });
  }
  return positions;
}

function useInView(threshold = 0.1): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function BraidVisualization({ onHover, onLeave, activeExcerpt }: {
  onHover: (e: Excerpt) => void;
  onLeave: () => void;
  activeExcerpt: number | null;
}) {
  const positions = getBraidPositions(EXCERPTS.length);
  const [ref, visible] = useInView(0.05);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setDrawn(true), 300);
    }
  }, [visible]);

  const buildPath = (points: BraidPosition[], key: 'y1' | 'y2'): string => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0][key]}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` C ${cpx} ${prev[key]}, ${cpx} ${curr[key]}, ${curr.x} ${curr[key]}`;
    }
    return d;
  };

  const thread1Path = buildPath(positions, "y1");
  const thread2Path = buildPath(positions, "y2");
  const maxWords = Math.max(...EXCERPTS.map(e => e.words));

  return (
    <div ref={ref} style={{
      width: "100%", overflowX: "auto", overflowY: "visible",
      padding: "20px 0",
      WebkitOverflowScrolling: "touch",
    }}>
      <svg
        viewBox="0 0 1200 400"
        style={{
          width: "1200px", minWidth: "1200px", height: "400px",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="thread1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4944C" stopOpacity={0.6} />
            <stop offset="55%" stopColor="#C43E3A" stopOpacity={0.8} />
            <stop offset="75%" stopColor="#6B7B8D" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#D4944C" stopOpacity={0.6} />
          </linearGradient>
          <linearGradient id="thread2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B9DAF" stopOpacity={0.3} />
            <stop offset="60%" stopColor="#6B7B8D" stopOpacity={0.3} />
            <stop offset="75%" stopColor="#7BA3C9" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#C43E3A" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#5B8C6A" stopOpacity={0.6} />
          </linearGradient>
        </defs>

        {PHASES.map((phase, i) => {
          const startIdx = phase.range[0] - 1;
          const endIdx = phase.range[1] - 1;
          const x1 = positions[startIdx].x - 20;
          const x2 = positions[endIdx].x + 20;
          return (
            <g key={i}>
              <rect x={x1} y={30} width={x2 - x1} height={340} fill={phase.color} opacity={0.03} rx={4} />
              <text x={x1 + 8} y={52} fontFamily="'Space Grotesk', sans-serif" fontSize="9" letterSpacing="2" fill={phase.color} opacity={0.5} textAnchor="start">
                {phase.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        <path d={thread1Path} fill="none" stroke="url(#thread1Grad)" strokeWidth="1.5"
          strokeDasharray={drawn ? "none" : "2000"} strokeDashoffset={drawn ? 0 : 2000}
          style={{ transition: "stroke-dashoffset 3s ease-in-out" }} />

        <path d={thread2Path} fill="none" stroke="url(#thread2Grad)" strokeWidth="1.5"
          strokeDasharray={drawn ? "none" : "2000"} strokeDashoffset={drawn ? 0 : 2000}
          style={{ transition: "stroke-dashoffset 3s ease-in-out 0.5s" }} />

        {EXCERPTS.map((excerpt, i) => {
          const pos = positions[i];
          const color = ARC_COLORS[excerpt.arc];
          const isActive = activeExcerpt === excerpt.num;
          const isBlackHole = excerpt.arc === "blackhole";
          const isPeak = excerpt.num === 36 || excerpt.num === 34;
          const radius = isBlackHole ? 6 : isPeak ? 5 : Math.max(3, (excerpt.words / maxWords) * 6);

          return (
            <g key={excerpt.num} onMouseEnter={() => onHover(excerpt)} onMouseLeave={onLeave} style={{ cursor: "pointer" }} opacity={drawn ? 1 : 0}>
              <circle cx={pos.x} cy={pos.nodeY} r={radius + 4} fill="none" stroke={color}
                strokeWidth={isActive ? 1.5 : 0.5} opacity={isActive ? 0.8 : 0.2}
                style={{ transition: "all 0.3s ease" }} />
              <circle cx={pos.x} cy={pos.nodeY} r={isActive ? radius + 1 : radius}
                fill={isBlackHole ? "#1A1714" : color}
                stroke={isBlackHole ? "#FFFFFF" : "none"} strokeWidth={isBlackHole ? 1.5 : 0}
                filter={isActive || isBlackHole ? "url(#glow)" : "none"}
                style={{ transition: "all 0.3s ease" }} />
              {isBlackHole && (
                <circle cx={pos.x} cy={pos.nodeY} r={12} fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity={0.3}>
                  <animate attributeName="r" values="10;18;10" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
              )}
              {(isActive || isBlackHole || isPeak || excerpt.num === 1 || excerpt.num === 28 || excerpt.num === 49) && (
                <text x={pos.x} y={pos.nodeY - radius - 10} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif"
                  fontSize="8" fill={color} opacity={isActive ? 1 : 0.6} letterSpacing="1">
                  {isBlackHole ? "E27" : `E${excerpt.num}`}
                </text>
              )}
            </g>
          );
        })}

        <line x1={60} y1={200} x2={1140} y2={200} stroke="rgba(212,148,76,0.06)" strokeWidth="1" strokeDasharray="4,8" />

        <text x={40} y={145} fontFamily="'Space Grotesk', sans-serif" fontSize="8" fill="#D4944C" opacity={0.4} textAnchor="end" letterSpacing="1.5">BODY</text>
        <text x={40} y={260} fontFamily="'Space Grotesk', sans-serif" fontSize="8" fill="#7BA3C9" opacity={0.4} textAnchor="end" letterSpacing="1.5">MIND</text>
      </svg>
    </div>
  );
}

function ExcerptTooltip({ excerpt, visible }: { excerpt: Excerpt | null; visible: boolean }) {
  if (!excerpt || !visible) return null;
  const color = ARC_COLORS[excerpt.arc];

  return (
    <div style={{
      background: "rgba(20,18,15,0.95)", border: `1px solid ${color}40`,
      borderLeft: `3px solid ${color}`, borderRadius: "4px",
      padding: "20px 24px", maxWidth: "480px", backdropFilter: "blur(12px)",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", letterSpacing: "2px", color, textTransform: "uppercase", fontWeight: 600 }}>
          E{String(excerpt.num).padStart(2, "0")}
        </span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px", letterSpacing: "2px", color: "#6B5F52", textTransform: "uppercase" }}>
          {ARC_LABELS[excerpt.arc]}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#4A4139", marginLeft: "auto" }}>
          {excerpt.words.toLocaleString()}w
        </span>
      </div>

      <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#F0E6D6", marginBottom: "10px", lineHeight: 1.2 }}>
        {excerpt.title}
      </h3>

      <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", color: "#A89B8C", lineHeight: 1.6, fontStyle: "italic" }}>
        &ldquo;{excerpt.open}&rdquo;
      </p>

      <div style={{ display: "flex", gap: "6px", marginTop: "12px", flexWrap: "wrap" }}>
        {excerpt.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "1px", color: "#6B5F52",
            background: "rgba(212,148,76,0.06)", padding: "3px 8px", borderRadius: "2px", border: "1px solid rgba(212,148,76,0.08)"
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExcerptList({ activeExcerpt, onHover, onLeave }: {
  activeExcerpt: number | null;
  onHover: (e: Excerpt) => void;
  onLeave: () => void;
}) {
  const maxWords = Math.max(...EXCERPTS.map(e => e.words));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
      {EXCERPTS.map((excerpt) => {
        const color = ARC_COLORS[excerpt.arc];
        const isActive = activeExcerpt === excerpt.num;
        const widthPct = (excerpt.words / maxWords) * 100;
        const phase = getPhase(excerpt.num);
        const prevExcerpt = excerpt.num > 1 ? EXCERPTS[excerpt.num - 2] : null;
        const prevPhase = prevExcerpt ? getPhase(prevExcerpt.num) : null;
        const isNewPhase = phase && (!prevPhase || phase.label !== prevPhase.label);

        return (
          <div key={excerpt.num}>
            {isNewPhase && (
              <div style={{
                padding: "24px 0 8px", display: "flex", alignItems: "center", gap: "12px",
                borderTop: excerpt.num > 1 ? `1px solid rgba(212,148,76,0.06)` : "none",
                marginTop: excerpt.num > 1 ? "8px" : 0,
              }}>
                <div style={{ width: "3px", height: "14px", background: phase.color, borderRadius: "1px" }} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", letterSpacing: "3px", color: phase.color, textTransform: "uppercase", fontWeight: 600 }}>
                  {phase.label}
                </span>
              </div>
            )}
            <div onMouseEnter={() => onHover(excerpt)} onMouseLeave={onLeave} style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "8px 12px",
              borderRadius: "3px", cursor: "pointer",
              background: isActive ? "rgba(212,148,76,0.06)" : "transparent",
              transition: "background 0.2s ease",
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                color: isActive ? color : "#4A4139", width: "24px", textAlign: "right", flexShrink: 0,
                fontWeight: isActive ? 600 : 400, transition: "color 0.2s ease"
              }}>
                {String(excerpt.num).padStart(2, "0")}
              </span>
              <div style={{
                width: "4px", height: "4px", borderRadius: "50%", background: color, flexShrink: 0,
                opacity: isActive ? 1 : 0.4, transform: isActive ? "scale(1.5)" : "scale(1)",
                transition: "all 0.2s ease"
              }} />
              <span style={{
                fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "14px",
                color: isActive ? "#F0E6D6" : "#8A7D6E", flex: 1, minWidth: 0,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                transition: "color 0.2s ease"
              }}>
                {excerpt.title}
              </span>
              <div style={{
                width: "60px", height: "2px", flexShrink: 0,
                background: "rgba(212,148,76,0.06)", borderRadius: "1px", overflow: "hidden"
              }}>
                <div style={{
                  width: `${widthPct}%`, height: "100%",
                  background: isActive ? color : `${color}60`, borderRadius: "1px",
                  transition: "background 0.2s ease"
                }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Legend() {
  const items = [
    { color: "#D4944C", label: "Addiction" },
    { color: "#C43E3A", label: "Crisis" },
    { color: "#5B8C6A", label: "Recovery" },
    { color: "#D4749C", label: "Emily" },
    { color: "#7BA3C9", label: "Mental Health" },
    { color: "#7B6B8D", label: "Grief" },
    { color: "#8B9DAF", label: "Identity" },
    { color: "#FFFFFF", label: "E27 — Black Hole" },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", padding: "0 24px" }}>
      {items.map(item => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{
            width: item.label.includes("E27") ? "8px" : "10px",
            height: item.label.includes("E27") ? "8px" : "3px",
            borderRadius: item.label.includes("E27") ? "50%" : "1px",
            background: item.label.includes("E27") ? "transparent" : item.color,
            border: item.label.includes("E27") ? `1.5px solid ${item.color}` : "none"
          }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px", letterSpacing: "1.5px", color: "#6B5F52", textTransform: "uppercase" }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function BraidPage() {
  const [activeExcerpt, setActiveExcerpt] = useState<number | null>(null);
  const [hoveredData, setHoveredData] = useState<Excerpt | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleHover = useCallback((excerpt: Excerpt) => {
    setActiveExcerpt(excerpt.num);
    setHoveredData(excerpt);
  }, []);

  const handleLeave = useCallback(() => {
    setActiveExcerpt(null);
    setHoveredData(null);
  }, []);

  return (
    <div style={{
      padding: '100px 0 32px',
      background: '#1A1714',
      color: '#F0E6D6',
      minHeight: '100vh',
      fontFamily: "'Source Serif 4', Georgia, serif",
      opacity: mounted ? 1 : 0,
      transition: 'opacity 0.6s ease',
    }}>
      {/* Back nav */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 20px' }}>
        <a href="/memoir" style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '1px',
          color: '#6B5F52', textDecoration: 'none', transition: 'color 0.2s ease',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#D4944C')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B5F52')}
        >
          &larr; MEMOIR
        </a>
      </div>

      {/* Header */}
      <header style={{ padding: "0 24px 40px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "4px", color: "#D4944C", textTransform: "uppercase", marginBottom: "20px" }}>
          Manuscript Architecture
        </p>
        <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 300, color: "#F0E6D6", lineHeight: 1.1, marginBottom: "12px" }}>
          The Braid
        </h1>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "18px", color: "#8A7D6E", fontStyle: "italic", marginBottom: "8px" }}>
          49 excerpts &middot; 52,595 words &middot; Two arcs &middot; One architecture
        </p>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "15px", color: "#6B5F52", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6, marginTop: "20px" }}>
          Two threads run through this memoir. The first is the body — addiction,
          recovery, the physical choreography of dependence. The second is the mind —
          diagnosis, mania, the architecture of a brain that can&apos;t stop building.
          They weave, cross, and converge. The shape is the story.
        </p>
      </header>

      {/* Legend */}
      <div style={{ marginBottom: "32px" }}>
        <Legend />
      </div>

      {/* The Braid SVG */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 32px" }}>
        <BraidVisualization onHover={handleHover} onLeave={handleLeave} activeExcerpt={activeExcerpt} />
      </div>

      {/* Main content: tooltip + list */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 24px 80px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start",
      }}>
        <div style={{ position: "sticky", top: "80px" }}>
          {hoveredData ? (
            <ExcerptTooltip excerpt={hoveredData} visible={true} />
          ) : (
            <div style={{ padding: "40px", textAlign: "center" }}>
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "16px", color: "#4A4139", fontStyle: "italic", lineHeight: 1.6 }}>
                Hover over any node in the braid<br />or any title in the index to reveal<br />the excerpt beneath.
              </p>
            </div>
          )}

          <div style={{ marginTop: "40px" }}>
            {[
              { label: "E27", title: "The Black Hole", desc: "427 words. The shortest excerpt. The darkest moment. Maximum gravity, minimum language.", color: "#FFFFFF" },
              { label: "E36", title: "Our People", desc: "2,132 words. The longest excerpt. The wedding. Maximum emotional investment.", color: "#D4749C" },
              { label: "E34", title: "Loose Ends", desc: "Matt\u2019s death. At the structural center. The one crisis Dave didn\u2019t cause.", color: "#7B6B8D" },
            ].map((callout, i) => (
              <div key={i} style={{
                display: "flex", gap: "12px", marginBottom: "16px", padding: "12px 16px",
                borderLeft: `2px solid ${callout.color}30`, opacity: 0.7,
              }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: callout.color, textTransform: "uppercase", flexShrink: 0, fontWeight: 600, marginTop: "2px" }}>
                  {callout.label}
                </span>
                <div>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "14px", color: "#A89B8C", marginBottom: "2px" }}>{callout.title}</p>
                  <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "12px", color: "#6B5F52", lineHeight: 1.5 }}>{callout.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ExcerptList activeExcerpt={activeExcerpt} onHover={handleHover} onLeave={handleLeave} />
        </div>
      </div>

      {/* Thesis */}
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px", textAlign: "center", borderTop: "1px solid rgba(212,148,76,0.06)" }}>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "22px", fontWeight: 300, color: "#A89B8C", lineHeight: 1.6, fontStyle: "italic", marginBottom: "24px" }}>
          &ldquo;Sometimes love is certified mail.&rdquo;
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "3px", color: "#3D362F", textTransform: "uppercase" }}>
          Little to Know Experience &middot; Dave Kitchens
          <br />
          The gap between living it and knowing it.
        </p>
      </div>
    </div>
  );
}
