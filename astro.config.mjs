// @ts-check
import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import getoutsend from "./src/integrations/getoutsend/index.ts";
import turnstile from "./src/integrations/turnstile/index.ts";

export default defineConfig({
  site: "https://www.boxrentalnow.com",
  trailingSlash: "ignore",
  redirects: {
    "/thankyou/": "/thank-you",
  },
  integrations: [
    partytown(),
    react(),
    sitemap(),
    svelte(),
    getoutsend({
      fromName: "Box Rental Now",
      fromEmail: "marketing@boxrentalnow.com",
    }),
    turnstile(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: cloudflare(),
});
