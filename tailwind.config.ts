import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        skyline: {
          50: "#f3f5ff",
          100: "#e7ebff",
          200: "#c4ccff",
          300: "#9eaaff",
          400: "#7686ff",
          500: "#4c5fff",
          600: "#3541db",
          700: "#252eaa",
          800: "#1a207a",
          900: "#0f124d"
        }
      },
      boxShadow: {
        glow: "0 0 30px rgba(76, 95, 255, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
