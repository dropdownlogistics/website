'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type Section = { title: string; slug: string; preview: string; content: string };

/* ─── simple markdown-ish renderer (no dependency) ─── */
function RenderContent({ text }: { text: string }) {
  const html = useMemo(() => {
    let h = text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      // headers
      .replace(/^### (.+)$/gm, '<h3 style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;color:#F5F1EB;margin:24px 0 8px;letter-spacing:-0.01em">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 style="font-family:Space Grotesk,sans-serif;font-size:20px;font-weight:600;color:#F5F1EB;margin:28px 0 10px;letter-spacing:-0.01em">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 style="font-family:Space Grotesk,sans-serif;font-size:24px;font-weight:700;color:#F5F1EB;margin:32px 0 12px;letter-spacing:-0.02em">$1</h1>')
      // bold
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#F5F1EB;font-weight:600">$1</strong>')
      // code
      .replace(/`([^`]+)`/g, '<code style="font-family:JetBrains Mono,monospace;font-size:12px;padding:2px 6px;border-radius:3px;background:rgba(255,255,255,0.05);color:rgba(245,241,235,0.7)">$1</code>')
      // horizontal rules / dividers
      .replace(/^[-─=]{4,}$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:20px 0" />')
      // bullet points
      .replace(/^[•·]\s+(.+)$/gm, '<div style="padding-left:16px;position:relative;margin:4px 0"><span style="position:absolute;left:0;color:rgba(178,53,49,0.6)">·</span>$1</div>')
      .replace(/^[-–]\s+(.+)$/gm, '<div style="padding-left:16px;position:relative;margin:4px 0"><span style="position:absolute;left:0;color:rgba(178,53,49,0.6)">·</span>$1</div>')
      // numbered items
      .replace(/^(\d+)[.)]\s+(.+)$/gm, '<div style="padding-left:24px;position:relative;margin:4px 0"><span style="position:absolute;left:0;font-family:JetBrains Mono,monospace;font-size:11px;color:rgba(178,53,49,0.5)">$1.</span>$2</div>')
      // tables (basic - pipe separated)
      .replace(/^\|(.+)\|$/gm, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        if (cells.every(c => /^[-:]+$/.test(c.trim()))) return ''; // separator row
        const tds = cells.map(c => `<td style="padding:6px 12px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:13px">${c.trim()}</td>`).join('');
        return `<tr>${tds}</tr>`;
      })
      // paragraphs
      .replace(/\n\n+/g, '</p><p style="margin:12px 0;line-height:1.65">')
      // single newlines within paragraphs
      .replace(/\n/g, '<br />');
    // wrap table rows
    h = h.replace(/(<tr>[\s\S]*?<\/tr>(\s*<tr>[\s\S]*?<\/tr>)*)/g, '<table style="width:100%;border-collapse:collapse;margin:16px 0;font-family:JetBrains Mono,monospace;font-size:12px">$1</table>');
    return `<p style="margin:12px 0;line-height:1.65">${h}</p>`;
  }, [text]);

  return (
    <div
      style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: 14,
        color: 'rgba(245,241,235,0.6)',
        lineHeight: 1.65,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function SectionExplorer({
  title,
  subtitle,
  accent,
  basePath,
  sections,
}: {
  title: string;
  subtitle: string;
  accent: string;
  basePath: string;
  sections: Section[];
}) {
  const [q, setQ] = useState('');
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return sections;
    return sections.filter(
      (s) =>
        s.title.toLowerCase().includes(needle) ||
        s.content.toLowerCase().includes(needle)
    );
  }, [q, sections]);

  const active = useMemo(() => {
    const slug = activeSlug ?? (filtered[0]?.slug ?? null);
    return slug ? sections.find((s) => s.slug === slug) ?? null : null;
  }, [activeSlug, filtered, sections]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [active?.slug]);

  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 1200, margin: '0 auto' }}>
      {/* ─── HEADER ─── */}
      <div style={{
        marginBottom: 36,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <Link href="/" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'rgba(245,241,235,0.3)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}>
            DDL
          </Link>
          <span style={{ color: 'rgba(245,241,235,0.15)', fontSize: 11 }}>/</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: accent,
            letterSpacing: '0.08em',
          }}>
            {title.toUpperCase()}
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#F5F1EB',
          margin: '0 0 6px',
          lineHeight: 1.1,
        }}>
          {title}
        </h1>

        <p style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 16,
          color: 'rgba(245,241,235,0.4)',
          margin: 0,
        }}>
          {subtitle}
        </p>
      </div>

      {/* ─── SEARCH ─── */}
      <div style={{
        marginBottom: 24,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s',
      }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search sections…"
          style={{
            width: '100%',
            maxWidth: 400,
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(0,0,0,0.25)',
            color: '#F5F1EB',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = `${accent}55`; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        />
      </div>

      {/* ─── SPLIT LAYOUT ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: 20,
        alignItems: 'start',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
      }}>
        {/* ─── SIDEBAR ─── */}
        <div style={{
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(15,26,46,0.4)',
          padding: 8,
          position: 'sticky',
          top: 80,
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
        }}>
          {filtered.map((s) => {
            const isActive = s.slug === active?.slug;
            return (
              <button
                key={s.slug}
                onClick={() => setActiveSlug(s.slug)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: 8,
                  border: 'none',
                  background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  marginBottom: 2,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#F5F1EB' : 'rgba(245,241,235,0.55)',
                  marginBottom: 4,
                  lineHeight: 1.3,
                }}>
                  {s.title}
                </div>
                <div style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: 11,
                  color: 'rgba(245,241,235,0.25)',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {s.preview}
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div style={{
              padding: '20px 14px',
              fontFamily: "'Source Serif 4', serif",
              fontSize: 13,
              color: 'rgba(245,241,235,0.3)',
            }}>
              No sections match.
            </div>
          )}
        </div>

        {/* ─── CONTENT ─── */}
        <div
          ref={contentRef}
          style={{
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.05)',
            background: 'linear-gradient(165deg, rgba(15,26,46,0.5) 0%, rgba(7,16,28,0.8) 100%)',
            padding: '32px 36px',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
          }}
        >
          {!active ? (
            <div style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 14,
              color: 'rgba(245,241,235,0.3)',
            }}>
              No section selected.
            </div>
          ) : (
            <>
              {/* Section header */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 28,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: '#F5F1EB',
                      margin: '0 0 6px',
                    }}>
                      {active.title}
                    </h2>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      padding: '3px 10px',
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: 'rgba(245,241,235,0.3)',
                    }}>
                      {active.slug}
                    </span>
                  </div>
                  <Link
                    href={`${basePath}/section/${active.slug}`}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      padding: '8px 16px',
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.04)',
                      color: 'rgba(245,241,235,0.6)',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Full page →
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 24 }} />

              {/* Content */}
              <RenderContent text={active.content} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
