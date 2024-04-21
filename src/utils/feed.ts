import fs from "node:fs";
import type { FeedItem } from "@/types/feed";

if (!fs.existsSync("./.contents/feed.json")) {
  fs.writeFileSync("./.contents/feed.json", "[]");
}

export function getFeedItems() {
  const results: FeedItem[] = JSON.parse(
    fs.readFileSync("./.contents/feed.json", { encoding: "utf-8" }),
  );
  return results;
}

export function getFaviconSrcFromOrigin(hostname: string) {
  return `https://www.google.com/s2/favicons?sz=32&domain_url=${hostname}`;
}
