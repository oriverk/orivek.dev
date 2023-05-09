# Astro Starter Kit: Basics

- [blog.oriverk.dev](https://blog.oriverk.dev/)
  - [AstroとSvelteでStaticサイトを作って、GitHub Actions で定期的に情報を取得更新するようにした | blog.oriverk.dev](https://blog.oriverk.dev/entry/2023/202305-svelte-site/)

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

## 🚀 Project init

```shell
npm create astro@latest -- --template basics
```

![npm create astro@latest](https://user-images.githubusercontent.com/44029144/231638707-5afcf66c-2e6d-4bda-a69b-235e74507376.png)

![basics](https://user-images.githubusercontent.com/4677417/186188965-73453154-fdec-4d6b-9c34-cb35c248ae5b.png)

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
npm i -D eslint-plugin-svelte3 prettier-plugin-svelte

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

## Project content

### GraphQL

I used @octokit/graphql to get my contributions calendar and pinned repository in GitHub.

<details><summary>GraphQl query with @octokit/graphql</summary>

```typescript
import type { User, Repository, Blob } from '@octokit/graphql-schema'
import { graphql, GraphqlResponseError } from '@octokit/graphql'

/**
 * 
 * @param githubToken
 * @param owner userid
 * @param pinnedItemsNum
 * @param calendarFrom new Date().toISOString().split(".")[0] 
 * @param calendarTo "2023-04-01T00:00:00"
 * @returns
 */
export async function fetchUserContent(githubToken: string, owner: string, pinnedItemsNum: number, calendarFrom: string, calendarTo: string, repo: string, expression: string) {
  try {
    if (!githubToken) {
      throw new Error('githubToken is not defined')
    }

    const { user, repository } = await graphql<{ user: User, repository: Repository }>(`
      query userContent ($owner: String!, $pinnedItemsNum: Int = 4, $calendarFrom: DateTime!, $calendarTo: DateTime!, $repo: String!, $expression: String!){
        user(login: $owner) {
          pinnedItems(first: $pinnedItemsNum) {
            nodes {
              ... on Repository {
                name
                description
                url
                isFork
                isArchived
                stargazerCount
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
          contributionsCollection (from: $calendarFrom, to: $calendarTo) {
            contributionCalendar {
              totalContributions
              isHalloween
              weeks {
                firstDay
                contributionDays {
                  date
                  color
                  contributionCount
                  contributionLevel
                  weekday
                }
              }
            }
          }
        }
        repository(owner: $owner, name: $repo) {
          object(expression: $expression) {
            ... on Blob {
              text
            }
          }
        }
      }
    `,
      {
        owner,
        pinnedItemsNum,
        calendarFrom,
        calendarTo,
        repo,
        expression,
        headers: {
          authorization: `token ${githubToken}`
        }
      }
    )
    return { user, repository }
  } catch (error) {
    if(error instanceof GraphqlResponseError) {
      console.log("Request failed:", error.request)
      console.log(error.message);
    } else {
      console.log('non GitHub GraphQl erorr happend.')
      console.error(error)
    }
  }
}
```

</details>

### Cloudflare Pages

- refenrece
  - [Cloudflare Pages GitHub Action · Actions · GitHub Marketplace](https://github.com/marketplace/actions/cloudflare-pages-github-action)
  - [Deploy your Astro Site to Cloudflare Pages 🚀 Astro Documentation](https://docs.astro.build/en/guides/deploy/cloudflare/)
  - [Build configuration · Cloudflare Pages docs](https://developers.cloudflare.com/pages/platform/build-configuration)
