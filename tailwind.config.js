/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gmx-dark': '#0a0a0a',
        'gmx-darker': '#000000',
        'gmx-card': '#1a1a1a',
        'gmx-blue': '#FFD700',
        'gmx-border': '#333333',
        'gold': '#FFD700',
        'gold-dark': '#B8860B',
        'gold-light': '#FFF8DC',
      },
    },
  },
  plugins: [],
}
