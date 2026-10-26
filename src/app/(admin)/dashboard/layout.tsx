import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SignOutButton } from "@/components/editor/sign-out-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { signOut } from "../login/actions";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <Image
              src={DATA.avatarUrl}
              alt=""
              width={28}
              height={28}
              className="size-7 rounded-full object-cover"
            />
            <span className="text-[15px] font-medium text-foreground">
              Writing
            </span>
          </Link>
          <div className="flex items-center gap-1.5">
            <Button asChild variant="ghost" size="sm">
              <Link href="/blog" target="_blank">
                View blog
              </Link>
            </Button>
            <form action={signOut}>
              <SignOutButton />
            </form>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-6 sm:py-12">
        {children}
      </main>
    </>
  );
}
