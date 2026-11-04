/** @type {import('tailwindcss').Config} */

// ---------------------------------------------------------------------------
// KVI design tokens.
//
// Colours are defined once as RGB triplets on :root in src/index.css and
// consumed here, so the palette has one source of truth.
// ---------------------------------------------------------------------------

const v = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1680px',
    },
    extend: {
      colors: {
        field: { DEFAULT: v('--field'), raised: v('--field-raised') },
        olive: v('--olive'),
        sage: v('--sage'),
        stone: v('--stone'),
        paper: v('--paper'),
        graphite: v('--graphite'),
        muted: v('--muted'),
        line: { DEFAULT: v('--line'), dark: v('--line-dark') },
        copper: { DEFAULT: v('--copper'), light: v('--copper-light') },
        rice: v('--rice'),
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'Times New Roman', 'serif'],
      },
      maxWidth: {
        shell: '1560px',
        prose: '62ch',
      },
      borderRadius: {
        DEFAULT: '3px',
      },
      transitionTimingFunction: {
        survey: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
