/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
'open': ['Open Sans', 'sans-serif'],
'poppins': ['Poppins', 'sans-serif'],
'work': ['Work Sans', 'sans-serif'],
'ubuntu': ['Ubuntu', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'heroBg': "url('dist/img/hero.png')",
      },
      colors: {
        'airbanBlue': '#1B63A3',
        'airbanFooter': '#134B86',
      },
    },
  },
  plugins: [],
}

