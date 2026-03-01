'use client';

import { useEffect, useState, CSSProperties } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  style?: CSSProperties;
}

function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface ServiceCardData {
  icon: string;
  title: string;
  description: string;
}

interface PricingRow {
  service: string;
  base: string;
  addOns: string;
  notes: string;
}

interface PhaseItem {
  label: string;
  color: string;
  period: string;
  items: string[];
}

const SERVICES: ServiceCardData[] = [
  { icon: '🏠', title: 'Real Estate', description: 'Loan signings, closings, refinances, title work. Comes to the closing table — kitchen table, title office, wherever works.' },
  { icon: '📋', title: 'Legal Documents', description: 'Power of attorney, affidavits, wills, trusts, medical directives. The documents that matter most deserve professional handling.' },
  { icon: '💼', title: 'Business', description: 'LLC filings, partnership agreements, contracts, corporate minutes. Signed, sealed, and official without leaving the office.' },
  { icon: '🚨', title: 'Emergency / Rush', description: 'Same-day appointments. After hours. Weekends. When it can\'t wait — premium convenience, zero hassle.' },
];

const PRICING: PricingRow[] = [
  { service: 'General Notarization', base: '$15/signature', addOns: '—', notes: 'Standard rate per notarized signature' },
  { service: 'Travel Fee', base: '$25', addOns: '+$2/mile beyond 10mi', notes: 'Base covers 10-mile radius' },
  { service: 'Loan Signing Package', base: '$150', addOns: 'Includes travel', notes: '~1 hour · multiple documents · full service' },
  { service: 'After-Hours Premium', base: '+$50', addOns: 'Evenings & weekends', notes: 'After 6 PM or Saturday/Sunday' },
  { service: 'Rush / Same-Day', base: '+$50', addOns: 'Stackable', notes: 'Same-day scheduling · subject to availability' },
];

const PHASES: PhaseItem[] = [
  {
    label: 'Phase 1: Launch',
    color: '#C8993E',
    period: 'Months 1–3',
    items: [
      'Complete state notary commission',
      'Obtain E&O insurance + bonding',
      'Build website (homepage, services, about, booking)',
      'Claim Google Business Profile — optimize for local search',
      'Set up Calendly/Acuity for online booking',
      'Order business cards + notary supplies',
      'Get first 10 clients — request reviews from every one',
      'Post on social media: "Don\'t Forget the Ink!" launch',
    ],
  },
  {
    label: 'Phase 2: Expand',
    color: '#1A7A6D',
    period: 'Months 4–6',
    items: [
      'Partner with 2–3 real estate agents',
      'Connect with 1–2 law firms (estate planning focus)',
      'Optimize local SEO — target "mobile notary Kansas City"',
      'Introduce after-hours premium pricing',
      'Build referral system (agent discount, repeat client loyalty)',
    ],
  },
  {
    label: 'Phase 3: Scale',
    color: '#1B2D4F',
    period: 'Months 7–12',
    items: [
      'Explore senior living facility contracts (recurring revenue)',
      'Add loan signing certification (NNA or equivalent)',
      'Evaluate hiring second notary (if demand justifies)',
      'Year 1 review: revenue, clients served, top referral sources',
    ],
  },
];

const BRAND_PALETTE = [
  { color: '#1B2D4F', name: 'Navy' },
  { color: '#C8993E', name: 'Gold' },
  { color: '#FBF8F2', name: 'Cream' },
  { color: '#1A7A6D', name: 'Teal' },
];

const ACCENT_COLORS = ['#1B2D4F', '#C8993E', '#1A7A6D', '#2B4370'];

