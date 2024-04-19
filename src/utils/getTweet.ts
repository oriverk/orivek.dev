// [oEmbed API | Docs | Twitter Developer Platform](https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api#item1)
import path from "node:path"
import fs from "fs-extra"

interface Option {
  // When set to true, links in a Tweet are not expanded to photo, video, or link previews.
  hide_media: boolean;
  // When set to true, a collapsed version of the previous Tweet in a conversation thread will not be displayed when the requested Tweet is in reply to another Tweet.
  hide_thread: boolean;
  // When set to true, the <script> responsible for loading widgets.js will not be returned. 
  omit_script: boolean;
  // Specifies whether the embedded Tweet should be floated left, right, or center in the page relative to the parent element.
  align: "left" | "right" | "center" | "none";
  // Request returned HTML and a rendered Tweet in the specified
  // [Supported languages and browsers | Docs | Twitter Developer Platform](https://developer.twitter.com/en/docs/twitter-for-websites/supported-languages)
  lang: "en" | "ja";
  // When set to dark, the Tweet is displayed with light text over a dark background.
  theme: "dark" | "light";
  // When set to true, the Tweet and its embedded page on your site are not used for purposes that include personalized suggestions and personalized ads.
  dnt: boolean;
}

interface ResponseType {
  url: string;
  author_name: string;
  author_url: string;
  html: string;
  width: number;
  height: number | null;
  type: string;
  cache_age: string;
  provider_name: string;
  provider_url: string;
  version: string;
}

async function fetchTweet(url: string, option?: Partial<Option>){
  // const target = "https://publish.twitter.com/oembed";
  // const target = new URL('https://publish.twitter.com/oembed');
  const target = new URL("https://publish.twitter.com/oembed");
  target.searchParams.set("url", url);
  for (const [key, value] of Object.entries(option || {})){
    target.searchParams.set(key, value.toString())
  }
  const response = await fetch(target.toString())
  if (!response.ok) {
    throw new Error(`failed to fetch tweet at "${url}" with "${response.status}".`)
  }
  const data = await response.json() as Promise<ResponseType>
  return data;
}

export async function getTweet(url: string, option?: Partial<Option>) {
  const jsonPath = path.join(process.cwd(), ".contents/twitter.json");  
  await fs.ensureFile(jsonPath)
  const json: Record<string, ResponseType> = await fs.readJson(jsonPath) || {};
  let data: ResponseType

  if(json[url]){
    data = json[url]
  } else {
    const result = await fetchTweet(url, option);
    data = result;
    if(import.meta.env.PROD){
      await fs.writeJson(jsonPath, {
        ...json,
        [url]: result
      },
      {
        spaces: 2
      })
    }
  }

  return data;
}
