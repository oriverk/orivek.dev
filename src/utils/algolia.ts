import type { AlgoliaBlog } from "@/types/algolia";
import type { SearchClient, SearchResponse } from "node_modules/algoliasearch";
import { algoliasearch } from "node_modules/algoliasearch";
import siteConfig from "site.config";

const { appId, apiKey, index } = siteConfig.algolia;

const client: SearchClient = algoliasearch(appId, apiKey);
const emptyResults: SearchResponse<AlgoliaBlog> = {
  hits: [],
  nbHits: 0,
  nbPages: 0,
  page: 0,
  processingTimeMS: 0,
  hitsPerPage: 0,
  exhaustiveNbHits: false,
  query: "",
  params: "",
};

export async function searchAlgolia(
  query: string,
  option?: object,
): Promise<SearchResponse<AlgoliaBlog>> {
  if (!query) return emptyResults;

  const results: SearchResponse<AlgoliaBlog> = await client.searchSingleIndex({
    indexName: index,
    searchParams: { query: query },
  }, option);
  return results;
}
