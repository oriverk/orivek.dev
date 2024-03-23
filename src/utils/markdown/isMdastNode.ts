import type {
  Paragraph,
  Text,
  Link,
  Code,
} from "mdast";
import type { Node, Parent, Literal } from "unist";

function isObject(target: unknown): target is Record<string, unknown> {
  return typeof target === "object" && target !== null;
}

// https://github.com/syntax-tree/unist#node
export function isNode(node: unknown): node is Node {
  return isObject(node) && "type" in node;
}

// https://github.com/syntax-tree/unist#parent
export function isParent(node: unknown): node is Parent {
  return isObject(node) && Array.isArray(node.children);
}

// https://github.com/syntax-tree/unist#literal
export function isLiteral(node: unknown): node is Literal {
  return isObject(node) && "value" in node;
}

// https://github.com/syntax-tree/mdast#paragraph
export function isParagraph(node: unknown): node is Paragraph {
  return isNode(node) && node.type === "paragraph";
}

// https://github.com/syntax-tree/mdast#text
export function isText(node: unknown): node is Text {
  return (
    isLiteral(node) && node.type === "text" && typeof node.value === "string"
  );
}

// https://github.com/syntax-tree/mdast?tab=readme-ov-file#code
export function isCode(node: unknown): node is Code {
  return isNode(node) && node.type === "code"
}

export function isLink(node: unknown): node is Link {
  return isNode(node) && node.type === "link";
}

export function isBareLink(node: unknown): node is Paragraph & {
  children: [Link & { children: [Text] }];
} {
  return (
    isParagraph(node) &&
    node.children.length === 1 &&
    isLink(node.children[0]) &&
    isText(node.children[0].children[0])
  );
}
