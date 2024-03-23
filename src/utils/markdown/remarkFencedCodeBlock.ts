import type { Parent } from "unist";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { isParent, isCode} from "./isMdastNode"

export const remarkFencedCodeBlock: Plugin = () => {
  return (tree) => {
    visit(tree, isCode, (node, _index, parent: Parent | undefined) => {
      if(!isParent(parent)) return;
      const [lang, filename] = (node.lang || "").split(":")
      if(!lang) return;
      node.lang = lang;
      node.meta = `title=${filename} ${node?.meta || ""}`
    })
  }
}
