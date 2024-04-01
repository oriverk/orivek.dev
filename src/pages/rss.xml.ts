import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getBlog } from "../utils/getBlog";

export async function GET(context: APIContext) {
  const blog = await getBlog();
  const items = blog.map(({ slug, data }) => {
    const { title, description, create } = data;
    const link = `/blog/${slug}`;
    return {
      title,
      pubDate: create,
      description: description ?? undefined,
      link,
    };
  });
  return rss({
    title: "oriverk.dev",
    description: "",
    site: context.site || "",
    items,
    customData: "<language>ja-JP</language>",
  });
}
