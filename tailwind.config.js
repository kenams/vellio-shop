/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#f8f5ef",
          100: "#eee6d7",
          200: "#ddccb0",
          300: "#c9ad7c",
          400: "#b99258",
          500: "#a67f3f",
          600: "#80602f",
          700: "#5f4625",
          800: "#402f1d",
          900: "#261c14",
        },
        brand: {
          DEFAULT: "#0b0b0c",
          light:   "#191817",
          accent:  "#b9965b",
          ivory:   "#f7f3ea",
          mist:    "#e8e1d3",
          graphite:"#2b2b2d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #050505 0%, #161514 56%, #2a2114 100%)",
        "gradient-card":  "linear-gradient(145deg, #ffffff 0%, #f7f3ea 100%)",
      },
      boxShadow: {
        "card":       "0 1px 2px rgba(10,10,10,0.05), 0 16px 45px -32px rgba(10,10,10,0.35)",
        "card-hover": "0 28px 80px -36px rgba(10,10,10,0.55), 0 10px 30px -18px rgba(185,150,91,0.45)",
        "btn":        "0 12px 30px -18px rgba(185,150,91,0.85)",
        "btn-violet": "0 12px 30px -18px rgba(10,10,10,0.45)",
      },
      animation: {
        "fade-in":    "fadeIn 0.5s ease-in-out",
        "slide-up":   "slideUp 0.6s cubic-bezier(0.22,1,0.36,1)",
        "slide-in":   "slideIn 0.4s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeIn:     { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp:    { "0%": { transform: "translateY(24px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        slideIn:    { "0%": { transform: "translateX(-16px)", opacity: "0" }, "100%": { transform: "translateX(0)", opacity: "1" } },
      },
    },
  },
  plugins: [],
};
