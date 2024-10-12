import type { MarkdownHeading } from "astro";

export type Hierarchy = MarkdownHeading & {
  subHeadings?: MarkdownHeading[];
};

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
