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
        customDarkBlue: "#10172a",
        customPurple: "#6F5F90", //purple and medium for wide space
        customMediumBlue: "#758EB7", //medium and green for buttons
        customGreenBlue: "#A5CAD2",
        customPink: "#FF7B89",
        customBeige: "#F8E4D5",
        customLightBlue: "#8B9EE0",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
