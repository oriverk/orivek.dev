import fs from "node:fs";
import type { CardLinkEmbedType } from "@/types/oembed";
import fetchSiteMetadata from "fetch-site-metadata";

const dir = "./.contents";
const jsonPath = `${dir}/card-links.json`;
if (!fs.existsSync(jsonPath)) {
  fs.writeFileSync(jsonPath, JSON.stringify({}, null, 2));
}

const linksJson: Record<string, CardLinkEmbedType> = JSON.parse(
  fs.readFileSync("./.contents/card-links.json", { encoding: "utf-8" }),
);

export async function getSiteMetadata(url: string) {
  let result: CardLinkEmbedType;

  if (linksJson[url]) {
    const { title, description, image } = linksJson[url];
    result = {
      title,
      description,
      image,
    };
  } else {
    const {
      title = "",
      description = "",
      image,
    } = await fetchSiteMetadata(url);
    result = {
      title,
      description,
      image: image?.src ?? "",
    };

    if (import.meta.env.PROD) {
      linksJson[url] = result;
      fs.writeFileSync(jsonPath, JSON.stringify(linksJson, null, 2));
    }
  }

  return {
    src: url,
    ...result,
  };
}
