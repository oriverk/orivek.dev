import type { Plugin } from "unified";
import type { Root } from "hast";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import { isAnchor, isParent, isElement, isBareLink } from "./isHastNode";

// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
export const rehypeAnchor: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, isAnchor, (node, _index, parent: Parent | undefined) => {
      if (!isParent(parent)) return;
      const { properties } = node;
      const { href } = properties as { href: string };

      if (!href.startsWith("http")) return;
      properties.target = "_blank";
      properties.rel = "noopener noreferrer";
      
      if(isBareLink(node) && isElement(parent) && parent.tagName === "p"){
        properties.class = ["link-card"]
      }
    });
  };
};
