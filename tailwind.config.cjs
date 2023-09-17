/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        error: '#FA594F',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        eUkraine: ['e-Ukraine', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        h1: [
          '26px',
          { lineHeight: '28px', fontWeight: '400', letterSpacing: '-0.02em' },
        ],
        h2: [
          '20px',
          { lineHeight: '24px', fontWeight: '400', letterSpacing: '-0.02em' },
        ],
        h3: [
          '18px',
          { lineHeight: '24px', fontWeight: '400', letterSpacing: '-0.02em' },
        ],
        h4: [
          '16px',
          { lineHeight: '20px', fontWeight: '400', letterSpacing: '-0.02em' },
        ],
        h5: [
          '14px',
          { lineHeight: '20px', fontWeight: '400', letterSpacing: '-0.02em' },
        ],
        h6: [
          '13px',
          { lineHeight: '18px', fontWeight: '400', letterSpacing: '-0.02em' },
        ],
        h7: [
          '13px',
          { lineHeight: '18px', fontWeight: '300', letterSpacing: '-0.02em' },
        ],
        h8: ['11px', { lineHeight: '14px', fontWeight: '400' }],
        h9: [
          '10px',
          { lineHeight: '14px', fontWeight: '400', letterSpacing: '-0.02em' },
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
