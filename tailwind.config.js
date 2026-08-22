/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Earthy green — agriculture, growth, sustainability
        forest: {
          50: '#f2f7ed',
          100: '#e2edd6',
          200: '#c7dcb0',
          300: '#a5c682',
          400: '#84ae5b',
          500: '#65913e',
          600: '#4d722f',
          700: '#3c5a26',
          800: '#324821',
          900: '#2b3d1e',
          950: '#15210d',
        },
        // Deep teal/blue — technology, precision, trust
        teal: {
          50: '#eefbfa',
          100: '#d4f3f1',
          200: '#ade6e3',
          300: '#78d2cf',
          400: '#42b3b1',
          500: '#279694',
          600: '#1c7877',
          700: '#1b6161',
          800: '#1a4e4e',
          900: '#194242',
          950: '#0a2626',
        },
        // Warm neutral backgrounds — paper, sand, clay
        sand: {
          50: '#fbf9f4',
          100: '#f6f1e6',
          200: '#ece2ca',
          300: '#ddcda3',
          400: '#cbb078',
          500: '#bb9758',
          600: '#a9814a',
          700: '#8c6a3f',
          800: '#725639',
          900: '#5e4731',
          950: '#322418',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(20, 40, 20, 0.12)',
        lift: '0 12px 32px -8px rgba(20, 40, 20, 0.22)',
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.8s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
