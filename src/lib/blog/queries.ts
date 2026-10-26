import "server-only";
import { cache } from "react";
import type { PostRow } from "@/lib/supabase/database.types";
import { createPublicClient } from "@/lib/supabase/public";

export type PostSummary = Pick<
  PostRow,
  "slug" | "title" | "excerpt" | "published_at" | "word_count"
>;

export async function getPublishedPosts(limit?: number): Promise<PostSummary[]> {
  const supabase = createPublicClient();
  if (!supabase) return [];

  let query = supabase
    .from("posts")
    .select("slug, title, excerpt, published_at, word_count")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[blog] couldn't load posts:", error.message);
    return [];
  }
  return data;
}

export const getPublishedPost = cache(async (slug: string) => {
  const supabase = createPublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) {
    console.error(`[blog] couldn't load "${slug}":`, error.message);
    return null;
  }
  return data;
});
