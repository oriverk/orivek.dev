import urlJoin from "url-join";
import cv from "../../../.contents/cv.md?raw"

export async function getRepoRawContent(token: string, user: string, repo: string, path: string) {
  if (!token || !user || !repo || !path) throw new Error('Missing required parameter(s)')
  
  if (import.meta.env.DEV) return cv;

  const base = 'https://api.github.com/repos'
  const target = urlJoin(base, user, repo, 'contents', path);
  const response = await fetch(target, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3.raw'
    }
  })
  const markdown = await response.text();
  return markdown
}
