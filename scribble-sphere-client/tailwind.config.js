/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  importent: "#root",
  theme: {
    extend: {
      fontFamily:{
        McLaren:['McLaren','cursive']
      }
    },
  },
  plugins: [],
}