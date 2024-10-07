export type PinnedItem = {
  name: string;
  url: string;
  description: string;
  isFork: boolean;
  isArchived: boolean;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  }
}

export type ContributionDay = {
  date: string;
  color: string;
  contributionCount: number;
  contributionLevel: string;
  weekday: number;
}

export type Week = {
  firstDay: string;
  contributionDays: ContributionDay[]
}

export type ContributionCalendar = {
  totalContributions: number;
  weeks: Week[]
}
