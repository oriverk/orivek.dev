import type { Plugin } from "unified";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import { isAnchor, isParent } from "./isHastNode";

export const rehypeAnchor: Plugin = () => {
  return (tree) => {
    visit(tree, isAnchor, (node, _index, parent: Parent | undefined) => {
      if (!isParent(parent)) return;
      const { href } = node.properties as { href: string };
      if (!href.startsWith("http")) return;

      node.properties.target = "_blank";
      node.properties.rel = "noopener noreferrer";
    });
  };
};
