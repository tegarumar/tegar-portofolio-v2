import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getOwner = cache(async () => {
  const supabase = await createClient();
  const ownerId = process.env.BLOG_OWNER_ID;
  if (!supabase || !ownerId) return null;

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims || claims.is_anonymous || claims.sub !== ownerId) {
    return null;
  }

  return { supabase, userId: claims.sub };
});

export async function requireOwner() {
  const owner = await getOwner();
  if (!owner) redirect("/login");
  return owner;
}
