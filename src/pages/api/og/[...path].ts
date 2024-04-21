import fs from "node:fs";
import * as nodePath from "node:path";
import { getBlog } from "@/utils/getBlog";
import { getOgImage } from "@/utils/getOgImage";
import { hashStringToSHA256 } from "@/utils/hashStringToSHA256";
import type {
  APIContext,
  APIRoute,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "astro";
import urlJoin from "url-join";

const blog = await getBlog();
const extension: "jpg" | "png" | "webp" | "avif" = "webp";

export function getOgImageSrc(origin: string, pathname: string) {
  return urlJoin(origin, "api/og", `${pathname}.${extension}`)
}

export const getStaticPaths = (async () => {
  const results = [...blog].map((post) => {
    const { collection, slug, data } = post;
    const path = `${collection}/${slug}.${extension}`;
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
  const post = blog.find((post) => `${post.collection}/${post.slug}.${extension}` === path);
  if (!post || !title) return new Response("Page not found", { status: 404 });

  let imageBuffer: Buffer;
  const hash = await hashStringToSHA256(path);
  const dirPath = nodePath.join(process.cwd(), "src/assets/images/og");
  const imagePath = nodePath.join(dirPath, `${hash}.${extension}`);

  if (fs.existsSync(imagePath)) {
    imageBuffer = fs.readFileSync(imagePath);
  } else {
    const result = await getOgImage(title, {
      extension,
      quality: 75,
      debug: import.meta.env.DEV,
    });
    imageBuffer = result;

    if (import.meta.env.PROD) {
      fs.writeFileSync(imagePath, imageBuffer);
    }
  }

  return new Response(imageBuffer);
};
