/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GRAPHQL_TOKEN: string
  readonly PUBLIC_GA_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
