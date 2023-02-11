import { slugifyStr } from "./slugify";
import type { PostCollectionEntry } from "@types";

const getUniqueTags = (posts: PostCollectionEntry[]) => {
  let tags: string[] = [];
  const filteredPosts = posts.filter(({ data }) => !data.draft);
  filteredPosts.forEach(post => {
    tags = [...tags, ...post.data.tags]
      .map(tag => slugifyStr(tag))
      .filter(
        (value: string, index: number, self: string[]) =>
          self.indexOf(value) === index
      );
  });
  return tags;
};

export default getUniqueTags;
