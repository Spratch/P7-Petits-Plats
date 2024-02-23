/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./**/*.{html,js}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'card': '0 4px 34px 30px rgba(0, 0, 0, 0.04)'
      }
    },
    colors: {
      "yellow": "#FFD15B",
      "black": "#1B1B1B",
      "grey": "#7A7A7A",
      "light-grey": "#C6C6C6",
      "offwhite": "#EDEDED",
      "white": "#FFFFFF",
    },
    fontFamily: {
      "sans": ["manrope", "system-ui"],
      "display": ["anton", "system-ui"]
    },
  },
  plugins: [],
}