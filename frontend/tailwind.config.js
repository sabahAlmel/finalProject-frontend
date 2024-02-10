/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange: "#FE8769",
        customBeige: "#F8E4D5",
        customDarkBlue: "#10172a",
        customMediumBlue: "#4A5EA3",
        customLightBlue: "#8B9EE0",
        customGreenBlue: "#A5CAD2",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
