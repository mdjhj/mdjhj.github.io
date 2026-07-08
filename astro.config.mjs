// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Deployed as the user site `mdjhj.github.io` → served from the domain root,
// so base stays "/". If this ever moves to a project repo (e.g. `portfolio`),
// set base: "/portfolio/" to match.
export default defineConfig({
  site: "https://mdjhj.github.io",
  base: "/",
  integrations: [tailwind(), sitemap()],
});
