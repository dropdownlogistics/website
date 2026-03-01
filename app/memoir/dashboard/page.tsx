'use client';

import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// MEMOIR DASHBOARD
// Manuscript Tracker · Little to Know Experience
// 49 Excerpts · 7 Acts · Publish cadence + progress
// Native CottageHumble design system
// ═══════════════════════════════════════════════════════════════

interface ExcerptData {
  num: number;
  title: string;
  words: number;
  tags: string[];
  published: boolean;
  bts: string | null;
  note?: string;
}

interface ArcData {
  label: string;
  range: [number, number];
  desc: string;
}

const COLORS = {
  navy: '#0F1A2E',
  navyLight: '#1a2a44',
  crimson: '#B23531',
  wine: '#97072F',
  cream: '#F5F1EB',
  muted: '#8a9bb5',
  bg: '#0a1020',
  gold: '#D4A842',
  pink: '#E879A0',
  green: '#2D8F5E',
};

const excerpts: ExcerptData[] = [
  // ACT I — The Foundation (1–6)
  { num: 1, title: "Perspective", words: 1135, tags: ["sobriety", "quiet", "identity"], published: true, bts: "BTS-001" },
  { num: 2, title: "Lake Night", words: 1407, tags: ["first-drink", "quiet", "friendship"], published: true, bts: "BTS-002" },
  { num: 3, title: "The Coming Storm", words: 1874, tags: ["escalation", "storm", "consequence"], published: true, bts: "BTS-003" },
  { num: 4, title: "3 South", words: 1574, tags: ["college", "blackout", "limits"], published: true, bts: "BTS-004" },
  { num: 5, title: "Drink Drink Drink", words: 1183, tags: ["keg", "belonging", "permission"], published: true, bts: "BTS-005" },
  { num: 6, title: "The Dance", words: 1193, tags: ["productivity", "garage", "routine"], published: true, bts: "BTS-006" },
  // ACT II — The Discovery (7–13)
  { num: 7, title: "The Rhythm", words: 716, tags: ["ritual", "choreography", "kitchen"], published: true, bts: null },
  { num: 8, title: "Loneliness or Freedom?", words: 592, tags: ["isolation", "texting", "deletion"], published: false, bts: null },
  { num: 9, title: "GMAT", words: 619, tags: ["avoidance", "winging-it", "procrastination"], published: false, bts: null },
  { num: 10, title: "21", words: 679, tags: ["birthday", "prairie-fire"], published: false, bts: null },
  { num: 11, title: "The Hill", words: 1106, tags: ["graduation", "KU", "pride"], published: false, bts: null },
  { num: 12, title: "Tulsa", words: 1284, tags: ["new-city", "ONEOK", "cohort"], published: false, bts: null },
  { num: 13, title: "The First Hiding", words: 1333, tags: ["hiding", "game-day", "hangover"], published: false, bts: null },
  // ACT III — The Professional Mask (14–20)
  { num: 14, title: "Liberty Tower, 13J", words: 1075, tags: ["condo", "Cole", "freedom"], published: false, bts: null },
  { num: 15, title: "Pre-game", words: 809, tags: ["pregame", "walking", "downtown"], published: false, bts: null },
  { num: 16, title: "October 2009 (Train Shot)", words: 596, tags: ["girlfriend", "bar", "train-shot"], published: false, bts: null },
  { num: 17, title: "CPA", words: 1214, tags: ["CPA", "failure", "avoidance"], published: false, bts: null },
  { num: 18, title: "KC / First Breakup", words: 889, tags: ["breakup", "parents", "relief"], published: false, bts: null },
  { num: 19, title: "August 2011 (The Dewey)", words: 1209, tags: ["DUI", "arrest", "jail"], published: false, bts: null },
  { num: 20, title: "The Aftermath", words: 1360, tags: ["aftermath", "lawyer", "diversion"], published: false, bts: null },
  // ACT IV — The Spiral (21–28)
  { num: 21, title: "Working, Until It Wasn\u2019t", words: 1642, tags: ["Stinnett", "Kendra", "confrontation"], published: false, bts: null },
  { num: 22, title: "My Second Job", words: 1604, tags: ["liquor-store", "daily", "blackout"], published: false, bts: null },
  { num: 23, title: "The Second First Drink", words: 1668, tags: ["relapse", "Cherry-Street", "60-days"], published: false, bts: null },
  { num: 24, title: "Basement / Vacation Home", words: 1431, tags: ["parents-basement", "hiding", "empties"], published: false, bts: null },
  { num: 25, title: "The Median", words: 1245, tags: ["crash", "median", "vow", "relapse"], published: false, bts: null, note: "merged" },
  { num: 26, title: "The Third First Drink", words: 513, tags: ["desk-drinking", "suicidal-ideation"], published: false, bts: null },
  { num: 27, title: "The Walrus", words: 1310, tags: ["sobriety-day", "detox", "hallucination"], published: false, bts: null },
  { num: 28, title: "I\u2019m CEO, Bitch", words: 521, tags: ["consulting", "independence", "sobriety"], published: false, bts: null },
  // ACT V — The False Summit (29–36)
  { num: 29, title: "Coffee Meets Bagel", words: 580, tags: ["dating", "apps", "gauntlet"], published: false, bts: null, note: "split" },
  { num: 30, title: "Emily", words: 730, tags: ["sushi", "D&D", "olive-joke", "hope"], published: false, bts: null, note: "split" },
  { num: 31, title: "The Road", words: 1092, tags: ["travel", "hourly", "COVID"], published: false, bts: null },
  { num: 32, title: "Quarterly SOX Reporting", words: 875, tags: ["proposal", "D&D", "COVID"], published: false, bts: null },
  { num: 33, title: "Mondo Condo", words: 1262, tags: ["Austin", "house", "fired"], published: false, bts: null },
  { num: 34, title: "Loose Ends", words: 1907, tags: ["Matt", "death", "grief"], published: false, bts: null },
  { num: 35, title: "Benched", words: 744, tags: ["unemployment", "pool", "hospital-startup"], published: false, bts: null },
  { num: 36, title: "Our People", words: 1623, tags: ["wedding", "Emily", "brother"], published: false, bts: null },
  // ACT VI — The Unraveling (37–44)
  { num: 37, title: "Material Weakness", words: 979, tags: ["controller", "fog", "payroll"], published: false, bts: null },
  { num: 38, title: "Going Concern", words: 537, tags: ["unemployment", "Kendra", "divine-intervention"], published: false, bts: null },
  { num: 39, title: "To The Moon", words: 607, tags: ["data-analytics", "raise", "Alteryx"], published: false, bts: null },
  { num: 40, title: "Whiplash", words: 1412, tags: ["reprimand", "Tampa", "politics"], published: false, bts: null },
  { num: 41, title: "Overclocked", words: 1182, tags: ["mania", "insomnia", "spending"], published: false, bts: null },
  { num: 42, title: "The Audit", words: 1380, tags: ["diagnosis", "Bipolar-II", "ADHD"], published: false, bts: null },
  { num: 43, title: "Trendline (The Ramp)", words: 675, tags: ["ramp", "Diablo", "mania"], published: false, bts: null },
  { num: 44, title: "Catastrophic Failure", words: 1323, tags: ["bed", "disability", "denial"], published: false, bts: null },
  // ACT VII — Reasonable Assurance (45–49)
  { num: 45, title: "Dinner for Two", words: 573, tags: ["job-search", "AI-interview", "hope"], published: false, bts: null },
  { num: 46, title: "Return to Office", words: 727, tags: ["first-day", "Psych", "coffee"], published: false, bts: null },
  { num: 47, title: "Internal Control", words: 1167, tags: ["audit", "manager", "process"], published: false, bts: null },
  { num: 48, title: "Unqualified Opinion", words: 533, tags: ["normal", "calibrated", "work"], published: false, bts: null },
  { num: 49, title: "Reasonable Assurance", words: 1639, tags: ["peace", "quiet", "Christmas"], published: false, bts: null },
];

