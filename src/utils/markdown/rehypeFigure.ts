import type { Root } from "hast";
import type { Plugin } from "unified";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
export const rehypeFigure: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (is(node, { tagName: "p" })) {
        const { children } = node;
        if (children.length === 1 && is(children[0], { tagName: "img" })) {
          node.tagName = "figure";

          children[0].properties.loading = "lazy";
          children[0].properties.decoding = "async";
          const caption = children[0].properties.title;

          if (caption && typeof caption === "string") {
            children.push({
              type: "element",
              tagName: "figcaption",
              properties: {},
              children: [
                {
                  type: "text",
                  value: caption,
                },
              ],
            });
          }
        }
      }
    });
  };
};
