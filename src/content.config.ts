import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "src/data/pages" }),
});

const blogs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/data/blogs" }),
});
const reviews = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "src/data/reviews" }),
});
const singletons = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "src/data/singletons" }),
});
export const collections = { pages, blogs, reviews, singletons };
