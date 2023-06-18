/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        faustina: ["Faustina", "serif"],
      },
      colors: {
        green: "#497D3B",
        semigreen: "#ecf6eb",
        yellow: {
          100: "#f0ff79",
          200: "#ffcc40",
        },
        pink: "#d4aaa6",
        red: {
          100: "#E70D0D",
          200: "#FF0000",
        },
        gray: {
          100: "#eee",
          200: "#dbdbdb",
          300: "#d9d9d9",
          400: "#7f7f7f",
          500: "#454545",
          600: "#4a4a4a",
        },
        google: "#ff2b25",
        banner: "#d3aaa6",
      },
      backgroundImage: {
        facebook: "linear-gradient(#6b88c6,#5872aa)",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [],
};
