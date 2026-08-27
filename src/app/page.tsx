"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { EventCard } from "@/components/cards/EventCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { events } from "@/data/events";
import { products } from "@/data/products";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const filteredProducts = useMemo(() => {
    const keyword = query.trim();
    if (!keyword) return products;
    return products.filter((product) => product.title.includes(keyword));
  }, [query]);

  return (
    <AppShell>
      <div className="page-pad">
        <header className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-black tracking-normal text-brand">Encore</p>
            <p className="meta-text font-semibold">演唱会闲置交易</p>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink shadow-soft transition active:bg-page" type="button" aria-label="消息提醒">
            <Bell size={19} />
          </button>
        </header>

        <div className="mt-3">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <section className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="section-title">近期热门演唱会</h1>
            <Link className="text-xs font-bold text-brand" href="/concerts">
              更多
            </Link>
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h2 className="mb-3 section-title">猜你喜欢</h2>
          {filteredProducts.length ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <div className="card p-6 text-center">
              <p className="text-sm font-bold text-ink">暂无推荐</p>
              <p className="mt-1 text-xs text-muted">换个关键词看看</p>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
