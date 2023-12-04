/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SECRET_GITHUB_PERSONAL_ACCESS_TOKEN: string
  readonly PUBLIC_GA_MEASUREMENT_ID: string

  readonly PUBLIC_ALGOLIA_APP_ID: string
  readonly PUBLIC_ALGOLIA_SEARCH_KEY: string
  readonly PUBLIC_ALGOLIA_INDEX_BLOG: string
  readonly SECRET_ALGOLIA_ADMIN_KEY: string
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
