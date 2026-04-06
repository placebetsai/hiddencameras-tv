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
          green: "#00e676",
          greenDark: "#00c853",
          bg: "#080b0d",
          surface: "#0f1317",
          card: "#141a1f",
          cardHover: "#1a2128",
          border: "#1e2832",
          borderHover: "#2a3a48",
          muted: "#4a5568",
          text: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "green-glow": "radial-gradient(ellipse at center, rgba(0,230,118,0.08) 0%, transparent 70%)",
        "card-gradient": "linear-gradient(135deg, #141a1f 0%, #0f1317 100%)",
        "hero-gradient": "linear-gradient(180deg, #0f1317 0%, #080b0d 100%)",
      },
      boxShadow: {
        "green-sm": "0 0 12px rgba(0,230,118,0.12)",
        "green-md": "0 0 24px rgba(0,230,118,0.18)",
        "green-lg": "0 0 48px rgba(0,230,118,0.22)",
        "card": "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanline": "scanline 5s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
