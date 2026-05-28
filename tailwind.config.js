/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#fc9e4f',
        'dark-bg': '#0E0E0E',
        'light-bg': '#ffffff',
        'text-dark': '#0E0E0E',
        'text-light': '#ffffff',
        muted: '#888888',
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Barlow Condensed"', 'sans-serif'],
        body: ['"DM Sans"', '"Syne"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

