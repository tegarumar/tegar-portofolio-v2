import type { JSONContent } from "@tiptap/core";

export type PostStatus = "draft" | "published";

export type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: JSONContent;
  cover_image: string | null;
  status: PostStatus;
  published_at: string | null;
  word_count: number;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: PostRow;
        Insert: Partial<PostRow> & Pick<PostRow, "slug">;
        Update: Partial<PostRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
