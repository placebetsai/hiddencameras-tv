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
          green: "#3b82f6",
          greenDark: "#2563eb",
          bg: "#0a0e1a",
          surface: "#0d1424",
          card: "#111827",
          cardHover: "#1a2438",
          border: "#1e2d47",
          borderHover: "#2a3f5f",
          muted: "#64748b",
          text: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "green-glow": "radial-gradient(ellipse at center, rgba(59,130,246,0.1) 0%, transparent 70%)",
        "card-gradient": "linear-gradient(135deg, #111827 0%, #0d1424 100%)",
        "hero-gradient": "linear-gradient(180deg, #0d1424 0%, #0a0e1a 100%)",
      },
      boxShadow: {
        "green-sm": "0 0 12px rgba(59,130,246,0.15)",
        "green-md": "0 0 24px rgba(59,130,246,0.22)",
        "green-lg": "0 0 48px rgba(59,130,246,0.28)",
        "card": "0 1px 3px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.4)",
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
