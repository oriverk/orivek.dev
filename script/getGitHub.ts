import type { User, Repository, Blob } from '@octokit/graphql-schema'
import { graphql, GraphqlResponseError } from '@octokit/graphql'
import { startOfWeek, endOfWeek, subDays, format } from 'date-fns'
import fs from "fs-extra";
import * as dotenv from "dotenv";

dotenv.config()

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
              colors
              weeks {
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
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    console.error("token does not found!")
    return;
  }

  const thisSaturday = endOfWeek(new Date(), { weekStartsOn: 0 })
  const daysAgoFromToday = subDays(new Date(), 14);
  const lastYear = startOfWeek(daysAgoFromToday, { weekStartsOn: 0 })
  
  const from = format(lastYear, 'yyyy-MM-dd') + "T00:00:00"
  const to = format(thisSaturday, 'yyyy-MM-dd') + "T00:00:00"

  const result = await fetchUserContent(token, "oriverk", 4, from, to, "oriverk-docs", "HEAD:cv/index.md");
  if (!result) {
    console.error('result is undefined')
    return;
  }

  const { user, repository } = result
  const { pinnedItems, contributionsCollection } = user
  const { object } = repository as { object: Blob };
  const { text } = object;
  
  fs.ensureDirSync(".contents");
  fs.writeJsonSync(".contents/repository.json", pinnedItems.nodes || []);
  fs.writeJsonSync(".contents/contributions.json", contributionsCollection);
  if (text) {
    fs.writeFileSync(".contents/cv.md", text);
  }
})()