import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja/index.js'

import { getAge } from './getAge';

const today = format(new Date(), 'yyyy年MM月dd日', { locale: ja });

export function parseMarkdown(markdown: string) {
  const replaced = markdown
    .replace("{{ age }}", getAge('1993-09-11').toString())
    .replace("{{ date }}", today);
  
  const result = micromark(replaced, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  })
  
  return result
}