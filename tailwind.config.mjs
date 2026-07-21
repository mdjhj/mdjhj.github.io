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
        // Outer page container (header + main).
        content: "72rem",
        // Reading-column width for text sections SITE-WIDE (used as
        // `max-w-prose` everywhere). Raise it (e.g. "56rem") for wider text,
        // or set it to "none" to let text span the full container.
        prose: "56rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
