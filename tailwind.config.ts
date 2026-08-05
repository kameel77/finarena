import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F6F3ED', 2: '#EFEBE3' },
        card: '#FFFFFF',
        ink: { DEFAULT: '#14181B', soft: '#3E464C', mute: '#767F87', faint: '#A9B0B6' },
        accent: { DEFAULT: '#C24A26', hi: '#E05C31', soft: 'rgba(194,74,38,0.09)' },
        hair: { DEFAULT: 'rgba(20,24,27,0.11)', strong: 'rgba(20,24,27,0.20)' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: { DEFAULT: '3px', sm: '2px', md: '3px', lg: '4px', xl: '6px' },
      maxWidth: { site: '1280px' },
      boxShadow: {
        lift: '0 18px 44px -26px rgba(20,24,27,0.32)',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(18px)' }, '100%': { opacity: '1', transform: 'none' } },
        panelIn: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'none' } },
        marquee: { '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        'fade-up': 'fadeUp .8s cubic-bezier(.2,.8,.2,1) both',
        'panel-in': 'panelIn .45s ease both',
        marquee: 'marquee 44s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
