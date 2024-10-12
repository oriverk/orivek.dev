import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const blogCollection = await getCollection("blog");
  const items = blogCollection
    .sort((a, b) => {
      return (
        new Date(b.data.update ?? b.data.create).getTime() -
        new Date(a.data.update ?? a.data.create).getTime()
      );
    })
    .map(({ id, data }) => {
      const { title, description, create } = data;
      return {
        title,
        pubDate: create,
        description: description ?? undefined,
        link: `/blog/${id}`,
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
