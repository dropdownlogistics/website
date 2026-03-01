import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ddl: {
          navy: '#0F1A2E',
          'navy-light': '#1A2744',
          crimson: '#B23531',
          wine: '#97072F',
          cream: '#F5F1EB',
          'cream-dark': '#E8E2D9',
          muted: '#5C677D',
          'muted-light': '#8892A4',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeSlideUp 0.6s ease both',
        'fade-in': 'fadeIn 0.8s ease both',
        'pulse-glow': 'pulseGlow 2s ease infinite',
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