const totalWords = excerpts.reduce((sum, e) => sum + e.words, 0);
const publishedCount = excerpts.filter((e) => e.published).length;

const arcs: ArcData[] = [
  { label: "The Foundation", range: [1, 6], desc: "Before the first drink" },
  { label: "The Discovery", range: [7, 13], desc: "Alcohol arrives as solution" },
  { label: "The Professional Mask", range: [14, 20], desc: "Hiding inside professionalism" },
  { label: "The Spiral", range: [21, 28], desc: "Rock bottom isn\u2019t a single event" },
  { label: "The False Summit", range: [29, 36], desc: "The reader thinks the story is over" },
  { label: "The Unraveling", range: [37, 44], desc: "Same engine, no containment" },
  { label: "Reasonable Assurance", range: [45, 49], desc: "Not certainty. Enough." },
];

function getArc(num: number): ArcData | undefined {
  return arcs.find((a) => num >= a.range[0] && num <= a.range[1]);
}

function WordBar({ words, maxWords }: { words: number; maxWords: number }) {
  const pct = (words / maxWords) * 100;
  return (
    <div style={{
      width: "60px", height: "4px",
      background: "rgba(255,255,255,0.06)",
      borderRadius: "2px", overflow: "hidden", flexShrink: 0,
    }}>
      <div style={{
        width: `${pct}%`, height: "100%",
        background: `linear-gradient(90deg, ${COLORS.crimson}, ${COLORS.wine})`,
        borderRadius: "2px",
      }} />
    </div>
  );
}

