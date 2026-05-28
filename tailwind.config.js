/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange:      '#fc9e4f',
        'dark-bg':   'rgb(var(--rgb-dark-bg) / <alpha-value>)',
        'light-bg':  'rgb(var(--rgb-light-bg) / <alpha-value>)',
        'text-dark': 'rgb(var(--rgb-text-dark) / <alpha-value>)',
        'text-light':'rgb(var(--rgb-text-light) / <alpha-value>)',
        muted:       'rgb(var(--rgb-muted) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Cerebri Sans"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