export default function NomadicNotaryPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div style={{ padding: '100px 24px 32px', maxWidth: 960, margin: '0 auto' }}>
      {/* BACK LINK */}
      <FadeIn>
        <a
          href="/projects"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: '#B23531',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 32,
          }}
        >
          ← Back to Projects
        </a>
      </FadeIn>

      {/* HERO */}
      <FadeIn delay={100}>
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: '#B23531',
              marginBottom: 12,
            }}
          >
            DDL Case Study · Business-in-a-Box
          </div>
          <h1
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: '#F5F1EB',
              lineHeight: 1.15,
              marginBottom: 8,
            }}
          >
            Nomadic Notary{' '}
            <span style={{ color: '#C8993E' }}>Ink</span>
          </h1>
          <p
            style={{
              fontFamily: 'Source Serif 4, serif',
              fontSize: '1.15rem',
              color: 'rgba(245,241,235,0.6)',
              lineHeight: 1.6,
              maxWidth: 600,
            }}
          >
            &ldquo;Don&rsquo;t Forget the Ink!&rdquo; — A complete brand identity and launch strategy
            for a mobile notary service in Kansas City.
          </p>
        </div>
      </FadeIn>

      {/* PROBLEM / APPROACH / DELIVERABLE */}
      <FadeIn delay={200}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 16,
            marginBottom: 56,
          }}
        >
          {[
            {
              label: 'Problem',
              text: 'A skilled professional ready to launch a mobile notary business — but no brand, no pricing model, no marketing strategy, and no launch plan.',
            },
            {
              label: 'Approach',
              text: 'DDL\'s business-in-a-box methodology: brand identity, service architecture, transparent pricing framework, partnership outreach templates, and a phased 12-month roadmap.',
            },
            {
              label: 'Deliverable',
              text: 'Complete brand package — logo direction, color palette, typography system, website copy, business cards, email signature, SEO strategy, outreach templates, and 90-day launch checklist.',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(245,241,235,0.04)',
                border: '1px solid rgba(245,241,235,0.08)',
                borderRadius: 8,
                padding: '24px 20px',
              }}
            >
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: '#B23531',
                  marginBottom: 8,
                }}
              >
                {item.label}
              </div>
              <p
                style={{
                  fontFamily: 'Source Serif 4, serif',
                  fontSize: '0.9rem',
                  color: 'rgba(245,241,235,0.75)',
                  lineHeight: 1.65,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* BRAND IDENTITY */}
      <FadeIn delay={300}>
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#B23531',
              marginBottom: 8,
            }}
          >
            Brand Identity
          </div>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.5rem',
              color: '#F5F1EB',
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Trust, Craft, Personality
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {/* Palette */}
            <div
              style={{
                background: 'rgba(245,241,235,0.04)',
                border: '1px solid rgba(245,241,235,0.08)',
                borderRadius: 8,
                padding: '24px 20px',
                textAlign: 'center' as const,
              }}
            >
              <h3
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.95rem',
                  color: '#F5F1EB',
                  marginBottom: 16,
                }}
              >
                Palette
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 12 }}>
                {BRAND_PALETTE.map((s) => (
                  <div key={s.name} style={{ textAlign: 'center' as const }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: s.color,
                        border: '2px solid rgba(245,241,235,0.15)',
                        margin: '0 auto 6px',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.55rem',
                        color: 'rgba(245,241,235,0.45)',
                      }}
                    >
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontFamily: 'Source Serif 4, serif',
                  fontSize: '0.8rem',
                  color: 'rgba(245,241,235,0.55)',
                  lineHeight: 1.5,
                }}
              >
                Navy = trust. Gold = premium service. Cream = clean & official. Teal = accent.
              </p>
            </div>

            {/* Voice */}
            <div
              style={{
                background: 'rgba(245,241,235,0.04)',
                border: '1px solid rgba(245,241,235,0.08)',
                borderRadius: 8,
                padding: '24px 20px',
                textAlign: 'center' as const,
              }}
            >
              <h3
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.95rem',
                  color: '#F5F1EB',
                  marginBottom: 12,
                }}
              >
                Voice
              </h3>
              <p
                style={{
                  fontFamily: 'Source Serif 4, serif',
                  fontSize: '0.85rem',
                  color: 'rgba(245,241,235,0.65)',
                  lineHeight: 1.6,
                  marginBottom: 12,
                }}
              >
                Professional but approachable. Helpful, clear, no legal jargon unless necessary.
                Trustworthy without being stuffy.
              </p>
              <p
                style={{
                  fontFamily: 'Source Serif 4, serif',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: '#C8993E',
                }}
              >
                &ldquo;I show up. On time. With the ink.&rdquo;
              </p>
            </div>

            {/* Typography */}
            <div
              style={{
                background: 'rgba(245,241,235,0.04)',
                border: '1px solid rgba(245,241,235,0.08)',
                borderRadius: 8,
                padding: '24px 20px',
                textAlign: 'center' as const,
              }}
            >
              <h3
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.95rem',
                  color: '#F5F1EB',
                  marginBottom: 12,
                }}
              >
                Typography
              </h3>
              {[
                { font: 'Lora', role: 'Headers · Trust · Official' },
                { font: 'Inter', role: 'Body · Modern · Clean' },
                { font: 'Caveat', role: 'Tagline · Personality · Ink' },
              ].map((t) => (
                <div key={t.font} style={{ marginBottom: 8 }}>
                  <div
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '0.95rem',
                      color: '#F5F1EB',
                    }}
                  >
                    {t.font}
                  </div>
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      color: 'rgba(245,241,235,0.4)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* SERVICES */}
      <FadeIn delay={400}>
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#B23531',
              marginBottom: 8,
            }}
          >
            Services
          </div>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.5rem',
              color: '#F5F1EB',
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            What Gets Notarized
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 14,
            }}
          >
            {SERVICES.map((svc, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  background: hoveredService === i
                    ? 'rgba(245,241,235,0.07)'
                    : 'rgba(245,241,235,0.04)',
                  border: '1px solid rgba(245,241,235,0.08)',
                  borderRadius: 8,
                  padding: '20px 18px',
                  borderLeft: `3px solid ${ACCENT_COLORS[i]}`,
                  transition: 'background 0.2s ease',
                  cursor: 'default',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.95rem',
                    color: '#F5F1EB',
                    marginBottom: 8,
                  }}
                >
                  {svc.icon} {svc.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Source Serif 4, serif',
                    fontSize: '0.82rem',
                    color: 'rgba(245,241,235,0.6)',
                    lineHeight: 1.6,
                  }}
                >
                  {svc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* PRICING */}
      <FadeIn delay={500}>
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#B23531',
              marginBottom: 8,
            }}
          >
            Pricing
          </div>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.5rem',
              color: '#F5F1EB',
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Transparent, Fair, No Surprises
          </h2>
          <div
            style={{
              background: 'rgba(245,241,235,0.04)',
              border: '1px solid rgba(245,241,235,0.08)',
              borderRadius: 8,
              overflow: 'hidden',
              marginBottom: 20,
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <thead>
                <tr>
                  {['Service', 'Base Price', 'Add-Ons', 'Notes'].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.6rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase' as const,
                        color: '#F5F1EB',
                        background: 'rgba(178,53,49,0.15)',
                        padding: '12px 16px',
                        textAlign: 'left' as const,
                        fontWeight: 600,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRICING.map((row, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        padding: '12px 16px',
                        fontFamily: 'Source Serif 4, serif',
                        fontSize: '0.85rem',
                        color: '#F5F1EB',
                        fontWeight: 600,
                        borderBottom: '1px solid rgba(245,241,235,0.06)',
                      }}
                    >
                      {row.service}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.8rem',
                        color: '#C8993E',
                        fontWeight: 700,
                        borderBottom: '1px solid rgba(245,241,235,0.06)',
                      }}
                    >
                      {row.base}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        fontFamily: 'Source Serif 4, serif',
                        fontSize: '0.8rem',
                        color: 'rgba(245,241,235,0.55)',
                        borderBottom: '1px solid rgba(245,241,235,0.06)',
                      }}
                    >
                      {row.addOns}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        fontFamily: 'Source Serif 4, serif',
                        fontSize: '0.72rem',
                        color: 'rgba(245,241,235,0.4)',
                        borderBottom: '1px solid rgba(245,241,235,0.06)',
                      }}
                    >
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quote Example */}
          <div
            style={{
              background: 'rgba(15,26,46,0.6)',
              border: '1px solid rgba(200,153,62,0.2)',
              borderRadius: 8,
              padding: '20px',
            }}
          >
            <div
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.95rem',
                color: '#C8993E',
                marginBottom: 14,
              }}
            >
              Example Quote: Evening Real Estate Closing
            </div>
            {[
              { label: 'Loan signing package', value: '$150.00' },
              { label: 'Travel (20 miles — 10 beyond base × $2)', value: '$20.00' },
              { label: 'After-hours premium (7:30 PM)', value: '$50.00' },
            ].map((line, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: '1px solid rgba(245,241,235,0.05)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Source Serif 4, serif',
                    fontSize: '0.82rem',
                    color: 'rgba(245,241,235,0.5)',
                  }}
                >
                  {line.label}
                </span>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.82rem',
                    color: '#F5F1EB',
                    fontWeight: 600,
                  }}
                >
                  {line.value}
                </span>
              </div>
            ))}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px 0 0',
                borderTop: '1px solid rgba(200,153,62,0.3)',
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1rem',
                  color: '#F5F1EB',
                  fontWeight: 700,
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: '#C8993E',
                  fontWeight: 700,
                }}
              >
                $220.00
              </span>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* MARKETING MATERIALS */}
      <FadeIn delay={600}>
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#B23531',
              marginBottom: 8,
            }}
          >
            Marketing Materials
          </div>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.5rem',
              color: '#F5F1EB',
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Business Card & Email Signature
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 16,
              marginBottom: 20,
            }}
          >
            {/* Front */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0F1A30, #1B2D4F)',
                borderRadius: 10,
                padding: '36px 28px',
                aspectRatio: '3.5/2',
                display: 'flex',
                flexDirection: 'column' as const,
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1.2rem',
                  color: '#F5F1EB',
                  fontWeight: 600,
                }}
              >
                Nomadic Notary <span style={{ color: '#C8993E' }}>Ink</span>
              </div>
              <div
                style={{
                  fontFamily: 'Source Serif 4, serif',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: '#C8993E',
                  margin: '4px 0 14px',
                }}
              >
                &ldquo;Don&rsquo;t Forget the Ink!&rdquo;
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.55rem',
                  color: 'rgba(245,241,235,0.35)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                }}
              >
                Mobile Notary · Certified · Insured · Bonded
              </div>
            </div>

            {/* Back */}
            <div
              style={{
                background: 'rgba(245,241,235,0.06)',
                border: '1px solid rgba(245,241,235,0.1)',
                borderRadius: 10,
                padding: '28px 24px',
                aspectRatio: '3.5/2',
                display: 'flex',
                flexDirection: 'column' as const,
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.95rem',
                  color: '#F5F1EB',
                  marginBottom: 10,
                }}
              >
                Emily Kitchens
              </div>
              <div
                style={{
                  fontFamily: 'Source Serif 4, serif',
                  fontSize: '0.78rem',
                  color: 'rgba(245,241,235,0.55)',
                  lineHeight: 1.9,
                }}
              >
                (816) 555-0142
                <br />
                emily@nomadicnotaryink.com
                <br />
                nomadicnotaryink.com
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.55rem',
                  color: 'rgba(245,241,235,0.35)',
                  borderTop: '1px solid rgba(245,241,235,0.08)',
                  paddingTop: 10,
                  marginTop: 10,
                  letterSpacing: '0.03em',
                }}
              >
                Real Estate · Legal Documents · Business · Rush · Evenings & Weekends
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* LAUNCH ROADMAP */}
      <FadeIn delay={700}>
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#B23531',
              marginBottom: 8,
            }}
          >
            Launch Roadmap
          </div>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.5rem',
              color: '#F5F1EB',
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            First 12 Months
          </h2>
          <div
            style={{
              background: 'rgba(245,241,235,0.04)',
              border: '1px solid rgba(245,241,235,0.08)',
              borderRadius: 8,
              padding: '24px 20px',
            }}
          >
            {PHASES.map((phase, pi) => (
              <div
                key={pi}
                style={{
                  marginBottom: pi < PHASES.length - 1 ? 24 : 0,
                  paddingBottom: pi < PHASES.length - 1 ? 24 : 0,
                  borderBottom:
                    pi < PHASES.length - 1
                      ? '1px solid rgba(245,241,235,0.06)'
                      : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '1rem',
                    color: '#F5F1EB',
                    marginBottom: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  {phase.label}
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      color: phase.color,
                      border: `1px solid ${phase.color}33`,
                      padding: '2px 10px',
                      borderRadius: 4,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {phase.period}
                  </span>
                </div>
                {phase.items.map((item, ii) => (
                  <div
                    key={ii}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '5px 0',
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 3,
                        border: `1.5px solid ${phase.color}`,
                        flexShrink: 0,
                        marginTop: 3,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'Source Serif 4, serif',
                        fontSize: '0.82rem',
                        color: 'rgba(245,241,235,0.6)',
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* PARTNERSHIP TARGETS */}
      <FadeIn delay={800}>
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#B23531',
              marginBottom: 8,
            }}
          >
            Partnerships
          </div>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '1.5rem',
              color: '#F5F1EB',
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Outreach Strategy
          </h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, marginBottom: 20 }}>
            {['Real Estate Agents', 'Law Firms', 'Title Companies', 'Senior Living Facilities'].map(
              (target) => (
                <span
                  key={target}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.68rem',
                    padding: '5px 14px',
                    borderRadius: 6,
                    border: '1px solid rgba(245,241,235,0.12)',
                    color: 'rgba(245,241,235,0.6)',
                    background: 'rgba(245,241,235,0.04)',
                  }}
                >
                  {target}
                </span>
              ),
            )}
          </div>
          <p
            style={{
              fontFamily: 'Source Serif 4, serif',
              fontSize: '0.85rem',
              color: 'rgba(245,241,235,0.55)',
              lineHeight: 1.7,
            }}
          >
            Includes ready-to-send outreach email templates for real estate agents, law firms, and
            title companies — personalized, professional, and designed to convert first contact
            into recurring partnerships.
          </p>
        </div>
      </FadeIn>

      {/* FOOTER */}
      <FadeIn delay={900}>
        <div
          style={{
            borderTop: '1px solid rgba(245,241,235,0.08)',
            paddingTop: 24,
            textAlign: 'center' as const,
          }}
        >
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              color: 'rgba(245,241,235,0.3)',
              letterSpacing: '0.08em',
            }}
          >
            Nomadic Notary Ink · Brand Strategy v1.0 · Built by DDL for Emily · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
