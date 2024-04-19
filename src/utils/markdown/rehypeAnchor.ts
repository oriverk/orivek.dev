import type { Plugin } from "unified";
import type { Root } from "hast";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";
import { isAnchor, isParent, isBareLink } from "./isHastNode";
import { isTweetUrl } from "./urlMatcher";

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
      
      if(isBareLink(node, parent)){
        if(isTweetUrl(href)){
          properties["data-embed"] = "twitter"
        } else {
          properties["data-embed"] = "ogp"
        }
      }
    });
  };
};
