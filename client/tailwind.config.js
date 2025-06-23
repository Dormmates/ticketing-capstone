/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F1B15E",
        lightPrimary: "#FFF8F0",
        green: "#64CA7A",
        red: "#E95C5C",
        grey: "#E4E4E4",
        darkGrey: "#B4B4B4",
        lightGrey: "#CFCFCF",
        tableBorder: "#EBEBEB",
      },
    },
  },
  plugins: [],
};
