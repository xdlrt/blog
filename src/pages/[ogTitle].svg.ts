import generateOgImage from "@utils/generateOgImage";
import type { APIRoute } from "astro";
import { getPublishPosts } from "@utils/getPosts";

export const get: APIRoute = async ({ params }) => ({
  body: await generateOgImage(params.ogTitle),
});

const postImportResult = await getPublishPosts();
const posts = Object.values(postImportResult);

export function getStaticPaths() {
  return posts
    .filter(({ data }) => !data.ogImage)
    .map(({ data }) => ({
      params: { ogTitle: data.title },
    }));
}
