import type { User } from '@octokit/graphql-schema'
import { graphql, GraphqlResponseError } from '@octokit/graphql'
import { startOfWeek, format, subYears } from 'date-fns'
import fs from 'fs-extra';

import type { UserContent } from '../../types/github'

const isDev = import.meta.env.DEV;
const token = import.meta.env.GITHUB_TOKEN

const getFaker = (): UserContent => ({
  pinnedItems: {
    nodes: fs.readJsonSync('./.contents/repository.json')
  },
  contributionsCollection: fs.readJsonSync('./.contents/contributions.json')
})

/**
 * 
 * @param githubToken
 * @param owner userid
 * @param pinnedItemsNum
 * @param calendarFrom new Date().toISOString().split(".")[0] 
 * @param calendarTo "2023-04-01T00:00:00"
 * @returns
 */
export async function fetchUserContent(githubToken: string, owner: string, pinnedItemsNum: number, calendarFrom: string, calendarTo: string) {
  try {
    const { user } = await graphql<{ user: User }>(`
      query userContent ($owner: String!, $pinnedItemsNum: Int = 4, $calendarFrom: DateTime!, $calendarTo: DateTime!){
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
      }
    `,
      {
        owner,
        pinnedItemsNum,
        calendarFrom,
        calendarTo,
        headers: {
          authorization: `token ${githubToken}`
        }
      }
    )
    return user
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

export async function getUserContent(): Promise<UserContent> {
  if (!token) console.log('!token')
  if (isDev || !token) {
    return getFaker()
  }

  const lastYear = subYears(new Date(), 1);
  const start = startOfWeek(lastYear, { weekStartsOn: 0 })
  const from = format(start, 'yyyy-MM-dd') + "T00:00:00"
  const to = format(new Date(), 'yyyy-MM-dd') + "T00:00:00"

  const result = await fetchUserContent(token, "oriverk", 4, from, to)
  if (!result) {
    console.log("!result")
    return getFaker()
  }

  const { pinnedItems, contributionsCollection } = result as UserContent
  const nodes = (pinnedItems.nodes || []).filter(item => !item?.isFork)

  return {
    pinnedItems: { nodes },
    contributionsCollection
  }
}