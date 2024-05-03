/** @type {import('tailwindcss').Config} */
const colors = import("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "hygieia-red-500": "#FA4D5E",
        "asklepios-gray-200": "#DCE1E8",
      },
    },
  },
  plugins: [],
};
