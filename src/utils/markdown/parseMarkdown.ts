import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkComment from 'remark-comment'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

import { rehypeAnchor } from './rehypeAnchor'
import { rehypeFigure } from './rehypeFigure'

export function parseMarkdown(markdown: string) {
  const result = unified()
    .use(remarkParse)
    .use(remarkComment)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeAnchor)
    .use(rehypeFigure)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString()

  return result
}
