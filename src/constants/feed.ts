import type { Source } from "../types/feed";

export const sources: Source[] = [
  {
    id: "blog.oriverk",
    url: "https://blog.oriverk.dev/feed.xml",
    includeUrlRegex: "blog.oriverk.dev/entry/",
  },
  {
    id: "zenn.dev",
    url: "https://zenn.dev/oriverk/feed"
  }
]