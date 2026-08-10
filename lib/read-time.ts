import type { Document } from "@contentful/rich-text-types";

export function calcReadTime(body: Document): string {
  const extractText = (nodes: any[]): string =>
    nodes
      .flatMap((node) => {
        if (node.nodeType === "text") return [node.value as string];
        if (node.content) return [extractText(node.content)];
        return [];
      })
      .join(" ");

  const text = extractText(body.content);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
