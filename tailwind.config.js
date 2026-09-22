/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gp: {
          50: '#EFF7FC',
          100: '#DAEDF8',
          200: '#B5DBF1',
          300: '#83C3E7',
          400: '#3EA3D9',
          500: '#1B8DCB',
          600: '#0079C2',
          700: '#006199',
          800: '#04517F',
          900: '#0A4066',
          950: '#072B47',
        },
        navy: '#0B2E4F',
        graphite: '#1E2530',
      },
      fontFamily: {
        sans: [
          '"Inter Variable"',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(7,43,71,.06), 0 8px 24px -12px rgba(7,43,71,.18)',
        cardHover: '0 2px 4px rgba(7,43,71,.08), 0 16px 32px -12px rgba(7,43,71,.28)',
      },
      maxWidth: {
        page: '84rem',
      },
    },
  },
  plugins: [],
};
