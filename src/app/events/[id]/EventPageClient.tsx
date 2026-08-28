"use client";

import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { EventHeader } from "@/components/event/EventHeader";
import { EventTabs } from "@/components/event/EventTabs";
import { CategoryChips } from "@/components/event/CategoryChips";
import { ProductCard } from "@/components/cards/ProductCard";
import { EventCommunityFeed } from "@/components/community/EventCommunityFeed";
import { ExchangeCard } from "@/components/exchange/ExchangeCard";
import { RentalCard } from "@/components/rental/RentalCard";
import { FilterChip } from "@/components/ui/FilterChip";
import { StatusBanner } from "@/components/ui/StatusBanner";
import { getEvent } from "@/data/events";
import { getExchangesByEvent } from "@/data/exchanges";
import { getProductsByEvent } from "@/data/products";
import { getRentalsByEvent } from "@/data/rentals";

type EventPageClientProps = {
  eventId: string;
};

export default function EventPageClient({ eventId }: EventPageClientProps) {
  const searchParams = useSearchParams();
  const event = getEvent(eventId);
  if (!event) return null;

  const eventProducts = getProductsByEvent(event.id);
  const eventExchanges = getExchangesByEvent(event.id);
  const eventRentals = getRentalsByEvent(event.id);
  const activeTab =
    searchParams.get("tab") === "swap"
      ? "交换"
      : searchParams.get("tab") === "rental"
        ? "租赁"
        : searchParams.get("tab") === "community"
          ? "广场"
          : "闲置";
  const liveDemo = searchParams.get("phase") === "live";
  const displayEvent = liveDemo ? { ...event, phase: "live" as const } : event;

  return (
    <AppShell>
      <TopHeader title={`${event.artist}${event.city}站`} showBack />
      <div className="page-pad pt-4">
        <EventHeader event={displayEvent} />

        <section className="mt-3 grid grid-cols-3 gap-2">
          <div className="card p-3 text-center">
            <p className="text-xs text-muted">{liveDemo ? "演出状态" : "距离演出"}</p>
            <p className="mt-1 text-sm font-black text-ink">{liveDemo ? "今日演出" : "17 天"}</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-xs text-muted">现场模式</p>
            <p className="mt-1 text-sm font-black text-ink">{liveDemo ? "已开启" : "未开启"}</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-xs text-muted">{liveDemo ? "现场交易" : "官方周边区"}</p>
            <p className="mt-1 text-sm font-black text-ink">{liveDemo ? "326 人" : "入口指引"}</p>
          </div>
        </section>

        <div className="mt-3">
          <StatusBanner event={displayEvent} />
        </div>

        <div className="mt-4">
          <EventTabs active={activeTab} eventId={event.id} />
        </div>

        {activeTab === "交换" ? (
          <section className="mt-4">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
              <FilterChip active>全部</FilterChip>
              <FilterChip>我有</FilterChip>
              <FilterChip>我想要</FilterChip>
              <FilterChip>可补差价</FilterChip>
            </div>
            <div className="mt-4 grid gap-3">
              {eventExchanges.map((exchange) => (
                <ExchangeCard exchange={exchange} key={exchange.id} />
              ))}
            </div>
          </section>
        ) : activeTab === "租赁" ? (
          <section className="mt-4">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
              <FilterChip active>全部</FilterChip>
              <FilterChip>现场取还</FilterChip>
              <FilterChip>同城取还</FilterChip>
              <FilterChip>押金低</FilterChip>
            </div>
            <div className="mt-4 grid gap-3">
              {eventRentals.map((rental) => (
                <RentalCard rental={rental} key={rental.id} />
              ))}
            </div>
          </section>
        ) : activeTab === "广场" ? (
          <EventCommunityFeed eventId={event.id} />
        ) : (
          <section className="mt-4">
            <CategoryChips />
            <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
              <FilterChip active>
                默认排序 <ChevronDown size={13} />
              </FilterChip>
              <FilterChip>可现场面交</FilterChip>
              <FilterChip>
                价格 <ChevronDown size={13} />
              </FilterChip>
              <FilterChip>筛选</FilterChip>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {eventProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
