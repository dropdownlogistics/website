'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// ── DATA ──────────────────────────────────────────────────────────────────────

// Excerpt 10 = Friday March 20, 2026. Weekly Fridays. 50 total.
// BTS 9 = Tuesday March 17, 2026. Weekly Tuesdays.

function addWeeks(date: Date, weeks: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

const EXCERPT_ANCHOR = { num: 10, date: new Date('2026-03-20') };
const BTS_ANCHOR     = { num: 9,  date: new Date('2026-03-17') };
const TODAY          = new Date('2026-03-17');

function buildExcerpts() {
  return Array.from({ length: 50 }, (_, i) => {
    const num = i + 1;
    const weeksFromAnchor = num - EXCERPT_ANCHOR.num;
    const date = addWeeks(EXCERPT_ANCHOR.date, weeksFromAnchor);
    return { num, date, published: date <= TODAY };
  });
}

function buildBTS() {
  return Array.from({ length: 50 }, (_, i) => {
    const num = i + 1;
    const weeksFromAnchor = num - BTS_ANCHOR.num;
    const date = addWeeks(BTS_ANCHOR.date, weeksFromAnchor);
    return { num, date, published: date < TODAY };
  });
}

const excerpts = buildExcerpts();
const btsEntries = buildBTS();

function fmt(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function MemoirReleaseCalendarPage() {
  const [view, setView] = useState<'combined' | 'excerpts' | 'bts'>('combined');
  const [showAll, setShowAll] = useState(false);

  const publishedExcerpts = excerpts.filter(e => e.published).length;
  const publishedBTS = btsEntries.filter(b => b.published).length;

  // Combined timeline — merge and sort
  const combined = [
    ...excerpts.map(e => ({ ...e, type: 'excerpt' as const })),
    ...btsEntries.map(b => ({ ...b, type: 'bts' as const })),
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  const displayCombined = showAll ? combined : combined.slice(0, 30);
  const displayExcerpts = showAll ? excerpts : excerpts.slice(0, 20);
  const displayBTS = showAll ? btsEntries : btsEntries.slice(0, 20);

  const styles: Record<string, React.CSSProperties> = {
    page: {
      padding: '88px 24px 64px',
      maxWidth: 1000,
      margin: '0 auto',
    },
    eyebrow: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.6rem',
      letterSpacing: '0.16em',
      textTransform: 'uppercase' as const,
      color: '#B23531',
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    eyebrowLine: {
      display: 'block',
      width: 20,
      height: 1,
      background: '#B23531',
    },
    h1: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
      fontWeight: 700,
      color: '#F5F1EB',
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      marginBottom: 10,
    },
    sub: {
      fontFamily: 'Source Serif 4, serif',
      fontSize: '1rem',
      color: 'rgba(245,241,235,0.6)',
      lineHeight: 1.7,
      maxWidth: 620,
      marginBottom: 28,
    },
    // Progress
    progressRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginBottom: 32,
    },
    progressCard: {
      background: '#10202F',
      border: '1px solid rgba(245,241,235,0.06)',
      borderRadius: 8,
      padding: '18px 22px',
    },
    progressLabel: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.58rem',
      color: 'rgba(107,123,141,1)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
      marginBottom: 8,
    },
    progressCount: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontWeight: 700,
      fontSize: '1.8rem',
      letterSpacing: '-0.03em',
      color: '#F5F1EB',
      marginBottom: 8,
    },
    progressBar: {
      height: 3,
      background: 'rgba(245,241,235,0.06)',
      borderRadius: 2,
      overflow: 'hidden' as const,
      marginBottom: 6,
    },
    progressMeta: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.58rem',
      color: 'rgba(107,123,141,0.8)',
      letterSpacing: '0.04em',
    },
    // Tabs
    tabs: {
      display: 'flex',
      gap: 2,
      marginBottom: 24,
      background: '#10202F',
      border: '1px solid rgba(245,241,235,0.06)',
      borderRadius: 6,
      padding: 3,
      width: 'fit-content',
    },
    tab: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.62rem',
      letterSpacing: '0.06em',
      padding: '7px 16px',
      borderRadius: 4,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.15s',
    },
    // Table
    tableWrap: {
      background: '#10202F',
      border: '1px solid rgba(245,241,235,0.06)',
      borderRadius: 8,
      overflow: 'hidden' as const,
      marginBottom: 16,
    },
    tableHeader: {
      display: 'grid',
      padding: '10px 18px',
      background: '#0B1825',
      borderBottom: '1px solid rgba(245,241,235,0.06)',
    },
    tableRow: {
      display: 'grid',
      padding: '12px 18px',
      borderBottom: '1px solid rgba(245,241,235,0.04)',
      alignItems: 'center',
      transition: 'background 0.12s',
    },
    // Nav
    navRow: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap' as const,
      marginBottom: 28,
    },
    navBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '9px 14px',
      borderRadius: 6,
      background: 'rgba(245,241,235,0.04)',
      border: '1px solid rgba(245,241,235,0.08)',
      color: '#F5F1EB',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.62rem',
      letterSpacing: '0.06em',
      textDecoration: 'none',
      cursor: 'pointer',
    },
  };

  const excerptPct = (publishedExcerpts / 50) * 100;
  const btsPct = (publishedBTS / 50) * 100;

  return (
    <div style={styles.page}>

      {/* NAV */}
      <div style={styles.navRow}>
        <Link href="/memoir" style={styles.navBtn}>← Memoir hub</Link>
        <a
          href="https://substack.com/@ddlogistics"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.navBtn, color: '#B23531', borderColor: 'rgba(178,53,49,0.25)', background: 'rgba(178,53,49,0.06)' }}
        >
          Read on Substack →
        </a>
      </div>

      {/* HEADER */}
      <div style={{ marginBottom: 28 }}>
        <div style={styles.eyebrow}>
          <span style={styles.eyebrowLine}></span>
          D.K. Hale · Little to Know Experience
        </div>
        <h1 style={styles.h1}>Release Calendar</h1>
        <p style={styles.sub}>
          50 excerpts publishing every Friday. Behind-the-scenes posts every Tuesday.
          52,595 words. Two crisis arcs connected by sobriety, systems thinking, and reasonable assurance.
        </p>
      </div>

      {/* PROGRESS */}
      <div style={styles.progressRow}>
        <div style={styles.progressCard}>
          <div style={styles.progressLabel}>Excerpts · Fridays</div>
          <div style={styles.progressCount}>{publishedExcerpts} <span style={{ fontSize: '1rem', color: 'rgba(245,241,235,0.4)', fontWeight: 400 }}>/ 50</span></div>
          <div style={styles.progressBar}>
            <div style={{ height: '100%', width: `${excerptPct}%`, background: '#B23531', borderRadius: 2 }} />
          </div>
          <div style={styles.progressMeta}>Next: Excerpt {publishedExcerpts + 1} · Fri Mar 20</div>
        </div>
        <div style={styles.progressCard}>
          <div style={styles.progressLabel}>Behind the Scenes · Tuesdays</div>
          <div style={styles.progressCount}>{publishedBTS} <span style={{ fontSize: '1rem', color: 'rgba(245,241,235,0.4)', fontWeight: 400 }}>/ 50</span></div>
          <div style={styles.progressBar}>
            <div style={{ height: '100%', width: `${btsPct}%`, background: '#C49A3C', borderRadius: 2 }} />
          </div>
          <div style={styles.progressMeta}>Writing: BTS 9 · Tue Mar 17</div>
        </div>
      </div>

      {/* TABS */}
      <div style={styles.tabs}>
        {(['combined', 'excerpts', 'bts'] as const).map(t => (
          <button
            key={t}
            onClick={() => { setView(t); setShowAll(false); }}
            style={{
              ...styles.tab,
              background: view === t ? 'rgba(178,53,49,0.15)' : 'transparent',
              color: view === t ? '#F5F1EB' : 'rgba(107,123,141,0.8)',
              borderColor: view === t ? 'rgba(178,53,49,0.3)' : 'transparent',
            }}
          >
            {t === 'combined' ? 'All Posts' : t === 'excerpts' ? 'Excerpts' : 'Behind the Scenes'}
          </button>
        ))}
      </div>

      {/* COMBINED VIEW */}
      {view === 'combined' && (
        <div style={styles.tableWrap}>
          <div style={{ ...styles.tableHeader, gridTemplateColumns: '60px 80px 110px 1fr 80px' }}>
            {['#', 'Type', 'Date', 'Day', 'Status'].map(h => (
              <span key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(107,123,141,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>
          {displayCombined.map((item, i) => {
            const isExcerpt = item.type === 'excerpt';
            const isToday = item.date.toDateString() === TODAY.toDateString();
            const accent = isExcerpt ? '#B23531' : '#C49A3C';
            return (
              <div
                key={`${item.type}-${item.num}`}
                style={{
                  ...styles.tableRow,
                  gridTemplateColumns: '60px 80px 110px 1fr 80px',
                  background: isToday ? 'rgba(196,154,60,0.06)' : item.published ? 'transparent' : 'rgba(245,241,235,0.01)',
                  borderBottom: i === displayCombined.length - 1 ? 'none' : '1px solid rgba(245,241,235,0.04)',
                }}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'rgba(107,123,141,0.6)' }}>
                  {String(item.num).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: accent, letterSpacing: '0.06em' }}>
                  {isExcerpt ? 'Excerpt' : 'BTS'}
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: item.published ? '#F5F1EB' : 'rgba(245,241,235,0.35)' }}>
                  {fmt(item.date)}
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'rgba(107,123,141,0.6)' }}>
                  {item.date.toLocaleDateString('en-US', { weekday: 'long' })}
                  {isToday && <span style={{ color: '#C49A3C', marginLeft: 8 }}>← today</span>}
                </span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.58rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: item.published ? '#22C55E' : isToday ? '#C49A3C' : 'rgba(107,123,141,0.5)',
                }}>
                  {item.published ? 'Live' : isToday ? 'Today' : 'Upcoming'}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* EXCERPTS VIEW */}
      {view === 'excerpts' && (
        <div style={styles.tableWrap}>
          <div style={{ ...styles.tableHeader, gridTemplateColumns: '60px 130px 1fr 80px' }}>
            {['#', 'Date', 'Day', 'Status'].map(h => (
              <span key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(107,123,141,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>
          {displayExcerpts.map((item, i) => (
            <div
              key={item.num}
              style={{
                ...styles.tableRow,
                gridTemplateColumns: '60px 130px 1fr 80px',
                background: item.published ? 'transparent' : 'rgba(245,241,235,0.01)',
                borderBottom: i === displayExcerpts.length - 1 ? 'none' : '1px solid rgba(245,241,235,0.04)',
              }}
            >
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: item.published ? '#B23531' : 'rgba(107,123,141,0.5)' }}>
                {String(item.num).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: item.published ? '#F5F1EB' : 'rgba(245,241,235,0.35)' }}>
                {fmt(item.date)}
              </span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'rgba(107,123,141,0.55)' }}>Friday</span>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.58rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: item.published ? '#22C55E' : 'rgba(107,123,141,0.5)',
              }}>
                {item.published ? 'Live' : 'Upcoming'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* BTS VIEW */}
      {view === 'bts' && (
        <div style={styles.tableWrap}>
          <div style={{ ...styles.tableHeader, gridTemplateColumns: '60px 130px 1fr 80px' }}>
            {['#', 'Date', 'Day', 'Status'].map(h => (
              <span key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'rgba(107,123,141,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>
          {displayBTS.map((item, i) => {
            const isToday = item.date.toDateString() === TODAY.toDateString();
            return (
              <div
                key={item.num}
                style={{
                  ...styles.tableRow,
                  gridTemplateColumns: '60px 130px 1fr 80px',
                  background: isToday ? 'rgba(196,154,60,0.06)' : 'transparent',
                  borderBottom: i === displayBTS.length - 1 ? 'none' : '1px solid rgba(245,241,235,0.04)',
                }}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: item.published ? '#C49A3C' : 'rgba(107,123,141,0.5)' }}>
                  {String(item.num).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: item.published || isToday ? '#F5F1EB' : 'rgba(245,241,235,0.35)' }}>
                  {fmt(item.date)}
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'rgba(107,123,141,0.55)' }}>
                  Tuesday {isToday && <span style={{ color: '#C49A3C', marginLeft: 8 }}>← writing today</span>}
                </span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.58rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: item.published ? '#22C55E' : isToday ? '#C49A3C' : 'rgba(107,123,141,0.5)',
                }}>
                  {item.published ? 'Live' : isToday ? 'Writing' : 'Upcoming'}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* SHOW MORE */}
      {!showAll && (
        <button
          onClick={() => setShowAll(true)}
          style={{
            width: '100%',
            padding: '12px',
            background: 'rgba(245,241,235,0.03)',
            border: '1px solid rgba(245,241,235,0.07)',
            borderRadius: 6,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.62rem',
            color: 'rgba(245,241,235,0.4)',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            marginBottom: 32,
          }}
        >
          Show full schedule →
        </button>
      )}

      {/* FOOTER NOTE */}
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.58rem',
        color: 'rgba(245,241,235,0.2)',
        letterSpacing: '0.06em',
        lineHeight: 1.8,
        borderTop: '1px solid rgba(245,241,235,0.05)',
        paddingTop: 20,
      }}>
        Excerpts every Friday · Behind the Scenes every Tuesday · 50 total · Publishing through late 2026<br />
        Read at substack.com/@ddlogistics · Written by D.K. Hale
      </div>

    </div>
  );
}
