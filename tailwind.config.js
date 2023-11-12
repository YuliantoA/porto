/** @type {import('tailwindcss').Config} */
const svgToDataUri = require('mini-svg-data-uri')
module.exports = {
  important: true,
  important: '#app',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
      height: {
         '1/12': '8.333333%',
         '2/12': '16.666667%',
         '3/12': '25%',
'4/12':'33.333333%',
'5/12':'41.666667%',
'6/12':'50%',
'7/12':'58.333333%',
'8/12':'66.666667%',
'9/12':'75%',
'10/12':'83.333333%',
'11/12':'91.666667%',
'12/12':'100%'
       },
     fontFamily: {
        gardenia: ['gardenia', 'sans-serif'],
       roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: (theme) => ({
        'multiselect-caret': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>`,
        )}")`,
        'multiselect-spinner': `url("${svgToDataUri(
          `<svg viewBox="0 0 512 512" fill="${theme('colors.green.500')}" xmlns="http://www.w3.org/2000/svg"><path d="M456.433 371.72l-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z"></path></svg>`,
        )}")`,
        'multiselect-remove': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>`,
        )}")`,
      }),
      colors: {
      'quiz-beige':'#f5f5dc',
      'quiz-darkBlue':'#264898',
      'quiz-blue':'#0AA7E8',
      'quiz-lightBlue':'#59d2fe',
      'quiz-darkBlue2': '#191923',
      'kajian-darkBlue':'#0964F6',
      'kajian-gray':'#E6EBF9',
      'kajian-lightGray':'#f5f7fd',
      'kajian-darkGray':'#b4b4b4',
      'kajian-darkestGray':'#a1a5ae',
      'kajian-lightBlue':'#4DB2FE',
      'kajian-blue':'#1C8AF8',
        'kajian-white': '#FEFEFE',
      'kajian-red':'#Cc0202',
      'kajian-red-transparent':'#FEBBBB'
    },
    },
  },
  plugins: [],
 };

