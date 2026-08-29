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
          // amber-on-deep-slate palette — standard security-review category convention
          // (keys kept as .green/.greenDark so existing className usage keeps working)
          green: "#f59e0b",
          greenDark: "#d97706",
          bg: "#0b1220",
          surface: "#111a2e",
          card: "#142036",
          cardHover: "#1b2948",
          border: "#1f2a44",
          borderHover: "#f59e0b4d",
          muted: "#64748b",
          text: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "green-glow": "radial-gradient(ellipse at center, rgba(245,158,11,0.10) 0%, transparent 70%)",
        "card-gradient": "linear-gradient(135deg, #142036 0%, #111a2e 100%)",
        "hero-gradient": "linear-gradient(180deg, #111a2e 0%, #0b1220 100%)",
      },
      boxShadow: {
        "green-sm": "0 0 12px rgba(245,158,11,0.14)",
        "green-md": "0 0 24px rgba(245,158,11,0.20)",
        "green-lg": "0 0 48px rgba(245,158,11,0.24)",
        "card": "0 1px 2px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
