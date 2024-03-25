import { getCollection } from "astro:content";
import type { MarkdownHeading } from "astro";

export async function getBlog() {
  const collection = await getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? data.published : true;
  });

  const posts = collection.sort((a, b) => {
    return (
      new Date(b.data.update ?? b.data.create).getTime() -
      new Date(a.data.update ?? a.data.create).getTime()
    );
  });

  return posts;
}

export async function getTags() {
  const posts = await getBlog();
  const tags = posts.flatMap((post) => post.data.tags ?? []);
  return [...new Set(tags)];
}

export interface Hierarchy extends MarkdownHeading {
  subHeadings: MarkdownHeading[];
}

export function getTocHierarchy(headings: MarkdownHeading[]) {
  const result: Hierarchy[] = [];
  if (!headings.length) return result;
  const parentHeadings = new Map();

  for (const h of headings) {
    const heading = { ...h, subHeadings: [] };
    parentHeadings.set(heading.depth, heading);
    if (heading.depth === 2) {
      result.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1).subHeadings.push(heading);
    }
  }

  return result;
}
