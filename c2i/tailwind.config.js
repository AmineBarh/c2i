/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orangec2i: {
          900: "#C2410C",
          500: "#F8B74C",
          100: "#FEF7EF",
        },
        bluec2i: {
          900: "#2469E4",
          500: "#2379BA",
          200: "#DBEAFE",
          100: "#EFF6FE",
        },
        greenc2i: {
          900: "#435E21",
          600: "#8BC445",
          500: "#8EC64C",
          100: "#ECFDF6",
          bg: "#D1FAE5",
        },
        blackc2i: {
          500: "#111827",
          100: "#4B5563",
          2: "#F3F4F6",
        },
      },
    },
  },
  plugins: [],
};
