import type { ContributionCalendar } from "./github";

export type Activity = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ActivityCalendar = {
  contributionCalendar: ContributionCalendar;
  blockMargin: number;
  blockRadius: number;
  blockSize: number;
  fontSize: number;
  hideMonthLabels: boolean;
  colors: string[];
  monthLabels: string[];
};
