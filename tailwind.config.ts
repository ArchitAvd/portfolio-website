module.exports = {
  darkMode: "class", // <== THIS LINE IS IMPORTANT
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        nav: "5rem", // ~80px
      },
    },
  },
  plugins: [],
};
