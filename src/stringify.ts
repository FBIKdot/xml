import NodeKinds from "$/constants/NodeKinds.ts";
import type { RegularTagNode, XmlNode } from "$/types.ts";

interface StringifyOptions {
  /**
   * generate mode
   */
  mode: "space" | "indent" | "compact";
  /**
   * the indent width when using `"indent"` mode
   */
  indentWidth: number;
}

/**
 * Generate XML string from tag and text nodes.
 */
export function stringify(
  nodes: XmlNode[],
  options?: Partial<StringifyOptions>,
) {
  options ??= {};
  options.mode ??= "compact";
  options.indentWidth ??= 2;

  return nodesToStringArr(nodes, {
    mode: options.mode,
    indentWidth: options.indentWidth,
  }).join(
    options.mode === "space" ? " " : "",
  ).slice(0, options.mode === "indent" ? -1 : undefined);
}

export default stringify;

function attrToStr(attr: Record<string, string>): string {
  return Object.entries(attr).map(([key, value]) =>
    `${key}="${value.replaceAll('"', '\\"')}"`
  ).join(" ");
}

function nodeChildIsStr(node: RegularTagNode): boolean {
  return node.children.length === 1 && node.children[0].kind === NodeKinds.Text;
}

function nodesToStringArr(
  nodes: XmlNode[],
  options: StringifyOptions,
  baseIndent: number = 0,
): string[] {
  const indent = options.mode === "indent" ? " ".repeat(baseIndent) : "";
  const end = options.mode === "indent" ? "\n" : "";

  return nodes.flatMap((node): string | string[] => {
    switch (node.kind) {
      case NodeKinds.Bad:
        return node.value + ">";
      case NodeKinds.Text:
        return node.value;
      case NodeKinds.Comment:
        return `${indent}<!--${node.value}-->${end}`;
      case NodeKinds.RegularTag:
        return [
          `${indent}<${node.tagName}${
            node.attributes ? " " + attrToStr(node.attributes) : ""
          }>${nodeChildIsStr(node) ? "" : end}`,
          nodesToStringArr(
            node.children,
            options,
            baseIndent + options.indentWidth,
          ),
          `${nodeChildIsStr(node) ? "" : indent}</${node.tagName}>${end}`,
        ].flat();
      case NodeKinds.OrphanTag:
        return `${indent}<${node.isDeclaration ? "?" : ""}${node.tagName}${
          node.attributes ? " " + attrToStr(node.attributes) : ""
        }${node.isDeclaration ? "?" : " /"}>${end}`;
    }
  });
}
