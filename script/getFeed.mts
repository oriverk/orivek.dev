import fs from "node:fs";
import Parser from 'rss-parser'

type Source = {
  id: string;
  url: string;
  includeUrlRegex?: string;
}

// [rbren/rss-parser: A lightweight RSS parser, for Node and the browser](https://github.com/rbren/rss-parser?tab=readme-ov-file#typescript)
type CustomFeed = {
  foo: string;
}

type FeedItem = {
  id: string;
  title: string;
  link: string;
  contentSnippet: string;
  isoDate: string;
  dateMiliSeconds: number;
}

const sources = [
  {
    id: "zenn.dev",
    url: "https://zenn.dev/oriverk/feed",
  },
];

function isValidUrl(url: string) {
  try {
    const {protocol} = new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}


const parser: Parser<CustomFeed,FeedItem> = new Parser();

async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url);
  
  if(!feed?.items?.length) return []

  const results = feed.items
    .filter(({link}) => link && isValidUrl(link))
    .map(({ title, contentSnippet, link, isoDate }) => {
      return {
        id: link,
        title,
        contentSnippet: contentSnippet?.replace(/\n/g, ""),
        link,
        isoDate,
        dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
      };
    })
  
    return results
}

async function getFeedItemsFromSources(sources: Source[]) {
  if (!sources.length) return [];

  let feedItems: FeedItem[] = [];
  for (const source of sources) {
    const { url, includeUrlRegex } = source;
    let items = await fetchFeedItems(url);
    
    if (includeUrlRegex) {
      items = items.filter(item => {
        return item.link?.match(new RegExp(includeUrlRegex))
      })
    }

    if (items) feedItems = [...feedItems, ...items];
  }
  return feedItems;
}

async function getFeedItems() {
  const items = await getFeedItemsFromSources(sources);
  items.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);
  return items
}

(async () => {
  const items = await getFeedItems();
  if(!fs.existsSync(".contents")){
    fs.mkdirSync(".contents")
  }
  fs.writeFileSync(".contents/feed.json", JSON.stringify(items, null, 2))
})()

