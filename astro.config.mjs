// @ts-check
import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  trailingSlash: "ignore",
  redirects: {
    "/thankyou/": "/thank-you",
  },
  integrations: [
    partytown(),
    react(),
    sitemap(),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: cloudflare(),
});
