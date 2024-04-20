import fs from "node:fs";
import path from "node:path"
import sharp from "sharp";
import { hashStringToSHA256 } from "./hashStringToSHA256";

const publicPath = "./public"
const dir = "./assets/embed";
const extension = "avif";
const quality = 75;
const size = 400;

// if(!fs.existsSync(dir)){
//   fs.mkdirSync(dir, {
//     recursive: true
//   })
// }

export async function getEmbedImageSrc(url: string){
  const hash = await hashStringToSHA256(url);
  const imagePath = path.join(publicPath, dir, `${hash}.${extension}`);

  if(!fs.existsSync(imagePath)) {
    const response = await fetch(url)
    if(!response.ok) {
      throw new Error(`Failed to fetch the image. Status code: ${response.status}`);
    }
    const buffer = await response.arrayBuffer();
    const imageBuffer = await sharp(buffer)
      .resize(size)
      .toFormat(extension, {
        quality,
      })
      .toBuffer();
    fs.writeFileSync(imagePath, imageBuffer)
  }

  const result = `/assets/${hash}.${extension}`
  return result;
}
