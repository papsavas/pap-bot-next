const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      lightText: colors.neutral[900],
      darkText: colors.neutral[300],
      lightBg: colors.white,
      darkBg: colors.neutral[700],
      lightBtn: colors.neutral[200],
      darkBtn: colors.neutral[200],
      error: colors.red[400],
    },

    extend: {},
  },
  plugins: [],
};
