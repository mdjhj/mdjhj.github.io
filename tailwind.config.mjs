/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Restrained ink-blue accent — not the default terracotta/green.
        accent: {
          DEFAULT: "#2c5fd6",
          soft: "#5b82e0",
          ink: "#1a3a8a",
        },
        paper: "#fafaf9",
        ink: "#16181d",
      },
      fontFamily: {
        display: ["'Space Grotesk Variable'", "system-ui", "sans-serif"],
        sans: ["'Inter Variable'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
