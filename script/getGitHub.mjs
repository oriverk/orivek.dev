import { graphql, GraphqlResponseError } from '@octokit/graphql'
import { subYears, startOfWeek, format } from 'date-fns'
import fs from "fs-extra";

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
 * @returns
 */
async function fetchUserContent(githubToken, owner, pinnedItemsNum, calendarFrom, calendarTo, repo, expression) {
  try {
    if (!githubToken) {
      throw new Error('githubToken is not defined')
    }

    const { user, repository } = await graphql(`
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

(async function () {
  const token = process.env.SECRET_GITHUB_PERSONAL_ACCESS_TOKEN || ''
  const lastYear = subYears(new Date(), 1);
  const start = startOfWeek(lastYear, { weekStartsOn: 0 })
  const from = format(start, 'yyyy-MM-dd') + "T00:00:00"
  const to = format(new Date(), 'yyyy-MM-dd') + "T00:00:00"

  const result = await fetchUserContent(token, "oriverk", 4, from, to, "oriverk-docs", "HEAD:cv/index.md");
  if (!result) {
    console.error('result is undefined')
    return result
  }

  /** @type import("@octokit/graphql-schema").User */
  const user = result.user
  /** @type import("@octokit/graphql-schema").Repository */
  const repository = result.repository
  /** @type import("@octokit/graphql-schema").Blob */
  const object = repository.object
  const { pinnedItems, contributionsCollection } = user
  const replacedMd = (object.text || '')
    .replace("{{ age }}", getAge('1993-09-11').toString())
    .replace("{{ date }}", format(new Date(), 'yyyy年MM月dd日'));
  
  fs.ensureDirSync(".contents");
  fs.writeJsonSync(".contents/repository.json", pinnedItems.nodes || []);
  fs.writeJsonSync(".contents/contributions.json", contributionsCollection);
  fs.writeFileSync(".contents/cv.md", replacedMd);
})()