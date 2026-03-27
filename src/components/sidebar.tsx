"use client";

import { DATA } from "@/data/resume";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  UserIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  WrenchIcon,
  FolderIcon,
  MailIcon,
  HomeIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: UserIcon },
  { href: "/work", label: "Work", icon: BriefcaseIcon },
  { href: "/education", label: "Education", icon: GraduationCapIcon },
  { href: "/skills", label: "Skills", icon: WrenchIcon },
  { href: "/projects", label: "Projects", icon: FolderIcon },
  { href: "/contact", label: "Contact", icon: MailIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // ── Shared nav item renderer ──────────────────────────────
  const NavItem = ({
    item,
    collapsed,
  }: {
    item: (typeof NAV_ITEMS)[0];
    collapsed: boolean;
  }) => {
    const active = isActive(item.href);
    return (
      <Link
        href={item.href}
        title={item.label}
        className="flex items-center gap-3 transition-all duration-100 cursor-pointer"
        style={{
          padding: collapsed ? "12px 0" : "12px 20px",
          justifyContent: collapsed ? "center" : "flex-start",
          backgroundColor: active ? "#000" : "transparent",
          // borderLeft:
          //   active && !collapsed ? "4px solid #000" : "4px solid transparent",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          color: active ? "#fff" : "#000",
          fontWeight: 700,
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        <item.icon
          size={16}
          style={{
            strokeWidth: 2.5,
            flexShrink: 0,
            color: active ? "#fff" : "#000",
          }}
        />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    );
  };

  // ── Social icons ─────────────────────────────────────────
  const socialLinks = Object.entries(DATA.contact.social).filter(
    ([_, s]) => s.navbar,
  );

  const SocialArea = ({ compact }: { compact: boolean }) => (
    <div
      className="p-3 flex gap-2 flex-wrap"
      style={{
        borderTop: "3px solid #000",
        justifyContent: compact ? "center" : "flex-start",
      }}
    >
      {!compact && (
        <p
          className="w-full text-[10px] font-black uppercase tracking-widest mb-1"
          style={{ color: "rgba(0,0,0,0.45)" }}
        >
          Find me on
        </p>
      )}
      {socialLinks.map(([name, social]) => (
        <Link
          key={name}
          href={social.url}
          target="_blank"
          title={name}
          className="flex items-center justify-center"
          style={{
            border: "2px solid #000",
            boxShadow: "2px 2px 0 #000",
            backgroundColor: "#fff",
            width: 32,
            height: 32,
            flexShrink: 0,
            transition: "all 0.1s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.backgroundColor = "#FFE033";
            el.style.boxShadow = "0 0 0 #000";
            el.style.transform = "translate(2px,2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.backgroundColor = "#fff";
            el.style.boxShadow = "2px 2px 0 #000";
            el.style.transform = "translate(0,0)";
          }}
        >
          <social.icon className="size-4" />
        </Link>
      ))}
    </div>
  );

  // ── Branding block ─────────────────────────────────────────
  const Brand = ({ collapsed }: { collapsed: boolean }) => (
    <div
      style={{
        borderBottom: "3px solid #000",
        backgroundColor: "#a9d6b7",
        padding: collapsed ? "14px 0" : "16px 20px",
        textAlign: collapsed ? "center" : "left",
      }}
    >
      {collapsed ? (
        <span style={{ fontSize: 20, fontWeight: 900 }}>T</span>
      ) : (
        <>
          <p
            style={{
              fontSize: 9,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              marginBottom: 4,
            }}
          >
            Portfolio
          </p>
          <h1
            style={{
              fontSize: 15,
              fontWeight: 900,
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}
          >
            {DATA.name.split(" ")[0]}
            <br />
            {DATA.name.split(" ").slice(1).join(" ")}
          </h1>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              marginTop: 4,
              color: "rgba(0,0,0,0.6)",
            }}
          >
            {DATA.description.split(" - ")[0]}
          </p>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* ── MOBILE: hamburger button ─────────────────────────── */}
      <button
        className={`md:hidden fixed z-[60] flex items-center justify-center ${mobileOpen ? "top-4 right-4" : "top-4 left-4"}`}
        style={{
          width: 40,
          height: 40,
          border: "2px solid #000",
          boxShadow: "3px 3px 0 #000",
          backgroundColor: mobileOpen ? "#FFE033" : "#fff",
        }}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? (
          <XIcon size={18} strokeWidth={2.5} />
        ) : (
          <MenuIcon size={18} strokeWidth={2.5} />
        )}
      </button>

      {/* ── MOBILE: overlay backdrop ─────────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-[45]"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE: slide-in drawer ───────────────────────────── */}
      <aside
        className="md:hidden fixed top-0 left-0 h-full z-[50] flex flex-col bg-[var(--nb-mint)]"
        style={{
          width: 240,
          borderRight: "3px solid #000",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
        }}
      >
        <Brand collapsed={false} />
        <nav className="flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} item={item} collapsed={false} />
          ))}
        </nav>
        <SocialArea compact={false} />
      </aside>

      {/* ── TABLET: icon-only sidebar ─────────────────────────── */}
      <aside
        className="hidden md:flex lg:hidden fixed top-0 left-0 h-full z-40 flex-col bg-[var(--nb-mint)]"
        style={{ width: 64, borderRight: "3px solid #000" }}
      >
        <Brand collapsed={true} />
        <nav className="flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} item={item} collapsed={true} />
          ))}
        </nav>
        <SocialArea compact={true} />
      </aside>

      {/* ── DESKTOP: full sidebar ────────────────────────────── */}
      <aside
        className="hidden lg:flex fixed top-0 left-0 h-full z-40 flex-col bg-[var(--nb-mint)]"
        style={{ width: 220, borderRight: "3px solid #000" }}
      >
        <Brand collapsed={false} />
        <nav className="flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} item={item} collapsed={false} />
          ))}
        </nav>
        <SocialArea compact={false} />
      </aside>
    </>
  );
}
