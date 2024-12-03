/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      colors:{
      'check':'#e8e2da',//'#004582',//'#cbc3e3',//'#faf4e8',//'#ac9cd9',
      'buttonCheck':'#faf4e8',
      'darkCheck':'#2b2d40',
      'headCheck':'#0a5494',//'#1ab08b',//'#3a5466',
      'headDarkCheck':'#202233',
      'darkButtonCheck':'#262738',
      'darkText':'#f0daf5'
    },
    },
  },
  plugins: [],
}

