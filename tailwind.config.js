/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        github: {
          bg: '#0D1117',
          secondary: '#161B22',
          border: '#30363D',
          hover: '#1F242C',
          active: '#21262d',
          blue: '#2F81F7',
          green: '#238636',
          greenHover: '#2EA043',
          red: '#DA3633',
          redHover: '#F85149',
          orange: '#D29922',
          text: '#C9D1D9',
          muted: '#8B949E',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Noto Sans', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
      }
    },
  },
  plugins: [],
};
