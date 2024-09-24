export type Pagefind = {
  init: () => void;
  search: (query: string, options: Partial<Option>) => Promise<SearchResponse>;
  debouncedSearch: (
    query: string,
    options: Partial<Option>,
    miliseconds: number,
  ) => Promise<SearchResponse>;
  filters: () => void;
};

/**
 * [Configuring the Pagefind search in the browser | Pagefind — Static low-bandwidth search at scale](https://pagefind.app/docs/search-config/)
 */
export type Option = {
  element: string;
  baseURL: string;
  bundlePath: string;
  excerptLength: number;
  highlightParam: string;
  ranking: Ranking;
  indexWeight: number;
  mergeFilter: MergeFilter;
  mergeIndex: Option[];
};

/**
 * [Customize Pagefind's result ranking | Pagefind — Static low-bandwidth search at scale](https://pagefind.app/docs/ranking/)
 */
export type Ranking = {
  termFrequency: number;
  pageLength: number;
  termSimilarity: number;
  termSaturation: number;
};

/**
 * [Searching multiple sites | Pagefind — Static low-bandwidth search at scale](https://pagefind.app/docs/multisite/#filtering-results-by-index)
 */
export type MergeFilter = {
  resouce: string;
};

type WeightLocation = {
  weight: number;
  balanced_score: number;
  location: number;
};

export type DataReturn = {
  url: string;
  content: string;
  word_count: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  filters: Record<string, any>;
  meta: {
    title: string;
    image: string;
    date: string;
  };
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  anchors: Array<any>;
  weight_locations: WeightLocation[];
  locations: number[];
  raw_content: string;
  raw_url: string;
  excerpt: string;
  sub_results: SubResult[];
};

/**
 * [Using the Pagefind search API | Pagefind — Static low-bandwidth search at scale](https://pagefind.app/docs/api/#searching)
 */
export type Result = {
  id: string;
  data: () => Promise<DataReturn>;
  score: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  words: Array<any>;
};

export type SubResult = {
  title: string;
  url: string;
  weight_locations: WeightLocation[];
  locations: number[];
  excerpt: string;
};

export type SearchResponse = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  filters: Record<string, any>;
  results: Result[];
  timings: Record<"preload" | "search" | "total", number>[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  totalFilters: Record<string, any>;
  unfilteredResultCount: number;
};
