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
        dark: "#111",
        darker: "#101010",
        darkGrey: "#777",
      
        primary: "#1949ff",
        primaryLight: "#87a0ff",
        primaryDark: "#8E2600",
      
        secondary: "#3fb12e",
        secondaryLight: "#89F978",
        secondaryDark: "#0C5E00",
      }
    },
  },
  plugins: [],
};
