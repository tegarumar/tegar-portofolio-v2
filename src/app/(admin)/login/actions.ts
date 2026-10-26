"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type SignInState = { error: string | null; attempt: number };

const credentials = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export async function signIn(
  prev: SignInState,
  formData: FormData
): Promise<SignInState> {
  const failed = (error: string) => ({ error, attempt: prev.attempt + 1 });

  const parsed = credentials.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return failed("Enter your email and password.");

  const supabase = await createClient();
  if (!supabase) return failed("Supabase isn't configured yet.");

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return failed("That email and password don't match.");

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/login");
}
