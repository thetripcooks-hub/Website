import { BLOCKS, type Document } from "@contentful/rich-text-types";

export type TocSection = { id: string; label: string };

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-");
}

export function extractHeadings(body: Document): TocSection[] {
  const headingTypes = [BLOCKS.HEADING_2, BLOCKS.HEADING_3];
  return body.content
    .filter((n) => headingTypes.includes(n.nodeType as BLOCKS))
    .map((n) => {
      const text = (n.content as any[])
        .filter((c) => c.nodeType === "text")
        .map((c) => c.value as string)
        .join("");
      return { id: slugify(text), label: text };
    })
    .filter((s) => s.label.length > 0);
}

export function splitAtMidpointHeading(doc: Document): [Document, Document] {
  const headingTypes = [BLOCKS.HEADING_2, BLOCKS.HEADING_3];
  const headingIndices = doc.content
    .map((n, i) => (headingTypes.includes(n.nodeType as BLOCKS) ? i : -1))
    .filter((i) => i !== -1);
  const splitIdx =
    headingIndices[Math.floor(headingIndices.length / 2)] ??
    doc.content.length;
  return [
    { ...doc, content: doc.content.slice(0, splitIdx) },
    { ...doc, content: doc.content.slice(splitIdx) },
  ];
}
