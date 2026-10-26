import type { JSONContent } from "@tiptap/core";

export function plainText(node: JSONContent): string {
  if (node.type === "text") return node.text ?? "";
  const children = (node.content ?? []).map(plainText);
  return node.type === "paragraph" || node.type === "heading"
    ? children.join("")
    : children.join("\n");
}

export function isBlankDoc(doc: JSONContent): boolean {
  const hasImage = (node: JSONContent): boolean =>
    node.type === "image" || (node.content ?? []).some(hasImage);
  return plainText(doc).trim() === "" && !hasImage(doc);
}

export function countWords(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

export function readingTime(words: number) {
  return Math.max(1, Math.round(words / 230));
}

export function firstParagraph(doc: JSONContent, max = 280) {
  const paragraph = (doc.content ?? [])
    .filter((node) => node.type === "paragraph")
    .map(plainText)
    .find((text) => text.trim().length > 0)
    ?.trim();
  if (!paragraph) return null;
  return paragraph.length > max
    ? `${paragraph.slice(0, max - 1).trimEnd()}…`
    : paragraph;
}

export function formatDate(iso: string, style: "short" | "long" = "short") {
  return new Intl.DateTimeFormat("en-US", {
    month: style === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(iso));
}
