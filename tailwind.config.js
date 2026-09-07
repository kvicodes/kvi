/** @type {import('tailwindcss').Config} */

// ---------------------------------------------------------------------------
// KVI design tokens
//
// Colours are defined once as RGB channel triplets on :root in src/index.css
// and consumed here via rgb(var(--…) / <alpha-value>). To re-skin the entire
// site, edit the CSS variables in index.css — nothing here needs to change.
// ---------------------------------------------------------------------------

const withVar = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // A deliberately small, editorial scale.
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        // Primary — deep charcoal / near-black
        ink: {
          DEFAULT: withVar('--c-ink'),
          soft: withVar('--c-ink-soft'),
          muted: withVar('--c-ink-muted'),
        },
        // Background — warm white / off-white
        paper: {
          DEFAULT: withVar('--c-paper'),
          raised: withVar('--c-paper-raised'),
          sunken: withVar('--c-paper-sunken'),
        },
        // Secondary — neutral warm gray
        mist: {
          100: withVar('--c-mist-100'),
          200: withVar('--c-mist-200'),
          300: withVar('--c-mist-300'),
          400: withVar('--c-mist-400'),
          500: withVar('--c-mist-500'),
          600: withVar('--c-mist-600'),
        },
        // Hairline borders
        line: {
          DEFAULT: withVar('--c-line'),
          strong: withVar('--c-line-strong'),
          inverse: withVar('--c-line-inverse'),
        },
        // Accent — restrained natural green / earthy tone
        accent: {
          DEFAULT: withVar('--c-accent'),
          soft: withVar('--c-accent-soft'),
          deep: withVar('--c-accent-deep'),
          wash: withVar('--c-accent-wash'),
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Body scale
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.8125rem', { lineHeight: '1.55' }],
        'base': ['0.9375rem', { lineHeight: '1.65' }],
        'lg': ['1.0625rem', { lineHeight: '1.6' }],
        'xl': ['1.1875rem', { lineHeight: '1.55' }],
        // Display scale — tight tracking handled via utilities
        '2xl': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '3xl': ['1.9375rem', { lineHeight: '1.12', letterSpacing: '-0.022em' }],
        '4xl': ['2.5rem', { lineHeight: '1.06', letterSpacing: '-0.026em' }],
        '5xl': ['3.25rem', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        '6xl': ['4.25rem', { lineHeight: '0.98', letterSpacing: '-0.033em' }],
        '7xl': ['5.5rem', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 8.5rem)',
        'section-sm': 'clamp(3rem, 6vw, 5rem)',
      },
      maxWidth: {
        shell: '1280px',
        prose: '68ch',
      },
      borderRadius: {
        card: '2px',
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--c-ink) / 0.04), 0 12px 32px -18px rgb(var(--c-ink) / 0.14)',
        lift: '0 2px 4px rgb(var(--c-ink) / 0.05), 0 24px 56px -22px rgb(var(--c-ink) / 0.22)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
