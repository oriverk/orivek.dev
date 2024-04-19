import fs from "node:fs";
import fetchSiteMetadata from "fetch-site-metadata";
import type { CardLinkEmbedType } from "@/types/oembed";

const dir = "./.contents"
const jsonPath = `${dir}/card-links.json`;
if(!fs.existsSync(dir)){
  fs.mkdirSync(dir)
}
if(!fs.existsSync(jsonPath)){
  fs.writeFileSync(jsonPath, JSON.stringify({}, null, 2))
}

const jsonString = fs.readFileSync("./.contents/card-links.json", {
  encoding: "utf-8"
})
const linksJson: Record<string, CardLinkEmbedType> = JSON.parse(jsonString)

export async function getSiteMetadata(url: string) {
  let result: CardLinkEmbedType
  
  if(linksJson[url]){
    const {title, description, image} = linksJson[url]
    result = {
      title,
      description,
      image
    }

  } else {
    const { title = "", description = "", image } = await fetchSiteMetadata(url);
    result = {
      title,
      description,
      image: image?.src ?? ""
    }

    if(import.meta.env.PROD){
      linksJson[url] = result;
      fs.writeFileSync(jsonPath, JSON.stringify(linksJson, null, 2))
    }
  }

  return {
    src: url,
    ...result
  }
}
