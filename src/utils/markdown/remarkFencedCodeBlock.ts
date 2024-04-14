import type { Root } from "mdast";
import type { Plugin } from "unified";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import { isCode, isParent } from "./isMdastNode";

// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
export const remarkFencedCodeBlock: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, isCode, (node, _index, parent: Parent | undefined) => {
      if (!isParent(parent)) return;
      const [lang, filename] = (node.lang || "").split(":");
      if (!lang) return;
      node.lang = lang;
      node.meta = `title=${filename} ${node?.meta || ""}`;
    });
  };
};
