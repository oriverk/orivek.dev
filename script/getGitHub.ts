import type { User, Repository, Blob } from '@octokit/graphql-schema'
import { graphql, GraphqlResponseError } from '@octokit/graphql'
import { subYears, startOfWeek, format } from 'date-fns'
import fs from "fs-extra";
import * as dotenv from "dotenv";

dotenv.config()

/**
 * @param birthdate '2020-01-01'
 * @returns
 */
export function getAge(birthdate: string) {
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

  const { user, repository } = result
  const { pinnedItems, contributionsCollection } = user
  const { object } = repository as { object: Blob };
  const replacedMd = (object.text || '')
    .replace("{{ age }}", getAge('1993-09-11').toString())
    .replace("{{ date }}", format(new Date(), 'yyyy年MM月dd日'));
  
  fs.ensureDirSync(".contents");
  fs.writeJsonSync(".contents/repository.json", pinnedItems.nodes || []);
  fs.writeJsonSync(".contents/contributions.json", contributionsCollection);
  fs.writeFileSync(".contents/cv.md", replacedMd);
})()