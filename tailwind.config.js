/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1b4965',
        orange: '#fc9e4f',
        'dark-bg': '#0E0E0E',
        'light-bg': '#ffffff',
        cream: '#F5F0E8',
        'text-dark': '#0E0E0E',
        'text-light': '#F5F0E8',
        muted: '#888680',
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Barlow Condensed"', 'sans-serif'],
        body: ['"DM Sans"', '"Syne"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

