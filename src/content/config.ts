import { defineCollection } from "astro:content";
import { blogSchema, newsletterSchema } from "./_schemas";

const blog = defineCollection({
  schema: blogSchema,
});

const newsletter = defineCollection({
  schema: newsletterSchema,
});

export const collections = { blog, newsletter };
