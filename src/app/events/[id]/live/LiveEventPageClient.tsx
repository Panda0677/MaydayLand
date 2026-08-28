"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Radio } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { BottomSheet } from "@/components/sheets/BottomSheet";
import { FilterChip } from "@/components/ui/FilterChip";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { LiveListingCard } from "@/components/live/LiveListingCard";
import { getEvent } from "@/data/events";
import {
  getLiveListingsByEvent,
  liveTimeRank,
  type LiveDistanceFilter,
  type LiveListingFilter,
  type LiveTimeFilter,
} from "@/data/liveListings";
import { formatEventShortDate } from "@/lib/utils";

const typeFilters: Array<{ label: string; value: LiveListingFilter }> = [
  { label: "全部", value: "all" },
  { label: "出售", value: "resale" },
  { label: "交换", value: "swap" },
  { label: "租赁", value: "rental" },
  { label: "求购", value: "wanted" },
];

const distanceOptions: Array<{ label: string; value: LiveDistanceFilter; max: number }> = [
  { label: "500m 内", value: "500m", max: 500 },
  { label: "1km 内", value: "1km", max: 1000 },
  { label: "全部", value: "all", max: Number.POSITIVE_INFINITY },
];

const timeOptions: Array<{ label: string; value: LiveTimeFilter; max: number }> = [
  { label: "全部", value: "all", max: Number.POSITIVE_INFINITY },
  { label: "18:00 前", value: "18:00", max: 1800 },
  { label: "18:30 前", value: "18:30", max: 1830 },
];

type LiveEventPageClientProps = {
  eventId: string;
};

export default function LiveEventPageClient({ eventId }: LiveEventPageClientProps) {
  const event = getEvent(eventId);
  const [typeFilter, setTypeFilter] = useState<LiveListingFilter>("all");
  const [distanceFilter, setDistanceFilter] = useState<LiveDistanceFilter>("500m");
  const [timeFilter, setTimeFilter] = useState<LiveTimeFilter>("all");
  const [sheet, setSheet] = useState<"distance" | "time" | null>(null);

  const listings = useMemo(() => {
    const distance = distanceOptions.find((option) => option.value === distanceFilter) ?? distanceOptions[0];
    const time = timeOptions.find((option) => option.value === timeFilter) ?? timeOptions[0];
    return getLiveListingsByEvent(eventId).filter((listing) => {
      const typeMatch = typeFilter === "all" || listing.type === typeFilter;
      const distanceMatch = listing.distanceMeters <= distance.max;
      const timeMatch = time.value === "all" || liveTimeRank(listing.availableUntil) >= time.max;
      return typeMatch && distanceMatch && timeMatch;
    });
  }, [distanceFilter, eventId, timeFilter, typeFilter]);

  if (!event) {
    return (
      <AppShell hideBottomNav>
        <TopHeader title="现场模式" showBack />
        <div className="page-pad">演唱会不存在</div>
      </AppShell>
    );
  }

  const distanceLabel = distanceOptions.find((option) => option.value === distanceFilter)?.label ?? "500m 内";
  const timeLabel = timeOptions.find((option) => option.value === timeFilter)?.label ?? "全部";

  return (
    <AppShell hideBottomNav>
      <TopHeader title="现场模式" showBack />
      <div className="space-y-4 p-4 pb-8">
        <section className="card overflow-hidden">
          <div className="bg-[linear-gradient(135deg,#fff7ed,#dcfce7)] p-4">
            <div className="flex items-center gap-2 text-xs font-black text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              现场模式已开启
            </div>
            <h1 className="mt-3 text-xl font-black leading-7 text-ink">
              {event.artist}【{event.tour}】{event.city}站
            </h1>
            <p className="mt-2 text-sm font-semibold text-muted">{formatEventShortDate(event.datetime)}</p>
            <p className="mt-1 text-sm font-semibold text-muted">{event.venue}</p>
            <p className="mt-3 text-sm font-black text-ink">326 位乐迷正在现场交易</p>
          </div>
        </section>

        <section className="card border-green-100 bg-green-50 p-4">
          <div className="flex items-start gap-3">
            <Radio className="mt-0.5 text-green-600" size={18} />
            <div className="min-w-0">
              <p className="text-sm font-black text-green-800">326 位乐迷正在现场交易</p>
              <p className="mt-1 text-xs leading-5 text-green-700">仅展示公共面交点，不公开个人精确位置。</p>
            </div>
          </div>
        </section>

        <section>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {typeFilters.map((filter) => (
              <FilterChip active={typeFilter === filter.value} key={filter.value} onClick={() => setTypeFilter(filter.value)}>
                {filter.label}
              </FilterChip>
            ))}
          </div>
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
            <FilterChip active={distanceFilter !== "all"} onClick={() => setSheet("distance")}>
              距离：{distanceLabel} <ChevronDown size={13} />
            </FilterChip>
            <FilterChip active={timeFilter !== "all"} onClick={() => setSheet("time")}>
              希望交易时间：{timeLabel} <ChevronDown size={13} />
            </FilterChip>
          </div>
        </section>

        {listings.length > 0 ? (
          <section className="grid gap-3">
            {listings.map((listing) => (
              <LiveListingCard listing={listing} key={listing.id} />
            ))}
          </section>
        ) : (
          <section className="card p-5 text-center">
            <h2 className="text-lg font-black text-ink">附近暂时没有找到合适的物品</h2>
            <p className="mt-2 text-sm leading-6 text-muted">可以发布现场求购，让附近乐迷看到你的需求。</p>
            <PrimaryButton className="mt-5 w-full" href={`/events/${event.id}/live/wanted`}>
              发布现场求购
            </PrimaryButton>
          </section>
        )}

        {listings.length > 0 && typeFilter !== "wanted" ? (
          <Link className="block text-center text-sm font-bold text-brand" href={`/events/${event.id}/live/wanted`}>
            没找到合适的？发布现场求购
          </Link>
        ) : null}
      </div>

      <BottomSheet open={sheet === "distance"} title="距离" onClose={() => setSheet(null)}>
        <div className="grid gap-2">
          {distanceOptions.map((option) => (
            <button
              className="flex min-h-12 items-center rounded-2xl border border-line p-3 text-left text-sm font-bold text-ink"
              key={option.value}
              type="button"
              onClick={() => {
                setDistanceFilter(option.value);
                setSheet(null);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet open={sheet === "time"} title="希望交易时间" onClose={() => setSheet(null)}>
        <div className="grid gap-2">
          {timeOptions.map((option) => (
            <button
              className="flex min-h-12 items-center rounded-2xl border border-line p-3 text-left text-sm font-bold text-ink"
              key={option.value}
              type="button"
              onClick={() => {
                setTimeFilter(option.value);
                setSheet(null);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </BottomSheet>
    </AppShell>
  );
}
