import { graphql, GraphqlResponseError } from '@octokit/graphql'
import { format } from 'date-fns'
import fs from "node:fs"

/**
 * @param {string} birthdate '2020-01-01'
 * @returns {number}
 */
function getAge(birthdate) {
  const today = new Date()
  const birthDate = new Date(birthdate)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

/**
 * @param {string} githubToken
 * @param {string} owner userid
 * @param {number} pinnedItemsNum
 * @param {string} calendarFrom new Date().toISOString().split(".")[0]
 * @param {string} calendarTo "2023-04-01T00:00:00"
 * @returns {import("@octokit/graphql-schema").Repository}
 */
async function fetchRepositoryContent(githubToken, owner, repo, expression) {
  try {
    if (!githubToken) {
      throw new Error('Token is Not Found')
    }

    const { repository } = await graphql(`
        query content($owner: String!, $repo: String!, $expression: String!) {
          repository(owner: $owner, name: $repo) {
            object(expression: $expression) {
              ... on Blob {
                text
              }
              # ... on Tree {
              #   entries {
              #     name
              #     object {
              #       ... on Blob {
              #         text
              #       }
              #     }
              #   }
              # }
            }
          }
        }
      `,
      {
        owner,
        repo,
        expression,
        headers: {
          authorization: `token ${githubToken}`,
        },
      }
    )
    return repository
  } catch (error) {
    if (error instanceof GraphqlResponseError) {
      console.log('Request failed:', error.request)
      console.log(error.message)
    } else {
      console.log('non GitHub GraphQl erorr happend.')
      console.error(error)
    }
  }
}

;(async () => {
  const token = process.env.SECRET_GH_PAT || "";
  const owner = "oriverk"
  const repositoryName = "oriverk-docs"
  const repositoryExpression = "HEAD:cv/index.md";

  if (!token) {
    return console.error('Env is Not Found.')
  }

  const repository = await fetchRepositoryContent(token, owner, repositoryName, repositoryExpression)
  /** @type import("@octokit/graphql-schema").Blob */
  const { text } = repository.object;
  
  const replacedMd = text
    .replace('{{ age }}', getAge('1993-09-11').toString())
    .replace('{{ date }}', format(new Date(), 'yyyy年MM月dd日'))

  if (!fs.existsSync("./src/content/static")) {
    fs.mkdirSync("./src/content/static");
  }
  fs.writeFileSync("./src/content/static/cv.md", replacedMd)
})()
