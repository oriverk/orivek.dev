import { graphql, GraphqlResponseError } from '@octokit/graphql'
import { format } from 'date-fns'
import fs from "node:fs"

/**
 * @param birthdate '2020-01-01'
 * @returns 
 */
function getAge(birthdate: string) {
  const today = new Date()
  const birthDate = new Date(birthdate)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

type Content = {
  repository: {
    object: {
      text: string;
    }
  }
}

/**
 * @param githubToken
 * @param owner userid
 * @param repo userid-docs
 * @param expression HEAD:cv/index.md
 * @returns 
 */
async function fetchRepositoryContent(githubToken: string, owner: string, repo: string, expression: string) {
  try {
    const { repository } = await graphql<Content>(`
        query content($owner: String!, $repo: String!, $expression: String!) {
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
  if(!repository) return;

  const { text } = repository.object
  const replacedMd = text
    .replace('{{ age }}', getAge('1993-09-11').toString())
    .replace('{{ date }}', format(new Date(), 'yyyy年MM月dd日'))

  if (!fs.existsSync("./src/content/static")) {
    fs.mkdirSync("./src/content/static");
  }
  fs.writeFileSync("./src/content/static/cv.md", replacedMd)
})()
