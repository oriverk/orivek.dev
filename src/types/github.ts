import type {
  Repository,
  ContributionsCollection,
} from '@octokit/graphql-schema'

export type PinnedItem = Pick<
  Repository,
  'name' | 'url' | 'isFork' | 'isArchived' | 'stargazerCount'
> & {
  description: string
  primaryLanguage: {
    name: string
    color: string
  }
}

export type UserContent = {
  pinnedItems: {
    nodes: PinnedItem[]
  }
  contributionsCollection: Pick<ContributionsCollection, 'contributionCalendar'>
}
