'use client';

import { councilMembers } from './councilData';
import Link from 'next/link';
import { useState } from 'react';

export default function CouncilProfilesPage() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 64, textAlign: 'center' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: 4,
          textTransform: 'uppercase' as const,
          color: '#B23531',
          marginBottom: 12,
        }}>
          DDL Council
        </p>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700,
          color: '#F5F1EB',
          marginBottom: 16,
          lineHeight: 1.1,
        }}>
          Council Member Profiles
        </h1>
        <p style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 18,
          color: 'rgba(245, 241, 235, 0.6)',
          maxWidth: 600,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Nine AI models. Nine distinct cognitive signatures. Each calibrated with a 
          human avatar, DexLanguage profile, and operational contract for governance-grade collaboration.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 24,
        marginBottom: 64,
      }}>
        {councilMembers.map((member) => {
          const isHovered = hoveredSlug === member.slug;
          return (
            <Link
              key={member.slug}
              href={`/council/profiles/${member.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={() => setHoveredSlug(member.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <div style={{
                background: isHovered
                  ? 'rgba(178, 53, 49, 0.06)'
                  : 'rgba(245, 241, 235, 0.02)',
                border: `1px solid ${isHovered ? 'rgba(178, 53, 49, 0.3)' : 'rgba(245, 241, 235, 0.06)'}`,
                borderRadius: 12,
                padding: 28,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative' as const,
                overflow: 'hidden',
                minHeight: 320,
                display: 'flex',
                flexDirection: 'column' as const,
              }}>
                {/* Accent bar */}
                <div style={{
                  position: 'absolute' as const,
                  top: 0,
                  left: 0,
                  width: 3,
                  height: '100%',
                  background: '#B23531',
                  opacity: isHovered ? 0.8 : 0.2,
                  transition: 'opacity 0.3s ease',
                }} />

                {/* Photo + Identity row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 20,
                }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: `2px solid ${isHovered ? 'rgba(178, 53, 49, 0.4)' : 'rgba(245, 241, 235, 0.1)'}`,
                    transition: 'border-color 0.3s ease',
                  }}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                      }}
                    />
                  </div>
                  <div>
                    <h2 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 20,
                      fontWeight: 600,
                      color: '#F5F1EB',
                      margin: 0,
                      lineHeight: 1.2,
                    }}>
                      {member.name}
                    </h2>
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      letterSpacing: 2,
                      color: '#B23531',
                      margin: '4px 0 0 0',
                      textTransform: 'uppercase' as const,
                    }}>
                      {member.model}
                    </p>
                  </div>
                </div>

                {/* Role title */}
                <p style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: 14,
                  color: 'rgba(245, 241, 235, 0.5)',
                  margin: '0 0 12px 0',
                  fontStyle: 'italic',
                }}>
                  {member.roleTitle}
                </p>

                {/* Tagline */}
                <p style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: 15,
                  color: 'rgba(245, 241, 235, 0.75)',
                  lineHeight: 1.7,
                  margin: '0 0 16px 0',
                  flex: 1,
                }}>
                  {member.tagline}
                </p>

                {/* Top 3 strengths */}
                <div style={{ marginTop: 'auto' }}>
                  {member.bestAt.slice(0, 3).map((strength, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      marginBottom: 6,
                    }}>
                      <span style={{
                        color: '#B23531',
                        fontSize: 10,
                        marginTop: 5,
                        flexShrink: 0,
                      }}>◆</span>
                      <span style={{
                        fontFamily: "'Source Serif 4', serif",
                        fontSize: 13,
                        color: 'rgba(245, 241, 235, 0.55)',
                        lineHeight: 1.5,
                      }}>
                        {strength}
                      </span>
                    </div>
                  ))}
                </div>

                {/* View profile arrow */}
                <div style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(245, 241, 235, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: 1,
                    color: isHovered ? '#B23531' : 'rgba(245, 241, 235, 0.3)',
                    transition: 'color 0.3s ease',
                  }}>
                    View Full Profile
                  </span>
                  <span style={{
                    color: isHovered ? '#B23531' : 'rgba(245, 241, 235, 0.2)',
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                    fontSize: 16,
                  }}>
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Back link */}
      <div style={{ textAlign: 'center', paddingBottom: 32 }}>
        <Link
          href="/council"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: 2,
            color: 'rgba(245, 241, 235, 0.4)',
            textDecoration: 'none',
          }}
        >
          ← Back to Council
        </Link>
      </div>
    </div>
  );
}
