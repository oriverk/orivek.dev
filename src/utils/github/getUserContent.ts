import fs from "node:fs";
import type { UserContent } from "@/types/github";
import type { ContributionsCollection } from "@octokit/graphql-schema";

const repositoryJsonPath = "./.contents/repository.json";
const contributionsJsonPath = "./.contents/contributions.json";

if (!fs.existsSync(contributionsJsonPath)) {
  fs.writeFileSync(contributionsJsonPath, "{}");
}

if (!fs.existsSync(repositoryJsonPath)) {
  fs.writeFileSync(repositoryJsonPath, "[]");
}

export function getUserContent(): UserContent {
  const repositoryJson: UserContent["repositoryItems"] = JSON.parse(
    fs.readFileSync(repositoryJsonPath, { encoding: "utf-8" }),
  );
  const contributionsJson: Pick<
    ContributionsCollection,
    "contributionCalendar"
  > = JSON.parse(fs.readFileSync(contributionsJsonPath, { encoding: "utf-8" }));

  const repositoryItems: UserContent["repositoryItems"] = repositoryJson.filter(
    (repo) => !repo.isFork,
  );
  const { contributionCalendar } = contributionsJson;

  return {
    repositoryItems,
    contributionCalendar,
  };
}
