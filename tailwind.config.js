/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#00c853",
          bg: "#0d0d0d",
          card: "#1a1a1a",
          border: "#2a2a2a",
          muted: "#6b7280",
        },
      },
    },
  },
  plugins: [],
};
