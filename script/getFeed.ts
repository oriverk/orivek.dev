import fs from "fs-extra";
import Parser from 'rss-parser'

type Source = {
  id: string;
  url: string;
  includeUrlRegex?: string;
}

type FeedItem = {
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMiliSeconds: number;
};

const sources = [
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

function isValidUrl(url: string): boolean {
  try {
    const {protocol} = new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

const parser = new Parser();

async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url);
  if(!feed?.items?.length) return []
  return feed.items
    .map(({ title, contentSnippet, link, isoDate }) => {
      return {
        title,
        contentSnippet: contentSnippet?.replace(/\n/g, ""),
        link,
        isoDate,
        dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
      };
    })
    .filter(
      ({ title, link }) => title && link && isValidUrl(link)
    ) as FeedItem[];
}

async function getFeedItemsFromSources(sources: Source[]) {
  if (!sources.length) return [];

  let feedItems: FeedItem[] = [];
  for (const source of sources) {
    const { url, includeUrlRegex } = source;
    let items = await fetchFeedItems(url);
    if (includeUrlRegex) {
      items = items.filter(item => {
        return item.link.match(new RegExp(includeUrlRegex))
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

(async function () {
  const items: FeedItem[] = await getFeedItems();
  fs.ensureDirSync(".contents");
  fs.writeJsonSync(".contents/feed.json", items);
})()

