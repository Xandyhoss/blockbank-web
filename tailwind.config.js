/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        dark: {
          800: "#101010",
        },
        dukeBlue: {
          800: "#090C9B",
        },
        blue: {
          500: "#3D52D5",
        },
        pink: {
          500: "#EF476F",
        },
      },
    },
  },
  plugins: [],
};
