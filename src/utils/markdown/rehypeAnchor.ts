import type { Plugin } from "unified";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

export const rehypeAnchor: Plugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (is(node, { tagName: "a" })) {
        // @ts-ignore
        const props = node.properties || {};

        props.target = "_blank";
        props.rel = "noopener noreferrer";
      }
    });
  };
};
