import type {
  ContributionCalendar,
  ContributionCalendarWeek,
  Repository,
} from "@octokit/graphql-schema";

export type PinnedItem = Pick<
  Repository,
  "name" | "url" | "isFork" | "isArchived" | "stargazerCount"
> & {
  description: string;
  primaryLanguage: {
    name: string;
    color: string;
  };
};

type CustomContributionCalendar = Pick<
  ContributionCalendar,
  "isHalloween" | "totalContributions"
> & {
  weeks: ContributionCalendarWeek[];
};

export type UserContent = {
  repositoryItems: PinnedItem[];
  contributionCalendar: CustomContributionCalendar;
};
