import type { FeedItem } from '../types/feed'
import FeedJson from '../../.contents/feed.json'

export function getFeedItems() {
  const results: FeedItem[] = FeedJson
  return results
}

export function getFaviconSrcFromOrigin(hostname: string) {
  return `https://www.google.com/s2/favicons?sz=32&domain_url=${hostname}`
}
