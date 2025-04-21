/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#4C6ECF",
        secondary:"#030207",
        softslate:"#383B43",
        bgprimary:"#FEFEFE"
      },
      fontFamily:{
        pop:"Poppins"
      }
    },
  },
  plugins: [],
}