import { graphql, GraphqlResponseError } from '@octokit/graphql'
import { subYears, startOfWeek, format } from 'date-fns'
import fs from 'fs-extra'

/**
 * @param {string} githubToken
 * @param {string} owner userid
 * @param {number} pinnedItemsNum
 * @param {string} calendarFrom new Date().toISOString().split(".")[0]
 * @param {string} calendarTo "2023-04-01T00:00:00"
 * @returns {import("@octokit/graphql-schema").User}
 */
async function fetchUserContent(githubToken, owner, pinnedItemsNum, calendarFrom, calendarTo,) {
  try {
    if (!githubToken) {
      throw new Error('githubToken is not defined')
    }

    const { user } = await graphql(`
        query userContent($owner: String!, $pinnedItemsNum: Int = 4, $calendarFrom: DateTime!, $calendarTo: DateTime!) {
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
            contributionsCollection(from: $calendarFrom, to: $calendarTo) {
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
        }
      `,
      {
        owner,
        pinnedItemsNum,
        calendarFrom,
        calendarTo,
        headers: {
          authorization: `token ${githubToken}`,
        },
      }
    )

    return user
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
  const token = process.env.SECRET_GITHUB_PERSONAL_ACCESS_TOKEN || ''
  const owner = process.env.GITHUB_USER_NAME || ''

  if (!token || !owner) {
    return console.log('Env is Not Found.')
  }

  const lastYear = subYears(new Date(), 1)
  const start = startOfWeek(lastYear, { weekStartsOn: 0 })
  const from = `${format(start, 'yyyy-MM-dd')}T00:00:00`
  const to = `${format(new Date(), 'yyyy-MM-dd')}T00:00:00`

  const user = await fetchUserContent(token, owner, 4, from, to)
  if (!user) {
    console.error('result is undefined')
    return;
  }

  /** @type {import("@octokit/graphql-schema").User} */
  const { pinnedItems, contributionsCollection } = user

  fs.ensureDirSync('.contents')
  fs.writeJsonSync('.contents/repository.json', pinnedItems.nodes || [])
  fs.writeJsonSync('.contents/contributions.json', contributionsCollection)
})()
