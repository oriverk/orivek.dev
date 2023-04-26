# Astro Starter Kit: Basics

```shell
npm create astro@latest -- --template basics
```

![npm create astro@latest](https://user-images.githubusercontent.com/44029144/231638707-5afcf66c-2e6d-4bda-a69b-235e74507376.png "かわいい")

![basics](https://user-images.githubusercontent.com/4677417/186188965-73453154-fdec-4d6b-9c34-cb35c248ae5b.png)

## 🚀 Project Procedure

### tools

```shell
npm i -D npm-run-all
npm i -D @commitlint/{config-conventional,cli}
# echo '{"extends": ["@commitlint/config-conventional"]}' > .commitlintrc.json

npm install -D eslint eslint-plugin-astro @typescript-eslint/parser eslint-plugin-jsx-a11y
npm install -D prettier prettier-plugin-astro eslint-config-prettier
# echo {} > .prettierrc.json

npx husky-init && npm install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

npx astro add svelte

npm i sass cssnano autoprefixer
```

- `feat:`：新機能
- `fix:`：バグフィックス
- `refactor:`：新機能でもバグフィックスでもないコード変更
- `perf:`：パフォーマンス向上
- `test:`：テストコードの追加・修正
- `style:`：コードの意味に影響しない変更（空白、フォーマット、セミコロン）
- `docs:`：ドキュメントだけの変更
- `chore:`：雑用（ビルドプロセスの変更、ツールやライブラリの追加削除）

### GraphQL

GitHubのpinned repository やcontributions calendarを表示するクエリの型を出力するため、Graphql Code Generatorを使用しました。

- [Installation – GraphQL Code Generator](https://the-guild.dev/graphql/codegen/docs/getting-started/installation)
- [Guide: React and Vue – GraphQL Code Generator](https://the-guild.dev/graphql/codegen/docs/guides/react-vue)
- [Adding Typescript Types to Github's GraphQL API | Ben Limmer](https://benlimmer.com/2020/05/16/adding-typescript-types-github-graphql-api/)

```shell
npm i -D @octokit/graphql-schema @graphql-codegen/cli
npx graphql-codegen init
npm install -D @graphql-codegen/typescript-resolvers
```

```txt
 Welcome to GraphQL Code Generator!
    Answer few questions and we will setup everything for you.
  
? What type of application are you building? Application built with other framework or vanilla JS
? Where is your schema?: (path or url) src/generated/github-schema-loader.ts
? Pick plugins: TypeScript (required by other typescript plugins), TypeScript GraphQL document nodes (embedded GraphQL document)
? Where to write the output: src/generated/graphql.ts
? Do you want to generate an introspection file? No
? How to name the config file? codegen.yml
? What script in package.json should run the codegen? codegen
Fetching latest versions of selected plugins...
# => add "@graphql-codegen/typescript", "@graphql-codegen/typescript-document-nodes"
```

```txt
 Welcome to GraphQL Code Generator!
    Answer few questions and we will setup everything for you.
  
? What type of application are you building? Application using graphql-request
? Where is your schema?: (path or url) src/generated/github-schema-loader.ts
? Where are your operations and fragments?: src/**/*.tsx
? Where to write the output: src/gql
? Do you want to generate an introspection file? No
? How to name the config file? codegen.yml
? What script in package.json should run the codegen? codegen
Fetching latest versions of selected plugins...
```

## Cloudflare Pages

- deploy
  - [Cloudflare Pages GitHub Action · Actions · GitHub Marketplace](https://github.com/marketplace/actions/cloudflare-pages-github-action)
  - [Deploy your Astro Site to Cloudflare Pages 🚀 Astro Documentation](https://docs.astro.build/en/guides/deploy/cloudflare/)
  - [GitHub ActionsでビルドしてCloudflare Pagesにデプロイする](https://zenn.dev/nwtgck/articles/1fdee0e84e5808)
- NODE_VERSION
  - [Cloudflare PagesでNode.jsのバージョンを指定する | DevelopersIO](https://dev.classmethod.jp/articles/cloudflare-pages-node-version/)
  - [Build configuration · Cloudflare Pages docs](https://developers.cloudflare.com/pages/platform/build-configuration)

<!-- [timeline/deployment.yml at main · catnose99/timeline · GitHub](https://github.com/catnose99/timeline/blob/main/.github/workflows/deployment.yml) -->
<!-- [Use Direct Upload with continuous integration · Cloudflare Pages docs](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/#use-github-actions) -->

## Errors

Astro とその他UIフレームワーク（今回はSvelte）を混ぜる構成なので、どちらに起因するか見極める必要性があり、また両者の組み合わせによるエラーは公式ドキュメントには当然書いてないので、ちょっと大変。

### date-fns/locale

svelte と date-fns

- [import locale in SvelteKit/NodeJS · Issue #2964 · date-fns/date-fns](https://github.com/date-fns/date-fns/issues/2964)

```text
Directory import '/home/oriverk/Codes/oriverk/astro-site/node_modules/date-fns/locale/ja' is not supported resolving ES modules imported from /home/oriverk/Codes/oriverk/astro-site/dist/entry.mjs
Did you mean to import date-fns/locale/ja/index.js?
```

```diff:typescript
- import { ja } from 'date-fns/locale'
+ import ja from 'date-fns/locale/ja/index.js'
```

## CSS Logical Media Query error

Media Queries Level 4からの下記の様な書き方は、Svelteにおいては次のバージョンから使える模様。

```css
@media (max-width: 30em) { ... }
```

- [メディアクエリーの使用 - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Media_Queries/Using_media_queries#level_4_%E3%81%A7%E3%81%AE%E6%A7%8B%E6%96%87%E3%81%AE%E6%8B%A1%E5%BC%B5)
- [CSS Logical Media Query error · Issue #8324 · sveltejs/svelte](https://github.com/sveltejs/svelte/issues/8324)
  - [feat: media query range syntax & single value function support via css-tree extension by typhonrt · Pull Request #8430 · sveltejs/svelte](https://github.com/sveltejs/svelte/pull/8430)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
