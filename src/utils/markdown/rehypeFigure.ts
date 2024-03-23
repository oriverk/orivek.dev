import type { Plugin } from "unified";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

export const rehypeFigure: Plugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (is(node, { tagName: "p" })) {
        // @ts-ignore
        const children = node.children;
        if (children.length === 1 && is(children[0], { tagName: "img" })) {
          node.tagName = "figure";

          children[0].properties.loading = "lazy";
          children[0].properties.decoding = "async";

          if (children[0].properties.title) {
            children.push({
              type: "element",
              tagName: "figcaption",
              properties: {},
              children: [
                {
                  type: "text",
                  value: children[0].properties.title,
                },
              ],
            });
          }
        }
      }
    });
  };
};
