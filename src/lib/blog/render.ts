import "server-only";
import type { JSONContent } from "@tiptap/core";
import { renderToHTMLString } from "@tiptap/static-renderer/pm/html-string";
import { createHighlighter, type Highlighter } from "shiki";
import { contentExtensions } from "./extensions";

const themes = { light: "min-light", dark: "min-dark" } as const;
const langs = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "bash",
  "css",
  "html",
  "sql",
  "python",
  "go",
  "java",
  "php",
  "vue",
  "yaml",
  "diff",
  "md",
];

let highlighter: Promise<Highlighter> | undefined;
const getHighlighter = () =>
  (highlighter ??= createHighlighter({
    themes: Object.values(themes),
    langs,
  }));

export async function renderPostHtml(doc: JSONContent) {
  const shiki = await getHighlighter();

  return renderToHTMLString({
    extensions: contentExtensions,
    content: doc,
    options: {
      nodeMapping: {
        codeBlock: ({ node }) => {
          const lang = (node.attrs.language as string | null) ?? "text";
          try {
            return shiki.codeToHtml(node.textContent, { lang, themes });
          } catch {
            return shiki.codeToHtml(node.textContent, { lang: "text", themes });
          }
        },
      },
    },
  });
}