function ExcerptRow({ excerpt, maxWords, isNewArc, arc }: {
  excerpt: ExcerptData;
  maxWords: number;
  isNewArc: boolean;
  arc: ArcData | undefined;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {isNewArc && arc && (
        <div style={{
          padding: "32px 0 12px",
          borderTop: `1px solid rgba(178,53,49,0.2)`,
          marginTop: "16px",
        }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "11px", fontWeight: 600,
            letterSpacing: "2px", textTransform: "uppercase",
            color: COLORS.crimson,
          }}>
            {arc.label}
          </div>
          <div style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "13px", color: COLORS.muted,
            marginTop: "2px", fontStyle: "italic",
          }}>
            {arc.desc}
          </div>
        </div>
      )}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: "16px",
          padding: "14px 16px", borderRadius: "6px",
          cursor: excerpt.published ? "pointer" : "default",
          transition: "all 0.2s ease",
          background: hovered && excerpt.published ? "rgba(255,255,255,0.03)" : "transparent",
          opacity: excerpt.published ? 1 : 0.45,
        }}
      >
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          color: excerpt.published ? COLORS.crimson : COLORS.muted,
          width: "28px", textAlign: "right", flexShrink: 0, fontWeight: 500,
        }}>
          {String(excerpt.num).padStart(2, "0")}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "16px",
            color: excerpt.published ? COLORS.cream : "rgba(245,241,235,0.5)",
            lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden",
            textOverflow: "ellipsis", display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span>{excerpt.title}</span>
            {excerpt.note === "merged" && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                color: COLORS.gold, border: `1px solid rgba(212,168,66,0.4)`,
                borderRadius: "3px", padding: "1px 5px", letterSpacing: "0.5px", flexShrink: 0,
              }}>MERGED</span>
            )}
            {excerpt.note === "split" && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                color: COLORS.pink, border: `1px solid rgba(232,121,160,0.4)`,
                borderRadius: "3px", padding: "1px 5px", letterSpacing: "0.5px", flexShrink: 0,
              }}>SPLIT</span>
            )}
          </div>
          {excerpt.published && hovered && (
            <div style={{ display: "flex", gap: "6px", marginTop: "4px", flexWrap: "wrap" }}>
              {excerpt.tags.slice(0, 3).map((tag) => (
                <span key={tag} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                  color: COLORS.muted, background: "rgba(255,255,255,0.04)",
                  padding: "2px 8px", borderRadius: "3px",
                }}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        <WordBar words={excerpt.words} maxWords={maxWords} />

        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px", color: COLORS.muted,
          width: "45px", textAlign: "right", flexShrink: 0,
        }}>
          {excerpt.words.toLocaleString()}
        </div>

        <div style={{ width: "120px", textAlign: "right", flexShrink: 0 }}>
          {excerpt.published ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end" }}>
              {excerpt.bts && (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                  color: COLORS.wine, border: `1px solid rgba(151,7,47,0.3)`,
                  padding: "2px 6px", borderRadius: "3px", letterSpacing: "0.5px",
                }}>BTS</span>
              )}
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px",
                fontWeight: 500, color: COLORS.crimson, letterSpacing: "0.5px",
              }}>
                READ &rarr;
              </span>
            </div>
          ) : (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
              color: "rgba(138,155,181,0.4)", letterSpacing: "0.5px",
            }}>coming soon</span>
          )}
        </div>
      </div>
    </>
  );
}

