/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
'open': ['Open Sans', 'sans-serif'],
'poppins': ['Poppins', 'sans-serif'],
'work': ['Work Sans', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'heroBg': "url('dist/img/hero.png')",
      },
      colors: {
        'airbanBlue': '#134B86',
      },
    },
  },
  plugins: [],
}

