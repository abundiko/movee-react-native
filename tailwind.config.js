/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        white: "#fff",
        lighter: "#ededed",
        light: "#ccc",
        lightGrey: "#acacac",
        black: "#000",
        dark: "#001",
        darker: "#101011",
        darkGrey: "#777",
      
        primary: "#9606ff",
        primaryLight: "#cc87ff",
        primaryDark: "#2f004b",
      
        secondary: "#3fb12e",
        secondaryLight: "#89F978",
        secondaryDark: "#0C5E00",
      }
    },
  },
  plugins: [],
};
