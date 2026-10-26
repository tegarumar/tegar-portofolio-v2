import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LocalTime } from "@/components/motion/local-time";
import { NavPills } from "@/components/motion/nav-pills";
import { ThemeToggle } from "@/components/theme-toggle";
import { DATA } from "@/data/resume";

export default function SiteLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background via-background/80 to-transparent"
        />
        <div className="relative mx-auto flex max-w-[640px] items-center justify-between gap-3 px-5 py-4 sm:px-6">
          <Link
            href="/"
            aria-label="Home"
            className="rounded-full shadow-soft transition-transform duration-300 ease-out-expo active:scale-95"
          >
            <Image
              src={DATA.avatarUrl}
              alt=""
              width={36}
              height={36}
              priority
              className="size-9 rounded-full object-cover"
            />
          </Link>
          <div className="flex items-center gap-2">
            <NavPills items={DATA.navbar} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[640px] px-5 pt-8 sm:px-6 sm:pt-14">
        {children}
      </main>
      {modal}

      <footer className="mx-auto w-full max-w-[640px] px-5 pb-12 pt-24 sm:px-6">
        <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex gap-5 text-[15px]">
            {Object.values(DATA.contact.social).map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition-colors duration-300 ease-out-expo hover:text-foreground"
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="label">
            Bandung · <LocalTime timeZone={DATA.timeZone} /> WIB
          </p>
        </div>
      </footer>
    </>
  );
}
