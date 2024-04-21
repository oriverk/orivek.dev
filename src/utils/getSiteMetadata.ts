import fs from "node:fs";
import type { CardLinkEmbedType } from "@/types/oembed";
import fetchSiteMetadata from "fetch-site-metadata";
import { getEmbedImageSrc } from "./getEmbedImageSrc";

const dir = "./.contents";
const jsonPath = `${dir}/card-links.json`;
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
if (!fs.existsSync(jsonPath)) {
  fs.writeFileSync(jsonPath, JSON.stringify({}, null, 2));
}

const jsonString = fs.readFileSync("./.contents/card-links.json", {
  encoding: "utf-8",
});
const linksJson: Record<string, CardLinkEmbedType> = JSON.parse(jsonString);

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
    console.log("now fetching site metadata...");
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

  // if(result.image){
  //   const hoge = await getEmbedImageSrc(result.image)
  // }

  return {
    src: url,
    ...result,
  };
}
