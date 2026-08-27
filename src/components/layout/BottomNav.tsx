"use client";

import Link from "next/link";
import { Home, MessageCircle, Music2, Plus, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "首页", href: "/", icon: Home, match: (path: string) => path === "/" },
  { label: "演唱会", href: "/concerts", icon: Music2, match: (path: string) => path.startsWith("/concerts") || path.startsWith("/events") },
  { label: "发布", href: "/publish", icon: Plus, center: true, match: (path: string) => path.startsWith("/publish") },
  { label: "消息", href: "/messages", icon: MessageCircle, match: (path: string) => path.startsWith("/messages") },
  { label: "我的", href: "/me", icon: UserRound, match: (path: string) => path.startsWith("/me") },
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
              "flex flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold text-muted outline-none transition focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
              active && "text-brand",
            )}
            href={tab.href}
            key={tab.label}
          >
            <span
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full",
                tab.center && "h-10 w-10 -translate-y-1 bg-brand text-white shadow-soft",
                tab.center && active && "text-white",
              )}
            >
              <Icon size={tab.center ? 22 : 20} strokeWidth={2.2} />
            </span>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
