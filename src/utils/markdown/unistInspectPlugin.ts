import type { Plugin} from "unified";
import type { Node } from "unist";
import { inspect } from "unist-util-inspect";

export const unistInspectPlugin: Plugin = () => {
  return (tree: Node) => {
    console.log(inspect(tree));
  };
};

