import type { SearchClient, SearchIndex } from 'algoliasearch'
import algolia from 'algoliasearch'
import type { SearchResponse } from '@algolia/client-search'
import type { AlgoliaBlog } from '../types/algolia'

const {
  PUBLIC_ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_SEARCH_KEY,
  PUBLIC_ALGOLIA_INDEX_BLOG,
} = import.meta.env

const searchClient: SearchClient = algolia(
  PUBLIC_ALGOLIA_APP_ID,
  PUBLIC_ALGOLIA_SEARCH_KEY
)
const searchIndex: SearchIndex = searchClient.initIndex(
  PUBLIC_ALGOLIA_INDEX_BLOG
)

const emptyResults: SearchResponse<AlgoliaBlog> = {
  hits: [],
  nbHits: 0,
  nbPages: 0,
  page: 0,
  processingTimeMS: 0,
  hitsPerPage: 0,
  exhaustiveNbHits: false,
  query: '',
  params: '',
}

export async function searchAlgolia(
  query: string,
  option?: object
): Promise<SearchResponse<AlgoliaBlog>> {
  if (!query) return emptyResults

  const results: SearchResponse<AlgoliaBlog> =
    await searchIndex.search<AlgoliaBlog>(query, option)
  return results
}
