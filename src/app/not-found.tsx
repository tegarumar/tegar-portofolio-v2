import Link from "next/link";
import { DraggableDigits } from "@/components/draggable-digits";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[640px] flex-col justify-center px-5 py-16 sm:px-6">
      <DraggableDigits text="404" />
      <h1 className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-foreground">
        This page wandered off.
      </h1>
      <p className="mt-2 text-muted">
        Go ahead, throw the numbers around. Then let&apos;s get you home.
      </p>
      <Button asChild className="mt-8 self-start">
        <Link href="/">Take me home</Link>
      </Button>
    </main>
  );
}
