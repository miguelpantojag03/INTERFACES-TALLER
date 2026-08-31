/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          400: '#a3e635',
          500: '#84cc16',
          neon: '#c8ff00',
        },
        seat: {
          available: '#e2e5ea',
          occupied: '#b8bcc6',
          selected: '#6c47ff',
          hover: '#d0d4db',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"SF Pro Display"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 2px 16px 0 rgba(0,0,0,0.06)',
        'sm-soft': '0 1px 4px 0 rgba(0,0,0,0.07)',
      }
    },
  },
  plugins: [],
}
