// ============================================================
// DEXLORE — Style Constants
// Derived from actual SiteNav.tsx tokens
// ============================================================

// These match your existing site exactly.
// Use these in DEXLORE components for consistency.

export const colors = {
  // Backgrounds
  bgDeep: '#07101C',           // nav background base
  bgPage: '#0B0F14',           // dexlore page background
  bgCard: '#0e1117',           // card surfaces
  bgCardHover: '#111620',      // card hover
  bgDropdown: 'rgba(12,20,34,0.96)', // dropdown panel

  // Text
  textPrimary: '#F5F1EB',      // headlines, active items
  textActive: 'rgba(245,241,235,0.8)',
  textMuted: 'rgba(245,241,235,0.5)',
  textDim: 'rgba(245,241,235,0.3)',
  textGhost: 'rgba(245,241,235,0.1)',

  // Accents
  crimson: '#B23531',
  crimsonGlow: 'rgba(178,53,49,0.3)',
  crimsonSubtle: 'rgba(178,53,49,0.12)',
  crimsonGradient: 'linear-gradient(135deg, #B23531, #97072F)',

  // Borders
  borderSubtle: 'rgba(255,255,255,0.04)',
  borderLight: 'rgba(255,255,255,0.06)',
  borderMedium: 'rgba(255,255,255,0.08)',

  // Era-specific
  eraI: '#4a7cc9',
  eraII: '#c94a6e',
  eraIII: '#5c9e7a',
  eraIV: '#8a6cc9',
  eraV: '#c98a4a',
} as const;

export const fonts = {
  heading: "'Space Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
  // Serif for DexLore narrative — add Playfair Display to your font imports
  serif: "'Playfair Display', Georgia, serif",
} as const;
