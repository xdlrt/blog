import rss from "@astrojs/rss";
import { SITE } from "@config";
import slugify from "@utils/slugify";
import { getPublishPosts } from "@utils/getPosts";

export async function get() {
  const posts = await getPublishPosts();
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: posts.map(({ data }) => ({
      link: `posts/${slugify(data)}`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.pubDatetime),
    })),
  });
}
