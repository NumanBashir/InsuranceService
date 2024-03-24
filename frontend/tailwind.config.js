/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#131947",
        secondary: "#53759B",
        tertiary: "#5CA9DD",
      },
      spacing: {
        '100': '25rem',
        '128': '32rem'
      },
    },
  },
  plugins: [],
};
