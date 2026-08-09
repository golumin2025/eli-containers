// @ts-check
import { defineConfig } from "astro/config";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";
import netlify from "@astrojs/netlify";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://www.boxrentalnow.com",
  trailingSlash: "ignore",
  redirects: {
    "/thankyou/": "/thank-you",
  },
  integrations: [
    keystatic(),
    markdoc(),
    partytown(),
    react(),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: cloudflare(),
});