// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables toggling via class on <html>
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Ensures all components are scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
