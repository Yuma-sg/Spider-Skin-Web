/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─────────────────────────────
      // COLORS — Dark Premium Garage
      // ─────────────────────────────
      colors: {
        background: '#0B0B0C', // fondo principal
        surface: '#121214',    // cards / secciones
        border: '#1F1F23',

        text: {
          primary: '#F5F5F7',
          secondary: '#A1A1AA',
          muted: '#71717A',
        },

        primary: {
          DEFAULT: '#E10600',  // rojo racing Spider Skin
          dark: '#9F0400',
        },

        success: '#16a34a',
        warning: '#f59e0b',
        danger: '#dc2626',
      },

      // ─────────────────────────────
      // FONTS
      // ─────────────────────────────
      fontFamily: {
        display: ['var(--font-display)'], // CODE Bold
        body: ['var(--font-body)'],       // Inter
        mono: ['JetBrains Mono', 'monospace'],
      },

      // ─────────────────────────────
      // ANIMATIONS (sutiles, premium)
      // ─────────────────────────────
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
