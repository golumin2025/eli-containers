// @ts-check
import { defineConfig } from "astro/config";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";
import netlify from "@astrojs/netlify";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: 'https://miboxmovingandstorage.com',
  trailingSlash: 'ignore',
  integrations: [
    keystatic(),
    markdoc(),
    partytown(),
    react(),
    sitemap(),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
  adapter: netlify(),
});

