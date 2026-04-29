/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6', // purple
        accent: '#0ea5e9', // neon blue
        background: '#0a0a0a', // near black
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        neon: '0 0 10px rgba(138, 92, 246, 0.7), 0 0 20px rgba(14, 165, 233, 0.5)',
      },
    },
  },
  plugins: [],
};
