import { getBlog } from "@/utils/getBlog";
import { getOgImage } from "@/utils/getOgImage";
import type {
  APIContext,
  APIRoute,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "astro";

const blog = await getBlog();

export const getStaticPaths = (async () => {
  const results = [...blog].map((post) => {
    const { collection, slug, data } = post;
    const path = `${collection}/${slug}`;
    return {
      params: { path },
      props: {
        title: data.title,
      },
    };
  });
  return [...results];
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute = async (context: APIContext) => {
  const { params, props } = context;
  const { path } = params;
  const { title } = props as Props;
  const post = blog.find((post) => `${post.collection}/${post.slug}` === path);
  if (!post || !title) return new Response("Page not found", { status: 404 });

  const img = await getOgImage(title, import.meta.env.DEV);
  return new Response(img);
};
