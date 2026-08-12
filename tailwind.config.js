/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#0B0C0E', // --background
          900: '#131519', // --surface
          850: '#1B1E24', // --surface-2
          800: '#232730',
          700: '#2E333F',
        },
        orange: {
          400: '#FB8B3C', // --primary-hover
          500: '#F97316', // --primary (accent)
          600: '#EA580C',
          700: '#C2410C',
          950: '#431407',
        },
        foreground: '#F2F3F5',
        muted: '#9BA1AC',
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
        'btn': '8px',
      }
    },
  },
  plugins: [],
}
