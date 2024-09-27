/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: 12,
    },
    screens: {
      xl: { max: "1200px" },
      extralg: { max: "1100px" },
      lg: { max: "992px" },
      tbl: { max: "767px" },
      medium: { max: "650px" },
      mobile: { max: "576px" },
      small: { max: "480px" },
      xs: { max: "360px" },
    },
    extend: {
      fontFamily: {
        roboto: "Roboto",
        robotoCond: "Roboto Condensed",
        raleway: "Raleway",
      },
      colors: {
        white: "#f0f0f0",
        pageBg: "#0E0F20",
      },
      boxShadow: {
        gameShadow: "0 17px 17px 0 rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
