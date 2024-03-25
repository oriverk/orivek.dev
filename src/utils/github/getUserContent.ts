import contributionsJson from "../../../.contents/contributions.json";
import repositoryJson from "../../../.contents/repository.json";
import type { UserContent } from "@/types/github";

export function getUserContent(): UserContent {
  const repositoryItems: UserContent["repositoryItems"] = repositoryJson.filter(
    (repo) => !repo.isFork,
  );
  const { contributionCalendar } = contributionsJson as unknown as Pick<
    UserContent,
    "contributionCalendar"
  >;

  return {
    repositoryItems,
    contributionCalendar,
  };
}
