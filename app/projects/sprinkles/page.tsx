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

interface MenuItem {
  emoji: string;
  name: string;
  description: string;
}

interface PricingRow {
  item: string;
  base: string;
  custom: string;
  notes: string;
}

interface PhaseItem {
  label: string;
  color: string;
  period: string;
  items: string[];
}

interface CalendarDay {
  day: number;
  type: 'product' | 'process' | 'personality' | 'customer';
  label: string;
}

const MENU_ITEMS: MenuItem[] = [
  { emoji: '🧁', name: 'Cupcakes', description: 'The signature. Highly customizable. 7 core flavors + seasonal rotations. The thing people come back for.' },
  { emoji: '🍪', name: 'Cookies', description: 'Classic + seasonal. From chocolate chip to lavender shortbread. Box of 6 or box of 12.' },
  { emoji: '🎂', name: 'Custom Cakes', description: 'Celebration-focused. Tiered pricing from simple to showstopper. 48-72 hour lead time.' },
  { emoji: '🥐', name: 'Pastries', description: 'Croissants, danishes, muffins. The everyday indulgence. Perfect with coffee.' },
  { emoji: '🌸', name: 'Seasonal Specials', description: 'Rotating quarterly. Keeps the menu fresh, drives repeat visits, creates urgency.' },
];

const PRICING: PricingRow[] = [
  { item: 'Cupcakes (6-pack)', base: '$18', custom: '$24', notes: 'Custom = premium flavors, decorations' },
  { item: 'Cupcakes (12-pack)', base: '$32', custom: '$42', notes: 'Best value · most popular for events' },
  { item: 'Cookies (6-pack)', base: '$12', custom: '$16', notes: 'Decorated cookies +$4' },
  { item: 'Cookies (12-pack)', base: '$20', custom: '$28', notes: 'Corporate gift boxes available' },
  { item: 'Cake — Simple', base: '$45', custom: '—', notes: 'Single tier, standard decoration' },
  { item: 'Cake — Custom', base: '$65–$120', custom: 'Quote', notes: 'Multi-tier, fondant, specialty design' },
  { item: 'Pastries (4-pack)', base: '$14', custom: '—', notes: 'Croissants, danishes, muffins' },
  { item: 'Seasonal Box', base: '$28', custom: '—', notes: 'Curated mix · limited availability' },
];

const PHASES: PhaseItem[] = [
  {
    label: 'Phase 1: Launch',
    color: '#F2A7B3',
    period: 'Months 1–3',
    items: [
      'Finalize core menu (5 items, 7 flavors)',
      'Set up Instagram + post launch announcement',
      'Create order form (Google Forms or Shopify)',
      'Design branded packaging (boxes, stickers, tissue)',
      'Price testing — run first 10 orders, gather feedback',
      'Collect first 10 testimonials + photos',
      'Establish batch schedule (2–3x per week)',
      'Get first 50 customers',
    ],
  },
  {
    label: 'Phase 2: Expand',
    color: '#A8D8C8',
    period: 'Months 4–6',
    items: [
      'Add custom cake tier (premium designs + pricing)',
      'Partner with 2–3 local coffee shops',
      'Launch seasonal specials (quarterly rotation)',
      'Introduce corporate order packages',
      'Build email list for pre-order notifications',
    ],
  },
  {
    label: 'Phase 3: Scale',
    color: '#D4A853',
    period: 'Months 7–12',
    items: [
      'Evaluate commercial kitchen (if operating from home)',
      'Explore wholesale (coffee shops, boutiques)',
      'Saturday pop-up or farmers market booth',
      'Hire part-time help if demand justifies',
      'Year 1 review — what sold, what didn\'t, what\'s next',
    ],
  },
];

