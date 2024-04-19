import path from "node:path"
import fs from "fs-extra"
import fetchSiteMetadata from "fetch-site-metadata";

const linksPath = path.join(process.cwd(), ".contents/card-links.json");  
await fs.ensureFile(linksPath)
const linksJson: linksJson = await fs.readJson(linksPath) || {};

type linksJson = Record<string, {
  title: string;
  description: string;
  image: string;
}>

export async function getSiteMetadata(url: string) {
  let title = "";
  let description = "";
  let image = "";
  
  if(linksJson[url]){
    title = linksJson[url].title;
    description = linksJson[url].description
    image = linksJson[url].image
  } else {
    const result = await fetchSiteMetadata(url);
    title = result.title ?? "";
    description = result.description ?? "";
    image = result.image?.src ?? ""

    if(import.meta.env.PROD){
      await fs.writeJson(linksPath, {
        ...linksJson,
        [url]: {
          title,
          description,
          image
        }
      }, 
      {
        spaces: 2,
      })
    }
  }

  return {
    src: url,
    title,
    description,
    image
  }
}
