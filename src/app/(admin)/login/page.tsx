import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DATA } from "@/data/resume";
import { getOwner } from "@/lib/auth/dal";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await getOwner()) redirect("/dashboard");
  const configured = getSupabaseEnv() !== null;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center px-5 py-16">
      <div className="mb-8 flex flex-col items-center text-center animate-enter">
        <Image
          src={DATA.avatarUrl}
          alt=""
          width={56}
          height={56}
          className="size-14 rounded-full object-cover shadow-soft"
        />
        <h1 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-foreground">
          Welcome back
        </h1>
        <p className="mt-1 text-muted">Sign in to write.</p>
      </div>

      <div className="animate-enter [animation-delay:80ms]">
        {configured ? (
          <LoginForm />
        ) : (
          <p className="rounded-card bg-surface p-6 text-[15px] shadow-soft">
            Supabase isn&apos;t configured. Copy <code>.env.example</code> to{" "}
            <code>.env.local</code> and fill in your project&apos;s keys.
          </p>
        )}
      </div>

      <Link
        href="/"
        className="label mt-8 self-center transition-colors duration-300 ease-out-expo hover:text-foreground"
      >
        ← Back to site
      </Link>
    </main>
  );
}
