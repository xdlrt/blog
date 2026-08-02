import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { blogSchema, newsletterSchema } from "./schemas/content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
  schema: blogSchema,
});

const newsletter = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/newsletter" }),
  schema: newsletterSchema,
});

export const collections = { blog, newsletter };
