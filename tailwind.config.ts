import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cv: {
          bg: '#070512',
          panel: '#0f0b22',
          panelAlt: '#151031',
          line: 'rgba(255,255,255,0.10)',
          text: '#f5f1ea',
          muted: '#c6bfcd',
          faint: '#8a8396',
          gold: '#c99a52',
          goldSoft: 'rgba(201,154,82,0.18)',
          danger: '#a73e58'
        }
      },
      boxShadow: {
        panel: '0 12px 40px rgba(0,0,0,0.25)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    },
  },
  plugins: [],
} satisfies Config;
