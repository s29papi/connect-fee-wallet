/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        montalt: ["Montserrat Alternates"],
      },
      colors: {
        primary: "#1B5A9A",
        secondary: "#0E1621",
        yellow: "#4082BC",
        dark: "#17212B",
      },
    },
  },
  plugins: [],
};
