import { graphql, GraphqlResponseError } from '@octokit/graphql'
import { subYears, startOfWeek, format } from 'date-fns'
import fs from "node:fs"
import type { PinnedItem, ContributionCalendar } from '@/types/github';

type UserContent = {
  user: {
    pinnedItems: {
      nodes: PinnedItem[]
    };
    contributionsCollection: {
      contributionCalendar: ContributionCalendar;
    };
  };
};

/**
 * @param githubToken
 * @param owner userid
 * @param pinnedItemsNum
 * @param calendarFrom new Date().toISOString().split(".")[0]
 * @param calendarTo "2023-04-01T00:00:00"
 * @returns
 */
async function fetchUserContent(githubToken: string, owner: string, pinnedItemsNum: number, calendarFrom: string, calendarTo: string) {
  try {
    const { user } = await graphql<UserContent>(`
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
  const token = process.env.SECRET_GH_PAT || "";
  if (!token) {
    return console.log('Env is Not Found.')
  }

  const owner = "oriverk"
  const lastYear = subYears(new Date(), 1)
  const start = startOfWeek(lastYear, { weekStartsOn: 0 })
  const from = `${format(start, 'yyyy-MM-dd')}T00:00:00`
  const to = `${format(new Date(), 'yyyy-MM-dd')}T00:00:00`

  const user = await fetchUserContent(token, owner, 4, from, to)
  if (!user) {
    console.error('result is undefined')
    return;
  }

  const { pinnedItems, contributionsCollection } = user
  if (!fs.existsSync(".contents")) {
    fs.mkdirSync(".contents");
  }

  const repositories = []
  for (const {url, ...rest} of pinnedItems.nodes) {
    repositories.push({
      id: url,
      url,
      ...rest
    })
  }
  fs.writeFileSync(
    ".contents/repository.json",
    JSON.stringify(repositories, null, 2)
  );
  fs.writeFileSync(
    ".contents/contributions.json",
    JSON.stringify(contributionsCollection, null, 2)
  );
})()
