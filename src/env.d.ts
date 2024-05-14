/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SECRET_GITHUB_PERSONAL_ACCESS_TOKEN: string;

  readonly SECRET_ALGOLIA_ADMIN_KEY: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
