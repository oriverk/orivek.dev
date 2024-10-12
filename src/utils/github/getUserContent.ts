import fs from "node:fs";
import type { ContributionCalendar } from "@/types/github";

const contributionsJsonPath = "./.contents/contributions.json";

type Result = {
  contributionCalendar: ContributionCalendar;
};

export function getContributionCallendar() {
  const contributionsJson: Result = JSON.parse(
    fs.readFileSync(contributionsJsonPath, { encoding: "utf-8" }),
  );

  const { contributionCalendar } = contributionsJson;
  return contributionCalendar;
}
