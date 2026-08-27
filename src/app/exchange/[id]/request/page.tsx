"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { MeetupPointSelector } from "@/components/commerce/MeetupPointSelector";
import { TimeSlotSelector } from "@/components/commerce/TimeSlotSelector";
import { AssetImage } from "@/components/media/AssetImage";
import { BottomSheet } from "@/components/sheets/BottomSheet";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { meetupPoints, timeSlots } from "@/data/checkout";
import { getEvent } from "@/data/events";
import { formatExchangeItems, getExchange, myExchangeItems } from "@/data/exchanges";
import { cn, formatEventShortDate, swapDeliveryText } from "@/lib/utils";
import type { DeliveryMethod } from "@/types";

const swapDeliveryMethods: DeliveryMethod[] = ["concert_meetup", "local", "shipping"];

export default function ExchangeRequestPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const exchange = getExchange(params.id);
  const event = exchange ? getEvent(exchange.eventId) : undefined;
  const [myItemId, setMyItemId] = useState(myExchangeItems[0].id);
  const [cashTopUp, setCashTopUp] = useState<"none" | "add">("none");
  const [topUpAmount, setTopUpAmount] = useState("");
  const [delivery, setDelivery] = useState<DeliveryMethod>("concert_meetup");
  const [meetupPoint, setMeetupPoint] = useState(meetupPoints[0]);
  const [timeSlot, setTimeSlot] = useState(timeSlots[1]);
  const [sheet, setSheet] = useState<"point" | "time" | null>(null);

  if (!exchange || !event) {
    return (
      <AppShell hideBottomNav>
        <TopHeader title="发起交换" showBack />
        <div className="page-pad">交换信息不存在</div>
      </AppShell>
    );
  }

  const selectedItem = myExchangeItems.find((item) => item.id === myItemId) ?? myExchangeItems[0];
  const haveItem = exchange.have[0];
  const wantItem = exchange.want[0];

  return (
    <AppShell hideBottomNav>
      <TopHeader title="发起交换" showBack />
      <div className="space-y-4 p-4 pb-28">
        <section className="card p-4">
          <h1 className="text-base font-black text-ink">对方需求</h1>
          <div className="mt-3 grid gap-2">
            <div className="flex items-center gap-3 rounded-2xl bg-orange-50 p-3">
              <AssetImage
                alt="五月天周边卡片"
                className="h-14 w-14 shrink-0 rounded-xl bg-white"
                fallbackLabel="卡片"
                fallbackTone="card"
                objectFit="cover"
                priority
                src={haveItem?.imagePath}
                sizes="56px"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-muted">对方提供</p>
                <p className="mt-1 text-sm font-black text-ink">{formatExchangeItems(exchange.have)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-page p-3">
              <AssetImage
                alt="五月天周边卡片"
                className="h-14 w-14 shrink-0 rounded-xl bg-white"
                fallbackLabel="卡片"
                fallbackTone="card"
                objectFit="cover"
                priority
                src={wantItem?.imagePath}
                sizes="56px"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-muted">对方想要</p>
                <p className="mt-1 text-sm font-black text-ink">{formatExchangeItems(exchange.want)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">选择我的交换物</h2>
          <div className="mt-3 grid gap-2">
            {myExchangeItems.map((item) => {
              const active = item.id === myItemId;
              const matchesExchangeWant = exchange.want.some((wanted) => wanted.name === item.name && wanted.qty <= item.qty);
              return (
                <button
                  className={cn(
                    "flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-white p-3 text-left",
                    active && "border-brand bg-orange-50",
                  )}
                  key={item.id}
                  type="button"
                  onClick={() => setMyItemId(item.id)}
                >
                  <span className={cn("grid h-5 w-5 place-items-center rounded-full border border-line", active && "border-brand bg-brand text-white")}>
                    {active ? <CheckCircle2 size={16} /> : null}
                  </span>
                  <AssetImage
                    alt={item.name.includes("卡") ? "五月天周边卡片" : item.name}
                    className="h-12 w-12 shrink-0 rounded-xl bg-white"
                    fallbackLabel={item.name.includes("卡") ? "卡片" : "周边"}
                    fallbackTone={item.name.includes("卡") ? "card" : "default"}
                    objectFit="cover"
                    priority={item.id === myExchangeItems[0].id}
                    src={item.imagePath}
                    sizes="48px"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-ink">
                      {item.name} ×{item.qty}
                    </span>
                    {matchesExchangeWant ? <span className="mt-1 inline-flex text-xs font-bold text-brand">匹配对方需求</span> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">是否补差价</h2>
          <div className="mt-3 grid gap-2">
            {[
              { value: "none", label: "不加价" },
              { value: "add", label: "补差价" },
            ].map((item) => {
              const active = cashTopUp === item.value;
              return (
                <button
                  className={cn(
                    "flex min-h-12 items-center gap-3 rounded-2xl border border-line p-3 text-left text-sm font-bold text-ink",
                    active && "border-brand bg-orange-50 text-brand",
                  )}
                  key={item.value}
                  type="button"
                  onClick={() => setCashTopUp(item.value as "none" | "add")}
                >
                  <span className={cn("grid h-5 w-5 place-items-center rounded-full border border-line", active && "border-brand bg-brand text-white")}>
                    {active ? <CheckCircle2 size={16} /> : null}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </div>
          {cashTopUp === "add" ? (
            <label className="mt-3 flex h-12 items-center gap-2 rounded-2xl border border-line bg-white px-3 text-sm font-bold text-ink">
              ¥
              <input
                className="min-w-0 flex-1 outline-none"
                inputMode="decimal"
                placeholder="输入补差价金额"
                value={topUpAmount}
                onChange={(event) => setTopUpAmount(event.target.value)}
              />
            </label>
          ) : null}
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">交换方式</h2>
          <div className="mt-3 grid gap-2">
            {swapDeliveryMethods.map((method) => {
              const active = delivery === method;
              return (
                <button
                  className={cn(
                    "flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-white p-3 text-left",
                    active && "border-brand bg-orange-50",
                  )}
                  key={method}
                  type="button"
                  onClick={() => setDelivery(method)}
                >
                  <span className={cn("grid h-5 w-5 place-items-center rounded-full border border-line", active && "border-brand bg-brand text-white")}>
                    {active ? <CheckCircle2 size={16} /> : null}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink">{swapDeliveryText(method)}</span>
                    {method === "concert_meetup" ? <span className="text-xs font-bold text-brand">推荐</span> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {delivery === "concert_meetup" ? (
          <section className="card p-4">
            <h2 className="text-base font-black text-ink">演唱会现场交换</h2>
            <div className="mt-3 rounded-2xl bg-orange-50 p-3">
              <p className="text-sm font-black text-ink">
                {event.artist}【{event.tour}】{event.city}站
              </p>
              <p className="mt-1 text-xs font-semibold text-muted">{formatEventShortDate(event.datetime)}</p>
              <p className="mt-1 text-xs font-semibold text-muted">{event.venue}</p>
            </div>
            <div className="mt-3 grid gap-2">
              <button className="flex min-h-14 items-center justify-between rounded-2xl border border-line p-3 text-left" type="button" onClick={() => setSheet("point")}>
                <span>
                  <span className="block text-xs text-muted">公共面交点</span>
                  <span className="mt-1 block text-sm font-bold text-ink">{meetupPoint}</span>
                </span>
                <ChevronRight size={18} className="text-muted" />
              </button>
              <button className="flex min-h-14 items-center justify-between rounded-2xl border border-line p-3 text-left" type="button" onClick={() => setSheet("time")}>
                <span>
                  <span className="block text-xs text-muted">时间段</span>
                  <span className="mt-1 block text-sm font-bold text-ink">{timeSlot}</span>
                </span>
                <ChevronRight size={18} className="text-muted" />
              </button>
            </div>
          </section>
        ) : null}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[390px] border-t border-line bg-white p-3">
        <PrimaryButton
          className="w-full"
          onClick={() => {
            const search = new URLSearchParams({
              mine: `${selectedItem.name} ×${selectedItem.qty}`,
              point: meetupPoint,
              time: timeSlot,
              delivery,
              topup: cashTopUp === "add" ? topUpAmount : "0",
            });
            router.push(`/exchange/${exchange.id}/success?${search.toString()}`);
          }}
        >
          发起交换请求
        </PrimaryButton>
      </div>

      <BottomSheet open={sheet === "point"} title="选择公共面交点" onClose={() => setSheet(null)}>
        <MeetupPointSelector
          value={meetupPoint}
          onSelect={(value) => {
            setMeetupPoint(value);
            setSheet(null);
          }}
        />
      </BottomSheet>

      <BottomSheet open={sheet === "time"} title="选择时间段" onClose={() => setSheet(null)}>
        <TimeSlotSelector
          value={timeSlot}
          onSelect={(value) => {
            setTimeSlot(value);
            setSheet(null);
          }}
        />
      </BottomSheet>
    </AppShell>
  );
}
