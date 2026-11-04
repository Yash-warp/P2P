/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: "#30105E",
          violet: "#7C3AED",
          violetHover: "#6D28D9",
          lightLavender: "#C4B5FD",
          veryLight: "#FAF8FF",
          softLavender: "#E9D5FF",
        },
        rentic: {
          bg: "#FAF8FF",
          card: "#FFFFFF",
          primary: "#30105E",
          accent: "#7C3AED",
          highlight: "#C4B5FD",
          soft: "#E9D5FF",
          veryLight: "#FAF8FF",
          dark: "#30105E",
          darker: "#1E0B3D",
          muted: "#6B5E87",
          border: "#E9D5FF",
          subtle: "#F5F0FF"
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', '"Manrope"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neu-flat': '4px 4px 12px rgba(0, 0, 0, 0.06), -4px -4px 12px rgba(255, 255, 255, 0.95)',
        'neu-convex': '3px 4px 10px rgba(0, 0, 0, 0.08), -3px -3px 10px rgba(255, 255, 255, 0.95)',
        'neu-pressed': 'inset 2px 2px 5px rgba(0, 0, 0, 0.09), inset -2px -2px 5px rgba(255, 255, 255, 0.9)',
        'neu-pill': '0 4px 14px 0 rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
        'soft-glow': '0 0 25px -5px rgba(124, 58, 237, 0.35)',
        'purple-card': '0 10px 30px -5px rgba(48, 16, 94, 0.07), 0 4px 6px -2px rgba(124, 58, 237, 0.04)'
      },
      borderRadius: {
        '22': '22px',
        '28': '28px',
        '32': '32px',
        '40': '40px',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        }
      },
      animation: {
        'ticker': 'ticker 35s linear infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
