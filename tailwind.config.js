/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        serif: ['"Zen Old Mincho"', 'serif'],
      },
      colors: {
        aurora: {
          blue: '#4A90E2',      // Softer, reliable blue
          purple: '#9B51E0',    // Noble purple
          cyan: '#50E3C2',      // Vitality cyan
          pink: '#FF80B5',      // Warmth
          text: '#334155',      // Slate-700 for softer text
          dark: '#1e293b',      // Slate-800
        }
      },
      backgroundImage: {
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3))',
      }
    }
  },
  plugins: [],
}