import fs from "fs-extra";
import urlJoin from "url-join";

export async function getRepoRawContent(
  token: string,
  user: string,
  repo: string,
  path: string,
) {
  if (!token || !user || !repo || !path)
    throw new Error("Missing required parameter(s)");

  if (import.meta.env.DEV) {
    const fakerMd = fs.readFileSync("./.contents/cv.md", "utf-8");
    return fakerMd;
  }

  const base = "https://api.github.com/repos";
  const target = urlJoin(base, user, repo, "contents", path);
  const response = await fetch(target, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3.raw",
    },
  });
  const markdown = await response.text();
  return markdown;
}
