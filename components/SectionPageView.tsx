'use client';

import { useMemo } from 'react';
import Link from 'next/link';

type Section = { title: string; slug: string; content: string };

/* ─── same renderer as SectionExplorer ─── */
function RenderContent({ text }: { text: string }) {
  const html = useMemo(() => {
    let h = text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^### (.+)$/gm, '<h3 style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;color:#F5F1EB;margin:24px 0 8px;letter-spacing:-0.01em">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 style="font-family:Space Grotesk,sans-serif;font-size:20px;font-weight:600;color:#F5F1EB;margin:28px 0 10px;letter-spacing:-0.01em">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 style="font-family:Space Grotesk,sans-serif;font-size:24px;font-weight:700;color:#F5F1EB;margin:32px 0 12px;letter-spacing:-0.02em">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#F5F1EB;font-weight:600">$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="font-family:JetBrains Mono,monospace;font-size:12px;padding:2px 6px;border-radius:3px;background:rgba(255,255,255,0.05);color:rgba(245,241,235,0.7)">$1</code>')
      .replace(/^[-─=]{4,}$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:20px 0" />')
      .replace(/^[•·]\s+(.+)$/gm, '<div style="padding-left:16px;position:relative;margin:4px 0"><span style="position:absolute;left:0;color:rgba(178,53,49,0.6)">·</span>$1</div>')
      .replace(/^[-–]\s+(.+)$/gm, '<div style="padding-left:16px;position:relative;margin:4px 0"><span style="position:absolute;left:0;color:rgba(178,53,49,0.6)">·</span>$1</div>')
      .replace(/^(\d+)[.)]\s+(.+)$/gm, '<div style="padding-left:24px;position:relative;margin:4px 0"><span style="position:absolute;left:0;font-family:JetBrains Mono,monospace;font-size:11px;color:rgba(178,53,49,0.5)">$1.</span>$2</div>')
      .replace(/^\|(.+)\|$/gm, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        if (cells.every(c => /^[-:]+$/.test(c.trim()))) return '';
        const tds = cells.map(c => `<td style="padding:6px 12px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:13px">${c.trim()}</td>`).join('');
        return `<tr>${tds}</tr>`;
      })
      .replace(/\n\n+/g, '</p><p style="margin:12px 0;line-height:1.65">')
      .replace(/\n/g, '<br />');
    h = h.replace(/(<tr>.*?<\/tr>(\s*<tr>.*?<\/tr>)*)/gs, '<table style="width:100%;border-collapse:collapse;margin:16px 0;font-family:JetBrains Mono,monospace;font-size:12px">$1</table>');
    return `<p style="margin:12px 0;line-height:1.65">${h}</p>`;
  }, [text]);

  return (
    <div
      style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: 15,
        color: 'rgba(245,241,235,0.6)',
        lineHeight: 1.7,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function SectionPage({
  section,
  parentTitle,
  parentPath,
  accent,
}: {
  section: Section | null;
  parentTitle: string;
  parentPath: string;
  accent: string;
}) {
  if (!section) {
    return (
      <div style={{ padding: '100px 24px 32px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(15,26,46,0.4)',
          padding: '40px 36px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 16,
            color: 'rgba(245,241,235,0.4)',
            marginBottom: 20,
          }}>
            Section not found.
          </p>
          <Link href={parentPath} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: accent,
            textDecoration: 'none',
          }}>
            ← Back to {parentTitle}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 800, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <Link href="/" style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'rgba(245,241,235,0.3)',
          textDecoration: 'none',
        }}>
          DDL
        </Link>
        <span style={{ color: 'rgba(245,241,235,0.15)', fontSize: 11 }}>/</span>
        <Link href={parentPath} style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'rgba(245,241,235,0.3)',
          textDecoration: 'none',
        }}>
          {parentTitle}
        </Link>
        <span style={{ color: 'rgba(245,241,235,0.15)', fontSize: 11 }}>/</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: accent,
        }}>
          {section.slug}
        </span>
      </div>

      {/* Content card */}
      <div style={{
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.06)',
        background: 'linear-gradient(165deg, rgba(15,26,46,0.5) 0%, rgba(7,16,28,0.85) 100%)',
        padding: '40px 44px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#F5F1EB',
            margin: 0,
          }}>
            {section.title}
          </h1>
          <Link href={parentPath} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            padding: '8px 16px',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
            color: 'rgba(245,241,235,0.6)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            ← {parentTitle}
          </Link>
        </div>

        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'rgba(245,241,235,0.25)',
          marginBottom: 28,
        }}>
          {parentTitle} · Full page view
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 28 }} />

        <RenderContent text={section.content} />
      </div>
    </div>
  );
}
