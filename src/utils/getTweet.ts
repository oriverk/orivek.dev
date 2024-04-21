import fs from "node:fs";
import type { TweetOptionType, TweetResponseType } from "@/types/oembed";

async function fetchTweet(url: string, option?: Partial<TweetOptionType>) {
  const target = new URL("https://publish.twitter.com/oembed");
  target.searchParams.set("url", url);
  for (const [key, value] of Object.entries(option || {})) {
    target.searchParams.set(key, value.toString());
  }
  const response = await fetch(target.toString());
  if (!response.ok) {
    throw new Error(
      `failed to fetch tweet at "${url}" with "${response.status}".`,
    );
  }
  const data: Promise<TweetResponseType> = await response.json();
  return data;
}

const dir = "./.contents";
const jsonPath = `${dir}/twitter.json`;
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
if (!fs.existsSync(jsonPath)) {
  fs.writeFileSync(jsonPath, JSON.stringify({}, null, 2));
}

const jsonString = fs.readFileSync("./.contents/twitter.json", {
  encoding: "utf-8",
});
const twitterJson: Record<string, TweetResponseType> = JSON.parse(jsonString);

export async function getTweet(url: string, option?: Partial<TweetOptionType>) {
  let data: TweetResponseType;

  if (twitterJson[url]) {
    data = twitterJson[url];
  } else {
    const result = await fetchTweet(url, option);
    data = result;
    if (import.meta.env.PROD) {
      twitterJson[url] = data;
      fs.writeFileSync(jsonPath, JSON.stringify(twitterJson, null, 2));
    }
  }

  return data;
}
