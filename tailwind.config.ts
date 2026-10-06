import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        primary: { 
          DEFAULT: "hsl(var(--primary))", 
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))"
        },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        border: "hsl(var(--border))",
        brand: {
          navy: "#110771",
          navyDark: "#090342",
          navyLight: "#1c1294",
          gold: "#eea600",
          goldLight: "#fef3c7",
          purple: "#4e0a6c",
          purpleLight: "#fae8ff",
          green: "#66c329",
          greenLight: "#f0fdf4",
          cyan: "#309ac0",
          cyanLight: "#e0f2fe",
          orange: "#ee4c00",
          orangeLight: "#fff7ed",
          red: "#c00500",
          redLight: "#fef2f2",
        },
      },
      fontFamily: {
        sans: ["var(--font-rubik)", "Rubik", "Heebo", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(17, 7, 113, 0.06), 0 4px 6px -2px rgba(17, 7, 113, 0.03)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        elevated: "0 10px 25px -5px rgba(17, 7, 113, 0.1), 0 8px 10px -6px rgba(17, 7, 113, 0.05)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
