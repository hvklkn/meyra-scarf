/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#fdfaf5',
          100: '#faf4e8',
          200: '#f5e9d3',
          300: '#ecdcba',
          400: '#e2cea0',
          500: '#d8bf88',
        },
        sand: {
          100: '#f2ede4',
          200: '#e8dfd0',
          300: '#d9ccb8',
          400: '#c9b99f',
          500: '#b9a587',
          600: '#9e8a6e',
          700: '#7d6d55',
          800: '#5c503f',
          900: '#3b3329',
        },
        rose: {
          blush: '#f4ddd5',
          soft:  '#e8c4b8',
          mauve: '#c9977f',
        },
        meyra: {
          primary:   '#b5936b',
          secondary: '#d4b898',
          dark:      '#3b3329',
          light:     '#fdfaf5',
        },
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['"Inter"', 'system-ui', 'sans-serif'],
        script: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'fade-in':    'fadeIn 1s ease forwards',
        'shimmer':    'shimmer 2.5s infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'texture-grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
