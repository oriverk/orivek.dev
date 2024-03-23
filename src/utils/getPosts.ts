import type { MarkdownHeading } from "astro";
import { getCollection } from "astro:content";

export async function getPosts(){
  const collection = await getCollection('posts', ({data}) => {
    return import.meta.env.PROD ? data.published : true
  })

  const posts = collection
    .sort((a, b) => {
      const lastUpdateA = a.data.update || a.data.create
      const lastUpdateB = b.data.update || b.data.create
      if (lastUpdateA !== lastUpdateB) {
        return lastUpdateA > lastUpdateB ? -1 : 1
      }
      return 0
    })

  return posts
}

export interface Hierarchy extends MarkdownHeading {
  subHeadings: MarkdownHeading[]
}

export function getTocHierarchy(headings: MarkdownHeading[]){
  const result: Hierarchy[] = [];
  if(!headings.length) return result;
  const parentHeadings = new Map()

  for(const h of headings){
    const heading = {...h, subHeadings: []};
    parentHeadings.set(heading.depth, heading)
    if(heading.depth === 2){
      result.push(heading)
    }else {
      parentHeadings.get(heading.depth -1).subHeadings.push(heading)
    }
  }

  return result;
}
