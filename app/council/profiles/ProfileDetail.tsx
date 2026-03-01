'use client';

import { CouncilMember } from './councilData';
import Link from 'next/link';
import { useState } from 'react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 22,
        fontWeight: 600,
        color: '#F5F1EB',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottom: '1px solid rgba(178, 53, 49, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{ color: '#B23531', fontSize: 14 }}>◆</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function BulletList({ items, accent }: { items: string[]; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
        }}>
          <span style={{
            color: accent ? '#97072F' : '#B23531',
            fontSize: 8,
            marginTop: 7,
            flexShrink: 0,
          }}>●</span>
          <span style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 15,
            color: 'rgba(245, 241, 235, 0.8)',
            lineHeight: 1.7,
          }}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

function TagPill({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '5px 14px',
      borderRadius: 20,
      background: 'rgba(178, 53, 49, 0.1)',
      border: '1px solid rgba(178, 53, 49, 0.15)',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      color: 'rgba(245, 241, 235, 0.7)',
      letterSpacing: 0.5,
    }}>
      {label}
    </span>
  );
}

function AnalogCard({ name, type }: { name: string; type: 'real' | 'fictional' }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '14px 18px',
        background: hovered ? 'rgba(178, 53, 49, 0.06)' : 'rgba(245, 241, 235, 0.02)',
        border: `1px solid ${hovered ? 'rgba(178, 53, 49, 0.2)' : 'rgba(245, 241, 235, 0.05)'}`,
        borderRadius: 8,
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        letterSpacing: 2,
        textTransform: 'uppercase' as const,
        color: type === 'real' ? '#B23531' : '#97072F',
        display: 'block',
        marginBottom: 4,
      }}>
        {type === 'real' ? 'Real' : 'Fictional'}
      </span>
      <span style={{
        fontFamily: "'Source Serif 4', serif",
        fontSize: 14,
        color: 'rgba(245, 241, 235, 0.8)',
        lineHeight: 1.6,
      }}>
        {name}
      </span>
    </div>
  );
}

