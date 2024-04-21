export type Source = {
  id: string;
  url: string;
  includeUrlRegex?: string;
};

export type FeedItem = {
  title: string;
  link: string;
  // contentSnippet?: string;
  isoDate?: string;
  dateMiliSeconds: number;
};
