import type { User } from '@octokit/graphql-schema'
import { graphql, GraphqlResponseError } from '@octokit/graphql'
import { endOfWeek, subDays, format } from 'date-fns'

import type { UserContent } from '../../types/github'
import { ghContent } from '../../constants/ghContent'

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
  const isDev = import.meta.env.DEV;
  const token = import.meta.env.GITHUB_TOKEN

  if (!token) {
    console.log("!token")
    return ghContent as unknown as UserContent
  }

  const thisSaturday = endOfWeek(new Date(), { weekStartsOn: 6 })
  const lastYear = subDays(thisSaturday, 365);
  const from = format(lastYear, 'yyyy-MM-dd') + "T00:00:00"
  const to = format(thisSaturday, 'yyyy-MM-dd') + "T00:00:00"

  let result = await fetchUserContent(token, "oriverk", 4, from, to)

  const { pinnedItems, contributionsCollection } = result as unknown as UserContent
  const nodes = (pinnedItems.nodes || []).filter(item => !item.isFork)

  return {
    pinnedItems: { nodes },
    contributionsCollection
  }
}