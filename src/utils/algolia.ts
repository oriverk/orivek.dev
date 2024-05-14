import type { AlgoliaBlog } from "@/types/algolia";
import type { SearchResponse } from "@algolia/client-search";
import type { SearchClient, SearchIndex } from "algoliasearch";
import algolia from "algoliasearch";
import siteConfig from "site.config"

const {appId, apiKey, index} = siteConfig.algolia;

const searchClient: SearchClient = algolia(
  appId,
  apiKey,
);
const searchIndex: SearchIndex = searchClient.initIndex(
  index,
);

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

  const results: SearchResponse<AlgoliaBlog> =
    await searchIndex.search<AlgoliaBlog>(query, option);
  return results;
}
