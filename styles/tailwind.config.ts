import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-jakarta)', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34, 211, 238, 0.35), 0 0 40px rgba(34, 211, 238, 0.12)',
        card: '0 24px 60px rgba(0, 0, 0, 0.35)'
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(120deg, #06b6d4, #22d3ee 52%, #67e8f9)'
      },
      animation: {
        pulseGlow: 'pulseGlow 3s ease-in-out infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 211, 238, 0.28)' },
          '50%': { boxShadow: '0 0 0 8px rgba(34, 211, 238, 0)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
