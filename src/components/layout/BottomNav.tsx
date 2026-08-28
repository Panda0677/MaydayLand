"use client";

import Link from "next/link";
import { Home, MessageCircle, Music2, Plus, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function matchesRoute(path: string, route: string) {
  return path === route || path.startsWith(`${route}/`);
}

const tabs = [
  { label: "首页", href: "/", icon: Home, match: (path: string) => path === "/" },
  { label: "演唱会", href: "/concerts", icon: Music2, match: (path: string) => matchesRoute(path, "/concerts") || matchesRoute(path, "/events") },
  { label: "发布", href: "/publish", icon: Plus, center: true, match: (path: string) => matchesRoute(path, "/publish") },
  { label: "消息", href: "/messages", icon: MessageCircle, match: (path: string) => matchesRoute(path, "/messages") },
  { label: "我的", href: "/me", icon: UserRound, match: (path: string) => matchesRoute(path, "/me") },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto grid h-[72px] w-full max-w-[390px] grid-cols-5 border-t border-line bg-white px-2 pb-2 pt-1 shadow-[0_-4px_12px_rgba(23,23,23,0.03)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.match(pathname);
        return (
          <Link
            className={cn(
              "flex h-full flex-col items-center justify-start gap-0.5 rounded-2xl pt-1.5 text-[11px] font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            )}
            href={tab.href}
            key={tab.label}
            aria-current={active ? "page" : undefined}
          >
            <span className="grid h-11 w-full place-items-center">
              <span
                className={cn(
                  "grid place-items-center rounded-full transition-colors",
                  tab.center ? "h-10 w-10 -translate-y-0.5 bg-brand text-white shadow-soft" : "h-8 w-8",
                  !tab.center && (active ? "text-brand" : "text-muted"),
                )}
              >
                <Icon size={tab.center ? 22 : 20} strokeWidth={2.2} />
              </span>
            </span>
            <span className={cn("leading-none transition-colors", active ? "text-brand" : "text-muted")}>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
