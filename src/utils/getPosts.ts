import { getCollection } from "astro:content";

export const getAllPosts = async () => {
  const blogs = await getCollection("blog");
  const newsletters = await getCollection("newsletter");
  const posts = [...blogs, ...newsletters];
  return posts;
};

export const getPosts = async (type: "blog" | "newsletter") => {
  const posts = await getCollection(type);
  return posts;
};

export const getPublishPosts = async () => {
  const blogs = await getCollection("blog", ({ data }) => !data.draft);
  const newsletters = await getCollection(
    "newsletter",
    ({ data }) => !data.draft
  );
  const posts = [...blogs, ...newsletters];
  return posts;
};
