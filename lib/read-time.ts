import type { Document, Block, Inline } from "@contentful/rich-text-types";

export function calcReadTime(body: Document): string {
  const extractText = (nodes: (Block | Inline)[]): string =>
    nodes
      .flatMap((node) => {
        if (node.nodeType === "text") return [(node as any).value as string];
        if ("content" in node) return [extractText(node.content as (Block | Inline)[])];
        return [];
      })
      .join(" ");

  const text = extractText(body.content as (Block | Inline)[]);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
