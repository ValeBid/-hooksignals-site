/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        hs: {
          bg:      "#020408",
          surface: "rgba(255,255,255,0.04)",
          cyan:    "#22d3ee",
          violet:  "#818cf8",
          sky:     "#0ea5e9",
        },
      },
      boxShadow: {
        "glow-cyan":   "0 0 40px rgba(34, 211, 238, 0.18)",
        "glow-violet": "0 0 40px rgba(129, 140, 248, 0.18)",
        "glow-sm":     "0 0 20px rgba(34, 211, 238, 0.12)",
        "card":        "0 24px 80px rgba(0, 0, 0, 0.35)",
        "card-hover":  "0 32px 100px rgba(0, 0, 0, 0.50)",
        "card-xl":     "0 48px 140px rgba(0, 0, 0, 0.55)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        250: "250ms",
        350: "350ms",
        450: "450ms",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(34, 211, 238, 0.25)" },
          "50%":      { boxShadow: "0 0 0 8px rgba(34, 211, 238, 0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
      },
      animation: {
        "fade-up":    "fade-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in":   "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-up":   "slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-ring": "pulse-ring 2.4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
