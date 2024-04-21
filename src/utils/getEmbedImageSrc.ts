import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { hashStringToSHA256 } from "./hashStringToSHA256";

const publicPath = "./public";
const dir = "./assets/embed";
const extension = "avif";
const quality = 75;
const size = 400;

// if(!fs.existsSync(dir)){
//   fs.mkdirSync(dir, {
//     recursive: true
//   })
// }

if (!fs.existsSync("./.contents")) {
  fs.mkdirSync("./.contents");
}
if (!fs.existsSync("./.contents/external-image.json")) {
  fs.writeFileSync("./.contents/external-image.json", "{}");
}
const externalImageJson: Record<string, string> = JSON.parse(
  fs.readFileSync("./.contents/external-image.json", { encoding: "utf-8" }),
);

export async function getEmbedImageSrc(url: string) {
  let src = "";

  if (externalImageJson[url]) {
    src = externalImageJson[url];
  } else if (import.meta.env.PROD) {
    const hash = await hashStringToSHA256(url);
    const imagePath = path.join(publicPath, dir, `${hash}.${extension}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the image. Status code: ${response.status}`,
      );
    }
    const buffer = await response.arrayBuffer();
    const imageBuffer = await sharp(buffer)
      .resize(size)
      .toFormat(extension, {
        quality,
      })
      .toBuffer();
    fs.writeFileSync(imagePath, imageBuffer);
    const result = `/assets/${hash}.${extension}`;
    return result;
  } else {
    return url;
  }
}
