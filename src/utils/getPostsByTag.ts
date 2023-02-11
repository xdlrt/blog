import { slufigyAll } from "./slugify";
import type { PostCollectionEntry } from "@types";

const getPostsByTag = (posts: PostCollectionEntry[], tag: string) =>
  posts.filter(post => slufigyAll(post.data.tags).includes(tag));

export default getPostsByTag;
