/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#2F4538',
        'secondary-green': '#3A563F',
        'zoo-forest': 'var(--zoo-forest)',
        'zoo-forest-soft': 'var(--zoo-forest-soft)',
        'zoo-sage': 'var(--zoo-sage)',
        'zoo-mist': 'var(--zoo-mist)',
        'zoo-cream': 'var(--zoo-cream)',
        'zoo-ink': 'var(--zoo-ink)',
        'zoo-muted': 'var(--zoo-muted)',
        'zoo-border': 'var(--zoo-border)',
        'zoo-gold': 'var(--zoo-gold)',
      },
      fontFamily: {
        lemon: ['var(--font-lemon)'],
        montserrat: ['var(--font-montserrat)'],
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
