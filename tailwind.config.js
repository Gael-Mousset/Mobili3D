/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#004aad',
        },
        lime: {
          accent: '#c8e630',
          dark: '#a5bf28',
          glow: 'rgba(200,230,48,0.15)',
        },
        dark: {
          bg: '#0a0a0a',
          surface: '#141414',
          alt: '#1a1a1a',
          border: '#2a2a2a',
          hover: '#3a3a3a',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}
