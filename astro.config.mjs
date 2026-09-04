// @ts-check
import { defineConfig } from "astro/config";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";
import netlify from "@astrojs/netlify";
import getoutsend from "./src/integrations/getoutsend";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

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
    getoutsend({
      fromName: "Box Rental Now",
      fromEmail: "info@boxrentalnow.com",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: netlify(),
});
