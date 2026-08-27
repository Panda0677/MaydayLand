import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#FF7A21",
        "brand-pressed": "#E86412",
        "brand-soft": "#FFF3EA",
        page: "#F7F7F8",
        surface: "#FFFFFF",
        ink: "#171717",
        "ink-soft": "#3F3F46",
        muted: "#6B7280",
        subtle: "#9CA3AF",
        line: "#E5E7EB",
        live: "#16A34A",
        "live-soft": "#DCFCE7",
      },
      boxShadow: {
        soft: "0 6px 18px rgba(23, 23, 23, 0.045)",
        lift: "0 10px 28px rgba(23, 23, 23, 0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
