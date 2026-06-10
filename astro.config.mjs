// @ts-check
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://miboxmovingandstorage.com",
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
  adapter: netlify(),
});
