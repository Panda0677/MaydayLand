"use client";

import { useState } from "react";
import { Check, CheckCircle2, ChevronRight, ImagePlus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { AssetImage } from "@/components/media/AssetImage";
import { BottomSheet } from "@/components/sheets/BottomSheet";
import { MeetupPointSelector } from "@/components/commerce/MeetupPointSelector";
import { TimeSlotSelector } from "@/components/commerce/TimeSlotSelector";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { meetupPoints, timeSlots } from "@/data/checkout";
import { getEvent } from "@/data/events";
import { cn, deliveryText, formatEventShortDate } from "@/lib/utils";
import type { DeliveryMethod } from "@/types";

const event = getEvent("mayday-shanghai-20260912");
const conditions = ["全新", "9 成新", "8 成新", "有使用痕迹"];
const deliveryMethods: DeliveryMethod[] = ["shipping", "local", "concert_meetup"];

export default function PublishResalePage() {
  const [condition, setCondition] = useState("9 成新");
  const [selectedMethods, setSelectedMethods] = useState<DeliveryMethod[]>(["shipping", "local", "concert_meetup"]);
  const [meetupPoint, setMeetupPoint] = useState(meetupPoints[0]);
  const [timeSlot, setTimeSlot] = useState(timeSlots[1]);
  const [sheet, setSheet] = useState<"point" | "time" | null>(null);
  const [success, setSuccess] = useState(false);

  function toggleMethod(method: DeliveryMethod) {
    setSelectedMethods((current) => {
      if (current.includes(method)) {
        return current.length === 1 ? current : current.filter((item) => item !== method);
      }
      return [...current, method];
    });
  }

  const supportsConcertMeetup = selectedMethods.includes("concert_meetup");

  return (
    <AppShell hideBottomNav>
      <TopHeader title="发布闲置" showBack />
      <div className="space-y-4 p-4 pb-28">
        <section className="card p-4">
          <h1 className="text-base font-black text-ink">商品图片</h1>
          <button className="mt-3 block overflow-hidden rounded-2xl text-brand" type="button">
            <AssetImage
              alt="五月天荧光棒"
              className="h-28 w-28 rounded-2xl bg-white"
              fallbackLabel="荧光棒"
              fallbackTone="glowstick"
              objectFit="contain"
              src="/assets/products/mayday-glowstick-square.jpg"
              sizes="112px"
            >
              <span className="absolute inset-x-0 bottom-0 grid place-items-center gap-1 bg-white/90 py-1.5 text-xs font-bold">
              <ImagePlus size={24} />
              添加图片
              </span>
            </AssetImage>
          </button>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">商品信息</h2>
          <div className="mt-3 grid gap-2">
            <label className="rounded-2xl border border-line bg-white px-3 py-2">
              <span className="text-xs text-muted">商品名称</span>
              <input className="mt-1 w-full text-sm font-bold text-ink outline-none" defaultValue="官方荧光棒（几乎全新）" />
            </label>
            <label className="rounded-2xl border border-line bg-white px-3 py-2">
              <span className="text-xs text-muted">商品描述</span>
              <textarea
                className="mt-1 min-h-20 w-full resize-none text-sm font-semibold leading-6 text-ink outline-none"
                defaultValue="演唱会只使用过一次，功能正常，无明显划痕。"
              />
            </label>
            <label className="flex h-12 items-center gap-2 rounded-2xl border border-line bg-white px-3 text-sm font-bold text-ink">
              ¥
              <input className="min-w-0 flex-1 outline-none" defaultValue="89" inputMode="numeric" />
            </label>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">成色</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {conditions.map((item) => (
              <button
                className={cn(
                  "h-11 rounded-2xl border border-line bg-white text-sm font-bold text-ink",
                  condition === item && "border-brand bg-orange-50 text-brand",
                )}
                key={item}
                type="button"
                onClick={() => setCondition(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">关联 Event</h2>
          <div className="mt-3 rounded-2xl bg-orange-50 p-3">
            <p className="text-sm font-black text-ink">
              {event ? `${event.artist}【${event.tour}】${event.city}站` : "五月天【回到那一天】上海站"}
            </p>
            <p className="mt-1 text-xs font-semibold text-muted">
              {event ? `${formatEventShortDate(event.datetime)} · ${event.venue}` : "09.12（周六） · 上海体育场"}
            </p>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">交付方式</h2>
          <p className="mt-1 text-xs text-muted">选择你支持的交付方式</p>
          <div className="mt-3 grid gap-2">
            {deliveryMethods.map((method) => {
              const active = selectedMethods.includes(method);
              return (
                <button
                  aria-pressed={active}
                  className={cn(
                    "flex min-h-12 items-center gap-3 rounded-2xl border border-line p-3 text-left text-sm font-bold text-ink",
                    active && "border-brand bg-orange-50 text-brand",
                  )}
                  key={method}
                  type="button"
                  onClick={() => toggleMethod(method)}
                >
                  <span className={cn("grid h-5 w-5 place-items-center rounded-md border border-line", active && "border-brand bg-brand text-white")}>
                    {active ? <Check size={15} strokeWidth={3} /> : null}
                  </span>
                  {deliveryText(method)}
                </button>
              );
            })}
          </div>

          {supportsConcertMeetup ? (
            <div className="mt-3 grid gap-2 rounded-2xl bg-orange-50 p-3">
              <button className="flex min-h-14 items-center justify-between rounded-2xl bg-white p-3 text-left" type="button" onClick={() => setSheet("point")}>
                <span>
                  <span className="block text-xs text-muted">公共面交点</span>
                  <span className="mt-1 block text-sm font-bold text-ink">{meetupPoint}</span>
                </span>
                <ChevronRight size={18} className="text-muted" />
              </button>
              <button className="flex min-h-14 items-center justify-between rounded-2xl bg-white p-3 text-left" type="button" onClick={() => setSheet("time")}>
                <span>
                  <span className="block text-xs text-muted">可面交时间</span>
                  <span className="mt-1 block text-sm font-bold text-ink">{timeSlot}</span>
                </span>
                <ChevronRight size={18} className="text-muted" />
              </button>
            </div>
          ) : null}
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[390px] border-t border-line bg-white p-3">
        <PrimaryButton className="w-full" onClick={() => setSuccess(true)}>
          发布闲置
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

      {success ? (
        <div className="fixed inset-0 z-50 mx-auto max-w-[390px]" role="dialog" aria-modal="true">
          <button className="absolute inset-0 h-full w-full bg-black/30" type="button" aria-label="关闭" onClick={() => setSuccess(false)} />
          <section className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 text-center shadow-soft">
            <CheckCircle2 className="mx-auto text-brand" size={48} />
            <h2 className="mt-4 text-xl font-black text-ink">闲置已发布</h2>
            <p className="mt-2 text-sm leading-6 text-muted">你的商品已经出现在五月天上海站的闲置市场中。</p>
            <div className="mt-5 grid gap-2">
              <PrimaryButton className="w-full" href="/products/glow-stick-001">
                查看商品
              </PrimaryButton>
              <SecondaryButton className="w-full" href="/events/mayday-shanghai-20260912">
                返回 Event
              </SecondaryButton>
            </div>
          </section>
        </div>
      ) : null}
    </AppShell>
  );
}
