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
          green: "#22c55e",
          greenDark: "#16a34a",
          bg: "#0f1115",
          surface: "#13161b",
          card: "#111827",
          cardHover: "#1a1f2e",
          border: "#1f2937",
          borderHover: "#22c55e4d",
          muted: "#64748b",
          text: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "green-glow": "radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, transparent 70%)",
        "card-gradient": "linear-gradient(135deg, #111827 0%, #13161b 100%)",
        "hero-gradient": "linear-gradient(180deg, #13161b 0%, #0f1115 100%)",
      },
      boxShadow: {
        "green-sm": "0 0 12px rgba(34,197,94,0.12)",
        "green-md": "0 0 24px rgba(34,197,94,0.18)",
        "green-lg": "0 0 48px rgba(34,197,94,0.22)",
        "card": "0 1px 2px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