const CALENDAR: CalendarDay[] = [
  { day: 1, type: 'personality', label: 'Launch Announce' },
  { day: 2, type: 'product', label: 'Cupcake Hero Shot' },
  { day: 3, type: 'process', label: 'Mixing Reel' },
  { day: 4, type: 'product', label: 'Cookie Close-up' },
  { day: 5, type: 'personality', label: 'Meet Emily' },
  { day: 6, type: 'process', label: 'Decorating Timelapse' },
  { day: 7, type: 'product', label: 'Menu Reveal' },
  { day: 8, type: 'personality', label: 'Why I Bake' },
  { day: 9, type: 'product', label: 'Cake Showcase' },
  { day: 10, type: 'process', label: 'Icing Technique' },
  { day: 11, type: 'customer', label: 'First Order!' },
  { day: 12, type: 'product', label: 'Pastry Flat Lay' },
  { day: 13, type: 'personality', label: 'Flavor Vote Poll' },
  { day: 14, type: 'process', label: 'Batch Day BTS' },
  { day: 15, type: 'product', label: 'Seasonal Tease' },
  { day: 16, type: 'customer', label: 'Customer Repost' },
  { day: 17, type: 'personality', label: 'Taste Test Reel' },
  { day: 18, type: 'product', label: 'Custom Order Reveal' },
  { day: 19, type: 'process', label: 'Packaging Process' },
  { day: 20, type: 'personality', label: 'Q&A Stories' },
  { day: 21, type: 'product', label: 'Best Seller Shot' },
  { day: 22, type: 'customer', label: 'Celebration Feature' },
  { day: 23, type: 'process', label: 'Ingredient Sourcing' },
  { day: 24, type: 'product', label: 'Box Unboxing' },
  { day: 25, type: 'personality', label: 'Blooper Reel' },
  { day: 26, type: 'product', label: 'Seasonal Launch' },
  { day: 27, type: 'process', label: 'Recipe Dev BTS' },
  { day: 28, type: 'customer', label: 'Testimonial' },
  { day: 29, type: 'personality', label: 'Fun Fact Friday' },
  { day: 30, type: 'product', label: 'Month 1 Wrap' },
];

const TYPE_COLORS: Record<string, string> = {
  product: '#F2A7B3',
  process: '#A8D8C8',
  personality: '#D4A853',
  customer: '#D4728A',
};

const TYPE_LABELS: Record<string, string> = {
  product: 'Product Showcase',
  process: 'Process / BTS',
  personality: 'Personality',
  customer: 'Customer Love',
};

const BRAND_PALETTE = [
  { color: '#F2A7B3', name: 'Blush Pink' },
  { color: '#FFF8F0', name: 'Cream' },
  { color: '#D4A853', name: 'Gold' },
  { color: '#A8D8C8', name: 'Mint' },
  { color: '#3D2B1F', name: 'Chocolate' },
];

const MENU_ACCENT_COLORS = ['#F2A7B3', '#A8D8C8', '#D4A853', '#D4728A', '#A8D8C8'];