export default function ProfileDetail({
  member,
  prevMember,
  nextMember,
}: {
  member: CouncilMember;
  prevMember?: CouncilMember;
  nextMember?: CouncilMember;
}) {
  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 900, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 32 }}>
        <Link
          href="/council/profiles"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: 2,
            color: 'rgba(245, 241, 235, 0.4)',
            textDecoration: 'none',
          }}
        >
          ← All Profiles
        </Link>
      </div>

      {/* Hero */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        marginBottom: 48,
        flexWrap: 'wrap' as const,
      }}>
        <div style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          overflow: 'hidden',
          flexShrink: 0,
          border: '3px solid rgba(178, 53, 49, 0.3)',
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
        <div style={{ flex: 1, minWidth: 250 }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: 4,
            textTransform: 'uppercase' as const,
            color: '#B23531',
            marginBottom: 8,
          }}>
            {member.model} {member.nickname ? `· "${member.nickname}"` : ''}
          </p>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: '#F5F1EB',
            margin: '0 0 8px 0',
            lineHeight: 1.1,
          }}>
            {member.name}
          </h1>
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 16,
            color: 'rgba(245, 241, 235, 0.5)',
            fontStyle: 'italic',
            margin: '0 0 8px 0',
          }}>
            {member.roleTitle} · {member.profession}
          </p>
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 16,
            color: 'rgba(245, 241, 235, 0.7)',
            lineHeight: 1.7,
            margin: 0,
          }}>
            {member.tagline}
          </p>
        </div>
      </div>

      {/* DexCity placement */}
      <div style={{
        background: 'rgba(245, 241, 235, 0.02)',
        border: '1px solid rgba(245, 241, 235, 0.06)',
        borderRadius: 10,
        padding: '20px 24px',
        marginBottom: 48,
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap' as const,
      }}>
        <div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: 2,
            textTransform: 'uppercase' as const,
            color: '#B23531',
          }}>DexCity District</span>
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 15,
            color: 'rgba(245, 241, 235, 0.8)',
            margin: '4px 0 0 0',
          }}>{member.dexCityLocation}</p>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: 2,
            textTransform: 'uppercase' as const,
            color: '#B23531',
          }}>Vibe</span>
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 15,
            color: 'rgba(245, 241, 235, 0.6)',
            fontStyle: 'italic',
            margin: '4px 0 0 0',
          }}>{member.dexCityVibe}</p>
        </div>
      </div>

      {/* Essence */}
      <div style={{
        background: 'rgba(178, 53, 49, 0.04)',
        borderLeft: '3px solid #B23531',
        padding: '20px 24px',
        borderRadius: '0 8px 8px 0',
        marginBottom: 48,
      }}>
        <p style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 17,
          color: 'rgba(245, 241, 235, 0.85)',
          lineHeight: 1.8,
          margin: 0,
        }}>
          {member.essence}
        </p>
      </div>

      {/* Best At */}
      <Section title="Best At">
        <BulletList items={member.bestAt} />
      </Section>

      {/* Signature Moves */}
      <Section title="Signature Moves">
        <BulletList items={member.signatureMoves} />
      </Section>

      {/* Two column: Likes / Dislikes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
        marginBottom: 48,
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: '#F5F1EB',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ color: '#B23531', fontSize: 12 }}>◆</span> Likes
          </h3>
          <BulletList items={member.likes} />
        </div>
        <div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: '#F5F1EB',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ color: '#97072F', fontSize: 12 }}>◆</span> Dislikes
          </h3>
          <BulletList items={member.dislikes} accent />
        </div>
      </div>

      {/* Failure Modes + Weak Spots */}
      <Section title="Failure Modes & Weak Spots">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          <div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              color: '#97072F',
              marginBottom: 12,
            }}>Failure Modes</p>
            <BulletList items={member.failureModes} accent />
          </div>
          <div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              color: '#97072F',
              marginBottom: 12,
            }}>Weak Spots</p>
            <BulletList items={member.weakSpots} accent />
          </div>
        </div>
      </Section>

      {/* Default Output Style */}
      <Section title="Default Output Style">
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
          {member.defaultOutputStyle.map((style, i) => (
            <TagPill key={i} label={style} />
          ))}
        </div>
      </Section>

      {/* When To Use */}
      <Section title="When to Deploy">
        <BulletList items={member.whenToUse} />
      </Section>

      {/* Recovery Moves */}
      <Section title="Recovery Moves">
        <BulletList items={member.recoveryMoves} />
      </Section>

      {/* Analogs */}
      <Section title="Cognitive Analogs">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
        }}>
          {member.analogsReal.map((a, i) => (
            <AnalogCard key={`r-${i}`} name={a} type="real" />
          ))}
          {member.analogsFictional.map((a, i) => (
            <AnalogCard key={`f-${i}`} name={a} type="fictional" />
          ))}
        </div>
      </Section>

      {/* Prev / Next nav */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 32,
        borderTop: '1px solid rgba(245, 241, 235, 0.06)',
        marginTop: 32,
        flexWrap: 'wrap' as const,
        gap: 16,
      }}>
        {prevMember ? (
          <Link
            href={`/council/profiles/${prevMember.slug}`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 1,
              color: 'rgba(245, 241, 235, 0.5)',
              textDecoration: 'none',
            }}
          >
            ← {prevMember.name}
          </Link>
        ) : <div />}

        <Link
          href="/council/profiles"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: 2,
            color: '#B23531',
            textDecoration: 'none',
          }}
        >
          All Profiles
        </Link>

        {nextMember ? (
          <Link
            href={`/council/profiles/${nextMember.slug}`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 1,
              color: 'rgba(245, 241, 235, 0.5)',
              textDecoration: 'none',
              textAlign: 'right' as const,
            }}
          >
            {nextMember.name} →
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
