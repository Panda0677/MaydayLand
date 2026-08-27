"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, MoreHorizontal } from "lucide-react";

type TopHeaderProps = {
  title?: string;
  showBack?: boolean;
  more?: boolean;
};

export function TopHeader({ title, showBack = false, more = false }: TopHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 flex h-[52px] items-center justify-between border-b border-line bg-page/95 px-4 backdrop-blur">
      <div className="w-10">
        {showBack ? (
          <button className="grid h-10 w-10 place-items-center rounded-full text-ink transition active:bg-white" type="button" onClick={() => router.back()} aria-label="返回">
            <ChevronLeft size={22} strokeWidth={2.3} />
          </button>
        ) : (
          <Link className="text-lg font-black tracking-normal text-brand" href="/">
            Encore
          </Link>
        )}
      </div>
      {title ? <h1 className="min-w-0 flex-1 truncate text-center text-base font-bold text-ink">{title}</h1> : <div />}
      <div className="flex w-10 justify-end">
        {more ? (
          <button className="grid h-10 w-10 place-items-center rounded-full text-ink transition active:bg-white" type="button" aria-label="更多">
            <MoreHorizontal size={22} />
          </button>
        ) : null}
      </div>
    </header>
  );
}
