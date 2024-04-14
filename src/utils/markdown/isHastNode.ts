import type { Element, Properties } from "hast";
import type { Literal, Node, Parent } from "unist";

function isObject(target: unknown): target is Record<string, unknown> {
  return typeof target === "object" && target !== null;
}

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

// https://github.com/syntax-tree/hast?tab=readme-ov-file#element
export function isElement(node: unknown): node is Element {
  return isObject(node) && node.type === "element";
}

interface Anchor extends Element {
  tagName: "a";
}

export function isAnchor(node: unknown): node is Anchor {
  return isElement(node) && node.tagName === "a";
}

export function isBareLink(node: unknown) {
  return isAnchor(node) && isLiteral(node.children[0]) && node.children[0].value === node.properties.href
}