function ProgressRing() {
  const pct = (publishedCount / excerpts.length) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div style={{ position: "relative", width: "100px", height: "100px" }}>
      <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={COLORS.crimson} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700, color: COLORS.cream }}>
          {publishedCount}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: COLORS.muted }}>
          of {excerpts.length}
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const maxWords = Math.max(...excerpts.map((e) => e.words));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.bg,
      color: COLORS.cream,
      fontFamily: "'Source Serif 4', Georgia, serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Grain overlay */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }} />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { opacity: 0; animation: fadeUp 0.6s ease forwards; }
        .fade-in-1 { animation-delay: 0.1s; }
        .fade-in-2 { animation-delay: 0.25s; }
        .fade-in-3 { animation-delay: 0.4s; }
        .fade-in-4 { animation-delay: 0.55s; }
        ::selection { background: ${COLORS.crimson}; color: ${COLORS.cream}; }
      `}</style>

      <div style={{
        maxWidth: "860px", margin: "0 auto",
        padding: "100px 24px 80px",
        position: "relative", zIndex: 1,
      }}>
        {/* Breadcrumb */}
        <div className="fade-in fade-in-1" style={{ marginBottom: "48px" }}>
          <a href="/memoir" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
            color: COLORS.muted, letterSpacing: "1.5px", textTransform: "uppercase",
            textDecoration: 'none', transition: 'color 0.2s ease',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.crimson)}
            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.muted)}
          >
            &larr; DDL / Memoir / Dashboard
          </a>
        </div>

        {/* Hero */}
        <div className="fade-in fade-in-2">
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700, color: COLORS.cream,
            lineHeight: 1.1, marginBottom: "12px",
          }}>
            Little to Know Experience
          </h1>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "18px", color: COLORS.muted,
            lineHeight: 1.5, maxWidth: "560px", marginBottom: "32px",
          }}>
            A memoir in 49 excerpts about sobriety, marriage, systems thinking,
            and the architecture of getting your life back.
          </p>

          <blockquote style={{
            borderLeft: `3px solid ${COLORS.crimson}`,
            paddingLeft: "20px", marginBottom: "48px",
          }}>
            <p style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontStyle: "italic", fontSize: "20px",
              color: COLORS.cream, lineHeight: 1.4,
            }}>
              &ldquo;Sometimes love is certified mail.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Stats row */}
        <div className="fade-in fade-in-3" style={{
          display: "flex", alignItems: "center", gap: "40px",
          marginBottom: "56px", flexWrap: "wrap",
        }}>
          <ProgressRing />
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              { value: "49", label: "Excerpts" },
              { value: totalWords.toLocaleString(), label: "Words" },
              { value: "21", label: "Years" },
              { value: "7", label: "Acts" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "24px", fontWeight: 700, color: COLORS.cream,
                }}>{stat.value}</div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "11px", color: COLORS.muted,
                  letterSpacing: "1px", textTransform: "uppercase", marginTop: "2px",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Publishing cadence */}
        <div className="fade-in fade-in-3" style={{
          display: "flex", gap: "24px", marginBottom: "56px", flexWrap: "wrap",
        }}>
          <div style={{
            background: "rgba(178,53,49,0.08)", border: `1px solid rgba(178,53,49,0.15)`,
            borderRadius: "8px", padding: "16px 20px", flex: 1, minWidth: "200px",
          }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 600,
              color: COLORS.crimson, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px",
            }}>Fridays</div>
            <div style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "14px", color: COLORS.cream, lineHeight: 1.4,
            }}>New excerpt release</div>
          </div>
          <div style={{
            background: "rgba(151,7,47,0.06)", border: `1px solid rgba(151,7,47,0.12)`,
            borderRadius: "8px", padding: "16px 20px", flex: 1, minWidth: "200px",
          }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 600,
              color: COLORS.wine, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px",
            }}>Tuesdays</div>
            <div style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "14px", color: COLORS.cream, lineHeight: 1.4,
            }}>Behind the scenes &mdash; recap &amp; tease</div>
          </div>
        </div>

        {/* Version badge */}
        <div className="fade-in fade-in-3" style={{ marginBottom: "40px" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
            color: COLORS.green, border: `1px solid ${COLORS.green}`,
            borderRadius: "3px", padding: "3px 10px", letterSpacing: "1px",
          }}>
            CANONICAL v2.0 &mdash; RECONCILED MARCH 2026
          </span>
        </div>

        {/* Section divider */}
        <div className="fade-in fade-in-4" style={{
          display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px",
        }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 600,
            letterSpacing: "2px", textTransform: "uppercase", color: COLORS.cream,
          }}>The Excerpts</div>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, rgba(255,255,255,0.1), transparent)` }} />
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: COLORS.muted,
          }}>
            {publishedCount} published &middot; {excerpts.length - publishedCount} upcoming
          </div>
        </div>

        {/* Excerpt list */}
        <div className="fade-in fade-in-4">
          {excerpts.map((excerpt, i) => {
            const arc = getArc(excerpt.num);
            const prevArc = i > 0 ? getArc(excerpts[i - 1].num) : null;
            const isNewArc = !!(arc && (!prevArc || arc.label !== prevArc.label));

            return (
              <ExcerptRow
                key={excerpt.num}
                excerpt={excerpt}
                maxWords={maxWords}
                isNewArc={isNewArc}
                arc={arc}
              />
            );
          })}
        </div>

        {/* Bottom cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px", marginTop: "64px",
        }}>
          {[
            { title: "The Forewords", desc: "9 AI models wrote forewords from architecture alone", link: "/forewords", accent: COLORS.crimson },
            { title: "Manuscript Map", desc: "7-act structural architecture across all 49 excerpts", link: "/memoir/architecture", accent: COLORS.wine },
            { title: "The Braid", desc: "Dual-arc timeline visualization of the manuscript", link: "/memoir/braid", accent: COLORS.muted },
          ].map((card) => (
            <a
              key={card.title}
              href={card.link}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px", padding: "24px",
                cursor: "pointer", transition: "all 0.2s ease",
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = card.accent;
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px",
                fontWeight: 600, color: COLORS.cream, marginBottom: "6px",
              }}>{card.title}</div>
              <div style={{
                fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "13px",
                color: COLORS.muted, lineHeight: 1.4,
              }}>{card.desc}</div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: "64px", padding: "24px 0",
          borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontStyle: "italic", fontSize: "14px",
            color: "rgba(138,155,181,0.5)", lineHeight: 1.5,
          }}>
            The gap between living it and knowing it.
          </p>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
            color: "rgba(138,155,181,0.3)", marginTop: "8px", letterSpacing: "1px",
          }}>
            Filed by Dave Kitchens &middot; Chaos &rarr; Structured &rarr; Automated
          </p>
        </div>
      </div>
    </div>
  );
}
