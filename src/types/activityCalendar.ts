import type { UserContent } from "./github";

export type Activity = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ActivityCalendar = {
  contributionCalendar: UserContent["contributionCalendar"];
  blockMargin: number;
  blockRadius: number;
  blockSize: number;
  fontSize: number;
  hideMonthLabels: boolean;
  colors: string[];
  monthLabels: string[];
};
