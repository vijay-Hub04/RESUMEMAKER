/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Indigo primary
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          cyan: '#06b6d4',
          violet: '#8b5cf6',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
        dark: {
          bg: '#0B1120',
          card: '#151F32',
          cardHover: '#1c2844',
          border: '#1E293B',
          text: '#F8FAFC',
          muted: '#94A3B8',
        },
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          cardHover: '#F1F5F9',
          border: '#E2E8F0',
          text: '#0F172A',
          muted: '#64748B',
        }
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-lg': '0 10px 40px -10px rgba(99, 102, 241, 0.3)',
      },
    },
  },
  plugins: [],
}
