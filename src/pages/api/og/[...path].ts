import fs from "node:fs";
import { getBlog } from "@/utils/getBlog";
import { getOgImage } from "@/utils/getOgImage";
import type {
  APIContext,
  APIRoute,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "astro";
import { hashStringToSHA256 } from "@/utils/hashStringToSHA256";

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
  const { path = "" } = params;
  const { title } = props as Props;
  const post = blog.find((post) => `${post.collection}/${post.slug}` === path);
  if (!post || !title) return new Response("Page not found", { status: 404 });

  let imageBuffer: Buffer
  const hash = await hashStringToSHA256(path)
  const imageDir = "./src/assets/images/og"
  const extension: "jpg" | "png" |"webp" | "avif" = "webp"
  const imagePath = `${imageDir}/${hash}.${extension}`;

  if(!fs.existsSync(imageDir)){
    fs.mkdirSync(imageDir)
  }

  if(fs.existsSync(imagePath)){
    imageBuffer = fs.readFileSync(imagePath);
  } else {
    const result = await getOgImage(title, {
      extension,
      quality: 75,
      debug: import.meta.env.DEV, 
    });
    imageBuffer = result;
    fs.writeFileSync(imagePath, imageBuffer)
  }

  return new Response(imageBuffer);
};
