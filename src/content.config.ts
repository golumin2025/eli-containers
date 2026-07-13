import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

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

const locations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/data/locations" }),
  schema: z.object({
    title: z.string(), // SEO <title>
    city: z.string(),
    state: z.string().default("FL"),
    region: z.string().default("Gulf Coast"),
    metaDescription: z.string(),
    heroHeading: z.string(),
    heroSubheading: z.string().optional(),
    intro: z.string(),
    // Optional list of nearby neighborhoods / areas served
    neighborhoods: z.array(z.string()).default([]),
    // Optional highlight stats: { value, label }
    highlights: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
    order: z.number().default(0),
  }),
});

export const collections = { pages, blogs, reviews, singletons, locations };
