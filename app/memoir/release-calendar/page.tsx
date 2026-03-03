'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MemoirReleaseCalendarPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div style={{ padding: '92px 24px 48px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,235,0.45)',
            marginBottom: 10,
          }}
        >
          Memoir · Release Calendar
        </div>

        <h1
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(1.9rem, 4.3vw, 2.6rem)',
            fontWeight: 700,
            color: '#F5F1EB',
            lineHeight: 1.12,
            marginBottom: 10,
          }}
        >
          Release Calendar
        </h1>

        <p
          style={{
            fontFamily: 'Source Serif 4, serif',
            fontSize: '1rem',
            color: 'rgba(245,241,235,0.55)',
            lineHeight: 1.65,
            maxWidth: 860,
            marginBottom: 10,
          }}
        >
          This page embeds the static HTML snapshot at{' '}
          <code style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            /preview/memoir-release-calendar.html
          </code>
          .
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/memoir" style={{ textDecoration: 'none' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 12px',
                borderRadius: 8,
                background: 'rgba(245,241,235,0.04)',
                border: '1px solid rgba(245,241,235,0.08)',
                color: '#F5F1EB',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
              }}
            >
              ← Memoir hub
            </div>
          </Link>

          <a href="/preview/memoir-release-calendar.html" style={{ textDecoration: 'none' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 12px',
                borderRadius: 8,
                background: 'rgba(245,241,235,0.04)',
                border: '1px solid rgba(245,241,235,0.08)',
                color: '#F5F1EB',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
              }}
            >
              Open raw HTML →
            </div>
          </a>
        </div>
      </div>

      <div
        style={{
          border: '1px solid rgba(245,241,235,0.08)',
          borderRadius: 10,
          overflow: 'hidden',
          background: 'rgba(245,241,235,0.02)',
          minHeight: 720,
        }}
      >
        {mounted ? (
          <iframe
            title="Memoir Release Calendar"
            src="/preview/memoir-release-calendar.html"
            style={{
              width: '100%',
              height: '78vh',
              border: 0,
              display: 'block',
              background: 'transparent',
            }}
          />
        ) : (
          <div
            style={{
              padding: 18,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: 'rgba(245,241,235,0.35)',
            }}
          >
            Loading…
          </div>
        )}
      </div>

      <div style={{ marginTop: 18, textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.62rem',
            color: 'rgba(245,241,235,0.22)',
            letterSpacing: '0.08em',
          }}
        >
          If this page 404s after deploy, it usually means the file wasn’t committed or the deployment
          didn’t rebuild the latest commit.
        </p>
      </div>
    </div>
  );
}