export default function SprinklesPage() {
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);

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
            Sprinkles{' '}
            <span style={{ color: '#F2A7B3' }}>&amp;</span>{' '}
            Co
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
            &ldquo;Sprinkles make everything better.&rdquo; — A complete brand identity
            and launch strategy for an artisan bakery business.
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
              text: 'A talented baker ready to turn a passion into a business — but no brand identity, no pricing framework, no content strategy, and no structured path from kitchen to customers.',
            },
            {
              label: 'Approach',
              text: 'DDL\'s business-in-a-box methodology: brand identity system, menu architecture with pricing formulas, 30-day Instagram content calendar, and a phased 12-month launch roadmap.',
            },
            {
              label: 'Deliverable',
              text: 'Complete brand package — color palette, typography system, voice guidelines, structured menu with margin-based pricing, social media calendar, and 90-day launch checklist with scaling milestones.',
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
            The Look, The Feel, The Vibe
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
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' as const, marginBottom: 12 }}>
                {BRAND_PALETTE.map((s) => (
                  <div key={s.name} style={{ textAlign: 'center' as const }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: s.color,
                        border: '2px solid rgba(245,241,235,0.15)',
                        margin: '0 auto 6px',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.5rem',
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
                Playful, warm, premium. Pink leads. Gold elevates. Chocolate grounds it.
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
                Warm but not saccharine. Fun but not childish. Like your coolest friend who also
                happens to make incredible cupcakes.
              </p>
              <p
                style={{
                  fontFamily: 'Source Serif 4, serif',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: '#F2A7B3',
                }}
              >
                &ldquo;Come hang out, grab a treat, feel good.&rdquo;
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
                { font: 'Playfair Display', role: 'Headers · Elegance · Craft' },
                { font: 'DM Sans', role: 'Body · Clean · Readable' },
                { font: 'Caveat', role: 'Accents · Personality · Fun' },
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

      {/* MENU */}
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
            Core Menu
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
            What&rsquo;s Coming Out of the Oven
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: 14,
            }}
          >
            {MENU_ITEMS.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredMenu(i)}
                onMouseLeave={() => setHoveredMenu(null)}
                style={{
                  background: hoveredMenu === i
                    ? 'rgba(245,241,235,0.07)'
                    : 'rgba(245,241,235,0.04)',
                  border: '1px solid rgba(245,241,235,0.08)',
                  borderRadius: 8,
                  padding: '20px 16px',
                  textAlign: 'center' as const,
                  borderTop: `3px solid ${MENU_ACCENT_COLORS[i]}`,
                  transition: 'background 0.2s ease',
                  cursor: 'default',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>{item.emoji}</div>
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.95rem',
                    color: '#F5F1EB',
                    marginBottom: 8,
                  }}
                >
                  {item.name}
                </div>
                <p
                  style={{
                    fontFamily: 'Source Serif 4, serif',
                    fontSize: '0.78rem',
                    color: 'rgba(245,241,235,0.55)',
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
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
            Pricing Framework
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
            The Numbers Behind the Bakes
          </h2>
          <div
            style={{
              background: 'rgba(245,241,235,0.04)',
              border: '1px solid rgba(245,241,235,0.08)',
              borderRadius: 8,
              overflow: 'hidden',
              marginBottom: 12,
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <thead>
                <tr>
                  {['Item', 'Base Price', 'Custom', 'Notes'].map((h) => (
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
                        padding: '10px 16px',
                        fontFamily: 'Source Serif 4, serif',
                        fontSize: '0.82rem',
                        color: '#F5F1EB',
                        fontWeight: 600,
                        borderBottom: '1px solid rgba(245,241,235,0.06)',
                      }}
                    >
                      {row.item}
                    </td>
                    <td
                      style={{
                        padding: '10px 16px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.78rem',
                        color: '#F2A7B3',
                        fontWeight: 700,
                        borderBottom: '1px solid rgba(245,241,235,0.06)',
                      }}
                    >
                      {row.base}
                    </td>
                    <td
                      style={{
                        padding: '10px 16px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.78rem',
                        color: '#D4A853',
                        fontWeight: 600,
                        borderBottom: '1px solid rgba(245,241,235,0.06)',
                      }}
                    >
                      {row.custom}
                    </td>
                    <td
                      style={{
                        padding: '10px 16px',
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
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              color: 'rgba(245,241,235,0.35)',
              textAlign: 'center' as const,
            }}
          >
            Formula: Ingredient cost × 3.5 = retail price · Custom = base + complexity upcharge · Seasonal = +10% novelty premium
          </p>
        </div>
      </FadeIn>

      {/* CONTENT CALENDAR */}
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
            Instagram Content Calendar
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
            First 30 Days — Post Every Day
          </h2>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' as const, marginBottom: 16, justifyContent: 'center' }}>
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: TYPE_COLORS[key],
                  }}
                />
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    color: 'rgba(245,241,235,0.5)',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: 6,
            }}
          >
            {CALENDAR.map((day) => (
              <div
                key={day.day}
                style={{
                  background: 'rgba(245,241,235,0.04)',
                  border: `1px solid ${TYPE_COLORS[day.type]}33`,
                  borderRadius: 6,
                  padding: '10px 8px',
                  textAlign: 'center' as const,
                }}
              >
                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.75rem',
                    color: '#F5F1EB',
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {day.day}
                </div>
                <div
                  style={{
                    fontFamily: 'Source Serif 4, serif',
                    fontSize: '0.6rem',
                    color: TYPE_COLORS[day.type],
                    lineHeight: 1.3,
                  }}
                >
                  {day.label}
                </div>
              </div>
            ))}
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

      {/* FOOTER */}
      <FadeIn delay={800}>
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
            Sprinkles & Co · Brand Strategy v1.0 · Built by DDL for Emily · 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
