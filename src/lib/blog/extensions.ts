import type { Extensions } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";

export const contentExtensions: Extensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    link: { openOnClick: false, defaultProtocol: "https" },
  }),
  Image.configure({
    HTMLAttributes: { loading: "lazy", decoding: "async" },
  }),
];
