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
        heading: ['var(--font-roboto)', 'sans-serif'],
        body: ['var(--font-roboto)', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(70, 167, 166, 0.35), 0 0 40px rgba(70, 167, 166, 0.12)',
        card: '0 24px 60px rgba(0, 0, 0, 0.35)'
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(120deg, #163c4d, #46a7a6 52%, #6ec9c8)'
      },
      animation: {
        pulseGlow: 'pulseGlow 3s ease-in-out infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(70, 167, 166, 0.28)' },
          '50%': { boxShadow: '0 0 0 8px rgba(70, 167, 166, 0)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
